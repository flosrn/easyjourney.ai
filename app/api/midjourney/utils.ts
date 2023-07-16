import { env } from "~/env.mjs";

const isDev = process.env.NODE_ENV === "development";

export const websocketUrl = isDev
  ? "ws://localhost:3002"
  : `wss://${env.NEXT_PUBLIC_MIDJOURNEY_DOMAIN}`;

export const errorResponse = (error: Error | Event) => ({
  type: "error",
  message: "An error occurred with the WebSocket connection.",
  error,
});
