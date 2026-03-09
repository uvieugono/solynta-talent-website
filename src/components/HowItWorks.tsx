"use client";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "AI Consultation",
    desc: "Take our 5-minute AI business assessment. Our AI analyses your operations and delivers a custom roadmap with recommendations, pricing, and ROI projections — instantly.",
    timing: "5 minutes — FREE",
    color: "border-teal",
  },
  {
    num: "02",
    title: "AI Readiness Audit",
    desc: "We onboard your business data, tools and processes — training every active service module on your specific context.",
    timing: "Week 1 — FREE",
    color: "border-lavender",
  },
  {
    num: "03",
    title: "Go Live",
    desc: "Your chosen modules activate. Dashboards live. Workflows running. Support available. Results within 30 days.",
    timing: "Week 2 — Day 1",
    color: "border-gold",
  },
  {
    num: "04",
    title: "Grow & Scale",
    desc: "Review outcomes monthly with your account manager. Add new services, upgrade tiers, or flex capacity as you evolve.",
    timing: "Ongoing",
    color: "border-coral",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Getting Started
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              From first call to first results
              <br />
              <span className="text-gradient">in under two weeks</span>
            </h2>
            <p className="text-ghost text-lg max-w-xl mx-auto">
              Zero commitment to start. Free AI Readiness Onboarding included with every first module.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className={`relative p-6 rounded-2xl bg-slate-dark/40 border-l-2 ${s.color} h-full`}>
                <span className="font-mono text-xs text-ghost/40 mb-3 block">
                  {s.num}
                </span>
                <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-ghost/80 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-[11px] font-medium text-teal border border-white/5">
                  {s.timing}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* AI Readiness callout */}
        <ScrollReveal delay={500}>
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-teal/10 via-teal/5 to-transparent border border-teal/15 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">
                Free AI Readiness Onboarding
              </h3>
              <p className="text-sm text-ghost">
                Valued at $2,500–$5,000. We structure your data, capture SOPs, and train your AI — completely free.
              </p>
            </div>
            <a
              href="/consultation"
              className="inline-block px-6 py-3 rounded-full bg-teal text-midnight font-semibold text-sm hover:shadow-lg hover:shadow-teal/20 transition-all whitespace-nowrap"
            >
              Start Free AI Analysis
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
