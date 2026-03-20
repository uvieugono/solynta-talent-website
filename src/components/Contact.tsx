"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { MODULES, Currency, formatPrice, getModulePrice } from "@/lib/pricing";

const serviceIcons: Record<string, { icon: string; short: string }> = {
  finance: { icon: "\u{1F4B0}", short: "Finance" },
  sales_crm_web: { icon: "\u{1F4C8}", short: "Sales" },
  customer_service: { icon: "\u{1F4AC}", short: "CS" },
  hr_admin: { icon: "\u{1F465}", short: "HR" },
  marketing: { icon: "\u{1F4E3}", short: "Mktg" },
  developers: { icon: "\u{1F4BB}", short: "Dev" },
  data_science: { icon: "\u{1F4CA}", short: "Data" },
  enterprise_intel: { icon: "\u{1F9E0}", short: "Intel" },
  inventory: { icon: "\u{1F4E6}", short: "Inv" },
};

export default function Contact() {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-slate-dark to-midnight" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.05] blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
            Get Started
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Ready to build your
            <br />
            <span className="text-gradient">business operations stack?</span>
          </h2>
          <p className="text-ghost text-lg max-w-xl mx-auto mb-8">
            Start with one service or all nine. Your operations, your pace, your price.
            Book a free discovery call — zero commitment.
          </p>
        </ScrollReveal>

        {/* Currency toggle */}
        <ScrollReveal delay={50}>
          <div className="flex items-center justify-center gap-2 mb-6">
            {(["USD", "GBP", "NGN"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  currency === c
                    ? "bg-teal text-midnight"
                    : "bg-white/5 text-ghost border border-white/10 hover:border-teal/30"
                }`}
              >
                <span>{c === "USD" ? "\u{1F1FA}\u{1F1F8}" : c === "GBP" ? "\u{1F1EC}\u{1F1E7}" : "\u{1F1F3}\u{1F1EC}"}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Service price summary */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-3 mb-12">
            {MODULES.map((mod) => {
              const meta = serviceIcons[mod.key];
              if (!meta) return null;
              const price = getModulePrice(mod, "entry", currency);
              const prefix = mod.tiers ? "fr" : "";
              return (
                <div
                  key={mod.key}
                  className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <span className="text-lg mb-1">{meta.icon}</span>
                  <span className="text-[10px] text-ghost/60 mb-0.5">{meta.short}</span>
                  <span className="text-xs font-mono font-bold text-teal">
                    {prefix}{formatPrice(price, currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a
              href="mailto:hello@solyntalent.com"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>{"\u{1F4E7}"}</span>
              <span className="text-sm">hello@solyntalent.com</span>
            </a>
            <a
              href="tel:+15043236957"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>{"\u{1F4DE}"}</span>
              <span className="text-sm">+1 (504) 323-6957</span>
            </a>
            <a
              href="https://www.solyntalent.com"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>{"\u{1F310}"}</span>
              <span className="text-sm">www.solyntalent.com</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <a
            href="/consultation"
            className="inline-block px-10 py-4 rounded-full bg-teal text-midnight font-bold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400 glow-teal"
          >
            Get Your Free AI Business Analysis &rarr;
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
