import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  try {
    const body = await request.json();
    const { prompt } = body;

    const title = prompt.split(" ").slice(0, 3).join(" ").replaceAll(",", "");

    const data = await prisma.poster.create({
      data: {
        title,
        ...body,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ status: 201, data });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
