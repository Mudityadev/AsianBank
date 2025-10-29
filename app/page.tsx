const features = [
  {
    title: "Unified Wallet",
    description:
      "Manage digital assets, stablecoins, and fiat on one secure, audited ledger.",
  },
  {
    title: "Smart Betting",
    description:
      "Predictive analytics and instant settlements bring a frictionless betting experience.",
  },
  {
    title: "Regulatory Guardrails",
    description:
      "KYC/KYB automations, AML rules, and geo-compliance baked into every transaction.",
  },
];

const steps = [
  {
    title: "Create your nexus account",
    detail:
      "Onboard in minutes with biometric identity checks and curated risk profiles.",
  },
  {
    title: "Fund with crypto or fiat",
    detail:
      "Bring liquidity from exchanges, bank transfers, or on-ramp partners with zero downtime.",
  },
  {
    title: "Deploy capital with confidence",
    detail:
      "Stake in DeFi vaults, place strategic wagers, and earn yield in a unified dashboard.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/20 blur-3xl" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-28">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-semibold uppercase tracking-[0.4em] text-emerald-400/80">
                AsianBank Nexus
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Crypto banking that powers immersive betting intelligence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Orchestrate capital, compliance, and entertainment in one digital platform.
                AsianBank Nexus gives your users institutional-grade custody, smart risk
                controls, and real-time markets without the chaos of fragmented tools.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                  href="#early-access"
                >
                  Request early access
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-emerald-400/70 hover:text-emerald-300"
                  href="#features"
                >
                  Explore the platform
                </a>
              </div>
            </div>
            <div className="relative mt-12 flex w-full max-w-lg justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl lg:mt-0">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 blur-2xl" />
              <div className="grid w-full grid-cols-2 gap-4 text-left text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Vault Yield
                  </p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">12.4%</p>
                  <p className="mt-3 text-xs text-slate-400">DeFi & treasury blend</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Betting ROI</p>
                  <p className="mt-2 text-2xl font-bold text-cyan-300">+28%</p>
                  <p className="mt-3 text-xs text-slate-400">Quant-driven parlays</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Instant Settlements
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">1.5s</p>
                  <p className="mt-3 text-xs text-slate-400">Chain-agnostic rails</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Compliance Coverage
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">145+</p>
                  <p className="mt-3 text-xs text-slate-400">Jurisdictions supported</p>
                </div>
              </div>
            </div>
          </header>

          <section id="features" className="mt-24 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl transition hover:border-emerald-400/60 hover:shadow-emerald-500/20"
              >
                <h2 className="text-2xl font-semibold text-white group-hover:text-emerald-300">
                  {feature.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-24 grid gap-12 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                Security and transparency engineered for institutional trust.
              </h2>
              <p className="mt-6 text-base text-slate-300">
                Every ledger movement is verifiable in real-time with zk-backed proofs and
                SOC 2 compliant storage. Segregated funds, programmable limits, and multi-sig
                approvals ensure your treasury stays protected while scaling global betting
                operations.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  24/7 automated risk monitoring with anomaly detection across markets.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  Tokenized wagering tickets for secondary liquidity without counterparty risk.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  Enterprise observability with API hooks for sportsbooks, casinos, and fintech partners.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
              <h3 className="text-xl font-semibold text-white">Compliance at your core</h3>
              <p className="mt-4 text-sm text-slate-300">
                Adaptive risk scores, sanction screening, and audit-ready reconciliation keep you ahead of regulators.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-500">
                Partners
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="rounded-full border border-slate-700 px-3 py-1">ChainGuard</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">SportsAI</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">GlobalKYC</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">Fireblocks</span>
              </div>
            </div>
          </section>

          <section className="mt-24 grid gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400/80">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{step.detail}</p>
              </article>
            ))}
          </section>

          <section
            id="early-access"
            className="mt-24 rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 via-slate-950 to-cyan-500/10 p-10 text-center"
          >
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Be the first to launch the future of crypto-powered betting.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300">
              Join the AsianBank Nexus beta to co-create institutional-grade rails for hybrid finance and next-generation betting ecosystems.
            </p>
            <form className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Work email"
                className="flex-1 rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Request invite
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-500">
              We respect your privacy. No spam, ever.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
