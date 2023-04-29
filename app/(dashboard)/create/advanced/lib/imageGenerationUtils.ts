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
      console.log("image_iteration");
      actions.setImage(data);
      break;
    }
    case "generation_complete": {
      console.log("generation_complete");
      toast.success("Poster successfully generated!");
      actions.setImage(data);
      actions.setIsLoading(false);
      break;
    }
    case "generation_failed": {
      console.log("generation failed:", data.error);
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
  let jsonStringBuffer = "";

  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const decodedValue = decoder.decode(value);
    jsonStringBuffer += decodedValue;

    const jsonRegex = /{[^{}]*}/g;
    let jsonMatch;

    while ((jsonMatch = jsonRegex.exec(jsonStringBuffer)) !== null) {
      const jsonString = jsonMatch[0];

      try {
        const data = JSON.parse(jsonString);

        handleMessageData(data, actions);
      } catch (error: unknown) {
        console.log("error :", error);
        toast.error("Poster generation failed");
        break;
      }

      jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
    }
  }
};
