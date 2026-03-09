"use client";
import ScrollReveal from "./ScrollReveal";

export default function DeliveryModel() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-slate-dark to-midnight" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/[0.03] blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              How We Deliver
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              AI + Human Excellence
            </h2>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              Across every service module, AI handles 70&ndash;85% of the cognitive work.
              Trained specialists review, approve and escalate &mdash; so you get speed, accuracy and accountability at a fraction of the cost.
            </p>
          </div>
        </ScrollReveal>

        {/* Two columns: AI vs Human */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <ScrollReveal delay={0}>
            <div className="p-8 rounded-2xl bg-teal/5 border border-teal/15 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-bold text-teal">
                    40 AI Agents
                  </h3>
                  <p className="text-xs text-ghost/60">Handle 70&ndash;85% of every workflow</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Classify, categorise and route incoming data",
                  "Draft reports, emails, content and code",
                  "Reconcile records across platforms and sources",
                  "Detect anomalies, variances and risks",
                  "Forecast trends, demand and cash flow",
                  "Score leads, tickets and transactions by confidence",
                  "Automate repetitive workflows end-to-end",
                  "Surface insights from cross-module data",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ghost/80">
                    <span className="text-teal mt-0.5">⚡</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="p-8 rounded-2xl bg-lavender/5 border border-lavender/15 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-bold text-lavender">
                    Our Specialists
                  </h3>
                  <p className="text-xs text-ghost/60">Review, approve &amp; escalate</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Review & approve every AI-generated output",
                  "Validate complex or high-risk decisions",
                  "Escalate edge cases to senior supervisors",
                  "Communicate with your team in professional English",
                  "Quality-check all deliverables before handoff",
                  "Manage compliance, audit trails and governance",
                  "Coordinate workflows across service modules",
                  "Maintain your knowledge base, SOPs and context",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ghost/80">
                    <span className="text-lavender mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Three-tier model */}
        <ScrollReveal delay={200}>
          <h3 className="font-[var(--font-display)] text-2xl font-bold text-center mb-8">
            Three-tier delivery model
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tier: "Tier 1",
              title: "AI Ops Specialists",
              subtitle: "Your Day-to-Day Team",
              items: [
                "Trained operators across all 8 modules",
                "Review & approve AI suggestions",
                "Dedicated point of contact per service",
                "Client comms in professional English",
              ],
              color: "border-teal/20",
            },
            {
              tier: "Tier 2",
              title: "Senior Supervisors",
              subtitle: "Quality Gate",
              items: [
                "Domain experts (finance, tech, marketing)",
                "Handle complex or high-value decisions",
                "Approve high-risk outputs before delivery",
                "Monthly review & quality assurance",
              ],
              color: "border-gold/20",
            },
            {
              tier: "Tier 3",
              title: "Escalation Advisors",
              subtitle: "Rare — High Impact",
              items: [
                "Fractional CPAs, CTOs & domain advisors",
                "Policy interpretation & strategic guidance",
                "UK/US/African market specialists",
                "Complex edge cases & audit preparation",
              ],
              color: "border-coral/20",
            },
          ].map((t, i) => (
            <ScrollReveal key={i} delay={300 + i * 100}>
              <div
                className={`p-6 rounded-2xl bg-midnight/60 border ${t.color} text-center h-full`}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-ghost/50 font-medium">
                  {t.tier}
                </span>
                <h4 className="font-[var(--font-display)] text-lg font-bold text-white-soft mt-1 mb-1">
                  {t.title}
                </h4>
                <p className="text-xs text-ghost/60 mb-4">{t.subtitle}</p>
                <ul className="space-y-2 text-left">
                  {t.items.map((item, j) => (
                    <li key={j} className="text-sm text-ghost/80 flex items-start gap-2">
                      <span className="text-teal mt-0.5 text-xs">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
