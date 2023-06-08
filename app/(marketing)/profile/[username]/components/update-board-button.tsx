"use client";

import React, { useState } from "react";
import type { Board } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { useBoardStore } from "../../../store/boardStore";
import type { BoardType } from "../../../types/typeBoard";

type UpdateBoardFormProps = {
  props: Board;
};

const updateBoard = async ({
  board,
  boardId,
}: {
  board: BoardType;
  boardId: string;
}) => {
  const response = await fetch("/api/board/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UpdateBoardForm = ({ props }: UpdateBoardFormProps) => {
  const [boardId] = useState(props.id);
  const [
    boardName,
    boardSlug,
    boardIcon,
    boardDescription,
    boardIsPublic,
    setBoardForm,
    setBoardIsPublic,
    setBoardName,
    setBoardIcon,
    setBoardDescription,
  ] = useBoardStore((state) => [
    state.boardName,
    state.boardSlug,
    state.boardIcon,
    state.boardDescription,
    state.boardIsPublic,
    state.setBoardForm,
    state.setBoardIsPublic,
    state.setBoardName,
    state.setBoardIcon,
    state.setBoardDescription,
  ]);

  const updateValue = () => {
    setBoardName(props.name);
    setBoardIcon(props.icon ?? "");
    setBoardDescription(props.description ?? "");
    setBoardIsPublic(props.isPublic);
  };

  const updateMutation = useMutation({
    mutationFn: updateBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already updated this board");
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
    void updateMutation.mutateAsync({ board, boardId });
  };

  return (
    <Dialog>
      <DialogTrigger onClick={updateValue} asChild>
        <Button variant="secondary" className=" mr-1">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update board</DialogTitle>
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
              value={boardName}
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
              value={boardDescription}
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
              value={boardIcon}
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
              checked={boardIsPublic}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
        </div>
        <DialogFooter className=" flex-row-reverse">
          <Button onClick={handleBoardForm}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBoardForm;
