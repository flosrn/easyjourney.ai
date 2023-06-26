import { Suspense } from "react";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import Posters from "../../../posters/components/posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getUserLikes = async (userId: string) =>
  prisma.like.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
    include: {
      poster: {
        include: {
          likes: true,
        },
      },
    },
  });

const getUser = async (username: string) =>
  prisma.user.findUnique({
    where: { username },
  });

export default async function Likes({
  params: { username },
}: UserProfileProps) {
  const user = await getUser(username);
  const likes = user && (await getUserLikes(user.id));
  const posters = likes?.map((like) => like.poster);
  return (
    <div>
      <Suspense fallback={<div>Loading posters...</div>}>
        {posters && <Posters posters={posters} noMargin className="mt-4" />}
      </Suspense>
    </div>
  );
}
