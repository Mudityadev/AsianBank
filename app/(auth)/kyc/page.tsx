"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function KycPage() {
  const [form, setForm] = useState({ userId: "demo-user", documentType: "passport", reference: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/auth/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Submission failed");
      }
      setStatus(`${data.document.type} status: ${data.document.status}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function refreshStatus() {
    setError(null);
    try {
      const response = await fetch(`/api/auth/verification?userId=${form.userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to fetch status");
      }
      setStatus(`KYC status: ${data.status.kycStatus} (score: ${data.status.verificationScore})`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Upload KYC documentation</CardTitle>
          <CardDescription>
            Provide identity details and monitor verification status. Compliance logs are generated automatically via the API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="userId">
              User ID
            </label>
            <Input
              id="userId"
              value={form.userId}
              onChange={(event) => setForm({ ...form, userId: event.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="documentType">
              Document type
            </label>
            <Input
              id="documentType"
              value={form.documentType}
              onChange={(event) => setForm({ ...form, documentType: event.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="reference">
              Document reference
            </label>
            <Input
              id="reference"
              value={form.reference}
              onChange={(event) => setForm({ ...form, reference: event.target.value })}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={submit}>
              Submit document
            </Button>
            <Button type="button" variant="secondary" onClick={refreshStatus}>
              Refresh verification
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/(dashboard)/wallets">View wallets</Link>
            </Button>
          </div>
          {status && <p className="text-sm text-emerald-600">{status}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
