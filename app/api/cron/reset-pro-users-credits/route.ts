import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 500 for all users in PRO plan
  try {
    await prisma.user.updateMany({
      where: { plan: "PRO" },
      data: { credits: 500 },
    });
    console.log(`PRO plan cron success at ${new Date().toLocaleString()}`);
    return new Response("OK");
  } catch (error: unknown) {
    console.log("cron error:", error);
    return new Response("ERROR", { status: 500 });
  }
}
