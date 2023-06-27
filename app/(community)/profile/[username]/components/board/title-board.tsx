"use client";

import React from "react";

import { useBoardStore } from "../../store/boardStore";

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
      <div className="flex flex-col ">
        <div>
          {boardIsPublic ? (
            <span className="text-green-400">Public</span>
          ) : (
            <span className="text-red-400">Private</span>
          )}{" "}
          board
        </div>
        <h1 className="text-2xl font-bold">{boardName}</h1>
      </div>
      <div className="">{boardDescription}</div>
    </>
  );
};

export default TitleBoard;
