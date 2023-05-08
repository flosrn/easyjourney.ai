import React from "react";
import Link from "next/link";
import type { Poster } from "@prisma/client";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { prisma } from "~/server/db/prisma";

import PosterProduct from "./PosterProduct";

const getCurrentPoster = async (posterId: Poster["id"]) =>
  prisma.poster.findUnique({
    where: { id: posterId },
    include: { user: true, likes: true },
  });

export default async function PosterPage({
  params,
}: {
  params: { posterId: Poster["id"] };
}) {
  const { posterId } = params;
  const poster = await getCurrentPoster(posterId);

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
      <section className="container mt-8 items-center justify-center gap-6 pb-8">
        <div className="w-full">
          {/*<div className="flex items-center justify-center space-x-5">*/}
          {/*<Link href={`/poster/${previousPoster?.id}`}>*/}
          {/*  <ArrowBigLeft size={24} />*/}
          {/*</Link>*/}
          <div className="">{poster && <PosterProduct {...poster} />}</div>

          {/*<Link href={`/poster/${nextPoster?.id}`}>*/}
          {/*  <ArrowBigRight size={24} />*/}
          {/*</Link>*/}
        </div>
      </section>
    </>
  );
}
