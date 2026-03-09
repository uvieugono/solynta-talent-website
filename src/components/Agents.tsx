"use client";
import ScrollReveal from "./ScrollReveal";

const agentGroups = [
  {
    module: "Finance",
    color: "border-teal/30 bg-teal/5",
    tagColor: "bg-teal/10 text-teal",
    agents: [
      { name: "The Ledger Keeper", role: "Bookkeeper", desc: "Daily posting, bank reconciliation, AP/AR, invoicing, expense management" },
      { name: "The Controller", role: "Accountant", desc: "Month-end close, P&L, balance sheet, variance analysis, management packs" },
      { name: "The Payroll Officer", role: "Payroll", desc: "Salary computation, statutory deductions, payslips, remittance scheduling" },
      { name: "The Tax Guardian", role: "Tax Compliance", desc: "VAT/WHT calculations, filing prep, deadline management, compliance" },
    ],
  },
  {
    module: "Sales & CRM",
    color: "border-lavender/30 bg-lavender/5",
    tagColor: "bg-lavender/10 text-lavender",
    agents: [
      { name: "The Growth Engine", role: "Sales & CRM", desc: "Pipeline management, lead enrichment, outreach, forecasting, deal tracking" },
      { name: "The Digital Architect", role: "Web & SEO", desc: "Website management, keyword research, technical SEO, Google My Business" },
      { name: "The CRM Specialist", role: "CRM Data", desc: "Data cleaning, lead follow-up automation, enrichment, pipeline hygiene" },
      { name: "The Sales Ops Analyst", role: "Sales Analytics", desc: "Pipeline reports, revenue forecasting, conversion rate analysis, team performance" },
    ],
  },
  {
    module: "Customer Service",
    color: "border-coral/30 bg-coral/5",
    tagColor: "bg-coral/10 text-coral",
    agents: [
      { name: "The 24/7 Responder", role: "Multi-Channel", desc: "WhatsApp, email, web chat — 24/7 availability with escalation routing" },
      { name: "The Email Triage Agent", role: "Email Intelligence", desc: "Auto-triage, priority sorting, reply drafting, urgent case flagging" },
      { name: "The Website Chatbot", role: "Web Chat", desc: "Lead capture, product queries, appointment booking, knowledge base search" },
    ],
  },
  {
    module: "HR & Admin",
    color: "border-gold/30 bg-gold/5",
    tagColor: "bg-gold/10 text-gold",
    agents: [
      { name: "The HR Administrator", role: "HR Operations", desc: "Onboarding, leave tracking, performance reviews, compliance" },
      { name: "The Procurement Officer", role: "Procurement", desc: "PO generation, vendor contracts, invoice approvals, budget checking" },
      { name: "The IT Admin", role: "IT Operations", desc: "SaaS license tracking, user provisioning, security compliance" },
    ],
  },
  {
    module: "Marketing",
    color: "border-pink-400/30 bg-pink-400/5",
    tagColor: "bg-pink-400/10 text-pink-400",
    agents: [
      { name: "Social Media Manager", role: "Social Media", desc: "Content calendar, multi-platform posting, community, Canva briefs" },
      { name: "PPC Specialist", role: "Paid Ads", desc: "Google/Meta/LinkedIn ads, bid optimization, retargeting, budgets" },
      { name: "Content Marketer", role: "Content Strategy", desc: "Blog articles, lead magnets, newsletters, campaign calendars" },
      { name: "SEO Content Strategist", role: "SEO Programme", desc: "Keyword-optimized content, gap analysis, backlink strategy, technical SEO" },
      { name: "Video Producer", role: "Video Content", desc: "Short-form scripts, storyboards, creative briefs, platform formatting" },
      { name: "Marketing Automator", role: "Automation", desc: "Email drips, retargeting, lead scoring, conversion optimization" },
      { name: "Marketing Analyst", role: "Analytics", desc: "Campaign ROI, attribution, A/B tests, competitor intelligence" },
      { name: "Academy US Campaign Manager", role: "Campaign Ops", desc: "30-day content calendars, social posting orchestration, campaign metrics" },
    ],
  },
  {
    module: "Enterprise Intelligence",
    color: "border-emerald-400/30 bg-emerald-400/5",
    tagColor: "bg-emerald-400/10 text-emerald-400",
    agents: [
      { name: "The Insight Engine", role: "Analytics & BI", desc: "Cross-business KPI dashboards, forecasting, board-ready executive reports" },
      { name: "The Strategy Advisor", role: "Strategic Intelligence", desc: "Competitor benchmarking, scenario modelling, risk assessment, growth strategy" },
    ],
  },
  {
    module: "Quality & Compliance",
    color: "border-cyan-400/30 bg-cyan-400/5",
    tagColor: "bg-cyan-400/10 text-cyan-400",
    agents: [
      { name: "The Audit Sentinel", role: "Compliance", desc: "Confidence-based review, audit trail, compliance monitoring, escalation enforcement" },
      { name: "The Knowledge Architect", role: "Onboarding", desc: "Client data ingestion, AI readiness, SOP extraction, knowledge base building" },
    ],
  },
];

const totalAgents = agentGroups.reduce((sum, g) => sum + g.agents.length, 0);

export default function Agents() {
  return (
    <section id="agents" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-lavender/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
            Your AI Workforce
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            {totalAgents} purpose-built AI agents
          </h2>
          <p className="text-ghost text-lg max-w-2xl mb-6">
            Each agent is trained on your business data, operates within strict confidence
            guardrails, and is supervised by human specialists at every step.
          </p>

          {/* Escalation matrix inline */}
          <div className="flex flex-wrap gap-3 mb-16">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              &gt;90% confidence &rarr; Auto-approved
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20">
              70&ndash;90% &rarr; Operator review
            </span>
            <span className="px-3 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-medium border border-coral/20">
              &lt;70% &rarr; Escalated to Supervisor
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {agentGroups.map((g, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className={`rounded-2xl border ${g.color} p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${g.tagColor}`}
                  >
                    {g.module}
                  </span>
                  <span className="text-xs text-ghost/50">
                    {g.agents.length} agent{g.agents.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {g.agents.map((a, j) => (
                    <div
                      key={j}
                      className="p-4 rounded-xl bg-midnight/40 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">🤖</span>
                        <span className="font-semibold text-sm text-white-soft">
                          {a.name}
                        </span>
                      </div>
                      <p className={`text-[10px] uppercase tracking-wider font-medium mb-1.5 ${g.tagColor.split(" ")[1]}`}>
                        {a.role}
                      </p>
                      <p className="text-xs text-ghost/70 leading-relaxed">
                        {a.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
