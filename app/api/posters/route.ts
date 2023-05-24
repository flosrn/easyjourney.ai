import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

const getPostersForUser = async (userId: User["id"]) =>
  prisma.poster.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true,
    },
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const posters = await getPostersForUser(body.userId);
    return NextResponse.json({ status: 200, posters });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
