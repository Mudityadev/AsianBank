import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Bet } from "@/lib/types";

interface BetTableProps {
  bets: Bet[];
}

export function BetTable({ bets }: BetTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Betting activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bets.map((bet) => (
          <div key={bet.id} className="flex flex-wrap items-center justify-between gap-4 rounded-md border px-3 py-2 text-sm">
            <div>
              <p className="font-semibold">{bet.market}</p>
              <p className="text-xs text-muted-foreground">
                {bet.type.toUpperCase()} • {bet.currency} • Stake {bet.stake}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">@ {bet.odds}</p>
              <p className="text-xs text-muted-foreground">
                {bet.status === "settled" ? `Result: ${bet.result}` : `Potential payout: ${bet.potentialPayout}`}
              </p>
            </div>
          </div>
        ))}
        {bets.length === 0 && <p className="text-sm text-muted-foreground">No bets placed yet.</p>}
      </CardContent>
    </Card>
  );
}
