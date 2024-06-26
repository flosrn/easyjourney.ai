import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
import { getUniqueUsername } from "~/utils/getUniqueUsername";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { z } from "zod";

import { safeFetch } from "~/lib/safeFetch";

const schema = z.object({
  success: z.boolean().optional(),
  error: z.string().optional(),
});

const sendDiscordMessage = async (user: AdapterUser) => {
  await safeFetch(
    schema,
    `${env.NEXT_PUBLIC_URL}/api/discord/send-message/new-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    }
  );
};

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

    await sendDiscordMessage(newUser);

    return newUser as AdapterUser;
  },
});
