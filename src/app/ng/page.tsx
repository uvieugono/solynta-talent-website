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

/* ── Nigeria-specific pain points ── */
const problems = [
  {
    icon: "\u{1F3E6}",
    title: "Banks Won\u2019t Lend Without Records",
    stat: "70% of SME loan applications rejected",
    desc: "Nigerian banks reject most SME applications due to unauditable books. No clean financials = no credit facilities, no overdrafts, no growth capital.",
    source: "IFC / World Bank SME Finance Report",
    color: "text-lavender",
  },
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Employee Theft Is Draining Your Profits",
    stat: "3\u20135% of revenue lost to shrinkage",
    desc: "Without real-time stock tracking and PoS reconciliation, theft goes undetected for months. Fuel, inventory, cash \u2014 the losses compound silently.",
    source: "EY Emerging Markets Survey",
    color: "text-coral",
  },
  {
    icon: "\u{1F4C9}",
    title: "You\u2019re Flying Blind",
    stat: "80% of SME decisions based on gut feel",
    desc: "No dashboards, no cash flow visibility, no margin analysis by product. You know roughly what came in last month \u2014 that\u2019s it.",
    source: "PwC Nigeria SME Survey",
    color: "text-gold",
  },
  {
    icon: "\u2708\uFE0F",
    title: "Your Best People Are Leaving (Japa)",
    stat: "70% of young professionals plan to emigrate",
    desc: "The brain drain is real. You train them, they leave. Solynta Talent gives you AI-powered digital employees of higher quality than is typically available locally \u2014 and they don\u2019t japa.",
    source: "Africa Polling Institute",
    color: "text-teal",
  },
];

/* ── Nigeria cost comparison ── */
const withoutRows = [
  { role: "Accountant / Bookkeeper", cost: "\u20A6250\u2013400K" },
  { role: "Sales / CRM Person", cost: "\u20A6200\u2013350K" },
  { role: "Customer Service Rep", cost: "\u20A6100\u2013200K" },
  { role: "HR / Admin Officer", cost: "\u20A6150\u2013250K" },
  { role: "Marketing Coordinator", cost: "\u20A6200\u2013300K" },
  { role: "Inventory Shrinkage", cost: "\u20A6200\u2013500K" },
  { role: "Software Subscriptions", cost: "\u20A620\u201350K" },
];

const withRows = [
  { module: "Finance Core", price: "from \u20A625,000/mo" },
  { module: "Sales, CRM & Web", price: "\u20A645,000/mo" },
  { module: "AI Customer Service", price: "\u20A625,000/mo" },
  { module: "HR & Admin Ops", price: "\u20A625,000/mo" },
  { module: "Marketing Dept.", price: "from \u20A625,000/mo" },
  { module: "Inventory Mgmt.", price: "from \u20A650,000/mo" },
];

/* ── Target industries ── */
const industries = [
  { icon: "\u{1F6D2}", name: "Supermarkets & Retail", desc: "End shrinkage, automate inventory, get bank-ready books" },
  { icon: "\u26FD", name: "Filling Stations", desc: "Track fuel inventory, reconcile payments, detect theft" },
  { icon: "\u{1F3D7}\uFE0F", name: "Construction & Logistics", desc: "Procurement automation, fleet cost tracking, payroll" },
  { icon: "\u{1F3E2}", name: "Holding Companies", desc: "Multi-tenant: one login, multiple businesses, full data isolation" },
  { icon: "\u{1F3ED}", name: "Manufacturing & FMCG", desc: "BOM, demand forecasting, multi-warehouse, slow-mover alerts" },
  { icon: "\u{1F4BB}", name: "Tech Startups", desc: "Lean ops from day one \u2014 finance, HR, customer service automated" },
];

export default function NigeriaPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-coral/5 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl">
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
              <span className="text-lg">{"\u{1F1F3}\u{1F1EC}"}</span>
              <span className="text-xs font-medium tracking-widest uppercase text-teal">
                Built for Nigerian Businesses
              </span>
            </div>

            <h1 className="animate-fade-up delay-100 font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              Your staff <span className="text-coral/90">japa</span>.
              <br />
              Your AI team{" "}
              <span className="text-gradient">never leaves.</span>
            </h1>

            <p className="animate-fade-up delay-200 text-lg sm:text-xl lg:text-2xl text-ghost max-w-2xl mb-10 leading-relaxed">
              41 AI agents running your finance, sales, HR, marketing, inventory
              and customer service — 24/7, on your live business data.
              From <span className="text-teal font-semibold">{"\u20A6"}25,000/month</span> per department.
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
              <a href="/consultation" className="group relative px-8 py-4 rounded-full bg-teal text-midnight font-semibold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400">
                <span className="relative z-10">Get Your Free AI Analysis</span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#pricing-ng" className="px-8 py-4 rounded-full border border-white/10 text-white-soft font-medium text-base hover:border-teal/40 hover:bg-white/5 transition-all duration-400">
                See Naira Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problems section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-coral mb-4 font-medium">
              The Nigerian SME Reality
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
              Four problems killing Nigerian businesses
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

      {/* Cost comparison */}
      <section id="pricing-ng" className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              The Economics
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              What a typical Nigerian SME saves
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6 mt-10 mb-12">
            {/* Without */}
            <ScrollReveal delay={100}>
              <div className="rounded-2xl border border-coral/20 bg-coral/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-coral" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Without Solynta Talent</span>
                </div>
                <div className="space-y-3 mb-6">
                  {withoutRows.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm text-ghost/80">{row.role}</span>
                      <span className="text-sm font-mono text-white-soft/70">{row.cost}<span className="text-ghost/40">/mo</span></span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-coral/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-coral">Monthly total</span>
                    <span className="font-[var(--font-display)] text-2xl font-bold text-coral">{"\u20A6"}1.1{"\u2013"}2M+</span>
                  </div>
                  <p className="text-xs text-ghost/50 mt-2">Plus recruitment costs, NHIS, pension, training, turnover, office space</p>
                </div>
              </div>
            </ScrollReveal>

            {/* With */}
            <ScrollReveal delay={200}>
              <div className="rounded-2xl border border-teal/30 bg-teal/[0.04] p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute -top-16 right-0 w-32 h-32 bg-teal/10 blur-[60px] rounded-full" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">With Solynta Talent</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    {withRows.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-white-soft">{row.module}</span>
                        <span className="text-sm font-mono text-teal">{row.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-teal/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-teal">Monthly total</span>
                      <span className="font-[var(--font-display)] text-2xl font-bold text-teal">from {"\u20A6"}195,000/mo</span>
                    </div>
                    <p className="text-xs text-ghost/50 mt-2">All-in. No NHIS. No pension contributions. No office space. Scale with 30 days notice.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-teal/[0.06] via-teal/[0.03] to-lavender/[0.06] border border-teal/10">
              <p className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-3">
                Save up to <span className="text-gradient">{"\u20A6"}13 million/year</span>
              </p>
              <p className="text-lg text-ghost/70 max-w-xl mx-auto">
                Including eliminated shrinkage. With 24/7 operations, AI-powered intelligence, and zero recruitment headaches.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Target industries */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Who We Serve
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-12">
              Built for Nigerian industries
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl bg-slate-dark/40 border border-white/5 hover:border-teal/20 transition-all duration-300">
                  <span className="text-3xl block mb-3">{ind.icon}</span>
                  <h3 className="font-semibold text-white-soft mb-2">{ind.name}</h3>
                  <p className="text-sm text-ghost/70">{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shared sections from US homepage */}
      <UseCases />
      <Services />
      <Platform />
      <DeliveryModel />
      <Pricing />

      {/* Stack Calculator */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h3 className="font-[var(--font-display)] text-2xl font-bold mb-2">
                Build Your Operations Stack
              </h3>
              <p className="text-ghost text-sm max-w-xl mx-auto">
                Select the departments you need. Toggle between NGN, USD, and GBP pricing.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <StackCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* Brain drain section */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-6 font-medium">
                Beat the Brain Drain
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                Your competitors lose talent to japa.
                <br />
                <span className="text-gradient">You won&apos;t even notice.</span>
              </h2>
              <p className="text-lg text-ghost/80 leading-relaxed max-w-2xl mx-auto mb-8">
                Solynta Talent&apos;s AI agents deliver higher quality output than most
                locally available hires — consistently, 24/7, without salary negotiations,
                visa applications, or two-week notice periods. When your accountant emigrates,
                your books don&apos;t skip a beat.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                {[
                  { stat: "24/7", label: "Always available", sub: "No public holidays, no sick days" },
                  { stat: "95%+", label: "Accuracy rate", sub: "Higher than average manual processing" },
                  { stat: "0", label: "Turnover risk", sub: "Your AI team never resigns" },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-slate-dark/40 border border-white/5">
                    <div className="font-[var(--font-display)] text-3xl font-bold text-teal mb-1">{item.stat}</div>
                    <div className="text-sm font-medium text-white-soft mb-1">{item.label}</div>
                    <div className="text-xs text-ghost/50">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <HowItWorks />
      <WhySolynta />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
