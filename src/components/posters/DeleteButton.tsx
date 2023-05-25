"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useDeletePosterStore } from "~/store/deletePosterStore";

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

  const [selectedDeletePosters, clearDeletePosters] = useDeletePosterStore(
    (state) => [state.selectedDeletePosters, state.clearDeletePosters]
  );

  const deleteMutation = useMutation(deletePoster, {
    onSuccess: (data) => {
      if (data.status === 409) {
        toast.error("You already deleted this poster!");
      }
    },
  });

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session) {
      return router.push("/api/auth/signin");
    }

    try {
      selectedDeletePosters.map(async (posterId) => {
        await deleteMutation.mutateAsync(posterId);
        console.log("id :", posterId);
      });

      clearDeletePosters;
    } catch {
      toast.error("Something went wrong liking this poster, please try again");
    }
  };
  return (
    <div>
      <button onClick={handleLike}>Delete</button>
    </div>
  );
};

export default DeleteButton;
