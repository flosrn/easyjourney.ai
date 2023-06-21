"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
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
  const [boardName, boardSlug, setBoardName, setBoardSlug] = useBoardStore(
    (state) => [
      state.boardName,
      state.boardSlug,
      state.setBoardName,
      state.setBoardSlug,
    ]
  );

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const slug = name.replaceAll(/\s+/g, "-").toLowerCase();
    setBoardName(name);
    setBoardSlug(slug);
  };

  const handleBoardForm = async () => {
    try {
      const board: BoardType = {
        name: boardName,
        slug: boardSlug,
        isPublic: true,
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
      <CommandItem className="aria-selected:text-accent-transparent aria-selected:bg-transparent">
        <div className="flex w-full flex-col md:w-auto">
          <Label htmlFor="boardName" className="mb-2 ml-1 truncate">
            Name
          </Label>
          <Input
            id="boardName"
            name="boardName"
            placeholder="name"
            required
            onChange={handleNameChange}
            className=""
          />
        </div>
      </CommandItem>
      <CommandItem className="aria-selected:text-accent-transparent aria-selected:bg-transparent">
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
