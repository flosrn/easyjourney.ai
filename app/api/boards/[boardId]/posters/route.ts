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

    const boardPosters = await prisma.boardPoster.findMany({
      where: { boardId: board.id },
      include: {
        poster: {
          include: {
            likes: true,
          },
        },
      },
    });

    const posters = boardPosters.map((bp) => bp.poster);

    return NextResponse.json(posters);
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
