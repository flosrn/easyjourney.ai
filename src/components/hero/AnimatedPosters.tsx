import React from "react";
import Image from "next/image";

import { cn } from "~/lib/classNames";
import type { Posters as PosterType } from "~/types/poster";

type AnimatedPostersProps = {
  columns: PosterType[];
};

const AnimatedPosters = ({ columns }: AnimatedPostersProps) => (
  <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-5 xl:grid-cols-10">
    {columns.map((column, index) => (
      <div
        key={index}
        className={cn(
          "grid h-fit gap-3",
          index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
        )}
      >
        {column.map((poster) => (
          <Image
            key={poster.id}
            src={poster.image}
            alt={poster.prompt}
            width={poster.width ?? 500}
            height={poster.height ?? 500}
            priority
            quality={10}
            // seems not working on nextjs 13.x yet, see https://github.com/vercel/next.js/issues/42140
            placeholder="blur"
            blurDataURL={`${poster.image}/-/blur/500/`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default AnimatedPosters;
