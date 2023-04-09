"use client";

import React from "react";
import type { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import type { PosterType } from "~/types/poster";

import Poster from "../Poster";

type ProfilePostersProps = {
  refetch: boolean;
};

const getPosters = async (userId?: User["id"]) => {
  const response = await fetch("/api/posters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
};

const UserPosters = ({ refetch }: ProfilePostersProps) => {
  const { data } = useSession();
  const { data: posters } = useQuery<PosterType[]>({
    queryKey: ["posters", refetch],
    queryFn: async () => getPosters(data?.user.id),
    enabled: !!data?.user.id,
  });

  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posters &&
        posters.length > 0 &&
        posters.map((poster) => (
          <React.Fragment key={poster.id}>
            <Poster {...poster} />
          </React.Fragment>
        ))}
    </div>
  );
};

export default UserPosters;
