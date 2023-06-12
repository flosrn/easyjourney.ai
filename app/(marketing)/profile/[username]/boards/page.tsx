"use client";

import React from "react";
import type { Board, BoardPoster, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import BoardView from "../components/board/board-view";

type BoardWithPosters = Board & {
  boardPosters: BoardPoster[];
};
type UserProfileProps = {
  params: { username: User["username"] };
};

function Boards({ params: { username } }: UserProfileProps) {
  const { status, data } = useQuery({
    queryKey: ["board", username],
    queryFn: async () => {
      const response = await fetch(`/api/boards/?username=${username}`);
      return response.json();
    },
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    toast.error("Something went wrong getting thoose board, please try again");
  }

  const sessionId = data.sessionId;
  const boards: BoardWithPosters[] = data.userBoards;

  return (
    <div>
      {boards.map((board) => (
        <BoardView
          key={board.id}
          props={board}
          isUserBoard={sessionId === board.userId}
        />
      ))}
    </div>
  );
}

export default Boards;
