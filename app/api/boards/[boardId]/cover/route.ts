import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const boardId = params.boardId;

  try {
    const board = await prisma.board.findFirst({
      where: { id: boardId },
    });

    if (!board) {
      return NextResponse.json({
        status: 404,
        message: "Board not found",
      });
    }

    const boardPoster = await prisma.boardPoster.findFirst({
      where: { position: 1, boardId: board.id },
    });

    const poster = await prisma.poster.findFirst({
      where: { id: boardPoster?.posterId },
    });

    return NextResponse.json(poster);
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
