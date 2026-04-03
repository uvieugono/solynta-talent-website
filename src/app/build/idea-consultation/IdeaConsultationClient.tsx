"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";
const CALENDLY = "https://calendly.com/uvieugono";

type Currency = "USD" | "GBP" | "NGN";
type Phase = "payment" | "questionnaire" | "analyzing" | "results";

interface IdeaResult {
  name: string;
  one_liner: string;
  problem: string;
  target_market: string;
  revenue_model: string;
  why_you: string;
  estimated_tier: string;
  estimated_price: string;
}

// ─── Pricing ───
const PRICES: Record<Currency, { amount: number; display: string; provider: string }> = {
  USD: { amount: 6900, display: "$69", provider: "stripe" },
  GBP: { amount: 4900, display: "\u00A349", provider: "stripe" },
  NGN: { amount: 1500000, display: "\u20A615,000", provider: "paystack" },
};

// ─── Questionnaire Data ───
const INTERESTS = [
  "Technology / Software", "Health & Fitness", "Education & Learning",
  "Finance & Investing", "Food & Agriculture", "Real Estate & Property",
  "E-commerce & Retail", "Travel & Hospitality", "Entertainment & Media",
  "Social Impact / Non-profit", "Transportation & Logistics",
  "Professional Services", "Beauty & Fashion", "Gaming",
  "Environment & Sustainability",
];

const SKILLS = [
  "Business strategy & planning", "Sales & marketing",
  "Customer service", "Project management", "Data analysis",
  "Financial management", "Content creation", "Social media",
  "Community building", "Team management",
  "Technical / coding basics", "Design / visual thinking",
  "Domain expertise (industry-specific)", "Operations & process improvement",
  "Networking & partnerships",
];

const TARGET_MARKETS = [
  { value: "nigeria", label: "Nigeria" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "africa", label: "Africa (multiple countries)" },
  { value: "global", label: "Global" },
];

const BUDGET_RANGES: Record<Currency, { value: string; label: string }[]> = {
  USD: [
    { value: "starter", label: "Starter — $299/mo" },
    { value: "growth", label: "Growth — $599/mo" },
    { value: "flexible", label: "Flexible — depends on the idea" },
  ],
  GBP: [
    { value: "starter", label: "Starter — \u00A3199/mo" },
    { value: "growth", label: "Growth — \u00A3399/mo" },
    { value: "flexible", label: "Flexible — depends on the idea" },
  ],
  NGN: [
    { value: "starter", label: "Starter — \u20A6250,000 one-time" },
    { value: "growth", label: "Growth — \u20A6500,000 one-time" },
    { value: "flexible", label: "Flexible — depends on the idea" },
  ],
};

const TIME_COMMITMENTS = [
  { value: "under-1hr", label: "Under 1 hour per day" },
  { value: "1-2hrs", label: "1\u20132 hours per day" },
  { value: "2-4hrs", label: "2\u20134 hours per day" },
  { value: "half-day", label: "Half day (4\u20136 hours)" },
  { value: "full-time", label: "Full-time" },
];

interface QuestionnaireData {
  name: string;
  email: string;
  interests: string[];
  skills: string[];
  industry_experience: string;
  target_market: string;
  budget_range: string;
  daily_time: string;
  passions: string;
  problems_noticed: string;
}

const initialData: QuestionnaireData = {
  name: "",
  email: "",
  interests: [],
  skills: [],
  industry_experience: "",
  target_market: "",
  budget_range: "",
  daily_time: "",
  passions: "",
  problems_noticed: "",
};

// ─── Icons ───
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: "300ms" }} />
    </span>
  );
}

// ─── Main Component ───
export default function IdeaConsultationClient() {
  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof document === "undefined") return "USD";
    const match = document.cookie.match(/(?:^|;\s*)st-market=([^;]*)/);
    const market = match?.[1];
    if (market === "uk") return "GBP";
    if (market === "ng") return "NGN";
    return "USD";
  });

  const [phase, setPhase] = useState<Phase>("payment");
  const [formData, setFormData] = useState<QuestionnaireData>(initialData);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<IdeaResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzingPhase, setAnalyzingPhase] = useState(0);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const price = PRICES[currency];

  // Check URL for payment callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const ref = params.get("reference") || params.get("session_id");
    if (paymentStatus === "success" && ref) {
      setPaymentVerified(true);
      setPhase("questionnaire");
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Analysis phases animation
  useEffect(() => {
    if (phase !== "analyzing") return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 7;
      setAnalyzingPhase(i);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  const updateField = useCallback(
    <K extends keyof QuestionnaireData>(key: K, value: QuestionnaireData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayItem = useCallback((key: "interests" | "skills", item: string) => {
    setFormData((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  }, []);

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
            product: "idea_consultation",
            pricing_currency: currency,
            amount: price.amount,
            payment_provider: price.provider,
          },
          source_url: window.location.href,
          form_type: "idea_consultation",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Payment initialisation failed");

      if (json.consultation_id) {
        setConsultationId(json.consultation_id);
      }

      // If backend returns a payment URL, redirect
      if (json.payment_url) {
        window.location.href = json.payment_url;
        return;
      }

      // If no payment URL (backend handles differently), proceed to questionnaire
      setPaymentVerified(true);
      setPhase("questionnaire");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Submit Questionnaire ───
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Save questionnaire data
      const body: Record<string, unknown> = {
        step: 1,
        data: {
          ...formData,
          pricing_currency: currency,
        },
        source_url: window.location.href,
        form_type: "idea_consultation",
      };
      if (consultationId) body.consultation_id = consultationId;

      const res = await fetch(`${API_BASE}/api/customer-service/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      const cId = json.consultation_id || consultationId;
      if (json.consultation_id) setConsultationId(json.consultation_id);

      // Trigger AI analysis
      setPhase("analyzing");

      const analyzeRes = await fetch(`${API_BASE}/api/customer-service/consultation/analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultation_id: cId }),
      });

      const analyzeJson = await analyzeRes.json();
      if (!analyzeRes.ok) throw new Error(analyzeJson.error || "Analysis failed");

      // If already completed
      if (analyzeJson.status === "completed" && analyzeJson.analysis) {
        setIdeas(parseIdeas(analyzeJson.analysis));
        setPhase("results");
        setIsSubmitting(false);
        return;
      }

      // Poll for results
      const pollInterval = 5000;
      const maxPolls = 60;
      let polls = 0;

      const poll = async () => {
        polls++;
        try {
          const pollRes = await fetch(`${API_BASE}/api/customer-service/consultation/${cId}/`);
          const pollData = await pollRes.json();

          if (pollData.status === "completed" && pollData.analysis) {
            setIdeas(parseIdeas(pollData.analysis));
            setPhase("results");
            setIsSubmitting(false);
            return;
          }

          if (pollData.status === "failed") {
            throw new Error("Analysis failed. Please try again.");
          }

          if (polls >= maxPolls) {
            throw new Error("Analysis is taking longer than expected. We'll email your results.");
          }

          setTimeout(poll, pollInterval);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Analysis check failed");
          setPhase("questionnaire");
          setIsSubmitting(false);
        }
      };

      setTimeout(poll, pollInterval);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setPhase("questionnaire");
      setIsSubmitting(false);
    }
  };

  // Parse ideas from analysis response
  const parseIdeas = (analysis: Record<string, unknown>): IdeaResult[] => {
    if (Array.isArray(analysis.ideas)) return analysis.ideas as IdeaResult[];
    if (analysis.recommended_ideas && Array.isArray(analysis.recommended_ideas)) return analysis.recommended_ideas as IdeaResult[];
    // Fallback: wrap the whole analysis
    return [analysis as unknown as IdeaResult];
  };

  const isFormValid = !!(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.email.includes("@") &&
    formData.interests.length > 0 &&
    formData.skills.length > 0 &&
    formData.target_market &&
    formData.daily_time
  );

  // ─── Payment Screen ───
  if (phase === "payment" && !paymentVerified) {
    const currencies: { key: Currency; flag: string; label: string }[] = [
      { key: "GBP", flag: "\uD83C\uDDEC\uD83C\uDDE7", label: "GBP" },
      { key: "USD", flag: "\uD83C\uDDFA\uD83C\uDDF8", label: "USD" },
      { key: "NGN", flag: "\uD83C\uDDF3\uD83C\uDDEC", label: "NGN" },
    ];

    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <Link href="/build" className="flex items-center gap-2 text-ghost text-sm mb-8 hover:text-teal transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Solynta Build
          </Link>

          <div className="bg-slate-dark/40 border border-white/5 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-lavender/15 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="6" stroke="#a78bfa" strokeWidth="2"/>
                  <path d="M10 28c0-4 2.5-7 6-7s6 3 6 7" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 8l4-4M22 4l4 4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <h1 className="font-[var(--font-display)] text-2xl font-bold text-white-soft mb-2">
                No idea? We&apos;ll find one for you.
              </h1>
              <p className="text-sm text-ghost/80">
                Answer a few questions about your skills, interests, and situation. Our AI will generate <span className="text-teal font-semibold">3 tailored software business ideas</span> you can start building today.
              </p>
            </div>

            {/* Currency toggle */}
            <div className="flex justify-center gap-2 mb-6">
              {currencies.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCurrency(c.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    currency === c.key
                      ? "bg-teal text-midnight"
                      : "bg-white/5 border border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  {c.flag} {c.label}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ghost/80">AI Idea Consultation</span>
                <span className="font-[var(--font-display)] text-2xl font-bold text-white-soft">{price.display}</span>
              </div>
              <ul className="space-y-2 text-sm text-ghost/70">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                  3 AI-generated software business ideas tailored to you
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                  Revenue model and target market for each idea
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                  Build cost estimate and recommended tier
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                  Why each idea is a good fit for your specific skills
                </li>
              </ul>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-coral/10 border border-coral/20 text-coral text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-teal text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity disabled:opacity-40"
            >
              {isSubmitting ? <LoadingDots /> : `Pay ${price.display} and get started`}
            </button>

            <p className="text-center text-ghost/40 text-xs mt-4">
              Powered by {price.provider === "stripe" ? "Stripe" : "Paystack"} \u00B7 Secure payment
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Analyzing Screen ───
  if (phase === "analyzing") {
    const phases = [
      "Analyzing your profile...",
      "Evaluating market opportunities...",
      "Matching skills to industries...",
      "Identifying revenue models...",
      "Generating business concept 1...",
      "Generating business concept 2...",
      "Generating business concept 3...",
    ];

    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-lavender/10 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-lavender/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="animate-pulse">
                <path d="M32 8C20 8 12 18 12 28c0 6 3 11 7 15l1 1v8c0 2 2 4 4 4h16c2 0 4-2 4-4v-8l1-1c4-4 7-9 7-15 0-10-8-20-20-20z" stroke="#a78bfa" strokeWidth="2" fill="#a78bfa15"/>
                <path d="M24 52h16M26 56h12" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="26" cy="28" r="3" fill="#a78bfa" opacity="0.8"/>
                <circle cx="38" cy="28" r="3" fill="#a78bfa" opacity="0.8"/>
              </svg>
            </div>
          </div>

          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-white-soft mb-3">
            Generating Your Ideas
          </h2>
          <p className="text-ghost mb-8">
            Our AI is analysing your profile and generating 3 tailored software business ideas.
          </p>

          <div className="space-y-3 text-left max-w-sm mx-auto">
            {phases.map((p, i) => (
              <div
                key={p}
                className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                  i < analyzingPhase ? "text-lavender" : i === analyzingPhase ? "text-white-soft" : "text-ghost/40"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {i < analyzingPhase ? <CheckIcon /> : i === analyzingPhase ? <LoadingDots /> : <span className="w-1.5 h-1.5 rounded-full bg-ghost/30" />}
                </span>
                <span>{p}</span>
              </div>
            ))}
          </div>

          <p className="text-ghost/50 text-xs mt-8">This typically takes 30\u201360 seconds</p>
        </div>
      </div>
    );
  }

  // ─── Results Screen ───
  if (phase === "results" && ideas.length > 0) {
    return (
      <div className="min-h-screen bg-midnight px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-teal/15 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M10 16L14 20L22 12" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="font-[var(--font-display)] text-3xl font-bold text-white-soft mb-2">
              Your Software Business Ideas
            </h1>
            <p className="text-ghost">
              Based on your skills, interests, and target market, here are 3 ideas tailored to you.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {ideas.map((idea, i) => (
              <div key={i} className="bg-slate-dark/40 border border-white/5 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal/10 text-teal text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-[var(--font-display)] text-xl font-bold text-white-soft">
                      {idea.name}
                    </h2>
                    <p className="text-sm text-teal mt-0.5">{idea.one_liner}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {idea.problem && (
                    <div className="bg-white/[0.02] rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Problem it solves</p>
                      <p className="text-sm text-ghost/80">{idea.problem}</p>
                    </div>
                  )}
                  {idea.target_market && (
                    <div className="bg-white/[0.02] rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Target market</p>
                      <p className="text-sm text-ghost/80">{idea.target_market}</p>
                    </div>
                  )}
                  {idea.revenue_model && (
                    <div className="bg-white/[0.02] rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Revenue model</p>
                      <p className="text-sm text-ghost/80">{idea.revenue_model}</p>
                    </div>
                  )}
                  {idea.why_you && (
                    <div className="bg-white/[0.02] rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ghost/40 font-medium mb-1">Why this fits you</p>
                      <p className="text-sm text-ghost/80">{idea.why_you}</p>
                    </div>
                  )}
                </div>

                {(idea.estimated_tier || idea.estimated_price) && (
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    {idea.estimated_tier && (
                      <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium">
                        {idea.estimated_tier} tier
                      </span>
                    )}
                    {idea.estimated_price && (
                      <span className="text-ghost/60">Est. {idea.estimated_price}</span>
                    )}
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-white/5">
                  <Link
                    href="/build/requirements"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal text-midnight text-sm font-[var(--font-display)] font-bold hover:opacity-85 transition-opacity"
                  >
                    Build this idea
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-ghost/60 text-sm mb-4">
              Ready to move forward with one of these ideas?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/build/requirements"
                className="px-8 py-3.5 rounded-full bg-teal text-midnight font-[var(--font-display)] font-bold text-sm hover:brightness-110 transition-all"
              >
                Submit Requirements
              </Link>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-white/10 text-white-soft font-[var(--font-display)] font-bold text-sm hover:border-teal/40 hover:text-teal transition-all"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Questionnaire ───
  return (
    <div className="min-h-screen bg-midnight">
      <nav className="fixed top-0 inset-x-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/build" className="flex items-center gap-2 text-white-soft font-[var(--font-display)] font-semibold text-lg hover:text-teal transition-colors">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#00d4aa" fillOpacity="0.15"/>
              <path d="M8 14h12M14 8v12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Solynta Build
          </Link>
          <span className="text-ghost text-sm font-mono">Idea Finder</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender/10 border border-lavender/20 text-lavender text-sm font-mono mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill="currentColor"/>
              </svg>
              AI Idea Consultation
            </div>
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-3">
              Tell us about yourself
            </h1>
            <p className="text-ghost max-w-lg mx-auto">
              The more we know about you, the better ideas we can generate. Answer honestly — there are no wrong answers.
            </p>
          </div>

          <div className="bg-slate-dark/30 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white-soft mb-1.5">
                  Full name <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                What industries or topics interest you? <span className="text-coral">*</span>
              </label>
              <p className="text-xs text-ghost/40 mb-2">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem("interests", item)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                      formData.interests.includes(item)
                        ? "bg-teal/15 border-teal/30 text-teal"
                        : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                What are your strongest skills? <span className="text-coral">*</span>
              </label>
              <p className="text-xs text-ghost/40 mb-2">Select your top 3\u20135</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem("skills", item)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                      formData.skills.includes(item)
                        ? "bg-lavender/15 border-lavender/30 text-lavender"
                        : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry experience */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                Do you have deep experience in a specific industry?
              </label>
              <textarea
                value={formData.industry_experience}
                onChange={(e) => updateField("industry_experience", e.target.value)}
                placeholder="e.g. 10 years in healthcare administration, 5 years as a logistics manager, former restaurant owner"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors resize-none"
              />
            </div>

            {/* Passions */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                What are you passionate about outside of work?
              </label>
              <textarea
                value={formData.passions}
                onChange={(e) => updateField("passions", e.target.value)}
                placeholder="e.g. Fitness, cooking, community development, teaching kids"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors resize-none"
              />
            </div>

            {/* Problems noticed */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                What problems have you noticed in your daily life or work that frustrate you?
              </label>
              <textarea
                value={formData.problems_noticed}
                onChange={(e) => updateField("problems_noticed", e.target.value)}
                placeholder="e.g. Hard to find reliable tradespeople, no easy way to track children's school progress, small businesses waste hours on invoicing"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors resize-none"
              />
            </div>

            {/* Target market */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                Where is your target market? <span className="text-coral">*</span>
              </label>
              <select
                value={formData.target_market}
                onChange={(e) => updateField("target_market", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors appearance-none"
              >
                <option value="">Select target market</option>
                {TARGET_MARKETS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                Budget for building your software
              </label>
              <select
                value={formData.budget_range}
                onChange={(e) => updateField("budget_range", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors appearance-none"
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES[currency].map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* Daily time */}
            <div>
              <label className="block text-sm font-medium text-white-soft mb-1.5">
                How much time can you spend running this business daily? <span className="text-coral">*</span>
              </label>
              <select
                value={formData.daily_time}
                onChange={(e) => updateField("daily_time", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors appearance-none"
              >
                <option value="">Select time commitment</option>
                {TIME_COMMITMENTS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-coral/10 border border-coral/20 text-coral text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              className="w-full py-3.5 rounded-xl bg-white text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <LoadingDots /> : "Generate my 3 ideas"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
