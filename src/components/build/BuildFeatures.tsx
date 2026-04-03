"use client";

import ScrollReveal from "@/components/ScrollReveal";

const features = [
  { name: "Custom web application", starter: true, growth: true, scale: true },
  { name: "Feature modules", starter: "Up to 5", growth: "Up to 15", scale: "Unlimited" },
  { name: "User accounts & login", starter: true, growth: true, scale: true },
  { name: "Cloud hosting included", starter: true, growth: true, scale: true },
  { name: "Third-party integrations", starter: "1", growth: "Up to 5", scale: "Unlimited" },
  { name: "Payment processing", starter: false, growth: "Stripe / Paystack", scale: true },
  { name: "Advanced user roles", starter: false, growth: true, scale: true },
  { name: "Mobile-optimised PWA", starter: false, growth: true, scale: true },
  { name: "Native iOS & Android apps", starter: false, growth: false, scale: true },
  { name: "Analytics dashboard", starter: false, growth: true, scale: true },
  { name: "Feature sprints per month", starter: "1", growth: "2", scale: "Continuous" },
  { name: "SolyntaFlow back-office", starter: "Basic", growth: "Standard", scale: "Full enterprise" },
  { name: "Uptime SLA", starter: "99%", growth: "99.5%", scale: "99.99%" },
  { name: "Regulated industry support", starter: false, growth: false, scale: true },
  { name: "White-label / multi-tenant", starter: false, growth: false, scale: true },
  { name: "Multiple software products", starter: false, growth: false, scale: "Unlimited" },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal" />
    );
  if (value === false)
    return (
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-white/10" />
    );
  return <span className="text-ghost text-sm">{value}</span>;
}

export default function BuildFeatures() {
  return (
    <section id="features" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-4 text-center">
            What You Get
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft text-center mb-4">
            Three tiers. One mission.
          </h2>
          <p className="text-lg text-ghost text-center max-w-2xl mx-auto mb-16">
            Every tier includes a full custom web application built by Claude
            Code, delivered within 30&nbsp;days, and hosted on our
            infrastructure.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5 w-[40%] sticky left-0 z-10 bg-navy">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-teal font-medium border-b border-teal/20">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-ghost/60 font-medium border-b border-white/5">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={f.name}
                    className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                  >
                    <td className="py-3.5 px-4 text-sm text-white-soft font-medium border-b border-white/5 sticky left-0 z-10 bg-navy">
                      {f.name}
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-white/5">
                      <CellValue value={f.starter} />
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-teal/10 bg-teal/[0.03]">
                      <CellValue value={f.growth} />
                    </td>
                    <td className="py-3.5 px-4 text-center border-b border-white/5">
                      <CellValue value={f.scale} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
