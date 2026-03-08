"use client";
import ScrollReveal from "./ScrollReveal";

const challenges = [
  {
    icon: "💸",
    title: "Talent is Prohibitively Expensive",
    desc: "Building a complete operations team — finance, HR, sales, marketing, tech, data — costs $500,000+ a year in salaries alone.",
    color: "text-coral",
  },
  {
    icon: "⌛",
    title: "Hiring Takes Too Long",
    desc: "The average SME spends 3–6 months recruiting for each specialist role — with no guarantee of retention.",
    color: "text-gold",
  },
  {
    icon: "🔀",
    title: "Fragmented Tools, No Single Vision",
    desc: "Finance, HR, CRM each in different platforms. Nothing talks to each other. Decisions made on gut feel, not data.",
    color: "text-lavender",
  },
  {
    icon: "📉",
    title: "Competitors Are Moving Faster",
    desc: "Businesses leveraging AI-augmented operations are executing faster, spending smarter and scaling without adding headcount.",
    color: "text-teal",
  },
];

export default function Challenge() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
            The Problem
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            The challenge every growing business faces
          </h2>
          <p className="text-ghost text-lg max-w-2xl mb-16">
            Solynta Talent solves all of this — with one flexible, scalable,
            AI-augmented partner.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {challenges.map((c, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group p-8 rounded-2xl bg-slate-dark/50 border border-white/5 hover:border-white/10 transition-all duration-400">
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <h3
                  className={`font-[var(--font-display)] text-xl font-semibold mb-3 ${c.color}`}
                >
                  {c.title}
                </h3>
                <p className="text-ghost leading-relaxed">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
