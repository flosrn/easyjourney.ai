import { Suspense } from "react";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../../posters/Posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getPostersLikedByUser = async (username: string) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      likes: {
        include: {
          poster: true,
        },
      },
    },
  });

const getPostersLikedByUser2 = async (username: string) => {
  return await prisma.like.findMany({
    where: { userId: username },
    include: { poster: true },
  });
};

export default async function Likes({
  params: { username },
}: UserProfileProps) {
  const likes = await getPostersLikedByUser2(username);
  const postersLiked = likes.map((like) => like.poster);
  console.log("likes", likes);
  console.log("posters", postersLiked);

  return (
    <div>
      <Suspense fallback={<div>Loading posters...</div>}>
        <Posters posters={postersLiked} />
      </Suspense>
    </div>
  );
}
