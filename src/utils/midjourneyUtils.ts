import type { APIMessage } from "discord-api-types/v10";
import { env } from "~/env.mjs";

export const serverId = "1100971215138594907";
export const channelId = "1100971252304330814";
export const salaiToken = env.NEXT_PUBLIC_DISCORD_SALAI_TOKEN;

export const headers = {
  Authorization: salaiToken,
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
