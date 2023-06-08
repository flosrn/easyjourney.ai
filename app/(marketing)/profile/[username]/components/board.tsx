import React from "react";
import type { BoardPoster, Board as BoardType } from "@prisma/client";

import DeleteBoardButton from "./delete-board-button";
import RemoveFromBoardButton from "./remove-from-board-button";

type BoardWithPosters = BoardType & {
  boardPosters: BoardPoster[];
};

type boardProps = {
  props: BoardWithPosters;
  isUserBoard: boolean;
};

const Board = ({ props, isUserBoard }: boardProps) => {
  return (
    <div>
      <div>Name: {props.name}</div>
      <div>Slug: {props.slug}</div>
      <div>Description: {props.description}</div>
      <div>Icon: {props.icon}</div>
      <div>Is Public: {props.isPublic ? "Yes" : "No"}</div>
      {props.boardPosters.map((poster) => (
        <div key={poster.posterId}>
          <div>Position: {poster.position}</div>
          <div>Poster ID: {poster.posterId}</div>
          {isUserBoard && (
            <RemoveFromBoardButton
              posterId={poster.posterId}
              boardId={props.id}
            />
          )}
        </div>
      ))}
      {isUserBoard && <DeleteBoardButton boardId={props.id} />}
    </div>
  );
};

export default Board;
