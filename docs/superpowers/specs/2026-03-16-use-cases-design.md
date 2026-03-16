# Use Cases Section — Design Spec

**Date**: 2026-03-16
**Location**: New `UseCases.tsx` component, placed between `<Challenge />` and `<Services />` on homepage

## Overview

A section showcasing 5 key business outcomes that Solynta Talent enables, with clickable cards that expand inline to reveal detailed breakdowns of exactly how the solutions work, which modules/functions power them, and compelling industry statistics. This bridges the gap between the Challenge section (problems) and the Services section (modules) by showing concrete outcomes.

## Architecture

### Component: `src/components/UseCases.tsx`

Single client component (`"use client"`) containing:
- All use case data inline
- 5 clickable cards in a responsive grid
- Inline expandable detail panel below the grid
- `id="use-cases"` anchor for navbar linking

### Data Structure

```typescript
interface UseCaseFunction {
  name: string;
  desc: string;
}

interface UseCase {
  key: string;
  icon: string;
  title: string;
  stat: string;        // Bold headline statistic
  statSource: string;  // Attribution for the stat
  summary: string;     // Card-level description (visible when collapsed)
  problem: string;     // What the business is losing/missing
  solution: string;    // How Solynta Talent solves it
  functions: UseCaseFunction[];  // Specific features that enable the solution
  modules: string[];   // Which Solynta Talent modules are involved
  color: string;       // Accent color class for this use case
}
```

## UI Design

### Section Header

```
[eyebrow]  WHAT YOU GAIN
[heading]  Real outcomes. Not promises.
[subtext]  Five ways Solynta Talent transforms your business operations — backed by data.
```

### Card Grid (Collapsed State)

- 5 cards in a responsive grid: 1 col on mobile, 2 on sm, 3+2 on lg
- Each card shows: icon, title, stat (bold, colored), summary
- Active card has teal border glow; others have `border-white/5`
- Hover: `border-white/10`, slight lift (`-translate-y-1`)
- Clicking a card expands/toggles the detail panel below

### Detail Panel (Expanded State)

When a card is clicked, a detail panel slides open below the card grid:

- Full width of the container (`max-w-4xl mx-auto` — intentionally narrower than the card grid for comfortable reading of longer content)
- Smooth `max-height` + opacity transition (300ms)
- Layout: two columns on desktop, single column on mobile
  - **Left column**: Problem statement, solution description, stat callout box
  - **Right column**: "Key Functions" list with checkmark bullets, "Powered by" module tags
- Close button (X) in top-right corner of panel
- Clicking the same card again collapses the panel
- Clicking a different card swaps content (no collapse/re-expand flicker)

### Stat Callout Box (inside detail panel)

- Rounded box with colored left border matching the use case accent
- Large stat number/percentage in bold
- Source attribution in small ghost text
- Example: "1.4–5% of revenue lost to employee theft annually — National Retail Federation / EY"

### Module Tags

- Small pill badges showing which modules power this use case
- Match the module icons/colors from the Services section
- Example: `💰 Finance Core` `📦 Inventory` `🧠 Enterprise Intel.`

### Animations

- Section header: `ScrollReveal` (standard)
- Cards: `ScrollReveal` with staggered delays (each +80ms)
- Detail panel: CSS `max-height` + `opacity` transition 300ms ease
- Card active state: smooth border/shadow transition

### Background

- Gradient: `bg-gradient-to-b from-midnight via-navy to-midnight` (matches Challenge's gradient pattern, flows smoothly into Services which starts at midnight)
- Subtle accent glow: `bg-gold/[0.03] blur-[120px]` positioned center-left

## Content — 5 Use Cases

### 1. Eliminate Theft

- **icon**: `🛡️`
- **color**: `text-coral`
- **stat**: `1.4–5% of revenue`
- **statSource**: `Lost to employee theft annually — National Retail Federation / EY Emerging Markets Survey`
- **summary**: `AI-powered inventory tracking cross-referenced with PoS transactions automatically identifies where stock is unaccounted for — in real time, not months later.`

**Problem:**
Employee theft and inventory shrinkage are among the largest hidden costs in retail and distribution. Most businesses only discover losses during periodic stock counts — by which time the damage is done and the trail is cold. In emerging markets, weak internal controls make the problem worse: EY estimates retail shrinkage at 3–5% of revenue for SMEs without automated tracking.

**Solution:**
Solynta Talent's Inventory module tracks every stock movement in real time and cross-references it against Point-of-Sale transactions automatically. When stock moves without a corresponding sale, return, or transfer, the AI flags the discrepancy immediately — not at the next stock count. The system identifies patterns: specific shifts with higher shrinkage, locations with unusual write-offs, SKUs that consistently go missing. Finance Core reconciles daily cash deposits against expected revenue from sales, catching cash theft alongside inventory theft. Enterprise Intelligence aggregates everything into theft risk dashboards with trend analysis.

**Key Functions:**
1. Real-time stock movement tracking — every receipt, sale, transfer, and adjustment logged instantly
2. Automated PoS cross-referencing — AI matches inventory changes against sales transactions, flags unmatched movements
3. Shrinkage pattern detection — identifies high-risk shifts, locations, employees, and SKUs using ML analysis
4. Cash reconciliation — Finance module matches daily bank deposits against expected PoS revenue
5. Theft risk dashboards — Enterprise Intelligence aggregates inventory and cash anomalies into executive views
6. Tamper-proof audit trail — every inventory adjustment requires justification and is permanently logged

**Modules**: Inventory Management, Finance Core, Enterprise Intelligence

---

### 2. Reduce Operational Costs

- **icon**: `📉`
- **color**: `text-teal`
- **stat**: `30–50% cost reduction`
- **statSource**: `Typical savings when replacing manual operations with AI-augmented workflows — Solynta Talent client data`
- **summary**: `Replace $500K+/year in staff costs with AI agents that handle 70–85% of cognitive work, supervised by human specialists. One platform replaces 5–10 SaaS subscriptions.`

**Problem:**
Growing businesses drown in operational overhead. A complete back-office team — bookkeeper, accountant, HR manager, marketing team, customer service reps, IT admin — costs $500,000+/year in salaries alone. On top of that, each function runs on different software: QuickBooks for finance, BambooHR for people, HubSpot for CRM, Mailchimp for marketing. These tools don't talk to each other, creating data silos and duplicate work. Most SMEs spend 60–70% of revenue on operations and overhead.

**Solution:**
Solynta Talent replaces this fragmented, expensive model with a single AI-augmented operations partner. 41 AI agents handle the repetitive cognitive work — transaction posting, payroll calculation, email triage, social media scheduling, lead scoring, report generation — at machine speed, 24/7, with zero fatigue. Human specialists focus exclusively on judgment calls, strategy, and quality review. SolyntaFlow unifies all functions in one platform, eliminating redundant SaaS subscriptions. You start from $250/month per module instead of $15,000+/month per department.

**Key Functions:**
1. AI-automated bookkeeping & reconciliation — daily, not monthly, with 95%+ accuracy
2. Payroll computation in minutes — salary, deductions, payslips, statutory contributions
3. Procurement automation — PO generation, vendor comparison, spend tracking
4. Unified SolyntaFlow platform — replaces QuickBooks + BambooHR + HubSpot + Mailchimp + Zendesk
5. Pay-as-you-grow pricing — start with one module ($250/mo), add more as needed, scale down with 30 days notice
6. No HR overhead — no recruitment, no training, no turnover, no benefits administration for operations staff

**Modules**: Finance Core, HR & Admin Ops, Marketing Department, AI Customer Service, Sales, CRM & Web

---

### 3. Increase Sales

- **icon**: `🚀`
- **color**: `text-gold`
- **stat**: `35–50% more leads converted`
- **statSource**: `Businesses with 24/7 response capability vs business-hours-only — Harvard Business Review / InsideSales.com`
- **summary**: `AI chat agents respond to customer enquiries in seconds, 24/7, while CRM automation ensures no lead falls through the cracks. Your sales pipeline never sleeps.`

**Problem:**
Most SMEs lose sales because they can't respond fast enough. A potential customer visits your website at 9PM, sends a WhatsApp message, gets no reply until the next morning — and by then they've found a competitor. Research shows that responding to a lead within 5 minutes makes you 21x more likely to qualify them, yet the average SME response time is 42 hours. Meanwhile, leads in the CRM go cold because nobody follows up consistently.

**Solution:**
Solynta Talent deploys AI chat agents across WhatsApp, web chat and email that respond to customer enquiries in under 3 seconds — 24 hours a day, 7 days a week. These aren't generic chatbots; they're trained on YOUR products, pricing, and policies. When a lead needs human attention, they're escalated with full context. The CRM Specialist agent scores every lead, triggers automated follow-up sequences, and flags hot prospects for human outreach. The Sales Ops Analyst generates weekly pipeline reports identifying exactly where conversions are dropping off.

**Key Functions:**
1. 24/7 AI chat agents — WhatsApp, web chat, email, trained on your business data
2. Sub-3-second response time — every enquiry answered instantly, day or night
3. Automated lead scoring — AI ranks prospects by engagement, fit, and buying signals
4. Follow-up sequences — automated nurture emails and messages triggered by lead behaviour
5. Pipeline analytics — weekly reports showing conversion rates, bottlenecks, and revenue forecasts
6. Human escalation with context — hot leads routed to your sales team with full conversation history

**Modules**: AI Customer Service, Sales, CRM & Web, Marketing Department, Enterprise Intelligence

---

### 4. Unlock Bank Lending

- **icon**: `🏦`
- **color**: `text-lavender`
- **stat**: `70% of SME loans rejected`
- **statSource**: `Due to inadequate financial records in emerging markets — IFC / World Bank SME Finance Report`
- **summary**: `AI-maintained, audit-ready books with daily reconciliation mean you always have bank-ready financials — not scrambled together at application time.`

**Problem:**
Banks don't reject SME loan applications because the business isn't viable — they reject them because the financial records are unreliable. Months of unreconciled transactions, missing invoices, no cash flow statements, no management commentary. When the loan officer asks for 12 months of financials, most SMEs scramble to produce something presentable — and it shows. The IFC estimates that 70% of SME loan applications in emerging markets fail due to inadequate documentation. This locks viable businesses out of the growth capital they need.

**Solution:**
Solynta Talent's Finance Core maintains your books to audit-ready standard every single day — not just at year-end or when the bank asks. Bank feeds are reconciled daily with 95%+ accuracy. Monthly P&L, balance sheet, cash flow statements and trial balance are generated automatically with AI-written management commentary explaining variances and trends. Tax compliance stays current. When you need a bank package, it's already done — you export it, not build it. The Controller agent can produce custom financial packages tailored to specific lender requirements on demand.

**Key Functions:**
1. Daily automated bookkeeping — every transaction classified, posted, and reconciled against bank feeds
2. Monthly financial statements — P&L, balance sheet, cash flow, trial balance generated automatically
3. AI-written management commentary — variances, trends, and performance context explained in plain English
4. Tax compliance — VAT/WHT calculations current, filing deadlines tracked, remittances scheduled
5. Bank-ready packages on demand — 12-month financials, cash flow projections, management packs exported instantly
6. Audit trail — every transaction has a complete, tamper-proof history for due diligence

**Modules**: Finance Core, Enterprise Intelligence

---

### 5. Improve Business Intelligence

- **icon**: `🧠`
- **color**: `text-ice`
- **stat**: `23x more likely to acquire customers`
- **statSource**: `Companies using data-driven decision making — McKinsey Global Institute`
- **summary**: `AI aggregates data from every department into unified dashboards with predictive analytics, competitor benchmarking, and strategic recommendations. No more gut-feel decisions.`

**Problem:**
Most SMEs make decisions based on gut feeling, outdated spreadsheets, or a single metric they happen to track. Finance data lives in QuickBooks, sales data in a CRM, marketing data in Google Analytics, inventory in a spreadsheet. Nobody connects the dots: which marketing channel drives the most profitable customers? Which products have declining margins? Which customers are about to churn? Without unified intelligence, businesses react to problems instead of preventing them.

**Solution:**
Solynta Talent's Enterprise Intelligence module sits above all other modules and aggregates data from finance, sales, marketing, HR, and inventory into unified executive dashboards. The Insight Engine identifies cross-functional patterns that siloed teams would never spot. The Strategy Advisor generates competitor benchmarking and scenario modelling. Data Science builds predictive models — customer churn, demand forecasting, CLV, dynamic pricing. Every insight comes with clear business context and actionable recommendations, not just numbers.

**Key Functions:**
1. Cross-department KPI dashboards — finance, sales, marketing, HR, inventory in one unified view
2. AI pattern detection — identifies cross-functional trends, anomalies, and opportunities automatically
3. Competitor benchmarking — market intelligence reports comparing your performance to industry peers
4. Predictive analytics — churn prediction, demand forecasting, customer lifetime value modelling
5. Board-ready intelligence packs — monthly/weekly reports with strategic recommendations
6. Real-time alerts — AI notifies you of significant metric changes before they become problems

**Modules**: Enterprise Intelligence, Data Science, Finance Core, Sales, CRM & Web, Inventory Management

---

## Integration Points

### Homepage (`page.tsx`)
```tsx
import UseCases from "@/components/UseCases";
// ...
<Challenge />
<UseCases />
<Services />
```

### Navbar
Add "Use Cases" to the Navbar links array. Place between "Services" and "Platform":
```typescript
{ href: "/#use-cases", label: "Use Cases" },
{ href: "/#services", label: "Services" },
{ href: "/#platform", label: "Platform" },
```

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/UseCases.tsx` | **Create** | New component with all data, card grid, expandable detail panel |
| `src/app/page.tsx` | **Modify** | Import and place `<UseCases />` between Challenge and Services |
| `src/components/Navbar.tsx` | **Modify** | Add "Use Cases" link between Services and Platform |

## Non-Goals

- No separate /use-cases page
- No animation beyond scroll reveal and expand/collapse transitions
- No connection to service detail pages (modules are listed as tags, not links)
