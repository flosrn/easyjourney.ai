import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

const upscale = async ({
  index,
  messageId,
  messageHash,
}: {
  index: number;
  messageId: string;
  messageHash: string;
}): Promise<number> => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("user not logged in");
  }
  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      type: 3,
      guild_id: serverId,
      channel_id: channelId,
      message_flags: 0,
      message_id: messageId,
      application_id: "936929561302675456",
      session_id: "ec6524c8d2926e285a8232f7ed1ced98",
      data: {
        component_type: 2,
        custom_id: `MJ::JOB::upsample::${index}::${messageHash}`,
      },
    }),
  });
  return response.status;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const body = await request.json();
  const status = await upscale(body);
  return NextResponse.json({ status });
}
