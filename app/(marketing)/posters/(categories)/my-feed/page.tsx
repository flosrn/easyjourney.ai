import React, { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../components/posters";

const getNewPosters = async ({ userId }: string) => {
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
  return followedUsers.flatMap((user) => user.posters);
};

export default async function MyFeed() {
  const session = await getServerAuthSession();
  console.log("session :", session);

  const posters = await getNewPosters(session?.user.id);
  console.log("posters :", posters);
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <h1 className="text-3xl font-bold">Nouveaux posters</h1>
        <Suspense fallback={<div>Loading posters...</div>}>
          <Posters posters={posters} />
        </Suspense>
      </section>
    </>
  );
}
