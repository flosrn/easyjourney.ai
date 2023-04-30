import type { APIAttachment } from "discord-api-types/v10";
import toast from "react-hot-toast";

import type { ImageGenerationSetAction } from "../store/imageGenerationStore";

type MessageData = APIAttachment & {
  type: string;
  error?: string;
};

export const handleMessageData = (
  data: MessageData,
  actions: ImageGenerationSetAction
) => {
  switch (data.type) {
    case "image_iteration": {
      actions.setImage(data);
      break;
    }
    case "generation_complete": {
      actions.setImage(data);
      actions.setIsLoading(false);
      toast.success("Poster successfully generated!");
      break;
    }
    case "image_upscaled": {
      actions.setUpscaledImage(data);
      actions.setIsLoading(false);
      toast.success("Poster successfully upscaled!");
      break;
    }
    case "generation_failed": {
      toast.error("Poster generation failed");
      actions.setIsLoading(false);
      actions.setError(data.error);
      break;
    }
    case "message_not_found": {
      break;
    }
    default: {
      break;
    }
  }
};

export const readStreamData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  actions: ImageGenerationSetAction
) => {
  const decoder = new TextDecoder();

  let done = false;
  let jsonStringBuffer = ""; // Buffer to store the decoded JSON strings

  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    // Decode the value and add it to the jsonStringBuffer
    const decodedValue = decoder.decode(value);
    jsonStringBuffer += decodedValue;

    // Regular expression to find JSON objects in the jsonStringBuffer
    const jsonRegex = /{[^{}]*}/g;
    let jsonMatch;

    // Extract and process JSON objects from the jsonStringBuffer
    while ((jsonMatch = jsonRegex.exec(jsonStringBuffer)) !== null) {
      const jsonString = jsonMatch[0]; // Extract the JSON string

      try {
        const data = JSON.parse(jsonString);

        handleMessageData(data, actions);
      } catch (error: unknown) {
        console.log("error :", error);
        toast.error("Poster generation failed");
        break;
      }

      // Update the jsonStringBuffer to remove the processed JSON object
      jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
    }
  }
};
