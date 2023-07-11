import type { GenerationType, MJMessage } from "midjourney";
import { toast } from "react-hot-toast";

import readStreamData from "./readStreamData";

const midjourneyRequest = async (
  generationType: GenerationType,
  prompt: string,
  content: MJMessage | undefined,
  index: number | null,
  loading: (data: MJMessage) => void,
  onError: (error: Error) => void
) => {
  const response = await fetch("/api/midjourney", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ generationType, prompt, index, content }),
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

export const generate = async ({
  generationType,
  prompt,
  content,
  index,
  loading,
}: {
  generationType: GenerationType;
  prompt: string;
  content?: MJMessage;
  index: number | null;
  loading: (data: MJMessage) => void;
}) => {
  try {
    await midjourneyRequest(
      generationType,
      prompt,
      content,
      index,
      loading,
      (error) => {
        console.error("An error occurred while reading the stream", error);
        toast.error("An error occurred, please try again.");
        throw error;
      }
    );
  } catch (error: unknown) {
    console.error("A network error occurred", error);
    // errorHandler(error);  // Call an error handler function
  }
};

export const savePoster = async ({
  poster,
  options,
  selectedImage,
}: {
  poster: MJMessage;
  options: Record<string, boolean | number | string | null | undefined>;
  selectedImage: number | null;
}) => {
  try {
    const response = await fetch("/api/posters/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...poster, options, selectedImage }),
    });

    if (!response.ok) {
      throw new Error(`Error during save! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("save data :", data);
    return data;
  } catch (error: unknown) {
    console.error("A network error occurred", error);
    // errorHandler(error);  // Call an error handler function
    throw error;
  }
};
