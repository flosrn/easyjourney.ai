"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type RemoveFomBoardButtonProps = {
  posterId: string;
  boardId: string;
};

const removeFromBoard = async ({
  posterId,
  boardId,
}: {
  posterId: string;
  boardId: string;
}) => {
  const response = await fetch("/api/board/remove", {
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
  posterId,
  boardId,
}: RemoveFomBoardButtonProps) => {
  const { username } = useParams() ?? {};

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
      const response = await removeFromMutation.mutateAsync({
        posterId,
        boardId,
      });
      const data = await response[0].json();
      if (data) {
        await fetch(`/api/revalidate?path=/profile/${username}`);
        await fetch("/api/revalidate?path=/posters/new");
        await fetch("/api/revalidate?path=/posters/popular");
      }
    } catch {
      toast.error("Something went removing this poster, please try again");
    }
  };
  return <Button onClick={handleRemoveFromBoardButton}>Remove Poster</Button>;
};

export default RemoveFromBoardButton;
