import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

type Objet = {
  posterId: string;
  boardId: string;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const actualUserId = session?.user.id;
  console.log("actualUserId", actualUserId);

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { userId, boardId } = (await request.json()) as Objet & {
      userId: string;
    };

    console.log("boardId", boardId);
    console.log("userId", userId);

    return NextResponse.json({ status: 204 });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
