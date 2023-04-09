import type { NextApiRequest, NextApiResponse } from "next/types";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

const getPostersForUser = async (userId: User["id"]) =>
  prisma.poster.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true,
    },
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const posters = await getPostersForUser(req.body.userId);
      res.status(200).json(posters);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log("🚨 Error", error);
      res.status(500).json(error || "Internal Server Error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
