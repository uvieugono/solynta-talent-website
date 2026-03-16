"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface UseCaseFunction {
  name: string;
  desc: string;
}

interface UseCase {
  key: string;
  icon: string;
  title: string;
  stat: string;
  statSource: string;
  summary: string;
  problem: string;
  solution: string;
  functions: UseCaseFunction[];
  modules: string[];
  color: string;
}

const useCases: UseCase[] = [
  {
    key: "theft",
    icon: "\u{1F6E1}\uFE0F",
    title: "Eliminate Theft",
    stat: "1.4\u20135% of revenue",
    statSource:
      "Lost to employee theft annually \u2014 National Retail Federation / EY Emerging Markets Survey",
    summary:
      "AI-powered inventory tracking cross-referenced with PoS transactions automatically identifies where stock is unaccounted for \u2014 in real time, not months later.",
    problem:
      "Employee theft and inventory shrinkage are among the largest hidden costs in retail and distribution. Most businesses only discover losses during periodic stock counts \u2014 by which time the damage is done and the trail is cold. In emerging markets, weak internal controls make the problem worse: EY estimates retail shrinkage at 3\u20135% of revenue for SMEs without automated tracking.",
    solution:
      "Solynta Talent\u2019s Inventory module tracks every stock movement in real time and cross-references it against Point-of-Sale transactions automatically. When stock moves without a corresponding sale, return, or transfer, the AI flags the discrepancy immediately \u2014 not at the next stock count. The system identifies patterns: specific shifts with higher shrinkage, locations with unusual write-offs, SKUs that consistently go missing. Finance Core reconciles daily cash deposits against expected revenue from sales, catching cash theft alongside inventory theft. Enterprise Intelligence aggregates everything into theft risk dashboards with trend analysis.",
    functions: [
      {
        name: "Real-time stock movement tracking",
        desc: "Every receipt, sale, transfer, and adjustment logged instantly",
      },
      {
        name: "Automated PoS cross-referencing",
        desc: "AI matches inventory changes against sales transactions, flags unmatched movements",
      },
      {
        name: "Shrinkage pattern detection",
        desc: "Identifies high-risk shifts, locations, employees, and SKUs using ML analysis",
      },
      {
        name: "Cash reconciliation",
        desc: "Finance module matches daily bank deposits against expected PoS revenue",
      },
      {
        name: "Theft risk dashboards",
        desc: "Enterprise Intelligence aggregates inventory and cash anomalies into executive views",
      },
      {
        name: "Tamper-proof audit trail",
        desc: "Every inventory adjustment requires justification and is permanently logged",
      },
    ],
    modules: ["Inventory Management", "Finance Core", "Enterprise Intelligence"],
    color: "text-coral",
  },
  {
    key: "costs",
    icon: "\u{1F4C9}",
    title: "Reduce Operational Costs",
    stat: "30\u201350% cost reduction",
    statSource:
      "Typical savings when replacing manual operations with AI-augmented workflows \u2014 Solynta Talent client data",
    summary:
      "Replace $500K+/year in staff costs with AI agents that handle 70\u201385% of cognitive work, supervised by human specialists. One platform replaces 5\u201310 SaaS subscriptions.",
    problem:
      "Growing businesses drown in operational overhead. A complete back-office team \u2014 bookkeeper, accountant, HR manager, marketing team, customer service reps, IT admin \u2014 costs $500,000+/year in salaries alone. On top of that, each function runs on different software: QuickBooks for finance, BambooHR for people, HubSpot for CRM, Mailchimp for marketing. These tools don\u2019t talk to each other, creating data silos and duplicate work. Most SMEs spend 60\u201370% of revenue on operations and overhead.",
    solution:
      "Solynta Talent replaces this fragmented, expensive model with a single AI-augmented operations partner. 41 AI agents handle the repetitive cognitive work \u2014 transaction posting, payroll calculation, email triage, social media scheduling, lead scoring, report generation \u2014 at machine speed, 24/7, with zero fatigue. Human specialists focus exclusively on judgment calls, strategy, and quality review. SolyntaFlow unifies all functions in one platform, eliminating redundant SaaS subscriptions. You start from $250/month per module instead of $15,000+/month per department.",
    functions: [
      {
        name: "AI-automated bookkeeping & reconciliation",
        desc: "Daily, not monthly, with 95%+ accuracy",
      },
      {
        name: "Payroll computation in minutes",
        desc: "Salary, deductions, payslips, statutory contributions",
      },
      {
        name: "Procurement automation",
        desc: "PO generation, vendor comparison, spend tracking",
      },
      {
        name: "Unified SolyntaFlow platform",
        desc: "Replaces QuickBooks + BambooHR + HubSpot + Mailchimp + Zendesk",
      },
      {
        name: "Pay-as-you-grow pricing",
        desc: "Start with one module ($250/mo), add more as needed, scale down with 30 days notice",
      },
      {
        name: "No HR overhead",
        desc: "No recruitment, no training, no turnover, no benefits administration for operations staff",
      },
    ],
    modules: [
      "Finance Core",
      "HR & Admin Ops",
      "Marketing Department",
      "AI Customer Service",
      "Sales, CRM & Web",
    ],
    color: "text-teal",
  },
  {
    key: "sales",
    icon: "\u{1F680}",
    title: "Increase Sales",
    stat: "35\u201350% more leads converted",
    statSource:
      "Businesses with 24/7 response capability vs business-hours-only \u2014 Harvard Business Review / InsideSales.com",
    summary:
      "AI chat agents respond to customer enquiries in seconds, 24/7, while CRM automation ensures no lead falls through the cracks. Your sales pipeline never sleeps.",
    problem:
      "Most SMEs lose sales because they can\u2019t respond fast enough. A potential customer visits your website at 9PM, sends a WhatsApp message, gets no reply until the next morning \u2014 and by then they\u2019ve found a competitor. Research shows that responding to a lead within 5 minutes makes you 21x more likely to qualify them, yet the average SME response time is 42 hours. Meanwhile, leads in the CRM go cold because nobody follows up consistently.",
    solution:
      "Solynta Talent deploys AI chat agents across WhatsApp, web chat and email that respond to customer enquiries in under 3 seconds \u2014 24 hours a day, 7 days a week. These aren\u2019t generic chatbots; they\u2019re trained on YOUR products, pricing, and policies. When a lead needs human attention, they\u2019re escalated with full context. The CRM Specialist agent scores every lead, triggers automated follow-up sequences, and flags hot prospects for human outreach. The Sales Ops Analyst generates weekly pipeline reports identifying exactly where conversions are dropping off.",
    functions: [
      {
        name: "24/7 AI chat agents",
        desc: "WhatsApp, web chat, email, trained on your business data",
      },
      {
        name: "Sub-3-second response time",
        desc: "Every enquiry answered instantly, day or night",
      },
      {
        name: "Automated lead scoring",
        desc: "AI ranks prospects by engagement, fit, and buying signals",
      },
      {
        name: "Follow-up sequences",
        desc: "Automated nurture emails and messages triggered by lead behaviour",
      },
      {
        name: "Pipeline analytics",
        desc: "Weekly reports showing conversion rates, bottlenecks, and revenue forecasts",
      },
      {
        name: "Human escalation with context",
        desc: "Hot leads routed to your sales team with full conversation history",
      },
    ],
    modules: [
      "AI Customer Service",
      "Sales, CRM & Web",
      "Marketing Department",
      "Enterprise Intelligence",
    ],
    color: "text-gold",
  },
  {
    key: "lending",
    icon: "\u{1F3E6}",
    title: "Unlock Bank Lending",
    stat: "70% of SME loans rejected",
    statSource:
      "Due to inadequate financial records in emerging markets \u2014 IFC / World Bank SME Finance Report",
    summary:
      "AI-maintained, audit-ready books with daily reconciliation mean you always have bank-ready financials \u2014 not scrambled together at application time.",
    problem:
      "Banks don\u2019t reject SME loan applications because the business isn\u2019t viable \u2014 they reject them because the financial records are unreliable. Months of unreconciled transactions, missing invoices, no cash flow statements, no management commentary. When the loan officer asks for 12 months of financials, most SMEs scramble to produce something presentable \u2014 and it shows. The IFC estimates that 70% of SME loan applications in emerging markets fail due to inadequate documentation. This locks viable businesses out of the growth capital they need.",
    solution:
      "Solynta Talent\u2019s Finance Core maintains your books to audit-ready standard every single day \u2014 not just at year-end or when the bank asks. Bank feeds are reconciled daily with 95%+ accuracy. Monthly P&L, balance sheet, cash flow statements and trial balance are generated automatically with AI-written management commentary explaining variances and trends. Tax compliance stays current. When you need a bank package, it\u2019s already done \u2014 you export it, not build it. The Controller agent can produce custom financial packages tailored to specific lender requirements on demand.",
    functions: [
      {
        name: "Daily automated bookkeeping",
        desc: "Every transaction classified, posted, and reconciled against bank feeds",
      },
      {
        name: "Monthly financial statements",
        desc: "P&L, balance sheet, cash flow, trial balance generated automatically",
      },
      {
        name: "AI-written management commentary",
        desc: "Variances, trends, and performance context explained in plain English",
      },
      {
        name: "Tax compliance",
        desc: "VAT/WHT calculations current, filing deadlines tracked, remittances scheduled",
      },
      {
        name: "Bank-ready packages on demand",
        desc: "12-month financials, cash flow projections, management packs exported instantly",
      },
      {
        name: "Audit trail",
        desc: "Every transaction has a complete, tamper-proof history for due diligence",
      },
    ],
    modules: ["Finance Core", "Enterprise Intelligence"],
    color: "text-lavender",
  },
  {
    key: "intelligence",
    icon: "\u{1F9E0}",
    title: "Improve Business Intelligence",
    stat: "23x more likely to acquire customers",
    statSource:
      "Companies using data-driven decision making \u2014 McKinsey Global Institute",
    summary:
      "AI aggregates data from every department into unified dashboards with predictive analytics, competitor benchmarking, and strategic recommendations. No more gut-feel decisions.",
    problem:
      "Most SMEs make decisions based on gut feeling, outdated spreadsheets, or a single metric they happen to track. Finance data lives in QuickBooks, sales data in a CRM, marketing data in Google Analytics, inventory in a spreadsheet. Nobody connects the dots: which marketing channel drives the most profitable customers? Which products have declining margins? Which customers are about to churn? Without unified intelligence, businesses react to problems instead of preventing them.",
    solution:
      "Solynta Talent\u2019s Enterprise Intelligence module sits above all other modules and aggregates data from finance, sales, marketing, HR, and inventory into unified executive dashboards. The Insight Engine identifies cross-functional patterns that siloed teams would never spot. The Strategy Advisor generates competitor benchmarking and scenario modelling. Data Science builds predictive models \u2014 customer churn, demand forecasting, CLV, dynamic pricing. Every insight comes with clear business context and actionable recommendations, not just numbers.",
    functions: [
      {
        name: "Cross-department KPI dashboards",
        desc: "Finance, sales, marketing, HR, inventory in one unified view",
      },
      {
        name: "AI pattern detection",
        desc: "Identifies cross-functional trends, anomalies, and opportunities automatically",
      },
      {
        name: "Competitor benchmarking",
        desc: "Market intelligence reports comparing your performance to industry peers",
      },
      {
        name: "Predictive analytics",
        desc: "Churn prediction, demand forecasting, customer lifetime value modelling",
      },
      {
        name: "Board-ready intelligence packs",
        desc: "Monthly/weekly reports with strategic recommendations",
      },
      {
        name: "Real-time alerts",
        desc: "AI notifies you of significant metric changes before they become problems",
      },
    ],
    modules: [
      "Enterprise Intelligence",
      "Data Science",
      "Finance Core",
      "Sales, CRM & Web",
      "Inventory Management",
    ],
    color: "text-ice",
  },
];

const moduleIcons: Record<string, string> = {
  "Finance Core": "\u{1F4B0}",
  "Inventory Management": "\u{1F4E6}",
  "Enterprise Intelligence": "\u{1F9E0}",
  "HR & Admin Ops": "\u{1F465}",
  "Marketing Department": "\u{1F4E3}",
  "AI Customer Service": "\u{1F4AC}",
  "Sales, CRM & Web": "\u{1F4C8}",
  "Data Science": "\u{1F4CA}",
  "Embedded Developers": "\u{1F4BB}",
};

export default function UseCases() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const active = useCases.find((u) => u.key === activeKey);

  const handleCardClick = (key: string) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <section id="use-cases" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              What You Gain
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Real outcomes. Not promises.
            </h2>
            <p className="text-ghost/70 max-w-2xl mx-auto">
              Five ways Solynta Talent transforms your business operations
              &mdash; backed by data.
            </p>
          </div>
        </ScrollReveal>

        {/* Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.key} delay={i * 80}>
              <button
                onClick={() => handleCardClick(uc.key)}
                className={`w-full text-left p-7 rounded-2xl border transition-all duration-300 group ${
                  activeKey === uc.key
                    ? "bg-slate-dark/50 border-teal/30 shadow-lg shadow-teal/5"
                    : "bg-slate-dark/30 border-white/5 hover:border-white/10 hover:-translate-y-1"
                }`}
              >
                <span className="text-3xl block mb-4">{uc.icon}</span>
                <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                  {uc.title}
                </h3>
                <p
                  className={`text-sm font-semibold ${uc.color} mb-3 font-[var(--font-mono)]`}
                >
                  {uc.stat}
                </p>
                <p className="text-sm text-ghost/70 leading-relaxed">
                  {uc.summary}
                </p>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Detail Panel */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            active ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {active && (
            <div className="max-w-4xl mx-auto mt-4 p-8 rounded-2xl bg-slate-dark/40 border border-white/5 relative">
              {/* Close button */}
              <button
                onClick={() => setActiveKey(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-ghost hover:text-white-soft"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h3
                    className={`font-[var(--font-display)] text-xl font-bold ${active.color} mb-4`}
                  >
                    {active.icon} {active.title}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-ghost/50 mb-2">
                      The Problem
                    </h4>
                    <p className="text-sm text-ghost/80 leading-relaxed">
                      {active.problem}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-ghost/50 mb-2">
                      How We Solve It
                    </h4>
                    <p className="text-sm text-ghost/80 leading-relaxed">
                      {active.solution}
                    </p>
                  </div>

                  {/* Stat Callout */}
                  <div
                    className={`rounded-xl p-5 bg-white/[0.03] border-l-4 ${active.color.replace("text-", "border-")}`}
                  >
                    <p
                      className={`text-2xl font-bold ${active.color} font-[var(--font-display)] mb-1`}
                    >
                      {active.stat}
                    </p>
                    <p className="text-xs text-ghost/50">{active.statSource}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-ghost/50 mb-4">
                    Key Functions
                  </h4>
                  <div className="space-y-3 mb-8">
                    {active.functions.map((fn, i) => (
                      <div key={i} className="flex gap-3">
                        <svg
                          className={`w-5 h-5 ${active.color} flex-shrink-0 mt-0.5`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-white-soft">
                            {fn.name}
                          </p>
                          <p className="text-xs text-ghost/60">{fn.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs uppercase tracking-[0.2em] text-ghost/50 mb-3">
                    Powered By
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.modules.map((mod) => (
                      <span
                        key={mod}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-ghost/80"
                      >
                        <span>{moduleIcons[mod] ?? ""}</span>
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
