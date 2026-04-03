"use client";

import ScrollReveal from "@/components/ScrollReveal";

const CALENDLY = "https://calendly.com/uvieugono";

export default function BuildCTA() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4">
            Ready?
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft mb-6">
            Your software business
            <br />
            <span className="text-gradient">starts with a call</span>
          </h2>
          <p className="text-lg text-ghost leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. We&apos;ll scope your idea, walk
            through the build process, and get you started.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full bg-teal text-midnight font-[var(--font-display)] font-bold text-sm tracking-wide hover:brightness-110 transition-all"
          >
            Book a Call
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
