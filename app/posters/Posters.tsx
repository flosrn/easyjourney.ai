import React from "react";
import Link from "next/link";
import { prisma } from "~/server/db/prisma";

import Poster from "./Poster";

type PostersProps = {
  userId?: string;
};

const Posters = async ({ userId }: PostersProps) => {
  let posters = [];

  posters = await (userId
    ? prisma.poster.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { user: true, likes: true },
      })
    : prisma.poster.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true, likes: true },
      }));

  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posters.length > 0 &&
        posters.map((poster) => (
          <Link
            key={poster.id}
            href={`/poster/${poster.id}`}
            className="relative w-[150px]"
          >
            <Poster
              id={poster.id}
              prompt={poster.prompt}
              image={poster.image}
              likes={poster.likes}
              author={poster.user?.username}
            />
          </Link>
        ))}
    </div>
  );
};

export default Posters;
