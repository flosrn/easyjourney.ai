import React, { Suspense } from "react";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import CreateNewBoardForm from "../components/create-new-board-form";

type UserProfileProps = {
  params: { username: User["username"] };
};

const getUserBoards = async (userId: string) =>
  prisma.board.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
    include: {
      boardPosters: {
        include: {
          poster: true,
        },
      },
    },
  });

const getUser = async (username: string) =>
  prisma.user.findUnique({
    where: { username },
  });

export default async function Boards({
  params: { username },
}: UserProfileProps) {
  const user = await getUser(username);
  const boards = user && (await getUserBoards(user.id));
  const myboard = boards?.map((board) => board.name);
  return (
    <div>
      <CreateNewBoardForm />
      <Suspense fallback={<div>Loading Board...</div>}>
        {myboard && <div>{myboard}</div>}
      </Suspense>
    </div>
  );
}
