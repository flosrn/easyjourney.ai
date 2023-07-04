import { env } from "~/env.mjs";

const isDev = process.env.NODE_ENV === "development";
const websocketUrl = isDev
  ? "ws://localhost:3002"
  : `ws://${env.NEXT_PUBLIC_MIDJOURNEY_DOMAIN}`;

export const runtime = "edge";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log("websocketUrl :", websocketUrl);

  const socket = new WebSocket(websocketUrl);

  socket.addEventListener("open", () => {
    console.log("WebSocket is connected");
    prompt && socket.send(prompt);
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    start(controller) {
      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        console.log("data :", data);
        controller.enqueue(encoder.encode(`${JSON.stringify(data)}\n`));
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket is closed");
        controller.close();
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
