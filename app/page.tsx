"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountOverview } from "@/components/dashboard/account-overview";
import { BalanceGrid } from "@/components/dashboard/balance-grid";
import { BetTable } from "@/components/dashboard/bet-table";
import { ComplianceTimeline } from "@/components/dashboard/compliance-timeline";
import { TransactionFeed } from "@/components/dashboard/transaction-feed";
import type { DashboardOverview } from "@/lib/types";

const DEFAULT_USER_ID = "demo-user";

export default function Home() {
  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/dashboard/overview?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load overview");
      }
      setOverview(data.overview);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/60">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/40 text-xl">AX</span>
            AsianBank Control Center
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link className="transition hover:text-white" href="/(auth)/register">
              Register
            </Link>
            <Link className="transition hover:text-white" href="/(auth)/login">
              Login & 2FA
            </Link>
            <Link className="transition hover:text-white" href="/(auth)/kyc">
              KYC
            </Link>
            <Link className="transition hover:text-white" href="/(dashboard)/wallets">
              Wallets
            </Link>
            <Link className="transition hover:text-white" href="/(dashboard)/bets">
              Betting
            </Link>
          </nav>
          <Button variant="secondary" onClick={() => router.refresh()}>
            Hard refresh
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Operational dashboard</h1>
              <p className="text-sm text-white/70">
                Data shown below is fetched from the live route handlers powering onboarding, compliance, wallets, and betting.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                className="w-48 bg-slate-900/80 text-white"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="User ID"
              />
              <Button type="button" onClick={load} disabled={loading}>
                {loading ? "Loading" : "Load"}
              </Button>
            </div>
          </div>
          {error && <p className="rounded-md border border-red-400/60 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
          <AccountOverview overview={overview} onRefresh={load} />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <BalanceGrid wallet={overview?.wallet ?? null} />
          <TransactionFeed transactions={overview?.transactions ?? []} />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <BetTable bets={overview?.bets ?? []} />
          <ComplianceTimeline logs={overview?.compliance ?? []} />
        </section>
      </main>
    </div>
  );
}
