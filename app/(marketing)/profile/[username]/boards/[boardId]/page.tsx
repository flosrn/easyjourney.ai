"use client";

import React, { useEffect, useState } from "react";
import type { Board, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

import Posters from "../../../../posters/components/posters";
import { useBoardStore } from "../../../../store/boardStore";
import DeleteBoardButton from "../../components/board/delete-board-button";
import TitleBoard from "../../components/board/title-board";
import UpdateBoardButton from "../../components/board/update-board-button";
import UpdateBoardForm from "../../components/board/update-board-form";

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
  const [
    setBoardIsPublic,
    setBoardName,
    setBoardIcon,
    setBoardDescription,
    restoreOriginalState,
  ] = useBoardStore((state) => [
    state.setBoardIsPublic,
    state.setBoardName,
    state.setBoardIcon,
    state.setBoardDescription,
    state.restoreOriginalState,
  ]);
  const user = useSession();
  const userId = user.data?.user.id;
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [
    selectedPosters,
    toRemove,
    addToRemove,
    clearSelectedPosters,
    clearToRemove,
  ] = useSelectPosterStore((state) => [
    state.selectedPosters,
    state.toRemove,
    state.addToRemoveFromBoard,
    state.clearSelectedPosters,
    state.clearToRemoveFromBoard,
  ]);

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

  useEffect(() => {
    if (board) {
      setBoardName(board.name);
      setBoardIsPublic(board.isPublic);
      if (board.icon) {
        setBoardIcon(board.icon);
      }
      if (board.description) {
        setBoardDescription(board.description);
      }
    }
  }, [board]);

  if (isBoardPending || isPostersPending) {
    return <span>Loading...</span>;
  }

  if (isBoardError) {
    toast.error("Something went wrong getting this board, please try again");
  }
  if (isPostersError) {
    toast.error("Something went wrong getting the posters, please try again");
  }

  const toggleUpdateForm = () => {
    setIsUpdateForm(!isUpdateForm);
  };

  const handleCancel = () => {
    restoreOriginalState();
    toggleUpdateForm();
  };
  const isUserBoard = userId === board.userId;
  return (
    <div>
      <div className="mb-2 flex h-48 w-full flex-col rounded-xl p-2 ring-2 ring-offset-highlight">
        {isUpdateForm ? <UpdateBoardForm /> : <TitleBoard />}
      </div>
      <div className="mb-2 flex flex-row-reverse">
        {isUserBoard && isUpdateForm ? (
          <>
            <UpdateBoardButton
              boardId={board.id}
              toggleUpdateFormHandler={toggleUpdateForm}
            />
            <Button onClick={handleCancel} variant="secondary" className="mr-2">
              Cancel
            </Button>
            <DeleteBoardButton boardId={board.id} />
          </>
        ) : (
          <Button
            onClick={toggleUpdateForm}
            variant="secondary"
            className=" float-left"
          >
            Update
          </Button>
        )}
      </div>
      <Posters posters={posters} noMargin />
    </div>
  );
};

export default UserBoardPoster;
