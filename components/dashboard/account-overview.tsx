import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/lib/types";

interface AccountOverviewProps {
  overview: DashboardOverview | null;
  onRefresh(): void;
}

export function AccountOverview({ overview, onRefresh }: AccountOverviewProps) {
  const user = overview?.user;
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{user ? user.name : "Account overview"}</CardTitle>
          <CardDescription>
            {user
              ? `Verified status: ${user.kycStatus} • Two factor ${user.twoFactor.enabled ? "enabled" : "disabled"}`
              : "Loading account state from APIs"}
          </CardDescription>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-md border border-primary/30 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-primary/20 bg-background/60 p-4 text-sm">
          <p className="text-xs uppercase text-muted-foreground">Contact</p>
          <p className="font-medium">{user?.email ?? "—"}</p>
          <p className="text-muted-foreground">{user?.phone ?? "Not provided"}</p>
          <p className="text-xs text-muted-foreground">Created {user ? new Date(user.createdAt).toLocaleString() : "—"}</p>
        </div>
        <div className="rounded-lg border border-primary/20 bg-background/60 p-4 text-sm">
          <p className="text-xs uppercase text-muted-foreground">Risk & limits</p>
          <p>
            Deposit: $
            {user ? user.limits.dailyDepositLimit.toLocaleString() : "—"}
          </p>
          <p>
            Withdrawal: $
            {user ? user.limits.dailyWithdrawalLimit.toLocaleString() : "—"}
          </p>
          <p>Max open bets: {user ? user.limits.maxOpenBets : "—"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
