import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  const body = await request.json();
  const { posterId } = body;

  if (!posterId) {
    return NextResponse.json({ status: 400, message: "Poster ID is required" });
  }

  try {
    // Check if the like already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        posterId,
      },
    });

    if (existingLike) {
      // Delete a like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ status: 204, message: "Like removed" });
    } else {
      // Create a new like
      await prisma.like.create({
        data: {
          userId: session.user.id,
          posterId,
        },
      });
      return NextResponse.json({ status: 201, message: "Poster liked" });
    }
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Failed to like the poster",
    });
  }
}
