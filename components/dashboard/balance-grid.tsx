import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Wallet } from "@/lib/types";

interface BalanceGridProps {
  wallet: Wallet | null;
}

export function BalanceGrid({ wallet }: BalanceGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Multi-currency balances</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {wallet?.balances?.map((balance) => (
          <div key={balance.currency} className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs uppercase text-muted-foreground">{balance.currency}</p>
            <p className="text-2xl font-semibold">{balance.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Available {balance.available.toLocaleString()}</p>
          </div>
        ))}
        {(!wallet || wallet.balances.length === 0) && (
          <p className="text-sm text-muted-foreground">No balances available.</p>
        )}
      </CardContent>
    </Card>
  );
}
