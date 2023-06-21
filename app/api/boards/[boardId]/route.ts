import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const session = await getServerAuthSession();
  const sessionId = session?.user.id;
  const boardId = params.boardId;

  if (boardId) {
    try {
      const userBoard = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
      });

      const board = await (userBoard?.userId === sessionId
        ? prisma.board.findFirst({
            where: { id: boardId },
            include: {
              boardPosters: {
                include: {
                  poster: true,
                },
              },
            },
          })
        : prisma.board.findFirst({
            orderBy: {
              createdAt: "desc",
            },
            where: { id: boardId, isPublic: true },
            include: {
              boardPosters: {
                include: {
                  poster: true,
                },
              },
            },
          }));

      return NextResponse.json(board);
    } catch {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}
