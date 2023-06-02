import React, { Suspense } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../../components/posters";

const getPopularPosters = async () =>
  prisma.poster.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    include: { user: true, likes: true },
  });

export default async function PopularPage() {
  const posters = await getPopularPosters();
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <h1 className="text-3xl font-bold">Posters les plus populaires</h1>
        <Suspense fallback={<div>Loading posters...</div>}>
          <Posters posters={posters} />
        </Suspense>
      </section>
    </>
  );
}
