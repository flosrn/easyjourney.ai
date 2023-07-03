import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/server/auth";
import { channelId, headers, serverId } from "~/utils/midjourneyUtils";

import { getUserCredits } from "~/lib/credits";

const imaginePayload = {
  type: 2,
  application_id: "936929561302675456",
  guild_id: serverId,
  channel_id: channelId,
  session_id: "4fdd748e5e09b91a7572fa94c2ecdb80",
  data: {
    version: "1118961510123847772",
    id: "938956540159881230",
    name: "imagine",
    type: 1,
    options: [{ type: 3, name: "prompt" }],
    application_command: {
      id: "938956540159881230",
      application_id: "936929561302675456",
      version: "1118961510123847772",
      default_member_permissions: null,
      type: 1,
      nsfw: false,
      name: "imagine",
      description: "Create images with Midjourney",
      dm_permission: true,
      contexts: [0, 1, 2],
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

const imagine = async ({ prompt }: { prompt: string }): Promise<any> => {
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
  if (response.status !== 204) {
    const data = await response.json();
    console.log("'/api/imagine' 💥 Error:", data);
    return data;
  }
  return { status: response.status };
};

const openAiModeration = async ({
  prompt,
}: {
  prompt: string;
}): Promise<any> => {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input: prompt }),
  });
  const data = await response.json();
  return data;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const { prompt } = await request.json();
  const moderation = await openAiModeration({ prompt });

  const result = moderation.results[0];
  if (result.flagged) {
    const error =
      "Your prompt is detected as inappropriate, please change your prompt and try again.";
    return NextResponse.json({ error }, { status: 403 });
  }

  const hasEnoughCredits = await getUserCredits(session.user.id);
  if (!hasEnoughCredits) {
    return NextResponse.json({ error: "Not enough credits" }, { status: 402 });
  }

  try {
    const data = await imagine({ prompt });
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.log("error :", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
