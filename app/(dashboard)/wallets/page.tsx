"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Currency, Transaction, Wallet } from "@/lib/types";

const currencies: Currency[] = ["USD", "USDC", "BTC"];

export default function WalletsPage() {
  const [userId, setUserId] = useState("demo-user");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({ amount: 1000, currency: "USD" as Currency });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const response = await fetch(`/api/wallet/balance?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load wallet");
      }
      setWallet(data.wallet);
      setTransactions(data.transactions);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function mutate(path: string) {
    setError(null);
    setStatus(null);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, currency: form.currency, amount: form.amount }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Wallet update failed");
      }
      setWallet(data.wallet);
      setTransactions((previous) => [data.transaction, ...previous].slice(0, 25));
      setStatus(`${form.currency} balance updated`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Wallet balances</CardTitle>
          <CardDescription>
            Monitor multi-currency positions and initiate on/off ramp transfers through blockchain and fiat providers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="userId">
              User ID
            </label>
            <Input id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {wallet?.balances.map((balance) => (
              <div key={balance.currency} className="rounded-md border bg-muted/40 p-4">
                <p className="text-xs uppercase text-muted-foreground">{balance.currency}</p>
                <p className="text-2xl font-semibold">{balance.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Available: {balance.available.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Currency</label>
              <select
                className="rounded-md border bg-background p-2"
                value={form.currency}
                onChange={(event) => setForm({ ...form, currency: event.target.value as Currency })}
              >
                {currencies.map((currency) => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="amount">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                min={0}
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })}
              />
            </div>
            <div className="flex items-end gap-3">
              <Button type="button" onClick={() => mutate("/api/wallet/deposit")}>Deposit</Button>
              <Button type="button" variant="secondary" onClick={() => mutate("/api/wallet/withdraw")}>
                Withdraw
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Recent activity</p>
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p>
                      {transaction.amount} {transaction.currency}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.reference}</p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && <p className="text-sm text-muted-foreground">No transactions yet.</p>}
            </div>
          </div>
          {status && <p className="text-sm text-emerald-600">{status}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap gap-3 pt-4 text-sm">
            <Link className="text-primary underline" href="/(dashboard)/bets">
              Place bets
            </Link>
            <Link className="text-primary underline" href="/(auth)/kyc">
              Update KYC
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
