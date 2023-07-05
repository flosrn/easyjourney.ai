import type { MJMessage } from "midjourney";

const readStreamData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  loading: (data: MJMessage) => void,
  onError: (error: Error) => void
) => {
  const decoder = new TextDecoder();

  let done = false;
  let jsonStringBuffer = ""; // Buffer to store the decoded JSON strings

  try {
    while (!done) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      // Decode the value and add it to the jsonStringBuffer
      const decodedValue = decoder.decode(value);
      jsonStringBuffer += decodedValue;

      // Loop while there are newline characters in jsonStringBuffer
      let newlineIndex = jsonStringBuffer.indexOf("\n");
      while (newlineIndex !== -1) {
        const jsonString = jsonStringBuffer.slice(0, newlineIndex);
        jsonStringBuffer = jsonStringBuffer.slice(newlineIndex + 1);

        const parsedMessage = JSON.parse(jsonString);

        const debug = process.env.NODE_ENV === "development";
        console.log("parsedMessage :", parsedMessage);

        if (parsedMessage.type === "error") {
          onError(new Error(parsedMessage.message));
          return;
        }

        loading(parsedMessage);

        newlineIndex = jsonStringBuffer.indexOf("\n");
      }
    }
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log("readStreamData error :", error);
    throw error; // Propagate the error further up
  }
};

export default readStreamData;
