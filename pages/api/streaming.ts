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

  // Contrôleur de flux pour gérer les événements de streaming
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
      const finalImageMessage = await imagine(
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
          // Enfile les données dans le contrôleur de flux
          streamController.enqueue(encoder.encode(event));
        }
      );

      if (finalImageMessage) {
        // Enfile les données dans le contrôleur de flux
        streamController.enqueue(encoder.encode(finalImageMessage.uri));
      }

      // Ferme le flux une fois que la fonction imagine est terminée
      streamController.close();
    } catch (error) {
      console.error(
        "Erreur lors de l'exécution de la fonction imagine :",
        error
      );

      // Ferme le flux en cas d'erreur
      streamController.error(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  })().then(() => {});

  return response;
}
