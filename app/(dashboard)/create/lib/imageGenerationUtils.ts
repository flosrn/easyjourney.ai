import toast from "react-hot-toast";

import type {
  ImageData,
  ImageGenerationSetAction,
} from "../store/imageGenerationStore";

export const handleMessageData = (
  image: ImageData | null,
  setImageType: (
    imageType: "generation" | "upscale" | "variation" | null
  ) => void
) => {
  switch (image?.type) {
    case "loading": {
      break;
    }
    case "image_iteration": {
      break;
    }
    case "generation_complete": {
      setImageType("generation");
      toast.success("Poster successfully generated!");
      break;
    }
    case "image_upscaled": {
      setImageType("upscale");
      toast.success("Poster successfully upscaled!");
      break;
    }
    case "variation_complete": {
      setImageType("variation");
      toast.success("Variation successfully generated!");
      break;
    }
    case "generation_failed": {
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
        console.log("data :", data);

        data && actions.addImage(data);
        actions.setIsLoading(false);
        actions.setLoadingType(null);
        // handleMessageData(data, actions);
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
