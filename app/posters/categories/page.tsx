import React, { Suspense } from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../Posters";

export default async function CategoriesPage() {
  const posters = await prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  });
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
