import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { getUniqueUsername } from "~/utils/getUniqueUsername";

type CustomAdapterUser = Omit<AdapterUser, "id"> & {
  name?: string | null;
  image?: string | null;
};

export const MyCustomAdapter = (prisma: PrismaClient): Adapter => ({
  ...PrismaAdapter(prisma),
  async createUser(user: CustomAdapterUser) {
    const username = await getUniqueUsername(prisma, user.email);
    const userData: Record<string, unknown> = {
      ...user,
      username,
      name: user.name ?? "",
      image: user.image ?? "",
    };
    const newUser = await prisma.user.create({
      data: userData as never,
    });
    return newUser as AdapterUser;
  },
});
