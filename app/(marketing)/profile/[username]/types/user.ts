import type { Follow, User } from "@prisma/client";

export type UserWithFollowers = User & {
  followers: Follow[];
};
