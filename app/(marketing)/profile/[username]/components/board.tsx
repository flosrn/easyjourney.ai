import React from "react";

import { type BoardType } from "../../../types/typeBoard";

type boardProps = {
  props: BoardType;
};

const Board = ({ props }: boardProps) => {
  return (
    <div>
      <div>Name: {props.name}</div>
      <div>Slug: {props.slug}</div>
      <div>Description: {props.description}</div>
      <div>Icon: {props.icon}</div>
      <div>Is Public: {props.isPublic ? "Yes" : "No"}</div>
      {props.boardPosters?.map((poster, index) => (
        <div key={index}>
          <div>Poster ID: {poster.posterId}</div>
          <div>Position: {poster.position}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
