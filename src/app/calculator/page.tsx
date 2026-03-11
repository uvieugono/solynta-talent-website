// src/app/calculator/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StackCalculator from "@/components/StackCalculator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Build Your Operations Stack | Solynta Talent",
  description:
    "Choose your AI-powered business operations services and see your monthly total instantly. Pricing available in USD and NGN.",
};

export default function CalculatorPage() {
  return (
    <main>
      <Navbar />
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-midnight to-navy" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-teal mb-4 font-medium">
              Pricing Calculator
            </p>
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Build your business operations stack
            </h1>
            <p className="text-ghost text-lg max-w-2xl mx-auto">
              Select the services you need, choose your tier, and see your monthly total instantly.
              No setup fees. No long-term contracts. Cancel anytime.
            </p>
          </div>

          {/* Full-page calculator */}
          <StackCalculator fullPage />

          {/* Bottom note */}
          <p className="text-center text-xs text-ghost/40 mt-8">
            All prices shown are monthly retainers. Tiers may vary by service.
            Book a free consultation to get a personalised recommendation.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
