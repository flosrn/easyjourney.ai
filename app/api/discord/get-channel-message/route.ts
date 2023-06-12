/* eslint-disable no-await-in-loop */
import { NextResponse } from "next/server";
import extractJobId from "~/utils/extractJobId";
import { retrieveMessages, wait } from "~/utils/midjourneyUtils";
import type { APIAttachment, APIMessage } from "discord-api-types/v10";

import type { ImageData } from "../../../(playground)/create/store/imageGenerationStore";

const findMessage = ({
  messages,
  prompt,
  index,
  option,
  waitingToStart,
  currentTimestamp,
}: {
  messages: APIMessage[];
  prompt: string;
  index?: number;
  option?: "upscale" | "variation";
  waitingToStart?: boolean;
  currentTimestamp?: number;
}): APIMessage | undefined => {
  let content = "";
  const isUpscale = index && option === "upscale";
  const isVariation = index && option === "variation";
  const isUpscaleOrVariation = isUpscale ?? isVariation;
  if (isUpscale) {
    content = `Image #${index}`;
  } else if (isVariation) {
    content = "Variations";
  }
  return messages.find((msg) => {
    const msgContent = msg.content.trim();
    return (
      msgContent.includes(prompt.trim()) &&
      (isUpscaleOrVariation ? msgContent.includes(content.trim()) : true) &&
      (waitingToStart ? msgContent.includes("(Waiting to start)") : true) &&
      (currentTimestamp ? Date.parse(msg.timestamp) > currentTimestamp : true)
    );
  });
};

const waitForMessage = async ({
  prompt,
  index,
  option,
  loading,
  currentTimestamp,
}: {
  prompt: string;
  index?: number;
  option?: "upscale" | "variation";
  loading?: (attachment: APIAttachment | null) => void;
  currentTimestamp?: number;
}): Promise<APIMessage> => {
  let message: APIMessage | undefined;
  while (!message) {
    const messages = await retrieveMessages(50);
    await wait(3000);
    message = findMessage({
      messages,
      prompt,
      index,
      option,
      currentTimestamp,
      waitingToStart: !index && !option,
    });
    if (!message) {
      console.log("initial message not found");
      loading?.(null);
    }
  }
  return message;
};

const findAttachmentInMessages = async ({
  prompt,
  loading,
  index,
  option,
}: {
  prompt: string;
  loading: (attachment: APIAttachment | null) => void;
  index?: number;
  option?: "upscale" | "variation";
}): Promise<ImageData | undefined> => {
  const isUpscaleOrVariation = index && option;
  const minutesAgo = isUpscaleOrVariation ? 5000 : 600000;
  const currentTimestamp = isUpscaleOrVariation && Date.now() - minutesAgo;
  const initialMessage = await waitForMessage({
    prompt,
    index,
    option,
    loading,
    currentTimestamp,
  });
  console.log("initial message found");
  let attachment: APIAttachment | undefined;

  if (
    isUpscaleOrVariation &&
    initialMessage.attachments.length > 0 &&
    initialMessage.attachments[0].url.endsWith(".png")
  ) {
    attachment = initialMessage.attachments[0];
    console.log("variation or upscale found");
    return {
      ...attachment,
      prompt: initialMessage.content.split("**")[1],
      messageId: initialMessage.id,
      jobId: extractJobId(attachment.url),
    };
  }

  while (!attachment?.url.endsWith(".png")) {
    const messages = await retrieveMessages(50);
    const targetMessage = findMessage({ messages, prompt, index, option });

    const targetMessageTimestamp =
      targetMessage && Date.parse(targetMessage.timestamp);
    const targetTimestamp = Date.parse(initialMessage.timestamp) - 10000;
    const isIntervalOk =
      targetMessageTimestamp && targetMessageTimestamp >= targetTimestamp;

    console.log("targetMessage :", targetMessage);

    await wait(targetMessage?.attachments[0] ? 2000 : 8000);

    if (targetMessage && targetMessage.attachments.length === 0) {
      console.log("no attachment found");
      loading(targetMessage as any);
    } else if (targetMessage) {
      attachment = targetMessage.attachments[0];
      if (
        attachment.url.endsWith("grid_0.webp") &&
        attachment.filename === "grid_0.webp" &&
        targetMessage.interaction
      ) {
        console.log("webp found");
        loading(attachment);
        attachment = undefined;
      } else if (!targetMessage.interaction) {
        console.log("final image found");
        if (isIntervalOk) {
          const jobId = extractJobId(attachment.url);
          return {
            ...attachment,
            url: `https://cdn.midjourney.com/${jobId}/grid_0.webp`,
            prompt: initialMessage.content.split("**")[1],
            messageId: targetMessage.id,
            jobId,
          };
        }
      }
    }
  }
};

const getMessageType = (option?: "upscale" | "variation") => {
  switch (option) {
    case "upscale":
      return "image_upscaled";
    case "variation":
      return "variation_complete";
    default:
      return "generation_complete";
  }
};

export async function POST(request: Request) {
  const { prompt, index, option } = await request.json();

  let failCount = 0;

  const encoder = new TextEncoder();

  let stream!: ReadableStreamDefaultController<Uint8Array>;

  const readableStream = new ReadableStream({
    start(controller) {
      stream = controller;
    },
  });

  // Exécute la fonction imagine dans une fonction async pour ne pas bloquer le flux
  void (async () => {
    try {
      const data = await findAttachmentInMessages({
        prompt,
        loading: (attachment) => {
          const isVariation = option === "variation";
          if (!isVariation && !attachment) {
            failCount = failCount + 1;
          }
          const isError = failCount > 5;
          // Enfile les données dans le contrôleur de flux
          const message = {
            type: attachment ? "image_iteration" : "loading",
            ...attachment,
            isError,
          };
          if (isError) {
            throw new Error("Aborted, initial image not found");
          }
          stream.enqueue(encoder.encode(JSON.stringify(message)));
        },
        index,
        option,
      });

      if (data) {
        const message = { type: getMessageType(option), ...data };
        stream.enqueue(encoder.encode(JSON.stringify(message)));
        stream.close();
      }
    } catch (error: unknown) {
      const message = {
        type: "generation_failed",
        isError: true,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      stream.enqueue(encoder.encode(JSON.stringify(message)));
      stream.error(error);
      return NextResponse.json(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  })().then(() => {});

  return new Response(readableStream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    }),
  });
}
