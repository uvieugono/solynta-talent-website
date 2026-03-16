# Homepage FAQ Section — Design Spec

**Date**: 2026-03-16
**Location**: New `FAQ.tsx` component, placed between `<WhySolynta />` and `<Contact />` on homepage

## Overview

A comprehensive, category-tabbed FAQ section with ~50 questions covering general platform questions plus 5 deep questions per service module. The FAQ serves as a sales tool — each answer explains how AI + human collaboration replaces traditional staff, emphasizing speed, accuracy, and cost advantages.

## Architecture

### Component: `src/components/FAQ.tsx`

Single client component (`"use client"`) containing:
- All FAQ data inline (no new data files)
- Category tab navigation
- Accordion Q&A items

### Data Structure

```typescript
interface FAQItem {
  q: string;  // Question
  a: string;  // Answer
}

interface FAQCategory {
  key: string;
  icon: string;
  label: string;
  items: FAQItem[];
}
```

### Categories (10 tabs)

1. **General** (5 questions) — platform overview, AI+human model, pricing philosophy, getting started, security
2. **Finance Core** (5 questions)
3. **Sales, CRM & Web** (5 questions)
4. **AI Customer Service** (5 questions)
5. **HR & Admin Ops** (5 questions)
6. **Marketing** (5 questions)
7. **Embedded Developers** (5 questions)
8. **Data Science** (5 questions)
9. **Enterprise Intelligence** (5 questions)
10. **Inventory Management** (5 questions)

Total: ~50 questions

### Question Themes Per Module

Each module's 5 questions must cover:
1. **What exactly does this module do and which roles does it replace?**
2. **How do the AI agents handle the day-to-day work?**
3. **Where do humans step in — and why is that combination superior?**
4. **What speed/accuracy/cost advantage vs hiring in-house staff?**
5. **Module-specific operational question** (varies by module)

These are DIFFERENT from the existing per-service-page FAQs (which cover tool compatibility, integrations, etc.). The homepage FAQ focuses on the value proposition and how the AI+human model works.

## UI Design

### Section Header

Follows the same pattern as WhySolynta and other sections:

```
[eyebrow]  FREQUENTLY ASKED QUESTIONS
[heading]  Everything you need to know.
[subtext]  How 41 AI agents and expert humans deliver enterprise operations at startup prices.
```

### Category Tabs

- Horizontally scrollable row of pill buttons
- Active tab: `bg-teal/15 text-teal border-teal/30`
- Inactive tab: `bg-transparent text-ghost/60 border-white/5 hover:border-white/10`
- Each tab shows icon + label (e.g., "💰 Finance Core")
- "General" is the default active tab
- On mobile: horizontal scroll with `overflow-x-auto`, hide scrollbar
- Tab row is sticky within the section on scroll (not page-level sticky)

### Accordion Items

- Question row: `text-white-soft font-medium text-base`, teal chevron on right
- Chevron rotates 180deg on expand (CSS transition)
- Answer: `text-ghost/80 text-sm leading-relaxed`, slides down with `max-height` + `overflow-hidden` transition
- Divider: `border-white/5` between items
- Only one item open at a time within the active category
- Container: `max-w-3xl mx-auto` for comfortable reading width
- Section element must include `id="faq"` for Navbar anchor scrolling

**Note**: The accordion interaction (expand/collapse with max-height transition) is net-new behavior for this codebase — the existing service-page FAQs are static lists. This will be built from scratch in the component.

### Animations

- Section header: `ScrollReveal` (standard)
- Tab bar: `ScrollReveal` with small delay
- FAQ items: `ScrollReveal` with staggered delays (each item +60ms)
- Accordion open/close: CSS `max-height` transition 300ms ease

### Background

- Gradient: `bg-gradient-to-b from-navy to-midnight` (inverse of WhySolynta to create visual separation)
- Subtle accent glow: `bg-teal/[0.03] blur-[120px]` positioned bottom-right
- Transition from WhySolynta (ends at navy) flows naturally into FAQ section

## Content — General Questions (5)

### Q1: What exactly is Solynta Talent?
Solynta Talent is a full-service, AI-augmented back-office operations provider. We deploy 41 purpose-built AI agents across 9 business functions — finance, sales, marketing, HR, customer service, development, data science, enterprise intelligence and inventory — supervised by experienced human professionals. Think of it as your entire operations team, delivered as a subscription starting from $250/month instead of hiring $500K+/year in staff.

### Q2: How is this different from traditional outsourcing or freelancers?
Traditional outsourcing gives you people. We give you an integrated AI + human system. Our AI agents handle 70-85% of cognitive work — transaction processing, report generation, campaign scheduling, lead scoring, code writing — at machine speed with zero fatigue. Human specialists handle the remaining 15-30%: strategic decisions, quality review, client communication and complex judgment calls. The result is 3-5x faster delivery, higher accuracy and a fraction of the cost. Unlike freelancers, you get a coordinated team with built-in workflows, audit trails and accountability.

### Q3: What does the pricing actually include — are there hidden fees?
No hidden fees. Every subscription includes your AI agents, human specialists, the SolyntaFlow platform, all tools and integrations, onboarding, and ongoing support. You start from $250/month for a single module. Pre-built packages start at $500/month (Startup), $1,000/month (Growth) or $3,000/month (Enterprise). You can also build a custom stack using our calculator. Scale up or down with 30 days notice — no penalties, no lock-in contracts.

### Q4: How quickly can we get started?
Most clients are fully operational within 1-2 weeks. Step one is a free AI Readiness Consultation (worth $2,500-$5,000) where we audit your current operations. Within days, we connect to your systems, configure your AI agents with your business rules, and go live. There is no lengthy implementation project — our agents are pre-built and simply need to be trained on your specific data and workflows.

### Q5: How do you handle our sensitive business data?
Every engagement starts with a signed NDA. Your data is encrypted at rest and in transit using AES-256 and TLS 1.3. All AI agent actions are logged in a tamper-proof audit trail with confidence scoring — you can see exactly what was done, when, and by whom. Role-based access controls ensure only authorized personnel touch your data. We never use your data to train models for other clients. Full IP assignment on all work product is standard.

## Content — Per-Module Questions (5 each)

### Finance Core (💰)

**Q1: What finance roles does this module replace?**
Finance Core replaces up to four full-time hires: a Bookkeeper, Accountant, Payroll Officer and Tax Specialist. Our four AI agents — The Ledger Keeper, The Controller, The Payroll Officer and The Tax Guardian — handle daily transaction posting, bank reconciliation, financial reporting, payroll computation and tax compliance. A senior human finance specialist reviews every output before delivery. You get a complete finance department from $250/month instead of $15,000+/month in salaries alone.

**Q2: How does AI handle my daily bookkeeping?**
The Ledger Keeper agent processes every transaction through AI pattern recognition — classifying, posting and reconciling against your bank feeds daily with 95%+ accuracy. It auto-approves routine postings above 90% confidence and flags unusual amounts, new vendors or pattern breaks for human review. Your books are always current, not weeks behind. A task that takes a human bookkeeper 4-6 hours daily is completed in minutes.

**Q3: Who reviews the financial reports before I see them?**
Every financial statement — P&L, balance sheet, cash flow, trial balance — is generated by The Controller agent and then reviewed by a qualified human accountant before delivery. The AI drafts the reports with written commentary explaining variances and trends, and the human validates accuracy, applies professional judgment and ensures compliance. You get the speed of AI with the reliability of professional oversight.

**Q4: How much faster and more accurate is this than an in-house team?**
Month-end close that typically takes an in-house team 5-10 business days is completed in 1-2 days. Bank reconciliation is done daily (not monthly). Payroll computation that takes hours is done in minutes with automatic variance detection. Error rates drop by 80%+ because the AI applies rules consistently — it never has a bad day, never transposes numbers, never forgets a step. And the human review layer catches the edge cases AI might miss.

**Q5: What if I already use QuickBooks, Xero or Sage?**
We work alongside your existing accounting software or can fully migrate you to SolyntaFlow — whichever you prefer. Our AI agents connect via API to QuickBooks, Xero, Sage, FreshBooks and other major platforms. Either way, you get the same AI-augmented service with confidence scoring and human oversight layered on top of your existing tools.

### Sales, CRM & Web (📈)

**Q1: What sales and marketing roles does this replace?**
This module replaces a Sales Development Rep, CRM Administrator, Web Developer and SEO Specialist — four roles that would cost $13,450+/month to hire. Our four AI agents (Growth Engine, Digital Architect, CRM Specialist and Sales Ops Analyst) handle website development, SEO optimization, CRM pipeline management, lead scoring, outreach sequences and performance reporting. A human growth strategist oversees the entire pipeline.

**Q2: How do AI agents manage our sales pipeline?**
The CRM Specialist agent continuously enriches lead data, scores prospects based on engagement signals, triggers automated follow-up sequences and flags hot leads for human outreach. The Sales Ops Analyst generates weekly pipeline reports with conversion analysis and revenue forecasts. The Growth Engine identifies new lead sources and optimizes acquisition channels. Your human strategist focuses on relationship building and closing — the highest-value activities.

**Q3: Can AI really build and maintain our website?**
Yes. The Digital Architect agent builds mobile-responsive, SEO-optimized websites using modern frameworks (Next.js, React). It handles landing pages, blog integration, analytics tracking and conversion optimization. For ongoing maintenance, it monitors site speed, fixes technical SEO issues, updates content and A/B tests layouts — all supervised by a human developer who reviews code quality and design decisions.

**Q4: What results can we expect and how fast?**
Most clients see measurable pipeline growth within 30-60 days. Website SEO improvements typically show within 60-90 days. The AI processes lead data and optimizes campaigns 24/7, not just during business hours. Compared to an in-house team, response time to new leads drops from hours to minutes, CRM data accuracy improves by 60%+, and your website stays continuously optimized rather than being updated quarterly.

**Q5: How does the AI + human model work for relationship selling?**
AI handles everything that doesn't require a human relationship: research, data enrichment, email drafting, follow-up scheduling, proposal generation and pipeline analytics. Your human strategist handles the calls, the negotiations, the relationship nuances that close deals. This division means your sales capacity multiplies — the AI creates more at-bats while humans focus on hitting home runs.

### AI Customer Service (💬)

**Q1: What customer service roles does this replace?**
This module replaces 1-3 full-time customer service representatives, saving $2,750+/month. Three AI agents — the 24/7 Responder, Email Triage Agent and Website Chatbot — handle customer inquiries across WhatsApp, email and web chat around the clock. They are trained on YOUR business data, not generic responses. Human agents handle complex escalations and sensitive situations.

**Q2: How does the AI handle customer conversations?**
Each AI agent is trained on your product catalog, pricing, policies, FAQs and historical support tickets. When a customer reaches out — via WhatsApp, email or web chat — the agent understands the context, retrieves relevant information and responds conversationally in seconds. It handles order status, booking queries, payment inquiries, FAQs and routine requests autonomously. Confidence scoring ensures uncertain responses are routed to a human before sending.

**Q3: What happens when the AI can't answer a question?**
Every response carries a confidence score. When the AI's confidence drops below the threshold, it seamlessly escalates to a human agent with full conversation context — the customer doesn't have to repeat themselves. The human resolves the issue, and that resolution is fed back into the knowledge base so the AI handles similar queries autonomously next time. Over time, the AI gets smarter and the escalation rate drops.

**Q4: How does 24/7 AI support compare to hiring night-shift staff?**
A 24/7 human support team requires 3-4 shifts of staff — easily $8,000-$15,000/month. Our AI agents never sleep, never take breaks and respond in under 3 seconds. They handle unlimited concurrent conversations (a human handles 2-3 at most). Average response time drops from minutes/hours to seconds. Customer satisfaction typically improves 20-30% due to instant, consistent, always-available support.

**Q5: How quickly can the bots be trained on our business?**
A basic FAQ chatbot is live in 3-5 days. Full multi-channel deployment with custom training takes 2-3 weeks. We ingest your product documentation, support history, policies and brand voice guidelines. The bots support English, French, Spanish and Portuguese out of the box, with additional languages on request.

### HR & Admin Ops (👥)

**Q1: What HR and admin roles does this replace?**
HR & Admin Ops replaces an HR Administrator, Procurement Officer and IT Administrator — three roles costing $9,750+/month. Our three AI agents automate onboarding workflows, leave tracking, HR records management, vendor procurement, purchase ordering, IT asset tracking and access provisioning. A human HR specialist handles employee relations, performance conversations and sensitive matters.

**Q2: How does AI handle employee onboarding?**
The HR Admin agent automates the entire onboarding workflow: generates offer letters, triggers document collection, provisions system access, sends welcome emails, creates training schedules and enrolls new hires in benefits. What typically takes an HR coordinator 2-3 days of manual work per hire is completed in hours. The human specialist handles the personal touch — the welcome call, team introductions and cultural orientation.

**Q3: How does AI manage procurement without human judgment?**
The Procurement Agent handles the systematic parts: tracking vendor contracts, generating purchase orders, comparing supplier quotes, monitoring delivery schedules and maintaining spend analytics. Human judgment comes in for strategic sourcing decisions, vendor relationship management, contract negotiations and approval of purchases above threshold amounts. The AI gives you visibility and speed; the human provides the judgment.

**Q4: What's the advantage over just using HR software like BambooHR?**
HR software is a tool — you still need people to run it. We provide the tool AND the team. Our AI agents don't just store data in BambooHR or Gusto — they actively manage workflows, send reminders, flag compliance issues, generate reports and take action. And when something needs a human decision, our specialist steps in. You get software + operations, not just software.

**Q5: How do you handle confidential employee data?**
Role-based access controls ensure only authorized personnel access sensitive HR data. All data is encrypted at rest and in transit. Every access is logged in our audit trail. We sign NDAs covering all employee information. Our AI agents process data without storing it in memory beyond the task — personal information is never used for model training.

### Marketing Department (📣)

**Q1: What marketing roles does this replace?**
The Marketing module replaces up to seven specialized roles: Social Media Manager, PPC Specialist, Content Writer, SEO Specialist, Video Producer, Marketing Automation Specialist and Analytics Manager. That is $15,000+/month in salaries replaced by a subscription starting from $500/month. Seven AI agents work under a unified strategy with human creative direction.

**Q2: How does AI create content that sounds like our brand?**
During onboarding, we ingest your brand guidelines, tone of voice, past content and competitor positioning. The AI agents learn your voice and generate content — social posts, ad copy, email sequences, blog outlines — that matches it. Every piece is reviewed by a human content strategist before publishing. The AI handles volume and consistency; the human ensures creative quality and brand alignment.

**Q3: Can AI really manage paid advertising campaigns?**
Yes — and often better than humans alone. Our PPC Specialist agent monitors campaigns 24/7, adjusting bids, pausing underperformers and scaling winners in real-time. It processes thousands of data points per hour that a human simply cannot. A/B tests run continuously. Budget is reallocated dynamically based on performance. Human strategists set the overall objectives, review creative direction and make strategic budget decisions.

**Q4: How does the AI + human model outperform a traditional marketing agency?**
Traditional agencies give you people who work business hours and juggle multiple clients. Our AI agents work 24/7 exclusively on your campaigns. Content is generated in minutes, not weeks. Campaign optimizations happen in real-time, not at monthly reviews. Analytics are continuous, not retrospective. And the cost is a fraction — you are paying for outcomes, not billable hours. The human layer ensures strategic coherence and creative quality that pure AI cannot deliver.

**Q5: How do you measure and report ROI?**
Multi-touch attribution tracking connects every marketing dollar to pipeline and revenue. We set up conversion pixels, UTM parameters and direct revenue attribution across all channels. You receive weekly performance dashboards and monthly strategic reports with clear ROI metrics. The Analytics Manager agent continuously monitors channel performance, flags anomalies and recommends budget reallocation to maximize return.

### Embedded Developers (💻)

**Q1: What development roles does this replace?**
Depending on tier, this replaces 1-5 development hires: Full Stack Developer, QA Engineer, DevOps Engineer, Tech Lead and UI/UX Designer — saving $9,350+/month or more. Your developers embed directly in your team: they work in your codebase, use your tools, attend your standups and deliver within your sprint cycles. AI augmentation means each developer produces 3x the output of a traditional hire.

**Q2: How does AI make your developers 3x faster?**
Our developers use AI-augmented workflows at every stage: AI pair-programming generates boilerplate code and suggests implementations, AI code review catches bugs before they reach QA, AI testing generates and runs test suites automatically, and AI documentation keeps docs current with code changes. The developer focuses on architecture, complex logic and creative problem-solving — the high-value work that AI cannot do alone.

**Q3: How do you maintain code quality with AI-generated code?**
Every line of code goes through a three-layer review: AI-powered static analysis catches common bugs and security issues, then a senior human developer reviews architecture, logic and maintainability, then QA validates functionality through automated and manual testing. AI generates code fast — humans ensure it is correct, secure and maintainable. The result is higher quality code delivered faster.

**Q4: Can I interview and choose my developer?**
Absolutely. You meet and approve your developer before any commitment begins. If the fit is not right, we match a different developer at no extra cost. Your developer becomes a genuine part of your team — they understand your product, your codebase and your goals. This is not anonymous outsourcing; it is an embedded team member.

**Q5: What tech stacks do you cover?**
React, Next.js, Vue, Angular for frontend. Python, Django, Node.js, Express, Go for backend. PostgreSQL, MongoDB, Redis for databases. AWS, GCP, Azure for cloud. Flutter, React Native, Swift, Kotlin for mobile. Docker, Kubernetes, Terraform for infrastructure. GitHub Actions, Jenkins, CircleCI for CI/CD. We match developers to your stack — not the other way around.

### Data Science (📊)

**Q1: What data roles does this replace?**
Data Science replaces up to six specialized hires: Data Scientist, Data Engineer, ML Engineer, Business Analyst, BI Developer and Data Analyst — a team that would cost $44,000+/month. Six AI agents handle everything from data cleaning and ETL pipelines to predictive models, dashboards and strategic analysis. A senior human data scientist validates all models and insights.

**Q2: How do AI agents build and deploy ML models?**
The ML Engineer agent handles the full lifecycle: data preparation, feature engineering, model selection, training, validation and deployment. It evaluates multiple algorithms, tunes hyperparameters and selects the best-performing model. The Data Engineer agent builds the ETL pipelines that feed it. A human data scientist reviews model architecture, validates assumptions and ensures the model solves the right business problem — not just a technical one.

**Q3: What kind of business insights can we expect?**
From day one: KPI dashboards connecting your finance, sales, marketing and operational data. Within weeks: customer segmentation, churn prediction, CLV modelling, demand forecasting and revenue projection. At enterprise tier: real-time analytics, streaming pipelines, custom AI features for your product and generative AI integration. Every insight is delivered with clear business context — not just numbers, but what they mean and what to do about them.

**Q4: How is this affordable when data scientists cost $150K-$200K/year each?**
AI agents handle 80%+ of the heavy lifting: data cleaning, pipeline construction, model training, report generation and dashboard updates. They work 24/7 and scale infinitely. The human data scientist focuses on the 20% that requires domain expertise, strategic thinking and business judgment. You get the output of a full data team at a fraction of the cost because the AI multiplies human capability rather than replacing it entirely.

**Q5: Do we need existing data infrastructure to start?**
No. At the Essentials tier ($250/month), we work with whatever data you have — spreadsheets, CSVs, your existing software exports. We clean it, structure it and build dashboards on top. For advanced analytics, we set up a lightweight data warehouse (BigQuery, Snowflake or PostgreSQL) as part of onboarding at no extra cost. You do not need to be "data-ready" to start — getting you data-ready is part of the service.

### Enterprise Intelligence (🧠)

**Q1: What strategic roles does this replace?**
Enterprise Intelligence replaces a Chief Strategy Officer, Business Intelligence Director, Compliance Officer and Knowledge Manager — roles costing $25,000+/month combined. Four AI agents (The Insight Engine, Strategy Advisor, Audit Sentinel and Knowledge Architect) provide the strategic intelligence layer that turns data into decisions. A senior human strategist ensures insights are actionable and aligned with your business goals.

**Q2: How does AI provide strategic business intelligence?**
The Insight Engine agent pulls data from all your active Solynta Talent modules — finance, sales, marketing, HR, inventory — into unified executive dashboards. It identifies cross-functional patterns that siloed teams would miss. The Strategy Advisor generates competitor benchmarking, market intelligence and scenario modelling. This is not just reporting — it is AI-powered strategic thinking, with a human strategist validating every recommendation.

**Q3: What is AI governance and why do I need it?**
Every AI agent in your Solynta Talent stack produces a confidence score with every action. The Audit Sentinel tracks all these scores, flags low-confidence decisions for human review, maintains a complete audit trail and generates governance reports. This means you always know what the AI did, how confident it was, and whether a human verified it. For regulated industries, this is compliance built-in. For everyone else, it is peace of mind.

**Q4: How does this module connect to the other services?**
Enterprise Intelligence sits above all other modules as the strategic layer. It aggregates data from Finance (revenue, costs, cash flow), Sales (pipeline, conversion), Marketing (ROI, attribution), HR (headcount, costs) and Inventory (stock levels, demand) into unified views. The more modules you run, the more powerful the intelligence. It can also work standalone with your existing data sources.

**Q5: What do the executive intelligence packs include?**
Monthly (or weekly at higher tiers) packs include: cross-business KPI dashboard with trend analysis, competitor benchmarking report, AI confidence and governance summary, strategic recommendations with supporting data, risk alerts and opportunity identification, and SOP documentation updates. At enterprise tier, you get real-time dashboards with live KPI alerts and a dedicated senior strategist.

### Inventory Management (📦)

**Q1: What inventory and supply chain roles does this replace?**
Inventory Management replaces an Inventory Controller, Procurement Analyst, Demand Forecaster and Warehouse Manager — four roles costing $18,000+/month. Four AI agents manage your entire supply chain: real-time stock tracking, automated purchase ordering, AI-powered demand forecasting and warehouse operations optimization. A human supply chain specialist handles vendor negotiations and strategic sourcing decisions.

**Q2: How does AI-powered demand forecasting work?**
The Demand Forecaster agent analyzes your historical sales data, seasonal patterns, market trends, promotional calendars and external signals (weather, economic indicators) to predict future demand at the SKU level. It reaches 85-92% accuracy after 3 months of calibration. Purchase orders are triggered automatically when stock hits reorder points, adjusted dynamically by the forecast. Overstocking and stockouts both decrease dramatically.

**Q3: Can this handle multi-warehouse and multi-site operations?**
Yes. From the Growth tier, you get up to 5 warehouse locations (unlimited at Enterprise) with real-time stock visibility across all sites. The Warehouse Manager agent optimizes stock allocation between locations, manages inter-warehouse transfers and coordinates dispatch from the optimal location. Multi-currency and multi-company support is included at Enterprise tier for international operations.

**Q4: How does this integrate with our e-commerce platform?**
Direct two-way sync with Shopify, WooCommerce, Magento, Amazon and eBay. When an order comes in, stock levels update in real-time across all channels. The AI prevents overselling, manages backorder workflows and triggers reorder alerts. For custom platforms, we connect via API and webhooks. Setup typically takes 2-3 days per platform.

**Q5: What about manufacturing — BOM and MRP?**
Growth and Enterprise tiers include full manufacturing support: multi-level Bills of Materials (BOM), Material Requirements Planning (MRP) runs, work order management and production scheduling. The AI calculates raw material requirements based on production plans and demand forecasts, then generates purchase orders automatically. A human production manager reviews and approves production schedules.

## Integration Points

### Homepage (`page.tsx`)
```tsx
import FAQ from "@/components/FAQ";
// ...
<WhySolynta />
<FAQ />
<Contact />
```

### Navbar
Add "FAQ" link to the Navbar's anchor links, scrolling to `#faq`. Place it after "How It Works" and before the CTA button.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/FAQ.tsx` | **Create** | New FAQ component with all data, tabs, accordion |
| `src/app/page.tsx` | **Modify** | Import and place `<FAQ />` between WhySolynta and Contact |
| `src/components/Navbar.tsx` | **Modify** | Add "FAQ" to navigation links |

## Non-Goals

- No separate /faq page (all on homepage)
- No search/filter within FAQ (tabs are sufficient for 50 items)
- No analytics tracking on individual FAQ opens (can be added later)
- No connection to the existing per-service-page FAQs (those remain separate, covering different topics)
