import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

const getPostersForUser = async (userId?: User["id"]) =>
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

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  console.log("session :", session);

  try {
    const posters = await getPostersForUser(session?.user.id);
    return NextResponse.json({ status: 200, posters });
  } catch (error: unknown) {
    console.log("error :", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
