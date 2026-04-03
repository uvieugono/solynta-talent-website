"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function BuildHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-6">
            Solynta Build
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white-soft leading-[1.08] max-w-4xl mb-6">
            Own your own
            <br />
            <span className="text-gradient">software business</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg sm:text-xl text-ghost max-w-2xl leading-relaxed mb-10">
            You bring the idea. We build, host, and maintain your custom
            software — delivered in 30&nbsp;days. You keep 100% of the revenue.
            No technical co-founder needed.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://calendly.com/uvieugono"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-teal text-midnight font-[var(--font-display)] font-bold text-sm tracking-wide hover:brightness-110 transition-all"
            >
              Book a Call
            </a>
            <Link
              href="#pricing"
              className="px-8 py-4 rounded-full border border-white/10 text-white-soft font-[var(--font-display)] font-bold text-sm tracking-wide hover:border-teal/40 hover:text-teal transition-all"
            >
              See Pricing
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
