import { prisma } from "~/server/db/prisma";

export async function GET() {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: { plan: "FREE" },
      data: { credits: 5 },
    });
    console.log(`FREE plan cron success at ${new Date().toLocaleString()}`);
    return new Response("OK");
  } catch (error: unknown) {
    console.log("cron error:", error);
    return new Response("ERROR", { status: 500 });
  }
}
