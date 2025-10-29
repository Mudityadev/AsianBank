"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [userId, setUserId] = useState("demo-user");
  const [twoFactor, setTwoFactor] = useState<{ enabled: boolean; secret?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchTwoFactor() {
    setError(null);
    try {
      const response = await fetch(`/api/auth/2fa?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to fetch 2FA status");
      }
      setTwoFactor(data.twoFactor);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function enrollTwoFactor() {
    setError(null);
    try {
      const response = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to enroll 2FA");
      }
      setTwoFactor(data.enrollment);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Secure login</CardTitle>
          <CardDescription>
            Review your two-factor configuration before signing in. Use the seeded demo user or your own identifier from
            registration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="userId">
              User ID
            </label>
            <Input id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button type="button" onClick={fetchTwoFactor}>
              Check 2FA
            </Button>
            <Button type="button" variant="secondary" onClick={enrollTwoFactor}>
              Enroll 2FA
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/(auth)/register">Create account</Link>
            </Button>
          </div>
          {twoFactor && (
            <div className="rounded-md border bg-muted p-3 text-sm">
              <p>
                Status: <strong>{twoFactor.enabled ? "Enabled" : "Disabled"}</strong>
              </p>
              {twoFactor.secret && (
                <p className="break-all text-xs text-muted-foreground">Secret: {twoFactor.secret}</p>
              )}
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
