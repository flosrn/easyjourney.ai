"use client";

import React from "react";
import Link from "next/link";
import type { Board, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { cn } from "~/lib/classNames";

import BoardPreview from "../components/board/board-preview";

type UserProfileProps = {
  params: { username: User["username"] };
};
const fetchUserBoards = async (username: string) => {
  const response = await fetch(`/api/boards/?username=${username}`);
  return response.json();
};

function Boards({ params: { username } }: UserProfileProps) {
  const user = useSession();
  const userId = user.data?.user.id;
  const {
    isPending,
    isError,
    data: boards,
  } = useQuery({
    queryKey: ["boards", username],
    queryFn: async () => fetchUserBoards(username),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    toast.error("Something went wrong getting thoose board, please try again");
  }

  const columns = [[], [], [], []];
  boards.map((board, index) => {
    columns[index % 4].push(board);
  });

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4")}>
      {boards.length > 0 &&
        columns.map((column, index) => (
          <div className="grid h-fit gap-3" key={index}>
            {column.map((board: Board) => (
              <Link
                key={board.id}
                href={`/profile/${username}/boards/${board.id}`}
              >
                <BoardPreview
                  key={board.id}
                  boardId={board.id}
                  name={board.name}
                  icon={board.icon}
                  isPublic={board.isPublic}
                  collection={board.boardPosters.length}
                  isUserBoard={userId === board.userId}
                />
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}

export default Boards;
