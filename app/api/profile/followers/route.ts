import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  console.log("username", username);

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    console.log("user", user);

    const userId: string = user?.id;

    const followers = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        followers: true,
      },
    });
    console.log("followers", followers);

    const followerIds = followers?.followers.map(
      (follower) => follower.followerId
    );
    console.log("followerIds", followerIds);

    const followerUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followerIds,
        },
      },
    });

    console.log("followerUsers", followerUsers);

    return NextResponse.json({ status: 200, data: followers });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
