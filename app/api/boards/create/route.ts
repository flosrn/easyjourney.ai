import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { userName, board } = await request.json();

    const newBoard = await prisma.board.create({
      data: {
        name: board.name,
        slug: board.slug,
        icon: board.icon,
        description: board.description,
        isPublic: board.isPublic,
        user: {
          connect: {
            username: userName,
          },
        },
      },
    });
    return NextResponse.json({ status: 201, newBoard });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
