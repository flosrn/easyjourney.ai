/* eslint-disable no-await-in-loop */
import type { APIAttachment, APIMessage } from "discord-api-types/v10";
import { retrieveMessages, wait } from "~/utils/midjourneyUtils";

import type { ImageData } from "../../../app/(dashboard)/create/store/imageGenerationStore";

// https://vercel.com/docs/concepts/functions/edge-functions
export const config = {
  runtime: "edge",
};

const uriToHash = (uri: string) => uri.split("_").pop()?.split(".")[0] ?? "";

const findMessage = (
  messages: APIMessage[],
  prompt: string,
  index?: number,
  option?: "upscale" | "variation",
  waitingToStart = false
): APIMessage | undefined => {
  const content = option === "upscale" ? `Image #${index}` : "Variations";
  return messages.find(
    (msg) =>
      msg.content.includes(prompt) &&
      (index ? msg.content.includes(content) : true) &&
      msg.content.includes(waitingToStart ? "(Waiting to start)" : "")
  );
};

const waitForMessage = async (
  prompt: string,
  index?: number,
  option?: "upscale" | "variation",
  loading?: (attachment: APIAttachment | null) => void
): Promise<APIMessage> => {
  let message: APIMessage | undefined;
  while (!message) {
    await wait(3000);
    const messages = await retrieveMessages(50);
    message = findMessage(messages, prompt, index, option);
    !message && console.log("initial message not found");
    !message && loading?.(null);
  }
  return message;
};

const findAttachmentInMessages = async (
  prompt: string,
  loading: (attachment: APIAttachment | null) => void,
  index?: number,
  option?: "upscale" | "variation"
): Promise<ImageData | undefined> => {
  const initialMessage = await waitForMessage(prompt, index, option, loading);
  const targetTimestamp = initialMessage.timestamp;
  let attachment: APIAttachment | undefined;

  if (
    index &&
    option &&
    initialMessage.attachments.length > 0 &&
    initialMessage.attachments[0].url.endsWith(".png")
  ) {
    attachment = initialMessage.attachments[0];
    console.log("variation or upscale found");
    return {
      ...attachment,
      prompt: initialMessage.content.split("**")[1],
      messageId: initialMessage.id,
      messageHash: uriToHash(attachment.url),
    };
  }

  while (!attachment?.url.endsWith(".png")) {
    await wait(2000);
    const messages = await retrieveMessages(50);
    const targetMessage = findMessage(messages, prompt, index, option);

    if (targetMessage && targetMessage.attachments.length > 0) {
      attachment = targetMessage.attachments[0];

      if (attachment.url.endsWith(".webp")) {
        console.log("webp found");
        loading(attachment);
      } else if (
        attachment.url.endsWith(".png") &&
        targetMessage.timestamp > targetTimestamp
      ) {
        console.log("png found");
        return {
          ...attachment,
          prompt: initialMessage.content.split("**")[1],
          messageId: targetMessage.id,
          messageHash: uriToHash(attachment.url),
        };
      }
    }
  }
};

const retrieveMessagesUntilFinal = async (
  limit: number,
  prompt: string,
  loading: (attachment: APIAttachment | null) => void,
  index?: number,
  option?: "upscale" | "variation"
): Promise<ImageData | undefined> => {
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
      const data = await retrieveMessagesUntilFinal(
        50,
        prompt,
        (attachment) => {
          // Enfile les données dans le contrôleur de flux
          const message = JSON.stringify({
            type: attachment ? "image_iteration" : "loading",
            ...attachment,
          });
          streamController.enqueue(encoder.encode(message));
        },
        index,
        option
      );

      if (data) {
        // Envoie un message final pour indiquer la fin de la génération avec la dernière image
        const message = JSON.stringify({
          type: getMessageType(option),
          ...data,
        });
        streamController.enqueue(encoder.encode(message));
      }
      // Ferme le flux une fois que la fonction imagine est terminée
      streamController.close();
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
