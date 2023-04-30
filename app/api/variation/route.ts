import { NextResponse } from "next/server";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

const variation = async ({
  index,
  messageId,
  messageHash,
}: {
  index: number;
  messageId: string;
  messageHash: string;
}): Promise<number> => {
  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      type: 3,
      nonce: "1102305268038893568",
      guild_id: serverId,
      channel_id: channelId,
      message_flags: 0,
      message_id: messageId,
      application_id: "936929561302675456",
      session_id: "65f2874151c7356c87116067588df7e5",
      data: {
        component_type: 2,
        custom_id: `MJ::JOB::variation::${index}::${messageHash}`,
      },
    }),
  });
  return response.status;
};

export async function POST(request: Request) {
  const body = await request.json();
  const status = await variation(body);
  console.log("status :", status);
  return NextResponse.json({ status });
}
