import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { posterId } = await request.json();

    const poster = await prisma.poster.findUnique({
      where: {
        id: posterId,
      },
    });

    if (!poster) {
      return NextResponse.json({
        status: 404,
        message: "Poster not found",
      });
    }

    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      session.user.role !== UserRole.ADMIN &&
      session.user.id !== poster.userId
    ) {
      return NextResponse.json({
        status: 401,
        message: "Not enough permission to do this",
      });
    }

    await prisma.poster.delete({
      where: {
        id: posterId,
      },
    });

    return NextResponse.json({ status: 204 });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
