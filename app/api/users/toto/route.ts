import { NextResponse } from "next/server";
import { env } from "~/env.mjs";

console.log("/api/users/toto/route.ts");

export async function GET(request: Request) {
  console.log("env.NEXT_PUBLIC_URL :", env.NEXT_PUBLIC_URL);
  const subscriptionUrl = `${env.NEXT_PUBLIC_URL}/settings/subscription`;

  return NextResponse.json({ url: subscriptionUrl });
}
