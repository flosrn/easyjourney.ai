import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { env } from "~/env.mjs";
import { MyCustomAdapter } from "~/server/my-custom-adapter";
import {
  getServerSession as getNextAuthServerSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "./db/prisma";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: MyCustomAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      // @ts-expect-error: to fix later
      session.user.username = user.username;
      session.user.image = user.image;
      // @ts-expect-error: to fix later
      session.user.role = user.role;
      // @ts-expect-error: to fix later
      session.user.credits = user.credits;
      // @ts-expect-error: to fix later
      session.user.freeCredits = user.freeCredits;
      // @ts-expect-error: to fix later
      session.user.plan = user.plan;
      return session;
    },
  },
  debug: false,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

export const getServerAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  return getNextAuthServerSession(...parameters, authOptions);
};

export const getCurrentUser = async () => {
  const session = await getServerAuthSession();
  return session?.user;
};
