import { NextResponse } from "next/server";
import { bettingService } from "@/lib/services/betting-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  try {
    const bets = bettingService.listBets(userId);
    return NextResponse.json({ bets });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
