import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

const imaginePayload = {
  type: 2,
  application_id: "936929561302675456",
  guild_id: serverId,
  channel_id: channelId,
  session_id: "2fb980f65e5c9a77c96ca01f2c242cf6",
  data: {
    version: "1077969938624553050",
    id: "938956540159881230",
    name: "imagine",
    type: 1,
    options: [
      {
        type: 3,
        name: "prompt",
      },
    ],
    application_command: {
      id: "938956540159881230",
      application_id: "936929561302675456",
      version: "1077969938624553050",
      default_permission: true,
      default_member_permissions: null,
      type: 1,
      nsfw: false,
      name: "imagine",
      description: "Create images with Midjourney",
      dm_permission: true,
      options: [
        {
          type: 3,
          name: "prompt",
          description: "The prompt to imagine",
          required: true,
        },
      ],
    },
    attachments: [],
  },
};

const imagine = async ({ prompt }: { prompt: string }): Promise<number> => {
  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      ...imaginePayload,
      data: {
        ...imaginePayload.data,
        options: [{ ...imaginePayload.data.options[0], value: prompt }],
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
  const { prompt } = await request.json();
  const status = await imagine({ prompt });
  return NextResponse.json({ status });
}
