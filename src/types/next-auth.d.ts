/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession } from "next-auth";

/* eslint-disable no-shadow */
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
/* eslint-enable no-shadow */

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
      // ...other properties
    };
  }
}
