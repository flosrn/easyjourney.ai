"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

import { useBoardStore } from "../../../../store/boardStore";
import type { BoardType } from "../../../../types/typeBoard";

type UpdateBoardButtonProps = {
  boardId: string;
  toggleUpdateFormHandler: () => void;
};

const updateBoard = async ({
  board,
  boardId,
}: {
  board: BoardType;
  boardId: string;
}) => {
  const response = await fetch("/api/boards/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UpdateBoardButton = ({
  boardId,
  toggleUpdateFormHandler,
}: UpdateBoardButtonProps) => {
  const [
    boardIcon,
    boardName,
    boardSlug,
    boardDescription,
    boardIsPublic,
    saveOriginalState,
    restoreOriginalState,
  ] = useBoardStore((state) => [
    state.boardIcon,
    state.boardName,
    state.boardSlug,
    state.boardDescription,
    state.boardIsPublic,
    state.saveOriginalState,
    state.restoreOriginalState,
  ]);

  const updateMutation = useMutation({
    mutationFn: updateBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already updated this board");
      }
      if (data.status === 204) {
        toast.success("Your changes have been save");
      }
    },
    onError: () => {
      restoreOriginalState();
    },
  });

  const handleBoardUpdateForm = () => {
    saveOriginalState();

    const board: BoardType = {
      icon: boardIcon,
      name: boardName,
      slug: boardSlug,
      description: boardDescription,
      isPublic: boardIsPublic,
    };

    void updateMutation.mutateAsync({ board, boardId });
    toggleUpdateFormHandler();
  };

  return (
    <Button onClick={handleBoardUpdateForm} variant="secondary">
      Save
    </Button>
  );
};

export default UpdateBoardButton;
