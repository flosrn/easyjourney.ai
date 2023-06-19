import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 500 for all users in PRO plan
  await prisma.user.updateMany({
    where: { plan: "PRO" },
    data: { credits: 500 },
  });

  return NextResponse.json({ status: 200 });
}
