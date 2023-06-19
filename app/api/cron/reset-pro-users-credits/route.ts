import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 500 for all users in PRO plan
  try {
    await prisma.user.updateMany({
      where: { plan: "PRO" },
      data: { credits: 500 },
    });
    console.log(`PRO plan cron success at ${new Date().toLocaleString()}`);
    return NextResponse.json({ status: 200 });
  } catch (error: unknown) {
    console.log("cron error:", error);
    return NextResponse.json({ status: 500 });
  }
}
