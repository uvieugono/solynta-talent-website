"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";

interface ReportData {
  consultation_id: string;
  status: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  industry: string;
  company_size: string;
  analysis: AnalysisReport | null;
  recommended_modules: RecommendedModule[] | null;
  estimated_monthly_cost: string | null;
  estimated_annual_savings: string | null;
  created_at: string;
  completed_at: string | null;
}

interface RecommendedModule {
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
  recommended_modules: RecommendedModule[];
  implementation_roadmap: {
    phase_1: Phase;
    phase_2: Phase;
    phase_3: Phase;
  };
  financial_analysis: {
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

interface Phase {
  title: string;
  modules: string[];
  tasks: string[];
  deliverables: string[];
}

// Priority badge colors
function priorityColor(p: string) {
  switch (p) {
    case "critical": return "bg-red-500/15 text-red-400 border-red-500/20";
    case "high": return "bg-amber-500/15 text-amber-400 border-amber-500/20";
    case "medium": return "bg-teal/15 text-teal border-teal/20";
    default: return "bg-slate-500/15 text-slate-400 border-slate-500/20";
  }
}

// Maturity gauge
function maturityPercent(level: string) {
  switch (level) {
    case "startup": return 20;
    case "growing": return 40;
    case "established": return 60;
    case "scaling": return 80;
    case "enterprise": return 100;
    default: return 30;
  }
}

// Extend jsPDF with autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

async function generatePDF(data: ReportData) {
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;
  const autoTableModule = await import("jspdf-autotable");
  if (autoTableModule.applyPlugin) {
    autoTableModule.applyPlugin(jsPDF);
  }

  const report = data.analysis!;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 20;

  const TEAL: [number, number, number] = [0, 206, 185];
  const DARK: [number, number, number] = [30, 30, 38];
  const GHOST: [number, number, number] = [160, 163, 175];
  const WHITE: [number, number, number] = [245, 245, 250];

  function checkPage(need: number) {
    if (y + need > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }
  }

  function heading(text: string, size = 16) {
    checkPage(20);
    doc.setFontSize(size);
    doc.setTextColor(...TEAL);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += size * 0.5 + 4;
    // underline
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentW, y);
    y += 6;
  }

  function subheading(text: string) {
    checkPage(14);
    doc.setFontSize(11);
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += 6;
  }

  function body(text: string) {
    checkPage(10);
    doc.setFontSize(9.5);
    doc.setTextColor(...GHOST);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentW);
    for (const line of lines) {
      checkPage(5);
      doc.text(line, margin, y);
      y += 4.5;
    }
    y += 2;
  }

  function bulletList(items: string[], prefix = "•") {
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GHOST);
    for (const item of items) {
      checkPage(6);
      doc.text(prefix, margin + 2, y);
      const lines = doc.splitTextToSize(item, contentW - 8);
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) checkPage(5);
        doc.text(lines[i], margin + 7, y);
        y += 4.5;
      }
    }
    y += 2;
  }

  // ──── Cover area ────
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 60, "F");
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text("SOLYNTA TALENT", margin, 18);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("AI Business Consultation Report", margin, 24);

  doc.setFontSize(22);
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.text(data.company_name, margin, 38);

  doc.setFontSize(9);
  doc.setTextColor(...GHOST);
  doc.setFont("helvetica", "normal");
  const dateStr = data.completed_at
    ? new Date(data.completed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
  doc.text(`Prepared for ${data.contact_name}  |  ${dateStr}`, margin, 46);

  // Quick stats row
  const stats = [
    { label: "Modules", value: String(report.recommended_modules.length) },
    { label: "AI Agents", value: String(report.recommended_modules.reduce((a, m) => a + (m.agents_deployed?.length || 0), 0)) },
    { label: "Monthly", value: `$${report.financial_analysis.monthly_investment.toLocaleString()}` },
    { label: "Annual Savings", value: `$${report.financial_analysis.annual_savings.toLocaleString()}` },
  ];
  const statW = contentW / 4;
  stats.forEach((s, i) => {
    const sx = margin + i * statW;
    doc.setFontSize(14);
    const c = i === 3 ? TEAL : WHITE;
    doc.setTextColor(c[0], c[1], c[2]);
    doc.setFont("helvetica", "bold");
    doc.text(s.value, sx + statW / 2, 55, { align: "center" });
  });
  y = 66;

  // ──── Executive Summary ────
  heading("Executive Summary");
  report.executive_summary.split("\n\n").forEach((p) => body(p));

  if (report.industry_insights) {
    subheading("Industry Insights");
    body(report.industry_insights);
  }
  if (report.competitive_advantage) {
    subheading("Competitive Advantage");
    body(report.competitive_advantage);
  }

  // ──── Company Assessment ────
  heading("Company Assessment");
  body(report.company_assessment.overview);

  subheading(`Maturity Level: ${report.company_assessment.maturity_level}`);

  if (report.company_assessment.strengths.length) {
    subheading("Strengths");
    bulletList(report.company_assessment.strengths, "+");
  }
  if (report.company_assessment.gaps.length) {
    subheading("Gaps Identified");
    bulletList(report.company_assessment.gaps, "!");
  }
  if (report.company_assessment.risk_factors.length) {
    subheading("Risk Factors");
    bulletList(report.company_assessment.risk_factors, "⚠");
  }

  // ──── Recommended Modules ────
  heading("Recommended Modules");
  for (const m of report.recommended_modules) {
    checkPage(30);
    subheading(`${m.module_name} — ${m.recommended_tier} tier  |  $${m.monthly_cost}/mo  [${m.priority}]`);
    body(m.rationale);
    if (m.current_gap_addressed) {
      body(`Gap addressed: ${m.current_gap_addressed}`);
    }
    if (m.quick_wins?.length) {
      doc.setFontSize(9);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Quick Wins (First 30 Days):", margin + 2, y);
      y += 5;
      bulletList(m.quick_wins, "✓");
    }
    if (m.agents_deployed?.length) {
      doc.setFontSize(8.5);
      doc.setTextColor(...GHOST);
      doc.setFont("helvetica", "italic");
      checkPage(5);
      doc.text(`Agents: ${m.agents_deployed.join(", ")}`, margin + 2, y);
      y += 6;
    }
    y += 2;
  }

  // ──── Implementation Roadmap ────
  heading("Implementation Roadmap");
  const phases = [report.implementation_roadmap.phase_1, report.implementation_roadmap.phase_2, report.implementation_roadmap.phase_3];
  phases.forEach((phase, i) => {
    checkPage(20);
    subheading(`Phase ${i + 1}: ${phase.title}`);
    if (phase.modules?.length) {
      body(`Modules: ${phase.modules.join(", ")}`);
    }
    if (phase.tasks?.length) {
      doc.setFontSize(9);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Tasks:", margin + 2, y);
      y += 5;
      bulletList(phase.tasks);
    }
    if (phase.deliverables?.length) {
      doc.setFontSize(9);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Deliverables:", margin + 2, y);
      y += 5;
      bulletList(phase.deliverables, "✓");
    }
    y += 2;
  });

  // ──── Financial Analysis ────
  heading("Financial Analysis");

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Metric", "Value"]],
    body: [
      ["Monthly Investment", `$${report.financial_analysis.monthly_investment.toLocaleString()}`],
      ["Annual Investment", `$${report.financial_analysis.annual_investment.toLocaleString()}`],
      ["In-House Equivalent", `$${report.financial_analysis.estimated_current_cost.toLocaleString()}`],
      ["Annual Savings", `$${report.financial_analysis.annual_savings.toLocaleString()}`],
      ["ROI", `${report.financial_analysis.roi_percentage}%`],
      ["FTE Equivalent", String(report.financial_analysis.headcount_equivalent)],
      ["Payback Period", report.financial_analysis.payback_period],
    ],
    theme: "grid",
    headStyles: { fillColor: [0, 206, 185], textColor: [20, 20, 28], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { textColor: [160, 163, 175], fontSize: 9 },
    alternateRowStyles: { fillColor: [35, 35, 45] },
    styles: { cellPadding: 3, fillColor: [28, 28, 36] },
  });
  y = doc.lastAutoTable.finalY + 8;

  if (report.financial_analysis.cost_breakdown?.length) {
    subheading("Cost Breakdown by Module");
    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      head: [["Module", "Monthly Cost", "Replaces"]],
      body: report.financial_analysis.cost_breakdown.map((row) => [
        row.module,
        `$${row.monthly.toLocaleString()}`,
        row.replaces,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 206, 185], textColor: [20, 20, 28], fontStyle: "bold", fontSize: 9 },
      bodyStyles: { textColor: [160, 163, 175], fontSize: 9 },
      alternateRowStyles: { fillColor: [35, 35, 45] },
      styles: { cellPadding: 3, fillColor: [28, 28, 36] },
    });
    y = doc.lastAutoTable.finalY + 8;
  }

  if (report.financial_analysis.software_savings) {
    body(report.financial_analysis.software_savings);
  }

  // ──── Onboarding ────
  heading("Onboarding Process");
  for (const step of report.onboarding_process) {
    checkPage(18);
    subheading(`Step ${step.step}: ${step.title} (${step.duration})`);
    body(step.description);
    body(`You'll need to: ${step.client_action_required}`);
  }

  // ──── Next Steps ────
  heading("Next Steps");
  report.next_steps.forEach((step, i) => {
    checkPage(8);
    body(`${i + 1}. ${step}`);
  });

  y += 6;
  checkPage(16);
  doc.setFontSize(11);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Get Started?", margin, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(...GHOST);
  doc.setFont("helvetica", "normal");
  doc.text("Contact hello@solyntalent.com to schedule your onboarding kickoff call.", margin, y);

  // Footer on every page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 110);
    doc.text(
      `Solynta Talent  |  AI Business Consultation  |  Page ${i} of ${totalPages}`,
      pageW / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" }
    );
  }

  // Download
  const filename = `${data.company_name.replace(/[^a-zA-Z0-9]/g, "_")}_AI_Consultation_Report.pdf`;
  doc.save(filename);
}

export default function ConsultationReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!reportData) return;
    setDownloading(true);
    try {
      await generatePDF(reportData);
    } finally {
      setDownloading(false);
    }
  }, [reportData]);

  useEffect(() => {
    params.then((p) => setResolvedId(p.id));
  }, [params]);

  useEffect(() => {
    if (!resolvedId) return;

    async function fetchReport() {
      try {
        const res = await fetch(`${API_BASE}/api/customer-service/consultation/${resolvedId}/`);
        if (!res.ok) {
          throw new Error("Consultation not found");
        }
        const data = await res.json();
        if (data.status !== "completed" || !data.analysis) {
          throw new Error("This consultation report is not ready yet. Please check back later.");
        }
        setReportData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [resolvedId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal/30 border-t-teal rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ghost">Loading your consultation report...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData || !reportData.analysis) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-white-soft mb-2">Report Not Available</h2>
          <p className="text-ghost mb-6">{error || "This consultation report could not be found."}</p>
          <Link href="/consultation" className="inline-block px-6 py-3 rounded-full bg-teal text-midnight font-semibold text-sm">
            Start New Consultation
          </Link>
        </div>
      </div>
    );
  }

  const report = reportData.analysis;
  const tabs = ["Summary", "Assessment", "Modules", "Roadmap", "Financial", "Onboarding", "Next Steps"];

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Solynta Talent" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-sm text-teal hover:bg-teal/20 transition-all disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloading ? "Generating..." : "Download PDF"}
            </button>
            <Link href="/consultation" className="text-sm text-teal hover:text-teal/80 transition-colors">
              New Consultation
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-teal mb-2">AI Business Consultation Report</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white-soft mb-2">
            {reportData.company_name}
          </h1>
          <p className="text-ghost">
            Prepared for {reportData.contact_name} &middot;{" "}
            {reportData.completed_at ? new Date(reportData.completed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Modules" value={String(report.recommended_modules.length)} />
          <StatCard label="AI Agents" value={String(report.recommended_modules.reduce((a, m) => a + (m.agents_deployed?.length || 0), 0))} />
          <StatCard label="Monthly" value={`$${report.financial_analysis.monthly_investment.toLocaleString()}`} />
          <StatCard label="Annual Savings" value={`$${report.financial_analysis.annual_savings.toLocaleString()}`} accent />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 pb-1 scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeTab === i
                  ? "bg-teal text-midnight font-semibold"
                  : "bg-white/5 text-ghost hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 0 && (
            <Section title="Executive Summary">
              <div className="prose prose-invert max-w-none">
                {report.executive_summary.split("\n\n").map((p, i) => (
                  <p key={i} className="text-ghost leading-relaxed mb-4">{p}</p>
                ))}
              </div>
              {report.industry_insights && (
                <div className="mt-6 p-5 rounded-xl bg-teal/5 border border-teal/10">
                  <h4 className="text-sm font-semibold text-teal mb-2">Industry Insights</h4>
                  <p className="text-sm text-ghost/80 leading-relaxed">{report.industry_insights}</p>
                </div>
              )}
              {report.competitive_advantage && (
                <div className="mt-4 p-5 rounded-xl bg-lavender/5 border border-lavender/10">
                  <h4 className="text-sm font-semibold text-lavender mb-2">Your Competitive Advantage</h4>
                  <p className="text-sm text-ghost/80 leading-relaxed">{report.competitive_advantage}</p>
                </div>
              )}
            </Section>
          )}

          {activeTab === 1 && (
            <Section title="Company Assessment">
              <p className="text-ghost leading-relaxed mb-6">{report.company_assessment.overview}</p>
              {/* Maturity */}
              <div className="mb-6 p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-ghost">Maturity Level</span>
                  <span className="text-sm font-semibold text-teal capitalize">{report.company_assessment.maturity_level}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal to-teal/60 rounded-full transition-all" style={{ width: `${maturityPercent(report.company_assessment.maturity_level)}%` }} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <ListCard title="Strengths" items={report.company_assessment.strengths} icon="+" color="text-teal" />
                <ListCard title="Gaps Identified" items={report.company_assessment.gaps} icon="!" color="text-amber-400" />
              </div>
              {report.company_assessment.risk_factors.length > 0 && (
                <div className="mt-4">
                  <ListCard title="Risk Factors" items={report.company_assessment.risk_factors} icon="⚠" color="text-red-400" />
                </div>
              )}
            </Section>
          )}

          {activeTab === 2 && (
            <Section title="Recommended Modules">
              <div className="space-y-4">
                {report.recommended_modules.map((m) => (
                  <div key={m.module_key} className="p-5 rounded-xl bg-slate-dark/40 border border-white/5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white-soft">{m.module_name}</h4>
                        <span className="text-xs text-ghost">{m.recommended_tier} tier &middot; {m.agents_deployed?.length || 0} agents</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-teal">${m.monthly_cost}/mo</div>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase border ${priorityColor(m.priority)}`}>
                          {m.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-ghost/80 mb-3 leading-relaxed">{m.rationale}</p>
                    {m.quick_wins && m.quick_wins.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-teal font-medium mb-1">Quick Wins (First 30 Days)</p>
                        <ul className="space-y-1">
                          {m.quick_wins.map((w, i) => (
                            <li key={i} className="text-xs text-ghost/70 flex items-start gap-2">
                              <span className="text-teal mt-0.5">✓</span>{w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {m.agents_deployed && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.agents_deployed.map((a) => (
                          <span key={a} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-ghost/70">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {activeTab === 3 && (
            <Section title="Implementation Roadmap">
              {[report.implementation_roadmap.phase_1, report.implementation_roadmap.phase_2, report.implementation_roadmap.phase_3].map((phase, i) => (
                <div key={i} className="mb-6 p-5 rounded-xl bg-slate-dark/40 border-l-2 border-teal/40">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-teal/15 flex items-center justify-center text-teal font-bold text-sm">{i + 1}</span>
                    <h4 className="font-semibold text-white-soft">{phase.title}</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-teal font-medium mb-2">Tasks</p>
                      <ul className="space-y-1.5">
                        {phase.tasks.map((t, j) => (
                          <li key={j} className="text-sm text-ghost/80 flex items-start gap-2">
                            <span className="text-ghost/30 mt-0.5">•</span>{t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-teal font-medium mb-2">Deliverables</p>
                      <ul className="space-y-1.5">
                        {phase.deliverables.map((d, j) => (
                          <li key={j} className="text-sm text-ghost/80 flex items-start gap-2">
                            <span className="text-teal mt-0.5">✓</span>{d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {activeTab === 4 && (
            <Section title="Financial Analysis">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <StatCard label="Monthly Cost" value={`$${report.financial_analysis.monthly_investment.toLocaleString()}`} />
                <StatCard label="Annual Cost" value={`$${report.financial_analysis.annual_investment.toLocaleString()}`} />
                <StatCard label="In-House Equivalent" value={`$${report.financial_analysis.estimated_current_cost.toLocaleString()}`} />
                <StatCard label="Annual Savings" value={`$${report.financial_analysis.annual_savings.toLocaleString()}`} accent />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-teal/5 border border-teal/10 text-center">
                  <div className="text-2xl font-bold text-teal">{report.financial_analysis.roi_percentage}%</div>
                  <div className="text-xs text-ghost">ROI</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <div className="text-2xl font-bold text-white-soft">{report.financial_analysis.headcount_equivalent}</div>
                  <div className="text-xs text-ghost">FTE Equivalent</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 text-center">
                  <div className="text-2xl font-bold text-white-soft capitalize">{report.financial_analysis.payback_period}</div>
                  <div className="text-xs text-ghost">Payback Period</div>
                </div>
              </div>
              {report.financial_analysis.cost_breakdown && (
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-4 py-3 text-left text-xs text-ghost uppercase tracking-wider">Module</th>
                        <th className="px-4 py-3 text-right text-xs text-ghost uppercase tracking-wider">Monthly</th>
                        <th className="px-4 py-3 text-left text-xs text-ghost uppercase tracking-wider">Replaces</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.financial_analysis.cost_breakdown.map((row, i) => (
                        <tr key={i} className="border-t border-white/5">
                          <td className="px-4 py-3 text-sm text-white-soft">{row.module}</td>
                          <td className="px-4 py-3 text-sm text-teal text-right">${row.monthly.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-ghost/70">{row.replaces}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {report.financial_analysis.software_savings && (
                <p className="mt-4 text-sm text-ghost/70 italic">{report.financial_analysis.software_savings}</p>
              )}
            </Section>
          )}

          {activeTab === 5 && (
            <Section title="Onboarding Process">
              <div className="space-y-4">
                {report.onboarding_process.map((step) => (
                  <div key={step.step} className="p-5 rounded-xl bg-slate-dark/40 border border-white/5">
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-teal/15 flex items-center justify-center text-teal font-bold text-sm flex-shrink-0">
                        {step.step}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-white-soft">{step.title}</h4>
                          <span className="text-xs text-teal bg-teal/10 px-2 py-0.5 rounded-full">{step.duration}</span>
                        </div>
                        <p className="text-sm text-ghost/80 mb-2">{step.description}</p>
                        <div className="text-xs text-amber-400/80">
                          <span className="font-medium">You&apos;ll need to: </span>{step.client_action_required}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {activeTab === 6 && (
            <Section title="Next Steps">
              <div className="space-y-3 mb-8">
                {report.next_steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-dark/40">
                    <span className="w-7 h-7 rounded-full bg-teal/15 flex items-center justify-center text-teal font-bold text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ghost/80 pt-1">{step}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-teal/10 to-transparent border border-teal/15 text-center">
                <h3 className="text-xl font-bold text-white-soft mb-2">Ready to Get Started?</h3>
                <p className="text-sm text-ghost mb-4">
                  Schedule your onboarding kickoff call and we&apos;ll have your first modules live within 2 weeks.
                </p>
                <a
                  href="mailto:hello@solyntalent.com?subject=Onboarding%20Kickoff%20-%20Consultation%20Report"
                  className="inline-block px-8 py-3 rounded-full bg-teal text-midnight font-semibold text-sm hover:shadow-lg hover:shadow-teal/20 transition-all"
                >
                  Schedule Onboarding Call
                </a>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="p-4 rounded-xl bg-slate-dark/40 border border-white/5 text-center">
      <div className={`text-xl sm:text-2xl font-bold ${accent ? "text-teal" : "text-white-soft"}`}>{value}</div>
      <div className="text-xs text-ghost mt-1">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-dark/20 border border-white/5 p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold text-white-soft mb-6">{title}</h3>
      {children}
    </div>
  );
}

function ListCard({ title, items, icon, color }: { title: string; items: string[]; icon: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5">
      <h5 className="text-sm font-semibold text-white-soft mb-3">{title}</h5>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-ghost/80 flex items-start gap-2">
            <span className={`${color} flex-shrink-0 mt-0.5`}>{icon}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
