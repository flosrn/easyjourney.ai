import React from "react";
import Link from "next/link";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { prisma } from "~/server/db/prisma";

import Poster from "../Poster";

export default async function PosterPage({
  params,
}: {
  params: { posterId: string };
}) {
  const { posterId } = params;
  const poster = await prisma.poster.findUnique({
    where: { id: posterId },
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
          <Link href={`/posters/${previousPoster?.id}`}>
            <ArrowBigLeft size={24} />
          </Link>
          <div className="">
            {poster && (
              <Poster
                id={poster.id}
                prompt={poster.prompt}
                imageSrc={poster.imageSrc}
              />
            )}
          </div>
          <Link href={`/posters/${nextPoster?.id}`}>
            <ArrowBigRight size={24} />
          </Link>
        </div>
      </section>
    </>
  );
}
