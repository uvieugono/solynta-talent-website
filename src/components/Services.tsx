"use client";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    num: "01",
    icon: "💰",
    name: "Finance Core",
    price: "$500/mo",
    roles: "Bookkeeper · Accountant · Payroll · Tax",
    features: [
      "Daily transaction posting & reconciliation",
      "P&L, balance sheet & cash flow reports",
      "Full payroll computation & payslips",
      "VAT, WHT & income tax compliance",
      "Board-ready monthly management packs",
    ],
    agents: ["Bookkeeper Agent", "Accountant Agent", "Payroll Agent", "Tax Accountant Agent"],
    color: "from-teal/20 to-teal/5",
    accent: "text-teal",
    border: "border-teal/20",
    saves: "$14,500+/mo",
  },
  {
    num: "02",
    icon: "📈",
    name: "Sales, CRM & Web",
    price: "$250/mo",
    roles: "Web Dev · SEO · CRM · Sales Ops",
    features: [
      "Professional website build or redesign",
      "SEO setup & Google My Business",
      "CRM data cleaning & enrichment",
      "Automated lead follow-up sequences",
      "Weekly pipeline & forecast reports",
    ],
    agents: ["Web Developer Agent", "SEO Specialist Agent", "CRM Specialist Agent", "Sales Ops Agent"],
    color: "from-lavender/20 to-lavender/5",
    accent: "text-lavender",
    border: "border-lavender/20",
    saves: "$13,450+/mo",
  },
  {
    num: "03",
    icon: "💬",
    name: "AI Customer Service",
    price: "$250/mo",
    roles: "WhatsApp · Email · Website Chatbot",
    features: [
      "WhatsApp Business AI chatbot (24/7)",
      "Email auto-triage & priority sorting",
      "Website chatbot with lead capture",
      "Human escalation routing",
      "All bots trained on YOUR data",
    ],
    agents: ["WhatsApp Bot Agent", "Email Triage Agent", "Website Chatbot Agent"],
    color: "from-coral/20 to-coral/5",
    accent: "text-coral",
    border: "border-coral/20",
    saves: "$2,750+/mo",
  },
  {
    num: "04",
    icon: "👥",
    name: "HR & Admin Ops",
    price: "$250/mo",
    roles: "HR Admin · Procurement · IT Admin",
    features: [
      "Automated onboarding workflows",
      "Leave & PTO tracking management",
      "Vendor contract & PO management",
      "SaaS license tracking & cost monitoring",
      "Compliance database maintenance",
    ],
    agents: ["HR Administrator Agent", "Procurement Agent", "IT Admin Agent"],
    color: "from-gold/20 to-gold/5",
    accent: "text-gold",
    border: "border-gold/20",
    saves: "$9,750+/mo",
  },
  {
    num: "05",
    icon: "📣",
    name: "Marketing Department",
    price: "from $500/mo",
    roles: "Social · PPC · Content · SEO · Video · Automation · Analytics",
    features: [
      "Social media management (3+ platforms)",
      "Google, Meta & LinkedIn ad campaigns",
      "Content marketing & lead magnets",
      "Marketing automation & email sequences",
      "ROI reporting & attribution tracking",
    ],
    agents: [
      "Social Media Manager", "PPC Specialist", "Content Marketer",
      "SEO Content Agent", "Video Producer", "Marketing Automation", "Marketing Analytics",
    ],
    color: "from-pink-500/20 to-pink-500/5",
    accent: "text-pink-400",
    border: "border-pink-500/20",
    saves: "$15,000+/mo",
  },
  {
    num: "06",
    icon: "💻",
    name: "Embedded Developers",
    price: "from $500/mo",
    roles: "Full Stack · Mobile · Cloud · DevOps",
    features: [
      "Dedicated developer in your team & tools",
      "Attends your standups & sprint planning",
      "Frontend, backend & database work",
      "CI/CD pipelines & cloud infrastructure",
      "AI-augmented for 3x faster output",
    ],
    agents: ["Web Developer Agent"],
    color: "from-cyan-400/20 to-cyan-400/5",
    accent: "text-cyan-400",
    border: "border-cyan-400/20",
    saves: "$9,350+/mo",
  },
  {
    num: "07",
    icon: "📊",
    name: "Data Science",
    price: "from $250/mo",
    roles: "Analytics · ML Models · BI · Dashboards",
    features: [
      "Predictive analytics & forecasting",
      "Custom ML model development",
      "Data cleaning & ETL pipelines",
      "Power BI / Tableau dashboards",
      "Generative AI & LLM integration",
    ],
    agents: ["BI Analyst Agent", "Strategy Agent"],
    color: "from-emerald-400/20 to-emerald-400/5",
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
    saves: "$44,000+/mo",
  },
  {
    num: "08",
    icon: "📦",
    name: "Inventory Management",
    price: "from $250/mo",
    roles: "Stock Control · BOM/MRP · Forecasting",
    features: [
      "Unlimited SKU management",
      "Multi-warehouse & multi-site",
      "AI-powered demand forecasting",
      "BOM & MRP for manufacturing",
      "Shopify / WooCommerce sync",
    ],
    agents: ["Inventory Agent"],
    color: "from-amber-400/20 to-amber-400/5",
    accent: "text-amber-400",
    border: "border-amber-400/20",
    saves: "$18,000+/mo",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
            Service Modules
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            8 modules. Your complete operations suite.
          </h2>
          <p className="text-ghost text-lg max-w-2xl mb-16">
            Choose any combination of services. Pay only for what you need. Add more as you grow.
            Every service is AI-augmented, human-managed and delivered by your dedicated Solynta team.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className={`service-card rounded-2xl bg-gradient-to-br ${s.color} p-7 border ${s.border} h-full`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-ghost/60">
                          {s.num}
                        </span>
                        <h3
                          className={`font-[var(--font-display)] text-xl font-bold ${s.accent}`}
                        >
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-xs text-ghost mt-0.5">{s.roles}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-[var(--font-display)] text-lg font-bold text-white-soft">
                      {s.price}
                    </div>
                    <div className="text-[10px] text-teal font-medium mt-0.5">
                      SAVES {s.saves}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {s.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-ghost/80"
                    >
                      <span className={`mt-1 text-xs ${s.accent}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Agent pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {s.agents.map((a, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-medium text-ghost/70 border border-white/5"
                    >
                      🤖 {a}
                    </span>
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
