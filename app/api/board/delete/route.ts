import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { boardId } = await request.json();
    const deleteBoards = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    return NextResponse.json({ status: 204, deleteBoards });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
