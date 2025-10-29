import { randomUUID } from "crypto";
import { Bet, ComplianceLog, Transaction, User, Wallet, WalletBalance, Currency } from "./types";

const DEFAULT_LIMITS = {
  dailyDepositLimit: 50000,
  dailyWithdrawalLimit: 30000,
  maxOpenBets: 25,
};

function now(): string {
  return new Date().toISOString();
}

function createInitialBalances(): WalletBalance[] {
  return [
    { currency: "USD", amount: 25000, available: 23000 },
    { currency: "USDC", amount: 12000, available: 12000 },
    { currency: "BTC", amount: 1.8, available: 1.5 },
  ];
}

export class InMemoryStore {
  private users = new Map<string, User>();
  private wallets = new Map<string, Wallet>();
  private transactions = new Map<string, Transaction>();
  private bets = new Map<string, Bet>();
  private complianceLogs = new Map<string, ComplianceLog>();
  readonly demoUserId: string;

  constructor() {
    this.demoUserId = this.seed();
  }

  private seed(): string {
    const id = "demo-user";
    const user: User = {
      id,
      email: "demo@asianbank.io",
      name: "Demo Syndicate",
      phone: "+1-202-555-0115",
      passwordHash: "hashed-demo-password",
      createdAt: now(),
      twoFactor: { enabled: true, secret: "JBSWY3DPEHPK3PXP", createdAt: now() },
      kycDocuments: [],
      kycStatus: "verified",
      verificationScore: 0.92,
      limits: DEFAULT_LIMITS,
    };
    this.users.set(id, user);

    const wallet: Wallet = {
      id: randomUUID(),
      userId: id,
      createdAt: now(),
      balances: createInitialBalances(),
    };
    this.wallets.set(wallet.id, wallet);

    const logs: ComplianceLog[] = [
      {
        id: randomUUID(),
        userId: id,
        event: "initial-kyc",
        status: "passed",
        score: 0.94,
        createdAt: now(),
      },
    ];
    logs.forEach((log) => this.complianceLogs.set(log.id, log));

    return id;
  }

  createUser(data: Omit<User, "limits" | "createdAt" | "twoFactor" | "kycDocuments" | "kycStatus" | "verificationScore">): User {
    const user: User = {
      ...data,
      createdAt: now(),
      twoFactor: { enabled: false },
      kycDocuments: [],
      kycStatus: "pending",
      verificationScore: 0,
      limits: DEFAULT_LIMITS,
    };
    this.users.set(user.id, user);
    return user;
  }

  updateUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getWalletByUserId(userId: string): Wallet | undefined {
    return Array.from(this.wallets.values()).find((wallet) => wallet.userId === userId);
  }

  upsertWallet(wallet: Wallet): void {
    this.wallets.set(wallet.id, wallet);
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.set(transaction.id, transaction);
  }

  listTransactionsForUser(userId: string): Transaction[] {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  addBet(bet: Bet): void {
    this.bets.set(bet.id, bet);
  }

  getBet(id: string): Bet | undefined {
    return this.bets.get(id);
  }

  updateBet(bet: Bet): void {
    this.bets.set(bet.id, bet);
  }

  listBetsForUser(userId: string): Bet[] {
    return Array.from(this.bets.values())
      .filter((bet) => bet.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  addComplianceLog(log: ComplianceLog): void {
    this.complianceLogs.set(log.id, log);
  }

  listComplianceLogs(userId: string): ComplianceLog[] {
    return Array.from(this.complianceLogs.values())
      .filter((log) => log.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  adjustBalance(wallet: Wallet, currency: Currency, delta: number): Wallet {
    const balances = wallet.balances.map((balance) => {
      if (balance.currency === currency) {
        const nextAmount = Number((balance.amount + delta).toFixed(6));
        const nextAvailable = Number((balance.available + delta).toFixed(6));
        return { ...balance, amount: nextAmount, available: nextAvailable };
      }
      return balance;
    });
    const existing = balances.find((balance) => balance.currency === currency);
    if (!existing) {
      balances.push({ currency, amount: delta, available: delta });
    }
    const updated: Wallet = { ...wallet, balances };
    this.wallets.set(wallet.id, updated);
    return updated;
  }
}

export const store = new InMemoryStore();
