"use client;";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type AddToBoardButtonProps = {
  boardId: string;
  name: string;
  icon?: string | null;
};

const addToBoard = async ({
  posterId,
  boardId,
}: {
  posterId: string;
  boardId: string;
}) => {
  const response = await fetch("/api/boards/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const AddToBoardButton = ({ boardId, name, icon }: AddToBoardButtonProps) => {
  const session = useSession();
  const username = session.data?.user.username;
  const router = useRouter();
  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );
  const toggleSelectBar = useSelectBarStore((state) => state.toggleSelectBar);

  const addToMutation = useMutation({
    mutationFn: addToBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already added this poster");
      }
      router.push(`/profile/${username}/boards/${boardId}`);
    },
  });

  const handleAddToBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      clearSelectedPosters();
      toggleSelectBar();
      await Promise.all(
        selectedPosters.map(async (posterId) =>
          addToMutation.mutateAsync({ posterId, boardId })
        )
      );
      toast.success(
        selectedPosters.length > 1
          ? "Posters have been added"
          : "Poster has been added"
      );
    } catch {
      toast.error(
        selectedPosters.length > 1
          ? "Something went wrong adding thoose posters, please try again"
          : "Something went wrong adding this poster, please try again"
      );
    }
  };
  return (
    <Button onClick={handleAddToBoard} variant="ghost" className="truncate">
      {icon} {name}
    </Button>
  );
};

export default AddToBoardButton;
