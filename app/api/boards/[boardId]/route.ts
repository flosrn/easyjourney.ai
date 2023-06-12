import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  const sessionId = session?.user.id;
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");

  if (boardId) {
    try {
      const board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
      });

      const userBoard = await (board?.userId === sessionId
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

      return NextResponse.json({ status: 200, userBoard, sessionId });
    } catch {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}
