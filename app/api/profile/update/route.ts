import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export default async function PATCH(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }
  try {
    const body = await request.json();
    console.log("body", body);
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ status: 20, data });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
