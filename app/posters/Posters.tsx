import React from "react";
import Link from "next/link";
import { prisma } from "~/server/db/prisma";

type PostersProps = {
  userId?: string;
};

const Posters = async ({ userId }: PostersProps) => {
  let posters = [];

  posters = await (userId
    ? prisma.poster.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      })
    : prisma.poster.findMany({
        orderBy: { createdAt: "desc" },
      }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posters.map((poster) => (
        <Link key={poster.id} href={`/posters/${poster.id}`}>
          <img
            src={`data:image/png;base64,${poster.image}`}
            alt=""
            className="h-auto w-full"
          />
        </Link>
      ))}
    </div>
  );
};

export default Posters;
