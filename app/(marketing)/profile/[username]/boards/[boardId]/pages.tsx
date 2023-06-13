"use client";

import React from "react";
import type { Board, BoardPoster, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import DeleteBoardButton from "../../components/board/delete-board-button";
import RemoveFromBoardButton from "../../components/board/remove-from-board-button";
import UpdateBoardForm from "../../components/board/update-board-button";

type BoardWithPosters = Board & {
  boardPosters: BoardPoster[];
};

type UserProfileProps = {
  params: { username: User["username"]; boardId: Board["id"] };
};

const UserBoardPoster = ({ params: { boardId } }: UserProfileProps) => {
  const { status, data } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const response = await fetch(`/api/boards/?boardId=${boardId}`);
      return response.json();
    },
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    toast.error("Something went wrong getting this board, please try again");
  }
  const userBoard: BoardWithPosters = data.userBoard;
  const isUserBoard: boolean = data.sessionId === userBoard.userId;
  return (
    <div>
      <div>Name: {userBoard.name}</div>
      <div>Slug: {userBoard.slug}</div>
      <div>Description: {userBoard.description}</div>
      <div>Icon: {userBoard.icon}</div>
      <div>Is Public: {userBoard.isPublic ? "Yes" : "No"}</div>
      {userBoard.boardPosters.map((poster) => (
        <div key={poster.posterId}>
          <div>Position: {poster.position}</div>
          <div>Poster ID: {poster.posterId}</div>
          {isUserBoard && (
            <RemoveFromBoardButton
              posterId={poster.posterId}
              boardId={userBoard.id}
            />
          )}
        </div>
      ))}
      {isUserBoard && (
        <div>
          <UpdateBoardForm props={userBoard} />
          <DeleteBoardButton boardId={userBoard.id} />
        </div>
      )}
    </div>
  );
};

export default UserBoardPoster;
