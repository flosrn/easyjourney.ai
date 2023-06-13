"use client";

import React from "react";
import Link from "next/link";
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
        <Link key={board.id} href={`/profile/${username}/boards/${board.id}`}>
          <BoardView
            key={board.id}
            board={board}
            isUserBoard={sessionId === board.userId}
          />
        </Link>
      ))}
    </div>
  );
}

export default Boards;
