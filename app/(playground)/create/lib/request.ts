import type { MJMessage } from "midjourney";

import readStreamData from "./readStreamData";

const midjourneyRequest = async (
  url: string,
  prompt: string,
  loading: (data: MJMessage) => void
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  console.log("response :", response);
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is null");
  }
  await readStreamData(reader, loading);
};

export const imagine = async (
  prompt: string,
  loading: (data: MJMessage) => void
) => {
  await midjourneyRequest("/api/midjourney/imagine", prompt, loading);
};

export const upscale = async (
  prompt: string,
  loading: (data: MJMessage) => void
) => {
  await midjourneyRequest("/api/midjourney/upscale", prompt, loading);
};

export const variation = async (
  prompt: string,
  loading: (data: MJMessage) => void
) => {
  await midjourneyRequest("/api/midjourney/variation", prompt, loading);
};
