import { store } from "../store";
import { DashboardOverview } from "../types";
import { walletService } from "./wallet-service";
import { bettingService } from "./betting-service";

export class DashboardService {
  async getOverview(userId: string): Promise<DashboardOverview> {
    const user = store.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const wallet = await walletService.getOrCreateWallet(userId);
    const transactions = walletService.listTransactions(userId).slice(0, 25);
    const bets = bettingService.listBets(userId).slice(0, 25);
    const compliance = store.listComplianceLogs(userId).slice(0, 25);
    return { user, wallet, transactions, bets, compliance };
  }
}

export const dashboardService = new DashboardService();
