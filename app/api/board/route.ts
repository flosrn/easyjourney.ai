import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const { username } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const userBoards = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: { userId: user?.id },
      include: {
        boardPosters: {
          include: {
            poster: true,
          },
        },
      },
    });

    return NextResponse.json({ status: 200, userBoards });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
