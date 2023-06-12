import { env } from "~/env.mjs";
import type { APIMessage } from "discord-api-types/v10";

export const serverId = "1100971215138594907";
export const channelId = "1100971252304330814";

export const headers = {
  Authorization: env.NEXT_PUBLIC_DISCORD_SALAI_TOKEN,
};

export const retrieveMessages = async (limit = 50): Promise<APIMessage[]> => {
  const response = await fetch(
    `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`,
    { headers }
  );
  return await response.json();
};

export const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
