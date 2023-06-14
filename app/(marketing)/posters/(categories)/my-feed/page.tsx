import React, { Suspense } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../../components/posters";

const getPostersOfFollowedUsers = async () => {
  return prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  });
};

export default async function MyFeed() {
  const posters = await getPostersOfFollowedUsers();
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <Suspense fallback={<div>Loading posters...</div>}>
          <Posters posters={posters} />
        </Suspense>
      </section>
    </>
  );
}
