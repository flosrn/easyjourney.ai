import type { NextApiRequest, NextApiResponse } from "next/types";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession(req, res);

  if (!session) {
    res.status(401).json({ message: "Non autorisé!!" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      const title = prompt.split(" ").slice(0, 3).join(" ").replaceAll(",", "");
      console.log("title :", title);

      const data = await prisma.poster.create({
        data: {
          title,
          ...req.body,
          userId: session.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log("🚨 Error", error);
      res.status(500).json(error || "Internal Server Error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
