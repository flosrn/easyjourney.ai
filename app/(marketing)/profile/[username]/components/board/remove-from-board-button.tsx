"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type RemoveFromBoardButtonProps = {
  isSelectedPostersEmpty: boolean;
};

const removeFromBoard = async ({
  posterId,
  boardId,
}: {
  posterId: string;
  boardId: string[] | string;
}) => {
  const response = await fetch("/api/boards/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const RemoveFromBoardButton = ({
  isSelectedPostersEmpty,
}: RemoveFromBoardButtonProps) => {
  const { boardId } = useParams() ?? {};
  const [
    selectedPosters,
    clearSelectedPosters,
    addToRemoveFromBoard,
    clearToRemoveFromBoard,
  ] = useSelectPosterStore((state) => [
    state.selectedPosters,
    state.clearSelectedPosters,
    state.addToRemoveFromBoard,
    state.clearToRemoveFromBoard,
  ]);

  const removeFromMutation = useMutation({
    mutationFn: removeFromBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already added this poster");
      }
      selectedPosters.length > 1
        ? toast.success("Posters have been removed")
        : toast.success("Poster have been removed");
    },
  });

  const handleRemoveFromBoardButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      selectedPosters.map(async (posterId) => {
        addToRemoveFromBoard(posterId);
        await removeFromMutation.mutateAsync({
          posterId,
          boardId,
        });
      });
      clearSelectedPosters();
      clearToRemoveFromBoard();
    } catch {
      toast.error("Something went removing this poster, please try again");
    }
  };
  return (
    <Button
      onClick={handleRemoveFromBoardButton}
      disabled={isSelectedPostersEmpty}
    >
      Remove Poster
    </Button>
  );
};

export default RemoveFromBoardButton;
