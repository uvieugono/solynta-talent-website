"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Currency, MODULES as PRICING_MODULES, formatPrice, getModulePrice } from "@/lib/pricing";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";

// ─── Types ───
interface FormData {
  // Step 1 - Contact
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_role: string;
  // Step 2 - Company
  company_name: string;
  company_website: string;
  industry: string;
  company_size: string;
  annual_revenue: string;
  company_description: string;
  years_in_business: string;
  // Step 3 - Operations
  current_departments: string[];
  current_team_size: Record<string, string>;
  current_tools: string[];
  monthly_software_spend: string;
  // Step 4 - Pain Points
  pain_points: string[];
  pain_points_detail: string;
  goals: string[];
  timeline: string;
  budget_range: string;
  // Step 5 - Module Interests
  needs_finance: boolean;
  needs_sales_crm: boolean;
  needs_customer_service: boolean;
  needs_hr: boolean;
  needs_marketing: boolean;
  needs_developers: boolean;
  needs_data_science: boolean;
  needs_enterprise_intel: boolean;
  needs_inventory: boolean;
}

interface AnalysisReport {
  executive_summary: string;
  company_assessment: {
    overview: string;
    strengths: string[];
    gaps: string[];
    risk_factors: string[];
    maturity_level: string;
  };
  recommended_modules: Array<{
    module_key: string;
    module_name: string;
    recommended_tier: string;
    monthly_cost: number;
    priority: string;
    rationale: string;
    specific_processes: string[];
    agents_deployed: string[];
    quick_wins: string[];
    current_gap_addressed: string;
  }>;
  implementation_roadmap: {
    phase_1: { title: string; modules: string[]; tasks: string[]; deliverables: string[] };
    phase_2: { title: string; modules: string[]; tasks: string[]; deliverables: string[] };
    phase_3: { title: string; modules: string[]; tasks: string[]; deliverables: string[] };
  };
  financial_analysis: {
    currency?: 'USD' | 'NGN';
    monthly_investment: number;
    annual_investment: number;
    estimated_current_cost: number;
    annual_savings: number;
    roi_percentage: number;
    payback_period: string;
    software_savings: string;
    headcount_equivalent: number;
    cost_breakdown: Array<{ module: string; monthly: number; replaces: string }>;
  };
  onboarding_process: Array<{
    step: number;
    title: string;
    description: string;
    duration: string;
    client_action_required: string;
  }>;
  industry_insights: string;
  competitive_advantage: string;
  next_steps: string[];
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
  { value: "other", label: "Other" },
];

const COMPANY_SIZES = [
  { value: "1-5", label: "1-5 employees" },
  { value: "6-15", label: "6-15 employees" },
  { value: "16-50", label: "16-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const REVENUE_RANGES = [
  { value: "pre-revenue", label: "Pre-revenue" },
  { value: "0-100k", label: "$0 - $100K" },
  { value: "100k-500k", label: "$100K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m-20m", label: "$5M - $20M" },
  { value: "20m+", label: "$20M+" },
];

const DEPARTMENTS = [
  { id: "finance", label: "Finance / Accounting", icon: "chart" },
  { id: "sales", label: "Sales", icon: "target" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
  { id: "customer_service", label: "Customer Service", icon: "headset" },
  { id: "hr", label: "HR / People Ops", icon: "people" },
  { id: "engineering", label: "Engineering / Dev", icon: "code" },
  { id: "operations", label: "Operations", icon: "gear" },
  { id: "data", label: "Data / Analytics", icon: "data" },
  { id: "inventory", label: "Inventory / Supply Chain", icon: "box" },
  { id: "admin", label: "Admin / IT", icon: "shield" },
];

const PAIN_POINTS = [
  "Spending too much time on manual processes",
  "Can't afford to hire the team we need",
  "Using too many disconnected tools",
  "No visibility into operations or metrics",
  "Struggling with financial management",
  "Customer support is overwhelmed",
  "Marketing is inconsistent or non-existent",
  "Can't find or retain technical talent",
  "Data is scattered and inaccessible",
  "Inventory management is chaotic",
  "Compliance and audit concerns",
  "Scaling operations is a bottleneck",
];

const GOALS = [
  "Reduce operational costs",
  "Automate repetitive processes",
  "Scale without proportional headcount",
  "Get real-time business insights",
  "Improve customer experience",
  "Build a professional online presence",
  "Implement AI-powered workflows",
  "Consolidate tools into one platform",
  "Improve financial reporting",
  "Enter new markets or expand",
  "Build a data-driven culture",
  "Free up time for strategic work",
];

const SOFTWARE_TOOLS = [
  "QuickBooks", "Xero", "FreshBooks", "Sage", "Wave",
  "HubSpot", "Salesforce", "Zoho CRM", "Pipedrive",
  "Mailchimp", "ActiveCampaign", "Constant Contact",
  "Slack", "Microsoft Teams", "Google Workspace",
  "Trello", "Asana", "Monday.com", "Jira", "Notion",
  "Shopify", "WooCommerce", "Squarespace",
  "WordPress", "Wix",
  "Gusto", "BambooHR", "ADP",
  "Zendesk", "Freshdesk", "Intercom",
  "Google Analytics", "Tableau", "Power BI",
  "Excel / Spreadsheets",
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-weeks", label: "Within 1-2 weeks" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "exploring", label: "Just exploring options" },
];

const BUDGET_RANGES = [
  { value: "under-500", label: "Under $500/mo" },
  { value: "500-1000", label: "$500 - $1,000/mo" },
  { value: "1000-2000", label: "$1,000 - $2,000/mo" },
  { value: "2000-5000", label: "$2,000 - $5,000/mo" },
  { value: "5000+", label: "$5,000+/mo" },
  { value: "flexible", label: "Flexible / ROI-driven" },
];

const NGN_BUDGET_RANGES = [
  { value: "ngn-under-200k", label: "Under ₦200,000/mo" },
  { value: "ngn-200k-400k",  label: "₦200,000 – ₦400,000/mo" },
  { value: "ngn-400k-800k",  label: "₦400,000 – ₦800,000/mo" },
  { value: "ngn-800k-2m",    label: "₦800,000 – ₦2,000,000/mo" },
  { value: "ngn-2m-plus",    label: "₦2,000,000+/mo" },
  { value: "flexible",       label: "Flexible / ROI-driven" },
];

const MODULES = [
  {
    key: "needs_finance",
    name: "Finance Core",
    price: "$500/mo",
    desc: "Bookkeeping, P&L, payroll, tax compliance",
    agents: 4,
    color: "teal",
  },
  {
    key: "needs_sales_crm",
    name: "Sales, CRM & Web",
    price: "$250/mo",
    desc: "Website, SEO, CRM, pipeline management",
    agents: 4,
    color: "blue",
  },
  {
    key: "needs_customer_service",
    name: "AI Customer Service",
    price: "$250/mo",
    desc: "24/7 chatbot, email triage, WhatsApp",
    agents: 3,
    color: "purple",
  },
  {
    key: "needs_hr",
    name: "HR & Admin Ops",
    price: "$250/mo",
    desc: "Onboarding, leave tracking, vendor management",
    agents: 3,
    color: "amber",
  },
  {
    key: "needs_marketing",
    name: "Marketing",
    price: "from $500/mo",
    desc: "Social media, PPC, content, video, SEO",
    agents: 7,
    color: "pink",
  },
  {
    key: "needs_developers",
    name: "Embedded Developers",
    price: "from $500/mo",
    desc: "Full Stack, QA, DevOps, UI/UX, Tech Lead",
    agents: 5,
    color: "emerald",
  },
  {
    key: "needs_data_science",
    name: "Data Science",
    price: "from $250/mo",
    desc: "ML models, dashboards, ETL, BI, analytics",
    agents: 6,
    color: "cyan",
  },
  {
    key: "needs_enterprise_intel",
    name: "Enterprise Intelligence",
    price: "from $500/mo",
    desc: "KPI dashboards, strategy, governance",
    agents: 4,
    color: "violet",
  },
  {
    key: "needs_inventory",
    name: "Inventory Management",
    price: "from $250/mo",
    desc: "Stock tracking, demand forecasting, warehouse",
    agents: 4,
    color: "orange",
  },
];

const STEPS = [
  { num: 1, title: "About You", subtitle: "Tell us who you are" },
  { num: 2, title: "Your Company", subtitle: "Company profile" },
  { num: 3, title: "Operations", subtitle: "Current setup" },
  { num: 4, title: "Challenges", subtitle: "Pain points & goals" },
  { num: 5, title: "Services", subtitle: "What you need" },
];

const initialFormData: FormData = {
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  contact_role: "",
  company_name: "",
  company_website: "",
  industry: "",
  company_size: "",
  annual_revenue: "",
  company_description: "",
  years_in_business: "",
  current_departments: [],
  current_team_size: {},
  current_tools: [],
  monthly_software_spend: "",
  pain_points: [],
  pain_points_detail: "",
  goals: [],
  timeline: "",
  budget_range: "",
  needs_finance: false,
  needs_sales_crm: false,
  needs_customer_service: false,
  needs_hr: false,
  needs_marketing: false,
  needs_developers: false,
  needs_data_science: false,
  needs_enterprise_intel: false,
  needs_inventory: false,
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

function Sparkles() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" fill="currentColor"/>
      <path d="M15 1L15.5 3L17.5 3.5L15.5 4L15 6L14.5 4L12.5 3.5L14.5 3L15 1Z" fill="currentColor" opacity="0.6"/>
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
export default function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toolSearch, setToolSearch] = useState("");
  const [analyzingPhase, setAnalyzingPhase] = useState(0);
  const [currency, setCurrency] = useState<Currency>("USD");

  function handleCurrencyChange(c: Currency) {
    setCurrency(c);
    const isNgnCode = formData.budget_range.startsWith("ngn-");
    const isUsdCode = !isNgnCode && formData.budget_range !== "" && formData.budget_range !== "flexible";
    if ((c === "NGN" && isUsdCode) || (c === "USD" && isNgnCode)) {
      updateField("budget_range", "");
    }
  }

  // Analysis phases animation
  useEffect(() => {
    if (!isAnalyzing) return;
    const phases = [
      "Ingesting company data...",
      "Analyzing industry patterns...",
      "Mapping operational gaps...",
      "Computing ROI projections...",
      "Designing implementation roadmap...",
      "Selecting AI agent configurations...",
      "Generating recommendations...",
      "Compiling final report...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % phases.length;
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

  const saveStep = async (stepNum: number) => {
    setIsSubmitting(true);
    setError(null);

    let data: Record<string, unknown> = {};
    if (stepNum === 1) {
      data = {
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        contact_role: formData.contact_role,
      };
    } else if (stepNum === 2) {
      data = {
        company_name: formData.company_name,
        company_website: formData.company_website,
        industry: formData.industry,
        company_size: formData.company_size,
        annual_revenue: formData.annual_revenue,
        company_description: formData.company_description,
        years_in_business: formData.years_in_business ? parseInt(formData.years_in_business) : null,
      };
    } else if (stepNum === 3) {
      data = {
        current_departments: formData.current_departments,
        current_team_size: formData.current_team_size,
        current_tools: formData.current_tools,
        monthly_software_spend: formData.monthly_software_spend ? parseFloat(formData.monthly_software_spend) : null,
      };
    } else if (stepNum === 4) {
      data = {
        pain_points: formData.pain_points,
        pain_points_detail: formData.pain_points_detail,
        goals: formData.goals,
        timeline: formData.timeline,
        budget_range: formData.budget_range,
      };
    } else if (stepNum === 5) {
      data = {
        needs_finance: formData.needs_finance,
        needs_sales_crm: formData.needs_sales_crm,
        needs_customer_service: formData.needs_customer_service,
        needs_hr: formData.needs_hr,
        needs_marketing: formData.needs_marketing,
        needs_developers: formData.needs_developers,
        needs_data_science: formData.needs_data_science,
        needs_enterprise_intel: formData.needs_enterprise_intel,
        needs_inventory: formData.needs_inventory,
        pricing_currency: currency,
      };
    }

    try {
      const body: Record<string, unknown> = {
        step: stepNum,
        data,
        source_url: window.location.href,
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
    if (step < 5) {
      const saved = await saveStep(step);
      if (saved) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitAndAnalyze = async () => {
    // Save step 5 first
    const saved = await saveStep(5);
    if (!saved || !consultationId) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Trigger analysis — marks consultation for the AI Business Consultant agent
      const res = await fetch(`${API_BASE}/api/customer-service/consultation/analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultation_id: consultationId }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Analysis failed. Please try again.");
      }

      // If already completed (cached result), show immediately
      if (json.status === "completed" && json.analysis) {
        setAnalysisReport(json.analysis);
        setStep(6);
        setIsAnalyzing(false);
        return;
      }

      // Poll for results — the AI Business Consultant agent processes asynchronously
      const pollInterval = 5000; // 5 seconds
      const maxPolls = 60; // 5 minutes max
      let polls = 0;

      const poll = async () => {
        polls++;
        try {
          const pollRes = await fetch(
            `${API_BASE}/api/customer-service/consultation/${consultationId}/`
          );
          const pollData = await pollRes.json();

          if (pollData.status === "completed" && pollData.analysis) {
            setAnalysisReport(pollData.analysis);
            setStep(6);
            setIsAnalyzing(false);
            return;
          }

          if (pollData.status === "failed") {
            throw new Error("Analysis failed. Please try again.");
          }

          if (polls >= maxPolls) {
            throw new Error(
              "Analysis is taking longer than expected. We'll email your results to you shortly."
            );
          }

          // Continue polling
          setTimeout(poll, pollInterval);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Analysis check failed");
          setIsAnalyzing(false);
        }
      };

      // Start polling after a short delay
      setTimeout(poll, pollInterval);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setIsAnalyzing(false);
    }
  };

  // Validation
  const isStepValid = (s: number): boolean => {
    switch (s) {
      case 1:
        return !!(formData.contact_name.trim() && formData.contact_email.trim() && formData.contact_email.includes("@"));
      case 2:
        return !!(formData.company_name.trim() && formData.industry && formData.company_size);
      case 3:
        return formData.current_departments.length > 0;
      case 4:
        return formData.pain_points.length > 0 && formData.goals.length > 0;
      case 5:
        return true; // Module selection is optional — AI will recommend
      default:
        return true;
    }
  };

  // ─── Analyzing Screen ───
  if (isAnalyzing) {
    const phases = [
      "Ingesting company data...",
      "Analyzing industry patterns...",
      "Mapping operational gaps...",
      "Computing ROI projections...",
      "Designing implementation roadmap...",
      "Selecting AI agent configurations...",
      "Generating recommendations...",
      "Compiling final report...",
    ];
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          {/* Animated Brain */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-teal/10 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="animate-pulse">
                <path d="M32 8C20 8 12 18 12 28c0 6 3 11 7 15l1 1v8c0 2 2 4 4 4h16c2 0 4-2 4-4v-8l1-1c4-4 7-9 7-15 0-10-8-20-20-20z" stroke="#00d4aa" strokeWidth="2" fill="#00d4aa15"/>
                <path d="M24 52h16M26 56h12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="26" cy="28" r="3" fill="#00d4aa" opacity="0.8"/>
                <circle cx="38" cy="28" r="3" fill="#00d4aa" opacity="0.8"/>
                <path d="M26 28c2 4 8 4 12 0" stroke="#00d4aa" strokeWidth="1.5" opacity="0.5"/>
                <path d="M22 20c-2 2-3 5-3 8M42 20c2 2 3 5 3 8" stroke="#00d4aa" strokeWidth="1" opacity="0.4"/>
              </svg>
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-white-soft mb-3">
            AI Consultant at Work
          </h2>
          <p className="text-ghost mb-8">
            Our AI Business Consultant is analyzing your business across 40+ dimensions and preparing a custom roadmap.
          </p>

          {/* Progress phases */}
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

          <p className="text-ghost/50 text-xs mt-8">
            This typically takes 30-60 seconds
          </p>
        </div>
      </div>
    );
  }

  // ─── Report View ───
  if (step === 6 && analysisReport) {
    return <ReportView report={analysisReport} companyName={formData.company_name} contactName={formData.contact_name} currency={currency} />;
  }

  // ─── Wizard Steps ───
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white-soft font-display font-semibold text-lg hover:text-teal transition-colors">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#00d4aa" fillOpacity="0.15"/>
              <path d="M8 14h12M14 8v12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Solynta Talent
          </Link>
          <span className="text-ghost text-sm font-mono">AI Consultation</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-mono mb-4">
              <Sparkles /> Free AI Business Analysis
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white-soft mb-3">
              {step <= 5 ? "Tell us about your business" : "Your Custom Analysis"}
            </h1>
            <p className="text-ghost max-w-lg mx-auto">
              {step <= 5
                ? "Our AI will analyze your operations and deliver a comprehensive roadmap in minutes — not weeks."
                : "Your personalized business analysis is ready."}
            </p>
          </div>

          {/* Currency toggle */}
          <div className="flex justify-center gap-2 mb-6">
            {(["USD", "NGN"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => handleCurrencyChange(c)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  currency === c
                    ? "bg-teal text-midnight"
                    : "bg-white/5 text-ghost border border-white/10 hover:border-teal/30"
                }`}
              >
                <span>{c === "USD" ? "🇺🇸" : "🇳🇬"}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s) => (
                <button
                  key={s.num}
                  onClick={() => {
                    if (s.num < step) setStep(s.num);
                  }}
                  className={`flex flex-col items-center gap-1 group ${
                    s.num < step ? "cursor-pointer" : s.num === step ? "" : "cursor-default"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      s.num < step
                        ? "bg-teal text-midnight"
                        : s.num === step
                        ? "bg-teal/20 text-teal border-2 border-teal"
                        : "bg-slate-dark text-ghost border border-white/10"
                    }`}
                  >
                    {s.num < step ? <CheckIcon /> : s.num}
                  </div>
                  <span className="text-xs text-ghost hidden sm:block">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="h-1 bg-slate-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal to-lavender rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-coral/10 border border-coral/20 text-coral text-sm">
              {error}
            </div>
          )}

          {/* Step Content */}
          <div className="bg-slate-dark/50 border border-white/5 rounded-2xl p-6 sm:p-8">
            {step === 1 && (
              <StepContact formData={formData} updateField={updateField} />
            )}
            {step === 2 && (
              <StepCompany formData={formData} updateField={updateField} />
            )}
            {step === 3 && (
              <StepOperations
                formData={formData}
                updateField={updateField}
                toggleArrayItem={toggleArrayItem}
                toolSearch={toolSearch}
                setToolSearch={setToolSearch}
              />
            )}
            {step === 4 && (
              <StepChallenges
                formData={formData}
                updateField={updateField}
                toggleArrayItem={toggleArrayItem}
                currency={currency}
              />
            )}
            {step === 5 && (
              <StepModules formData={formData} updateField={updateField} currency={currency} />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                step === 1
                  ? "text-ghost/30 cursor-not-allowed"
                  : "text-ghost hover:text-white-soft hover:bg-slate-dark"
              }`}
            >
              <ArrowLeft /> Back
            </button>

            {step < 5 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid(step) || isSubmitting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  isStepValid(step) && !isSubmitting
                    ? "bg-teal text-midnight hover:bg-teal/90 shadow-lg shadow-teal/20"
                    : "bg-slate-mid text-ghost/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? <LoadingDots /> : <>Continue <ArrowRight /></>}
              </button>
            ) : (
              <button
                onClick={handleSubmitAndAnalyze}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-gradient-to-r from-teal to-emerald-400 text-midnight hover:opacity-90 shadow-lg shadow-teal/30 transition-all"
              >
                {isSubmitting ? <LoadingDots /> : <><Sparkles /> Generate My Analysis</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Step Components ───

function StepContact({ formData, updateField }: { formData: FormData; updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-semibold text-white-soft mb-1">Let&apos;s start with you</h3>
        <p className="text-ghost text-sm">We&apos;ll personalize your analysis and send results to your email.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Full Name *" value={formData.contact_name} onChange={(v) => updateField("contact_name", v)} placeholder="Jane Smith" />
        <InputField label="Email *" type="email" value={formData.contact_email} onChange={(v) => updateField("contact_email", v)} placeholder="jane@company.com" />
        <InputField label="Phone" type="tel" value={formData.contact_phone} onChange={(v) => updateField("contact_phone", v)} placeholder="+1 (555) 123-4567" />
        <InputField label="Your Role" value={formData.contact_role} onChange={(v) => updateField("contact_role", v)} placeholder="CEO, COO, Operations Manager..." />
      </div>
    </div>
  );
}

function StepCompany({ formData, updateField }: { formData: FormData; updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-semibold text-white-soft mb-1">About your company</h3>
        <p className="text-ghost text-sm">This helps us tailor recommendations to your specific situation.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Company Name *" value={formData.company_name} onChange={(v) => updateField("company_name", v)} placeholder="Acme Corp" />
        <InputField label="Website" value={formData.company_website} onChange={(v) => updateField("company_website", v)} placeholder="https://acme.com" />
        <SelectField label="Industry *" value={formData.industry} onChange={(v) => updateField("industry", v)} options={INDUSTRIES} placeholder="Select industry" />
        <SelectField label="Company Size *" value={formData.company_size} onChange={(v) => updateField("company_size", v)} options={COMPANY_SIZES} placeholder="Select size" />
        <SelectField label="Annual Revenue" value={formData.annual_revenue} onChange={(v) => updateField("annual_revenue", v)} options={REVENUE_RANGES} placeholder="Select range" />
        <InputField label="Years in Business" type="number" value={formData.years_in_business} onChange={(v) => updateField("years_in_business", v)} placeholder="3" />
      </div>
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-1.5">Company Description</label>
        <textarea
          value={formData.company_description}
          onChange={(e) => updateField("company_description", e.target.value)}
          placeholder="Brief description of what your company does, who your customers are..."
          rows={3}
          className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-lg text-white-soft placeholder:text-ghost/50 text-sm focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/20 transition-all resize-none"
        />
      </div>
    </div>
  );
}

function StepOperations({
  formData,
  updateField,
  toggleArrayItem,
  toolSearch,
  setToolSearch,
}: {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  toggleArrayItem: (key: keyof FormData, item: string) => void;
  toolSearch: string;
  setToolSearch: (v: string) => void;
}) {
  const filteredTools = SOFTWARE_TOOLS.filter((t) =>
    t.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-white-soft mb-1">Current operations</h3>
        <p className="text-ghost text-sm">Help us understand what you&apos;re working with today.</p>
      </div>

      {/* Departments */}
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-3">Which departments do you have? *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DEPARTMENTS.map((dept) => {
            const selected = formData.current_departments.includes(dept.id);
            return (
              <button
                key={dept.id}
                onClick={() => toggleArrayItem("current_departments", dept.id)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                  selected
                    ? "bg-teal/15 border border-teal/40 text-teal"
                    : "bg-navy border border-white/8 text-ghost hover:border-white/20 hover:text-white-soft"
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team sizes for selected departments */}
      {formData.current_departments.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-white-soft/80 mb-3">Team size per department</label>
          <div className="grid sm:grid-cols-2 gap-3">
            {formData.current_departments.map((deptId) => {
              const dept = DEPARTMENTS.find((d) => d.id === deptId);
              return (
                <div key={deptId} className="flex items-center gap-3">
                  <span className="text-sm text-ghost flex-1">{dept?.label}</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.current_team_size[deptId] || ""}
                    onChange={(e) =>
                      updateField("current_team_size", {
                        ...formData.current_team_size,
                        [deptId]: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="w-20 px-3 py-1.5 bg-navy border border-white/10 rounded-lg text-white-soft text-sm text-center focus:outline-none focus:border-teal/50 transition-all"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Software tools */}
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-2">Software tools you currently use</label>
        <input
          type="text"
          value={toolSearch}
          onChange={(e) => setToolSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full mb-3 px-4 py-2 bg-navy border border-white/10 rounded-lg text-white-soft placeholder:text-ghost/50 text-sm focus:outline-none focus:border-teal/50 transition-all"
        />
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
          {filteredTools.map((tool) => {
            const selected = formData.current_tools.includes(tool);
            return (
              <button
                key={tool}
                onClick={() => toggleArrayItem("current_tools", tool)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selected
                    ? "bg-teal/20 border border-teal/40 text-teal"
                    : "bg-navy border border-white/8 text-ghost hover:text-white-soft"
                }`}
              >
                {tool}
              </button>
            );
          })}
        </div>
      </div>

      <InputField
        label="Monthly software spend (approx.)"
        type="number"
        value={formData.monthly_software_spend}
        onChange={(v) => updateField("monthly_software_spend", v)}
        placeholder="350"
        prefix="$"
      />
    </div>
  );
}

function StepChallenges({
  formData,
  updateField,
  toggleArrayItem,
  currency,
}: {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  toggleArrayItem: (key: keyof FormData, item: string) => void;
  currency: Currency;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-white-soft mb-1">Challenges & Goals</h3>
        <p className="text-ghost text-sm">What&apos;s keeping you up at night — and where do you want to be?</p>
      </div>

      {/* Pain Points */}
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-3">What are your biggest challenges? *</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {PAIN_POINTS.map((point) => {
            const selected = formData.pain_points.includes(point);
            return (
              <button
                key={point}
                onClick={() => toggleArrayItem("pain_points", point)}
                className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                  selected
                    ? "bg-coral/10 border border-coral/30 text-coral"
                    : "bg-navy border border-white/8 text-ghost hover:border-white/20 hover:text-white-soft"
                }`}
              >
                {point}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-1.5">Anything else about your challenges?</label>
        <textarea
          value={formData.pain_points_detail}
          onChange={(e) => updateField("pain_points_detail", e.target.value)}
          placeholder="Tell us more about what's not working and what you've tried..."
          rows={3}
          className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-lg text-white-soft placeholder:text-ghost/50 text-sm focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/20 transition-all resize-none"
        />
      </div>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-white-soft/80 mb-3">What are your goals? *</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {GOALS.map((goal) => {
            const selected = formData.goals.includes(goal);
            return (
              <button
                key={goal}
                onClick={() => toggleArrayItem("goals", goal)}
                className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                  selected
                    ? "bg-teal/10 border border-teal/30 text-teal"
                    : "bg-navy border border-white/8 text-ghost hover:border-white/20 hover:text-white-soft"
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="When do you want to start?" value={formData.timeline} onChange={(v) => updateField("timeline", v)} options={TIMELINES} placeholder="Select timeline" />
        <SelectField label="Monthly budget range" value={formData.budget_range} onChange={(v) => updateField("budget_range", v)} options={currency === "NGN" ? NGN_BUDGET_RANGES : BUDGET_RANGES} placeholder="Select range" />
      </div>
    </div>
  );
}

const NEEDS_TO_MODULE_KEY: Record<string, string> = {
  needs_finance: 'finance', needs_sales_crm: 'sales_crm_web',
  needs_customer_service: 'customer_service', needs_hr: 'hr_admin',
  needs_marketing: 'marketing', needs_developers: 'developers',
  needs_data_science: 'data_science', needs_enterprise_intel: 'enterprise_intel',
  needs_inventory: 'inventory',
};

function StepModules({ formData, updateField, currency }: { formData: FormData; updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void; currency: Currency }) {
  const selectedCount = MODULES.filter((m) => formData[m.key as keyof FormData]).length;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-semibold text-white-soft mb-1">Services you&apos;re interested in</h3>
        <p className="text-ghost text-sm">
          Select any that catch your eye — or skip this step and let our AI recommend based on your profile.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {MODULES.map((mod) => {
          const selected = formData[mod.key as keyof FormData] as boolean;
          return (
            <button
              key={mod.key}
              onClick={() => updateField(mod.key as keyof FormData, !selected as never)}
              className={`p-4 rounded-xl text-left transition-all border ${
                selected
                  ? "bg-teal/10 border-teal/40 shadow-lg shadow-teal/10"
                  : "bg-navy border-white/8 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <span className={`font-semibold text-sm ${selected ? "text-teal" : "text-white-soft"}`}>
                  {mod.name}
                </span>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selected ? "bg-teal text-midnight" : "border border-white/20"
                }`}>
                  {selected && <CheckIcon />}
                </span>
              </div>
              <p className="text-ghost text-xs mb-2">{mod.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal/70">
                  {(() => {
                    const pricingKey = NEEDS_TO_MODULE_KEY[mod.key];
                    const pricingMod = PRICING_MODULES.find(m => m.key === pricingKey);
                    if (!pricingMod) return mod.price;
                    return `${pricingMod.tiers ? 'from ' : ''}${formatPrice(getModulePrice(pricingMod, 'entry', currency), currency)}/mo`;
                  })()}
                </span>
                <span className="text-xs text-ghost">{mod.agents} AI agents</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedCount > 0 && (
        <div className="p-3 rounded-lg bg-teal/5 border border-teal/20 text-sm">
          <span className="text-teal font-semibold">{selectedCount} module{selectedCount > 1 ? "s" : ""} selected</span>
          <span className="text-ghost"> — Our AI will fine-tune tier recommendations based on your profile</span>
        </div>
      )}
    </div>
  );
}


// ─── Report View Component ───

function ReportView({
  report,
  companyName,
  contactName,
  currency = "USD",
}: {
  report: AnalysisReport;
  companyName: string;
  contactName: string;
  currency?: Currency;
}) {
  const sym = (report.financial_analysis?.currency ?? currency) === "NGN" ? "₦" : "$";
  const fmtNum = (n: number | undefined) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n ?? 0);

  const [activeSection, setActiveSection] = useState("summary");

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "assessment", label: "Assessment" },
    { id: "modules", label: "Recommendations" },
    { id: "roadmap", label: "Roadmap" },
    { id: "financial", label: "Financial" },
    { id: "onboarding", label: "Onboarding" },
    { id: "next", label: "Next Steps" },
  ];

  const priorityColors: Record<string, string> = {
    critical: "bg-coral/20 text-coral border-coral/30",
    high: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    medium: "bg-teal/20 text-teal border-teal/30",
    low: "bg-ghost/20 text-ghost border-ghost/30",
  };

  return (
    <div className="min-h-screen bg-midnight">
      {/* Report Header */}
      <div className="bg-gradient-to-b from-navy to-midnight border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-ghost hover:text-teal text-sm mb-6 transition-colors">
            <ArrowLeft /> Back to Solynta Talent
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-mono mb-3">
                <Sparkles /> AI Business Analysis Complete
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white-soft mb-1">
                {companyName}
              </h1>
              <p className="text-ghost">Prepared for {contactName}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  const { generateReportPDF } = await import("@/lib/pdf");
                  await generateReportPDF({
                    company_name: companyName,
                    contact_name: contactName,
                    analysis: report,
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-ghost font-semibold text-sm hover:bg-white/10 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
              <a
                href="https://calendly.com/uvieugono"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-teal text-midnight font-semibold text-sm hover:bg-teal/90 transition-all shadow-lg shadow-teal/20"
              >
                Book Onboarding Call
              </a>
            </div>
          </div>

          {/* Key Stats */}
          {report.financial_analysis && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <StatCard
                label="Monthly Investment"
                value={`${sym}${fmtNum(report.financial_analysis.monthly_investment)}`}
                sub="per month"
              />
              <StatCard
                label="Annual Savings"
                value={`${sym}${fmtNum(report.financial_analysis.annual_savings)}`}
                sub="vs. in-house"
                accent
              />
              <StatCard
                label="ROI"
                value={`${report.financial_analysis.roi_percentage || 0}%`}
                sub="return on investment"
                accent
              />
              <StatCard
                label="FTE Equivalent"
                value={`${report.financial_analysis.headcount_equivalent || report.recommended_modules?.reduce((sum, m) => sum + (m.agents_deployed?.length || 0), 0) || 0}`}
                sub="roles replaced"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-midnight/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? "bg-teal/15 text-teal"
                    : "text-ghost hover:text-white-soft hover:bg-slate-dark"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Executive Summary */}
        {activeSection === "summary" && (
          <ReportSection title="Executive Summary">
            <div className="prose prose-invert max-w-none">
              <p className="text-white-soft/90 text-base leading-relaxed whitespace-pre-line">
                {report.executive_summary}
              </p>
            </div>
            {report.industry_insights && (
              <div className="mt-6 p-5 rounded-xl bg-lavender/5 border border-lavender/20">
                <h4 className="font-display text-sm font-semibold text-lavender mb-2">Industry Insights</h4>
                <p className="text-ghost text-sm leading-relaxed">{report.industry_insights}</p>
              </div>
            )}
            {report.competitive_advantage && (
              <div className="mt-4 p-5 rounded-xl bg-teal/5 border border-teal/20">
                <h4 className="font-display text-sm font-semibold text-teal mb-2">Your Competitive Advantage</h4>
                <p className="text-ghost text-sm leading-relaxed">{report.competitive_advantage}</p>
              </div>
            )}
          </ReportSection>
        )}

        {/* Company Assessment */}
        {activeSection === "assessment" && report.company_assessment && (
          <ReportSection title="Company Assessment">
            <p className="text-white-soft/90 mb-6">{report.company_assessment.overview}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <AssessmentCard title="Strengths" items={report.company_assessment.strengths} color="teal" />
              <AssessmentCard title="Operational Gaps" items={report.company_assessment.gaps} color="coral" />
              <AssessmentCard title="Risk Factors" items={report.company_assessment.risk_factors} color="amber" />
              <div className="p-5 rounded-xl bg-navy border border-white/8">
                <h4 className="font-display text-sm font-semibold text-lavender mb-2">Maturity Level</h4>
                <div className="flex items-center gap-3 mt-3">
                  {["startup", "growing", "established", "scaling", "enterprise"].map((level) => (
                    <div key={level} className="flex flex-col items-center gap-1 flex-1">
                      <div className={`w-full h-2 rounded-full ${
                        report.company_assessment.maturity_level === level ? "bg-teal" : "bg-slate-mid"
                      }`} />
                      <span className={`text-[10px] capitalize ${
                        report.company_assessment.maturity_level === level ? "text-teal" : "text-ghost/50"
                      }`}>{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ReportSection>
        )}

        {/* Recommended Modules */}
        {activeSection === "modules" && (
          <ReportSection title="Recommended Service Modules">
            <div className="space-y-4">
              {report.recommended_modules?.map((mod, i) => (
                <div key={mod.module_key || i} className="p-5 rounded-xl bg-navy border border-white/8 hover:border-teal/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-semibold text-white-soft">{mod.module_name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${priorityColors[mod.priority] || priorityColors.medium}`}>
                          {mod.priority}
                        </span>
                      </div>
                      <p className="text-ghost text-sm">{mod.rationale}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="font-mono text-teal font-semibold">{sym}{fmtNum(mod.monthly_cost)}/mo</div>
                        <div className="text-ghost text-xs capitalize">{mod.recommended_tier} tier</div>
                      </div>
                    </div>
                  </div>

                  {mod.current_gap_addressed && (
                    <div className="mb-3 px-3 py-2 rounded-lg bg-coral/5 border border-coral/15 text-xs text-coral/80">
                      <strong>Addresses:</strong> {mod.current_gap_addressed}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-3 gap-3">
                    {mod.specific_processes?.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-ghost/70 uppercase mb-1.5">Processes</h5>
                        <ul className="space-y-1">
                          {mod.specific_processes.map((p, j) => (
                            <li key={j} className="text-xs text-ghost flex items-start gap-1.5">
                              <span className="text-teal mt-0.5">&#9656;</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {mod.agents_deployed?.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-ghost/70 uppercase mb-1.5">AI Agents</h5>
                        <div className="flex flex-wrap gap-1">
                          {mod.agents_deployed.map((a, j) => (
                            <span key={j} className="px-2 py-0.5 rounded-full bg-teal/10 text-teal text-[10px]">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {mod.quick_wins?.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-ghost/70 uppercase mb-1.5">Quick Wins (30 days)</h5>
                        <ul className="space-y-1">
                          {mod.quick_wins.map((w, j) => (
                            <li key={j} className="text-xs text-ghost flex items-start gap-1.5">
                              <span className="text-gold mt-0.5">&#9733;</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Implementation Roadmap */}
        {activeSection === "roadmap" && report.implementation_roadmap && (
          <ReportSection title="Implementation Roadmap">
            <div className="space-y-6">
              {[report.implementation_roadmap.phase_1, report.implementation_roadmap.phase_2, report.implementation_roadmap.phase_3].map((phase, i) => phase && (
                <div key={i} className="relative pl-8 pb-6">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-teal/20 border-2 border-teal flex items-center justify-center">
                    <span className="text-xs font-bold text-teal">{i + 1}</span>
                  </div>
                  {i < 2 && <div className="absolute left-[11px] top-6 w-0.5 h-full bg-teal/20" />}

                  <div className="p-5 rounded-xl bg-navy border border-white/8">
                    <h4 className="font-display font-semibold text-white-soft mb-3">{phase.title}</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold text-teal uppercase mb-2">Modules</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.modules?.map((m, j) => (
                            <span key={j} className="px-2 py-0.5 rounded bg-teal/10 text-teal text-xs">{m}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-gold uppercase mb-2">Tasks</h5>
                        <ul className="space-y-1">
                          {phase.tasks?.map((t, j) => (
                            <li key={j} className="text-xs text-ghost">&bull; {t}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-lavender uppercase mb-2">Deliverables</h5>
                        <ul className="space-y-1">
                          {phase.deliverables?.map((d, j) => (
                            <li key={j} className="text-xs text-ghost flex items-start gap-1">
                              <span className="text-teal">&#10003;</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Financial Analysis */}
        {activeSection === "financial" && report.financial_analysis && (
          <ReportSection title="Financial Analysis">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-xl bg-navy border border-white/8 text-center">
                <div className="text-ghost text-xs uppercase mb-1">Your Investment</div>
                <div className="font-display text-2xl font-bold text-white-soft">{sym}{fmtNum(report.financial_analysis.monthly_investment)}<span className="text-sm text-ghost">/mo</span></div>
                <div className="text-ghost text-xs mt-1">{sym}{fmtNum(report.financial_analysis.annual_investment)}/year</div>
              </div>
              <div className="p-5 rounded-xl bg-teal/5 border border-teal/20 text-center">
                <div className="text-teal text-xs uppercase mb-1">You Save</div>
                <div className="font-display text-2xl font-bold text-teal">{sym}{fmtNum(report.financial_analysis.annual_savings)}<span className="text-sm text-teal/70">/yr</span></div>
                <div className="text-ghost text-xs mt-1">vs. in-house equivalent</div>
              </div>
              <div className="p-5 rounded-xl bg-gold/5 border border-gold/20 text-center">
                <div className="text-gold text-xs uppercase mb-1">Return on Investment</div>
                <div className="font-display text-2xl font-bold text-gold">{report.financial_analysis.roi_percentage}%</div>
                <div className="text-ghost text-xs mt-1">Payback: {report.financial_analysis.payback_period || "immediate"}</div>
              </div>
            </div>

            {report.financial_analysis.software_savings && (
              <div className="p-4 rounded-lg bg-lavender/5 border border-lavender/20 mb-6">
                <h5 className="text-sm font-semibold text-lavender mb-1">Software Savings</h5>
                <p className="text-ghost text-sm">{report.financial_analysis.software_savings}</p>
              </div>
            )}

            {report.financial_analysis.cost_breakdown?.length > 0 && (
              <div>
                <h4 className="font-display text-sm font-semibold text-white-soft mb-3">Cost Breakdown</h4>
                <div className="space-y-2">
                  {report.financial_analysis.cost_breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-navy border border-white/5">
                      <div>
                        <span className="text-sm text-white-soft">{item.module}</span>
                        <span className="text-xs text-ghost ml-2">replaces {item.replaces}</span>
                      </div>
                      <span className="font-mono text-teal text-sm">{sym}{fmtNum(item.monthly)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ReportSection>
        )}

        {/* Onboarding */}
        {activeSection === "onboarding" && (
          <ReportSection title="Onboarding Process">
            <div className="space-y-4">
              {report.onboarding_process?.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 rounded-xl bg-navy border border-white/8">
                  <div className="w-10 h-10 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-teal text-sm">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white-soft text-sm">{step.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-slate-mid text-ghost text-[10px]">{step.duration}</span>
                    </div>
                    <p className="text-ghost text-sm mb-2">{step.description}</p>
                    {step.client_action_required && (
                      <div className="text-xs text-gold/80">
                        <strong>Your action:</strong> {step.client_action_required}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Next Steps */}
        {activeSection === "next" && (
          <ReportSection title="Recommended Next Steps">
            <div className="space-y-3 mb-8">
              {report.next_steps?.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-navy border border-white/8">
                  <div className="w-7 h-7 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-teal">{i + 1}</span>
                  </div>
                  <p className="text-white-soft/90 text-sm pt-1">{step}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-teal/10 to-lavender/10 border border-teal/20 text-center">
              <h3 className="font-display text-xl font-bold text-white-soft mb-2">Ready to get started?</h3>
              <p className="text-ghost mb-5 text-sm">
                Book a brief onboarding call and we&apos;ll have your first modules live within days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://calendly.com/uvieugono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-teal text-midnight font-semibold text-sm hover:bg-teal/90 transition-all shadow-lg shadow-teal/20"
                >
                  Book Onboarding Call
                </a>
                <a
                  href="mailto:hello@solyntatalent.com"
                  className="px-6 py-3 rounded-lg border border-white/10 text-white-soft font-medium text-sm hover:bg-slate-dark transition-all"
                >
                  Email Us
                </a>
              </div>
            </div>
          </ReportSection>
        )}
      </div>
    </div>
  );
}


// ─── Shared UI Components ───

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  prefix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white-soft/80 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ghost text-sm">{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-2.5 bg-navy border border-white/10 rounded-lg text-white-soft placeholder:text-ghost/50 text-sm focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/20 transition-all ${prefix ? "pl-8 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white-soft/80 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-lg text-white-soft text-sm focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/20 transition-all appearance-none"
      >
        <option value="" className="text-ghost">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${accent ? "bg-teal/5 border-teal/20" : "bg-navy border-white/8"}`}>
      <div className="text-ghost text-xs uppercase mb-1">{label}</div>
      <div className={`font-display text-xl font-bold ${accent ? "text-teal" : "text-white-soft"}`}>{value}</div>
      <div className="text-ghost text-xs">{sub}</div>
    </div>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white-soft mb-6">{title}</h2>
      {children}
    </div>
  );
}

function AssessmentCard({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colorMap: Record<string, string> = {
    teal: "text-teal border-teal/20 bg-teal/5",
    coral: "text-coral border-coral/20 bg-coral/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  };
  const cls = colorMap[color] || colorMap.teal;

  return (
    <div className={`p-5 rounded-xl border ${cls.split(" ").slice(1).join(" ")}`}>
      <h4 className={`font-display text-sm font-semibold mb-3 ${cls.split(" ")[0]}`}>{title}</h4>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className="text-sm text-ghost flex items-start gap-2">
            <span className={`mt-1 ${cls.split(" ")[0]}`}>&bull;</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
