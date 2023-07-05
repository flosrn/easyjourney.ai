import type { MJMessage } from "midjourney";
import { toast } from "react-hot-toast";

import readStreamData from "./readStreamData";

const midjourneyRequest = async (
  url: string,
  prompt: string,
  loading: (data: MJMessage) => void,
  onError: (error: Error) => void
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    onError(new Error(`HTTP error! status: ${response.status}`));
    return;
  }

  const reader = response.body?.getReader();

  if (!reader) {
    onError(new Error("Response body is null"));
    return;
  }

  await readStreamData(reader, loading, onError);
};

export const imagine = async (
  prompt: string,
  loading: (data: MJMessage) => void
) => {
  try {
    await midjourneyRequest("/api/midjourney", prompt, loading, (error) => {
      console.error("An error occurred while reading the stream", error);
      toast.error("An error occurred, please try again.");
    });
  } catch (error: unknown) {
    console.error("A network error occurred", error);
    // errorHandler(error);  // Call an error handler function
  }
};

// export const upscale = async (
//   prompt: string,
//   loading: (data: MJMessage) => void
// ) => {
//   await midjourneyRequest("/api/midjourney/upscale", prompt, loading);
// };
//
// export const variation = async (
//   prompt: string,
//   loading: (data: MJMessage) => void
// ) => {
//   await midjourneyRequest("/api/midjourney/variation", prompt, loading);
// };
