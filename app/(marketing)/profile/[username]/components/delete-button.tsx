"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

type DeleteButtonProps = {
  isSelectedPostersEmpty: boolean;
};

const deletePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const DeleteButton = ({ isSelectedPostersEmpty }: DeleteButtonProps) => {
  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );
  const toggleSelectBar = useSelectBarStore((state) => state.toggleSelectBar);
  const { username } = useParams() ?? {};

  const deleteMutation = useMutation({
    mutationFn: deletePoster,
    onSuccess: async (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
    },
  });

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await Promise.all(
        selectedPosters.map(async (id) => deleteMutation.mutateAsync(id))
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
      toast.error(
        "Something went wrong deleting this poster, please try again"
      );
    }
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isSelectedPostersEmpty}
      className="mx-2"
    >
      {deleteMutation.isPending && (
        <Loader2Icon className="mr-2 h-5 animate-spin" />
      )}
      Delete
    </Button>
  );
};

export default DeleteButton;
