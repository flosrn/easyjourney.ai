import React, { Suspense } from "react";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../posters/components/posters";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getPostersCreatedByUser = async (
  username: User["username"],
  authenticatedUserId?: User["id"]
) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      posters: {
        where: {
          OR: [{ isPublic: true }, { userId: authenticatedUserId }],
        },
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
  const session = await getServerAuthSession();
  const user = await getPostersCreatedByUser(username, session?.user.id);
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
