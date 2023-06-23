"use client";

import React, { useEffect, useState } from "react";
import type { Board, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import BackToPreviousPageButton from "~/components/posters/buttons/back-to-previous-page-button";
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
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  const { data: session } = useSession();
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
  const userId = session?.user.id;

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
    <div className="flex flex-col">
      <BackToPreviousPageButton />
      <div className="my-5 flex space-x-5 -md:flex-col">
        <div className="w-full">
          {isUpdateForm ? <UpdateBoardForm /> : <TitleBoard />}
        </div>
        <div className="mb-2 flex flex-row-reverse -md:mt-4">
          {isUserBoard && isUpdateForm ? (
            <>
              <UpdateBoardButton
                boardId={board.id}
                toggleUpdateFormHandler={toggleUpdateForm}
              />
              <Button
                onClick={handleCancel}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <DeleteBoardButton boardId={board.id} />
            </>
          ) : (
            <Button onClick={toggleUpdateForm} variant="secondary" className="">
              <EditIcon className="mr-1 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>
      <Posters posters={posters} noMargin />
    </div>
  );
};

export default UserBoardPoster;
