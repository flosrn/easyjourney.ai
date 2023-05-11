import React from "react";
import type { Poster } from "@prisma/client";
import { Toaster } from "react-hot-toast";
import { prisma } from "~/server/db/prisma";

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
      <section className="container mt-8  items-center justify-center gap-6 pb-8">
        <div className="mx-auto max-w-5xl md:flex md:flex-row md:space-x-8">
          <div className="flex justify-center md:w-8/12">
            {poster && <PosterImageContainer {...poster} />}
          </div>
          <div className="pt-4 md:w-5/12">
            {poster && <PosterInfoContainer {...poster} />}
          </div>
        </div>
        <Toaster position="bottom-right" />
      </section>
    </>
  );
}
