import React from "react";

import Poster from "./Poster";

type PostersProps = {
  posters: {
    id: string;
    prompt: string;
    image: string;
    likes: { userId: string }[];
    user?: { username: string };
  }[];
};

const Posters = async ({ posters }: PostersProps) => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posters.length > 0 &&
        posters.map((poster) => (
          <React.Fragment key={poster.id}>
            <Poster
              id={poster.id}
              prompt={poster.prompt}
              image={poster.image}
              likes={poster.likes}
              author={poster.user?.username}
            />
          </React.Fragment>
        ))}
    </div>
  );
};

export default Posters;
