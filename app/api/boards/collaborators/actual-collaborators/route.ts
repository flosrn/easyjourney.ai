import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId: string = searchParams.get("boardId") ?? "";

  console.log("boardId :", boardId);

  try {
    const collaboratorsIdList = await prisma.collaborator.findMany({
      where: {
        boardId,
      },
    });

    const userIds = collaboratorsIdList.map(
      (collaborator) => collaborator.userId
    );

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    });

    console.log("users :", users);

    console.log("collarboratorsList :", users);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
