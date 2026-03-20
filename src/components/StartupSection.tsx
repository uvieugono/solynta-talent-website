"use client";
import ScrollReveal from "./ScrollReveal";

const startupStacks = [
  {
    name: "Solopreneur",
    team: "1\u20133 people",
    modules: ["Finance Core", "AI Customer Service"],
    monthly: "from $500/mo",
    replaces: "Bookkeeper + customer support hire",
  },
  {
    name: "Seed Stage",
    team: "3\u201310 people",
    modules: ["Finance Core", "Sales, CRM & Web", "AI Customer Service"],
    monthly: "from $750/mo",
    replaces: "3 hires + QuickBooks + HubSpot",
    featured: true,
  },
  {
    name: "Growth Stage",
    team: "10\u201325 people",
    modules: ["Finance Core", "Sales, CRM & Web", "AI Customer Service", "HR & Admin", "Marketing"],
    monthly: "from $1,500/mo",
    replaces: "5\u20136 hires + 4\u20135 SaaS tools",
  },
];

export default function StartupSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              For Startups
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Start lean. Scale fast.
            </h2>
            <p className="text-ghost text-lg leading-relaxed">
              You don&apos;t need to hire an accountant, a marketing coordinator,
              and a customer service rep before you&apos;ve found product-market fit.
              Subscribe to the departments you need today, add more as you grow.
              Your AI-powered back office scales with you — not ahead of you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {startupStacks.map((stack, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`p-7 rounded-2xl border h-full flex flex-col ${
                  stack.featured
                    ? "border-teal/30 bg-teal/[0.04]"
                    : "border-white/5 bg-slate-dark/40"
                }`}
              >
                {stack.featured && (
                  <div className="text-[10px] uppercase tracking-[0.25em] text-teal font-bold mb-3">
                    Most Common
                  </div>
                )}
                <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">
                  {stack.name}
                </h3>
                <p className="text-sm text-ghost/60 mb-5">{stack.team}</p>

                <ul className="space-y-2 flex-1 mb-5">
                  {stack.modules.map((mod, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-ghost/80">
                      <span className="text-teal/70 text-xs">&#10003;</span>
                      {mod}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/5">
                  <div className="font-[var(--font-display)] text-2xl font-bold text-white-soft mb-1">
                    {stack.monthly}
                  </div>
                  <p className="text-xs text-ghost/50">
                    Replaces: {stack.replaces}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center">
            <p className="text-ghost/70 mb-6">
              No setup fees. No long-term contracts. Scale up or down with 30 days notice.
            </p>
            <a
              href="/consultation"
              className="inline-flex px-8 py-4 rounded-full bg-teal text-midnight font-semibold hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400"
            >
              Find Your Ideal Stack
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
