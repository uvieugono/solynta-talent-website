"use client";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    icon: "🏗️",
    title: "Single System of Record",
    subtitle: "UNIFIED DATA",
    desc: "Finance, HR, Inventory, Sales, Marketing and Development data all live in SolyntaFlow. Real-time, reconciled, audit-ready. No data silos. No integration costs.",
  },
  {
    icon: "🤖",
    title: "AI at the Workflow Level",
    subtitle: "EMBEDDED AI",
    desc: "Intelligence is baked into every workflow. Approvals trigger automatically. Anomalies surface in seconds. Reorders fire before stockouts. Payroll runs without human prompting.",
  },
  {
    icon: "⚡",
    title: "We Own the Entire Stack",
    subtitle: "OUR UNFAIR ADVANTAGE",
    desc: "No SAP licences. No Oracle subscriptions. No custom middleware. We built and own SolyntaFlow outright — passing every dollar of savings to you.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-slate-dark to-navy" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal/[0.04] blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              The Engine
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Powered by{" "}
              <span className="text-gradient">SolyntaFlow</span>
            </h2>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              Our proprietary AI-native ERP. One system of record. Eight service modules.
              Zero middleware. Enterprise power at an SME price tag.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="relative p-8 rounded-2xl bg-midnight/60 border border-white/5 h-full group hover:border-teal/20 transition-all duration-500">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="text-4xl block mb-4">{p.icon}</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-teal/70 mb-2 font-medium">
                  {p.subtitle}
                </p>
                <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-3">
                  {p.title}
                </h3>
                <p className="text-ghost leading-relaxed text-sm">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <ScrollReveal delay={400}>
          <div className="text-center mt-12 pt-8 border-t border-white/5">
            <p className="font-[var(--font-display)] text-lg text-ghost italic">
              &ldquo;SolyntaFlow is our unfair advantage &mdash; and yours.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
