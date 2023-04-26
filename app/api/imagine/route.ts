import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/server/auth";
import { Midjourney } from "~/services/midjourneyService";

export const runtime = "nodejs";
// This is required to enable streaming
export const dynamic = "force-dynamic";

const imagineApi = async (
  prompt: string,
  writer: WritableStreamDefaultWriter<Uint8Array>
) => {
  const serverId = "1044540639271976963";
  const channelId = "1092330668387741708";
  const salaiToken = env.DISCORD_SALAI_TOKEN;

  const encoder = new TextEncoder();

  try {
    const client = new Midjourney(serverId, channelId, salaiToken, true);
    const msg = await client.Imagine(
      prompt,
      async (uri: string, index: number) => {
        console.log("loading", uri);
        const data = JSON.stringify({ type: "image", uri, index });
        await writer.write(encoder.encode(`${data}\n`));
      }
    );

    console.log("Generated image:", msg);
    await writer.write(
      encoder.encode(
        `${JSON.stringify({
          type: "completed",
          data: msg,
        })}\n`
      )
    );
    writer.close();
  } catch (error) {
    console.error("Error generating image:", error);
    await writer.write(
      encoder.encode(
        `${JSON.stringify({
          type: "error",
          message: error.message,
        })}\n`
      )
    );
    writer.close();
  }
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  try {
    const { prompt } = await request.json();

    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();

    imagineApi(prompt, writer);

    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
    // return NextResponse.json(data);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error(error);
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 500 }
    );
  }
}
