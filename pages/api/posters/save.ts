import type { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Non autorisé" });
    return;
  }

  const { title, prompt, poster } = req.body;
  try {
    const data = await prisma.poster.create({
      data: {
        title,
        prompt,
        image: poster,
        likes: 0,
        userId: session.user.id,
      },
    });

    res.status(200).json(data);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log("🚨 Error", error);
    res.status(500).json(error || "Internal Server Error");
  }
}
