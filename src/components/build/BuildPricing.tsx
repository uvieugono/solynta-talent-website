"use client";

import ScrollReveal from "@/components/ScrollReveal";

type Currency = "USD" | "GBP" | "NGN";

interface Props {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CALENDLY = "https://calendly.com/uvieugono";

interface TierData {
  badge: string;
  badgeStyle: string;
  name: string;
  tagline: string;
  featured: boolean;
  gbp: { price: string; period: string; roi: string };
  usd: { price: string; period: string; roi: string };
  ngn: { price: string; period: string; note: string };
  includes: { text: string; key: boolean }[];
  cta: string;
}

const tiers: TierData[] = [
  {
    badge: "Launch",
    badgeStyle: "bg-white/5 text-ghost/60",
    name: "Starter",
    tagline:
      "Your first software product. Built, hosted, and live within 30 days.",
    featured: false,
    gbp: {
      price: "\u00A3199",
      period: "per month \u00B7 3-month minimum",
      roi: "Earn \u00A3400/month from your software and you\u2019re already 2\u00D7 up.",
    },
    usd: {
      price: "$299",
      period: "per month \u00B7 3-month minimum",
      roi: "Earn $600/month from your software and you\u2019re already 2\u00D7 up.",
    },
    ngn: {
      price: "\u20A6250,000",
      period: "one-time build cost",
      note: "Hosting & maintenance charged separately",
    },
    includes: [
      { text: "Full custom web app \u2014 built by Claude Code", key: true },
      { text: "Up to 5 core feature modules", key: true },
      { text: "User accounts and login", key: true },
      { text: "Cloud hosting \u2014 always on", key: true },
      { text: "1 third-party integration", key: true },
      { text: "Automated uptime monitoring", key: false },
      { text: "Security patches and updates", key: false },
      { text: "1 feature sprint per month", key: false },
      { text: "Delivered within 30 days of PRD sign-off", key: false },
      { text: "Basic SolyntaFlow automation", key: false },
    ],
    cta: "Start building \u2192",
  },
  {
    badge: "Most popular",
    badgeStyle: "bg-teal/10 text-teal",
    name: "Growth",
    tagline:
      "More features, more users, more income. For products gaining real traction.",
    featured: true,
    gbp: {
      price: "\u00A3399",
      period: "per month \u00B7 month-to-month after 3 months",
      roi: "Earn \u00A31,000/month and you\u2019re 2.5\u00D7 up. Growth clients typically earn much more.",
    },
    usd: {
      price: "$599",
      period: "per month \u00B7 month-to-month after 3 months",
      roi: "Earn $1,500/month and you\u2019re 2.5\u00D7 up. Growth clients typically earn much more.",
    },
    ngn: {
      price: "\u20A6500,000",
      period: "one-time build cost",
      note: "Hosting & maintenance charged separately",
    },
    includes: [
      { text: "Everything in Starter, plus:", key: false },
      { text: "Up to 15 feature modules", key: true },
      { text: "Payment processing (Stripe / Paystack)", key: true },
      { text: "Up to 5 third-party integrations", key: true },
      { text: "Advanced user roles and permissions", key: true },
      { text: "Analytics dashboard for your product", key: true },
      { text: "Mobile-optimised progressive web app", key: true },
      { text: "2 feature sprints per month", key: true },
      { text: "Priority support \u2014 24hr response", key: false },
      { text: "99.5% uptime SLA", key: false },
    ],
    cta: "Start building \u2192",
  },
  {
    badge: "Enterprise",
    badgeStyle: "bg-midnight text-white-soft",
    name: "Scale",
    tagline:
      "Any software. Any complexity. Banking systems, enterprise platforms, government infrastructure.",
    featured: false,
    gbp: {
      price: "From \u00A32,000",
      period: "per month \u00B7 scoped individually \u00B7 12-month minimum",
      roi: "There is no ceiling. Price reflects scope, complexity, and scale.",
    },
    usd: {
      price: "From $3,000",
      period: "per month \u00B7 scoped individually \u00B7 12-month minimum",
      roi: "There is no ceiling. Price reflects scope, complexity, and scale.",
    },
    ngn: {
      price: "From \u20A62,000,000",
      period: "one-time \u00B7 scoped individually",
      note: "Hosting & maintenance charged separately",
    },
    includes: [
      { text: "Everything in Growth, plus:", key: false },
      { text: "Unlimited modules \u2014 no scope ceiling", key: true },
      { text: "Unlimited software products", key: true },
      { text: "Native iOS and Android apps", key: true },
      { text: "Unlimited integrations and APIs", key: true },
      {
        text: "Regulated industry support (banking, health, government)",
        key: true,
      },
      { text: "Compliance frameworks (PCI-DSS, FCA, CBN, HIPAA)", key: true },
      { text: "99.99% uptime SLA", key: true },
      { text: "White-label and multi-tenant architecture", key: true },
      { text: "Dedicated build overseer", key: true },
    ],
    cta: "Get a scoping quote \u2192",
  },
];

const currencies: { key: Currency; flag: string; label: string }[] = [
  { key: "GBP", flag: "\uD83C\uDDEC\uD83C\uDDE7", label: "GBP \u00A3" },
  { key: "USD", flag: "\uD83C\uDDFA\uD83C\uDDF8", label: "USD $" },
  { key: "NGN", flag: "\uD83C\uDDF3\uD83C\uDDEC", label: "NGN \u20A6" },
];

export default function BuildPricing({ currency, setCurrency }: Props) {
  const isNgn = currency === "NGN";

  return (
    <section id="pricing" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            Pricing
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-4">
            {isNgn
              ? "Build once. Own forever."
              : "Software ownership, simplified"}
          </h2>
          <p className="text-lg text-ghost text-center max-w-2xl mx-auto mb-10">
            {isNgn
              ? "One-time build cost. You own the software. Hosting and maintenance charged separately."
              : "A monthly subscription that covers your entire software business \u2014 build, hosting, maintenance, and ongoing development."}
          </p>
        </ScrollReveal>

        {/* Currency toggle */}
        <ScrollReveal delay={100}>
          <div className="flex justify-center gap-2 mb-12">
            {currencies.map((c) => (
              <button
                key={c.key}
                onClick={() => setCurrency(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currency === c.key
                    ? "bg-teal text-midnight"
                    : "bg-slate-dark/50 border border-white/10 text-ghost hover:border-white/20"
                }`}
              >
                {c.flag} {c.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const priceData = isNgn
              ? tier.ngn
              : currency === "GBP"
                ? tier.gbp
                : tier.usd;

            return (
              <ScrollReveal key={tier.name} delay={i * 100}>
                <div
                  className={`pricing-card rounded-2xl p-8 h-full flex flex-col ${
                    tier.featured
                      ? "featured bg-slate-dark/60"
                      : "bg-slate-dark/40"
                  }`}
                >
                  {/* Badge */}
                  <span
                    className={`inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full w-fit mb-6 ${tier.badgeStyle}`}
                  >
                    {tier.badge}
                  </span>

                  {/* Name & tagline */}
                  <h3 className="font-[var(--font-display)] text-2xl font-bold text-white-soft mb-2">
                    {tier.name}
                    {isNgn && tier.name === "Starter" && (
                      <span className="text-ghost text-base font-normal ml-2">
                        (Essentials)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-ghost/80 leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <p className="font-[var(--font-display)] text-4xl font-bold text-white-soft">
                      {priceData.price}
                    </p>
                    <p className="text-sm text-ghost/60 mt-1">
                      {priceData.period}
                    </p>
                    {isNgn ? (
                      <p className="text-xs text-gold mt-2">
                        {tier.ngn.note}
                      </p>
                    ) : (
                      <p className="text-xs text-ghost/50 mt-2 italic">
                        {(priceData as { roi: string }).roi}
                      </p>
                    )}
                  </div>

                  {/* Includes */}
                  <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-4">
                    What&apos;s included
                  </p>
                  <ul className="flex-1 space-y-0">
                    {tier.includes.map((item) => (
                      <li
                        key={item.text}
                        className={`text-sm py-1.5 pl-4 relative border-b border-white/[0.03] ${
                          item.key ? "text-ghost/80" : "text-ghost/50"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-[11px] w-1.5 h-1.5 rounded-sm ${
                            item.key ? "bg-teal" : "bg-white/10"
                          }`}
                        />
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full mt-6 py-3.5 rounded-xl font-[var(--font-display)] text-sm font-bold text-center transition-opacity hover:opacity-85 ${
                      tier.featured
                        ? "bg-white text-midnight"
                        : "bg-teal text-midnight"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
