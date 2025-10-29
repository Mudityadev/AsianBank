"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Bet, Currency } from "@/lib/types";

const currencies: Currency[] = ["USD", "USDC", "BTC"];
const betTypes: Bet["type"][] = ["back", "lay"];

export default function BetsPage() {
  const [userId, setUserId] = useState("demo-user");
  const [bets, setBets] = useState<Bet[]>([]);
  const [form, setForm] = useState({ market: "BTC-USD", stake: 250, odds: 1.8, currency: "USDC" as Currency, type: "back" as Bet["type"] });
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const response = await fetch(`/api/bets/history?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load bets");
      }
      setBets(data.bets);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function placeBet() {
    setError(null);
    try {
      const response = await fetch("/api/bets/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...form }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to place bet");
      }
      setBets((previous) => [data.bet, ...previous]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Betting exchange</CardTitle>
          <CardDescription>Submit orders and monitor settlement status from the same dashboard context.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="userId">
              User ID
            </label>
            <Input id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} />
          </div>
          <div className="grid gap-4 rounded-md border p-4 md:grid-cols-5">
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium" htmlFor="market">
                Market
              </label>
              <Input id="market" value={form.market} onChange={(event) => setForm({ ...form, market: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="stake">
                Stake
              </label>
              <Input
                id="stake"
                type="number"
                min={0}
                value={form.stake}
                onChange={(event) => setForm({ ...form, stake: Number(event.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="odds">
                Odds
              </label>
              <Input
                id="odds"
                type="number"
                step={0.01}
                min={1}
                value={form.odds}
                onChange={(event) => setForm({ ...form, odds: Number(event.target.value) })}
              />
            </div>
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
              <label className="text-sm font-medium">Type</label>
              <select
                className="rounded-md border bg-background p-2"
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value as Bet["type"] })}
              >
                {betTypes.map((betType) => (
                  <option key={betType}>{betType}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button type="button" onClick={placeBet} className="w-full">
                Place bet
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Open positions</p>
            <div className="space-y-2">
              {bets.map((bet) => (
                <div key={bet.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm">
                  <div>
                    <p className="font-semibold">{bet.market}</p>
                    <p className="text-xs text-muted-foreground">{bet.type.toUpperCase()} • {bet.currency}</p>
                  </div>
                  <div className="text-right">
                    <p>
                      Stake: {bet.stake} @ {bet.odds}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bet.status === "settled" ? `Result: ${bet.result}` : `Potential payout: ${bet.potentialPayout}`}
                    </p>
                  </div>
                </div>
              ))}
              {bets.length === 0 && <p className="text-sm text-muted-foreground">No bets placed.</p>}
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap gap-3 pt-4 text-sm">
            <Link className="text-primary underline" href="/(dashboard)/wallets">
              Wallets
            </Link>
            <Link className="text-primary underline" href="/(auth)/kyc">
              KYC workflow
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
