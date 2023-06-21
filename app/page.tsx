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

  posters.map((poster, index) => {
    columns[index % 10].push(poster);
  });
  posters.map((poster, index) => {
    columns[index % 10].push(poster);
  });

  return (
    <>
      <Header />
      <div className="relative z-10 h-full w-full overflow-hidden">
        <AnimatedPosters columns={columns} />
        <div className="flex-center absolute inset-0 h-full w-full bg-gradient-radial from-background/95 via-background/60 to-background/5 backdrop-blur-[1.5px]">
          <section className="max-w-2xl px-5">
            <TextTitleAnimated />
          </section>
        </div>
      </div>
    </>
  );
}
