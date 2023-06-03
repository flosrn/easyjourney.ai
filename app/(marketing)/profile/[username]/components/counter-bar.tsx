"use client";

import { useState } from "react";

import CounterBarDialog from "./counter-bar-dialog/counter-bar-dialog";

type counterBarProps = {
  totalPosters: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
  username: string;
};

export const CounterBar = ({
  totalPosters,
  totalLikes,
  totalFollowers,
  totalFollowing,
  username,
}: counterBarProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string>("likes");

  const handleClick = (value: string) => {
    setDefaultValue(value);
    setOpenDialog(true);
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{totalPosters}</h2>
        <p className="text-gray-500">Posters</p>
      </div>
      <div className="text-center">
        <h2
          className="text-2xl font-semibold"
          onClick={() => handleClick("likes")}
        >
          {totalLikes}
        </h2>
        <p className="text-gray-500">Likes</p>
      </div>
      <div className="text-center">
        <h2
          className="text-2xl font-semibold"
          onClick={() => handleClick("followers")}
        >
          {totalFollowers}
        </h2>
        <p className="text-gray-500">Followers</p>
      </div>
      <div className="text-center">
        <h2
          className="text-2xl font-semibold"
          onClick={() => handleClick("following")}
        >
          {totalFollowing}
        </h2>
        <p className="text-gray-500">Following</p>
      </div>
      <CounterBarDialog
        open={openDialog}
        setOpen={setOpenDialog}
        defaultValue={defaultValue}
        username={username}
      />
    </div>
  );
};
