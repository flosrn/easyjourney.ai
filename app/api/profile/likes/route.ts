import { NextResponse } from "next/server";
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

    const posters = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posters: {
          include: {
            likes: true,
          },
        },
      },
    });
    console.log("posters", posters);

    const likesId = posters?.posters
      .map((poster) => poster.likes.map((like) => like.userId))
      .filter((id) => id.length > 0)
      .flat()
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter((id) => id !== userId);
    console.log("likes", likesId);

    const userLike = await prisma.user.findMany({
      where: {
        id: {
          in: likesId,
        },
      },
    });

    return NextResponse.json({ status: 200, data: userLike });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
