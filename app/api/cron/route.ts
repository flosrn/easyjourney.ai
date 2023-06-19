import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export async function GET() {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: { plan: "FREE" },
      data: { credits: 66 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR");
    console.log(`route FREE plan cron success at ${dateTime}`);

    return new Response("OK");
  } catch (error: unknown) {
    console.log("cron error:", error);
    return new Response("ERROR", { status: 500 });
  }
}
