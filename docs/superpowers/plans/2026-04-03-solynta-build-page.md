# Solynta Build Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/build` page showcasing Solynta Build — a software-as-a-subscription product (UK/US) with one-time build pricing for Nigeria.

**Architecture:** Single `/build` route with a server component page (metadata/SEO) wrapping a client component that manages currency state. Eight section components under `src/components/build/`. Currency toggle reads the `st-market` cookie to set default, with manual override. All CTAs link to Calendly.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 4, React 19

**Spec:** `docs/superpowers/specs/2026-04-03-solynta-build-page-design.md`

---

## File Structure

| File | Responsibility |
|---|---|
| `src/app/build/page.tsx` | Server component — exports SEO metadata, renders `BuildPageClient` |
| `src/components/build/BuildPageClient.tsx` | Client component — manages currency state, composes all sections |
| `src/components/build/BuildHero.tsx` | Hero section with headline, subtitle, dual CTAs |
| `src/components/build/BuildHowItWorks.tsx` | 4-step process flow |
| `src/components/build/BuildFeatures.tsx` | Feature comparison table (3 tiers) |
| `src/components/build/BuildPricing.tsx` | Pricing cards with currency toggle (GBP/USD/NGN) |
| `src/components/build/BuildIncomeScenarios.tsx` | ROI examples (UK/US only, hidden for NGN) |
| `src/components/build/BuildFAQ.tsx` | Accordion FAQ with Build-specific questions |
| `src/components/build/BuildCTA.tsx` | Bottom CTA section |
| `src/components/Navbar.tsx` | **Modify** — add "Solynta Build" link |

---

### Task 1: Add Navbar Link

**Files:**
- Modify: `src/components/Navbar.tsx:6-14` (the `links` array)

- [ ] **Step 1: Add the "Solynta Build" link to the Navbar**

In `src/components/Navbar.tsx`, add a new entry to the `links` array after the FAQ entry:

```typescript
const links = [
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/#services", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/calculator", label: "Build Your Stack" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/build", label: "Solynta Build" },
];
```

- [ ] **Step 2: Verify the dev server runs without errors**

Run: `npm run dev`
Expected: No build errors. Navigate to `http://localhost:3000` and confirm "Solynta Build" appears in the desktop and mobile nav menus.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Solynta Build link to navbar"
```

---

### Task 2: Page Route and SEO Metadata

**Files:**
- Create: `src/app/build/page.tsx`
- Create: `src/components/build/BuildPageClient.tsx`

- [ ] **Step 1: Create the server page component with metadata**

Create `src/app/build/page.tsx`:

```tsx
import type { Metadata } from "next";
import BuildPageClient from "@/components/build/BuildPageClient";

export const metadata: Metadata = {
  title: "Solynta Build — Own Your Own Software Business",
  description:
    "We build your custom software. You keep 100% of the revenue. Starting from £199/month.",
  openGraph: {
    title: "Solynta Build — Own Your Own Software Business",
    description:
      "We build your custom software. You keep 100% of the revenue. Starting from £199/month.",
    type: "website",
    url: "https://www.solyntalent.com/build",
    images: [
      {
        url: "/logo.png",
        width: 1344,
        height: 804,
        alt: "Solynta Build — Own Your Own Software Business",
      },
    ],
  },
};

export default function BuildPage() {
  return <BuildPageClient />;
}
```

- [ ] **Step 2: Create the client wrapper with currency state**

Create `src/components/build/BuildPageClient.tsx`:

```tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuildHero from "./BuildHero";
import BuildHowItWorks from "./BuildHowItWorks";
import BuildFeatures from "./BuildFeatures";
import BuildPricing from "./BuildPricing";
import BuildIncomeScenarios from "./BuildIncomeScenarios";
import BuildFAQ from "./BuildFAQ";
import BuildCTA from "./BuildCTA";

type Currency = "USD" | "GBP" | "NGN";

function getDefaultCurrency(): Currency {
  if (typeof document === "undefined") return "USD";
  const match = document.cookie.match(/(?:^|;\s*)st-market=([^;]*)/);
  const market = match?.[1];
  if (market === "uk") return "GBP";
  if (market === "ng") return "NGN";
  return "USD";
}

export default function BuildPageClient() {
  const [currency, setCurrency] = useState<Currency>(getDefaultCurrency);

  return (
    <main>
      <Navbar />
      <BuildHero />
      <BuildHowItWorks />
      <BuildFeatures />
      <BuildPricing currency={currency} setCurrency={setCurrency} />
      <BuildIncomeScenarios currency={currency} />
      <BuildFAQ currency={currency} />
      <BuildCTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Create placeholder stubs for all section components**

Create each file with a minimal placeholder so the page renders:

`src/components/build/BuildHero.tsx`:
```tsx
"use client";
export default function BuildHero() {
  return <section id="hero" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildHero placeholder</p></div></section>;
}
```

`src/components/build/BuildHowItWorks.tsx`:
```tsx
"use client";
export default function BuildHowItWorks() {
  return <section id="how-it-works" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildHowItWorks placeholder</p></div></section>;
}
```

`src/components/build/BuildFeatures.tsx`:
```tsx
"use client";
export default function BuildFeatures() {
  return <section id="features" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildFeatures placeholder</p></div></section>;
}
```

`src/components/build/BuildPricing.tsx`:
```tsx
"use client";
type Currency = "USD" | "GBP" | "NGN";
interface Props { currency: Currency; setCurrency: (c: Currency) => void; }
export default function BuildPricing({ currency, setCurrency }: Props) {
  return <section id="pricing" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildPricing placeholder — {currency}</p></div></section>;
}
```

`src/components/build/BuildIncomeScenarios.tsx`:
```tsx
"use client";
type Currency = "USD" | "GBP" | "NGN";
export default function BuildIncomeScenarios({ currency }: { currency: Currency }) {
  return <section id="income" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildIncomeScenarios placeholder</p></div></section>;
}
```

`src/components/build/BuildFAQ.tsx`:
```tsx
"use client";
type Currency = "USD" | "GBP" | "NGN";
export default function BuildFAQ({ currency }: { currency: Currency }) {
  return <section id="faq" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildFAQ placeholder</p></div></section>;
}
```

`src/components/build/BuildCTA.tsx`:
```tsx
"use client";
export default function BuildCTA() {
  return <section className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildCTA placeholder</p></div></section>;
}
```

- [ ] **Step 4: Verify `/build` renders with all placeholders**

Run: `npm run dev`
Navigate to `http://localhost:3000/build`
Expected: Page shows Navbar, 7 placeholder sections, and Footer. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/build/page.tsx src/components/build/
git commit -m "feat: scaffold Build page route with placeholder sections"
```

---

### Task 3: BuildHero Component

**Files:**
- Modify: `src/components/build/BuildHero.tsx`

- [ ] **Step 1: Implement the hero section**

Replace the placeholder in `src/components/build/BuildHero.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify hero renders correctly**

Run: `npm run dev`
Navigate to `http://localhost:3000/build`
Expected: Full-screen hero with gradient background, headline with gradient text, subtitle, and two CTA buttons. "Book a Call" opens Calendly in new tab. "See Pricing" scrolls down (pricing section not yet built).

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildHero.tsx
git commit -m "feat: implement BuildHero section"
```

---

### Task 4: BuildHowItWorks Component

**Files:**
- Modify: `src/components/build/BuildHowItWorks.tsx`

- [ ] **Step 1: Implement the 4-step process flow**

Replace the placeholder in `src/components/build/BuildHowItWorks.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the component renders**

Navigate to `http://localhost:3000/build`
Expected: 4-step flow cards in a grid. Each card has a number, title, description, timing badge, and colored left border. Staggered scroll reveal animations.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildHowItWorks.tsx
git commit -m "feat: implement BuildHowItWorks section"
```

---

### Task 5: BuildFeatures Component

**Files:**
- Modify: `src/components/build/BuildFeatures.tsx`

- [ ] **Step 1: Implement the feature comparison table**

Replace the placeholder in `src/components/build/BuildFeatures.tsx`:

```tsx
"use client";

import ScrollReveal from "@/components/ScrollReveal";

const features = [
  { name: "Custom web application", starter: true, growth: true, scale: true },
  { name: "Feature modules", starter: "Up to 5", growth: "Up to 15", scale: "Unlimited" },
  { name: "User accounts & login", starter: true, growth: true, scale: true },
  { name: "Cloud hosting included", starter: true, growth: true, scale: true },
  { name: "Third-party integrations", starter: "1", growth: "Up to 5", scale: "Unlimited" },
  { name: "Payment processing", starter: false, growth: true, scale: true },
  { name: "Advanced user roles", starter: false, growth: true, scale: true },
  { name: "Mobile-optimised PWA", starter: false, growth: true, scale: true },
  { name: "Native iOS & Android apps", starter: false, growth: false, scale: true },
  { name: "Analytics dashboard", starter: false, growth: true, scale: true },
  { name: "Feature sprints per month", starter: "1", growth: "2", scale: "Continuous" },
  { name: "SolyntaFlow back-office", starter: "Basic", growth: "Standard", scale: "Full enterprise" },
  { name: "Uptime SLA", starter: "99%", growth: "99.5%", scale: "99.99%" },
  { name: "Regulated industry support", starter: false, growth: false, scale: true },
  { name: "White-label / multi-tenant", starter: false, growth: false, scale: true },
  { name: "Multiple software products", starter: false, growth: false, scale: "Unlimited" },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal" />
    );
  if (value === false)
    return (
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-white/10" />
    );
  return <span className="text-ghost text-sm">{value}</span>;
}

export default function BuildFeatures() {
  return (
    <section id="features" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            What You Get
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-4">
            Three tiers. One mission.
          </h2>
          <p className="text-lg text-ghost text-center max-w-2xl mx-auto mb-16">
            Every tier includes a full custom web application built by Claude
            Code, delivered within 30&nbsp;days, and hosted on our
            infrastructure.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5 w-[40%] sticky left-0 z-10 bg-navy">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-teal font-medium border-b border-teal/20">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={f.name}
                    className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                  >
                    <td className="py-3.5 px-4 text-sm text-white-soft font-medium border-b border-white/5 sticky left-0 z-10 bg-navy">
                      {f.name}
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-white/5">
                      <CellValue value={f.starter} />
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-teal/10 bg-teal/[0.03]">
                      <CellValue value={f.growth} />
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-white/5">
                      <CellValue value={f.scale} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the table renders and scrolls on mobile**

Navigate to `http://localhost:3000/build`
Expected: Feature comparison table with 3 tier columns. Growth column subtly highlighted with teal. Table scrolls horizontally on narrow screens. Green dots for true, dim dots for false, text for string values.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildFeatures.tsx
git commit -m "feat: implement BuildFeatures comparison table"
```

---

### Task 6: BuildPricing Component

**Files:**
- Modify: `src/components/build/BuildPricing.tsx`

- [ ] **Step 1: Implement the pricing section with currency toggle**

Replace the placeholder in `src/components/build/BuildPricing.tsx`:

```tsx
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
      price: "£199",
      period: "per month \u00B7 3-month minimum",
      roi: "Earn £400/month from your software and you\u2019re already 2\u00D7 up.",
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
      price: "£399",
      period: "per month \u00B7 month-to-month after 3 months",
      roi: "Earn £1,000/month and you\u2019re 2.5\u00D7 up. Growth clients typically earn much more.",
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
      price: "From £2,000",
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
                        {"roi" in priceData
                          ? (priceData as { roi: string }).roi
                          : ""}
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
```

- [ ] **Step 2: Verify pricing renders with currency toggle**

Navigate to `http://localhost:3000/build`
Expected: Three pricing cards in a grid. Currency toggle with three buttons. Clicking GBP/USD shows monthly subscription prices. Clicking NGN shows one-time build costs with "Hosting & maintenance charged separately" note in gold. Growth card highlighted as featured. All "Start building" buttons open Calendly.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildPricing.tsx
git commit -m "feat: implement BuildPricing with multi-currency toggle"
```

---

### Task 7: BuildIncomeScenarios Component

**Files:**
- Modify: `src/components/build/BuildIncomeScenarios.tsx`

- [ ] **Step 1: Implement the income scenarios section**

Replace the placeholder in `src/components/build/BuildIncomeScenarios.tsx`:

```tsx
"use client";

import ScrollReveal from "@/components/ScrollReveal";

type Currency = "USD" | "GBP" | "NGN";

interface Scenario {
  label: string;
  users: string;
  userPrice: string;
  revenue: string;
  subscription: string;
  net: string;
}

const scenarios: Record<"GBP" | "USD", { conservative: Scenario; realistic: Scenario }> = {
  GBP: {
    conservative: {
      label: "Conservative",
      users: "80 users",
      userPrice: "\u00A35/mo each",
      revenue: "\u00A3400/mo",
      subscription: "\u00A3199/mo",
      net: "\u00A3201/mo",
    },
    realistic: {
      label: "Realistic",
      users: "300 users",
      userPrice: "\u00A310/mo each",
      revenue: "\u00A33,000/mo",
      subscription: "\u00A3399/mo",
      net: "\u00A32,601/mo",
    },
  },
  USD: {
    conservative: {
      label: "Conservative",
      users: "80 users",
      userPrice: "$7/mo each",
      revenue: "$560/mo",
      subscription: "$299/mo",
      net: "$261/mo",
    },
    realistic: {
      label: "Realistic",
      users: "300 users",
      userPrice: "$12/mo each",
      revenue: "$3,600/mo",
      subscription: "$599/mo",
      net: "$3,001/mo",
    },
  },
};

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <div className="bg-slate-dark/40 rounded-2xl p-6 border border-white/5">
      <p className="text-xs uppercase tracking-[0.15em] text-ghost/40 font-medium mb-4">
        {scenario.label} scenario \u2014 {scenario.users} paying{" "}
        {scenario.userPrice}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your software revenue</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-lavender">
            {scenario.revenue}
          </p>
        </div>
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your Solynta Build fee</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-white-soft">
            {scenario.subscription}
          </p>
        </div>
        <div>
          <p className="text-xs text-ghost/50 mb-1">Your net income</p>
          <p className="font-[var(--font-display)] text-xl font-bold text-teal">
            {scenario.net}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BuildIncomeScenarios({
  currency,
}: {
  currency: Currency;
}) {
  if (currency === "NGN") {
    return (
      <section id="income" className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4">
                Your Income
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-6">
                You keep 100% of your software revenue
              </h2>
              <p className="text-lg text-ghost leading-relaxed mb-6">
                No ongoing subscription. Build once, earn forever. Your software
                is yours \u2014 every naira your customers pay goes directly to
                you. SolyntaFlow automates your operations so your time
                investment is hours per week, not days.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const data = scenarios[currency === "GBP" ? "GBP" : "USD"];

  return (
    <section id="income" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            The Income Case
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-4">
            What your software could earn you
          </h2>
          <p className="text-lg text-ghost text-center max-w-2xl mx-auto mb-12">
            SolyntaFlow automates your software&apos;s operations. Once
            running, your time investment is hours per week, not days.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <ScenarioCard scenario={data.conservative} />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ScenarioCard scenario={data.realistic} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify income scenarios render and respond to currency**

Navigate to `http://localhost:3000/build`
Expected: GBP/USD selected — shows two scenario cards side by side with revenue/fee/net columns. NGN selected — shows simplified "You keep 100%" message instead.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildIncomeScenarios.tsx
git commit -m "feat: implement BuildIncomeScenarios with currency awareness"
```

---

### Task 8: BuildFAQ Component

**Files:**
- Modify: `src/components/build/BuildFAQ.tsx`

- [ ] **Step 1: Implement the FAQ accordion**

Replace the placeholder in `src/components/build/BuildFAQ.tsx`:

```tsx
"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type Currency = "USD" | "GBP" | "NGN";

interface FAQItem {
  q: string;
  a: string;
  markets?: Currency[]; // if set, only show for these currencies
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
```

- [ ] **Step 2: Verify FAQ renders with currency-aware filtering**

Navigate to `http://localhost:3000/build`
Expected: Accordion FAQ items. "What happens if I cancel?" shows for GBP/USD only. "What does hosting and maintenance cover?" shows for NGN only. Clicking a question expands/collapses it with smooth animation.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildFAQ.tsx
git commit -m "feat: implement BuildFAQ with currency-aware filtering"
```

---

### Task 9: BuildCTA Component

**Files:**
- Modify: `src/components/build/BuildCTA.tsx`

- [ ] **Step 1: Implement the bottom CTA section**

Replace the placeholder in `src/components/build/BuildCTA.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the CTA section renders**

Navigate to `http://localhost:3000/build`
Expected: Centered CTA section with gradient text, subtitle, and "Book a Call" button linking to Calendly.

- [ ] **Step 3: Commit**

```bash
git add src/components/build/BuildCTA.tsx
git commit -m "feat: implement BuildCTA section"
```

---

### Task 10: Final Verification and Build Check

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: Build succeeds with no errors. The `/build` route is generated.

- [ ] **Step 2: Full page walkthrough**

Run: `npm run dev`
Navigate to `http://localhost:3000/build` and verify:
1. Navbar shows "Solynta Build" link and it navigates to `/build`
2. Hero section renders with gradient text and both CTAs
3. How It Works shows 4 step cards
4. Feature comparison table renders with 3 columns, scrolls on mobile
5. Pricing shows 3 tier cards, currency toggle works (GBP/USD/NGN)
6. NGN pricing shows one-time costs and "Hosting & maintenance" note
7. Income scenarios switch with currency, hidden for NGN
8. FAQ accordion opens/closes, market-specific questions filter correctly
9. Bottom CTA links to Calendly
10. Footer renders
11. Page title in browser tab reads "Solynta Build — Own Your Own Software Business"

- [ ] **Step 3: Fix any issues found during walkthrough**

Address any visual, functional, or build issues discovered.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address Build page visual/functional issues from walkthrough"
```
