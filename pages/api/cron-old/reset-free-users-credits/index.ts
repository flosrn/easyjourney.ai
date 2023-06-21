import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: {
        plan: "FREE",
        // OR: [
        //   { stripeCurrentPeriodEnd: null }, // For users who never subscribed
        //   { stripeCurrentPeriodEnd: { lte: new Date() } }, // For users whose subscription has ended
        // ],
      },
      data: { credits: 5 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR", "Europe/Paris");
    console.log(`FREE plan cron success the ${dateTime}`);

    response.status(200).json({ success: true });
  } catch (error: unknown) {
    console.log("cron error:", error);
    response.status(500).json({ success: false });
  }
}
