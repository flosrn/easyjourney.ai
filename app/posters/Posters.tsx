import React from "react";
import Link from "next/link";

import type { PosterProps } from "./Poster";

type PostersProps = {
  posters: PosterProps[];
};

const Posters = ({ posters }: PostersProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posters.map((poster) => (
        <Link key={poster.id} href={`/posters/${poster.id}`}>
          <img
            src={`data:image/png;base64,${poster.image}`}
            alt=""
            className="h-auto w-full"
          />
        </Link>
      ))}
    </div>
  );
};

export default Posters;
