import { env } from "~/env.mjs";
import { Midjourney } from "~/services/midjourneyService";

const serverId = "662267976984297473";
const channelId = "995431233121161246";
const salaiToken = env.NEXT_PUBLIC_DISCORD_SALAI_TOKEN;

export const imagineApiClient = async (
  prompt: string,
  onImage: (uri: string) => void,
  onComplete: (msg: any) => void
) => {
  try {
    const client = new Midjourney(serverId, channelId, salaiToken, true);
    const msg = await client.Imagine(prompt, (uri: string) => {
      console.log("loading", uri);
      onImage(uri || "no_attachment");
    });

    console.log("Generated image:", msg);
    onComplete(msg);
  } catch (error: unknown) {
    console.error("Error generating image:", error);
  }
};
