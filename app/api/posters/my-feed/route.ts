import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

type getFollowersprops = {
  userId: string | undefined;
};

type getPostersProps = {
  followersArray: string[];
};

const getFollowers = async ({ userId }: getFollowersprops) => {
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

const getPosters = async ({ followersArray }: getPostersProps) => {
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
    console.log("followersArray :", followersArray);
    const posters = await getPosters({ followersArray });

    return NextResponse.json({ status: 200, posters });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error : ${error}`,
    });
  }
}
