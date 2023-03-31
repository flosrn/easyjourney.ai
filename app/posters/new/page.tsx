import React from "react";
import { prisma } from "~/server/db/prisma";

import Posters from "../Posters";

export default async function NewPage() {
  const posters = await prisma.poster.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <Posters posters={posters} />
      </section>
    </>
  );
}
