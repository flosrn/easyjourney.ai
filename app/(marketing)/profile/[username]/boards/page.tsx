import React, { Suspense } from "react";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import Board from "../components/board";

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
  return (
    <div>
      <Suspense fallback={<div>Loading Board...</div>}>
        {boards?.map((board) =>
          user?.id === board.userId || board.isPublic ? (
            <Board
              key={board.id}
              props={board}
              isUserBoard={user?.id === board.userId}
            />
          ) : null
        )}
      </Suspense>
    </div>
  );
}
