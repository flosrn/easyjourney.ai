import React from "react";
import { prisma } from "~/server/db/prisma";

import Poster from "./Poster";

export default async function PosterPage({
  params,
}: {
  params: { posterId: string };
}) {
  const { posterId } = params;
  const poster = await prisma.poster.findUnique({
    where: { id: posterId },
  });
  return (
    <>
      <section className="container mt-8 grid items-center justify-center gap-6 pb-8">
        {poster && <Poster {...poster} />}
      </section>
    </>
  );
}
