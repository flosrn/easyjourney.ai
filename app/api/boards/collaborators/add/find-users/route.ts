import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search: string = searchParams.get("search") ?? "";
  console.log("searchFromBack :", search);

  try {
    const searchUsers = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return NextResponse.json({ status: 200, searchUsers });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
