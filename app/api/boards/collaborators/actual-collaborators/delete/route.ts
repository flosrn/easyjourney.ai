import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
// Import PrismaClient
import { prisma } from "~/server/db/prisma";

type Objet = {
  posterId: string;
  boardId: string;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const actualUserId = session?.user.id;
  console.log("actualUserId", actualUserId);

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { userId, boardId } = (await request.json()) as Objet & {
      userId: string;
    };

    console.log("boardId", boardId);
    console.log("userId", userId);

    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (board && board.userId === actualUserId) {
      const collaborator = await prisma.collaborator.findFirst({
        where: {
          userId,
          boardId,
        },
      });

      const deleteCollaborator = await prisma.collaborator.delete({
        where: {
          id: collaborator?.id,
        },
      });

      return deleteCollaborator
        ? NextResponse.json(
            { message: "Collaborator deleted successfully" },
            { status: 200 }
          )
        : NextResponse.json(
            { message: "Failed to delete collaborator" },
            { status: 500 }
          );
    } else {
      return NextResponse.json(
        { message: "User not authorized to delete collaborator" },
        {
          status: 403,
        }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { message: `Internal Server Error : ${error}` },
      { status: 500 }
    );
  }
}
