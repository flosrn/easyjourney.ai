import { prisma } from "~/server/db/prisma";

export const getUserCredits = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      credits: true,
      freeCredits: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.credits || !user.freeCredits) return false;

  const hasEnoughCredits = user.credits + user.freeCredits > 0;

  return hasEnoughCredits;
};
