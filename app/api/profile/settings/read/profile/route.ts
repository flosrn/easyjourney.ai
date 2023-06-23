import { NextResponse } from "next/server";
import { prisma } from "~/server/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "";
  console.log("username", username);

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    console.log("user", user);

    return NextResponse.json({ status: 200, data: user });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
