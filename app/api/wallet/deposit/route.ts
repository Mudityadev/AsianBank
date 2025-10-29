import { NextResponse } from "next/server";
import { walletService } from "@/lib/services/wallet-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, currency, amount } = body;
    if (!userId || !currency || typeof amount !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const result = await walletService.deposit(userId, currency, amount);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
