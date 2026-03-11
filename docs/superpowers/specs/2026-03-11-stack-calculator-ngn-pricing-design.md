# Design Spec: Stack Calculator & NGN Pricing
**Date:** 2026-03-11
**Status:** Approved
**Repo:** solynta-talent-website + SolyntaFlow (backend)

---

## Overview

Two related features for the Solynta Talent website:

1. **Business Operations Stack Calculator** — an interactive module selector where customers build their own service package and see a live monthly total. Supports both USD and NGN pricing.
2. **AI Analysis Currency Support** — the existing Free AI Analysis (ConsultationWizard) gains a USD/NGN toggle; the AI-generated report uses the correct pricing for the selected currency throughout.

---

## Feature 1: Stack Calculator

### Where it lives

**Homepage (`Pricing.tsx`):**
- The three preset package cards ("Startup Essentials", "Growth Operations", "Full Enterprise") are kept exactly as-is — USD only, no currency toggle, no changes.
- The static "Build Your Own Package" pricing table that sits below the package cards is removed and replaced with the interactive `StackCalculator` component (compact variant, `fullPage={false}`).
- A "Build Your Full Stack →" link to `/calculator` is added beneath the homepage calculator.

**Dedicated page (file: `src/app/calculator/page.tsx`, accessible at `/calculator`):**
- Same `StackCalculator` component with `fullPage={true}` — taller cards with a short feature bullet list per module.
- Standalone page with its own heading and intro copy.

### Interaction pattern: Click-to-add cards

- 3-column card grid of all 9 service modules.
- **Single-tier modules** (Finance, Sales, Customer Service, HR): one click adds; clicking again removes. No tier selector.
- **Tiered modules** (Marketing, Dev, Data Science, Enterprise Intel, Inventory): first click adds at Entry tier. Entry / Growth / Enterprise pill buttons appear on the card. An **`×` remove icon** appears in the card's top-right corner — this is the only way to deselect a tiered card, avoiding hit-target ambiguity with the tier pills. Clicking a pill switches tier and updates the price without removing the module.
- A **live total bar** is pinned below the grid showing selected service tags and running monthly total.
  - On `fullPage={true}` (`/calculator`): includes a "Get Started →" button linking to `/consultation`.
  - On `fullPage={false}` (homepage): CTA is omitted — the "Build Your Full Stack →" link below serves that purpose.

### Currency toggle

A flag-based section header sits immediately above the card grid:

```
[🇺🇸 USD]   [🇳🇬 NGN]
```

Switching currency instantly updates all card prices and the total bar to that currency. Defaults to USD. The preset package cards above are unaffected.

> **Note on NGN pricing:** NGN prices are independently set market-rate prices for the Nigerian market. They are not derived from USD by currency conversion.

### Component design

`src/components/StackCalculator.tsx`
- Client component (`"use client"`)
- Props: `fullPage?: boolean` (default `false`)
- Internal state:
  - `currency: Currency` — drives all price display
  - `selected: Record<ModuleKey, Tier | false>` — what's in the stack; initialised to all `false`
- Imports `MODULES`, `ModuleKey`, `Tier`, `Currency`, `formatPrice` from `src/lib/pricing.ts`

---

## Feature 2: ConsultationWizard Currency Support

### Wizard state

A `currency` state variable (`Currency`, default `'USD'`) is added at the top of the wizard component and persists across all 6 steps.

**Currency toggle on currency switch:** when the user switches currency, if the currently stored `formData.budget_range` belongs to the other currency's set (i.e. an NGN code when switching to USD, or a USD code when switching to NGN), `budget_range` is reset to `""` so the user must re-select. Detection rule:
- NGN codes all start with `"ngn-"`
- USD codes are `"under-500"`, `"500-1000"`, `"1000-2000"`, `"2000-5000"`, `"5000+"`, `"flexible"`

### Wizard UI changes

- A `🇺🇸 USD / 🇳🇬 NGN` flag pill toggle renders above the step progress bar on every step.
- **Step 4 (budget ranges):** when `currency === 'NGN'` the BUDGET_RANGES option list is replaced with NGN equivalents (see table below). When `currency === 'USD'` the original list is used.
- **Step 5 (module selection):** module card prices display using `formatPrice(price, currency)` from `src/lib/pricing.ts`.

**NGN budget range options (step 4, when `currency === 'NGN'`):**

| Submitted value | Display label |
|---|---|
| `ngn-under-200k` | Under ₦200,000/mo |
| `ngn-200k-400k` | ₦200,000 – ₦400,000/mo |
| `ngn-400k-800k` | ₦400,000 – ₦800,000/mo |
| `ngn-800k-2m` | ₦800,000 – ₦2,000,000/mo |
| `ngn-2m-plus` | ₦2,000,000+/mo |
| `flexible` | Flexible / ROI-driven |

### `FormData` / payload

`pricing_currency` is **not** added to the `FormData` interface. It is injected from the `currency` state variable at the point `saveStep(5)` constructs its `data` object:

```ts
// Inside saveStep(5) data construction:
data: {
  needs_finance: formData.needs_finance,
  // ... other needs_* fields ...
  pricing_currency: currency,   // ← injected from wizard state
}
```

### TypeScript interface update

Add one optional field to `AnalysisReport.financial_analysis`:

```ts
financial_analysis: {
  // ... existing fields ...
  currency?: 'USD' | 'NGN'   // returned by Gemini in its JSON response
}
```

### `ReportView` signature update

```ts
function ReportView({
  report,
  companyName,
  contactName,
  currency = 'USD',   // optional, defaults to USD
}: {
  report: AnalysisReport
  companyName: string
  contactName: string
  currency?: 'USD' | 'NGN'
})
```

Call site update (line ~681 of `ConsultationWizard.tsx`):
```tsx
<ReportView
  report={analysisReport}
  companyName={formData.company_name}
  contactName={formData.contact_name}
  currency={currency}   // ← add this
/>
```

Inside `ReportView`, the effective symbol is:
```ts
const sym = (report.financial_analysis?.currency ?? currency) === 'NGN' ? '₦' : '$'
```

All hardcoded `$` prefixes in `ReportView` are replaced with `{sym}`. To find all occurrences, search for `` `$${`` and `>$<` and `>\$` in `ConsultationWizard.tsx`. Key locations include (but may not be limited to): lines 1197, 1202, 1314, 1423, 1424, 1428. All `.toLocaleString()` calls on financial figures in `ReportView` are also updated to use `Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)` to guarantee consistent cross-browser comma separators for NGN.

---

### Backend changes (SolyntaFlow)

**`customer_service/models.py`**

Add to `Consultation`:

```python
pricing_currency = models.CharField(
    max_length=3,
    choices=[('USD', 'USD'), ('NGN', 'NGN')],
    default='USD',
)
```

> **Caller note:** `estimated_monthly_cost` (existing `DecimalField`) is stored in whatever currency was selected — callers must check `pricing_currency` to interpret the value correctly. Consider widening `max_digits` from 10 to 12 to accommodate large NGN amounts safely.

**Migration:** `customer_service/migrations/0006_consultation_pricing_currency.py`
> Migration `0005_add_failed_consultation_status.py` must be applied and committed before generating 0006.

**`customer_service/consultation_api.py`**

1. In the step 5 handler of `submit_consultation`, accept and save `pricing_currency` from the request data.

2. Add `NGN_MODULE_PRICING` alongside the existing `MODULE_PRICING`:

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
```

3. Add `NGN_BUDGET_LABELS` to decode submitted NGN budget codes for the Gemini prompt:

```python
NGN_BUDGET_LABELS = {
    'ngn-under-200k': 'Under ₦200,000/mo',
    'ngn-200k-400k':  '₦200,000 – ₦400,000/mo',
    'ngn-400k-800k':  '₦400,000 – ₦800,000/mo',
    'ngn-800k-2m':    '₦800,000 – ₦2,000,000/mo',
    'ngn-2m-plus':    '₦2,000,000+/mo',
    'flexible':       'Flexible / ROI-driven',
}
```

4. In `_run_consultation_analysis`:
   - Select the correct pricing dict (`NGN_MODULE_PRICING` vs `MODULE_PRICING`) based on `consultation.pricing_currency`.
   - Set `currency_symbol = '₦' if consultation.pricing_currency == 'NGN' else '$'`.
   - Decode `budget_range` label: `budget_label = NGN_BUDGET_LABELS.get(consultation.budget_range, consultation.budget_range)` (works for both USD and NGN codes since USD codes are not in `NGN_BUDGET_LABELS` and fall back to the raw value).
   - Replace the prompt's `Budget Range: {consultation.budget_range}` line with `Budget Range: {budget_label}`.
   - All cost examples and financial figures in the prompt use `currency_symbol`.
   - The prompt instructs the model to include `"currency": "USD"` or `"currency": "NGN"` in the `financial_analysis` block.

---

## Data Layer

### Frontend: `src/lib/pricing.ts` (new file)

```ts
export type Currency = 'USD' | 'NGN'
export type Tier = 'entry' | 'growth' | 'enterprise'
export type ModuleKey =
  | 'finance' | 'sales_crm_web' | 'customer_service' | 'hr_admin'
  | 'marketing' | 'developers' | 'data_science' | 'enterprise_intel' | 'inventory'

export interface ModuleDefinition {
  key: ModuleKey
  icon: string
  name: string
  desc: string
  tiers: boolean
  usd: Partial<Record<Tier, number>>
  ngn: Partial<Record<Tier, number>>
}

export const MODULES: ModuleDefinition[] = [
  { key: 'finance',          icon: '💰', name: 'Finance Core',         desc: 'Bookkeeper · Accountant · Payroll · Tax',              tiers: false, usd: { entry: 500  }, ngn: { entry: 100000 } },
  { key: 'sales_crm_web',    icon: '📈', name: 'Sales, CRM & Web',     desc: 'Growth Engine · CRM · Digital · Sales Ops',            tiers: false, usd: { entry: 250  }, ngn: { entry: 45000  } },
  { key: 'customer_service', icon: '💬', name: 'AI Customer Service',  desc: '24/7 Responder · Email Triage · Website Chatbot',      tiers: false, usd: { entry: 250  }, ngn: { entry: 25000  } },
  { key: 'hr_admin',         icon: '👥', name: 'HR & Admin Ops',       desc: 'HR Admin · Procurement · IT Admin',                    tiers: false, usd: { entry: 250  }, ngn: { entry: 25000  } },
  { key: 'marketing',        icon: '📣', name: 'Marketing Dept.',      desc: 'Social · PPC · Content · Video · SEO',                 tiers: true,  usd: { entry: 500, growth: 800,  enterprise: 1200 }, ngn: { entry: 25000,  growth: 50000,  enterprise: 100000 } },
  { key: 'developers',       icon: '💻', name: 'Embedded Developers',  desc: 'Full Stack · QA · DevOps · Tech Lead · UI/UX',         tiers: true,  usd: { entry: 500, growth: 1000, enterprise: 1800 }, ngn: { entry: 150000, growth: 250000, enterprise: 500000 } },
  { key: 'data_science',     icon: '📊', name: 'Data Science',         desc: 'Data Scientist · Engineer · ML · BI Dev · Analyst',    tiers: true,  usd: { entry: 250, growth: 600,  enterprise: 1200 }, ngn: { entry: 85000,  growth: 125000, enterprise: 250000 } },
  { key: 'enterprise_intel', icon: '🧠', name: 'Enterprise Intel.',    desc: 'Insight Engine · Strategy · Audit · Knowledge Arch.',  tiers: true,  usd: { entry: 500, growth: 1000, enterprise: 2000 }, ngn: { entry: 50000,  growth: 75000,  enterprise: 100000 } },
  { key: 'inventory',        icon: '📦', name: 'Inventory Mgmt.',      desc: 'Controller · Procurement · Forecaster · Warehouse',    tiers: true,  usd: { entry: 250, growth: 600,  enterprise: 1200 }, ngn: { entry: 50000,  growth: 100000, enterprise: 200000 } },
]

// Use en-US locale for consistent comma separators across all browsers (en-NG has inconsistent support)
export function formatPrice(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)
  return currency === 'NGN' ? `₦${formatted}` : `$${formatted}`
}
```

---

## Files Changed

### Frontend (`solynta-talent-website`)

| File | Action | Notes |
|------|--------|-------|
| `src/lib/pricing.ts` | **Create** | Shared pricing data, `ModuleKey` type, `formatPrice` helper |
| `src/components/StackCalculator.tsx` | **Create** | Interactive calculator — compact + full-page variants |
| `src/components/Pricing.tsx` | **Modify** | Remove static pricing table; add `<StackCalculator />` + "Build Your Full Stack →" link |
| `src/app/calculator/page.tsx` | **Create** | `/calculator` route — full-page calculator |
| `src/app/consultation/ConsultationWizard.tsx` | **Modify** | Currency toggle, NGN budget ranges, reset budget on currency switch, `pricing_currency` in step 5 payload, `currency` prop on `ReportView`, updated `AnalysisReport` interface, `{sym}` replacing hardcoded `$` in `ReportView` |

### Backend (`SolyntaFlow`)

| File | Action | Notes |
|------|--------|-------|
| `customer_service/models.py` | **Modify** | Add `pricing_currency` field; note `estimated_monthly_cost` is now currency-relative |
| `customer_service/migrations/0006_consultation_pricing_currency.py` | **Create** | Requires 0005 applied first |
| `customer_service/consultation_api.py` | **Modify** | Save `pricing_currency` in step 5 handler; add `NGN_MODULE_PRICING` + `NGN_BUDGET_LABELS`; update `_run_consultation_analysis` prompt |

---

## Out of Scope

- Live exchange rate fetching (NGN prices are fixed market-rate, not USD-converted)
- Currency auto-detection by IP/locale
- Saving calculator state to localStorage
- The preset package cards gaining NGN variants
- Passing currency state from `/calculator` to the consultation wizard via URL params (users set currency again inside the wizard)
