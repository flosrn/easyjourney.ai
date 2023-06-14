import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

const isUsernameTaken = async (username: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return Boolean(user);
};

export async function PATCH(request: Request) {
  const session = await getServerAuthSession();
  const { username, name } = await request.json();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  if (username.length <= 3 || username.length > 30) {
    return NextResponse.json({
      status: 400,
      message:
        "Username is too short(3 characters min) or too long(25 characters max))",
    });
  }
  if (name.length <= 3 || name.length > 30) {
    return NextResponse.json({
      status: 400,
      message:
        "Name is too short(3 characters min) or too long(25 characters max))",
    });
  }

  if (username === session.user.username) {
    try {
      const profileId = session.user.id;

      const updateUser = await prisma.user.update({
        where: { id: profileId },
        data: { name },
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

  const usernameTaken = await isUsernameTaken(username);

  if (usernameTaken) {
    return NextResponse.json({
      status: 405,
      message: "Username is already taken",
    });
  }

  try {
    const profileId = session.user.id;

    const updateUser = await prisma.user.update({
      where: { id: profileId },
      data: { username, name },
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
