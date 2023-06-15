import React, { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../components/posters";

type getPostersOfFollowedUsersprops = {
  userId: string | undefined;
};

const getPostersOfFollowedUsers = async ({
  userId,
}: getPostersOfFollowedUsersprops) => {
  const followedUsers = await prisma.user.findMany({
    where: {
      followers: {
        some: {
          followerId: userId,
        },
      },
    },
    include: {
      posters: {
        orderBy: {
          createdAt: "desc",
        },
        include: { user: true, likes: true },
      },
    },
  });

  const posters = followedUsers.flatMap((user) => user.posters);
  return posters.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export default async function MyFeed() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  const posters = await getPostersOfFollowedUsers({ userId });

  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <h1 className="text-3xl font-bold">
          New posters from the persons I follow
        </h1>
        <Suspense fallback={<div>Loading posters...</div>}>
          {posters.length === 0 ? (
            <div className="text-xl font-bold">
              Follow users to see their posters here !
            </div>
          ) : (
            <Posters posters={posters} />
          )}
        </Suspense>
      </section>
    </>
  );
}
