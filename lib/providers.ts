import { Currency } from "./types";

type TransferDirection = "inbound" | "outbound";

type TransferResult = {
  provider: "blockchain" | "fiat";
  direction: TransferDirection;
  currency: Currency;
  amount: number;
  reference: string;
  settled: boolean;
};

export async function executeBlockchainTransfer(
  direction: TransferDirection,
  currency: Extract<Currency, "USDC" | "BTC">,
  amount: number,
): Promise<TransferResult> {
  await delay(120);
  return {
    provider: "blockchain",
    direction,
    currency,
    amount,
    reference: `chain-${Math.random().toString(36).slice(2, 10)}`,
    settled: true,
  };
}

export async function executeFiatTransfer(
  direction: TransferDirection,
  amount: number,
): Promise<TransferResult> {
  await delay(180);
  return {
    provider: "fiat",
    direction,
    currency: "USD",
    amount,
    reference: `fiat-${Math.random().toString(36).slice(2, 10)}`,
    settled: true,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
