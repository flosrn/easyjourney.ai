import React, { Suspense, cache } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../Posters";

const getPostersByCategory = cache(async () =>
  prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  })
);

export default async function CategoriesPage() {
  const posters = await getPostersByCategory();
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <Suspense fallback={<div>Loading posters...</div>}>
          {/* @ts-expect-error Server Component */}
          <Posters posters={posters} />
        </Suspense>
      </section>
    </>
  );
}
