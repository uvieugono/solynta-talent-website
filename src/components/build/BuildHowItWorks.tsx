"use client";

import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Tell us your idea",
    desc: "Complete a requirements form or book a call. We scope your product and deliver a detailed PRD within 48 hours.",
    timing: "Day 1–2",
    color: "border-teal",
  },
  {
    num: "02",
    title: "We build it",
    desc: "Claude Code builds your custom software — full-stack, tested, production-ready. You review progress weekly.",
    timing: "Days 3–28",
    color: "border-lavender",
  },
  {
    num: "03",
    title: "Go live",
    desc: "Your software launches with cloud hosting, user accounts, and everything configured. We handle deployment.",
    timing: "Day 30",
    color: "border-gold",
  },
  {
    num: "04",
    title: "Grow",
    desc: "Monthly feature sprints keep your product evolving. SolyntaFlow automates your operations. You focus on customers.",
    timing: "Ongoing",
    color: "border-coral",
  },
];

export default function BuildHowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            How It Works
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-16">
            Idea to income in 30&nbsp;days
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 120}>
              <div
                className={`p-6 rounded-2xl bg-slate-dark/40 border-l-2 ${step.color} h-full flex flex-col`}
              >
                <p className="font-mono text-xs text-ghost/40 mb-3">
                  {step.num}
                </p>
                <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ghost leading-relaxed flex-1 mb-4">
                  {step.desc}
                </p>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-teal w-fit">
                  {step.timing}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
