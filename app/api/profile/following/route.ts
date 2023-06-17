import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "";

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const userId = user?.id;

    const followed = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: true,
      },
    });

    const followingId = followed?.following.map(
      (follower) => follower.followingId
    );

    const followingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followingId,
        },
      },
      include: {
        followers: true,
      },
    });

    return NextResponse.json({ status: 200, followingUsers });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
