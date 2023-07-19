import { errorResponse, websocketUrl } from "./utils";

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body :", body);

  const socket = new WebSocket(websocketUrl);

  socket.addEventListener("open", () => {
    console.log("WebSocket is connected");
    if (body.attachment) {
      body.attachment = undefined;
    }
    socket.send(JSON.stringify(body));
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
            encoder.encode(`${JSON.stringify({ progress: "waiting" })}\n`)
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

        // If the message indicates an error, close the controller and clear the interval
        if (data.error) {
          console.log("WebSocket encountered an error:", data.error);
          const error = errorResponse(data.error);
          controller.enqueue(encoder.encode(`${JSON.stringify(error)}\n`));
          controller.close();
          clearInterval(intervalId);
          return;
        }

        // If the message indicates the end of the stream, close the controller and clear the interval
        if (data.progress === "done") {
          console.log("data :", data);
          const formattedData = {
            ...data,
            fullPrompt: data.content.split("**")[1],
            jobId: data.hash,
          };
          const message = `${JSON.stringify(formattedData)}\n`;
          controller.enqueue(encoder.encode(message));
          console.log("WebSocket is done");
          controller.close();
          clearInterval(intervalId);
          return;
        }

        controller.enqueue(encoder.encode(`${JSON.stringify(data)}\n`));
      });

      socket.addEventListener("error", (errorEvent) => {
        console.log("WebSocket encountered an error:", errorEvent);
        const error = errorResponse(errorEvent);
        controller.enqueue(encoder.encode(`${JSON.stringify(error)}\n`));
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
