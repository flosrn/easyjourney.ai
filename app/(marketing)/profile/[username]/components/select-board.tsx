"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Board } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import AddToBoardButton from "./add-to-board-button";

const getBoards = async (username: string) => {
  const response = await fetch(`/api/board`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SelectBoard = () => {
  const { username } = useParams() ?? {};
  const userName = username.toString();
  const [boards, setBoards] = useState<Board[]>([]);

  const getBoardsMutation = useMutation({
    mutationFn: getBoards,
    onSuccess: async (data) => {
      if (data.status === 400) {
        toast.error("You already selected this board");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBoards = await getBoardsMutation.mutateAsync(userName);
      const userBoards = fetchedBoards.userBoards;
      setBoards(userBoards);
    };
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add to board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Board</DialogTitle>
          <DialogDescription>
            Select wich board you want to add your posters
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<div>Loading Board...</div>}>
          {boards.map((board) => (
            <div key={board.id}>
              <div>
                {board.icon}
                {board.name}
              </div>
              <AddToBoardButton boardId={board.id} />
            </div>
          ))}
        </Suspense>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBoard;
