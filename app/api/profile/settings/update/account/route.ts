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
  const { username } = await request.json();

  const usernameTaken = await isUsernameTaken(username);

  if (usernameTaken) {
    return NextResponse.json({
      status: 405,
      message: "Username is already taken",
    });
  }

  try {
    const profileId = session?.user.id;

    const updateUser = await prisma.user.update({
      where: { id: profileId },
      data: { username },
    });

    return NextResponse.json({
      status: 200,
      data: updateUser,
      message: "username updated",
    });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
}
