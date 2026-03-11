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
- **Homepage** (`Pricing.tsx`): The existing static "Build Your Own Package" pricing table is replaced with the interactive `StackCalculator` component (compact variant).
- **Dedicated page** (`/calculator`): A new full-page version with expanded module cards that include feature bullet points. The homepage pricing section gains a "Build Your Stack →" button linking to `/calculator`.

### Interaction pattern: Click-to-add cards
- 3-column card grid of all 9 service modules.
- **Single-tier modules** (Finance, Sales, Customer Service, HR): click to add/remove. Price is fixed.
- **Tiered modules** (Marketing, Dev, Data Science, Enterprise Intel, Inventory): first click adds at Entry tier. Entry / Growth / Enterprise pill buttons appear on the card; clicking a pill switches the tier and updates the price.
- A **live total bar** is pinned below the grid showing selected service tags and running monthly total. Includes a "Get Started →" button linking to `/consultation`.

### Currency toggle
A flag-based section header sits above the card grid:

```
🇺🇸 USD   |   🇳🇬 NGN
```

Switching currency instantly updates all card prices and the running total. Defaults to USD.

### Component design
`src/components/StackCalculator.tsx` — accepts a `fullPage?: boolean` prop.
- `false` (default) → compact cards, used in `Pricing.tsx`
- `true` → taller cards with feature list, used in `/calculator/page.tsx`

---

## Feature 2: ConsultationWizard Currency Support

### Wizard changes
- A persistent `🇺🇸 USD / 🇳🇬 NGN` toggle appears at the top of the wizard above the step progress bar. State is preserved across all 6 steps.
- **Step 4 (budget ranges):** swap to NGN equivalents when NGN is selected.
- **Step 5 (module selection):** module prices display in the selected currency.
- `pricing_currency: 'USD' | 'NGN'` is included in the consultation payload sent to the backend.

**NGN budget ranges (Step 4):**
| USD | NGN |
|-----|-----|
| Under $500/mo | Under ₦200,000/mo |
| $500–$1,000/mo | ₦200,000–₦400,000/mo |
| $1,000–$2,000/mo | ₦400,000–₦800,000/mo |
| $2,000–$5,000/mo | ₦800,000–₦2,000,000/mo |
| $5,000+/mo | ₦2,000,000+/mo |
| Flexible / ROI-driven | Flexible / ROI-driven |

### Backend changes (SolyntaFlow)

**`customer_service/models.py`**
- Add `pricing_currency = models.CharField(max_length=3, choices=[('USD','USD'),('NGN','NGN')], default='USD')` to `Consultation`.
- New migration.

**`customer_service/consultation_api.py`**
- Accept and save `pricing_currency` from the request payload.
- Add `NGN_MODULE_PRICING` dict alongside existing `MODULE_PRICING`:

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

- The Gemini prompt switches between USD and NGN pricing tables based on `consultation.pricing_currency`.
- All financial figures in the prompt (cost examples, savings) use the correct symbol and scale.
- The prompt instructs the model to include `"currency": "USD"` or `"currency": "NGN"` in the `financial_analysis` JSON object.

**`ConsultationWizard.tsx` — ReportView**
- Read `report.financial_analysis.currency` (or fall back to the wizard's selected currency).
- Replace all hardcoded `$` prefixes with the correct symbol (`₦` for NGN).
- Format NGN numbers with comma separators (no decimal places).

---

## Data Layer

### Frontend: `src/lib/pricing.ts` (new file)

```ts
export type Currency = 'USD' | 'NGN'
export type Tier = 'entry' | 'growth' | 'enterprise'

export interface ModuleDefinition {
  key: string
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
  { key: 'marketing',        icon: '📣', name: 'Marketing Dept.',      desc: 'Social · PPC · Content · Video · SEO',                 tiers: true,  usd: { entry: 500,   growth: 800,   enterprise: 1200  }, ngn: { entry: 25000,  growth: 50000,  enterprise: 100000 } },
  { key: 'developers',       icon: '💻', name: 'Embedded Developers',  desc: 'Full Stack · QA · DevOps · Tech Lead · UI/UX',         tiers: true,  usd: { entry: 500,   growth: 1000,  enterprise: 1800  }, ngn: { entry: 150000, growth: 250000, enterprise: 500000 } },
  { key: 'data_science',     icon: '📊', name: 'Data Science',         desc: 'Data Scientist · Engineer · ML · BI Dev · Analyst',    tiers: true,  usd: { entry: 250,   growth: 600,   enterprise: 1200  }, ngn: { entry: 85000,  growth: 125000, enterprise: 250000 } },
  { key: 'enterprise_intel', icon: '🧠', name: 'Enterprise Intel.',    desc: 'Insight Engine · Strategy · Audit · Knowledge Arch.',  tiers: true,  usd: { entry: 500,   growth: 1000,  enterprise: 2000  }, ngn: { entry: 50000,  growth: 75000,  enterprise: 100000 } },
  { key: 'inventory',        icon: '📦', name: 'Inventory Mgmt.',      desc: 'Controller · Procurement · Forecaster · Warehouse',    tiers: true,  usd: { entry: 250,   growth: 600,   enterprise: 1200  }, ngn: { entry: 50000,  growth: 100000, enterprise: 200000 } },
]

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`
  }
  return `$${amount.toLocaleString('en-US')}`
}
```

---

## Files Changed

### Frontend (`solynta-talent-website`)
| File | Action |
|------|--------|
| `src/lib/pricing.ts` | **Create** — shared pricing data + formatPrice helper |
| `src/components/StackCalculator.tsx` | **Create** — interactive calculator (homepage + full-page) |
| `src/components/Pricing.tsx` | **Modify** — replace static table with `<StackCalculator />` |
| `src/app/calculator/page.tsx` | **Create** — new `/calculator` route |
| `src/app/consultation/ConsultationWizard.tsx` | **Modify** — currency toggle, NGN budget ranges, pass `pricing_currency` |

### Backend (`SolyntaFlow`)
| File | Action |
|------|--------|
| `customer_service/models.py` | **Modify** — add `pricing_currency` field |
| `customer_service/migrations/0006_consultation_pricing_currency.py` | **Create** — migration |
| `customer_service/consultation_api.py` | **Modify** — save currency, add NGN pricing dict, update Gemini prompt |

---

## Out of Scope
- Live exchange rate fetching (prices are fixed, not converted)
- Currency auto-detection by IP/locale
- Saving calculator state to localStorage
- The `/calculator` page being indexed differently from the homepage pricing section
