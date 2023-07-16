import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

const variation = async ({
  index,
  messageId,
  jobId,
  type,
}: {
  index: number;
  messageId: string;
  jobId: string;
  type: string;
}): Promise<any> => {
  console.log("variation index", index);
  console.log("variation messageId", messageId);
  console.log("variation jobId", jobId);
  console.log("variation type", type);
  const isZoomOut_x1_5 = type === "zoom-out x1.5";
  const isZoomOut_x2 = type === "zoom-out x2";

  let custom_id = "";

  if (isZoomOut_x1_5) {
    custom_id = `MJ::Outpaint::75::1::${jobId}::SOLO`;
  } else if (isZoomOut_x2) {
    custom_id = `MJ::Outpaint::50::1::${jobId}::SOLO`;
  } else {
    custom_id = `MJ::JOB::variation::${index}::${jobId}`;
  }

  console.log("custom_id :", custom_id);

  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      application_id: "936929561302675456",
      channel_id: channelId,
      data: {
        component_type: 2,
        custom_id,
      },
      guild_id: serverId,
      message_flags: 0,
      message_id: messageId,
      // nonce: "1121773781929426944",
      session_id: "5cb95b5624da277bc80a42b029d7014c",
      type: 3,
    }),
  });
  if (response.status !== 204) {
    const data = await response.json();
    console.log("'/api/variation' 💥 Error:", data);
    const errors = data.errors.data._errors;
    console.log("errors :", errors);
    return data;
  }
  return { status: response.status };
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const body = await request.json();
  const data = await variation(body);
  return NextResponse.json(data);
}
