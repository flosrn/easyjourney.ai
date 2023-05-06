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
      const { prompt, image, ratio, width, height } = req.body;
      console.log("req.body :", req.body);

      const data = await prisma.poster.create({
        data: {
          title: "",
          prompt,
          ratio,
          width,
          height,
          image,
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
