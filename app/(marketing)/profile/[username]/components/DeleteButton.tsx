"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Button } from "~/components/ui/Button";

const deletePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const DeleteButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );

  const deleteMutation = useMutation(deletePoster, {
    onSuccess: (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
    },
  });

  const handleLDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session) {
      return router.push("/api/auth/signin");
    }

    try {
      await Promise.all(
        selectedPosters.map(async (id) => deleteMutation.mutateAsync(id))
      );
      await clearSelectedPosters();
      window.location.reload();
    } catch {
      toast.error(
        "Something went wrong deleting this poster, please try again"
      );
    }
  };
  return <Button onClick={handleLDelete}>Delete</Button>;
};

export default DeleteButton;
