import type { NextApiRequest, NextApiResponse } from "next/types";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res);

  if (!session) {
    res.status(401).json({ message: "Non autorisé!!" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { prompt, image } = req.body;

      const data = await prisma.poster.create({
        data: {
          title: "",
          prompt,
          image,
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
