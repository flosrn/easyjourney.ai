import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession(req, res);

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
        const deleteLike = await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        res.status(204).json(deleteLike);
        return;
      }

      // Create a new like
      const newLike = await prisma.like.create({
        data: {
          userId: session.user.id,
          posterId,
        },
      });

      res.status(201).json(newLike);
    } catch (error: unknown) {
      console.error("Failed to like the poster", error);
      res.status(500).json({ message: "Failed to like the poster" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
