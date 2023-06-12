"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { CommandGroup, CommandItem } from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { useBoardStore } from "../../../../store/boardStore";
import type { BoardType } from "../../../../types/typeBoard";

type CreateBoardProps = {
  onCloseHandler: () => void;
};

const createNewBoard = async ({
  userName,
  board,
}: {
  userName: string[] | string;
  board: BoardType;
}) => {
  const response = await fetch("/api/boards/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, board }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const addToBoard = async ({
  posterId,
  boardId,
}: {
  posterId: string;
  boardId: string;
}) => {
  const response = await fetch("/api/boards/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId, boardId }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const CreateBoard = ({ onCloseHandler }: CreateBoardProps) => {
  const { username } = useParams() ?? {};
  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );
  const toggleSelectBar = useSelectBarStore((state) => state.toggleSelectBar);
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

  const addToMutation = useMutation({
    mutationFn: addToBoard,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error(
          selectedPosters.length > 1
            ? "You already added thoose posters"
            : "You already added this poster"
        );
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

  const handleBoardForm = async () => {
    try {
      const board: BoardType = {
        name: boardName,
        slug: boardSlug,
        icon: boardIcon,
        description: boardDescription,
        isPublic: boardIsPublic,
      };
      clearSelectedPosters();
      toggleSelectBar();
      const data = await createNewMutation.mutateAsync({
        userName: username,
        board,
      });
      if (data) {
        if (selectedPosters.length > 0) {
          const boardId = data.newBoard.id;
          await Promise.all(
            selectedPosters.map(async (posterId) =>
              addToMutation.mutateAsync({ posterId, boardId })
            )
          );
          toast.success(
            selectedPosters.length > 1
              ? "Posters have been added"
              : "Poster has been added"
          );
        } else {
          toast.success("Board has been created");
        }
        // onCloseHandler();
      }
    } catch {
      if (selectedPosters.length === 0) {
        toast.error(
          "Something went wrong creating this board, please try again"
        );
      }
      toast.error(
        selectedPosters.length > 1
          ? "Something went wrong adding thoose posters, please try again"
          : "Something went wrong adding this poster, please try again"
      );
    }
  };

  return (
    <CommandGroup>
      <CommandItem>
        <div className="flex flex-col">
          <Label htmlFor="boardName" className="mb-2 ml-1 truncate">
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
      </CommandItem>
      <CommandItem>
        <div className="flex flex-col">
          <Label htmlFor="boardIcon" className="mb-2 ml-1 truncate">
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
      </CommandItem>
      <CommandItem>
        <div className="flex flex-col">
          <Label htmlFor="boardDescription" className="mb-2 ml-1 truncate">
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
      </CommandItem>
      <CommandItem>
        <div className="flex items-center">
          <Label htmlFor="IsPublic" className=" ml-1 mr-2 truncate">
            Public
          </Label>
          <Checkbox
            name="boardIsPublic"
            id="IsPublic"
            onCheckedChange={handleCheckboxChange}
          />
        </div>
      </CommandItem>
      <CommandItem>
        <Button
          onClick={handleBoardForm}
          variant="secondary"
          className="w-full"
        >
          Create and add
        </Button>
      </CommandItem>
    </CommandGroup>
  );
};

export default CreateBoard;
