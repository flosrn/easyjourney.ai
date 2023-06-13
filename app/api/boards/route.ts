import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  const sessionId = session?.user.id;
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (username) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return NextResponse.json({ status: 404, message: "User not found" });
      }

      const boards = await (user.id === sessionId
        ? prisma.board.findMany({
            orderBy: {
              createdAt: "desc",
            },
            where: { userId: user.id },
            include: {
              boardPosters: {
                include: {
                  poster: true,
                },
              },
            },
          })
        : prisma.board.findMany({
            orderBy: {
              createdAt: "desc",
            },
            where: { userId: user.id, isPublic: true },
            include: {
              boardPosters: {
                include: {
                  poster: true,
                },
              },
            },
          }));

      return NextResponse.json(boards);
    } catch {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}
