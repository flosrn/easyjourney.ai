import React, { Suspense, cache } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../Posters";

export const revalidate = 5;

const getNewPosters = cache(async () =>
  prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  })
);

export default async function NewPage() {
  const posters = await getNewPosters();
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <h1 className="text-3xl font-bold">Nouveaux posters</h1>
        <Suspense fallback={<div>Loading posters...</div>}>
          {/* @ts-expect-error Server Component */}
          <Posters posters={posters} />
        </Suspense>
      </section>
    </>
  );
}
