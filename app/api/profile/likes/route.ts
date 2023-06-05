import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username: string = searchParams.get("username") ?? "";
  console.log("username", username);

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const userId = user?.id ?? "";

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

    const likesId = posters?.posters
      .map((poster) => poster.likes.map((like) => like.userId))
      .filter((id) => id.length > 0)
      .flat()
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter((id) => id !== userId);

    const userLike = await prisma.user.findMany({
      where: {
        id: {
          in: likesId,
        },
      },
      include: {
        likes: true,
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
