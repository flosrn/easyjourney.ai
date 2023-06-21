import React, { Suspense } from "react";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import Posters from "../../posters/components/posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getPostersCreatedByUser = async (username: User["username"]) =>
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
  const user = await getPostersCreatedByUser(username);
  return (
    <Suspense fallback={<div>Loading posters...</div>}>
      {user?.posters && (
        <>
          <Posters posters={user.posters} noMargin />
        </>
      )}
    </Suspense>
  );
}
