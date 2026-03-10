"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackTrialStart } from "@/lib/analytics";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
    title: "Accredited Curriculum",
    desc: "Internationally recognized K-12 program that meets US education standards across all 50 states.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Flexible Scheduling",
    desc: "Learn at your own pace. Set your own schedule around your family's lifestyle and commitments.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Certified Teachers",
    desc: "Experienced, certified educators provide personalized attention and mentoring for every student.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
    title: "AI-Enhanced Learning",
    desc: "Smart tools adapt to each student's learning style, providing targeted support where they need it most.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: "Community & Support",
    desc: "Join a vibrant community of homeschool families with regular virtual events, clubs, and social activities.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Safe & Trusted",
    desc: "A secure online environment with parental controls and transparent progress reporting.",
  },
];

const steps = [
  { num: "1", text: "Check your email for a welcome message with login details." },
  { num: "2", text: "Complete your student profile and choose your grade level." },
  { num: "3", text: "Start your free trial and explore the full curriculum." },
];

export default function USHomePage() {
  useEffect(() => {
    // Fire Facebook Pixel Lead event on page load (successful form submission)
    const w = window as unknown as Record<string, (...args: unknown[]) => void>;
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead");
    }
  }, []);

  const handleStartTrial = () => {
    trackTrialStart();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[120px]" />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-[120px]" />

      {/* Top nav */}
      <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        <Link
          href="/"
          className="text-sm text-ghost hover:text-teal transition-colors"
        >
          &larr; Solynta Talent
        </Link>
        <span className="text-xs font-medium tracking-widest uppercase text-teal">
          Solynta Academy
        </span>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        {/* Hero / Thank you */}
        <section className="text-center pt-8 pb-16">
          {/* Checkmark */}
          <div className="animate-fade-up mx-auto w-20 h-20 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-teal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="animate-fade-up delay-100 font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Welcome to{" "}
            <span className="text-gradient">Solynta Academy!</span>
          </h1>

          <p className="animate-fade-up delay-200 text-ghost text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            Thank you for signing up. We are excited to have your family join
            our learning community. Here is what happens next:
          </p>
        </section>

        {/* What happens next */}
        <section className="animate-fade-up delay-300 mb-16">
          <div className="rounded-2xl border border-white/10 bg-slate-dark/40 backdrop-blur-sm p-8">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-white-soft mb-6 text-center">
              Next Steps
            </h2>
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center text-teal font-semibold text-sm">
                    {step.num}
                  </div>
                  <p className="text-ghost text-base leading-relaxed pt-1">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Start Free Trial CTA */}
        <section className="animate-fade-up delay-400 text-center mb-20">
          <button
            onClick={handleStartTrial}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-teal text-midnight font-bold text-lg hover:shadow-2xl hover:shadow-teal/25 transition-all duration-400"
          >
            <span className="relative z-10">Start Free Trial</span>
            <svg
              className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <p className="text-ghost/60 text-sm mt-4">
            No credit card required. Full access for 14 days.
          </p>
        </section>

        {/* Program benefits */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Why Solynta Academy
            </p>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Education designed for{" "}
              <span className="text-gradient">modern families</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-slate-dark/30 p-6 hover:border-teal/30 hover:bg-slate-dark/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                  {b.icon}
                </div>
                <h3 className="font-[var(--font-display)] text-base font-semibold text-white-soft mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-ghost leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-white/5 pt-8">
          <p className="text-ghost/50 text-sm">
            &copy; {new Date().getFullYear()} Solynta Academy. All rights
            reserved.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <Link
              href="/"
              className="text-xs text-ghost/40 hover:text-teal transition-colors"
            >
              Solynta Talent
            </Link>
            <Link
              href="/us/enroll"
              className="text-xs text-ghost/40 hover:text-teal transition-colors"
            >
              Enroll
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
