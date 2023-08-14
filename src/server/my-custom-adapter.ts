import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
import { getUniqueUsername } from "~/utils/getUniqueUsername";
import type { Adapter, AdapterUser } from "next-auth/adapters";

type DiscordResponse = {
  ok?: boolean;
  error?: string;
  status?: number;
};

const sendDiscordMessage = async (user: AdapterUser) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_URL}/api/discord/send-message/new-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to send message to Discord. Status: ${response.status}`
    );
    return;
  }

  const data: DiscordResponse = await response.json();
  if (data.error) {
    console.error(`Error from Discord: ${data.error}`);
    return;
  }

  console.log("Message sent to Discord successfully");
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
