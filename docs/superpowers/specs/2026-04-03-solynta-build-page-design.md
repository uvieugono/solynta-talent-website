# Solynta Build Page — Design Spec

**Date:** 2026-04-03
**Product:** Solynta Build — Software as a Subscription (UK/US) / One-time Build (Nigeria)

## Overview

Add a new top-level `/build` page to the Solynta Talent website showcasing the Solynta Build product — a service where clients bring a software idea, Solynta builds it using Claude Code, and the client owns the software and keeps 100% of revenue.

This is a standalone product page, separate from the existing Talent service modules.

## Route & Navigation

- **Route:** `/build`
- **Nav link:** Add "Solynta Build" to the Navbar `links` array, positioned after "FAQ"
- **CTA buttons:** All "Start Building" CTAs link to `https://calendly.com/uvieugono`

## Page Structure

Single-page scroll with anchor sections:

1. **Hero**
2. **How It Works** (4-step process)
3. **What You Get** (feature comparison table)
4. **Pricing** (currency/market toggle — GBP/USD/NGN)
5. **Income Scenarios** (ROI examples)
6. **FAQ**
7. **CTA** (Book a Call)
8. **Footer**

## Section Details

### 1. Hero

- Eyebrow: "Solynta Build"
- Headline: Positioning around owning your own software business
- Subtitle: You bring the idea, we build/host/maintain it, you keep 100% of revenue
- Primary CTA: "Book a Call" → Calendly
- Secondary CTA: "See Pricing" → scrolls to `#pricing`
- Dark background (midnight/navy), consistent with site theme

### 2. How It Works — 4 Steps

1. **Tell us your idea** — Complete a requirements form or book a call. We scope your product.
2. **We build it** — Claude Code builds your custom software. Delivered within 30 days of PRD sign-off.
3. **Go live** — Your software launches with hosting, user accounts, and everything ready.
4. **Grow** — Monthly feature sprints keep your product evolving. You focus on acquiring customers.

Styled as a horizontal step flow, similar to existing HowItWorks component but with Build-specific content.

### 3. What You Get — Feature Comparison

Three tiers: Starter, Growth, Scale

| Feature | Starter | Growth | Scale |
|---|---|---|---|
| Custom web app | Yes | Yes | Yes |
| Feature modules | Up to 5 | Up to 15 | Unlimited |
| User accounts & login | Yes | Yes | Yes |
| Cloud hosting | Yes | Yes | Yes |
| Integrations | 1 | Up to 5 | Unlimited |
| Payment processing | No | Yes (Stripe/Paystack) | Yes |
| Advanced user roles | No | Yes | Yes |
| Mobile-optimised PWA | No | Yes | Yes |
| Native iOS/Android | No | No | Yes |
| Analytics dashboard | No | Yes | Yes |
| Feature sprints/month | 1 | 2 | Continuous |
| SolyntaFlow back-office | Basic | Standard | Full enterprise |
| Uptime SLA | 99% | 99.5% | 99.99% |
| Regulated industry support | No | No | Yes |
| White-label / multi-tenant | No | No | Yes |
| Multiple software products | No | No | Unlimited |

Scale tier: scoped individually, 12-month minimum, dedicated build overseer.

### 4. Pricing

Currency/market toggle at top — three buttons: GBP, USD, NGN.

**Section anchor ID:** `id="pricing"`

**Default currency:** Read the `st-market` cookie client-side (set by middleware on root `/` visits). Map `GB` → GBP, `NG` → NGN, else USD. If no cookie exists, default to USD. No async loading — synchronous cookie read, no flash.

**UK (GBP) — Monthly subscription:**

| Tier | Price | Terms |
|---|---|---|
| Starter | £199/mo | 3-month minimum |
| Growth (featured) | £399/mo | Month-to-month after 3 months |
| Scale | From £2,000/mo | Scoped individually, 12-month minimum |

**US (USD) — Monthly subscription:**

| Tier | Price | Terms |
|---|---|---|
| Starter | $299/mo | 3-month minimum |
| Growth | $599/mo | Month-to-month after 3 months |
| Scale | From $3,000/mo | Scoped individually, 12-month minimum |

**Nigeria (NGN) — One-time build cost:**

| Tier | Price | Notes |
|---|---|---|
| Starter (Essentials) | ₦250,000 | One-time payment |
| Growth | ₦500,000 | One-time payment |
| Scale | From ₦2,000,000 | One-time, scoped individually |

All Nigeria tiers: hosting and maintenance charged separately (pricing TBD). Same feature sets as UK/US equivalents.

Each pricing card has a "Start Building →" CTA → Calendly.

### 5. Income Scenarios

**Section anchor ID:** `id="income"`

Shown for UK/US only — hidden when NGN is selected (one-time pricing makes subscription ROI math inapplicable).

Currency-aware: switches between GBP and USD examples based on toggle.

**GBP examples:**
- **Conservative:** 80 users × £5/mo = £400/mo revenue − £199 subscription = £201/mo net income
- **Realistic:** 300 users × £10/mo = £3,000/mo revenue − £399 subscription = £2,601/mo net income

**USD examples:**
- **Conservative:** 80 users × $7/mo = $560/mo revenue − $299 subscription = $261/mo net income
- **Realistic:** 300 users × $12/mo = $3,600/mo revenue − $599 subscription = $3,001/mo net income

When NGN selected: replace with a simple message — "You keep 100% of your software revenue. No ongoing subscription. Build once, earn forever."

### 6. FAQ

Accordion style, matching existing FAQ component pattern:

- What exactly do I get when I subscribe / pay?
- How long does the build take?
- Do I own the software?
- What happens if I cancel? (UK/US)
- Can I upgrade from Starter to Growth?
- What does hosting and maintenance cover? (Nigeria)
- What technology do you use to build?

### 7. CTA Section

Same pattern as existing pages — headline + "Book a Call" → Calendly.

### 8. Footer

Reuse existing Footer component.

## Technical Implementation

### New Files

- `src/app/build/page.tsx` — Page component
- `src/components/build/BuildHero.tsx`
- `src/components/build/BuildHowItWorks.tsx`
- `src/components/build/BuildFeatures.tsx`
- `src/components/build/BuildPricing.tsx`
- `src/components/build/BuildIncomeScenarios.tsx`
- `src/components/build/BuildFAQ.tsx`
- `src/components/build/BuildCTA.tsx`

### Modified Files

- `src/components/Navbar.tsx` — Add "Solynta Build" link to `links` array

### Reused Components

- `ScrollReveal` — fade-in animations
- `Footer` — page footer
- `Navbar` — site navigation (with new link added). Existing Navbar links point to homepage anchors — this is acceptable. When on `/build`, nav links navigate to homepage sections. The Build page's own sections use internal anchor scroll via the hero CTAs, not the nav.

### Component Architecture

- `src/app/build/page.tsx` — server component, exports `metadata` for SEO
- All `src/components/build/*.tsx` — `"use client"` components (currency toggle state needs client-side interactivity)
- Currency state lifted to page-level client wrapper that passes selected currency down to BuildPricing, BuildIncomeScenarios, and BuildFAQ

### SEO Metadata

`src/app/build/page.tsx` exports metadata:
- **Title:** "Solynta Build — Own Your Own Software Business"
- **Description:** "We build your custom software. You keep 100% of the revenue. Starting from £199/month."
- **Open Graph:** Same title/description with appropriate og:image

### Styling

- Follows existing theme: midnight (#0a0e1a) / navy (#0f1629) backgrounds, teal (#00d4aa) accents
- Fonts: Clash Display (headings), General Sans (body)
- Animation: ScrollReveal with stagger delays
- Responsive: mobile-first, same breakpoints as existing pages
- Feature comparison table: on mobile, horizontally scrollable with sticky first column (feature names)

### Section Anchor IDs

| Section | ID |
|---|---|
| How It Works | `how-it-works` |
| What You Get | `features` |
| Pricing | `pricing` |
| Income Scenarios | `income` |
| FAQ | `faq` |

### Geo-Detection / Currency Default

Read `st-market` cookie client-side. Map `GB` → GBP, `NG` → NGN, else USD. Synchronous read — no loading state needed. Manual toggle always available.

### Pricing Data

Inline in BuildPricing component — no separate data file needed for a single page.

## Out of Scope

- Path B (SolyntaFlow referrer network) — not included on this page
- Nigeria hosting/maintenance pricing — TBD, noted as "charged separately"
- Annual prepay discounts — can be added later
- Idea Session / pre-build products — not part of this page
