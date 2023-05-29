import React from "react";
import type { Poster } from "@prisma/client";
import { prisma } from "~/server/db/prisma";
import { Toaster } from "react-hot-toast";

import BackToPreviousPageButton from "~/components/posters/BackToPreviousPageButton";

import PosterImageContainer from "./components/PosterImageContainer";
import PosterInfoContainer from "./components/PosterInfoContainer";

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
  return (
    <>
      <section className="container mt-8 items-center justify-center gap-6 pb-8">
        <div className="mx-auto max-w-5xl md:flex md:flex-row md:space-x-8">
          <BackToPreviousPageButton />
        </div>
        <div className="mx-auto max-w-5xl md:flex md:flex-row md:space-x-8">
          {poster ? (
            <>
              <PosterImageContainer {...poster} />
              <PosterInfoContainer {...poster} />
            </>
          ) : (
            <p className="w-full text-center text-2xl font-bold">
              Poster not found
            </p>
          )}
        </div>
        <Toaster position="bottom-right" />
      </section>
    </>
  );
}
