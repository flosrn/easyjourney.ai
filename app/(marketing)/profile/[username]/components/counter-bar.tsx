"use client";

import { useState } from "react";

import CounterBarDialog from "./counter-bar-dialog/counter-bar-dialog";

type counterBarProps = {
  totalPosters: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
  username: string;
  actualUser: string;
};

export const CounterBar = ({
  totalPosters,
  totalLikes,
  totalFollowers,
  totalFollowing,
  username,
  actualUser,
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
      <div
        className="select-none text-center transition duration-300 hover:scale-110"
        onClick={() => handleClick("likes")}
      >
        <h2 className="text-2xl font-semibold">{totalLikes}</h2>
        <p className="text-gray-500">Likes</p>
      </div>
      <div
        className="select-none text-center transition duration-300 hover:scale-110"
        onClick={() => handleClick("followers")}
      >
        <h2 className="text-2xl font-semibold">{totalFollowers}</h2>
        <p className="text-gray-500">Followers</p>
      </div>
      <div
        className="select-none text-center transition duration-300 hover:scale-110"
        onClick={() => handleClick("following")}
      >
        <h2 className="text-2xl font-semibold">{totalFollowing}</h2>
        <p className="text-gray-500">Following</p>
      </div>
      <CounterBarDialog
        open={openDialog}
        setOpen={setOpenDialog}
        defaultValue={defaultValue}
        username={username}
        actualUser={actualUser}
      />
    </div>
  );
};
