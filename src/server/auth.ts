import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "./db/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      // @ts-expect-error - `clientId` and `clientSecret` are not defined in the type definition.
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error - `clientId` and `clientSecret` are not defined in the type definition.
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

export const getSession = async (...parameters: ParametersGetServerSession) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};
