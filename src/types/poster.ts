import type { Like, Poster as PrismaPoster, User } from "@prisma/client";

export type UserWithFollowStatus = User & { isFollowing?: boolean };

export type Poster = Omit<PrismaPoster, "createdAt" | "updatedAt"> & {
  createdAt?: Date | string;
  likes?: Like[];
  user?: UserWithFollowStatus | null;
};

export type Posters = Poster[];
