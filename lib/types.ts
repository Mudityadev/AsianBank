export type Currency = "USD" | "USDC" | "BTC";

export interface TwoFactorEnrollment {
  enabled: boolean;
  secret?: string;
  createdAt?: string;
}

export interface KYCDocument {
  id: string;
  type: string;
  reference: string;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface UserLimits {
  dailyDepositLimit: number;
  dailyWithdrawalLimit: number;
  maxOpenBets: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  passwordHash: string;
  createdAt: string;
  twoFactor: TwoFactorEnrollment;
  kycDocuments: KYCDocument[];
  kycStatus: "pending" | "verified" | "rejected";
  verificationScore: number;
  limits: UserLimits;
}

export interface WalletBalance {
  currency: Currency;
  amount: number;
  available: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balances: WalletBalance[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  walletId: string;
  type: "deposit" | "withdrawal" | "settlement" | "bet";
  currency: Currency;
  amount: number;
  reference: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface Bet {
  id: string;
  userId: string;
  market: string;
  stake: number;
  currency: Currency;
  odds: number;
  type: "back" | "lay";
  status: "open" | "settled";
  potentialPayout: number;
  settledAt?: string;
  result?: "won" | "lost" | "void";
}

export interface ComplianceLog {
  id: string;
  userId: string;
  event: string;
  status: "pending" | "passed" | "failed";
  score?: number;
  createdAt: string;
  details?: Record<string, unknown>;
}

export interface DashboardOverview {
  user: User;
  wallet: Wallet;
  transactions: Transaction[];
  bets: Bet[];
  compliance: ComplianceLog[];
}
