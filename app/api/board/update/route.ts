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
    const { board, boardId } = await request.json();

    const thisBoard = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!thisBoard) {
      return NextResponse.json({
        status: 404,
        message: "board not found",
      });
    }
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

    const updateBoards = await prisma.board.update({
      where: {
        id: thisBoard.id,
      },
      data: {
        name: board.name,
        slug: board.slug,
        icon: board.icon,
        description: board.description,
        isPublic: board.isPublic,
      },
    });
    return NextResponse.json({ status: 204, updateBoards });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
