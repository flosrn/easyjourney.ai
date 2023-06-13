"use Client";

import React from "react";
import type { Board } from "@prisma/client";

type boardProps = {
  board: Board;
  isUserBoard: boolean;
};

const BoardView = ({ board }: boardProps) => {
  return (
    <>
      <div>Name: {board.name}</div>
      <div>Slug: {board.slug}</div>
      <div>Description: {board.description}</div>
      <div>Icon: {board.icon}</div>
      <div>Is Public: {board.isPublic ? "Yes" : "No"}</div>
    </>
  );
};

export default BoardView;
