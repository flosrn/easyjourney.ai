"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type DeleteButtonProps = {
  id: string;
  userId: string;
};

const deletePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const DeleteButton = ({ id, userId }: DeleteButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isOwner = session?.user.id === userId;

  const deleteMutation = useMutation({
    mutationFn: deletePoster,
    onSuccess: async (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
      await fetch(`/api/revalidate?path=${pathname}`);
      router.back();
    },
  });

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await toast.promise(deleteMutation.mutateAsync(id), {
      loading: "Deleting poster...",
      success: "Poster has been deleted",
      error: "Something went wrong deleting this poster, please try again",
    });
  };

  if (!isOwner) return null;

  return (
    <TooltipButton Icon={Trash2Icon} clickHandler={handleDelete}>
      Delete this poster
    </TooltipButton>
  );
};

export default DeleteButton;
