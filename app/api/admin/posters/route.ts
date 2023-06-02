import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function GET() {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }
  if (session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ status: 403, message: "Forbidden" });
  }

  const posters = await prisma.poster.findMany({
    where: {
      createdAt: {
        lt: new Date("2023-05-26T08:17:35.755Z"),
      },
      image: {
        not: {
          startsWith: "https://cdn.midjourney.com/",
        },
      },
    },
  });

  return NextResponse.json(posters);
}
