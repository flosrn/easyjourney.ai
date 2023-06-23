import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

export async function PATCH(request: Request) {
  const session = await getServerAuthSession();
  const { name, bio, urls } = await request.json();

  let discord = "";
  let instagram = "";
  let twitter = "";

  for (const urlObj of urls) {
    switch (urlObj.key) {
      case "instagram":
        instagram = urlObj.value;
        break;
      case "twitter":
        twitter = urlObj.value;
        break;
      case "discord":
        discord = urlObj.value;
        break;
      default:
        console.error(`Unexpected key: ${urlObj.key}`);
        break;
    }
  }

  try {
    const profileId = session?.user.id;

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
