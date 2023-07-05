import { env } from "~/env.mjs";

const isDev = process.env.NODE_ENV === "development";

export const websocketUrl = isDev
  ? "ws://localhost:3002"
  : `wss://${env.NEXT_PUBLIC_MIDJOURNEY_DOMAIN}`;
