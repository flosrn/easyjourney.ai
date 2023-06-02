import React from "react";

import { cn } from "~/lib/classNames";
import type { Posters as PosterType } from "~/types/poster";

import Poster from "./poster";

type PostersProps = {
  posters: PosterType;
  noMargin?: boolean;
  className?: string;
};

const Posters = ({ posters, noMargin, className }: PostersProps) => {
  const formattedPosters = posters.map((poster) => {
    const createdAt =
      poster.createdAt instanceof Date
        ? poster.createdAt.toISOString()
        : poster.createdAt;
    return {
      ...poster,
      createdAt,
    };
  });

  const columns: PosterType[] = [[], [], [], []];

  formattedPosters.map((poster, index) => {
    columns[index % 4].push(poster);
  });

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
        {
          "mt-8": !noMargin,
        },
        className
      )}
    >
      {formattedPosters.length > 0 &&
        columns.map((column, index) => (
          <div className="grid h-fit gap-3" key={index}>
            {column.map((poster) => (
              <React.Fragment key={poster.id}>
                <Poster {...poster} />
              </React.Fragment>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Posters;
