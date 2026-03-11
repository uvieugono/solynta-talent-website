# Stack Calculator & NGN Pricing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive Business Operations Stack Calculator with USD/NGN pricing to the Solynta Talent website, and add currency support to the Free AI Analysis consultation wizard.

**Architecture:** A shared `pricing.ts` data file powers both a new `StackCalculator` component (used inline on the homepage and on a dedicated `/calculator` page) and an updated `ConsultationWizard` with currency toggle. The Django backend gains a `pricing_currency` field on the `Consultation` model and uses it to render the Gemini prompt in the correct currency.

**Tech Stack:** Next.js 14 (TypeScript, Tailwind CSS), Django 4 / DRF, Gemini 2.5 Flash via litellm

**Spec:** `docs/superpowers/specs/2026-03-11-stack-calculator-ngn-pricing-design.md`

---

## Chunk 1: Frontend — Data Layer, Calculator, Pages

---

### Task 1: Create `src/lib/pricing.ts`

**Files:**
- Create: `src/lib/pricing.ts`

This is the single source of truth for all module pricing. Both the calculator and the consultation wizard import from here.

- [ ] **Step 1.1: Create the file**

```ts
// src/lib/pricing.ts
export type Currency = 'USD' | 'NGN'
export type Tier = 'entry' | 'growth' | 'enterprise'
export type ModuleKey =
  | 'finance'
  | 'sales_crm_web'
  | 'customer_service'
  | 'hr_admin'
  | 'marketing'
  | 'developers'
  | 'data_science'
  | 'enterprise_intel'
  | 'inventory'

export interface ModuleDefinition {
  key: ModuleKey
  icon: string
  name: string
  desc: string
  tiers: boolean
  /** 2-4 bullet points shown on the full-page /calculator card */
  features: string[]
  usd: Partial<Record<Tier, number>>
  ngn: Partial<Record<Tier, number>>
}

export const MODULES: ModuleDefinition[] = [
  {
    key: 'finance',
    icon: '💰',
    name: 'Finance Core',
    desc: 'Bookkeeper · Accountant · Payroll · Tax',
    tiers: false,
    features: ['Daily bookkeeping & reconciliation', 'P&L, balance sheet & cash flow', 'Full payroll computation & payslips', 'Tax filing & compliance'],
    usd: { entry: 500 },
    ngn: { entry: 100000 },
  },
  {
    key: 'sales_crm_web',
    icon: '📈',
    name: 'Sales, CRM & Web',
    desc: 'Growth Engine · CRM · Digital · Sales Ops',
    tiers: false,
    features: ['Website SEO & content updates', 'CRM pipeline management', 'Lead tracking & outreach', 'Monthly performance reports'],
    usd: { entry: 250 },
    ngn: { entry: 45000 },
  },
  {
    key: 'customer_service',
    icon: '💬',
    name: 'AI Customer Service',
    desc: '24/7 Responder · Email Triage · Website Chatbot',
    tiers: false,
    features: ['24/7 AI chat on your website', 'Email triage & auto-responses', 'Escalation to human agents', 'Monthly interaction reports'],
    usd: { entry: 250 },
    ngn: { entry: 25000 },
  },
  {
    key: 'hr_admin',
    icon: '👥',
    name: 'HR & Admin Ops',
    desc: 'HR Admin · Procurement · IT Admin',
    tiers: false,
    features: ['Onboarding & offboarding workflows', 'Leave tracking & HR records', 'Vendor & procurement management', 'IT asset & access management'],
    usd: { entry: 250 },
    ngn: { entry: 25000 },
  },
  {
    key: 'marketing',
    icon: '📣',
    name: 'Marketing Dept.',
    desc: 'Social · PPC · Content · Video · SEO',
    tiers: true,
    features: ['Social media management (3+ platforms)', 'Google & Meta ad campaigns', 'Monthly content calendar', 'Analytics & reporting'],
    usd: { entry: 500, growth: 800, enterprise: 1200 },
    ngn: { entry: 25000, growth: 50000, enterprise: 100000 },
  },
  {
    key: 'developers',
    icon: '💻',
    name: 'Embedded Developers',
    desc: 'Full Stack · QA · DevOps · Tech Lead · UI/UX',
    tiers: true,
    features: ['Dedicated developers inside your team', 'Works in your tools & codebase', 'Attends your standups & sprints', 'Senior code review & oversight'],
    usd: { entry: 500, growth: 1000, enterprise: 1800 },
    ngn: { entry: 150000, growth: 250000, enterprise: 500000 },
  },
  {
    key: 'data_science',
    icon: '📊',
    name: 'Data Science',
    desc: 'Data Scientist · Engineer · ML · BI Dev · Analyst',
    tiers: true,
    features: ['KPI dashboards built & maintained', 'Data cleaning & quality assurance', 'Predictive ML models', 'Monthly insight reports'],
    usd: { entry: 250, growth: 600, enterprise: 1200 },
    ngn: { entry: 85000, growth: 125000, enterprise: 250000 },
  },
  {
    key: 'enterprise_intel',
    icon: '🧠',
    name: 'Enterprise Intel.',
    desc: 'Insight Engine · Strategy · Audit · Knowledge Arch.',
    tiers: true,
    features: ['Competitor benchmarking reports', 'Board-ready strategic analysis', 'AI governance & audit trails', 'Knowledge base management'],
    usd: { entry: 500, growth: 1000, enterprise: 2000 },
    ngn: { entry: 50000, growth: 75000, enterprise: 100000 },
  },
  {
    key: 'inventory',
    icon: '📦',
    name: 'Inventory Mgmt.',
    desc: 'Controller · Procurement · Forecaster · Warehouse',
    tiers: true,
    features: ['Real-time stock tracking', 'AI demand forecasting', 'Purchase order automation', 'Shopify / WooCommerce integration'],
    usd: { entry: 250, growth: 600, enterprise: 1200 },
    ngn: { entry: 50000, growth: 100000, enterprise: 200000 },
  },
]

/**
 * Format a price amount in the given currency.
 * Uses en-US locale for consistent cross-browser comma separators
 * (en-NG has inconsistent support in older Android WebView).
 */
export function formatPrice(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)
  return currency === 'NGN' ? `₦${formatted}` : `$${formatted}`
}

/** Return the price for a given module + tier + currency, defaulting to entry. */
export function getModulePrice(mod: ModuleDefinition, tier: Tier, currency: Currency): number {
  const prices = currency === 'NGN' ? mod.ngn : mod.usd
  return prices[tier] ?? prices.entry ?? 0
}
```

- [ ] **Step 1.2: Verify TypeScript compiles**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 1.3: Commit**

```bash
git add src/lib/pricing.ts
git commit -m "feat: add pricing.ts — shared module pricing data for USD and NGN"
```

---

### Task 2: Create `src/components/StackCalculator.tsx`

**Files:**
- Create: `src/components/StackCalculator.tsx`

The interactive calculator component. Used in two places:
- `Pricing.tsx` with `fullPage={false}` (compact cards, no CTA)
- `/calculator/page.tsx` with `fullPage={true}` (taller cards with feature bullets, CTA shown)

- [ ] **Step 2.1: Create the component**

```tsx
// src/components/StackCalculator.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MODULES,
  ModuleKey,
  ModuleDefinition,
  Tier,
  Currency,
  formatPrice,
  getModulePrice,
} from "@/lib/pricing";

type Selected = Record<ModuleKey, Tier | false>;

const TIERS: { key: Tier; label: string }[] = [
  { key: "entry", label: "Entry" },
  { key: "growth", label: "Growth" },
  { key: "enterprise", label: "Enterprise" },
];

function initialSelected(): Selected {
  return Object.fromEntries(MODULES.map((m) => [m.key, false])) as Selected;
}

export default function StackCalculator({ fullPage = false }: { fullPage?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selected, setSelected] = useState<Selected>(initialSelected);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleCardClick(mod: ModuleDefinition) {
    const key = mod.key;
    if (mod.tiers) {
      // Tiered: first click adds at entry. Use × button to remove.
      if (selected[key] === false) {
        setSelected((s) => ({ ...s, [key]: "entry" }));
      }
    } else {
      // Single-tier: toggle add/remove
      setSelected((s) => ({ ...s, [key]: s[key] === false ? "entry" : false }));
    }
  }

  function handleTierChange(key: ModuleKey, tier: Tier) {
    setSelected((s) => ({ ...s, [key]: tier }));
  }

  function handleRemove(key: ModuleKey) {
    setSelected((s) => ({ ...s, [key]: false }));
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const selectedModules = MODULES.filter((m) => selected[m.key] !== false);
  const total = selectedModules.reduce((sum, m) => {
    const tier = selected[m.key] as Tier;
    return sum + getModulePrice(m, tier, currency);
  }, 0);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Currency toggle */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-ghost/60 mr-2">
          View pricing in
        </span>
        {(["USD", "NGN"] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currency === c
                ? "bg-teal text-midnight"
                : "bg-slate-dark/50 text-ghost border border-white/10 hover:border-teal/30"
            }`}
          >
            <span>{c === "USD" ? "🇺🇸" : "🇳🇬"}</span>
            <span>{c}</span>
          </button>
        ))}
      </div>

      {/* Module card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {MODULES.map((mod) => {
          const isSelected = selected[mod.key] !== false;
          const currentTier = (selected[mod.key] as Tier | false) || "entry";

          return (
            <div
              key={mod.key}
              onClick={() => handleCardClick(mod)}
              className={`relative rounded-xl border transition-all duration-200 cursor-pointer ${
                fullPage ? "p-6" : "p-5"
              } ${
                isSelected
                  ? "border-teal/50 bg-teal/5"
                  : "border-white/10 bg-slate-dark/40 hover:border-white/20 hover:bg-slate-dark/60"
              }`}
            >
              {/* Remove button — only for tiered modules when selected */}
              {isSelected && mod.tiers && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(mod.key);
                  }}
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-ghost/60 hover:bg-white/20 hover:text-white-soft text-xs transition-all"
                  aria-label="Remove module"
                >
                  ×
                </button>
              )}

              {/* Selected indicator — single-tier modules */}
              {isSelected && !mod.tiers && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-teal flex items-center justify-center">
                  <svg className="w-3 h-3 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white-soft text-sm leading-tight">
                    {mod.name}
                  </h4>
                  <p className="text-ghost/60 text-xs mt-0.5 leading-tight">{mod.desc}</p>
                </div>
              </div>

              {/* Full-page feature bullets */}
              {fullPage && (
                <ul className="space-y-1 mb-3">
                  {mod.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ghost/70">
                      <span className="text-teal/70 mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              <div className={`font-mono font-bold ${isSelected ? "text-teal" : "text-ghost/50"} ${fullPage ? "text-base" : "text-sm"}`}>
                {mod.tiers
                  ? `from ${formatPrice(getModulePrice(mod, "entry", currency), currency)}/mo`
                  : `${formatPrice(getModulePrice(mod, "entry", currency), currency)}/mo`}
              </div>

              {/* Tier selector — tiered modules when selected */}
              {isSelected && mod.tiers && (
                <div
                  className="flex gap-1.5 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {TIERS.filter((t) => mod.usd[t.key] !== undefined).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => handleTierChange(mod.key, t.key)}
                      className={`flex-1 py-1 rounded text-xs font-medium transition-all duration-150 ${
                        currentTier === t.key
                          ? "bg-teal text-midnight"
                          : "bg-white/5 text-ghost/60 hover:bg-white/10 hover:text-white-soft"
                      }`}
                    >
                      <span className="block">{t.label}</span>
                      <span className="block text-[10px] opacity-80 font-mono">
                        {formatPrice(getModulePrice(mod, t.key, currency), currency)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live total bar */}
      <div className="rounded-xl border border-white/10 bg-slate-dark/50 p-4">
        {selectedModules.length === 0 ? (
          <p className="text-center text-ghost/50 text-sm py-2">
            Click any module above to build your stack
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Selected tags */}
            <div className="flex flex-wrap gap-2">
              {selectedModules.map((m) => {
                const tier = selected[m.key] as Tier;
                return (
                  <div
                    key={m.key}
                    className="flex items-center gap-1.5 bg-teal/10 border border-teal/20 rounded-full px-3 py-1 text-xs"
                  >
                    <span>{m.icon}</span>
                    <span className="text-white-soft">{m.name}</span>
                    {m.tiers && (
                      <span className="text-teal/70 capitalize">{tier}</span>
                    )}
                    <span className="text-teal font-mono font-semibold">
                      {formatPrice(getModulePrice(m, tier, currency), currency)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-ghost/60 text-sm">
                {selectedModules.length} service{selectedModules.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-ghost/50 block">Monthly total</span>
                  <span className="font-mono font-bold text-teal text-lg">
                    {formatPrice(total, currency)}<span className="text-ghost/50 text-sm">/mo</span>
                  </span>
                </div>
                {fullPage && (
                  <Link
                    href="/consultation"
                    className="bg-teal text-midnight font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-teal/20 transition-all duration-200 whitespace-nowrap"
                  >
                    Get Started →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2.2: Verify TypeScript compiles**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 2.3: Run dev server and do a quick visual check**

```bash
npm run dev
```

Open http://localhost:3000 in a browser. The page should load without JS errors (the component isn't wired up yet — that's the next task).

- [ ] **Step 2.4: Commit**

```bash
git add src/components/StackCalculator.tsx
git commit -m "feat: add StackCalculator component with USD/NGN currency toggle"
```

---

### Task 3: Update `src/components/Pricing.tsx`

**Files:**
- Modify: `src/components/Pricing.tsx`

Replace the static pricing table ("Build Your Own Package") with `<StackCalculator />`. The three preset package cards above stay exactly as they are.

- [ ] **Step 3.1: Replace static table with StackCalculator**

Open `src/components/Pricing.tsx`. The file has two sections:
1. Lines 83–139: the three preset package cards — **leave these untouched**
2. Lines 141–194: the static pricing table starting with `{/* Full pricing table */}` — **replace this entire block**

Replace everything from `{/* Full pricing table */}` down to (and including) the closing `</div>` and `</section>` with:

```tsx
        {/* Interactive Stack Calculator */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="font-[var(--font-display)] text-2xl font-bold mb-2">
              Build Your Own Package
            </h3>
            <p className="text-ghost text-sm max-w-xl mx-auto">
              Select the services you need. Prices update instantly — toggle between USD and NGN.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <StackCalculator />
          <div className="text-center mt-6">
            <a
              href="/calculator"
              className="text-sm text-teal hover:text-teal/80 transition-colors"
            >
              Open full calculator →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
```

Also add the import at the top of the file (after the existing `ScrollReveal` import):

```tsx
import StackCalculator from "./StackCalculator";
```

- [ ] **Step 3.2: Build to verify no TypeScript/JSX errors**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 3.3: Visual check in browser**

```bash
npm run dev
```

Open http://localhost:3000, scroll to the Pricing section. Verify:
- Three preset package cards still visible and unchanged above the calculator
- Currency toggle (🇺🇸 USD / 🇳🇬 NGN) appears
- 9 module cards are displayed in a 3-column grid
- Clicking a single-tier card (Finance, Sales, etc.) adds it with a ✓ and shows it in the total bar
- Clicking a tiered card (Marketing, Dev, etc.) adds it at Entry tier and shows Entry/Growth/Enterprise pills
- Switching a tier pill updates the price in the card and total
- `×` button on tiered cards removes them
- Total bar updates live
- Switching currency flips all prices

- [ ] **Step 3.4: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: replace static pricing table with interactive StackCalculator on homepage"
```

---

### Task 4: Create `src/app/calculator/page.tsx`

**Files:**
- Create: `src/app/calculator/page.tsx`

New `/calculator` route. Full-page version of the calculator with expanded cards.

- [ ] **Step 4.1: Create the directory and page file**

```tsx
// src/app/calculator/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StackCalculator from "@/components/StackCalculator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Build Your Operations Stack | Solynta Talent",
  description:
    "Choose your AI-powered business operations services and see your monthly total instantly. Pricing available in USD and NGN.",
};

export default function CalculatorPage() {
  return (
    <main>
      <Navbar />
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-midnight to-navy" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Pricing Calculator
            </p>
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Build your business operations stack
            </h1>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              Select the services you need, choose your tier, and see your monthly total instantly.
              No setup fees. No long-term contracts. Cancel anytime.
            </p>
          </div>

          {/* Full-page calculator */}
          <StackCalculator fullPage />

          {/* Bottom note */}
          <p className="text-center text-xs text-ghost/40 mt-8">
            All prices shown are monthly retainers. Tiers may vary by service.
            Book a free consultation to get a personalised recommendation.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4.2: Build and verify**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
npm run build
```
Expected: build completes, `/calculator` route is generated with no errors.

- [ ] **Step 4.3: Visual check**

```bash
npm run dev
```

Open http://localhost:3000/calculator. Verify:
- Page loads with Navbar and Footer
- Cards are taller with feature bullet points visible
- "Get Started →" button appears in the total bar when modules are selected
- Currency toggle works
- "Get Started →" links to `/consultation`
- "Open full calculator →" link in the homepage pricing section links here correctly

- [ ] **Step 4.4: Commit**

```bash
git add src/app/calculator/page.tsx
git commit -m "feat: add /calculator page with full-page StackCalculator"
```

---

## Chunk 2: ConsultationWizard + Backend

---

### Task 5: Backend — Add `pricing_currency` to `Consultation` model

**Files:**
- Modify: `c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow/customer_service/models.py`
- Create: `c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow/customer_service/migrations/0006_consultation_pricing_currency.py` (via `makemigrations`)

> **Pre-condition:** Ensure migration 0005 (`0005_add_failed_consultation_status.py`) is applied before proceeding.
> ```bash
> cd c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow
> python manage.py migrate customer_service 0005
> ```

- [ ] **Step 5.1: Add the field to the model**

Open `customer_service/models.py`. Find the `Consultation` class. Add the new field immediately after the `status` field (around line 190):

```python
pricing_currency = models.CharField(
    max_length=3,
    choices=[('USD', 'USD'), ('NGN', 'NGN')],
    default='USD',
    help_text='Currency the customer used when viewing the consultation wizard',
)
```

> **Caller note:** `estimated_monthly_cost` (existing DecimalField) is stored in whatever currency was selected. Callers must check `pricing_currency` to interpret its value correctly.

- [ ] **Step 5.2: Generate the migration**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow
python manage.py makemigrations customer_service --name=add_pricing_currency
```
Expected: creates `customer_service/migrations/0006_add_pricing_currency.py`

- [ ] **Step 5.3: Apply the migration**

```bash
python manage.py migrate customer_service
```
Expected: `Applying customer_service.0006_add_pricing_currency... OK`

- [ ] **Step 5.4: Verify with Django shell**

```bash
python manage.py shell -c "
from customer_service.models import Consultation
print(Consultation._meta.get_field('pricing_currency'))
print('default:', Consultation._meta.get_field('pricing_currency').default)
"
```
Expected output:
```
<django.db.models.fields.CharField: pricing_currency>
default: USD
```

- [ ] **Step 5.5: Commit**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow
git add customer_service/models.py customer_service/migrations/0006_add_pricing_currency.py
git commit -m "feat: add pricing_currency field to Consultation model"
```

---

### Task 6: Backend — Update `consultation_api.py`

**Files:**
- Modify: `c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow/customer_service/consultation_api.py`

Three changes:
1. Save `pricing_currency` from the step 5 payload
2. Add `NGN_MODULE_PRICING` and `NGN_BUDGET_LABELS` dicts
3. Update the Gemini prompt in `_run_consultation_analysis` to use the correct currency

- [ ] **Step 6.1: Add pricing dicts after the existing `NEEDS_TO_MODULE` block**

Open `customer_service/consultation_api.py`. After the `_MODULE_KEY_MAP` dict (around line 54), add:

```python
NGN_MODULE_PRICING = {
    'finance':           {'entry': 100000},
    'sales_crm_web':     {'entry': 45000},
    'customer_service':  {'entry': 25000},
    'hr_admin':          {'entry': 25000},
    'marketing':         {'entry': 25000,  'growth': 50000,  'enterprise': 100000},
    'developers':        {'entry': 150000, 'growth': 250000, 'enterprise': 500000},
    'data_science':      {'entry': 85000,  'growth': 125000, 'enterprise': 250000},
    'enterprise_intel':  {'entry': 50000,  'growth': 75000,  'enterprise': 100000},
    'inventory':         {'entry': 50000,  'growth': 100000, 'enterprise': 200000},
}

NGN_BUDGET_LABELS = {
    'ngn-under-200k': 'Under ₦200,000/mo',
    'ngn-200k-400k':  '₦200,000 – ₦400,000/mo',
    'ngn-400k-800k':  '₦400,000 – ₦800,000/mo',
    'ngn-800k-2m':    '₦800,000 – ₦2,000,000/mo',
    'ngn-2m-plus':    '₦2,000,000+/mo',
    'flexible':        'Flexible / ROI-driven',
}
```

- [ ] **Step 6.2: Save `pricing_currency` in the step 5 handler**

Find the `elif step == 5:` block (around line 643). The block contains a `for field in NEEDS_TO_MODULE` loop. Add the new lines **inside** the `elif step == 5:` block, after the loop, at the same indentation level as the `for` statement. The `consultation.save()` call comes later, outside all `elif` branches — do not place the code there.

```python
    elif step == 5:
        for field in NEEDS_TO_MODULE:
            if field in data:
                setattr(consultation, field, bool(data[field]))
        # ← add here, same indentation as the for loop above
        pricing_currency = data.get('pricing_currency', 'USD')
        if pricing_currency in ('USD', 'NGN'):
            consultation.pricing_currency = pricing_currency
```

- [ ] **Step 6.3: Update `_run_consultation_analysis` to use correct currency**

Find `_run_consultation_analysis`. At the top of the `try` block (after `consultation = Consultation.objects.get(...)`), add these lines before the `needs = []` loop:

```python
        # Determine currency context
        is_ngn = consultation.pricing_currency == 'NGN'
        currency_sym = '₦' if is_ngn else '$'

        # Decode budget range label (handles both USD and NGN codes)
        raw_budget = consultation.budget_range or 'Not specified'
        budget_label = NGN_BUDGET_LABELS.get(raw_budget, raw_budget)
```

- [ ] **Step 6.4: Update the prompt to use currency context**

In the prompt f-string, make these replacements:

**Replace:**
```python
- Monthly Software Spend: ${consultation.monthly_software_spend or 'Not specified'}
```
**With:**
```python
- Monthly Software Spend: {currency_sym}{consultation.monthly_software_spend or 'Not specified'}
```

**Replace:**
```python
- Budget Range: {consultation.budget_range or 'Not specified'}
```
**With:**
```python
- Budget Range: {budget_label}
- Pricing Currency: {consultation.pricing_currency} (use {currency_sym} for ALL financial figures in your response)
```

**Replace (the second occurrence, around line 156):**
```python
- Financial figures must reflect their size ({consultation.company_size}) and budget ({consultation.budget_range or 'not specified'})
```
**With:**
```python
- Financial figures must reflect their size ({consultation.company_size}) and budget ({budget_label})
- ALL monetary values in your JSON response must use {currency_sym} as the currency symbol
- The financial_analysis.monthly_investment should reflect the total cost in {consultation.pricing_currency}
```

**At the end of the prompt, inside the JSON structure spec, update the `financial_analysis` example to add a `currency` field:**

Find the `"financial_analysis"` block in the prompt (around line 148). Add `"currency": "USD"` as the first field:

```python
  "financial_analysis": {{
    "currency": "{consultation.pricing_currency}",
    "monthly_investment": 1250,
    ...
```

**If `is_ngn`, also update module cost values in the prompt.** After the `module_details` dict is built (around line 77), add:

```python
        # Override price fields in module_details with NGN prices if needed
        if is_ngn:
            for key in module_details:
                ngn = NGN_MODULE_PRICING.get(key, {})
                if ngn:
                    module_details[key] = dict(module_details[key])
                    module_details[key]['price'] = f"₦{ngn.get('entry', 0):,}/mo"
                    module_details[key]['price_num'] = ngn.get('entry', 0)
```

- [ ] **Step 6.5: Fix currency symbol in `_build_report_email_html`**

The `_build_report_email_html` function (around line 366) builds the HTML email sent to the customer after analysis. It currently hardcodes `$` throughout. Add currency awareness so NGN customers receive ₦ in their email.

At the top of `_build_report_email_html`, after the existing variable assignments (after line ~381 where `headcount` is set), add:

```python
    # Currency symbol for this consultation
    email_sym = '₦' if consultation.pricing_currency == 'NGN' else '$'
```

Then replace the three hardcoded `$` occurrences in the function body:

| Original | Replacement |
|---|---|
| `f"${m.get('monthly_cost',0):,}/mo` (line ~395) | `f"{email_sym}{m.get('monthly_cost',0):,}/mo` |
| `f"${monthly:,.0f}` (line ~465) | `f"{email_sym}{monthly:,.0f}` |
| `f"${annual_savings:,.0f}` (line ~469) | `f"{email_sym}{annual_savings:,.0f}` |

These two plain-text lines (around lines 330–331) are inside `_create_crm_lead`, not `_build_report_email_html`. They appear in the CRM activity note. Fix them in the same pass using a local symbol derived from `consultation.pricing_currency`:

```python
# At the top of _create_crm_lead (find it above line 330), add:
crm_sym = '₦' if consultation.pricing_currency == 'NGN' else '$'

# Then replace lines 330–331:
# Before:
f"Estimated Monthly Investment: ${monthly:,.0f}",
f"Annual Savings Potential: ${financial.get('annual_savings', 0):,.0f}",
# After:
f"Estimated Monthly Investment: {crm_sym}{monthly:,.0f}",
f"Annual Savings Potential: {crm_sym}{financial.get('annual_savings', 0):,.0f}",
```

> Note: `_build_report_email_html` is called at line ~554 as `_build_report_email_html(consultation)` — the `consultation` object already carries `pricing_currency`, so no signature change is needed.

- [ ] **Step 6.6: Verify Python syntax**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow
python -c "import customer_service.consultation_api; print('OK')"
```
Expected: `OK`

- [ ] **Step 6.7: Commit**

```bash
git add customer_service/consultation_api.py
git commit -m "feat: add NGN pricing support to consultation API — currency-aware Gemini prompt and email"
```

---

### Task 7: Frontend — Update `ConsultationWizard.tsx`

**Files:**
- Modify: `src/app/consultation/ConsultationWizard.tsx`

Seven targeted changes to this file:

1. Add `currency` state
2. Add currency toggle UI above step progress bar
3. Update `AnalysisReport` interface to include `financial_analysis.currency`
4. Update `BUDGET_RANGES` to support NGN with a computed function
5. Reset `budget_range` on currency switch
6. Inject `pricing_currency` in step 5 payload
7. Update `ReportView`: add `currency` prop, `sym` variable, replace hardcoded `$`, fix number formatting

- [ ] **Step 7.1: Add currency state and import**

At the top of the file, add the import for `Currency` type and `formatPrice`:

```tsx
import { Currency, MODULES as PRICING_MODULES, formatPrice, getModulePrice } from "@/lib/pricing";
```

Inside the `ConsultationWizard` component function, after the existing `useState` declarations (around line 374), add:

```tsx
const [currency, setCurrency] = useState<Currency>("USD");
```

- [ ] **Step 7.2: Update `AnalysisReport` interface**

Find the `interface AnalysisReport` block (around line 46). Inside `financial_analysis`, add `currency`:

```ts
  financial_analysis: {
    currency?: 'USD' | 'NGN';   // ← add this line
    monthly_investment: number;
    annual_investment: number;
    // ... rest unchanged
  };
```

- [ ] **Step 7.3: Add NGN budget ranges constant**

After the existing `BUDGET_RANGES` constant, add:

```tsx
const NGN_BUDGET_RANGES = [
  { value: "ngn-under-200k", label: "Under ₦200,000/mo" },
  { value: "ngn-200k-400k",  label: "₦200,000 – ₦400,000/mo" },
  { value: "ngn-400k-800k",  label: "₦400,000 – ₦800,000/mo" },
  { value: "ngn-800k-2m",    label: "₦800,000 – ₦2,000,000/mo" },
  { value: "ngn-2m-plus",    label: "₦2,000,000+/mo" },
  { value: "flexible",       label: "Flexible / ROI-driven" },
];
```

- [ ] **Step 7.4: Reset `budget_range` on currency switch**

Replace the `setCurrency` call pattern. Instead of a bare `setCurrency` toggle, define a handler:

```tsx
function handleCurrencyChange(c: Currency) {
  setCurrency(c);
  // Reset budget_range if it belongs to the other currency's set
  const isNgnCode = formData.budget_range.startsWith("ngn-");
  const isUsdCode = !isNgnCode && formData.budget_range !== "";
  if ((c === "NGN" && isUsdCode) || (c === "USD" && isNgnCode)) {
    updateField("budget_range", "");
  }
}
```

- [ ] **Step 7.5: Add currency toggle UI above step progress bar**

Find the step progress bar rendering (the `<div>` containing `{STEPS.map(...)}`, around line 700–720). Insert the currency toggle immediately above it:

```tsx
{/* Currency toggle */}
<div className="flex justify-center gap-2 mb-6">
  {(["USD", "NGN"] as Currency[]).map((c) => (
    <button
      key={c}
      onClick={() => handleCurrencyChange(c)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        currency === c
          ? "bg-teal text-midnight"
          : "bg-white/5 text-ghost border border-white/10 hover:border-teal/30"
      }`}
    >
      <span>{c === "USD" ? "🇺🇸" : "🇳🇬"}</span>
      <span>{c}</span>
    </button>
  ))}
</div>
```

- [ ] **Step 7.6: Use NGN budget ranges in Step 4**

Find the Step 4 `<SelectField>` for `budget_range` (around line 1077):

```tsx
<SelectField label="Monthly budget range" value={formData.budget_range} onChange={(v) => updateField("budget_range", v)} options={BUDGET_RANGES} placeholder="Select range" />
```

Replace `options={BUDGET_RANGES}` with:

```tsx
options={currency === "NGN" ? NGN_BUDGET_RANGES : BUDGET_RANGES}
```

- [ ] **Step 7.7: Inject `pricing_currency` in step 5 payload**

Find the `else if (stepNum === 5)` block in `saveStep` (around line 461). Add `pricing_currency` to the data object:

```ts
} else if (stepNum === 5) {
  data = {
    needs_finance: formData.needs_finance,
    needs_sales_crm: formData.needs_sales_crm,
    needs_customer_service: formData.needs_customer_service,
    needs_hr: formData.needs_hr,
    needs_marketing: formData.needs_marketing,
    needs_developers: formData.needs_developers,
    needs_data_science: formData.needs_data_science,
    needs_enterprise_intel: formData.needs_enterprise_intel,
    needs_inventory: formData.needs_inventory,
    pricing_currency: currency,   // ← inject from wizard state
  };
}
```

- [ ] **Step 7.8: Update module prices in Step 5**

Find where the MODULES const is used in the Step 5 rendering (around line 1080–1120). Each module card currently shows a hardcoded `price` string like `"$500/mo"`.

Replace the `MODULES` const used in step 5's render with `PRICING_MODULES` (imported from `pricing.ts`), and show the price using `formatPrice`. Find the module card price display and update it to:

```tsx
{/* In the module card render: */}
<span className="text-xs font-mono text-teal">
  {mod.tiers
    ? `from ${formatPrice(mod.ngn.entry ?? 0, currency)}/mo`  // replace .ngn with dynamic
    : `${formatPrice(currency === 'NGN' ? (mod.ngn.entry ?? 0) : (mod.usd.entry ?? 0), currency)}/mo`
  }
</span>
```

Simplified version using the helper:
```tsx
<span className="text-xs font-mono text-teal">
  {mod.tiers ? 'from ' : ''}{formatPrice(getModulePrice(mod, 'entry', currency), currency)}/mo
</span>
```

> **Note:** The existing MODULES const in `ConsultationWizard.tsx` uses `needs_*` keys, not `ModuleKey`. You will need to either (a) keep the existing MODULES for Step 5's checkbox keys but add a helper to look up pricing from PRICING_MODULES, or (b) build a map from `needs_*` key to `ModuleKey`:
>
> ```tsx
> const NEEDS_TO_MODULE_KEY: Record<string, string> = {
>   needs_finance: 'finance', needs_sales_crm: 'sales_crm_web',
>   needs_customer_service: 'customer_service', needs_hr: 'hr_admin',
>   needs_marketing: 'marketing', needs_developers: 'developers',
>   needs_data_science: 'data_science', needs_enterprise_intel: 'enterprise_intel',
>   needs_inventory: 'inventory',
> };
> ```
>
> Then look up: `const pricingMod = PRICING_MODULES.find(m => m.key === NEEDS_TO_MODULE_KEY[mod.key])`

- [ ] **Step 7.9: Update `ReportView` — add `currency` prop and `sym` variable**

Find the `function ReportView(...)` definition (line 1141). Update its signature:

```tsx
function ReportView({
  report,
  companyName,
  contactName,
  currency = "USD",
}: {
  report: AnalysisReport;
  companyName: string;
  contactName: string;
  currency?: Currency;
}) {
  const sym = (report.financial_analysis?.currency ?? currency) === "NGN" ? "₦" : "$";
  const fmtNum = (n: number | undefined) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n ?? 0);
```

Update the call site (around line 681):

```tsx
<ReportView
  report={analysisReport}
  companyName={formData.company_name}
  contactName={formData.contact_name}
  currency={currency}
/>
```

- [ ] **Step 7.10: Replace all hardcoded `$` in `ReportView`**

Replace each occurrence using `sym` and `fmtNum`. Exact lines to update:

| Line | Before | After |
|---|---|---|
| 1197 | `` value={`$${report.financial_analysis.monthly_investment?.toLocaleString() \|\| 0}`} `` | `` value={`${sym}${fmtNum(report.financial_analysis.monthly_investment)}`} `` |
| 1202 | `` value={`$${report.financial_analysis.annual_savings?.toLocaleString() \|\| 0}`} `` | `` value={`${sym}${fmtNum(report.financial_analysis.annual_savings)}`} `` |
| 1314 | `` <div ...>${mod.monthly_cost}/mo</div> `` | `` <div ...>{sym}{fmtNum(mod.monthly_cost)}/mo</div> `` |
| 1423 | `` ${ report.financial_analysis.monthly_investment?.toLocaleString()} `` | `` {sym}{fmtNum(report.financial_analysis.monthly_investment)} `` |
| 1424 | `` ${ report.financial_analysis.annual_investment?.toLocaleString()}/year `` | `` {sym}{fmtNum(report.financial_analysis.annual_investment)}/year `` |
| 1428 | `` ${ report.financial_analysis.annual_savings?.toLocaleString()} `` | `` {sym}{fmtNum(report.financial_analysis.annual_savings)} `` |
| 1455 | `` ${ item.monthly}/mo `` | `` {sym}{fmtNum(item.monthly)}/mo `` |

- [ ] **Step 7.11: Build to verify no TypeScript errors**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
npm run build
```
Expected: clean build, no TS errors.

- [ ] **Step 7.12: End-to-end manual test**

```bash
npm run dev
```

1. Open http://localhost:3000/consultation
2. Verify the USD/NGN toggle appears above the step progress bar
3. Switch to NGN — verify budget ranges on step 4 change to ₦ values
4. Switch back to USD — verify budget_range select resets to blank
5. Select a USD budget range on step 4, switch to NGN — verify the select resets
6. On step 5 (Services), verify module prices show in selected currency
7. Complete the consultation form and trigger analysis
8. When the report loads, verify all financial figures display with the correct symbol (`₦` or `$`)

- [ ] **Step 7.13: Commit**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
git add src/app/consultation/ConsultationWizard.tsx
git commit -m "feat: add USD/NGN currency support to consultation wizard and AI analysis report"
```

---

### Task 8: Deploy

- [ ] **Step 8.1: Deploy backend to App Engine**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/SolyntaFlow
gcloud app deploy --quiet
```

After deploy, run the migration on the live DB:

```bash
# Via Cloud Shell or App Engine instance
python manage.py migrate customer_service
```

- [ ] **Step 8.2: Deploy frontend to Vercel**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
git push origin main
```

Vercel auto-deploys from main. Verify the deploy succeeds in the Vercel dashboard.

- [ ] **Step 8.3: Smoke test on production**

1. Open https://www.solyntalent.com — verify calculator loads in pricing section
2. Open https://www.solyntalent.com/calculator — verify full-page calculator
3. Open https://www.solyntalent.com/consultation — verify currency toggle is visible
4. Switch to NGN in consultation, check budget ranges, check module prices
5. Submit a test consultation in NGN — verify the AI report shows ₦ throughout

- [ ] **Step 8.4: Final commit and tag**

```bash
cd c:/Users/pc/OneDrive/Desktop/Desktop/solynta-talent-website
git tag v2.1.0-stack-calculator
git push origin main --tags
```

---

## Summary of all files changed

| Repo | File | Action |
|------|------|--------|
| Frontend | `src/lib/pricing.ts` | Create |
| Frontend | `src/components/StackCalculator.tsx` | Create |
| Frontend | `src/components/Pricing.tsx` | Modify |
| Frontend | `src/app/calculator/page.tsx` | Create |
| Frontend | `src/app/consultation/ConsultationWizard.tsx` | Modify |
| Backend | `customer_service/models.py` | Modify |
| Backend | `customer_service/migrations/0006_add_pricing_currency.py` | Create |
| Backend | `customer_service/consultation_api.py` | Modify |
