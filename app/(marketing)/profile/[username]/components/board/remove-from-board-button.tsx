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
  return response.json();
};

const RemoveFromBoardButton = ({
  isSelectedPostersEmpty,
}: RemoveFromBoardButtonProps) => {
  const { boardId } = useParams() ?? {};
  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );

  const removeFromMutation = useMutation({
    mutationFn: removeFromBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already added this poster");
      }
    },
  });

  const handleRemoveFromBoardButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      selectedPosters.map(async (posterId) => {
        await removeFromMutation.mutateAsync({
          posterId,
          boardId,
        });
      });
      clearSelectedPosters();
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
