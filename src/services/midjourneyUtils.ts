import type { APIMessage } from "discord-api-types/v10";
import { env } from "~/env.mjs";

const serverId = "1100971215138594907";
const channelId = "1100971252304330814";
const salaiToken = env.NEXT_PUBLIC_DISCORD_SALAI_TOKEN;

const headers = {
  Authorization: salaiToken,
};

const payload = {
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

export const imagine = async ({
  prompt,
}: {
  prompt: string;
}): Promise<number> => {
  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      data: {
        ...payload.data,
        options: [{ ...payload.data.options[0], value: prompt }],
      },
    }),
  });
  return response.status;
};

export const retrieveMessages = async (limit = 50): Promise<APIMessage[]> => {
  const response = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages?limit=${limit}`,
    { headers }
  );
  return await response.json();
};

export const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
