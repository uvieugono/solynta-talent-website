"use client";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    icon: "🤖",
    title: "AI-Augmented by Default",
    desc: "Every service is powered by the latest AI tools — automating repetitive work, accelerating delivery and reducing errors from day one.",
  },
  {
    icon: "👔",
    title: "Human-Led, Human-Accountable",
    desc: "AI works alongside our expert team, not instead of them. Every output is reviewed, quality-checked and delivered by real professionals.",
  },
  {
    icon: "📅",
    title: "Operational from Day 1",
    desc: "No lengthy onboarding. No infrastructure setup. We are live and contributing within days of your first call — not months.",
  },
  {
    icon: "🔒",
    title: "Your Data. Your IP. Always.",
    desc: "Strict NDAs, data security, and full IP assignment on all work. Your business information is handled with utmost care.",
  },
  {
    icon: "📈",
    title: "Scales With You",
    desc: "Start with one module. Add more as you grow. Scale tiers up or down with 30 days notice — no penalties, no friction.",
  },
  {
    icon: "💰",
    title: "Fraction of In-House Cost",
    desc: "Equivalent in-house teams cost $500,000\u2013$1,000,000+/year (\u00A3400K\u2013\u00A3800K). Solynta delivers the same capability for a fraction \u2014 with no HR overhead.",
  },
];

export default function WhySolynta() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Why Solynta Talent
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Not just a vendor.
              <br />A strategic operations partner.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="p-7 rounded-2xl bg-slate-dark/30 border border-white/5 hover:border-teal/15 transition-all duration-400 h-full group">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {r.icon}
                </span>
                <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-ghost/80 leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
