"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Currency } from "@/lib/pricing";

interface PackageService {
  name: string;
  usd: string;
  gbp: string;
  ngn: string;
}

interface Package {
  name: string;
  usd: string;
  gbp: string;
  ngn: string;
  desc: string;
  services: PackageService[];
  saves: string;
  featured: boolean;
}

const packages: Package[] = [
  {
    name: "Startup Essentials",
    usd: "$500",
    gbp: "\u00A3400",
    ngn: "\u20A650,000",
    desc: "Get the fundamentals right",
    services: [
      { name: "Finance Core", usd: "fr $250/mo", gbp: "fr \u00A3200/mo", ngn: "fr \u20A625,000/mo" },
      { name: "AI Customer Service", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A625,000/mo" },
    ],
    saves: "$17,000+/mo",
    featured: false,
  },
  {
    name: "Growth Operations",
    usd: "$1,000",
    gbp: "\u00A3800",
    ngn: "\u20A6120,000",
    desc: "Scaled ops for growing teams",
    services: [
      { name: "Finance Core", usd: "fr $250/mo", gbp: "fr \u00A3200/mo", ngn: "fr \u20A625,000/mo" },
      { name: "Sales, CRM & Web", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A645,000/mo" },
      { name: "AI Customer Service", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A625,000/mo" },
      { name: "HR & Admin Ops", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A625,000/mo" },
    ],
    saves: "$45,000+/mo",
    featured: true,
  },
  {
    name: "Full Enterprise",
    usd: "$3,000",
    gbp: "\u00A32,350",
    ngn: "\u20A6455,000",
    desc: "Your complete business OS",
    services: [
      { name: "Finance Core", usd: "fr $250/mo", gbp: "fr \u00A3200/mo", ngn: "fr \u20A625,000/mo" },
      { name: "Sales, CRM & Web", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A645,000/mo" },
      { name: "AI Customer Service", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A625,000/mo" },
      { name: "HR & Admin Ops", usd: "$250/mo", gbp: "\u00A3200/mo", ngn: "\u20A625,000/mo" },
      { name: "Marketing", usd: "fr $500/mo", gbp: "fr \u00A3400/mo", ngn: "fr \u20A625,000/mo" },
      { name: "Embedded Dev", usd: "fr $500/mo", gbp: "fr \u00A3400/mo", ngn: "fr \u20A6150,000/mo" },
      { name: "Data Science", usd: "fr $250/mo", gbp: "fr \u00A3200/mo", ngn: "fr \u20A685,000/mo" },
      { name: "Enterprise Intel.", usd: "fr $500/mo", gbp: "fr \u00A3400/mo", ngn: "fr \u20A625,000/mo" },
      { name: "Inventory", usd: "fr $250/mo", gbp: "fr \u00A3200/mo", ngn: "fr \u20A650,000/mo" },
    ],
    saves: "$100,000+/mo",
    featured: false,
  },
];

function getPrice(pkg: Package, currency: Currency): string {
  return currency === "GBP" ? pkg.gbp : currency === "NGN" ? pkg.ngn : pkg.usd;
}

function getServicePrice(svc: PackageService, currency: Currency): string {
  return currency === "GBP" ? svc.gbp : currency === "NGN" ? svc.ngn : svc.usd;
}


export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <section id="pricing" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-midnight to-navy" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Pricing
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              You choose. You control.
            </h2>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              No hidden fees. No setup charges. No long-term lock-in.
              Your monthly total is simply the sum of your active services.
            </p>
          </div>
        </ScrollReveal>

        {/* Currency toggle */}
        <ScrollReveal delay={50}>
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-ghost/60 mr-2">
              View pricing in
            </span>
            {(["USD", "GBP", "NGN"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currency === c
                    ? "bg-teal text-midnight"
                    : "bg-slate-dark/50 text-ghost border border-white/10 hover:border-teal/30"
                }`}
              >
                <span>{c === "USD" ? "\u{1F1FA}\u{1F1F8}" : c === "GBP" ? "\u{1F1EC}\u{1F1E7}" : "\u{1F1F3}\u{1F1EC}"}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Example packages */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`pricing-card rounded-2xl p-8 bg-slate-dark/50 h-full flex flex-col ${
                  pkg.featured ? "featured" : ""
                }`}
              >
                {pkg.featured && (
                  <div className="text-[10px] uppercase tracking-[0.25em] text-teal font-bold mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-ghost mb-4">{pkg.desc}</p>

                <div className="mb-6">
                  <span className="font-[var(--font-display)] text-4xl font-bold text-white-soft">
                    {getPrice(pkg, currency)}
                  </span>
                  <span className="text-ghost text-sm">/mo</span>
                </div>

                <ul className="space-y-2 flex-1">
                  {pkg.services.map((s, j) => (
                    <li key={j} className="flex items-center justify-between text-sm">
                      <span className="text-ghost/80">{s.name}</span>
                      <span className="text-white-soft font-mono text-xs">{getServicePrice(s, currency)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ghost/60">vs in-house</span>
                    <span className="text-sm font-bold text-gradient-gold">
                      SAVES {pkg.saves}
                    </span>
                  </div>
                </div>

                <a
                  href="https://calendly.com/uvieugono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block text-center py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    pkg.featured
                      ? "bg-teal text-midnight hover:shadow-lg hover:shadow-teal/20"
                      : "border border-white/10 text-white-soft hover:border-teal/40 hover:bg-white/5"
                  }`}
                >
                  Book a Strategy Call
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
