"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";
const CALENDLY = "https://calendly.com/uvieugono";

// ─── Types ───
type Currency = "USD" | "GBP" | "NGN";

interface FormData {
  // Step 1 — Contact & Company
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company_name: string;
  company_website: string;
  industry: string;
  company_stage: string;
  // Step 2 — The Big Picture
  product_name: string;
  one_liner: string;
  problem_statement: string;
  target_audience: string;
  existing_solutions: string;
  unique_advantage: string;
  // Step 3 — Users & Roles
  user_types: UserType[];
  estimated_users_at_launch: string;
  estimated_users_12_months: string;
  geographic_reach: string;
  // Step 4 — Core Features
  features: FeatureItem[];
  mvp_vs_full: string;
  // Step 5 — Data & Integrations
  data_types: string[];
  sensitive_data: boolean;
  compliance_needs: string[];
  integrations: string[];
  integrations_other: string;
  data_migration: string;
  // Step 6 — Look, Feel & Access
  branding_exists: string;
  design_references: string;
  platforms: string[];
  accessibility_needs: boolean;
  languages: string[];
  // Step 7 — Business Model & Launch
  revenue_model: string[];
  revenue_model_other: string;
  launch_deadline: string;
  budget_tier: string;
  daily_time_commitment: string;
  additional_notes: string;
}

interface UserType {
  name: string;
  description: string;
  permissions: string;
}

interface FeatureItem {
  name: string;
  description: string;
  priority: "must-have" | "nice-to-have" | "future";
}

// ─── Constants ───
const INDUSTRIES = [
  { value: "technology", label: "Technology / SaaS" },
  { value: "ecommerce", label: "E-commerce / Retail" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Financial Services" },
  { value: "real_estate", label: "Real Estate" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "professional_services", label: "Professional Services" },
  { value: "education", label: "Education" },
  { value: "hospitality", label: "Hospitality / Food" },
  { value: "energy", label: "Energy / Utilities" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "media", label: "Media / Entertainment" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "construction", label: "Construction" },
  { value: "agriculture", label: "Agriculture" },
  { value: "fitness", label: "Fitness / Wellness" },
  { value: "travel", label: "Travel / Tourism" },
  { value: "legal", label: "Legal" },
  { value: "other", label: "Other" },
];

const COMPANY_STAGES = [
  { value: "idea", label: "Just an idea — no business yet" },
  { value: "side-project", label: "Side project — no revenue" },
  { value: "early", label: "Early stage — some revenue" },
  { value: "growing", label: "Growing business — steady revenue" },
  { value: "established", label: "Established business — looking to digitise" },
  { value: "enterprise", label: "Enterprise / large organisation" },
];

const DATA_TYPES = [
  "User profiles & accounts",
  "Financial transactions",
  "Product / inventory catalogue",
  "Content (articles, media, files)",
  "Messaging / communications",
  "Booking / scheduling",
  "Analytics / usage metrics",
  "Geolocation data",
  "Medical / health records",
  "Legal documents",
];

const COMPLIANCE_OPTIONS = [
  "GDPR (EU data protection)",
  "PCI-DSS (payment card data)",
  "HIPAA (US health data)",
  "NDPR (Nigeria data protection)",
  "FCA (UK financial conduct)",
  "CBN (Central Bank of Nigeria)",
  "SOC 2 (security controls)",
  "None / unsure",
];

const COMMON_INTEGRATIONS = [
  "Stripe (payments)",
  "Paystack (payments — Africa)",
  "Google Maps / Geocoding",
  "Twilio (SMS / WhatsApp)",
  "SendGrid / Mailgun (email)",
  "Google Analytics",
  "Social login (Google, Facebook, Apple)",
  "AWS S3 (file storage)",
  "Zapier / webhook automation",
  "QuickBooks / Xero (accounting)",
  "Slack / Teams (notifications)",
  "Calendar (Google / Outlook)",
];

const PLATFORMS = [
  { value: "web", label: "Web application (browser)" },
  { value: "pwa", label: "Progressive Web App (installable)" },
  { value: "ios", label: "Native iOS app" },
  { value: "android", label: "Native Android app" },
  { value: "desktop", label: "Desktop application" },
];

const REVENUE_MODELS = [
  "Subscription (monthly/annual)",
  "One-time purchase",
  "Freemium (free tier + paid upgrades)",
  "Marketplace / commission",
  "Advertising",
  "Pay-per-use / usage-based",
  "Licensing / white-label",
  "Donations / tips",
  "Free (internal tool / non-profit)",
  "Other",
];

const BUDGET_TIERS = [
  { value: "starter", label: "Starter — up to 5 features, 1 integration" },
  { value: "growth", label: "Growth — up to 15 features, payments, analytics" },
  { value: "scale", label: "Scale — unlimited, enterprise-grade" },
  { value: "unsure", label: "Not sure yet — help me decide" },
];

const TIME_COMMITMENTS = [
  { value: "under-1hr", label: "Under 1 hour per day" },
  { value: "1-2hrs", label: "1–2 hours per day" },
  { value: "2-4hrs", label: "2–4 hours per day" },
  { value: "full-time", label: "Full-time (8+ hours)" },
  { value: "team", label: "I have a team to handle operations" },
];

const STEPS = [
  { num: 1, title: "Contact", subtitle: "About you" },
  { num: 2, title: "Big Picture", subtitle: "Your idea" },
  { num: 3, title: "Users", subtitle: "Who uses it" },
  { num: 4, title: "Features", subtitle: "What it does" },
  { num: 5, title: "Data", subtitle: "Technical needs" },
  { num: 6, title: "Design", subtitle: "Look & feel" },
  { num: 7, title: "Launch", subtitle: "Business model" },
];

const initialFormData: FormData = {
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  company_name: "",
  company_website: "",
  industry: "",
  company_stage: "",
  product_name: "",
  one_liner: "",
  problem_statement: "",
  target_audience: "",
  existing_solutions: "",
  unique_advantage: "",
  user_types: [{ name: "", description: "", permissions: "" }],
  estimated_users_at_launch: "",
  estimated_users_12_months: "",
  geographic_reach: "",
  features: [{ name: "", description: "", priority: "must-have" }],
  mvp_vs_full: "",
  data_types: [],
  sensitive_data: false,
  compliance_needs: [],
  integrations: [],
  integrations_other: "",
  data_migration: "",
  branding_exists: "",
  design_references: "",
  platforms: [],
  accessibility_needs: false,
  languages: ["English"],
  revenue_model: [],
  revenue_model_other: "",
  launch_deadline: "",
  budget_tier: "",
  daily_time_commitment: "",
  additional_notes: "",
};

// ─── Icon Components ───
function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4h10M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1M11 4v7a1 1 0 01-1 1H4a1 1 0 01-1-1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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

// ─── Reusable Form Components ───
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-white-soft mb-1.5">
      {children}
      {required && <span className="text-coral ml-1">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm placeholder:text-ghost/40 focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors resize-none"
    />
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-slate-dark/60 border border-white/10 text-white-soft text-sm focus:border-teal/40 focus:outline-none focus:ring-1 focus:ring-teal/20 transition-colors appearance-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function ChipSelect({ items, selected, onToggle }: {
  items: string[]; selected: string[]; onToggle: (item: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onToggle(item)}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
            selected.includes(item)
              ? "bg-teal/15 border-teal/30 text-teal"
              : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───
export default function RequirementsWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzingPhase, setAnalyzingPhase] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Get currency from cookie for display
  const [currency] = useState<Currency>(() => {
    if (typeof document === "undefined") return "USD";
    const match = document.cookie.match(/(?:^|;\s*)st-market=([^;]*)/);
    const market = match?.[1];
    if (market === "uk") return "GBP";
    if (market === "ng") return "NGN";
    return "USD";
  });

  // Analysis phases animation
  useEffect(() => {
    if (!isAnalyzing) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 6;
      setAnalyzingPhase(i);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayItem = useCallback((key: keyof FormData, item: string) => {
    setFormData((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  }, []);

  // ─── Save Step ───
  const saveStep = async (stepNum: number) => {
    setIsSubmitting(true);
    setError(null);

    let data: Record<string, unknown> = {};

    if (stepNum === 1) {
      data = {
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        company_name: formData.company_name,
        company_website: formData.company_website,
        industry: formData.industry,
        company_stage: formData.company_stage,
      };
    } else if (stepNum === 2) {
      data = {
        product_name: formData.product_name,
        one_liner: formData.one_liner,
        problem_statement: formData.problem_statement,
        target_audience: formData.target_audience,
        existing_solutions: formData.existing_solutions,
        unique_advantage: formData.unique_advantage,
      };
    } else if (stepNum === 3) {
      data = {
        user_types: formData.user_types.filter((u) => u.name.trim()),
        estimated_users_at_launch: formData.estimated_users_at_launch,
        estimated_users_12_months: formData.estimated_users_12_months,
        geographic_reach: formData.geographic_reach,
      };
    } else if (stepNum === 4) {
      data = {
        features: formData.features.filter((f) => f.name.trim()),
        mvp_vs_full: formData.mvp_vs_full,
      };
    } else if (stepNum === 5) {
      data = {
        data_types: formData.data_types,
        sensitive_data: formData.sensitive_data,
        compliance_needs: formData.compliance_needs,
        integrations: formData.integrations,
        integrations_other: formData.integrations_other,
        data_migration: formData.data_migration,
      };
    } else if (stepNum === 6) {
      data = {
        branding_exists: formData.branding_exists,
        design_references: formData.design_references,
        platforms: formData.platforms,
        accessibility_needs: formData.accessibility_needs,
        languages: formData.languages,
      };
    } else if (stepNum === 7) {
      data = {
        revenue_model: formData.revenue_model,
        revenue_model_other: formData.revenue_model_other,
        launch_deadline: formData.launch_deadline,
        budget_tier: formData.budget_tier,
        daily_time_commitment: formData.daily_time_commitment,
        additional_notes: formData.additional_notes,
        pricing_currency: currency,
      };
    }

    try {
      const body: Record<string, unknown> = {
        step: stepNum,
        data,
        source_url: window.location.href,
        form_type: "build_requirements",
      };
      if (consultationId) body.consultation_id = consultationId;

      const res = await fetch(`${API_BASE}/api/customer-service/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to save. Please try again.");
      }

      if (json.consultation_id) {
        setConsultationId(json.consultation_id);
      }

      setIsSubmitting(false);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
      return false;
    }
  };

  const handleNext = async () => {
    if (step < 7) {
      const saved = await saveStep(step);
      if (saved) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const saved = await saveStep(7);
    if (!saved || !consultationId) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/customer-service/consultation/analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultation_id: consultationId }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Submission failed. Please try again.");
      }

      // Mark complete — the backend will email the scoping document
      setIsAnalyzing(false);
      setIsComplete(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setIsAnalyzing(false);
    }
  };

  // ─── Validation ───
  const isStepValid = (s: number): boolean => {
    switch (s) {
      case 1:
        return !!(
          formData.contact_name.trim() &&
          formData.contact_email.trim() &&
          formData.contact_email.includes("@") &&
          formData.industry
        );
      case 2:
        return !!(
          formData.one_liner.trim() &&
          formData.problem_statement.trim() &&
          formData.target_audience.trim()
        );
      case 3:
        return formData.user_types.some((u) => u.name.trim());
      case 4:
        return formData.features.some((f) => f.name.trim());
      case 5:
        return true; // all optional
      case 6:
        return formData.platforms.length > 0;
      case 7:
        return !!(formData.budget_tier && formData.daily_time_commitment);
      default:
        return true;
    }
  };

  // ─── Processing Screen ───
  if (isAnalyzing) {
    const phases = [
      "Packaging your requirements...",
      "Validating feature specifications...",
      "Mapping integrations and data flows...",
      "Generating project scope...",
      "Preparing your scoping document...",
      "Finalising submission...",
    ];
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-teal/10 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="animate-pulse">
                <rect x="12" y="8" width="40" height="48" rx="4" stroke="#00d4aa" strokeWidth="2" fill="#00d4aa15"/>
                <path d="M20 20h24M20 28h24M20 36h16" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                <path d="M20 44h8" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </div>
          </div>

          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-white-soft mb-3">
            Processing Your Requirements
          </h2>
          <p className="text-ghost mb-8">
            We&apos;re packaging your software requirements into a detailed brief for our engineering team.
          </p>

          <div className="space-y-3 text-left max-w-sm mx-auto">
            {phases.map((phase, i) => (
              <div
                key={phase}
                className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                  i < analyzingPhase
                    ? "text-teal"
                    : i === analyzingPhase
                    ? "text-white-soft"
                    : "text-ghost/40"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {i < analyzingPhase ? (
                    <CheckIcon />
                  ) : i === analyzingPhase ? (
                    <LoadingDots />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-ghost/30" />
                  )}
                </span>
                <span>{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Completion Screen ───
  if (isComplete) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-teal/15 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 20L17 27L30 14" stroke="#00d4aa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="font-[var(--font-display)] text-3xl font-bold text-white-soft mb-4">
            Requirements received
          </h2>
          <p className="text-ghost text-lg mb-2">
            Your software requirements have been submitted successfully.
          </p>
          <p className="text-ghost/70 text-sm mb-8 max-w-md mx-auto">
            Our team will review your requirements and deliver a detailed Product Requirements Document (PRD) and scoping estimate within 48 hours. Check your email at <span className="text-teal">{formData.contact_email}</span>.
          </p>

          <div className="bg-slate-dark/40 border border-white/5 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-sm font-medium text-white-soft mb-3">What happens next?</h3>
            <ol className="space-y-3 text-sm text-ghost/80">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">1</span>
                <span>We review your requirements and prepare a detailed PRD</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">2</span>
                <span>You receive the PRD and scoping estimate via email (48 hours)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">3</span>
                <span>We schedule a 30-minute call to walk through the plan</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">4</span>
                <span>Once you approve, we start building — live within 30 days</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-teal text-midnight font-[var(--font-display)] text-sm font-bold hover:opacity-85 transition-opacity"
            >
              Book a call now
            </a>
            <Link
              href="/build"
              className="px-6 py-3 rounded-xl bg-slate-dark/50 border border-white/10 text-white-soft font-[var(--font-display)] text-sm font-bold hover:border-white/20 transition-colors"
            >
              Back to Solynta Build
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Step Renderers ───
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Contact & Company</h3>
              <p className="text-sm text-ghost/60">Tell us who you are and what your business does.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label required>Full name</Label>
                <Input value={formData.contact_name} onChange={(v) => updateField("contact_name", v)} placeholder="Your full name" required />
              </div>
              <div>
                <Label required>Email</Label>
                <Input value={formData.contact_email} onChange={(v) => updateField("contact_email", v)} placeholder="you@company.com" type="email" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input value={formData.contact_phone} onChange={(v) => updateField("contact_phone", v)} placeholder="+44 7..." />
              </div>
              <div>
                <Label>Company / brand name</Label>
                <Input value={formData.company_name} onChange={(v) => updateField("company_name", v)} placeholder="Your company" />
              </div>
            </div>
            <div>
              <Label>Company website</Label>
              <Input value={formData.company_website} onChange={(v) => updateField("company_website", v)} placeholder="https://..." />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label required>Industry</Label>
                <Select value={formData.industry} onChange={(v) => updateField("industry", v)} options={INDUSTRIES} placeholder="Select industry" />
              </div>
              <div>
                <Label>Company stage</Label>
                <Select value={formData.company_stage} onChange={(v) => updateField("company_stage", v)} options={COMPANY_STAGES} placeholder="Select stage" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">The Big Picture</h3>
              <p className="text-sm text-ghost/60">Describe the software you want to build. Think about the problem it solves and who it helps.</p>
            </div>
            <div>
              <Label>Product name (if you have one)</Label>
              <Input value={formData.product_name} onChange={(v) => updateField("product_name", v)} placeholder="e.g. TaskFlow, MediBook, RentEasy" />
            </div>
            <div>
              <Label required>One-liner</Label>
              <Input value={formData.one_liner} onChange={(v) => updateField("one_liner", v)} placeholder="Describe your software in one sentence" />
              <p className="text-xs text-ghost/40 mt-1">e.g. &quot;An app that connects local farmers directly to restaurants for same-day produce delivery&quot;</p>
            </div>
            <div>
              <Label required>What problem does this solve?</Label>
              <TextArea value={formData.problem_statement} onChange={(v) => updateField("problem_statement", v)} placeholder="Describe the pain point your users currently face. What are they doing today that doesn't work well?" rows={4} />
            </div>
            <div>
              <Label required>Who is your target audience?</Label>
              <TextArea value={formData.target_audience} onChange={(v) => updateField("target_audience", v)} placeholder="Describe your ideal user. What industry are they in? What's their role? What's their technical level?" rows={3} />
            </div>
            <div>
              <Label>What existing solutions do your users currently use?</Label>
              <TextArea value={formData.existing_solutions} onChange={(v) => updateField("existing_solutions", v)} placeholder="List competitor products, manual processes, or workarounds your target audience currently relies on" rows={3} />
            </div>
            <div>
              <Label>What makes your solution different or better?</Label>
              <TextArea value={formData.unique_advantage} onChange={(v) => updateField("unique_advantage", v)} placeholder="Your unique advantage — why would someone switch to your product?" rows={3} />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Users & Roles</h3>
              <p className="text-sm text-ghost/60">Define the different types of people who will use your software and what each type can do.</p>
            </div>

            {formData.user_types.map((ut, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ghost/40 font-mono">User type {i + 1}</span>
                  {formData.user_types.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.user_types.filter((_, idx) => idx !== i);
                        updateField("user_types", updated);
                      }}
                      className="text-ghost/40 hover:text-coral transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                <div>
                  <Label required>Role name</Label>
                  <Input
                    value={ut.name}
                    onChange={(v) => {
                      const updated = [...formData.user_types];
                      updated[i] = { ...ut, name: v };
                      updateField("user_types", updated);
                    }}
                    placeholder="e.g. Customer, Admin, Vendor, Doctor"
                  />
                </div>
                <div>
                  <Label>What do they use the software for?</Label>
                  <TextArea
                    value={ut.description}
                    onChange={(v) => {
                      const updated = [...formData.user_types];
                      updated[i] = { ...ut, description: v };
                      updateField("user_types", updated);
                    }}
                    placeholder="Describe their typical workflow and what they need to accomplish"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>What can they access or control?</Label>
                  <TextArea
                    value={ut.permissions}
                    onChange={(v) => {
                      const updated = [...formData.user_types];
                      updated[i] = { ...ut, permissions: v };
                      updateField("user_types", updated);
                    }}
                    placeholder="e.g. Can view orders, manage products, access analytics, modify settings"
                    rows={2}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => updateField("user_types", [...formData.user_types, { name: "", description: "", permissions: "" }])}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal/10 border border-teal/20 text-teal text-sm font-medium hover:bg-teal/15 transition-colors"
            >
              <PlusIcon /> Add another user type
            </button>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Expected users at launch</Label>
                <Select
                  value={formData.estimated_users_at_launch}
                  onChange={(v) => updateField("estimated_users_at_launch", v)}
                  options={[
                    { value: "1-10", label: "1–10" },
                    { value: "10-50", label: "10–50" },
                    { value: "50-200", label: "50–200" },
                    { value: "200-1000", label: "200–1,000" },
                    { value: "1000+", label: "1,000+" },
                  ]}
                  placeholder="Select range"
                />
              </div>
              <div>
                <Label>Expected users in 12 months</Label>
                <Select
                  value={formData.estimated_users_12_months}
                  onChange={(v) => updateField("estimated_users_12_months", v)}
                  options={[
                    { value: "1-50", label: "1–50" },
                    { value: "50-500", label: "50–500" },
                    { value: "500-5000", label: "500–5,000" },
                    { value: "5000-50000", label: "5,000–50,000" },
                    { value: "50000+", label: "50,000+" },
                  ]}
                  placeholder="Select range"
                />
              </div>
            </div>
            <div>
              <Label>Geographic reach</Label>
              <Input value={formData.geographic_reach} onChange={(v) => updateField("geographic_reach", v)} placeholder="e.g. Nigeria only, UK and US, global" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Core Features</h3>
              <p className="text-sm text-ghost/60">List the features your software needs. Be as specific as possible — this is what we&apos;ll build.</p>
            </div>

            {formData.features.map((feat, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ghost/40 font-mono">Feature {i + 1}</span>
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.features.filter((_, idx) => idx !== i);
                        updateField("features", updated);
                      }}
                      className="text-ghost/40 hover:text-coral transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                <div>
                  <Label required>Feature name</Label>
                  <Input
                    value={feat.name}
                    onChange={(v) => {
                      const updated = [...formData.features];
                      updated[i] = { ...feat, name: v };
                      updateField("features", updated);
                    }}
                    placeholder="e.g. User registration, Product search, Booking calendar"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <TextArea
                    value={feat.description}
                    onChange={(v) => {
                      const updated = [...formData.features];
                      updated[i] = { ...feat, description: v };
                      updateField("features", updated);
                    }}
                    placeholder="Describe what this feature does in detail — the more specific, the better our estimate"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Priority</Label>
                  <div className="flex gap-2">
                    {(["must-have", "nice-to-have", "future"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          const updated = [...formData.features];
                          updated[i] = { ...feat, priority: p };
                          updateField("features", updated);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          feat.priority === p
                            ? p === "must-have"
                              ? "bg-teal/15 border-teal/30 text-teal"
                              : p === "nice-to-have"
                              ? "bg-gold/15 border-gold/30 text-gold"
                              : "bg-white/5 border-white/20 text-ghost"
                            : "bg-white/[0.03] border-white/10 text-ghost/50 hover:border-white/20"
                        }`}
                      >
                        {p === "must-have" ? "Must have" : p === "nice-to-have" ? "Nice to have" : "Future"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => updateField("features", [...formData.features, { name: "", description: "", priority: "must-have" }])}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal/10 border border-teal/20 text-teal text-sm font-medium hover:bg-teal/15 transition-colors"
            >
              <PlusIcon /> Add another feature
            </button>

            <div>
              <Label>Launch approach</Label>
              <Select
                value={formData.mvp_vs_full}
                onChange={(v) => updateField("mvp_vs_full", v)}
                options={[
                  { value: "mvp", label: "Start with MVP (must-haves only), add features later" },
                  { value: "full", label: "Build all features before launch" },
                  { value: "unsure", label: "Not sure — help me decide" },
                ]}
                placeholder="How would you like to approach the build?"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Data & Integrations</h3>
              <p className="text-sm text-ghost/60">Help us understand what data your software handles and what it needs to connect to.</p>
            </div>

            <div>
              <Label>What types of data will your software store?</Label>
              <ChipSelect items={DATA_TYPES} selected={formData.data_types} onToggle={(item) => toggleArrayItem("data_types", item)} />
            </div>

            <div>
              <Label>Does your software handle sensitive or regulated data?</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField("sensitive_data", true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    formData.sensitive_data ? "bg-teal/15 border-teal/30 text-teal" : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateField("sensitive_data", false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    !formData.sensitive_data ? "bg-teal/15 border-teal/30 text-teal" : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  No / not sure
                </button>
              </div>
            </div>

            {formData.sensitive_data && (
              <div>
                <Label>Which compliance frameworks apply?</Label>
                <ChipSelect items={COMPLIANCE_OPTIONS} selected={formData.compliance_needs} onToggle={(item) => toggleArrayItem("compliance_needs", item)} />
              </div>
            )}

            <div>
              <Label>Third-party services to integrate with</Label>
              <ChipSelect items={COMMON_INTEGRATIONS} selected={formData.integrations} onToggle={(item) => toggleArrayItem("integrations", item)} />
            </div>
            <div>
              <Label>Other integrations not listed above</Label>
              <Input value={formData.integrations_other} onChange={(v) => updateField("integrations_other", v)} placeholder="e.g. Custom ERP, proprietary API, specific CRM" />
            </div>

            <div>
              <Label>Do you have existing data that needs migrating?</Label>
              <Select
                value={formData.data_migration}
                onChange={(v) => updateField("data_migration", v)}
                options={[
                  { value: "none", label: "No — starting fresh" },
                  { value: "spreadsheets", label: "Yes — from spreadsheets / CSV" },
                  { value: "existing-software", label: "Yes — from another software system" },
                  { value: "database", label: "Yes — from an existing database" },
                  { value: "unsure", label: "Not sure" },
                ]}
                placeholder="Select option"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Look, Feel & Access</h3>
              <p className="text-sm text-ghost/60">Tell us about design preferences, platforms, and accessibility.</p>
            </div>

            <div>
              <Label>Do you have existing branding (logo, colours, fonts)?</Label>
              <Select
                value={formData.branding_exists}
                onChange={(v) => updateField("branding_exists", v)}
                options={[
                  { value: "full", label: "Yes — full brand guide" },
                  { value: "basic", label: "Yes — logo and colours only" },
                  { value: "none", label: "No — I need branding designed" },
                  { value: "flexible", label: "Flexible — open to suggestions" },
                ]}
                placeholder="Select option"
              />
            </div>

            <div>
              <Label>Any websites or apps you like the look of?</Label>
              <TextArea value={formData.design_references} onChange={(v) => updateField("design_references", v)} placeholder="Paste URLs or describe the style you like. e.g. 'Clean like Stripe, friendly like Notion'" rows={3} />
            </div>

            <div>
              <Label required>Which platforms do you need?</Label>
              <ChipSelect
                items={PLATFORMS.map((p) => p.label)}
                selected={formData.platforms}
                onToggle={(item) => toggleArrayItem("platforms", item)}
              />
            </div>

            <div>
              <Label>Do you need WCAG accessibility compliance?</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField("accessibility_needs", true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    formData.accessibility_needs ? "bg-teal/15 border-teal/30 text-teal" : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateField("accessibility_needs", false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    !formData.accessibility_needs ? "bg-teal/15 border-teal/30 text-teal" : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                  }`}
                >
                  No / not sure
                </button>
              </div>
            </div>

            <div>
              <Label>Languages your software needs to support</Label>
              <div className="flex flex-wrap gap-2">
                {["English", "French", "Arabic", "Yoruba", "Hausa", "Igbo", "Spanish", "Portuguese"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleArrayItem("languages", lang)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                      formData.languages.includes(lang)
                        ? "bg-teal/15 border-teal/30 text-teal"
                        : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white-soft mb-1">Business Model & Launch</h3>
              <p className="text-sm text-ghost/60">Help us understand how your software will make money and when you want to launch.</p>
            </div>

            <div>
              <Label>How will your software generate revenue?</Label>
              <ChipSelect items={REVENUE_MODELS} selected={formData.revenue_model} onToggle={(item) => toggleArrayItem("revenue_model", item)} />
            </div>

            {formData.revenue_model.includes("Other") && (
              <div>
                <Label>Describe your revenue model</Label>
                <Input value={formData.revenue_model_other} onChange={(v) => updateField("revenue_model_other", v)} placeholder="How will your software make money?" />
              </div>
            )}

            <div>
              <Label>When do you want to launch?</Label>
              <Select
                value={formData.launch_deadline}
                onChange={(v) => updateField("launch_deadline", v)}
                options={[
                  { value: "asap", label: "As soon as possible (30 days)" },
                  { value: "1-2-months", label: "1–2 months" },
                  { value: "3-6-months", label: "3–6 months" },
                  { value: "flexible", label: "No hard deadline" },
                ]}
                placeholder="Select timeline"
              />
            </div>

            <div>
              <Label required>Which tier fits your needs?</Label>
              <div className="space-y-2">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => updateField("budget_tier", tier.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                      formData.budget_tier === tier.value
                        ? "bg-teal/15 border-teal/30 text-teal"
                        : "bg-white/[0.03] border-white/10 text-ghost hover:border-white/20"
                    }`}
                  >
                    {tier.label}
                    {tier.value === "starter" && (
                      <span className="block text-xs text-ghost/40 mt-0.5">
                        {currency === "NGN" ? "From \u20A6250,000" : currency === "GBP" ? "From \u00A3199/mo" : "From $299/mo"}
                      </span>
                    )}
                    {tier.value === "growth" && (
                      <span className="block text-xs text-ghost/40 mt-0.5">
                        {currency === "NGN" ? "From \u20A6500,000" : currency === "GBP" ? "From \u00A3399/mo" : "From $599/mo"}
                      </span>
                    )}
                    {tier.value === "scale" && (
                      <span className="block text-xs text-ghost/40 mt-0.5">
                        {currency === "NGN" ? "From \u20A62,000,000" : currency === "GBP" ? "From \u00A32,000/mo" : "From $3,000/mo"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label required>How much time can you dedicate to running this daily?</Label>
              <Select
                value={formData.daily_time_commitment}
                onChange={(v) => updateField("daily_time_commitment", v)}
                options={TIME_COMMITMENTS}
                placeholder="Select time commitment"
              />
            </div>

            <div>
              <Label>Anything else we should know?</Label>
              <TextArea
                value={formData.additional_notes}
                onChange={(v) => updateField("additional_notes", v)}
                placeholder="Any constraints, preferences, or context that would help us scope your project accurately"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ─── Main Render ───
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/build" className="flex items-center gap-2 text-white-soft font-[var(--font-display)] font-semibold text-lg hover:text-teal transition-colors">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#00d4aa" fillOpacity="0.15"/>
              <path d="M8 14h12M14 8v12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Solynta Build
          </Link>
          <span className="text-ghost text-sm font-mono">Requirements</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-mono mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Software Requirements Form
            </div>
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white-soft mb-3">
              Tell us what you want built
            </h1>
            <p className="text-ghost max-w-lg mx-auto">
              This form replaces a phone consultation. The more detail you provide, the faster we can scope and price your project.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3 overflow-x-auto">
              {STEPS.map((s) => (
                <button
                  key={s.num}
                  onClick={() => {
                    if (s.num < step) setStep(s.num);
                  }}
                  className={`flex flex-col items-center gap-1 group flex-shrink-0 ${
                    s.num < step ? "cursor-pointer" : s.num === step ? "" : "cursor-default"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      s.num < step
                        ? "bg-teal text-midnight"
                        : s.num === step
                        ? "bg-teal/20 text-teal border-2 border-teal"
                        : "bg-slate-dark text-ghost border border-white/10"
                    }`}
                  >
                    {s.num < step ? <CheckIcon /> : s.num}
                  </div>
                  <span className="text-[10px] text-ghost hidden sm:block">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="h-1 bg-white/5 rounded-full">
              <div
                className="h-full bg-teal rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-slate-dark/30 border border-white/5 rounded-2xl p-6 sm:p-8">
            {renderStep()}

            {error && (
              <div className="mt-4 px-4 py-3 rounded-xl bg-coral/10 border border-coral/20 text-coral text-sm">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-ghost text-sm font-medium hover:text-white-soft transition-colors"
                >
                  <ArrowLeft /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 7 ? (
                <button
                  onClick={handleNext}
                  disabled={isSubmitting || !isStepValid(step)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-teal text-midnight text-sm font-[var(--font-display)] font-bold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <LoadingDots />
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isStepValid(step)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-white text-midnight text-sm font-[var(--font-display)] font-bold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <LoadingDots /> : "Submit requirements"}
                </button>
              )}
            </div>
          </div>

          {/* Step indicator */}
          <p className="text-center text-ghost/40 text-xs mt-4">
            Step {step} of 7
          </p>
        </div>
      </div>
    </div>
  );
}
