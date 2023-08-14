import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
import { getUniqueUsername } from "~/utils/getUniqueUsername";
import type { Adapter, AdapterUser } from "next-auth/adapters";

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

    try {
      await fetch(`${env.NEXT_PUBLIC_URL}/api/discord/send-message/new-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
    } catch (error: unknown) {
      console.error(`Error sending message to Discord: ${error}`);
    }

    return newUser as AdapterUser;
  },
});
