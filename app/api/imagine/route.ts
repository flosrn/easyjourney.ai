import { NextResponse } from "next/server";
import { imagine } from "~/services/midjourneyUtils";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const status = await imagine({ prompt });
  return NextResponse.json({ status });
}
