"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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

  const handleBoardForm = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" mr-1">
          Create new board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boardName" className="text-right">
              Name
            </Label>
            <Input
              id="boardName"
              name="boardName"
              placeholder="name"
              required
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boardDescription" className="text-right">
              Description
            </Label>
            <Input
              id="boardDescription"
              name="boardDescription"
              placeholder="description"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boardIcon" className="text-right">
              Icon
            </Label>
            <Input
              id="boardIcon"
              name="boardIcon"
              placeholder="icon"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="IsPublic" className="text-right">
              Public
            </Label>
            <Checkbox
              name="boardIsPublic"
              id="IsPublic"
              onCheckedChange={handleCheckboxChange}
            />
          </div>
        </div>
        <DialogFooter className=" flex-row-reverse">
          <Button onClick={handleBoardForm}>Créer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewBoardForm;
