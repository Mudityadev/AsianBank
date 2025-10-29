import { randomUUID } from "crypto";
import { executeBlockchainTransfer, executeFiatTransfer } from "../providers";
import { store } from "../store";
import { Currency, Transaction, Wallet } from "../types";

export class WalletService {
  async getOrCreateWallet(userId: string): Promise<Wallet> {
    const existing = store.getWalletByUserId(userId);
    if (existing) {
      return existing;
    }
    const wallet: Wallet = {
      id: randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      balances: [],
    };
    store.upsertWallet(wallet);
    return wallet;
  }

  private ensureFunds(wallet: Wallet, currency: Currency, amount: number) {
    const balance = wallet.balances.find((item) => item.currency === currency);
    if (!balance || balance.available < amount) {
      throw new Error("Insufficient funds");
    }
  }

  async deposit(userId: string, currency: Currency, amount: number): Promise<{ wallet: Wallet; transaction: Transaction }> {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    const wallet = await this.getOrCreateWallet(userId);
    const transfer =
      currency === "USD"
        ? await executeFiatTransfer("inbound", amount)
        : await executeBlockchainTransfer("inbound", currency, amount);
    const updated = store.adjustBalance(wallet, currency, amount);
    const transaction: Transaction = {
      id: randomUUID(),
      userId,
      walletId: updated.id,
      type: "deposit",
      currency,
      amount,
      reference: transfer.reference,
      createdAt: new Date().toISOString(),
      metadata: { provider: transfer.provider },
    };
    store.addTransaction(transaction);
    return { wallet: updated, transaction };
  }

  async withdraw(userId: string, currency: Currency, amount: number): Promise<{ wallet: Wallet; transaction: Transaction }> {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    const wallet = await this.getOrCreateWallet(userId);
    this.ensureFunds(wallet, currency, amount);
    const transfer =
      currency === "USD"
        ? await executeFiatTransfer("outbound", amount)
        : await executeBlockchainTransfer("outbound", currency, amount);
    const updated = store.adjustBalance(wallet, currency, -amount);
    const transaction: Transaction = {
      id: randomUUID(),
      userId,
      walletId: updated.id,
      type: "withdrawal",
      currency,
      amount: -amount,
      reference: transfer.reference,
      createdAt: new Date().toISOString(),
      metadata: { provider: transfer.provider },
    };
    store.addTransaction(transaction);
    return { wallet: updated, transaction };
  }

  recordBetTransaction(
    userId: string,
    wallet: Wallet,
    currency: Currency,
    amount: number,
    reference: string,
    type: Transaction["type"],
  ): Transaction {
    const transaction: Transaction = {
      id: randomUUID(),
      userId,
      walletId: wallet.id,
      type,
      currency,
      amount,
      reference,
      createdAt: new Date().toISOString(),
    };
    store.addTransaction(transaction);
    return transaction;
  }

  listTransactions(userId: string): Transaction[] {
    return store.listTransactionsForUser(userId);
  }
}

export const walletService = new WalletService();
