import type { PrismaClient } from "@prisma/client";

import { generateRandomUsername } from "./generateRandomUsername";

export const getUniqueUsername = async (
  prisma: PrismaClient,
  email: string
): Promise<string> => {
  // Génère un nom d'utilisateur à partir de l'email
  const username = generateRandomUsername(email);
  // Vérifie si le nom d'utilisateur existe déjà
  const userWithSameUsername = await prisma.user.findUnique({
    where: { username },
  });
  // Si le nom d'utilisateur existe déjà, génère un nouveau
  if (userWithSameUsername) {
    return getUniqueUsername(prisma, email);
  }
  // Sinon, retourne le nom d'utilisateur
  return username;
};
