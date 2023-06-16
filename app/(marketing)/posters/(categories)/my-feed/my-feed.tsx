"use client";

import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import Posters from "../../components/posters";

const getPostersFromFollowedUsers = async () => {
  const response = await fetch("/api/posters/my-feed", {
    method: "GET",
  });
  const data = await response.json();

  return data.posters;
};

const MyFeed = () => {
  const { data: posters } = useQuery({
    queryKey: ["PostersFromFollowedUsers"],
    queryFn: async () => getPostersFromFollowedUsers(),
  });
  console.log("posters :", posters);

  return (
    <>
      <Suspense fallback={<div>Loading posters...</div>}>
        {posters?.length === 0 ? (
          <div className="text-xl font-bold">
            Follow users to see their posters here !
          </div>
        ) : (
          <Posters posters={posters} />
        )}
      </Suspense>
    </>
  );
};

export default MyFeed;
