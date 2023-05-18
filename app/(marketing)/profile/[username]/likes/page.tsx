import { Suspense } from "react";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../../posters/Posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getUserLikedPosters = async (username) =>
  prisma.like.findMany({
    where: { id: username },
    include: { poster: true },
  });

export default async function Likes({
  params: { username },
}: UserProfileProps) {
  const posterLiked = await getUserLikedPosters(username);
  console.log("posters", posterLiked);

  return (
    <div>
      <Suspense fallback={<div>Loading posters...</div>}>
        <Posters posters={posterLiked} />
      </Suspense>
    </div>
  );
}
