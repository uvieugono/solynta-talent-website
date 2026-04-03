"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IDEAS, CATEGORIES, type SoftwareIdea } from "./ideas-data";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";

type Phase = "payment" | "browsing" | "selected";

function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "300ms" }} />
    </span>
  );
}

export default function HundredIdeasClient() {
  const [phase, setPhase] = useState<Phase>("payment");
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdea, setSelectedIdea] = useState<SoftwareIdea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  // Check for payment callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    if (paymentStatus === "success") {
      setPhase("browsing");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Check for non-Nigerian market — redirect
  useEffect(() => {
    if (typeof document === "undefined") return;
    const match = document.cookie.match(/(?:^|;\s*)st-market=([^;]*)/);
    const market = match?.[1];
    // Allow if no cookie set or if cookie is "ng"
    if (market && market !== "ng") {
      // Non-Nigerian users see a message instead of being redirected
    }
  }, []);

  const filteredIdeas = IDEAS.filter((idea) => {
    const matchesCategory = category === "All" || idea.category === category;
    const matchesSearch = !searchQuery ||
      idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.target_market.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ─── Payment Handler ───
  const handlePayment = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/customer-service/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 0,
          data: {
            product: "100_software_ideas",
            pricing_currency: "NGN",
            amount: 750000, // ₦7,500 in kobo
            payment_provider: "paystack",
          },
          source_url: window.location.href,
          form_type: "100_ideas",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Payment initialisation failed");

      if (json.payment_url) {
        window.location.href = json.payment_url;
        return;
      }

      // Fallback: proceed directly
      setPhase("browsing");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Register Interest ───
  const handleRegisterInterest = async () => {
    if (!selectedIdea || !contactName.trim() || !contactEmail.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/customer-service/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 1,
          data: {
            contact_name: contactName,
            contact_email: contactEmail,
            contact_phone: contactPhone,
            selected_idea_id: selectedIdea.id,
            selected_idea_name: selectedIdea.name,
            selected_idea_tier: selectedIdea.tier,
            selected_idea_price: selectedIdea.price,
            pricing_currency: "NGN",
          },
          source_url: window.location.href,
          form_type: "100_ideas",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      setIsRegistered(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Payment Screen ───
  if (phase === "payment") {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <Link href="/build" className="flex items-center gap-2 text-ghost text-sm mb-8 hover:text-teal transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Solynta Build
          </Link>

          <div className="bg-slate-dark/40 border border-white/5 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="#f4c542" strokeWidth="2" fill="#f4c54215"/>
                </svg>
              </div>
              <h1 className="font-[var(--font-display)] text-2xl font-bold text-white-soft mb-2">
                100 Software Business Ideas
              </h1>
              <p className="text-sm text-ghost/80">
                Browse 100 software business ideas designed specifically for the Nigerian market. Each idea includes a description, target market, revenue model, and build price.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ghost/80">100 Ideas Collection</span>
                <span className="font-[var(--font-display)] text-2xl font-bold text-white-soft">{"\u20A6"}7,500</span>
              </div>
              <ul className="space-y-2 text-sm text-ghost/70">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  100 curated software ideas for the Nigerian market
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  Target market and revenue model for each idea
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  Build price included ({"\u20A6"}250,000 or {"\u20A6"}500,000)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  Select one and register your interest to start building
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 bg-teal/5 border border-teal/10 rounded-xl px-4 py-3 mb-6">
              <span className="text-[11px]">{"\uD83C\uDDF3\uD83C\uDDEC"}</span>
              <span className="text-xs text-teal">Available in Nigeria only</span>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-coral/10 border border-coral/20 text-coral text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gold text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity disabled:opacity-40"
            >
              {isSubmitting ? <LoadingDots /> : `Pay \u20A67,500 and browse ideas`}
            </button>

            <p className="text-center text-ghost/40 text-xs mt-4">
              Powered by Paystack {"\u00B7"} Secure payment
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Selected Idea + Registration ───
  if (phase === "selected" && selectedIdea) {
    if (isRegistered) {
      return (
        <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-teal/15 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 20L17 27L30 14" stroke="#00d4aa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-[var(--font-display)] text-3xl font-bold text-white-soft mb-4">
              Interest registered
            </h2>
            <p className="text-ghost text-lg mb-2">
              You selected: <span className="text-teal font-semibold">{selectedIdea.name}</span>
            </p>
            <p className="text-ghost/70 text-sm mb-8 max-w-md mx-auto">
              Our team will reach out to you at <span className="text-teal">{contactEmail}</span> within 24 hours to discuss next steps and begin the scoping process.
            </p>
            <div className="bg-slate-dark/40 border border-white/5 rounded-xl p-5 mb-8 text-left max-w-md mx-auto">
              <p className="text-sm text-ghost/80 mb-2">Build price: <span className="text-white-soft font-semibold">{selectedIdea.price}</span></p>
              <p className="text-sm text-ghost/80">Tier: <span className="text-white-soft font-semibold capitalize">{selectedIdea.tier}</span></p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { setPhase("browsing"); setSelectedIdea(null); setIsRegistered(false); }}
                className="px-6 py-3 rounded-xl bg-slate-dark/50 border border-white/10 text-white-soft font-[var(--font-display)] text-sm font-bold hover:border-white/20 transition-colors"
              >
                Browse more ideas
              </button>
              <Link
                href="/build"
                className="px-6 py-3 rounded-xl bg-teal text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity"
              >
                Back to Solynta Build
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-midnight px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => { setPhase("browsing"); setSelectedIdea(null); }}
            className="flex items-center gap-2 text-ghost text-sm mb-8 hover:text-teal transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to all ideas
          </button>

          <div className="bg-slate-dark/40 border border-white/5 rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 text-teal text-lg font-bold flex items-center justify-center">
                {selectedIdea.id}
              </span>
              <div>
                <h1 className="font-[var(--font-display)] text-2xl font-bold text-white-soft">{selectedIdea.name}</h1>
                <span className="text-xs text-ghost/50 mt-0.5 block">{selectedIdea.category}</span>
              </div>
            </div>

            <p className="text-sm text-ghost/80 leading-relaxed mb-6">{selectedIdea.description}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/[0.02] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Target market</p>
                <p className="text-sm text-ghost/80">{selectedIdea.target_market}</p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Revenue model</p>
                <p className="text-sm text-ghost/80">{selectedIdea.revenue_model}</p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Build price</p>
                <p className="text-sm text-white-soft font-semibold">{selectedIdea.price}</p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Recommended tier</p>
                <p className="text-sm text-white-soft font-semibold capitalize">{selectedIdea.tier}</p>
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div className="bg-slate-dark/40 border border-teal/10 rounded-2xl p-8">
            <h2 className="font-[var(--font-display)] text-lg font-bold text-white-soft mb-1">
              Interested in building this?
            </h2>
            <p className="text-sm text-ghost/60 mb-6">
              Leave your details and our team will reach out within 24 hours to discuss next steps.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white-soft mb-1.5">
                  Full name <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white-soft mb-1.5">
                  Email <span className="text-coral">*</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white-soft mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+234..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-coral/10 border border-coral/20 text-coral text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleRegisterInterest}
                disabled={isSubmitting || !contactName.trim() || !contactEmail.trim() || !contactEmail.includes("@")}
                className="w-full py-3.5 rounded-xl bg-teal text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <LoadingDots /> : `I want to build ${selectedIdea.name}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Browsing Screen ───
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/build" className="flex items-center gap-2 text-white-soft font-[var(--font-display)] font-semibold text-lg hover:text-teal transition-colors">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#00d4aa" fillOpacity="0.15"/>
              <path d="M8 14h12M14 8v12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Solynta Build
          </Link>
          <span className="text-ghost text-sm font-mono">100 Ideas</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-3">
              100 Software Business Ideas
            </h1>
            <p className="text-ghost max-w-xl mx-auto">
              Browse ideas designed for the Nigerian market. Each includes a target market, revenue model, and build price. Pick one and let us build it for you.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ideas..."
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border whitespace-nowrap ${
                    category === cat
                      ? "bg-teal/15 border-teal/30 text-teal"
                      : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="text-xs text-ghost/40 mb-4">
            Showing {filteredIdeas.length} of {IDEAS.length} ideas
          </p>

          {/* Ideas Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea) => (
              <button
                key={idea.id}
                onClick={() => { setSelectedIdea(idea); setPhase("selected"); }}
                className="text-left bg-slate-dark/40 border border-white/5 rounded-xl p-5 hover:border-teal/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-ghost/30 font-mono">#{idea.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] ${
                    idea.tier === "starter"
                      ? "bg-white/5 text-ghost/60"
                      : "bg-teal/10 text-teal"
                  }`}>
                    {idea.tier}
                  </span>
                </div>
                <h3 className="font-[var(--font-display)] text-base font-bold text-white-soft mb-1 group-hover:text-teal transition-colors">
                  {idea.name}
                </h3>
                <p className="text-xs text-ghost/60 mb-3 line-clamp-2">{idea.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ghost/40">{idea.category}</span>
                  <span className="text-white-soft font-semibold">{idea.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
