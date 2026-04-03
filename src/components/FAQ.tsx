"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  key: string;
  icon: string;
  label: string;
  items: FAQItem[];
}

const categories: FAQCategory[] = [
  {
    key: "general",
    icon: "\u{1F310}",
    label: "General",
    items: [
      {
        q: "What exactly is Solynta Talent?",
        a: "Solynta Talent is a full-service, AI-augmented back-office operations provider. We deploy 41 purpose-built AI agents across 9 business functions \u2014 finance, sales, marketing, HR, customer service, development, data science, enterprise intelligence and inventory \u2014 supervised by experienced human professionals. Think of it as your entire operations team, delivered as a subscription starting from $250/month (\u00A3200/month) instead of hiring $500K+/year in staff.",
      },
      {
        q: "How is this different from traditional outsourcing or freelancers?",
        a: "Traditional outsourcing gives you people. We give you an integrated AI + human system. Our AI agents handle 70\u201385% of cognitive work \u2014 transaction processing, report generation, campaign scheduling, lead scoring, code writing \u2014 at machine speed with zero fatigue. Human specialists handle the remaining 15\u201330%: strategic decisions, quality review, client communication and complex judgment calls. The result is 3\u20135x faster delivery, higher accuracy and a fraction of the cost. Unlike freelancers, you get a coordinated team with built-in workflows, audit trails and accountability.",
      },
      {
        q: "What does the pricing actually include \u2014 are there hidden fees?",
        a: "No hidden fees. Every subscription includes your AI agents, human specialists, the SolyntaFlow platform, all tools and integrations, onboarding, and ongoing support. You start from $250/month (\u00A3200/month) for a single module. Pre-built packages start at $500/month (Startup), $1,000/month (Growth) or $3,000/month (Enterprise). GBP pricing: \u00A3400/month (Startup), \u00A3800/month (Growth) or \u00A32,350/month (Enterprise). You can also build a custom stack using our calculator. Scale up or down with 30 days notice \u2014 no penalties, no lock-in contracts.",
      },
      {
        q: "How quickly can we get started?",
        a: "Most clients are fully operational within 1\u20132 weeks. Step one is a free AI Readiness Consultation (worth $2,500\u2013$5,000) where we audit your current operations. Within days, we connect to your systems, configure your AI agents with your business rules, and go live. There is no lengthy implementation project \u2014 our agents are pre-built and simply need to be trained on your specific data and workflows.",
      },
      {
        q: "How do you handle our sensitive business data?",
        a: "Every engagement starts with a signed NDA. Your data is encrypted at rest and in transit using AES-256 and TLS 1.3. All AI agent actions are logged in a tamper-proof audit trail with confidence scoring \u2014 you can see exactly what was done, when, and by whom. Role-based access controls ensure only authorised personnel touch your data. We never use your data to train models for other clients. Full IP assignment on all work product is standard.",
      },
    ],
  },
  {
    key: "finance",
    icon: "\u{1F4B0}",
    label: "Finance Core",
    items: [
      {
        q: "What finance roles does this module replace?",
        a: "Finance Core replaces up to four full-time hires: a Bookkeeper, Accountant, Payroll Officer and Tax Accountant. Our four AI agents \u2014 The Ledger Keeper, The Controller, The Payroll Officer and The Tax Guardian \u2014 handle transaction posting, bank reconciliation, financial reporting, payroll computation and tax compliance. Processing cadence scales with your tier: Essentials (weekly batch via The Friday Sync), Growth (daily processing with WhatsApp receipt snapping) and Pro (continuous near-real-time with a Dedicated Senior Finance Specialist). You get a complete finance department from $250/month (\u00A3200/month) instead of $15,000+/month in salaries alone.",
      },
      {
        q: "How does AI handle my bookkeeping?",
        a: "The Ledger Keeper agent processes every transaction through AI pattern recognition \u2014 classifying, posting and reconciling with 95%+ accuracy. At Essentials tier, this runs as a weekly batch (The Friday Sync \u2014 you upload a clean CSV bank file by Thursday evening). At Growth tier, processing is daily with WhatsApp receipt snapping. At Pro tier, processing is continuous and near-real-time. It auto-approves routine postings above 90% confidence and flags unusual amounts, new vendors or pattern breaks for human review. Bad data is rejected automatically \u2014 you re-upload, not our staff. A task that takes a human bookkeeper 4\u20136 hours daily is completed in minutes.",
      },
      {
        q: "Who reviews the financial reports before I see them?",
        a: "Every financial statement \u2014 P&L, balance sheet, cash flow, trial balance \u2014 is generated by The Controller agent and then reviewed by a qualified human accountant before delivery. The AI drafts the reports with written commentary explaining variances and trends, and the human validates accuracy, applies professional judgment and ensures compliance. You get the speed of AI with the reliability of professional oversight.",
      },
      {
        q: "How much faster and more accurate is this than an in-house team?",
        a: "Month-end close that typically takes an in-house team 5\u201310 business days is completed in 1\u20132 days. Bank reconciliation runs on your tier\u2019s cadence \u2014 weekly (Essentials), daily (Growth) or continuously (Pro). Payroll computation that takes hours is done in minutes with automatic variance detection. Error rates drop by 80%+ because the AI applies rules consistently \u2014 it never has a bad day, never transposes numbers, never forgets a step. Senior supervisors approve all high-value entries. Essentials has email/ticket support (48hr SLA); Growth and Pro have priority escalation.",
      },
      {
        q: "What if I already use QuickBooks, Xero or Sage?",
        a: "We work alongside your existing accounting software or can fully migrate you to SolyntaFlow \u2014 whichever you prefer. Our AI agents connect via API to QuickBooks, Xero, Sage, FreshBooks and other major platforms. Either way, you get the same AI-augmented service with confidence scoring and human oversight layered on top of your existing tools.",
      },
    ],
  },
  {
    key: "sales",
    icon: "\u{1F4C8}",
    label: "Sales, CRM & Web",
    items: [
      {
        q: "What sales and marketing roles does this replace?",
        a: "This module replaces a Web Developer, SEO Consultant, CRM Specialist and Customer Support Staff \u2014 four roles that would cost $14,200+/month to hire. Our four AI agents handle professional website build/redesign, SEO & Google My Business optimisation, CRM data cleaning & pipeline management, automated lead follow-up, and weekly pipeline/forecast reports. Platforms supported: HubSpot, Pipedrive, Google My Business, WordPress/Webflow, GA4, Mailchimp/ActiveCampaign. A human growth strategist oversees the entire pipeline.",
      },
      {
        q: "How do AI agents manage our sales pipeline?",
        a: "The CRM Specialist agent continuously enriches lead data, scores prospects based on engagement signals, triggers automated follow-up sequences and flags hot leads for human outreach. The Sales Ops Analyst generates weekly pipeline reports with conversion analysis and revenue forecasts. The Growth Engine identifies new lead sources and optimises acquisition channels. Your human strategist focuses on relationship building and closing \u2014 the highest-value activities.",
      },
      {
        q: "Can AI really build and maintain our website?",
        a: "Yes. The Digital Architect agent builds mobile-responsive, SEO-optimised websites using modern frameworks (Next.js, React). It handles landing pages, blog integration, analytics tracking and conversion optimisation. For ongoing maintenance, it monitors site speed, fixes technical SEO issues, updates content and A/B tests layouts \u2014 all supervised by a human developer who reviews code quality and design decisions.",
      },
      {
        q: "What results can we expect and how fast?",
        a: "Most clients see measurable pipeline growth within 30\u201360 days. Website SEO improvements typically show within 60\u201390 days. The AI processes lead data and optimises campaigns 24/7, not just during business hours. Compared to an in-house team, response time to new leads drops from hours to minutes, CRM data accuracy improves by 60%+, and your website stays continuously optimised rather than being updated quarterly.",
      },
      {
        q: "How does the AI + human model work for relationship selling?",
        a: "AI handles everything that doesn\u2019t require a human relationship: research, data enrichment, email drafting, follow-up scheduling, proposal generation and pipeline analytics. Your human strategist handles the calls, the negotiations, the relationship nuances that close deals. This division means your sales capacity multiplies \u2014 the AI creates more at-bats while humans focus on hitting home runs.",
      },
    ],
  },
  {
    key: "customer-service",
    icon: "\u{1F4AC}",
    label: "AI Customer Service",
    items: [
      {
        q: "What customer service roles does this replace?",
        a: "This module replaces 1\u20133 full-time customer service representatives, saving $3,000+/month (\u00A32,400+). Three AI agents \u2014 the WhatsApp Business Bot, Email Inbox AI and Website Chatbot \u2014 handle customer inquiries across WhatsApp, email and web chat around the clock. No per-message fees. They are trained on YOUR business data, not generic responses. Human agents handle complex escalations and sensitive situations.",
      },
      {
        q: "How does the AI handle customer conversations?",
        a: "Each AI agent is trained on your product catalogue, pricing, policies, FAQs and historical support tickets. When a customer reaches out \u2014 via WhatsApp, email or web chat \u2014 the agent understands the context, retrieves relevant information and responds conversationally in seconds. It handles order status, booking queries, payment inquiries, FAQs and routine requests autonomously. Confidence scoring ensures uncertain responses are routed to a human before sending.",
      },
      {
        q: "What happens when the AI can\u2019t answer a question?",
        a: "Every response carries a confidence score. When the AI\u2019s confidence drops below the threshold, it seamlessly escalates to a human agent with full conversation context \u2014 the customer doesn\u2019t have to repeat themselves. The human resolves the issue, and that resolution is fed back into the knowledge base so the AI handles similar queries autonomously next time. Over time, the AI gets smarter and the escalation rate drops.",
      },
      {
        q: "How does 24/7 AI support compare to hiring night-shift staff?",
        a: "A 24/7 human support team requires 3\u20134 shifts of staff \u2014 easily $8,000\u2013$15,000/month. Our AI agents never sleep, never take breaks and respond in under 3 seconds. They handle unlimited concurrent conversations (a human handles 2\u20133 at most). Average response time drops from minutes/hours to seconds. Customer satisfaction typically improves 20\u201330% due to instant, consistent, always-available support.",
      },
      {
        q: "How quickly can the bots be trained on our business?",
        a: "A basic FAQ chatbot is live in 3\u20135 days. Full multi-channel deployment with custom training takes 2\u20133 weeks. We ingest your product documentation, support history, policies and brand voice guidelines. The bots support English, French, Spanish and Portuguese out of the box, with additional languages on request.",
      },
    ],
  },
  {
    key: "hr",
    icon: "\u{1F465}",
    label: "HR & Admin Ops",
    items: [
      {
        q: "What HR and admin roles does this replace?",
        a: "HR & Admin Ops replaces an HR Administrator, Office Manager, Procurement Officer and IT Administrator \u2014 four roles costing $10,000\u2013$14,000/month. Our four AI agents automate onboarding workflows, leave tracking, HR records management, vendor contract digitisation, compliance database maintenance, purchase ordering, IT asset tracking and access provisioning. Platforms managed: BambooHR, Deel, Gusto, Notion/Confluence, Slack/Teams, QuickBooks/Xero. A human HR specialist handles employee relations, performance conversations and sensitive matters.",
      },
      {
        q: "How does AI handle employee onboarding?",
        a: "The HR Admin agent automates the entire onboarding workflow: generates offer letters, triggers document collection, provisions system access, sends welcome emails, creates training schedules and enrols new hires in benefits. What typically takes an HR coordinator 2\u20133 days of manual work per hire is completed in hours. The human specialist handles the personal touch \u2014 the welcome call, team introductions and cultural orientation.",
      },
      {
        q: "How does AI manage procurement without human judgment?",
        a: "The Procurement Agent handles the systematic parts: tracking vendor contracts, generating purchase orders, comparing supplier quotes, monitoring delivery schedules and maintaining spend analytics. Human judgment comes in for strategic sourcing decisions, vendor relationship management, contract negotiations and approval of purchases above threshold amounts. The AI gives you visibility and speed; the human provides the judgment.",
      },
      {
        q: "What\u2019s the advantage over just using HR software like BambooHR?",
        a: "HR software is a tool \u2014 you still need people to run it. We provide the tool AND the team. Our AI agents don\u2019t just store data in BambooHR or Gusto \u2014 they actively manage workflows, send reminders, flag compliance issues, generate reports and take action. And when something needs a human decision, our specialist steps in. You get software + operations, not just software.",
      },
      {
        q: "How do you handle confidential employee data?",
        a: "Role-based access controls ensure only authorised personnel access sensitive HR data. All data is encrypted at rest and in transit. Every access is logged in our audit trail. We sign NDAs covering all employee information. Our AI agents process data without storing it in memory beyond the task \u2014 personal information is never used for model training.",
      },
    ],
  },
  {
    key: "marketing",
    icon: "\u{1F4E3}",
    label: "Marketing",
    items: [
      {
        q: "What marketing roles does this replace?",
        a: "The Marketing module replaces up to seven specialised roles: Social Media Manager, PPC Specialist, Content Writer, SEO Specialist, Video Producer, Marketing Automation Specialist and Analytics Manager. That is $15,000+/month (\u00A312,000+) in salaries replaced by a subscription starting from $500/month (\u00A3400/month). Seven AI agents work under a unified strategy with human creative direction.",
      },
      {
        q: "How does AI create content that sounds like our brand?",
        a: "During onboarding, we ingest your brand guidelines, tone of voice, past content and competitor positioning. The AI agents learn your voice and generate content \u2014 social posts, ad copy, email sequences, blog outlines \u2014 that matches it. Every piece is reviewed by a human content strategist before publishing. The AI handles volume and consistency; the human ensures creative quality and brand alignment.",
      },
      {
        q: "Can AI really manage paid advertising campaigns?",
        a: "Yes \u2014 and often better than humans alone. Our PPC Specialist agent monitors campaigns 24/7, adjusting bids, pausing underperformers and scaling winners in real-time. It processes thousands of data points per hour that a human simply cannot. A/B tests run continuously. Budget is reallocated dynamically based on performance. Human strategists set the overall objectives, review creative direction and make strategic budget decisions.",
      },
      {
        q: "How does the AI + human model outperform a traditional marketing agency?",
        a: "Traditional agencies give you people who work business hours and juggle multiple clients. Our AI agents work 24/7 exclusively on your campaigns. Content is generated in minutes, not weeks. Campaign optimisations happen in real-time, not at monthly reviews. Analytics are continuous, not retrospective. And the cost is a fraction \u2014 you are paying for outcomes, not billable hours. The human layer ensures strategic coherence and creative quality that pure AI cannot deliver.",
      },
      {
        q: "How do you measure and report ROI?",
        a: "Multi-touch attribution tracking connects every marketing dollar to pipeline and revenue. We set up conversion pixels, UTM parameters and direct revenue attribution across all channels. You receive weekly performance dashboards and monthly strategic reports with clear ROI metrics. The Analytics Manager agent continuously monitors channel performance, flags anomalies and recommends budget reallocation to maximise return.",
      },
    ],
  },
  {
    key: "developers",
    icon: "\u{1F4BB}",
    label: "Developers",
    items: [
      {
        q: "What development roles does this replace?",
        a: "Depending on tier, this replaces 1\u20135 development hires: Full Stack Developer, QA Engineer, UI/UX Designer, DevOps Engineer and Tech Lead \u2014 saving $11,150+/month or more. Your developers embed directly in your team: they work in your codebase, use your tools (Slack/Jira/GitHub), attend your standups and deliver within your sprint cycles. Full IP assignment, strict NDAs. AI augmentation means each developer produces 3x the output of a traditional hire.",
      },
      {
        q: "How does AI make your developers 3x faster?",
        a: "Our developers use AI-augmented workflows at every stage: AI pair-programming generates boilerplate code and suggests implementations, AI code review catches bugs before they reach QA, AI testing generates and runs test suites automatically, and AI documentation keeps docs current with code changes. The developer focuses on architecture, complex logic and creative problem-solving \u2014 the high-value work that AI cannot do alone.",
      },
      {
        q: "How do you maintain code quality with AI-generated code?",
        a: "Every line of code goes through a three-layer review: AI-powered static analysis catches common bugs and security issues, then a senior human developer reviews architecture, logic and maintainability, then QA validates functionality through automated and manual testing. AI generates code fast \u2014 humans ensure it is correct, secure and maintainable. The result is higher quality code delivered faster.",
      },
      {
        q: "Can I interview and choose my developer?",
        a: "Absolutely. You meet and approve your developer before any commitment begins. If the fit is not right, we match a different developer at no extra cost. Your developer becomes a genuine part of your team \u2014 they understand your product, your codebase and your goals. This is not anonymous outsourcing; it is an embedded team member.",
      },
      {
        q: "What tech stacks do you cover?",
        a: "React, Next.js, Vue, Angular for frontend. Python, Django, Node.js, Express, Go for backend. PostgreSQL, MongoDB, Redis for databases. AWS, GCP, Azure for cloud. Flutter, React Native, Swift, Kotlin for mobile. Docker, Kubernetes, Terraform for infrastructure. GitHub Actions, Jenkins, CircleCI for CI/CD. We match developers to your stack \u2014 not the other way around.",
      },
    ],
  },
  {
    key: "data-science",
    icon: "\u{1F4CA}",
    label: "Data Science",
    items: [
      {
        q: "What data roles does this replace?",
        a: "Data Science replaces up to six specialised hires: Data Scientist ($150K/yr), Data Engineer ($135K/yr), ML Engineer ($155K/yr), Business Analyst ($90K/yr), BI Developer ($95K/yr) and Data Analyst ($85K/yr) \u2014 a team that would cost $45,200+/month ($840K+/year). Six AI agents handle everything from data cleaning and ETL pipelines to predictive models, dashboards and strategic analysis. Toolkit includes Python, R, SQL, scikit-learn, TensorFlow, PyTorch, Spark, Airflow, dbt, Snowflake/BigQuery, Power BI/Tableau/Looker, AWS SageMaker/Azure ML/Vertex AI. A senior human data scientist validates all models and insights.",
      },
      {
        q: "How do AI agents build and deploy ML models?",
        a: "The ML Engineer agent handles the full lifecycle: data preparation, feature engineering, model selection, training, validation and deployment. It evaluates multiple algorithms, tunes hyperparameters and selects the best-performing model. The Data Engineer agent builds the ETL pipelines that feed it. A human data scientist reviews model architecture, validates assumptions and ensures the model solves the right business problem \u2014 not just a technical one.",
      },
      {
        q: "What kind of business insights can we expect?",
        a: "From day one: KPI dashboards connecting your finance, sales, marketing and operational data. Within weeks: customer segmentation, churn prediction, CLV modelling, demand forecasting and revenue projection. At enterprise tier: real-time analytics, streaming pipelines, custom AI features for your product and generative AI integration. Every insight is delivered with clear business context \u2014 not just numbers, but what they mean and what to do about them.",
      },
      {
        q: "How is this affordable when data scientists cost $150K\u2013$200K/year each?",
        a: "AI agents handle 80%+ of the heavy lifting: data cleaning, pipeline construction, model training, report generation and dashboard updates. They work 24/7 and scale infinitely. The human data scientist focuses on the 20% that requires domain expertise, strategic thinking and business judgment. You get the output of a full data team at a fraction of the cost because the AI multiplies human capability rather than replacing it entirely.",
      },
      {
        q: "Do we need existing data infrastructure to start?",
        a: "No. At the Essentials tier ($250/month / \u00A3200/month), we work with whatever data you have \u2014 spreadsheets, CSVs, your existing software exports. We clean it, structure it and build dashboards on top. For advanced analytics, we set up a lightweight data warehouse (BigQuery, Snowflake or PostgreSQL) as part of onboarding at no extra cost. You do not need to be \u201Cdata-ready\u201D to start \u2014 getting you data-ready is part of the service.",
      },
    ],
  },
  {
    key: "enterprise-intel",
    icon: "\u{1F9E0}",
    label: "Enterprise Intel.",
    items: [
      {
        q: "What strategic roles does this replace?",
        a: "Enterprise Intelligence replaces a Chief Strategy Officer, Business Intelligence Director, Compliance Officer and Knowledge Manager \u2014 roles costing $40,000\u2013$69,000+/month combined. Four AI agents \u2014 The Insight Engine ($12K\u2013$18K/mo equivalent), Strategy Advisor ($15K\u2013$25K/mo), Audit Sentinel ($10K\u2013$15K/mo) and Knowledge Architect ($5K\u2013$8K/mo) \u2014 provide the strategic intelligence layer that turns data into decisions. Deliverables include weekly/monthly KPI dashboards, competitor benchmarking, board-ready executive intelligence packs, AI audit trails, and quarterly scenario & forecast reviews. A senior human strategist ensures insights are actionable and aligned with your business goals.",
      },
      {
        q: "How does AI provide strategic business intelligence?",
        a: "The Insight Engine agent pulls data from all your active Solynta Talent modules \u2014 finance, sales, marketing, HR, inventory \u2014 into unified executive dashboards. It identifies cross-functional patterns that siloed teams would miss. The Strategy Advisor generates competitor benchmarking, market intelligence and scenario modelling. This is not just reporting \u2014 it is AI-powered strategic thinking, with a human strategist validating every recommendation.",
      },
      {
        q: "What is AI governance and why do I need it?",
        a: "Every AI agent in your Solynta Talent stack produces a confidence score with every action. The Audit Sentinel tracks all these scores, flags low-confidence decisions for human review, maintains a complete audit trail and generates governance reports. This means you always know what the AI did, how confident it was, and whether a human verified it. For regulated industries, this is compliance built-in. For everyone else, it is peace of mind.",
      },
      {
        q: "How does this module connect to the other services?",
        a: "Enterprise Intelligence sits above all other modules as the strategic layer. It aggregates data from Finance (revenue, costs, cash flow), Sales (pipeline, conversion), Marketing (ROI, attribution), HR (headcount, costs) and Inventory (stock levels, demand) into unified views. The more modules you run, the more powerful the intelligence. It can also work standalone with your existing data sources.",
      },
      {
        q: "What do the executive intelligence packs include?",
        a: "Monthly (or weekly at higher tiers) packs include: cross-business KPI dashboard with trend analysis, competitor benchmarking report, AI confidence and governance summary, strategic recommendations with supporting data, risk alerts and opportunity identification, and SOP documentation updates. At enterprise tier, you get real-time dashboards with live KPI alerts and a dedicated senior strategist.",
      },
    ],
  },
  {
    key: "inventory",
    icon: "\u{1F4E6}",
    label: "Inventory",
    items: [
      {
        q: "What inventory and supply chain roles does this replace?",
        a: "Inventory Management replaces an Inventory Controller, Procurement Analyst, Demand Forecaster and Warehouse Manager \u2014 four roles costing $18,700\u2013$44,900+/month depending on scale. Four AI agents manage your entire supply chain: real-time stock tracking with unlimited SKUs, automated purchase ordering with 3-way matching, AI-powered demand forecasting, and warehouse operations with barcode/RFID workflows. Supports manufacturing (BOM/MRP), retail/e-commerce (multi-store sync), and wholesale/distribution (batch/lot tracking, pick/pack/dispatch). Integrates with Shopify, WooCommerce, Amazon, QuickBooks/Xero. A human supply chain specialist handles vendor negotiations and strategic sourcing decisions.",
      },
      {
        q: "How does AI-powered demand forecasting work?",
        a: "The Demand Forecaster agent analyses your historical sales data, seasonal patterns, market trends, promotional calendars and external signals (weather, economic indicators) to predict future demand at the SKU level. It reaches 85\u201392% accuracy after 3 months of calibration. Purchase orders are triggered automatically when stock hits reorder points, adjusted dynamically by the forecast. Overstocking and stockouts both decrease dramatically.",
      },
      {
        q: "Can this handle multi-warehouse and multi-site operations?",
        a: "Yes. From the Growth tier, you get up to 5 warehouse locations (unlimited at Enterprise) with real-time stock visibility across all sites. The Warehouse Manager agent optimises stock allocation between locations, manages inter-warehouse transfers and coordinates dispatch from the optimal location. Multi-currency and multi-company support is included at Enterprise tier for international operations.",
      },
      {
        q: "How does this integrate with our e-commerce platform?",
        a: "Direct two-way sync with Shopify, WooCommerce, Magento, Amazon and eBay. When an order comes in, stock levels update in real-time across all channels. The AI prevents overselling, manages backorder workflows and triggers reorder alerts. For custom platforms, we connect via API and webhooks. Setup typically takes 2\u20133 days per platform.",
      },
      {
        q: "What about manufacturing \u2014 BOM and MRP?",
        a: "Growth and Enterprise tiers include full manufacturing support: multi-level Bills of Materials (BOM), Material Requirements Planning (MRP) runs, work order management and production scheduling. The AI calculates raw material requirements based on production plans and demand forecasts, then generates purchase orders automatically. A human production manager reviews and approves production schedules.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active =
    categories.find((c) => c.key === activeCategory) ?? categories[0];

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Frequently Asked Questions
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Everything you need to know.
            </h2>
            <p className="text-ghost/70 max-w-2xl mx-auto">
              How 41 AI agents and expert humans deliver enterprise operations at
              startup prices.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={100}>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-thin justify-start lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-teal/15 text-teal border-teal/30"
                    : "bg-transparent text-ghost/60 border-white/5 hover:border-white/10 hover:text-ghost"
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {active.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={`${active.key}-${i}`} delay={i * 60}>
                <div className="border-b border-white/5">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-white-soft font-medium text-base pr-8 group-hover:text-teal transition-colors duration-300">
                      {item.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-teal flex-shrink-0 transition-transform duration-300 ${
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
                    <p className="text-sm text-ghost/80 leading-relaxed">
                      {item.a}
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
