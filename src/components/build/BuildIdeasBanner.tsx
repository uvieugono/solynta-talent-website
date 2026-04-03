"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function BuildIdeasBanner() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="rounded-2xl bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="#f4c542" strokeWidth="2" fill="#f4c54215"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-2">
                Don&apos;t have an idea yet?
              </h3>
              <p className="text-sm text-ghost/80 leading-relaxed">
                Browse <span className="text-gold font-semibold">100 software business ideas</span> designed for the Nigerian market. Each idea comes with a target audience, revenue model, and build price. Pick one and we&apos;ll build it for you.
              </p>
            </div>
            <Link
              href="/build/100-ideas"
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-gold text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              Browse 100 ideas — {"\u20A6"}7,500
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
