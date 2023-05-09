import React from "react";
import Image from "next/image";
import { prisma } from "~/server/db/prisma";

import { cn } from "~/lib/classNames";
import type { Posters as PosterType } from "~/types/poster";

const getPopularPosters = async () =>
  prisma.poster.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    include: { user: true, likes: true },
  });

async function AnimatedPosters() {
  const posters = await getPopularPosters();
  const columns: PosterType[] = [[], [], [], [], [], [], [], [], [], []];
  
  posters.slice(0, 100).map((poster, index) => {
    columns[index % 10].push(poster);    
  });
  posters.slice(0, 100).map((poster, index) => {
    columns[index % 10].push(poster);    
  });

  return (
    <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-5 xl:grid-cols-10 ">
      {columns.map((column, index) => (
        <div
          key={index}
          className={cn(
            "grid h-fit gap-3",
            index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
          )}
        >
          {column.map((poster, index) => (
            <React.Fragment key={poster.id + index}>
              <Image
                src={poster.image}
                alt={index.toString()}
                width={500}
                height={500}
              />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnimatedPosters;
