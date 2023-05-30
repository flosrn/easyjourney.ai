import type { ImageGenerationSetAction } from "../store/imageGenerationStore";

const readStreamData = async (
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

        data && actions.addImage(data);
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log("readStreamData error :", error);
        break;
      }

      // Update the jsonStringBuffer to remove the processed JSON object
      jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
    }
  }
};

export default readStreamData;
