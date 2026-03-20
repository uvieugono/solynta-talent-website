"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import UseCases from "@/components/UseCases";
import Services from "@/components/Services";
import Platform from "@/components/Platform";
import DeliveryModel from "@/components/DeliveryModel";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import WhySolynta from "@/components/WhySolynta";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import StackCalculator from "@/components/StackCalculator";
import Footer from "@/components/Footer";

/* ── UK-specific pain points ── */
const problems = [
  {
    icon: "\u{1F4B7}",
    title: "Employer\u2019s NI Just Went Up Again",
    stat: "15% Employer\u2019s NI",
    desc: "From April 2025, Employer\u2019s NI rises to 15% with a lower threshold of \u00A35,000. A \u00A328K salary now costs you \u00A331,450 before you\u2019ve paid for a desk.",
    source: "HMRC / Autumn Budget 2024",
    color: "text-coral",
  },
  {
    icon: "\u{1F4B0}",
    title: "National Living Wage Keeps Climbing",
    stat: "\u00A312.21/hour NLW",
    desc: "The National Living Wage reaches \u00A312.21/hour in April 2025 \u2014 a 6.7% increase. Labour costs are accelerating faster than revenue for most SMEs.",
    source: "GOV.UK Low Pay Commission",
    color: "text-gold",
  },
  {
    icon: "\u26A1",
    title: "Energy Costs Squeezing Margins",
    stat: "40\u201360% higher than pre-2022",
    desc: "Business energy prices remain 40\u201360% above pre-crisis levels. Every operational inefficiency you can eliminate directly protects your margin.",
    source: "BEIS / Ofgem",
    color: "text-lavender",
  },
  {
    icon: "\u{1F4CA}",
    title: "MTD Is Coming for Everyone",
    stat: "Making Tax Digital for ITSA from 2026",
    desc: "HMRC\u2019s Making Tax Digital programme means quarterly digital reporting is mandatory. Manual bookkeeping won\u2019t cut it anymore.",
    source: "HMRC",
    color: "text-teal",
  },
];

/* ── True cost of a UK employee ── */
const employeeCostRows = [
  { item: "Base salary", cost: "\u00A328,000" },
  { item: "Employer\u2019s NI (15%)", cost: "\u00A33,450" },
  { item: "Workplace pension (3%)", cost: "\u00A3840" },
  { item: "Holiday cover / absence", cost: "\u00A32,800" },
  { item: "Recruitment fees (amortised)", cost: "\u00A31,500" },
  { item: "Equipment, software, training", cost: "\u00A31,500" },
  { item: "Management overhead", cost: "\u00A31,015" },
];

/* ── UK pricing with tiers ── */
const withRows = [
  { module: "Finance Core", tiers: "\u00A3200 / \u00A3300 / \u00A3400" },
  { module: "Sales, CRM & Web", tiers: "\u00A3200" },
  { module: "AI Customer Service", tiers: "\u00A3200" },
  { module: "HR & Admin Ops", tiers: "\u00A3200" },
  { module: "Marketing Dept.", tiers: "\u00A3400 / \u00A3650 / \u00A3950" },
  { module: "Enterprise Intel.", tiers: "\u00A3400 / \u00A3800 / \u00A31,600" },
];

/* ── UK scenarios ── */
const scenarios = [
  {
    name: "Startup",
    team: "3 people",
    stack: "Finance Essentials + AI Customer Service",
    monthly: "\u00A3400/mo",
    annual: "\u00A34,800/yr",
    replaces: "Part-time bookkeeper + customer inbox management",
    saves: "\u00A310,000+/yr",
  },
  {
    name: "Growing SME",
    team: "15 people",
    stack: "Finance Growth + Sales/CRM + Customer Service + HR",
    monthly: "\u00A31,200/mo",
    annual: "\u00A314,400/yr",
    replaces: "3 full-time hires + 4 software subscriptions",
    saves: "\u00A3100,000+/yr",
    featured: true,
  },
  {
    name: "Established SME",
    team: "40 people",
    stack: "Finance Pro + Sales + CS + HR + Marketing Growth + Enterprise Intel",
    monthly: "\u00A32,250/mo",
    annual: "\u00A327,000/yr",
    replaces: "6+ hires + entire SaaS stack",
    saves: "\u00A3200,000+/yr",
  },
];

export default function UKPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl">
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
              <span className="text-lg">{"\u{1F1EC}\u{1F1E7}"}</span>
              <span className="text-xs font-medium tracking-widest uppercase text-teal">
                Built for UK Businesses
              </span>
            </div>

            <h1 className="animate-fade-up delay-100 font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              NI at 15%. NLW at{" "}
              <span className="text-coral/90">{"\u00A3"}12.21.</span>
              <br />
              There&apos;s a{" "}
              <span className="text-gradient">smarter way.</span>
            </h1>

            <p className="animate-fade-up delay-200 text-lg sm:text-xl lg:text-2xl text-ghost max-w-2xl mb-10 leading-relaxed">
              Your entire back office — finance, HR, marketing, sales, customer
              service — AI-powered and fully managed. From{" "}
              <span className="text-teal font-semibold">{"\u00A3"}200/month</span> per department.
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
              <a href="/consultation" className="group relative px-8 py-4 rounded-full bg-teal text-midnight font-semibold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400">
                <span className="relative z-10">Get Your Free AI Analysis</span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#uk-pricing" className="px-8 py-4 rounded-full border border-white/10 text-white-soft font-medium text-base hover:border-teal/40 hover:bg-white/5 transition-all duration-400">
                See UK Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* UK Pain Points */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-coral mb-4 font-medium">
              The UK SME Squeeze
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
              Employment costs are rising. Your margins aren&apos;t.
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group p-8 rounded-2xl bg-slate-dark/50 border border-white/5 hover:border-white/10 transition-all duration-400 h-full">
                  <span className="text-3xl block mb-4">{p.icon}</span>
                  <h3 className={`font-[var(--font-display)] text-xl font-semibold mb-2 ${p.color}`}>
                    {p.title}
                  </h3>
                  <p className={`text-sm font-semibold ${p.color} font-[var(--font-mono)] mb-3`}>
                    {p.stat}
                  </p>
                  <p className="text-ghost leading-relaxed text-sm">{p.desc}</p>
                  <p className="text-[10px] text-ghost/40 mt-3">{p.source}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* True cost of a UK employee */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
                  The Real Maths
                </p>
                <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-6">
                  A {"\u00A3"}28K hire actually costs you {"\u00A3"}39,105
                </h2>
                <p className="text-ghost leading-relaxed mb-8">
                  Before you&apos;ve asked them to do a single task, a junior hire
                  costs nearly {"\u00A3"}40K when you include NI, pension, holidays,
                  recruitment, equipment, and the management time to supervise them.
                  <br /><br />
                  Solynta Talent replaces that entire cost with an AI-powered department
                  — from {"\u00A3"}200/month.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="rounded-2xl border border-coral/20 bg-coral/[0.03] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-coral" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                    True Cost of 1 UK Employee
                  </span>
                </div>
                <div className="space-y-2 mb-5">
                  {employeeCostRows.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-sm text-ghost/80">{row.item}</span>
                      <span className="text-sm font-mono text-white-soft/70">{row.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-coral/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-coral">Total per employee</span>
                    <span className="font-[var(--font-display)] text-2xl font-bold text-coral">{"\u00A3"}39,105/yr</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Shared sections from US homepage */}
      <UseCases />
      <Services />
      <Platform />
      <DeliveryModel />

      {/* UK Pricing with tiers */}
      <section id="uk-pricing" className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              UK Pricing
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Full departments. GBP pricing. No surprises.
            </h2>
            <p className="text-ghost text-lg max-w-2xl mb-12">
              Every price includes the AI agents, the software platform, human oversight, and all deliverables.
              Essentials / Growth / Pro tiers where available.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="rounded-2xl border border-teal/20 bg-teal/[0.03] p-6 sm:p-8 mb-12">
              <div className="space-y-3">
                {withRows.map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-white-soft font-medium">{row.module}</span>
                    <span className="font-mono text-teal text-sm">{row.tiers}<span className="text-ghost/40">/mo</span></span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Scenarios */}
          <div id="scenarios">
            <ScrollReveal>
              <h3 className="font-[var(--font-display)] text-2xl font-bold mb-8 text-center">
                Three typical UK scenarios
              </h3>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {scenarios.map((s, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={`p-7 rounded-2xl border h-full flex flex-col ${
                    s.featured ? "border-teal/30 bg-teal/[0.04]" : "border-white/5 bg-slate-dark/40"
                  }`}>
                    {s.featured && (
                      <div className="text-[10px] uppercase tracking-[0.25em] text-teal font-bold mb-3">
                        Most Common
                      </div>
                    )}
                    <h4 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">{s.name}</h4>
                    <p className="text-sm text-ghost/60 mb-4">{s.team}</p>

                    <p className="text-xs text-ghost/50 uppercase tracking-wider mb-2">Stack</p>
                    <p className="text-sm text-ghost/80 mb-4">{s.stack}</p>

                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="font-[var(--font-display)] text-2xl font-bold text-white-soft mb-1">{s.monthly}</div>
                      <p className="text-xs text-ghost/60 mb-2">{s.annual}</p>
                      <p className="text-xs text-ghost/50">Replaces: {s.replaces}</p>
                      <p className="text-sm font-semibold text-teal mt-2">Saves {s.saves}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* Stack Calculator */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h3 className="font-[var(--font-display)] text-2xl font-bold mb-2">
                Build Your Operations Stack
              </h3>
              <p className="text-ghost text-sm max-w-xl mx-auto">
                Select the departments you need. Toggle between GBP, USD, and NGN pricing.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <StackCalculator />
          </ScrollReveal>
        </div>
      </section>

      <HowItWorks />

      {/* MTD Compliance callout */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="p-8 rounded-2xl border border-teal/20 bg-teal/[0.04] text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
                MTD Ready
              </p>
              <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
                Making Tax Digital? Already sorted.
              </h3>
              <p className="text-ghost leading-relaxed max-w-xl mx-auto mb-6">
                SolyntaFlow maintains your books to digital-filing standard every day,
                not just at quarter-end. When MTD for Income Tax Self Assessment arrives,
                you&apos;re already compliant. No scramble. No surprise accountant bills.
              </p>
              <a
                href="/consultation"
                className="inline-flex px-8 py-3.5 rounded-full bg-teal text-midnight font-semibold hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400"
              >
                Talk to Us About MTD
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WhySolynta />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
