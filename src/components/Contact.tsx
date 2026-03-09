"use client";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-slate-dark to-midnight" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.05] blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
            Get Started
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Ready to build your
            <br />
            <span className="text-gradient">business operations stack?</span>
          </h2>
          <p className="text-ghost text-lg max-w-xl mx-auto mb-12">
            Start with one service or all eight. Your operations, your pace, your price.
            Book a free discovery call — zero commitment.
          </p>
        </ScrollReveal>

        {/* Service price summary */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-12">
            {[
              { icon: "💰", name: "Finance", price: "$500" },
              { icon: "📈", name: "Sales", price: "$250" },
              { icon: "💬", name: "CS", price: "$250" },
              { icon: "👥", name: "HR", price: "$250" },
              { icon: "📣", name: "Mktg", price: "fr$500" },
              { icon: "💻", name: "Dev", price: "fr$500" },
              { icon: "📊", name: "Data", price: "fr$250" },
              { icon: "📦", name: "Inv", price: "fr$250" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <span className="text-lg mb-1">{s.icon}</span>
                <span className="text-[10px] text-ghost/60 mb-0.5">{s.name}</span>
                <span className="text-xs font-mono font-bold text-teal">{s.price}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a
              href="mailto:hello@solyntalent.com"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>📧</span>
              <span className="text-sm">hello@solyntalent.com</span>
            </a>
            <a
              href="tel:+15043236957"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>📞</span>
              <span className="text-sm">+1 (504) 323-6957</span>
            </a>
            <a
              href="https://www.solyntalent.com"
              className="flex items-center gap-2 text-ghost hover:text-teal transition-colors"
            >
              <span>🌐</span>
              <span className="text-sm">www.solyntalent.com</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <a
            href="/consultation"
            className="inline-block px-10 py-4 rounded-full bg-teal text-midnight font-bold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400 glow-teal"
          >
            Get Your Free AI Business Analysis →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
