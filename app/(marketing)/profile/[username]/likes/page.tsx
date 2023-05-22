import { Suspense } from "react";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../../posters/Posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getLikesByUser = async (username: string) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      likes: true,
    },
  });

const getLikedPosters = async (likesId) =>
  prisma.like.findMany({
    where: {
      id: likesId,
    },
    include: {
      poster: true,
    },
  });

export default async function Likes({
  params: { username },
}: UserProfileProps) {
  const user = await getLikesByUser(username);
  const likesId = user.likes.map((like) => like.posterId);
  const likedPosters = await getLikedPosters(likesId);

  console.log("likes", user);
  console.log("likesId", likesId);

  return (
    <div>
      <Suspense fallback={<div>Loading posters...</div>}>
        <Posters posters={likedPosters} />
      </Suspense>
    </div>
  );
}
