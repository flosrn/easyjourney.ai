"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
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
  const session = useSession();
  const username = session.data?.user.username;
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: async (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this board!");
      }
      toast.success("Board have been deleted");
      router.push(`/profile/${username}/boards`);
    },
  });

  const handleDeleteBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await deleteMutation.mutateAsync(boardId);
    } catch {
      toast.error("Something went wrong deleting this board, please try again");
    }
  };

  return (
    <Button onClick={handleDeleteBoard} className="mr-2">
      Delete
    </Button>
  );
};

export default DeleteBoardButton;
