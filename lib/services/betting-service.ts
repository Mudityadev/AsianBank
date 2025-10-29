import { randomUUID } from "crypto";
import { store } from "../store";
import { Bet, Currency } from "../types";
import { walletService } from "./wallet-service";

export class BettingService {
  async placeBet(
    userId: string,
    market: string,
    stake: number,
    currency: Currency,
    odds: number,
    type: Bet["type"],
  ): Promise<Bet> {
    if (stake <= 0 || odds <= 1) {
      throw new Error("Invalid stake or odds");
    }
    const wallet = await walletService.getOrCreateWallet(userId);
    const balance = wallet.balances.find((item) => item.currency === currency);
    if (!balance || balance.available < stake) {
      throw new Error("Insufficient funds for bet");
    }
    const updatedWallet = store.adjustBalance(wallet, currency, -stake);
    walletService.recordBetTransaction(userId, updatedWallet, currency, -stake, `bet-${market}`, "bet");
    const bet: Bet = {
      id: randomUUID(),
      userId,
      market,
      stake,
      currency,
      odds,
      type,
      status: "open",
      potentialPayout: Number((stake * odds).toFixed(2)),
    };
    store.addBet(bet);
    return bet;
  }

  async settleBet(betId: string, result: Bet["result"]): Promise<Bet> {
    const bet = store.getBet(betId);
    if (!bet) {
      throw new Error("Bet not found");
    }
    if (bet.status === "settled") {
      return bet;
    }
    bet.status = "settled";
    bet.result = result;
    bet.settledAt = new Date().toISOString();
    const wallet = await walletService.getOrCreateWallet(bet.userId);
    if (result === "won") {
      store.adjustBalance(wallet, bet.currency, bet.potentialPayout);
      walletService.recordBetTransaction(
        bet.userId,
        wallet,
        bet.currency,
        bet.potentialPayout,
        `settlement-${bet.market}`,
        "settlement",
      );
    }
    store.updateBet(bet);
    return bet;
  }

  listBets(userId: string): Bet[] {
    return store.listBetsForUser(userId);
  }
}

export const bettingService = new BettingService();
