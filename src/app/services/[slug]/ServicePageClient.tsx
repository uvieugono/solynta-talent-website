"use client";
import { ServiceData } from "@/lib/services";
import { illustrationMap } from "@/components/ServiceIllustrations";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { services } from "@/lib/services";

export default function ServicePageClient({ service }: { service: ServiceData }) {
  const Illustration = illustrationMap[service.slug];
  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      {/* Sticky back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#services"
            className="flex items-center gap-2 text-ghost hover:text-teal transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">All Services</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-lavender flex items-center justify-center font-[var(--font-display)] font-bold text-midnight text-xs">
              ST
            </div>
            <span className="font-[var(--font-display)] font-semibold text-sm tracking-tight hidden sm:inline">
              Solynta<span className="text-teal">Talent</span>
            </span>
          </Link>
          <a
            href="https://calendly.com/uvieugono"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-xs font-medium rounded-full bg-teal text-midnight hover:bg-teal/90 transition-all"
          >
            Book Call
          </a>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="absolute inset-0 grid-bg opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${service.accent} bg-white/5 border border-white/10`}>
                    Module {service.num}
                  </span>
                  <span className="text-xs text-ghost/50">{service.roles}</span>
                </div>
                <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight mb-6">
                  <span className="text-white-soft">{service.name}</span>
                </h1>
                <p className="text-xl text-ghost leading-relaxed mb-8 max-w-xl">
                  {service.heroDesc}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-[var(--font-display)] text-4xl font-bold text-white-soft">{service.price}</span>
                  </div>
                  <span className="text-sm text-ghost/60">|</span>
                  <span className="text-sm text-gradient-gold font-semibold">{service.priceNote}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://calendly.com/uvieugono"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full bg-teal text-midnight font-semibold text-sm hover:shadow-2xl hover:shadow-teal/25 transition-all duration-300"
                  >
                    Get Started with {service.name}
                  </a>
                  <a
                    href="#features"
                    className="px-8 py-3.5 rounded-full border border-white/10 text-white-soft font-medium text-sm hover:border-teal/40 hover:bg-white/5 transition-all"
                  >
                    See Full Details
                  </a>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={200}>
              <div className="relative">
                {Illustration && <Illustration className="w-full h-auto max-h-[360px]" />}
                {/* Floating stat cards */}
                <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-midnight/90 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs text-ghost/60 mb-0.5">AI Agents</div>
                  <div className="font-[var(--font-display)] text-xl font-bold text-white-soft">{service.agents.length}</div>
                </div>
                <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-midnight/90 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs text-ghost/60 mb-0.5">Saves</div>
                  <div className={`font-[var(--font-display)] text-xl font-bold text-gradient-gold`}>{service.saves}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ====== FEATURES GRID ====== */}
      <section id="features" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              What&apos;s Included
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-16 max-w-2xl">
              End-to-end {service.name.toLowerCase()} services
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.detailedFeatures.map((f, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`group relative p-7 rounded-2xl bg-gradient-to-br ${service.color} border ${service.border} h-full hover:border-white/15 transition-all duration-500`}>
                  <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${service.accent}`} />
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${service.accent} text-lg font-bold font-mono`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ghost/80 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== AI AGENTS ====== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-slate-dark to-navy" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal/[0.03] blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Your AI Workforce
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-4 max-w-2xl">
              {service.agents.length} specialized AI agent{service.agents.length > 1 ? "s" : ""}
            </h2>
            <p className="text-ghost text-lg max-w-2xl mb-6">
              Each agent is trained on your business data, operates within strict confidence guardrails,
              and is supervised by human specialists.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                &gt;90% confidence &rarr; Auto-approved
              </span>
              <span className="px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20">
                70&ndash;90% &rarr; Operator review
              </span>
              <span className="px-3 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-medium border border-coral/20">
                &lt;70% &rarr; Escalated
              </span>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {service.agents.map((agent, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`agent-card rounded-2xl border ${service.border} bg-gradient-to-br ${service.color} p-8 hover:border-white/15 transition-all duration-500`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl`}>
                          🤖
                        </div>
                        <div>
                          <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft">
                            {agent.name}
                          </h3>
                          <p className={`text-xs ${service.accent} font-medium`}>{agent.title}</p>
                        </div>
                      </div>
                      <p className="text-sm text-ghost/80 leading-relaxed mb-4">{agent.desc}</p>
                      <div className="p-3 rounded-xl bg-midnight/40 border border-white/5">
                        <p className="text-xs text-ghost/50 uppercase tracking-wider mb-2 font-medium">Confidence Protocol</p>
                        <p className="text-xs text-ghost/70 leading-relaxed">{agent.confidence}</p>
                      </div>
                    </div>
                    <div className="lg:w-64 shrink-0">
                      <p className="text-xs text-ghost/50 uppercase tracking-wider mb-3 font-medium">AI Tools & Capabilities</p>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.tools.map((tool, j) => (
                          <span
                            key={j}
                            className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-medium text-ghost/70 border border-white/5"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PROCESS ====== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              How It Works
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-16 max-w-2xl">
              From kickoff to full operations
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((p, i) => {
                const colors = ["border-teal", "border-lavender", "border-gold", "border-coral"];
                return (
                  <ScrollReveal key={i} delay={i * 120}>
                    <div className={`relative p-6 rounded-2xl bg-slate-dark/40 border-l-2 ${colors[i]} h-full`}>
                      <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 font-mono text-sm font-bold ${service.accent}`}>
                        {p.step}
                      </div>
                      <h3 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-ghost/80 leading-relaxed">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== DELIVERABLES ====== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-slate-dark to-midnight" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
                Monthly Deliverables
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-4">
                What you get every month
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.deliverables.map((d, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors`}
                >
                  <span className={`mt-0.5 text-sm ${service.accent}`}>&#10003;</span>
                  <span className="text-sm text-ghost/80">{d}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
                FAQ
              </p>
              <h2 className="font-[var(--font-display)] text-3xl font-bold leading-tight">
                Common questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="p-6 rounded-2xl bg-slate-dark/40 border border-white/5">
                  <h3 className="font-[var(--font-display)] text-base font-bold text-white-soft mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-ghost/80 leading-relaxed">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal/[0.04] blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-6">
              Ready to get started with{" "}
              <span className="text-gradient">{service.name}</span>?
            </h2>
            <p className="text-ghost text-lg mb-10 max-w-xl mx-auto">
              Book a free discovery call. We&apos;ll map your needs, show you exactly how {service.name.toLowerCase()} works,
              and get you live within two weeks.
            </p>
            <a
              href="https://calendly.com/uvieugono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full bg-teal text-midnight font-bold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400 glow-teal"
            >
              Book Your Free Discovery Call &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== PREV/NEXT NAV ====== */}
      <section className="relative py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="group flex items-center gap-3 text-ghost hover:text-teal transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-xs text-ghost/50">Previous</p>
                  <p className="text-sm font-medium">{prevService.name}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex items-center gap-3 text-ghost hover:text-teal transition-colors text-right"
              >
                <div>
                  <p className="text-xs text-ghost/50">Next</p>
                  <p className="text-sm font-medium">{nextService.name}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="relative py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-ghost/30">
            &copy; {new Date().getFullYear()} Solynta Talent. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
