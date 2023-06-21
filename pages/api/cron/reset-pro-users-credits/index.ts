import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "~/server/db/prisma";
import { formatDateToString } from "~/utils/formatDate";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // reset credits to 500 for all users in PRO plan
  try {
    await prisma.user.updateMany({
      where: { plan: "PRO" },
      data: { credits: 500 },
    });

    const dateTime = formatDateToString(Date.now(), "fr-FR", "Europe/Paris");
    console.log(`PRO plan cron success the ${dateTime}`);

    response.status(200).json({ success: true });
  } catch (error: unknown) {
    console.log("cron error:", error);
    response.status(500).json({ success: false });
  }
}
