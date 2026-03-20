"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

/* ── Animated counter that counts up on scroll ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, target]);

  return (
    <span ref={ref} className="font-[var(--font-display)] tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ── Parallax-style scroll tracker for background elements ── */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const p = Math.max(0, Math.min(1, 1 - rect.top / windowH));
    setProgress(p);
  }, [ref]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return progress;
}

/* ── "With vs Without" comparison data ── */
const withoutRows = [
  { role: "Bookkeeper / Accountant", cost: "$60\u201390K" },
  { role: "HR Manager", cost: "$55\u201380K" },
  { role: "Sales / CRM Person", cost: "$50\u201375K" },
  { role: "Customer Service Rep", cost: "$35\u201350K" },
  { role: "Marketing Coordinator", cost: "$45\u201370K" },
  { role: "IT / Data Entry", cost: "$30\u201345K" },
  { role: "Software Licenses", cost: "$6\u201312K" },
];

const withRows = [
  { module: "Finance Core", price: "from $250/mo" },
  { module: "HR & Admin Ops", price: "$250/mo" },
  { module: "Sales, CRM & Web", price: "$250/mo" },
  { module: "AI Customer Service", price: "$250/mo" },
  { module: "Marketing Dept.", price: "from $500/mo" },
  { module: "Enterprise Intelligence", price: "from $500/mo" },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const obsoleteRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(sectionRef);
  const obsoleteProgress = useScrollProgress(obsoleteRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Animated gradient background that shifts with scroll */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy/80 to-midnight" />

      {/* Floating geometric decorations */}
      <div
        className="absolute top-[15%] right-[8%] w-64 h-64 rounded-full border border-teal/[0.04] hidden lg:block"
        style={{ transform: `translateY(${progress * -60}px) rotate(${progress * 45}deg)` }}
      />
      <div
        className="absolute top-[45%] left-[5%] w-40 h-40 rounded-full border border-lavender/[0.04] hidden lg:block"
        style={{ transform: `translateY(${progress * -40}px)` }}
      />
      <div
        className="absolute bottom-[20%] right-[12%] w-32 h-32 border border-teal/[0.03] rotate-45 hidden lg:block"
        style={{ transform: `translateY(${progress * -80}px) rotate(${45 + progress * 90}deg)` }}
      />

      <div className="relative z-10">

        {/* ─── BEAT 1: The pain point ─── */}
        <div className="max-w-7xl mx-auto px-6 py-28 lg:py-40">
          <ScrollReveal>
            <div className="max-w-3xl relative">
              {/* Oversized decorative quote mark */}
              <span className="absolute -top-12 -left-4 lg:-left-12 font-[var(--font-display)] text-[120px] lg:text-[180px] leading-none text-teal/[0.06] select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl text-ghost/90 leading-[1.6] font-light">
                You didn&apos;t start your business to recruit accountants,
                manage HR departments, or staff a customer service desk.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-3xl mt-8">
              <p className="text-lg sm:text-xl text-ghost/70 leading-relaxed">
                Yet these functions are non-negotiable — and traditionally,
                they demand{" "}
                <span className="text-white-soft font-medium border-b border-teal/30 pb-0.5">
                  expensive professionals
                </span>
                , constant oversight, and a mountain of overhead that pulls
                your attention away from the work that actually generates
                revenue.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* ─── BEAT 2: "Obsolete" — cinematic full-width moment ─── */}
        <div ref={obsoleteRef} className="relative py-32 lg:py-44 overflow-hidden">
          {/* Animated scan line */}
          <div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal/60 to-transparent"
            style={{
              top: `${20 + obsoleteProgress * 60}%`,
              opacity: obsoleteProgress > 0.1 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Radial glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal/[0.04] blur-[100px] rounded-full" />

          {/* Side accent bars */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-teal/50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-lavender/20 to-transparent" />

          <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-16">
            <p className="text-xs uppercase tracking-[0.4em] text-teal/60 mb-6 font-[var(--font-mono)]">
              // status_update
            </p>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter">
              That model
              <br />
              is now{" "}
              <span className="text-gradient relative">
                obsolete.
                {/* Shimmer sweep on the word */}
                <span className="absolute inset-0 shimmer rounded-lg" />
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* ─── BEAT 3: The Solution — with animated stats ─── */}
        <div className="relative py-28 lg:py-36">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/[0.015] to-transparent" />

          {/* Diagonal line decoration */}
          <div className="absolute top-0 left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-teal/20 hidden lg:block" />

          <div className="relative max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-6 font-medium">
                The Solution
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.05] mb-8 max-w-4xl">
                Your entire back office.
                <br className="hidden sm:block" />
                AI-powered. One subscription.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="text-lg sm:text-xl text-ghost leading-relaxed max-w-3xl mb-14">
                We run your entire back office end-to-end — finance, HR,
                customer service, marketing, IT, and more — powered by
                specialised AI agents working alongside human professionals.
              </p>
            </ScrollReveal>

            {/* Animated stats row */}
            <ScrollReveal delay={250}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                {[
                  { value: 41, suffix: "", label: "AI Agents", color: "text-teal" },
                  { value: 167, suffix: "", label: "MCP Tools", color: "text-lavender" },
                  { value: 9, suffix: "", label: "Service Modules", color: "text-gold" },
                  { value: 85, suffix: "%", label: "Automation Rate", color: "text-teal" },
                ].map((stat, i) => (
                  <div key={i} className="relative p-6 rounded-xl bg-slate-dark/40 border border-white/[0.04] overflow-hidden group hover:border-white/10 transition-colors duration-500">
                    {/* Subtle shimmer on hover */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`text-4xl sm:text-5xl font-bold ${stat.color} relative`}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-ghost mt-2 relative">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Three value props — cards with hover glow */}
            <ScrollReveal delay={400}>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    text: "AI-native from day one",
                    sub: "Not a tool you have to learn",
                    accent: "teal",
                  },
                  {
                    text: "Fully managed operations",
                    sub: "Not a platform you have to implement",
                    accent: "lavender",
                  },
                  {
                    text: "Plug in and run",
                    sub: "Not a project you have to staff",
                    accent: "gold",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative p-6 rounded-xl bg-slate-dark/50 border border-white/5 hover:border-white/10 transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-[2px] bg-${item.accent}/60 group-hover:w-12 transition-all duration-500`} />
                      <span className="text-white-soft font-semibold text-lg">
                        {item.text}
                      </span>
                    </div>
                    <p className="text-sm text-ghost pl-11">{item.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── BEAT 4: With vs Without — comparison table ─── */}
        <div className="py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
                The Economics
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.05] mb-6">
                Same capability.<br />
                <span className="text-gradient">A fraction of the cost.</span>
              </h2>
              <p className="text-xl text-ghost/70 font-light max-w-2xl mb-14">
                See what a typical 20-person company saves by switching from
                in-house operations to Solynta Talent.
              </p>
            </ScrollReveal>

            {/* Side-by-side comparison */}
            <ScrollReveal delay={200}>
              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {/* WITHOUT column */}
                <div className="rounded-2xl border border-coral/20 bg-coral/[0.03] p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-coral" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                      Without Solynta Talent
                    </span>
                  </div>
                  <div className="space-y-3 mb-6">
                    {withoutRows.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-ghost/80">{row.role}</span>
                        <span className="text-sm font-mono text-white-soft/70">{row.cost}<span className="text-ghost/40">/yr</span></span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-coral/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-coral">Total annual cost</span>
                      <span className="font-[var(--font-display)] text-2xl font-bold text-coral">$280\u2013500K+</span>
                    </div>
                    <p className="text-xs text-ghost/50 mt-2">Plus benefits, recruitment, training, turnover, office space, and management time</p>
                  </div>
                </div>

                {/* WITH column */}
                <div className="rounded-2xl border border-teal/30 bg-teal/[0.04] p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -top-16 right-0 w-32 h-32 bg-teal/10 blur-[60px] rounded-full" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
                        With Solynta Talent
                      </span>
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
                        <span className="font-[var(--font-display)] text-2xl font-bold text-teal">from $2,000/mo</span>
                      </div>
                      <p className="text-xs text-ghost/50 mt-2">All-in. No recruitment. No benefits. No overhead. Scale up or down with 30 days notice.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Savings callout */}
            <ScrollReveal delay={300}>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-teal/[0.06] via-teal/[0.03] to-lavender/[0.06] border border-teal/10">
                <p className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white-soft mb-3">
                  Save up to <span className="text-gradient">$240,000/year</span>
                </p>
                <p className="text-lg text-ghost/70 max-w-xl mx-auto">
                  With better output: real-time dashboards, 24/7 service,
                  automated reconciliation, and AI-powered intelligence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── BEAT 5: Cloud analogy — editorial, centered, impactful ─── */}
        <div className="relative py-32 lg:py-44">
          {/* Layered background atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lavender/[0.02] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lavender/[0.03] blur-[120px] rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.4em] text-lavender/60 mb-8 font-[var(--font-mono)]">
                  // the_analogy
                </p>
                <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.05] mb-10">
                  Cloud computing made
                  <br />
                  on-premise servers{" "}
                  <span className="text-gradient">obsolete overnight.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="space-y-6 mb-14">
                  <p className="text-lg sm:text-xl text-ghost/80 leading-relaxed">
                    You stopped buying hardware, hiring sysadmins, and
                    managing data centres — you just{" "}
                    <span className="text-white-soft font-medium">
                      subscribed and scaled.
                    </span>
                  </p>
                  <p className="text-xl sm:text-2xl text-white-soft leading-relaxed font-medium">
                    Solynta Talent does exactly the same thing
                    <br className="hidden sm:block" />
                    for business operations.
                  </p>
                  <p className="text-lg text-ghost/60 leading-relaxed max-w-2xl mx-auto">
                    Every function you need to run but never wanted
                    to build — handled, with AI baked into every layer.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="inline-flex flex-col sm:flex-row gap-4 mb-6">
                  <a
                    href="/consultation"
                    className="group relative px-10 py-4 rounded-full bg-teal text-midnight font-semibold text-lg hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400 overflow-hidden"
                  >
                    <span className="relative z-10">
                      Get Your Free AI Analysis
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </a>
                  <a
                    href="#pricing"
                    className="px-10 py-4 rounded-full border border-white/10 text-white-soft font-medium text-lg hover:border-teal/40 hover:bg-white/[0.03] transition-all duration-400"
                  >
                    See Pricing
                  </a>
                </div>
                <p className="text-sm text-ghost/50 font-[var(--font-mono)] tracking-wide">
                  Start subscribing to one &rarr;
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
