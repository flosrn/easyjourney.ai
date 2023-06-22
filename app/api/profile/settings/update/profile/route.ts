import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function PATCH(request: Request) {
  const session = await getServerAuthSession();
  const { name, bio, urls } = await request.json();
  const { instagram, twitter, discord } = urls;
  console.log("name", name);
  console.log("bio", bio);
  console.log("urls", urls);
  console.log("instagram", instagram);
  console.log("twitter", twitter);
  console.log("discord", discord);

  try {
    const profileId = session.user.id;

    const updateUser = await prisma.user.update({
      where: { id: profileId },
      data: { name, bio, instagram, twitter, discord },
    });

    return NextResponse.json({
      status: 200,
      data: updateUser,
      message: "profile updated",
    });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
