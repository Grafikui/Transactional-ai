import { NextResponse } from "next/server";
import { transactions } from "../../store";

export async function GET() {
  return NextResponse.json(transactions);
}
