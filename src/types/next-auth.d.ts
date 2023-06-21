/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { SubscriptionPlan, UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      role?: UserRole;
      plan?: SubscriptionPlan;
      credits?: number;
      freeCredits?: number;
      // ...other properties
    };
  }
}
