import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";
import extractJobId from "~/utils/extractJobId";
import getPosterTitle from "~/utils/getPosterTitle";

const BASE_MIDJOURNEY_URL = "https://cdn.midjourney.com/";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    console.log("body :", body);
    const { fullPrompt, filename, jobId, uri, attachment, referencedMessage } =
      body;
    const { selectedImage, options } = body;
    const { textPrompt, ...restOptions } = options;

    const title = getPosterTitle(textPrompt);
    const baseJobId =
      referencedMessage && extractJobId(referencedMessage.filename);
    const mjImageUrl =
      jobId && `${BASE_MIDJOURNEY_URL}${baseJobId}/0_${selectedImage - 1}.webp`;

    console.log("mjImageUrl :", mjImageUrl);

    const referencedMessageWithJobId = {
      ...referencedMessage,
      jobId: baseJobId,
    };

    const data = await prisma.poster.create({
      data: {
        ...restOptions,
        prompt: textPrompt,
        image: mjImageUrl || uri,
        width: attachment.width,
        height: attachment.height,
        title,
        fullPrompt,
        filename,
        jobId,
        discordImageUrl: uri,
        mjImageUrl,
        userId: session.user.id,
        referencedImage: referencedMessageWithJobId,
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
