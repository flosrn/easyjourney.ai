"use client";

import React from "react";
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

  const deleteMutation = useMutation({
    mutationFn: deletePoster,
    onSuccess: async (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
      selectedPosters.length > 1
        ? toast.success("Posters have been deleted")
        : toast.success("Poster have been deleted");
    },
  });

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      selectedPosters.map(async (id) => deleteMutation.mutateAsync(id));
      clearSelectedPosters();
      toggleSelectBar();
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
