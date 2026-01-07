import { NextResponse } from "next/server";
import { logs } from "../../store";

export async function GET() {
  return NextResponse.json(logs);
}
