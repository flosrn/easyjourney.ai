"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";

import { useBoardStore } from "../../../store/boardStore";
import type { BoardType } from "../../../types/typeBoard";

const createNewBoard = async ({
  userName,
  board,
}: {
  userName: string[] | string;
  board: BoardType;
}) => {
  const response = await fetch("/api/board/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, board }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const CreateNewBoardForm = () => {
  const { username } = useParams() ?? {};
  const [
    boardName,
    boardSlug,
    boardIcon,
    boardDescription,
    boardIsPublic,
    setBoardForm,
    setBoardIsPublic,
  ] = useBoardStore((state) => [
    state.boardName,
    state.boardSlug,
    state.boardIcon,
    state.boardDescription,
    state.boardIsPublic,
    state.setBoardForm,
    state.setBoardIsPublic,
  ]);

  const createNewMutation = useMutation({
    mutationFn: createNewBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already created this board");
      }
    },
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBoardForm(name, value);

    if (name === "boardName") {
      const slugValue = value.replaceAll(/\s+/g, "-").toLowerCase();
      setBoardForm("boardSlug", slugValue);
    }
  };

  const handleCheckboxChange = () => {
    setBoardIsPublic(!boardIsPublic);
  };

  const handleBoardForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const board: BoardType = {
      name: boardName,
      slug: boardSlug,
      icon: boardIcon,
      description: boardDescription,
      isPublic: boardIsPublic,
    };
    void createNewMutation.mutateAsync({ userName: username, board });
  };

  return (
    <form onSubmit={handleBoardForm}>
      <Input
        name="boardName"
        placeholder="name"
        required
        onChange={handleInputChange}
      />
      <Input
        name="boardDescription"
        placeholder="description"
        onChange={handleInputChange}
      />
      <Input name="boardIcon" placeholder="icon" onChange={handleInputChange} />
      <Checkbox
        name="boardIsPublic"
        id="IsPublic"
        onCheckedChange={handleCheckboxChange}
      />
      <label htmlFor="IsPublic">Public</label>
      <Button type="submit">Créer</Button>
    </form>
  );
};

export default CreateNewBoardForm;
