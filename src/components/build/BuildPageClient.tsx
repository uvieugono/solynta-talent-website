"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuildHero from "./BuildHero";
import BuildHowItWorks from "./BuildHowItWorks";
import BuildFeatures from "./BuildFeatures";
import BuildPricing from "./BuildPricing";
import BuildIncomeScenarios from "./BuildIncomeScenarios";
import BuildFAQ from "./BuildFAQ";
import BuildCTA from "./BuildCTA";

type Currency = "USD" | "GBP" | "NGN";

function getDefaultCurrency(): Currency {
  if (typeof document === "undefined") return "USD";
  const match = document.cookie.match(/(?:^|;\s*)st-market=([^;]*)/);
  const market = match?.[1];
  if (market === "uk") return "GBP";
  if (market === "ng") return "NGN";
  return "USD";
}

export default function BuildPageClient() {
  const [currency, setCurrency] = useState<Currency>(getDefaultCurrency);

  return (
    <main>
      <Navbar />
      <BuildHero />
      <BuildHowItWorks />
      <BuildFeatures />
      <BuildPricing currency={currency} setCurrency={setCurrency} />
      <BuildIncomeScenarios currency={currency} />
      <BuildFAQ currency={currency} />
      <BuildCTA />
      <Footer />
    </main>
  );
}
