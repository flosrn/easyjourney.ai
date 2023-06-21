import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { posterId: string } }
) {
  const posterId = params.posterId;

  if (posterId) {
    try {
      const poster = await prisma.poster.findUnique({
        where: {
          id: posterId,
        },
      });

      return NextResponse.json(poster);
    } catch {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}
