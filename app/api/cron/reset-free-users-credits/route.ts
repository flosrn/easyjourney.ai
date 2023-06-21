import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export default async function GET() {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: { plan: "FREE" },
      data: { credits: 5 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR", "Europe/Paris");
    console.log(`FREE plan cron success the ${dateTime}`);

    return NextResponse.json({ status: "success" });
  } catch (error: unknown) {
    console.log("cron error:", error);
    return NextResponse.json({ status: "error" });
  }
}
