"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type Currency = "USD" | "GBP" | "NGN";

interface FAQItem {
  q: string;
  a: string;
  markets?: Currency[];
}

const faqs: FAQItem[] = [
  {
    q: "What exactly do I get?",
    a: "A fully custom web application \u2014 designed around your idea, built by Claude Code, deployed to production-grade cloud hosting, and maintained by Solynta. You own the software and keep 100% of the revenue it generates. The Starter tier includes up to 5 feature modules, user accounts, and 1 third-party integration. Growth and Scale tiers add more features, integrations, and capacity.",
  },
  {
    q: "How long does the build take?",
    a: "30 days from PRD sign-off. We scope your product in 48 hours, then Claude Code builds and tests your software over 3\u20134 weeks. You review progress weekly and can request adjustments throughout the build.",
  },
  {
    q: "Do I own the software?",
    a: "Yes. The software is yours. You own the intellectual property, the customer relationships, and 100% of the revenue. We host and maintain it for you, but the product is yours.",
  },
  {
    q: "What happens if I cancel my subscription?",
    a: "You can cancel at any time after your minimum commitment period (3 months for Starter and Growth). We\u2019ll help you export your data and transition hosting if needed. Your software doesn\u2019t disappear \u2014 we\u2019ll work with you on a handover plan.",
    markets: ["GBP", "USD"],
  },
  {
    q: "What does hosting and maintenance cover?",
    a: "Hosting and maintenance is charged separately from the one-time build cost. It covers cloud infrastructure, uptime monitoring, security patches, SSL certificates, and basic support. Pricing details will be confirmed during your scoping call.",
    markets: ["NGN"],
  },
  {
    q: "Can I upgrade from Starter to Growth?",
    a: "Absolutely. Most clients start on Starter to validate their idea, then upgrade to Growth once they have paying customers and want more features. We handle the migration seamlessly \u2014 no downtime, no rebuilds.",
  },
  {
    q: "What technology do you use to build?",
    a: "Claude Code \u2014 Anthropic\u2019s AI coding agent \u2014 builds your software under human oversight. The stack is modern and production-grade: typically Next.js, React, TypeScript, and PostgreSQL, deployed on scalable cloud infrastructure. Every build is tested, reviewed, and deployed with CI/CD pipelines.",
  },
];

export default function BuildFAQ({ currency }: { currency: Currency }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleFaqs = faqs.filter(
    (f) => !f.markets || f.markets.includes(currency)
  );

  return (
    <section id="faq" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            FAQ
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft text-center mb-12">
            Common questions
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <div className="rounded-xl bg-slate-dark/40 border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-sm font-medium text-white-soft pr-4">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-4 h-4 text-ghost/40 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 text-sm text-ghost/80 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
