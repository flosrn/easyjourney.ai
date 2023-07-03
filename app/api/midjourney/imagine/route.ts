import { env } from "~/env.mjs";
import { channelId, serverId } from "~/utils/midjourneyUtils";
import { Midjourney } from "midjourney";

export const runtime = "edge";

console.log("api/midjourney/imagine/route.ts");

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log("prompt :", prompt);

  const client = new Midjourney({
    ServerId: serverId,
    ChannelId: channelId,
    SalaiToken: env.DISCORD_SALAI_TOKEN,
    HuggingFaceToken: env.HUGGINGFACE_TOKEN,
    Debug: true,
    Ws: true,
  });
  await client.init();
  console.log("client :", client);
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      console.log("imagine.start", prompt);

      controller.enqueue(encoder.encode(`${JSON.stringify({ prompt })}\n`));

      // client
      //   .Imagine(prompt, (uri: string, progress: string) => {
      //     console.log("imagine.loading", uri);
      //     controller.enqueue(
      //       encoder.encode(`${JSON.stringify({ uri, progress })}\n`)
      //     );
      //   })
      //   .then((msg) => {
      //     console.log("imagine.done", msg);
      //     controller.enqueue(encoder.encode(`${JSON.stringify(msg)}\n`));
      //     client.Close();
      //     controller.close();
      //   })
      //   .catch((error) => {
      //     console.log("imagine.error", error);
      //     client.Close();
      //     controller.close();
      //   });
    },
  });
  return new Response(readable, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server
      // "Content-Type": "text/html; charset=utf-8",
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
    }),
  });
}
