import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const boardId = params.boardId;
  if (boardId) {
    try {
      const boardPoster = await prisma.boardPoster.findFirst({
        where: { position: 1, boardId },
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
}
