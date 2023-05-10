import type { Like, Poster, User } from "@prisma/client";

export type PosterType = Omit<Poster, "createdAt" | "updatedAt"> & {
  createdAt?: Date | string;
  likes?: Like[];
  user?: User | null;
  model?: string | null;
  style?: string | null;
  stylise?: string | null;
};

export type Posters = PosterType[];
