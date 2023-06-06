import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { userID } = await request.json();

  try {
    const userBoards = await prisma.board.findMany({
      where: {
        userId: userID,
      },
      include: {
        boardPosters: true,
      },
    });

    return NextResponse.json({ status: 200, userBoards });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
