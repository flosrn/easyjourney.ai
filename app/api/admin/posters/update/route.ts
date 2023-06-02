import { NextResponse } from "next/server";
import type { Poster } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function PATCH(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }
  if (session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ status: 403, message: "Forbidden" });
  }

  try {
    const { posters }: { posters: Poster[] } = await request.json();

    const updatePosters = await Promise.all(
      posters.map(async (poster) => {
        const updatedPoster = await prisma.poster.update({
          where: {
            id: poster.id,
          },
          data: {
            image: poster.image,
          },
        });
        return updatedPoster;
      })
    );

    const numberOfPostersUpdated = updatePosters.length;

    return NextResponse.json({
      status: 200,
      message: "Posters updated!",
      numberOfPostersUpdated,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error });
  }
}
