import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search: string = searchParams.get("search") ?? "";
  const session = await getServerAuthSession();
  console.log("session", session);
  const actualUserId = session?.user.id;

  try {
    const searchUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: actualUserId,
        },
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
        name: true,
        image: true,
      },
      take: 30,
    });
    console.log("searchUsers :", searchUsers);

    return NextResponse.json({ searchUsers }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
