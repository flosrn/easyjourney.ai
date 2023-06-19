import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // reset credits to 5 for all users in FREE plan
  try {
    await prisma.user.updateMany({
      where: { plan: "FREE" },
      data: { credits: 13 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR", "Europe/Paris");
    console.log(`FREE plan cron success at ${dateTime}`);

    response.status(200).json({ success: true });
  } catch (error: unknown) {
    console.log("cron error:", error);
    response.status(500).json({ success: false });
  }
}
