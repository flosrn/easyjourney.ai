import { env } from "~/env.mjs";
import { channelId, serverId } from "~/utils/midjourneyUtils";
import { Midjourney } from "midjourney";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request) => {
  const { prompt } = await req.json();

  console.log("imagine.handler", prompt);
  const client = new Midjourney({
    ServerId: serverId,
    ChannelId: channelId,
    SalaiToken: env.DISCORD_SALAI_TOKEN!,
    HuggingFaceToken: env.HUGGINGFACE_TOKEN!,
    Debug: true,
    Ws: true,
  });
  await client.init();
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      console.log("imagine.start", prompt);
      client
        .Imagine(prompt, (uri: string, progress: string) => {
          console.log("imagine.loading", uri);
          controller.enqueue(
            encoder.encode(`${JSON.stringify({ uri, progress })}\n`)
          );
        })
        .then((msg) => {
          console.log("imagine.done", msg);
          controller.enqueue(encoder.encode(`${JSON.stringify(msg)}\n`));
          client.Close();
          controller.close();
        })
        .catch((error) => {
          console.log("imagine.error", error);
          client.Close();
          controller.close();
        });
    },
  });
  return new Response(readable, {});
};
export default handler;
