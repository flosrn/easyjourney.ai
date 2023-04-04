import React from "react";
import Image from "next/image";
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
      {posters.length > 0 &&
        posters.map((poster) => (
          <Link key={poster.id} href={`/posters/${poster.id}`}>
            <Image
              alt={poster.prompt}
              src={poster.image}
              width="400"
              height="300"
            />
          </Link>
        ))}
    </div>
  );
};

export default Posters;
