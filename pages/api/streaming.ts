import { env } from "~/env.mjs";
import { imagine } from "~/services/midjourneyService";

export const config = {
  runtime: "edge",
};

const serverId = "1100971215138594907";
const channelId = "1100971252304330814";
const salaiToken = env.NEXT_PUBLIC_DISCORD_SALAI_TOKEN;

export default async function handler(request: Request) {
  const { prompt } = await request.json();

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
      const data = await imagine(
        channelId,
        salaiToken,
        serverId,
        prompt,
        true,
        50,
        100,
        (event) => {
          // eslint-disable-next-line no-console
          console.log("event :", event);
          const msgNotFound = event === "message-not-found";
          // Enfile les données dans le contrôleur de flux
          const message = JSON.stringify({
            type: msgNotFound ? "message_not_found" : "image_iteration",
            iterationImage: msgNotFound ? null : event,
          });
          streamController.enqueue(encoder.encode(message));
        }
      );

      console.log("streaming data :", data);

      if (data) {
        // Envoie un message final pour indiquer la fin de la génération avec la dernière image
        const message = JSON.stringify({
          type: "generation_complete",
          finalImage: data.uri,
        });
        streamController.enqueue(encoder.encode(message));
      }
      // Ferme le flux une fois que la fonction imagine est terminée
      streamController.close();
    } catch (error: unknown) {
      console.error(
        "Erreur lors de l'exécution de la fonction imagine :",
        error
      );

      const message = JSON.stringify({
        type: "generation_failed",
      });
      streamController.enqueue(encoder.encode(message));

      // Ferme le flux en cas d'erreur
      streamController.error(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  })().then(() => {});

  return response;
}
