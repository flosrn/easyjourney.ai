import React from "react";
import Link from "next/link";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { prisma } from "~/server/db/prisma";

import PosterProduct from "../../posters/PosterProduct";

export default async function PosterPage({
  params,
}: {
  params: { posterId: string };
}) {
  const { posterId } = params;
  const poster = await prisma.poster.findUnique({
    where: { id: posterId },
    include: { user: true },
  });

  const nextPoster = await prisma.poster.findFirst({
    where: {
      id: {
        gt: posterId,
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const previousPoster = await prisma.poster.findFirst({
    where: {
      id: {
        lt: posterId,
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <section className="container mt-8 grid items-center justify-center gap-6 pb-8">
        <div className="flex items-center justify-center space-x-5">
          <Link href={`/poster/${previousPoster?.id}`}>
            <ArrowBigLeft size={24} />
          </Link>
          <div className="">
            {poster && (
              <PosterProduct
                id={poster.id}
                prompt={poster.prompt}
                image={poster.image}
                user={poster.user}
              />
            )}
          </div>
          <Link href={`/poster/${nextPoster?.id}`}>
            <ArrowBigRight size={24} />
          </Link>
        </div>
      </section>
    </>
  );
}
