import type { Dispatch, SetStateAction } from "react";
import type { APIAttachment } from "discord-api-types/v10";
import toast from "react-hot-toast";

type MessageData = APIAttachment & {
  type: string;
  error?: string;
};

export const handleMessageData = (
  data: MessageData,
  setImage: Dispatch<SetStateAction<APIAttachment | null>>
) => {
  switch (data.type) {
    case "image_iteration": {
      console.log("image_iteration");
      setImage(data);
      break;
    }
    case "generation_complete": {
      console.log("generation_complete");
      toast.success("Poster successfully generated!");
      setImage(data);
      break;
    }
    case "generation_failed": {
      console.log("generation failed:", data.error);
      toast.error("Poster generation failed");
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
  setImage: Dispatch<SetStateAction<APIAttachment | null>>
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

        handleMessageData(data, setImage);
      } catch (error: unknown) {
        console.log("error :", error);
        toast.error("Poster generation failed");
        break;
      }

      jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
    }
  }
};
