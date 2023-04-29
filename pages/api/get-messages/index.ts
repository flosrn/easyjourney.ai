import type { APIAttachment } from "discord-api-types/v10";
import { retrieveMessages, wait } from "~/services/midjourneyUtils";

// https://vercel.com/docs/concepts/functions/edge-functions
export const config = {
  runtime: "edge",
};

const uriToHash = (uri: string) => uri.split("_").pop()?.split(".")[0] ?? "";

const retrieveMessagesUntilFinal = async (
  limit: number,
  prompt: string,
  loading: (attachment: APIAttachment) => void,
  index: number
) => {
  for (let i = 0; i < limit; i++) {
    // eslint-disable-next-line no-await-in-loop
    const messages = await retrieveMessages(limit);

    const message = messages.find(
      (msg) => msg.content.includes(prompt) && msg.attachments.length > 0
    );

    const attachment = message?.attachments[0];

    if (
      index &&
      attachment &&
      message.content.includes(`Image #${index}`) &&
      message.type === 19
    ) {
      return {
        ...attachment,
        prompt: message.content.split("**")[1],
        messageId: message.id,
        messageHash: uriToHash(attachment.url),
      };
    }

    if (attachment?.url.endsWith(".webp")) {
      // console.log("webp image found");
      loading(attachment);
      // eslint-disable-next-line no-await-in-loop
      await wait(2000);
    } else if (attachment && !index) {
      console.log("final image found:", attachment.url);
      return {
        ...attachment,
        prompt: message.content.split("**")[1],
        messageId: message.id,
        messageHash: uriToHash(attachment.url),
      };
    }
    // eslint-disable-next-line no-await-in-loop
    await wait(2000);
  }

  return null;
};

export default async function handler(request: Request) {
  const { prompt, index } = await request.json();

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
            type: "image_iteration",
            ...attachment,
          });
          streamController.enqueue(encoder.encode(message));
        },
        index
      );

      if (data) {
        // Envoie un message final pour indiquer la fin de la génération avec la dernière image
        const message = JSON.stringify({
          type: index ? "image_upscaled" : "generation_complete",
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
