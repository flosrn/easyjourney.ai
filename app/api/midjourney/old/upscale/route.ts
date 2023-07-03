import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

const upscale = async ({
  index,
  messageId,
  jobId,
}: {
  index: number;
  messageId: string;
  jobId: string;
}): Promise<any> => {
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
        custom_id: `MJ::JOB::upsample::${index}::${jobId}`,
      },
    }),
  });
  if (response.status !== 204) {
    const data = await response.json();
    console.log("'/api/upscale' 💥 Error:", data);
    const errors = data.errors.data._errors;
    console.log("errors :", errors);
    return data;
  }
  return { status: response.status };
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const data = await upscale(body);
  return NextResponse.json(data);
}
