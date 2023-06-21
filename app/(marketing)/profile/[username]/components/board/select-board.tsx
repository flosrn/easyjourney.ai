"use client";

import React from "react";
import { useParams } from "next/navigation";
import type { Board } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command";

import AddToBoardButton from "./add-to-board-button";

type SelectBoardProps = {
  onCloseHandler: () => void;
};

const fetchUserBoards = async (username: string[] | string) => {
  const response = await fetch(`/api/boards/?username=${username}`);
  return response.json();
};

const SelectBoard = ({ onCloseHandler }: SelectBoardProps) => {
  const { username } = useParams() ?? {};

  const { status, data: boards } = useQuery({
    queryKey: ["board", username],
    queryFn: async () => fetchUserBoards(username),
  });

  if (status === "error") {
    toast.error("Something went wrong getting thoose board, please try again");
  }

  return (
    <>
      {status === "pending" && (
        <CommandGroup>
          <CommandItem className="truncate">Loading...</CommandItem>
        </CommandGroup>
      )}
      {status === "success" && (
        <CommandGroup>
          {boards.length > 0 ? (
            boards.map((board: Board) => (
              <CommandItem
                key={board.id}
                onSelect={() => {
                  onCloseHandler();
                }}
              >
                <AddToBoardButton
                  boardId={board.id}
                  name={board.name}
                  icon={board.icon}
                />
              </CommandItem>
            ))
          ) : (
            <CommandEmpty>No board found.</CommandEmpty>
          )}
        </CommandGroup>
      )}
    </>
  );
};
export default SelectBoard;
