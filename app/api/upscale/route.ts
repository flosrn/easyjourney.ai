import { NextResponse } from "next/server";
import { upscale } from "~/services/midjourneyUtils";

export async function POST(request: Request) {
  const body = await request.json();
  const status = await upscale(body);
  return NextResponse.json({ status });
}
