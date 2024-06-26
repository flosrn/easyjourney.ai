import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, credits: true, freeCredits: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updatedData = {};

    if (user.credits > 0) {
      updatedData = {
        credits: {
          decrement: 1,
        },
      };
    } else if (user.freeCredits > 0) {
      updatedData = {
        freeCredits: {
          decrement: 1,
        },
      };
    } else {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updatedData,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.log("error :", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
