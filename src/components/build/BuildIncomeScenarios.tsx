"use client";

import ScrollReveal from "@/components/ScrollReveal";

type Currency = "USD" | "GBP" | "NGN";

interface Scenario {
  label: string;
  users: string;
  userPrice: string;
  revenue: string;
  subscription: string;
  net: string;
}

const scenarios: Record<"GBP" | "USD", { conservative: Scenario; realistic: Scenario }> = {
  GBP: {
    conservative: {
      label: "Conservative",
      users: "80 users",
      userPrice: "\u00A35/mo each",
      revenue: "\u00A3400/mo",
      subscription: "\u00A3199/mo",
      net: "\u00A3201/mo",
    },
    realistic: {
      label: "Realistic",
      users: "300 users",
      userPrice: "\u00A310/mo each",
      revenue: "\u00A33,000/mo",
      subscription: "\u00A3399/mo",
      net: "\u00A32,601/mo",
    },
  },
  USD: {
    conservative: {
      label: "Conservative",
      users: "80 users",
      userPrice: "$7/mo each",
      revenue: "$560/mo",
      subscription: "$299/mo",
      net: "$261/mo",
    },
    realistic: {
      label: "Realistic",
      users: "300 users",
      userPrice: "$12/mo each",
      revenue: "$3,600/mo",
      subscription: "$599/mo",
      net: "$3,001/mo",
    },
  },
};

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <div className="bg-slate-dark/40 rounded-2xl p-6 border border-white/5">
      <p className="text-xs uppercase tracking-[0.15em] text-ghost/40 font-medium mb-4">
        {scenario.label} scenario \u2014 {scenario.users} paying{" "}
        {scenario.userPrice}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your software revenue</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-lavender">
            {scenario.revenue}
          </p>
        </div>
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your Solynta Build fee</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-white-soft">
            {scenario.subscription}
          </p>
        </div>
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your net income</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-teal">
            {scenario.net}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BuildIncomeScenarios({
  currency,
}: {
  currency: Currency;
}) {
  if (currency === "NGN") {
    return (
      <section id="income" className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4">
                Your Income
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-6">
                You keep 100% of your software revenue
              </h2>
              <p className="text-lg text-ghost leading-relaxed mb-6">
                No ongoing subscription. Build once, earn forever. Your software
                is yours \u2014 every naira your customers pay goes directly to
                you. SolyntaFlow automates your operations so your time
                investment is hours per week, not days.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const data = scenarios[currency === "GBP" ? "GBP" : "USD"];

  return (
    <section id="income" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            The Income Case
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-4">
            What your software could earn you
          </h2>
          <p className="text-lg text-ghost text-center max-w-2xl mx-auto mb-12">
            SolyntaFlow automates your software&apos;s operations. Once
            running, your time investment is hours per week, not days.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <ScenarioCard scenario={data.conservative} />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ScenarioCard scenario={data.realistic} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
