import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/server/auth";
import { Midjourney } from "~/services/midjourneyService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const imagineApi = async (
  prompt: string,
  writer: WritableStreamDefaultWriter<Uint8Array>
) => {
  const serverId = "662267976984297473";
  const channelId = "995431233121161246";
  const salaiToken = env.DISCORD_SALAI_TOKEN;

  const encoder = new TextEncoder();

  try {
    const client = new Midjourney(serverId, channelId, salaiToken, true);
    const msg = await client.Imagine(prompt, async (uri: string) => {
      console.log("loading", uri);
      const data = JSON.stringify({
        type: "image",
        uri: uri || "no_attachment",
      });
      console.log("Sending image data:", data);
      await writer.write(encoder.encode(`data: ${data}\n\n`));
    });

    console.log("Generated image:", msg);
    const completedData = JSON.stringify({
      type: "completed",
      data: msg,
    });
    console.log("Sending completed data:", completedData);
    await writer.write(encoder.encode(`data: ${completedData}\n\n`));
    await writer.close();
  } catch (error: unknown) {
    console.error("Error generating image:", error);
    const errorData = JSON.stringify({
      type: "error",
      message: error,
    });
    console.log("Sending error data:", errorData);
    await writer.write(encoder.encode(`data: ${errorData}\n\n`));
    await writer.close();
  }
};

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  try {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");

    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();

    if (prompt) {
      imagineApi(prompt, writer).catch((error) => {
        console.error("Error in imagineApi:", error);
      });
    } else {
      throw new Error("Prompt is missing");
    }

    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
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
