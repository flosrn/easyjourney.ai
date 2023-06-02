import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/server/auth";

const AMOUNT = 50;
const JOB_STATUS = "completed";
const JOB_TYPE = "upscale";
const ORDER_BY = "new";
const SEARCH_TYPE = "advanced";
const USER_ID = "f28265b7-1625-4084-bfff-ad5de3a4c1cb";

const getMidjourneySearchResults = async ({
  value,
  page = 1,
}: {
  value?: string;
  page?: number;
}): Promise<Response> => {
  const response = await fetch(
    `https://www.midjourney.com/api/app/recent-jobs/?amount=${AMOUNT}&dedupe=true&jobStatus=${JOB_STATUS}&jobType=${JOB_TYPE}&orderBy=${ORDER_BY}&page=${page}&prompt=${value}&refreshApi=0&searchType=${SEARCH_TYPE}&service=null&type=all&userId=${USER_ID}&user_id_ranked_score=null&_ql=todo&_qurl=https://www.midjourney.com/app/`,
    {
      method: "GET",
      headers: {
        cookie: `__Secure-next-auth.session-token=${env.MIDJOURNEY_CSRF_SESSION_TOKEN}`,
      },
    }
  );
  return response;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }
  if (session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ status: 403, message: "Forbidden" });
  }

  const { value, page } = await request.json();

  const response = await getMidjourneySearchResults({ value, page });
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const formattedData = data?.map((item) => ({
    id: item.id,
    imageUrl: item.image_paths[0],
    command: item.full_command,
    prompt: item.prompt,
    jobId: item.reference_job_id,
  }));

  return NextResponse.json(formattedData);
}
