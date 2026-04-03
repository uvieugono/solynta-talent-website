"use client";
type Currency = "USD" | "GBP" | "NGN";
interface Props { currency: Currency; setCurrency: (c: Currency) => void; }
export default function BuildPricing({ currency, setCurrency }: Props) {
  return <section id="pricing" className="relative py-28"><div className="max-w-7xl mx-auto px-6"><p className="text-ghost">BuildPricing placeholder — {currency}</p></div></section>;
}
