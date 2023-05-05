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

  const columns = [[], [], [], []];
  formattedPosters.map((poster, index) => {
    columns[index % 4].push(poster);
  });

  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 ">
      {formattedPosters.length > 0 &&
        columns.map((column) => (
          <div className="grid h-fit gap-4 ">
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
