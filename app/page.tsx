import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const stats = [
  {
    label: "Total assets secured",
    value: "$8.4B",
    change: "+12% QoQ",
  },
  {
    label: "Average APY",
    value: "18.2%",
    change: "Across stable yield vaults",
  },
  {
    label: "Settlements processed",
    value: "2.3M",
    change: "Daily cross-ledger payouts",
  },
];

const features = [
  {
    title: "Unified crypto banking",
    description:
      "Instant multi-currency wallets, AI treasury automation, and on/off ramping in 80+ fiat currencies.",
    icon: <VaultIcon className="h-10 w-10 text-indigo-300" />,
  },
  {
    title: "Licensed betting exchange",
    description:
      "Access fractional odds, live markets, and zero-latency settlements powered by on-chain liquidity pools.",
    icon: <BettingChipIcon className="h-10 w-10 text-emerald-300" />,
  },
  {
    title: "Dynamic risk engine",
    description:
      "Real-time compliance, AML scoring, and position hedging to protect your bankroll and balances.",
    icon: <ShieldIcon className="h-10 w-10 text-sky-300" />,
  },
];

const markets = [
  {
    title: "Crypto indices",
    description: "Bet the market direction of curated crypto baskets with transparent yield multipliers.",
  },
  {
    title: "Esports arena",
    description: "Wager on 150+ live esports titles with predictive analytics tailored to your risk appetite.",
  },
  {
    title: "Global sports",
    description: "From Champions League to UFC, settle in USDC instantly with provably fair odds feeds.",
  },
];

const steps = [
  {
    title: "Create your AsianBank ID",
    description: "Verify once, unlock banking, betting, and rewards with a single ultra-secure identity wallet.",
  },
  {
    title: "Fund & automate",
    description: "Deposit fiat or crypto, activate auto-yield strategies, and set betting bankroll guardrails.",
  },
  {
    title: "Play, hedge, repeat",
    description:
      "Stream live markets, hedge positions instantly, and withdraw to your preferred currency anytime.",
  },
];

const testimonials = [
  {
    quote:
      "AsianBank replaced three separate platforms. Our crypto treasury now grows while our traders lock in spreads in real time.",
    name: "Aria Chen",
    role: "Managing Partner, Nova Syndicate",
  },
  {
    quote:
      "The on-chain audit trail and instant settlements made compliance sign-off effortless for our global launch.",
    name: "Liam Patel",
    role: "COO, Orbit Gaming",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundGlow />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-xl font-semibold">
            AB
          </div>
          <div>
            <p className="text-lg font-semibold">AsianBank</p>
            <p className="text-sm text-white/60">Crypto Banking & Betting Exchange</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#markets">
            Markets
          </a>
          <a className="transition hover:text-white" href="#how-it-works">
            How it works
          </a>
          <a className="transition hover:text-white" href="#stories">
            Stories
          </a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-white/80 hover:text-white">
            Log in
          </Button>
          <Button size="sm" className="shadow-[0_20px_40px_rgba(99,102,241,0.35)]">
            Open account
          </Button>
        </div>
        <Button className="md:hidden" variant="secondary" size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-8">
            <Badge className="w-fit bg-white/10 text-sm text-white">
              The first regulated crypto bank built for bettors
            </Badge>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Grow your crypto. Predict every market. Win without leaving your bank.
              </h1>
              <p className="text-lg text-white/70">
                AsianBank fuses high-yield crypto banking with the thrill of a fully licensed betting exchange. Auto-compound
                your holdings while executing bets, hedges, and payouts from a single beautifully designed dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="text-base">
                Start earning today
                <ArrowIcon className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" className="text-base">
                Explore the sportsbook
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-sm text-white/50">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  <p className="text-xs text-indigo-200/80">{item.change}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
            <CardHeader className="gap-6">
              <Badge variant="outline" className="w-fit border-white/20 text-white/80">
                Live multi-wallet view
              </Badge>
              <CardTitle className="text-2xl">Personal yield + betting performance</CardTitle>
              <CardDescription>
                Track balances across USDC, BTC, and fiat in real-time while monitoring your open bets and hedged exposures.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <p>Wallet yield this week</p>
                  <p className="text-emerald-300">+4.8%</p>
                </div>
                <div className="mt-4 h-28 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-400/20 to-pink-400/20" />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <p className="text-white/70">Champions League hedge</p>
                  <span className="font-semibold text-emerald-300">Settled • +2.3 ETH</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <p className="text-white/70">BTC volatility vault</p>
                  <span className="font-semibold text-indigo-200">Earning 21% APY</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="features" className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="w-fit border-indigo-400/40 text-indigo-200">
                Why AsianBank
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Banking-grade trust, exchange-level thrills
              </h2>
            </div>
            <p className="max-w-2xl text-sm text-white/60">
              Built for professionals and high-velocity players who refuse to choose between security and performance. Every
              interaction is encrypted, insured, and settlement-ready.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-white/10 bg-white/[0.03]">
                <CardHeader className="gap-5">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="markets" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit border-emerald-400/40 text-emerald-200">
              Betting markets
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Live markets streamed directly into your banking cockpit
            </h2>
            <p className="text-sm text-white/60">
              Hedge positions with instant liquidity, leverage dynamic odds, and autowithdraw to your vault when profit targets
              hit.
            </p>
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-sm text-emerald-100">
              "AsianBank gave our trading desk the ability to pivot from delta-neutral strategies to live market exposure in seconds
              — without moving funds off platform."
              <p className="mt-3 text-xs uppercase tracking-wide text-emerald-200/70">
                — Quant Strategy Team, Helios Markets
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {markets.map((market) => (
              <Card key={market.title} className="h-full border-white/10 bg-slate-900/70">
                <CardHeader className="gap-3">
                  <CardTitle>{market.title}</CardTitle>
                  <CardDescription className="text-sm text-white/60">
                    {market.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="space-y-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="w-fit border-sky-400/40 text-sky-200">
                Seamless onboarding
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Launch in minutes, scale without limits
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/60">
              Automations, smart compliance, and real-time analytics support your growth from the very first deposit.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-white/10 bg-white/[0.04]">
                <CardHeader className="gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/80">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-sm text-white/70">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="stories" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-white/30 text-white/80">
              Client success
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Teams growing faster with AsianBank
            </h2>
            <p className="text-sm text-white/60">
              We partner with elite crypto funds, pro betting syndicates, and leading esports organizations to deliver always-on
              liquidity and compliance-ready operations.
            </p>
            <form className="mt-4 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row">
              <Input placeholder="Enter your work email" type="email" />
              <Button className="shrink-0" size="lg">
                Request a demo
              </Button>
            </form>
          </div>
          <div className="grid gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-white/10 bg-slate-900/60">
                <CardHeader className="gap-4">
                  <CardDescription className="text-base leading-relaxed text-white/80">
                    “{testimonial.quote}”
                  </CardDescription>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-wide text-white/50">{testimonial.role}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/70 py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center">
          <Badge variant="success" className="w-fit">
            Regulated in 7 jurisdictions
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to merge your bank and betting edge?
          </h2>
          <p className="max-w-2xl text-sm text-white/60">
            Join AsianBank to access secure custody, institutional-grade liquidity, and a next-generation betting exchange under one
            roof.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="text-base">
              Create your AsianBank ID
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Talk to an expert
            </Button>
          </div>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} AsianBank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-gradient-to-b from-indigo-500/30 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-x-[10%] top-[15%] h-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/20 blur-[140px]" />
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function VaultIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor" opacity="0.12" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

function BettingChipIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.12" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path
        d="M12 3 5 6v6c0 4.2 2.5 8.2 7 9 4.5-.8 7-4.8 7-9V6l-7-3Z"
        fill="currentColor" opacity="0.12"
      />
      <path d="m9.5 12 1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
