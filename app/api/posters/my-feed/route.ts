import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

type getPostersOfFollowedUsersprops = {
  userId: string | undefined;
};

const getPostersOfFollowedUsers = async ({
  userId,
}: getPostersOfFollowedUsersprops) =>
  await prisma.poster.findMany({
    where: {
      user: {
        following: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    include: {
      user: true,
      likes: true,
    },
  });

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  try {
    const posters = await getPostersOfFollowedUsers({ userId });

    return NextResponse.json({ status: 200, posters });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error : ${error}`,
    });
  }
}
