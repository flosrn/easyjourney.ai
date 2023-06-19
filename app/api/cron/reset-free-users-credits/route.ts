import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 5 for all users in FREE plan
  await prisma.user.updateMany({
    where: { plan: "FREE" },
    data: { credits: 5 },
  });

  return NextResponse.json({ status: 200 });
}
