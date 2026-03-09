"use client";

const stats = [
  { value: "40", label: "AI Agents", suffix: "" },
  { value: "8", label: "Service Modules", suffix: "" },
  { value: "$250", label: "Starting From", suffix: "/mo" },
  { value: "70-85", label: "AI Automation", suffix: "%" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-[120px]" />

      {/* Orbital ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.02] hidden lg:block">
        <div className="animate-orbit">
          <div className="w-2 h-2 rounded-full bg-teal/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-teal">
              Business Operations as a Service
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            Where Talent
            <br />
            Meets{" "}
            <span className="text-gradient">Intelligence</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-200 text-lg sm:text-xl text-ghost max-w-2xl mb-10 leading-relaxed">
            8 AI-augmented service modules. 40 purpose-built AI agents.
            Pick what you need. Pay only for what you use.
            Scale as your business grows.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-16">
            <a
              href="https://calendly.com/uvieugono"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-full bg-teal text-midnight font-semibold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400"
            >
              <span className="relative z-10">Book Free Discovery Call</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full border border-white/10 text-white-soft font-medium text-base hover:border-teal/40 hover:bg-white/5 transition-all duration-400"
            >
              Explore Services
            </a>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-10 border-t border-white/5">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft stat-number">
                  {s.value}
                  <span className="text-teal text-xl">{s.suffix}</span>
                </div>
                <div className="text-sm text-ghost mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ghost/50">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-teal animate-bounce" />
        </div>
      </div>
    </section>
  );
}
