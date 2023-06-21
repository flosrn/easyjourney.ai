import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

type Objet = {
  posterId: string;
  boardId: string;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { posterId, boardId } = (await request.json()) as Objet;

    const poster = await prisma.poster.findUnique({
      where: {
        id: posterId,
      },
    });

    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!poster) {
      return NextResponse.json({
        status: 404,
        message: "Poster not found",
      });
    }

    if (!board) {
      return NextResponse.json({
        status: 404,
        message: "Board not found",
      });
    }

    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      session.user.role !== UserRole.ADMIN &&
      session.user.id !== poster.userId
    ) {
      return NextResponse.json({
        status: 401,
        message: "Not enough permission to do this",
      });
    }

    const posters = await prisma.boardPoster.delete({
      where: {
        boardId_posterId: {
          boardId,
          posterId,
        },
      },
    });

    return NextResponse.json(posters);
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
