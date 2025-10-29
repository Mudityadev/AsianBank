import { NextResponse } from "next/server";
import { bettingService } from "@/lib/services/betting-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, market, stake, currency, odds, type } = body;
    if (!userId || !market || typeof stake !== "number" || typeof odds !== "number" || !currency || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const bet = await bettingService.placeBet(userId, market, stake, currency, odds, type);
    return NextResponse.json({ bet });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
