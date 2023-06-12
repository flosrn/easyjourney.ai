import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { boardId } = await request.json();

    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      session.user.role !== UserRole.ADMIN &&
      session.user.id !== board?.userId
    ) {
      return NextResponse.json({
        status: 401,
        message: "Not enough permission to do this",
      });
    }

    await prisma.boardPoster.deleteMany({
      where: {
        boardId,
      },
    });

    const deleteBoards = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    return NextResponse.json({ status: 204, deleteBoards });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
