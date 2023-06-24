import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";
import {getServerAuthSession} from "~/server/auth";

export async function POST(
  request: Request,
  { params }: { params: { posterId: string } }
) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({
      message: "Unauthorized",
    }, {status: 401});
  }

  const posterId = params.posterId;
  const { isPublic } = await request.json();

  if (!posterId) {
    return NextResponse.json({
      message: "Bad Request",
    }, { status: 400 });
  }

  try {
    // Fetch the poster first to check the owner
    const poster = await prisma.poster.findUnique({
      where: { id: posterId },
    });

    if (!poster) {
      return NextResponse.json({
        message: "Poster not found",
      }, { status: 404 });
    }

    if (poster.userId !== userId) {
      return NextResponse.json({
        error: "Forbidden",
      }, { status: 403 });
    }

    const updatedPoster = await prisma.poster.update({
      where: {
        id: posterId,
      },
      data: {
        isPublic,
      }
    });

    return NextResponse.json(updatedPoster.isPublic);
  } catch {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 });
  }
}
