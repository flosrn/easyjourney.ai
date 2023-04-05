import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { getUniqueUsername } from "~/utils/getUniqueUsername";

export const MyCustomAdapter = (prisma: PrismaClient): Adapter => ({
  ...PrismaAdapter(prisma),
  async createUser(user) {
    const username = await getUniqueUsername(prisma, user.email);
    const newUser = await prisma.user.create({
      data: {
        ...user,
        username,
        name: user.name ?? "",
        image: user.image ?? "",
      },
    });
    return newUser as AdapterUser;
  },
});
