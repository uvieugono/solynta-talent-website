// Shared PDF generation for consultation reports
// Used by both the standalone report page and the wizard's inline report view

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

export interface PDFReportInput {
  company_name: string;
  contact_name: string;
  completed_at?: string | null;
  analysis: {
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
      agents_deployed?: string[];
      quick_wins?: string[];
      current_gap_addressed?: string;
    }>;
    implementation_roadmap: {
      phase_1: { title: string; modules?: string[]; tasks: string[]; deliverables: string[] };
      phase_2: { title: string; modules?: string[]; tasks: string[]; deliverables: string[] };
      phase_3: { title: string; modules?: string[]; tasks: string[]; deliverables: string[] };
    };
    financial_analysis: {
      monthly_investment: number;
      annual_investment: number;
      estimated_current_cost: number;
      annual_savings: number;
      roi_percentage: number;
      payback_period: string;
      software_savings?: string;
      headcount_equivalent: number;
      cost_breakdown?: Array<{ module: string; monthly: number; replaces: string }>;
    };
    onboarding_process: Array<{
      step: number;
      title: string;
      description: string;
      duration: string;
      client_action_required: string;
    }>;
    industry_insights?: string;
    competitive_advantage?: string;
    next_steps: string[];
  };
}

export async function generateReportPDF(data: PDFReportInput) {
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;
  const autoTableModule = await import("jspdf-autotable");
  if (autoTableModule.applyPlugin) {
    autoTableModule.applyPlugin(jsPDF);
  }

  const report = data.analysis;
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
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
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
