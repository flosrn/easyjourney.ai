import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";
import extractJobId from "~/utils/extractJobId";
import getPosterTitle from "~/utils/getPosterTitle";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const body = await request.json();
    const { prompt, filename, referencedImage } = body;
    const { imageSelected, ...rest } = body;

    const title = getPosterTitle(prompt);
    const jobId = extractJobId(referencedImage.filename);
    const mjImageUrl = `https://cdn.midjourney.com/${jobId}/0_${imageSelected}.png`;

    const data = await prisma.poster.create({
      data: {
        ...rest,
        title,
        prompt,
        filename,
        jobId,
        discordImageUrl: body.image,
        mjImageUrl,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ status: 201, data });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
