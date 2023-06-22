import type { Like, Poster, User } from "@prisma/client";

export type UserWithFollowStatus = User & { isFollowing?: boolean };

export type PosterType = Omit<Poster, "createdAt" | "updatedAt"> & {
  createdAt?: Date | string;
  likes?: Like[];
  user?: UserWithFollowStatus | null;
};

export type Posters = PosterType[];
