import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "@/lib/types";

interface TransactionFeedProps {
  transactions: Transaction[];
}

export function TransactionFeed({ transactions }: TransactionFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transaction feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
        {transactions.length === 0 && <p className="text-sm text-muted-foreground">No recent transactions.</p>}
      </CardContent>
    </Card>
  );
}
