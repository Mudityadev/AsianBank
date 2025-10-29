"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policy, setPolicy] = useState<Record<string, unknown> | null>(null);

  async function fetchPolicy() {
    const response = await fetch("/api/auth/password-policy");
    const data = await response.json();
    setPolicy(data.policy);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to create account");
      }
      setStatus(`Account created for ${data.user.email}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Create a regulated account</CardTitle>
          <CardDescription>
            Sign up to access unified banking and betting. Password policies and compliance checks are enforced automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="name">
                Legal name
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="phone">
                Phone
              </label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                required
              />
              <Button type="button" variant="ghost" className="w-fit px-0 text-sm" onClick={fetchPolicy}>
                View password policy
              </Button>
              {policy && (
                <pre className="rounded bg-muted p-3 text-xs text-muted-foreground">
                  {JSON.stringify(policy, null, 2)}
                </pre>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>
          </form>
          {status && <p className="mt-4 text-sm text-emerald-600">{status}</p>}
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <p className="mt-6 text-sm text-muted-foreground">
            Already registered? <Link href="/(auth)/login" className="text-primary underline">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
