"use client";

import React from "react";
import Image from "next/image";
import type { Board, Poster, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import DeleteBoardButton from "../../components/board/delete-board-button";
import RemoveFromBoardButton from "../../components/board/remove-from-board-button";
import UpdateBoardForm from "../../components/board/update-board-button";

type UserBoardPosterProps = {
  params: { username: User["username"]; boardId: Board["id"] };
};

const fetchUserBoard = async (boardId: string) => {
  const response = await fetch(`/api/boards/${boardId}`);
  return response.json();
};

const fetchBoardPosters = async (boardId: string) => {
  const response = await fetch(`/api/boards/${boardId}/posters`);
  return response.json();
};

const UserBoardPoster = ({ params: { boardId } }: UserBoardPosterProps) => {
  const user = useSession();
  const userId = user.data?.user.id;

  const {
    isPending: isBoardPending,
    isError: isBoardError,
    data: board,
  } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => fetchUserBoard(boardId),
  });

  const {
    isPending: isPostersPending,
    isError: isPostersError,
    data: posters,
  } = useQuery({
    queryKey: ["posters", boardId],
    queryFn: async () => fetchBoardPosters(boardId),
  });

  if (isBoardPending || isPostersPending) {
    return <span>Loading...</span>;
  }

  if (isBoardError) {
    toast.error("Something went wrong getting this board, please try again");
  }
  if (isPostersError) {
    toast.error("Something went wrong getting the posters, please try again");
  }

  const isUserBoard = userId === board.userId;
  return (
    <div>
      <div>Icon: {board.icon}</div>
      <div>Name: {board.name}</div>
      <div>Description: {board.description}</div>
      <div>Is Public: {board.isPublic ? "Yes" : "No"}</div>
      {posters.map((poster: Poster) => (
        <div key={poster.id}>
          <Image
            src={poster.image}
            alt={poster.prompt}
            width={poster.width ?? 500}
            height={poster.height ?? 500}
            className="w-full rounded-b-xl"
          />
          {isUserBoard && (
            <RemoveFromBoardButton posterId={poster.id} boardId={board.id} />
          )}
        </div>
      ))}
      {isUserBoard && (
        <div>
          <UpdateBoardForm props={board} />
          <DeleteBoardButton boardId={board.id} />
        </div>
      )}
    </div>
  );
};

export default UserBoardPoster;
