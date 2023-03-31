import React from "react";
import { getSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Posters from "../../posters/Posters";

export default async function MyPostersPage() {
  const session = await getSession();
  const posters = await prisma.poster.findMany({
    where: { userId: session?.user.id },
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
