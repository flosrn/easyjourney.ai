import React from "react";

import type { Posters as PosterType } from "~/types/poster";

import Poster from "./Poster";

type PostersProps = {
  posters: PosterType;
};

const Posters = ({ posters }: PostersProps) => {
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
  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {formattedPosters.length > 0 &&
        formattedPosters.map((poster) => (
          <React.Fragment key={poster.id}>
            <Poster {...poster} />
          </React.Fragment>
        ))}
    </div>
  );
};

export default Posters;
