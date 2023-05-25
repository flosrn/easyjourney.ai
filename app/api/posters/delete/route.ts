import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const { posterId } = await request.json();

    // await prisma.like.deleteMany({
    //   where: {
    //     posterId,
    //   },
    // });

    // const data = await prisma.poster.delete({
    //   where: {
    //     id: posterId,
    //   },
    // });

    console.log("id :", posterId);
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
