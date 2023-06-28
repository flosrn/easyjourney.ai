/* eslint-disable no-await-in-loop */
import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import extractJobId from "~/utils/extractJobId";
import { retrieveMessages, wait } from "~/utils/midjourneyUtils";
import type { APIAttachment, APIMessage } from "discord-api-types/v10";

import type { ImageData } from "../../../(playground)/create/store/imageGenerationStore";

export const runtime = "edge";

const MAX_FAILURE_COUNT = 30;
let ATTEMPTS = 0;
const MAX_ATTEMPTS = 100;

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
  let referencedImage: APIAttachment | undefined;

  if (
    isUpscaleOrVariation &&
    initialMessage.attachments.length > 0 &&
    initialMessage.attachments[0].url.endsWith(".png")
  ) {
    attachment = initialMessage.attachments[0];
    referencedImage = initialMessage.referenced_message?.attachments[0];
    console.log("variation or upscale found");
    const jobId = extractJobId(attachment.url);
    const referencedJobId =
      referencedImage && extractJobId(referencedImage.url);
    return {
      ...attachment,
      referencedImage: {
        ...referencedImage,
        //@ts-expect-error: to fix
        image: `https://cdn.midjourney.com/${referencedJobId}/grid_0.webp`,
      },
      prompt: initialMessage.content.split("**")[1],
      messageId: initialMessage.id,
      jobId,
    };
  }

  while (!attachment?.url.endsWith(".png") && ATTEMPTS < MAX_ATTEMPTS) {
    ATTEMPTS += 1;
    const messages = await retrieveMessages(50);
    const targetMessage = findMessage({ messages, prompt, index, option });

    const targetMessageTimestamp =
      targetMessage && Date.parse(targetMessage.timestamp);
    const targetTimestamp = Date.parse(initialMessage.timestamp) - 10000;
    const isIntervalOk =
      targetMessageTimestamp && targetMessageTimestamp >= targetTimestamp;

    await wait(targetMessage?.attachments[0] ? 2600 : 8000);

    if (targetMessage && targetMessage.attachments.length === 0) {
      console.log("no attachment found");
      loading(targetMessage as any);
    } else if (targetMessage) {
      attachment = targetMessage.attachments[0];
      referencedImage = targetMessage.referenced_message?.attachments[0];
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
            referencedImage,
            url: `https://cdn.midjourney.com/${jobId}/grid_0.webp`,
            prompt: initialMessage.content.split("**")[1],
            messageId: targetMessage.id,
            jobId,
          };
        }
      }
    }
  }

  if (ATTEMPTS >= MAX_ATTEMPTS) {
    console.log("max attempts reached");
    throw new Error("max attempts reached");
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
          const isError = failCount > MAX_FAILURE_COUNT;
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
        const message = {
          type: getMessageType(option),
          ...data,
          referencedImage: undefined,
        };
        stream.enqueue(encoder.encode(JSON.stringify(message)));

        const hasReferencedImage = !!data.referencedImage;
        if (hasReferencedImage) {
          const messageWithReferencedImage = JSON.stringify({
            type: "referenced_image",
            ...data.referencedImage,
          });
          await wait(1000);
          stream.enqueue(encoder.encode(messageWithReferencedImage));
        }

        await fetch(`${env.NEXT_PUBLIC_URL}/api/users/decrementCredits`, {
          method: "POST",
          headers: {
            // Include the `Cookie` header from the original request to maintain session
            Cookie: request.headers.get("Cookie") ?? "",
          },
        });
      }
    } catch (error: unknown) {
      console.error("generation failed:", error);
      const message = {
        type: "generation_failed",
        isError: true,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      stream.enqueue(encoder.encode(JSON.stringify(message)));
      stream.error(error);
      return NextResponse.json(error);
    } finally {
      stream.close();
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  })().then(() => {});

  return new Response(readableStream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server
      // "Content-Type": "text/html; charset=utf-8",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    }),
  });
}
