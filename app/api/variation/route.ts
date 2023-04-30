import { NextResponse } from "next/server";
import { variation } from "~/services/midjourneyUtils";

export async function POST(request: Request) {
  const body = await request.json();
  const status = await variation(body);
  console.log("status :", status);
  return NextResponse.json({ status });
}
