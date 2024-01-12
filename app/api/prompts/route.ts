import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    const prompts = await prisma.promptHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ prompts }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
