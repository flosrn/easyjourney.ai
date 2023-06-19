import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: { plan: "FREE" },
      data: { credits: 50 },
    });
    console.log(`FREE plan cron success at ${new Date().toLocaleString()}`);
    return NextResponse.json({ status: 200 });
  } catch (error: unknown) {
    console.log("cron error:", error);
    return NextResponse.json({ status: 500 });
  }
}
