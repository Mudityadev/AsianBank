import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComplianceLog } from "@/lib/types";

interface ComplianceTimelineProps {
  logs: ComplianceLog[];
}

export function ComplianceTimeline({ logs }: ComplianceTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compliance timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start justify-between gap-4 rounded-md border px-3 py-2 text-sm">
            <div>
              <p className="font-semibold capitalize">{log.event.replace(/-/g, " ")}</p>
              <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{log.status}</p>
              {typeof log.score === "number" && <p className="text-xs text-muted-foreground">Score: {log.score}</p>}
            </div>
          </div>
        ))}
        {logs.length === 0 && <p className="text-sm text-muted-foreground">No compliance events recorded.</p>}
      </CardContent>
    </Card>
  );
}
