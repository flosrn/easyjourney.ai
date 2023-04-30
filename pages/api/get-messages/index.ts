/* eslint-disable no-await-in-loop */
import type { APIAttachment, APIMessage } from "discord-api-types/v10";
import { retrieveMessages, wait } from "~/utils/midjourneyUtils";

// https://vercel.com/docs/concepts/functions/edge-functions
export const config = {
  runtime: "edge",
};

const uriToHash = (uri: string) => uri.split("_").pop()?.split(".")[0] ?? "";

const findMessageByContent = (
  messages: APIMessage[],
  prompt: string,
  index?: number,
  waitingToStart?: boolean,
  option?: "upscale" | "variation"
): APIMessage | undefined => {
  const content = option === "upscale" ? `Image #${index}` : "Variations";
  return messages.find(
    (msg) =>
      msg.content.includes(prompt) &&
      (index ? msg.content.includes(content) : true) &&
      msg.content.includes(waitingToStart ? "(Waiting to start)" : "")
  );
};

const retrieveMessagesUntilFinal = async (
  limit: number,
  prompt: string,
  loading: (attachment: APIAttachment | null) => void,
  index?: number,
  option?: "upscale" | "variation"
) => {
  let message: APIMessage | null | undefined = null;
  const isUpscaledImage = index !== undefined;

  while (!message) {
    await wait(3000);
    const messages = await retrieveMessages(limit);
    message = findMessageByContent(
      messages,
      prompt,
      index,
      !isUpscaledImage,
      option
    );
  }

  const targetMessageTimestamp: string = message.timestamp;
  let attachment: APIAttachment | null = null;
  let finalImageFound = false;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (!finalImageFound) {
    await wait(3000);
    const messages = await retrieveMessages(limit);
    const targetMessage = findMessageByContent(messages, prompt);

    if (!attachment) {
      console.log("no attachment found");
      loading(null);
    }

    if (targetMessage && targetMessage.attachments.length > 0) {
      attachment = targetMessage.attachments[0];

      const isWebp = attachment.url.endsWith(".webp");
      const isPng = attachment.url.endsWith(".png");
      const isFinalImage = isUpscaledImage
        ? true
        : targetMessage.timestamp > targetMessageTimestamp;

      if (isWebp) {
        console.log("webp image found");
        loading(attachment);
      } else if (isPng && isFinalImage) {
        console.log("final image found:", attachment.url);
        finalImageFound = true;
        return {
          ...attachment,
          prompt: message.content.split("**")[1],
          messageId: targetMessage.id,
          messageHash: uriToHash(attachment.url),
        };
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
