"use client";
import ScrollReveal from "./ScrollReveal";
import StackCalculator from "./StackCalculator";

const packages = [
  {
    name: "Startup Essentials",
    price: "$750",
    desc: "Get the fundamentals right",
    services: [
      { name: "Finance Core", price: "$500/mo" },
      { name: "AI Customer Service", price: "$250/mo" },
    ],
    saves: "$17,000+/mo",
    featured: false,
  },
  {
    name: "Growth Operations",
    price: "$1,250",
    desc: "Scaled ops for growing teams",
    services: [
      { name: "Finance Core", price: "$500/mo" },
      { name: "Sales, CRM & Web", price: "$250/mo" },
      { name: "AI Customer Service", price: "$250/mo" },
      { name: "HR & Admin Ops", price: "$250/mo" },
    ],
    saves: "$45,000+/mo",
    featured: true,
  },
  {
    name: "Full Enterprise",
    price: "$3,550",
    desc: "Your complete business OS",
    services: [
      { name: "Finance Core", price: "$500/mo" },
      { name: "Sales, CRM & Web", price: "$250/mo" },
      { name: "AI Customer Service", price: "$250/mo" },
      { name: "HR & Admin Ops", price: "$250/mo" },
      { name: "Marketing Growth", price: "$800/mo" },
      { name: "Embedded Dev", price: "$500/mo" },
      { name: "Data Science", price: "$250/mo" },
      { name: "Enterprise Intel.", price: "$500/mo" },
      { name: "Inventory", price: "$250/mo" },
    ],
    saves: "$100,000+/mo",
    featured: false,
  },
];


export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-midnight to-navy" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Pricing
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              You choose. You control.
            </h2>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              No hidden fees. No setup charges. No long-term lock-in.
              Your monthly total is simply the sum of your active services.
            </p>
          </div>
        </ScrollReveal>

        {/* Example packages */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`pricing-card rounded-2xl p-8 bg-slate-dark/50 h-full flex flex-col ${
                  pkg.featured ? "featured" : ""
                }`}
              >
                {pkg.featured && (
                  <div className="text-[10px] uppercase tracking-[0.25em] text-teal font-bold mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-ghost mb-4">{pkg.desc}</p>

                <div className="mb-6">
                  <span className="font-[var(--font-display)] text-4xl font-bold text-white-soft">
                    {pkg.price}
                  </span>
                  <span className="text-ghost text-sm">/mo</span>
                </div>

                <ul className="space-y-2 flex-1">
                  {pkg.services.map((s, j) => (
                    <li key={j} className="flex items-center justify-between text-sm">
                      <span className="text-ghost/80">{s.name}</span>
                      <span className="text-white-soft font-mono text-xs">{s.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ghost/60">vs in-house</span>
                    <span className="text-sm font-bold text-gradient-gold">
                      SAVES {pkg.saves}
                    </span>
                  </div>
                </div>

                <a
                  href="/consultation"
                  className={`mt-6 block text-center py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    pkg.featured
                      ? "bg-teal text-midnight hover:shadow-lg hover:shadow-teal/20"
                      : "border border-white/10 text-white-soft hover:border-teal/40 hover:bg-white/5"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Stack Calculator */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="font-[var(--font-display)] text-2xl font-bold mb-2">
              Build Your Own Package
            </h3>
            <p className="text-ghost text-sm max-w-xl mx-auto">
              Select the services you need. Prices update instantly — toggle between USD and NGN.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <StackCalculator />
          <div className="text-center mt-6">
            <a
              href="/calculator"
              className="text-sm text-teal hover:text-teal/80 transition-colors"
            >
              Open full calculator →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
