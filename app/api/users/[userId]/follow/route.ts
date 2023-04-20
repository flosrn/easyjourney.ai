import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new Error("You can't follow yourself");
  }

  // Check if the Follow already exists
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  if (existingFollow) {
    throw new Error("You are already following this user");
  }

  const newFollow = await prisma.follow.create({
    data: {
      follower: { connect: { id: followerId } },
      following: { connect: { id: followingId } },
    },
  });
  return newFollow;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  try {
    const {
      user: { id: followerId },
    } = session;
    const { userId: followingId } = params;

    const data = await followUser(followerId, followingId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error(error);
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 500 }
    );
  }
}
