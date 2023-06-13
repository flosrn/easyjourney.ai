import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const boardId = params.boardId;
  if (boardId) {
    try {
      const boardPosters = await prisma.boardPoster.findMany({
        where: { boardId },
        include: { poster: true },
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
}
