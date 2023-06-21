"use client";

import React from "react";

import { useBoardStore } from "../../../../store/boardStore";

const TitleBoard = () => {
  const [boardIcon, boardName, boardDescription, boardIsPublic] = useBoardStore(
    (state) => [
      state.boardIcon,
      state.boardName,
      state.boardDescription,
      state.boardIsPublic,
    ]
  );

  return (
    <>
      <div className="mb-4 flex w-full justify-center text-center text-4xl">
        <h1>{boardIcon}</h1>
        <h1>{boardName}</h1>
        {/* <div>{boardIsPublic ? "Public" : "Private"}</div> */}
      </div>
      <div className=" text-2xl">{boardDescription}</div>
    </>
  );
};

export default TitleBoard;
