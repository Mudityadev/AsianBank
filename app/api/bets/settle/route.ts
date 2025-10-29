import { NextResponse } from "next/server";
import { bettingService } from "@/lib/services/betting-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { betId, result } = body;
    if (!betId || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const bet = await bettingService.settleBet(betId, result);
    return NextResponse.json({ bet });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
