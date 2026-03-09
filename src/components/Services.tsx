"use client";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { services } from "@/lib/services";
import { illustrationMap } from "./ServiceIllustrations";

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
            9 modules. Your complete operations suite.
          </h2>
          <p className="text-ghost text-lg max-w-2xl mb-16">
            Choose any combination of services. Pay only for what you need. Add more as you grow.
            Every service is AI-augmented, human-managed and delivered by your dedicated Solynta team.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Illustration = illustrationMap[s.slug];
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <Link href={`/services/${s.slug}`} className="block h-full">
                  <div
                    className={`service-card rounded-2xl bg-gradient-to-br ${s.color} p-7 border ${s.border} h-full cursor-pointer group`}
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

                    {/* Mini illustration */}
                    <div className="mb-5 h-32 overflow-hidden rounded-xl bg-midnight/30 border border-white/5 flex items-center justify-center">
                      {Illustration && <Illustration className="w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-500" />}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-5">
                      {s.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-ghost/80"
                        >
                          <span className={`mt-1 text-xs ${s.accent}`}>&#10003;</span>
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
                          🤖 {a.name}
                        </span>
                      ))}
                    </div>

                    {/* Explore link */}
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium group-hover:text-teal text-ghost/60 transition-colors">
                      <span>Explore full details</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
