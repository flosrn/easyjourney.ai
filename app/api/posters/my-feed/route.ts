import { NextResponse } from "next/server";
import type { Poster } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

const getFollowers = async ({
  userId,
}: {
  userId?: string;
}): Promise<{ followingId: string }[]> => {
  const followedUserIds = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });

  return followedUserIds;
};

const getPosters = async ({
  followersArray,
}: {
  followersArray: string[];
}): Promise<Poster[]> => {
  const posters = await prisma.poster.findMany({
    where: {
      isPublic: true,
      userId: { in: followersArray },
    },
    include: {
      user: true,
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posters;
};

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  try {
    const followers = await getFollowers({ userId });
    const followersArray = followers.map(({ followingId }) => followingId);
    const posters = await getPosters({ followersArray });

    return NextResponse.json({ status: 200, posters });
  } catch (error: unknown) {
    console.error("error", error);
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error : ${error}`,
    });
  }
}
