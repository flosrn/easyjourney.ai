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

    const followers = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        followers: true,
      },
    });

    const followerIds = followers?.followers.map(
      (follower) => follower.followerId
    );

    const followerUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followerIds,
        },
      },
      select: {
        name: true,
        username: true,
        image: true,
        followers: true,
      },
    });

    return NextResponse.json({ status: 200, followerUsers });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
