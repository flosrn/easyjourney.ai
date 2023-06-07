/* eslint-disable no-await-in-loop */
import { retrieveMessages, wait } from "~/utils/midjourneyUtils";
import type { APIAttachment, APIMessage } from "discord-api-types/v10";

import type { ImageData } from "../../../app/(playground)/create/store/imageGenerationStore";

// https://vercel.com/docs/concepts/functions/edge-functions
export const config = {
  runtime: "edge",
};

const uriToHash = (uri: string) => uri.split("_").pop()?.split(".")[0] ?? "";

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

const findAttachmentInMessages = async (
  prompt: string,
  loading: (attachment: APIAttachment | null) => void,
  index?: number,
  option?: "upscale" | "variation"
): Promise<ImageData | undefined> => {
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
    console.log("referencedImage :", referencedImage);
    console.log("variation or upscale found");
    return {
      ...attachment,
      referencedImage,
      prompt: initialMessage.content.split("**")[1],
      messageId: initialMessage.id,
      messageHash: uriToHash(attachment.url),
    };
  }

  while (!attachment?.url.endsWith(".png")) {
    await wait(attachment ? 3000 : 10000);
    const messages = await retrieveMessages(50);
    const targetMessage = findMessage({ messages, prompt, index, option });

    const targetMessageTimestamp =
      targetMessage && Date.parse(targetMessage.timestamp);
    const targetTimestamp = Date.parse(initialMessage.timestamp) - 10000;
    const isIntervalOk =
      targetMessageTimestamp && targetMessageTimestamp >= targetTimestamp;

    if (targetMessage && targetMessage.attachments.length === 0) {
      console.log("no attachment found");
      loading(null);
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
          return {
            ...attachment,
            referencedImage,
            prompt: initialMessage.content.split("**")[1],
            messageId: targetMessage.id,
            messageHash: uriToHash(attachment.url),
          };
        }
      }
    }
  }
};

const retrieveMessagesUntilFinal = async ({
  prompt,
  loading,
  index,
  option,
  limit,
}: {
  prompt: string;
  loading: (attachment: APIAttachment | null) => void;
  index?: number;
  option?: "upscale" | "variation";
  limit?: number;
}): Promise<ImageData | undefined> => {
  const attachment = await findAttachmentInMessages(
    prompt,
    loading,
    index,
    option
  );
  return attachment;
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

export default async function handler(request: Request) {
  const { prompt, index, option } = await request.json();

  const encoder = new TextEncoder();

  // contrôleur de flux pour gérer les événements de streaming
  let streamController!: ReadableStreamDefaultController<Uint8Array>;

  const customReadable = new ReadableStream({
    start(controller) {
      streamController = controller;
    },
  });

  const response = new Response(customReadable, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });

  // Exécute la fonction imagine dans une fonction async pour ne pas bloquer le flux
  void (async () => {
    try {
      const data = await retrieveMessagesUntilFinal({
        prompt,
        loading: (attachment) => {
          // Enfile les données dans le contrôleur de flux
          const message = JSON.stringify({
            type: attachment ? "image_iteration" : "loading",
            ...attachment,
          });
          streamController.enqueue(encoder.encode(message));
        },
        index,
        option,
        limit: 50,
      });

      if (data) {
        // Envoie un message final pour indiquer la fin de la génération avec la dernière image
        const message = JSON.stringify({
          type: getMessageType(option),
          ...data,
          referencedImage: undefined,
        });
        streamController.enqueue(encoder.encode(message));

        const hasReferencedImage = !!data.referencedImage;
        if (hasReferencedImage) {
          const messageWithReferencedImage = JSON.stringify({
            type: "referenced_image",
            ...data.referencedImage,
          });
          setTimeout(() => {
            streamController.enqueue(
              encoder.encode(messageWithReferencedImage)
            );
            streamController.close();
          }, 1000);
        } else {
          // Ferme le flux une fois que toutes les données ont été insérées
          streamController.close();
        }
      } else {
        // Ferme le flux si aucune donnée n'a été récupérée
        streamController.close();
      }
    } catch (error: unknown) {
      const message = JSON.stringify({
        type: "generation_failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      streamController.enqueue(encoder.encode(message));

      // Ferme le flux en cas d'erreur
      streamController.error(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  })().then(() => {});

  return response;
}
