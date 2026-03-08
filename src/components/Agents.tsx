"use client";
import ScrollReveal from "./ScrollReveal";

const agentGroups = [
  {
    module: "Finance",
    color: "border-teal/30 bg-teal/5",
    tagColor: "bg-teal/10 text-teal",
    agents: [
      { name: "Bookkeeper", desc: "Daily posting, bank reconciliation, AP/AR, invoicing" },
      { name: "Accountant", desc: "Month-end close, P&L, balance sheet, management packs" },
      { name: "Payroll Officer", desc: "Salary computation, statutory deductions, payslips" },
      { name: "Tax Accountant", desc: "VAT/WHT calculations, filing prep, compliance" },
    ],
  },
  {
    module: "Sales & CRM",
    color: "border-lavender/30 bg-lavender/5",
    tagColor: "bg-lavender/10 text-lavender",
    agents: [
      { name: "Web Developer", desc: "Website build, landing pages, mobile-responsive design" },
      { name: "SEO Specialist", desc: "Keyword research, on-page SEO, rank tracking" },
      { name: "CRM Specialist", desc: "Data cleaning, lead follow-up automation, enrichment" },
      { name: "Sales Ops", desc: "Pipeline reports, forecasts, outreach drafting" },
    ],
  },
  {
    module: "Customer Service",
    color: "border-coral/30 bg-coral/5",
    tagColor: "bg-coral/10 text-coral",
    agents: [
      { name: "WhatsApp Bot", desc: "24/7 FAQ, order status, booking queries, escalation" },
      { name: "Email Triage", desc: "Auto-triage, priority sorting, reply drafting" },
      { name: "Website Chatbot", desc: "Lead capture, product queries, appointment booking" },
    ],
  },
  {
    module: "HR & Admin",
    color: "border-gold/30 bg-gold/5",
    tagColor: "bg-gold/10 text-gold",
    agents: [
      { name: "HR Administrator", desc: "Onboarding, leave tracking, performance reviews" },
      { name: "Procurement", desc: "PO generation, vendor contracts, invoice approvals" },
      { name: "IT Admin", desc: "SaaS license tracking, user provisioning, security" },
    ],
  },
  {
    module: "Marketing",
    color: "border-pink-400/30 bg-pink-400/5",
    tagColor: "bg-pink-400/10 text-pink-400",
    agents: [
      { name: "Social Media Mgr", desc: "Content calendar, multi-platform posting, community" },
      { name: "PPC Specialist", desc: "Google/Meta/LinkedIn ads, bid optimization" },
      { name: "Content Marketer", desc: "Blog articles, lead magnets, newsletters" },
      { name: "SEO Content", desc: "Keyword-optimized content, gap analysis" },
      { name: "Video Producer", desc: "Short-form scripts, storyboards, creative briefs" },
      { name: "Marketing Automation", desc: "Email drips, retargeting, lead scoring" },
      { name: "Marketing Analytics", desc: "Campaign ROI, attribution, A/B test analysis" },
    ],
  },
  {
    module: "Enterprise Intelligence",
    color: "border-emerald-400/30 bg-emerald-400/5",
    tagColor: "bg-emerald-400/10 text-emerald-400",
    agents: [
      { name: "BI Analyst", desc: "KPI dashboards, forecasting, board-ready reports" },
      { name: "Strategy Advisor", desc: "Competitor benchmarking, scenario modelling, risk" },
    ],
  },
  {
    module: "Quality & Compliance",
    color: "border-cyan-400/30 bg-cyan-400/5",
    tagColor: "bg-cyan-400/10 text-cyan-400",
    agents: [
      { name: "QA Reviewer", desc: "Confidence-based review, audit trail, compliance" },
      { name: "Onboarding", desc: "AI readiness data gathering, SOP capture, KB building" },
    ],
  },
];

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
            25 purpose-built AI agents
          </h2>
          <p className="text-ghost text-lg max-w-2xl mb-6">
            Each agent is trained on your business data, operates within strict confidence
            guardrails, and is supervised by human specialists at every step.
          </p>

          {/* Escalation matrix inline */}
          <div className="flex flex-wrap gap-3 mb-16">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              &gt;90% confidence → Auto-approved
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20">
              70–90% → Operator review
            </span>
            <span className="px-3 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-medium border border-coral/20">
              &lt;70% → Escalated to Supervisor
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
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm">🤖</span>
                        <span className="font-semibold text-sm text-white-soft">
                          {a.name}
                        </span>
                      </div>
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
