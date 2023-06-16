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
    },
  });

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  console.log("userId :", userId);

  try {
    const posters = await getPostersOfFollowedUsers({ userId });
    console.log("posters from server component:", posters);

    return NextResponse.json({ status: 200, posters: mappedPosters });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error : ${error}`,
    });
  }
}
