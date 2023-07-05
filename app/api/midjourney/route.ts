import { websocketUrl } from "./utils";

export const runtime = "edge";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const socket = new WebSocket(websocketUrl);

  socket.addEventListener("open", () => {
    console.log("WebSocket is connected");
    prompt && socket.send(prompt);
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    start(controller) {
      let intervalId: number | undefined = undefined;

      const startInterval = () => {
        // if a message is not received within 9.5 seconds, send loading
        intervalId = setInterval(() => {
          console.log("Waiting for message...");
          controller.enqueue(
            encoder.encode(`${JSON.stringify({ progress: "loading" })}\n`)
          );
        }, 9500) as unknown as number;
      };

      // Start the interval when the ReadableStream is started
      startInterval();

      socket.addEventListener("message", (event) => {
        // When a message is received, clear the current interval and start a new one
        clearInterval(intervalId);
        startInterval();

        const data = JSON.parse(event.data);
        console.log("data :", data);

        // If the message indicates the end of the stream, close the controller and clear the interval
        if (data.done) {
          console.log("WebSocket is done");
          controller.close();
          clearInterval(intervalId);
          return;
        }

        controller.enqueue(encoder.encode(`${JSON.stringify(data)}\n`));
      });

      socket.addEventListener("error", (error) => {
        console.log("WebSocket encountered an error:", error);
        const errorResponse = {
          type: "error",
          message: "An error occurred with the WebSocket connection.",
          error,
        };
        controller.enqueue(
          encoder.encode(`${JSON.stringify(errorResponse)}\n`)
        );
        controller.close();
        clearInterval(intervalId);
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket is closed");
        controller.close();
        clearInterval(intervalId);
      });
    },
  });

  return new Response(readable, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server
      // "Content-Type": "text/html; charset=utf-8",
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
    }),
  });
}
