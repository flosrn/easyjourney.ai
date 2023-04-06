import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "POST") {
    const { posterId } = req.body;

    if (!posterId) {
      res.status(400).json({ message: "Poster ID is required" });
      return;
    }

    try {
      // Check if the like already exists
      const existingLike = await prisma.like.findFirst({
        where: {
          userId: session.user.id,
          posterId,
        },
      });

      if (existingLike) {
        res.status(409).json({ message: "Already liked" });
        return;
      }

      // Create a new like
      const newLike = await prisma.like.create({
        data: {
          userId: session.user.id,
          posterId,
        },
      });

      res.status(200).json(newLike);
    } catch (error: unknown) {
      console.error("Failed to like the poster", error);
      res.status(500).json({ message: "Failed to like the poster" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
