import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";
import extractJobId from "~/utils/extractJobId";
import getPosterTitle from "~/utils/getPosterTitle";

const BASE_MIDJOURNEY_URL = "https://cdn.midjourney.com/";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ status: 401, message: "User not logged in" });
  }

  try {
    const body = await request.json();
    const { prompt, filename, referencedImage } = body;
    const { image, imageSelected, version, ...rest } = body;

    const title = getPosterTitle(prompt);
    const jobId = referencedImage && extractJobId(referencedImage.filename);
    const mjImageUrl =
      jobId && `${BASE_MIDJOURNEY_URL}${jobId}/0_${imageSelected - 1}.png`;

    console.log("mjImageUrl :", mjImageUrl);

    const data = await prisma.poster.create({
      data: {
        ...rest,
        image: mjImageUrl || image,
        title,
        prompt,
        filename,
        jobId,
        discordImageUrl: image,
        mjImageUrl,
        model: version,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ status: 201, data });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
