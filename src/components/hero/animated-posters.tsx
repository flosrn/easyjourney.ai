import React from "react";
// use next/legacy/image to avoid nextjs 13.x issue with blur placeholder
// TODO: replace next/legacy/image by next/image when nextjs Image blur is stable
import Image from "next/legacy/image";

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
        {column.map((poster, posterIndex) => (
          <Image
            key={`${poster.id}-${posterIndex}`}
            src={poster.image}
            alt={poster.prompt}
            width={poster.width ?? 500}
            height={poster.height ?? 500}
            priority
            quality={1}
            // seems not working on nextjs 13.x yet, see https://github.com/vercel/next.js/issues/42140
            placeholder="blur"
            blurDataURL={poster.image}
          />
        ))}
      </div>
    ))}
  </div>
);

export default AnimatedPosters;
