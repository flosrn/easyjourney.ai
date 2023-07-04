import crypto from "node:crypto";
import { NextResponse } from "next/server";

const data = {
  name: "my-event",
  channels: ["my-channel"],
  data: JSON.stringify({
    message: "Hello, World!",
  }),
};

const APP_URL =
  "https://test-962860ef-0edd-4af8-80b9-80ff13d3a303.florian-seran.workers.dev";
const APP_KEY = "89437548-5009-4bd4-9069-b2a37bc1e7d5";
const APP_SECRET = "TByC68SEECdkhonV8nxlFXw7AtHURSB7";
const APP_ID = "a485edce-d6a0-499d-be76-d5a576fcb5d6";

const body = JSON.stringify(data);

// Create a SHA256 hash of the body
const hash = crypto.createHash("sha256").update(body).digest("hex");

const path = `/apps/${APP_ID}/events`;
const queryString = "";

const stringToSign = `POST\n${path}\n${queryString}\n${hash}`;

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log("prompt :", prompt);

  const hmac = crypto.createHmac("sha256", APP_SECRET);
  hmac.update(stringToSign);

  const signature = hmac.digest("hex");

  console.log(`Authorization: Bearer ${APP_KEY}:${signature}`);

  const response = await fetch(`${APP_URL}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_KEY}:${signature}`,
    },
  })
    .then(async (res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(`error:${error}`));

  console.log("response :", response);
  return NextResponse.json({ message: "success", response });
}
