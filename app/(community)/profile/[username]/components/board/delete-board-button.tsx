"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { AlertDialogDelete } from "~/components/dialog/alert-dialog-delete";
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
    <div className="flex">
      <div className="">
        <AlertDialogDelete
          text="This will erase the board."
          buttonText="Delete this board"
          onClickAction={handleDeleteBoard}
        >
          <Button className="mr-2" variant="error">
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </AlertDialogDelete>
      </div>
    </div>
  );
};

export default DeleteBoardButton;
