import { NextResponse } from "next/server";
import { walletService } from "@/lib/services/wallet-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  try {
    const wallet = await walletService.getOrCreateWallet(userId);
    const transactions = walletService.listTransactions(userId).slice(0, 25);
    return NextResponse.json({ wallet, transactions });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
