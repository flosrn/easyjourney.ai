import { NextResponse } from "next/server";
import { env } from "~/env.mjs";

const DISCORD_CHANNEL_ID = "1130528546809446460";
const API_URL = `https://discord.com/api/channels/${DISCORD_CHANNEL_ID}/messages`;

export async function POST(request: Request) {
  try {
    const { user } = await request.json();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `New user registered: **${user.name}** (${user.email}) ✨`,
      }),
    });

    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
