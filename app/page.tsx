import React from "react";
import { prisma } from "~/server/db/prisma";

import Header from "~/components/header/header";
import AnimatedPosters from "~/components/hero/animated-posters";
import TextTitleAnimated from "~/components/hero/text-title-animated";

import type { Posters as PosterType } from "~/types/poster";

const getPopularPosters = async () =>
  prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

export default async function IndexPage() {
  const posters = await getPopularPosters();
  const columns: PosterType[] = [[], [], [], [], [], [], [], [], [], []];

  posters.slice(0, 100).map((poster, index) => {
    columns[index % 10].push(poster);
  });
  posters.slice(0, 100).map((poster, index) => {
    columns[index % 10].push(poster);
  });

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex-center absolute inset-0 z-10 mt-7 bg-gradient-radial from-background/95 via-background/60 to-background/5 backdrop-blur-[1.5px]">
        <section className="flex max-w-2xl flex-col items-center gap-2 space-y-2 px-5">
          <TextTitleAnimated />
        </section>
      </div>
      <AnimatedPosters columns={columns} />
    </div>
  );
}
