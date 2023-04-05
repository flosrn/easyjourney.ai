import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { getUniqueUsername } from "~/utils/getUniqueUsername";

type CustomAdapterUser = Omit<AdapterUser, "id"> & {
  username?: string;
  name?: string | null;
  image?: string | null;
};

export const MyCustomAdapter = (prisma: PrismaClient): Adapter => ({
  ...PrismaAdapter(prisma),
  async createUser(user: CustomAdapterUser) {
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
