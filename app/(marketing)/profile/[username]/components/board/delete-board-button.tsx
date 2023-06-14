"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type deleteBoardProps = {
  boardId: string;
};

const deleteBoard = async (boardId: string) => {
  const response = await fetch("/api/boards/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boardId }),
  });
  return response;
};

const DeleteBoardButton = ({ boardId }: deleteBoardProps) => {
  const deleteMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: async (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
    },
  });

  const handleDeleteBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await deleteMutation.mutateAsync(boardId);
    } catch {
      toast.error(
        "Something went wrong deleting this poster, please try again"
      );
    }
  };

  return (
    <Button onClick={handleDeleteBoard} className="mr-2">
      Delete
    </Button>
  );
};

export default DeleteBoardButton;
