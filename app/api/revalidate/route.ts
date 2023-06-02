import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Seems like this is not working
// https://github.com/vercel/next.js/issues/49861

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
