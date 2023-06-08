"use client;";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type AddToBoardButtonProps = {
  boardId: string;
};

const addToBoard = async ({
  posterId,
  boardId,
}: {
  posterId: string;
  boardId: string;
}) => {
  const response = await fetch("/api/board/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const AddToBoardButton = ({ boardId }: AddToBoardButtonProps) => {
  const { username } = useParams() ?? {};

  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );
  const toggleSelectBar = useSelectBarStore((state) => state.toggleSelectBar);

  const addToMutation = useMutation({
    mutationFn: addToBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already created this board");
      }
    },
  });

  const handleAddToBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await Promise.all(
        selectedPosters.map(async (posterId) =>
          addToMutation.mutateAsync({ posterId, boardId })
        )
      );
      const data = await response[0].json();
      if (data) {
        await fetch(`/api/revalidate?path=/profile/${username}`);
        await fetch("/api/revalidate?path=/posters/new");
        await fetch("/api/revalidate?path=/posters/popular");
        setTimeout(() => {
          clearSelectedPosters();
          toggleSelectBar();
        }, 400);
      }
    } catch {
      toast.error("Something went wrong adding this poster, please try again");
    }
  };
  return (
    <Button onClick={handleAddToBoard} variant="secondary">
      Add to board
    </Button>
  );
};

export default AddToBoardButton;
