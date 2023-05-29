import React, { Suspense } from "react";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../posters/Posters";
import { ButtonSelectPosters, SelectPosters } from "./components/SelectPosters";

type UserProfileProps = {
  params: { username: User["username"]; isMe: boolean };
};

const getUserCreatedPosters = async (username: User["username"]) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      posters: {
        orderBy: { createdAt: "desc" },
        include: { likes: true },
      },
      followers: true,
      following: true,
    },
  });

export default async function CreatedByUser({
  params: { username },
}: UserProfileProps) {
  const user = await getUserCreatedPosters(username);
  const session = await getServerAuthSession();
  const isMe = session?.user.id === user?.id;
  return (
    <Suspense fallback={<div>Loading posters...</div>}>
      {user?.posters && (
        <>
          {!!isMe && <ButtonSelectPosters />}
          <Posters posters={user.posters} noMargin className="mt-4" />
          <SelectPosters />
        </>
      )}
    </Suspense>
  );
}
