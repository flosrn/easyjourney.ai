import React from "react";
import { Board, BoardPoster } from "@prisma/client";
import DeleteBoardButton from "./delete-board-button";

type BoardWithPosters = Board & {
  boardPosters: BoardPoster[];
};

type boardProps = {
  props: BoardWithPosters;
};

const Board = ({ props }: boardProps) => {
  return (
    <div>
      <div>Name: {props.name}</div>
      <div>Slug: {props.slug}</div>
      <div>Description: {props.description}</div>
      <div>Icon: {props.icon}</div>
      <div>Is Public: {props.isPublic ? "Yes" : "No"}</div>
      {props.boardPosters.map((poster, index) => (
        <div key={index}>
          <div>Poster ID: {poster.posterId}</div>
          <div>Position: {poster.position}</div>
        </div>
      ))}
      <DeleteBoardButton boardId={props.id} />
    </div>
  );
};

export default Board;
