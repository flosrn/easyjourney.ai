import React from "react";
import { prisma } from "~/server/db/prisma";

import Header from "~/components/header/header";
import AnimatedPosters from "~/components/hero/animated-posters";
import Title from "~/components/hero/title";

import { siteConfig } from "~/config/site";
import type { Posters as PosterType } from "~/types/poster";

const getPopularPosters = async () =>
  prisma.poster.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
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

  const titleData = {
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    description: siteConfig.description,
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Title {...titleData} />
      <AnimatedPosters columns={columns} />
    </div>
  );
}
