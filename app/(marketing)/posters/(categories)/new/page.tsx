import React, { Suspense } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../../components/posters";

export const revalidate = 5;

const getNewPosters = async () =>
  prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  });

export default async function NewPage() {
  const posters = await getNewPosters();
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
