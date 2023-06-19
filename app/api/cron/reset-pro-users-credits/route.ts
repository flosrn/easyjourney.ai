import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export async function GET() {
  // reset credits to 500 for all users in PRO plan
  try {
    await prisma.user.updateMany({
      where: { plan: "PRO" },
      data: { credits: 500 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR");
    console.log(`PRO plan cron success at ${dateTime}`);

    return new Response("OK");
  } catch (error: unknown) {
    console.log("cron error:", error);
    return new Response("ERROR", { status: 500 });
  }
}
