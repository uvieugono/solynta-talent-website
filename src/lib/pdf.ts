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
  currency?: "NGN" | "USD";
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
      currency?: string;
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
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 20;

  // Currency: default to NGN, respect data.currency or analysis.financial_analysis.currency
  const currencyCode = data.currency || report.financial_analysis?.currency || "NGN";
  const sym = currencyCode === "NGN" ? "N" : "$";

  // Format currency value with symbol (jsPDF Helvetica can't render ₦, so use "N" prefix for Naira)
  function formatCurrency(amount: number): string {
    return `${sym}${amount.toLocaleString()}`;
  }

  // ──── Color palette (designed for white background) ────
  const TEAL: [number, number, number] = [0, 180, 162];
  const DARK: [number, number, number] = [24, 24, 32];
  const BODY_TEXT: [number, number, number] = [60, 60, 70];
  const MUTED: [number, number, number] = [120, 120, 135];
  const WHITE: [number, number, number] = [255, 255, 255];
  const LIGHT_BG: [number, number, number] = [245, 247, 250];
  const HEADER_DARK: [number, number, number] = [20, 20, 28];

  function checkPage(need: number) {
    if (y + need > pageH - 22) {
      doc.addPage();
      y = 22;
    }
  }

  function heading(text: string, size = 15) {
    checkPage(22);
    y += 4;
    doc.setFontSize(size);
    doc.setTextColor(...TEAL);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += size * 0.45 + 3;
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin + contentW, y);
    y += 8;
  }

  function subheading(text: string) {
    checkPage(14);
    doc.setFontSize(10.5);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += 6;
  }

  function body(text: string) {
    checkPage(10);
    doc.setFontSize(9.5);
    doc.setTextColor(...BODY_TEXT);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentW);
    for (const line of lines) {
      checkPage(5);
      doc.text(line, margin, y);
      y += 4.5;
    }
    y += 2;
  }

  function bulletList(items: string[], prefix = "-") {
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BODY_TEXT);
    for (const item of items) {
      checkPage(6);
      doc.text(prefix, margin + 3, y);
      const lines = doc.splitTextToSize(item, contentW - 10);
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) checkPage(5);
        doc.text(lines[i], margin + 8, y);
        y += 4.5;
      }
    }
    y += 2;
  }

  function labelValue(label: string, value: string) {
    checkPage(8);
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(label, margin + 3, y);
    doc.setTextColor(...BODY_TEXT);
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + 50, y);
    y += 5;
  }

  // ──── COVER AREA ────
  // Dark header band
  doc.setFillColor(...HEADER_DARK);
  doc.rect(0, 0, pageW, 70, "F");

  // Teal accent line
  doc.setFillColor(...TEAL);
  doc.rect(0, 70, pageW, 1.5, "F");

  // Brand
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text("SOLYNTA TALENT", margin, 16);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(160, 165, 180);
  doc.text("AI Business Consultation Report", margin, 22);

  // Company name
  doc.setFontSize(22);
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  const companyLines = doc.splitTextToSize(data.company_name, contentW);
  doc.text(companyLines[0], margin, 36);

  // Date & contact
  doc.setFontSize(9);
  doc.setTextColor(160, 165, 180);
  doc.setFont("helvetica", "normal");
  const dateStr = data.completed_at
    ? new Date(data.completed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Prepared for ${data.contact_name}  |  ${dateStr}`, margin, 44);

  // Quick stats row
  const stats = [
    { label: "Modules", value: String(report.recommended_modules.length) },
    { label: "AI Agents", value: String(report.recommended_modules.reduce((a, m) => a + (m.agents_deployed?.length || 0), 0)) },
    { label: "Monthly", value: formatCurrency(report.financial_analysis.monthly_investment) },
    { label: "Est. Savings", value: formatCurrency(report.financial_analysis.annual_savings) },
  ];
  const statW = contentW / 4;
  stats.forEach((s, i) => {
    const sx = margin + i * statW;
    const cx = sx + statW / 2;

    // Value
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    if (i === 3) {
      doc.setTextColor(...TEAL);
    } else {
      doc.setTextColor(...WHITE);
    }
    doc.text(s.value, cx, 56, { align: "center" });

    // Label (below value)
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 125, 140);
    doc.text(s.label, cx, 62, { align: "center" });
  });

  y = 80;

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

  // Maturity badge
  checkPage(10);
  doc.setFillColor(...TEAL);
  const matText = `Maturity Level: ${report.company_assessment.maturity_level}`;
  doc.setFontSize(9);
  const matW = doc.getTextWidth(matText) + 10;
  doc.roundedRect(margin, y - 4, matW, 7, 2, 2, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.text(matText, margin + 5, y);
  y += 10;

  if (report.company_assessment.strengths.length) {
    subheading("Strengths");
    bulletList(report.company_assessment.strengths, "+");
  }
  if (report.company_assessment.gaps.length) {
    subheading("Gaps Identified");
    bulletList(report.company_assessment.gaps, ">");
  }
  if (report.company_assessment.risk_factors.length) {
    subheading("Risk Factors");
    bulletList(report.company_assessment.risk_factors, "!");
  }

  // ──── Recommended Modules ────
  heading("Recommended Modules");
  for (const m of report.recommended_modules) {
    checkPage(35);

    // Module card with light background
    const cardStartY = y - 2;
    doc.setFillColor(...LIGHT_BG);

    // Module header
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(m.module_name, margin + 4, y + 2);

    // Tier, cost, priority on same line right-aligned
    const metaText = `${m.recommended_tier} tier  |  ${formatCurrency(m.monthly_cost)}/mo  |  ${m.priority}`;
    doc.setFontSize(8);
    doc.setTextColor(...TEAL);
    doc.setFont("helvetica", "bold");
    doc.text(metaText, margin + contentW - 4, y + 2, { align: "right" });
    y += 8;

    // Rationale
    doc.setFontSize(9);
    doc.setTextColor(...BODY_TEXT);
    doc.setFont("helvetica", "normal");
    const rationaleLines = doc.splitTextToSize(m.rationale, contentW - 8);
    for (const line of rationaleLines) {
      checkPage(5);
      doc.text(line, margin + 4, y);
      y += 4.2;
    }
    y += 1;

    if (m.current_gap_addressed) {
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "italic");
      checkPage(5);
      const gapLines = doc.splitTextToSize(`Gap addressed: ${m.current_gap_addressed}`, contentW - 8);
      for (const line of gapLines) {
        checkPage(5);
        doc.text(line, margin + 4, y);
        y += 4;
      }
      y += 1;
    }

    if (m.quick_wins?.length) {
      doc.setFontSize(8.5);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Quick Wins (First 30 Days):", margin + 4, y);
      y += 4.5;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BODY_TEXT);
      for (const win of m.quick_wins) {
        checkPage(5);
        doc.text("-", margin + 6, y);
        const wLines = doc.splitTextToSize(win, contentW - 14);
        for (let i = 0; i < wLines.length; i++) {
          if (i > 0) checkPage(4.5);
          doc.text(wLines[i], margin + 10, y);
          y += 4;
        }
      }
      y += 1;
    }

    if (m.agents_deployed?.length) {
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "italic");
      checkPage(5);
      doc.text(`Agents: ${m.agents_deployed.join(", ")}`, margin + 4, y);
      y += 5;
    }

    // Draw card background (now we know height)
    const cardH = y - cardStartY + 2;
    // Go back and draw the background behind the text
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin, cardStartY, contentW, cardH, 2, 2, "F");

    // Unfortunately jsPDF draws in order, so we need to redraw text on top.
    // Instead, let's just add a bottom border for separation.
    doc.setDrawColor(220, 225, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + contentW, y);
    y += 6;
  }

  // ──── Implementation Roadmap ────
  heading("Implementation Roadmap");
  const phases = [report.implementation_roadmap.phase_1, report.implementation_roadmap.phase_2, report.implementation_roadmap.phase_3];
  phases.forEach((phase, i) => {
    checkPage(22);

    // Phase number badge
    doc.setFillColor(...TEAL);
    doc.circle(margin + 4, y - 1, 3.5, "F");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(String(i + 1), margin + 4, y + 0.5, { align: "center" });

    // Phase title
    doc.setFontSize(10.5);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(phase.title, margin + 12, y);
    y += 6;

    if (phase.modules?.length) {
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      doc.setFont("helvetica", "normal");
      doc.text(`Modules: ${phase.modules.join(", ")}`, margin + 12, y);
      y += 5;
    }
    if (phase.tasks?.length) {
      doc.setFontSize(8.5);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Tasks:", margin + 12, y);
      y += 4.5;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BODY_TEXT);
      for (const task of phase.tasks) {
        checkPage(5);
        doc.text("-", margin + 14, y);
        const tLines = doc.splitTextToSize(task, contentW - 20);
        for (let j = 0; j < tLines.length; j++) {
          if (j > 0) checkPage(4.5);
          doc.text(tLines[j], margin + 18, y);
          y += 4;
        }
      }
      y += 1;
    }
    if (phase.deliverables?.length) {
      doc.setFontSize(8.5);
      doc.setTextColor(...TEAL);
      doc.setFont("helvetica", "bold");
      checkPage(5);
      doc.text("Deliverables:", margin + 12, y);
      y += 4.5;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BODY_TEXT);
      for (const del of phase.deliverables) {
        checkPage(5);
        doc.text(">", margin + 14, y);
        const dLines = doc.splitTextToSize(del, contentW - 20);
        for (let j = 0; j < dLines.length; j++) {
          if (j > 0) checkPage(4.5);
          doc.text(dLines[j], margin + 18, y);
          y += 4;
        }
      }
    }
    y += 4;
  });

  // ──── Financial Analysis ────
  heading("Financial Analysis");

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Metric", "Value"]],
    body: [
      ["Monthly Investment", formatCurrency(report.financial_analysis.monthly_investment)],
      ["Annual Investment", formatCurrency(report.financial_analysis.annual_investment)],
      ["In-House Equivalent", formatCurrency(report.financial_analysis.estimated_current_cost)],
      ["Annual Savings", formatCurrency(report.financial_analysis.annual_savings)],
      ["ROI", `${report.financial_analysis.roi_percentage}%`],
      ["FTE Equivalent", String(report.financial_analysis.headcount_equivalent)],
      ["Payback Period", report.financial_analysis.payback_period],
    ],
    theme: "striped",
    headStyles: { fillColor: [0, 180, 162], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { textColor: [60, 60, 70], fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { cellPadding: 3.5, fillColor: [255, 255, 255], lineColor: [220, 225, 235], lineWidth: 0.3 },
  });
  y = doc.lastAutoTable.finalY + 10;

  if (report.financial_analysis.cost_breakdown?.length) {
    subheading("Cost Breakdown by Module");
    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      head: [["Module", "Monthly Cost", "Replaces"]],
      body: report.financial_analysis.cost_breakdown.map((row) => [
        row.module,
        formatCurrency(row.monthly),
        row.replaces,
      ]),
      theme: "striped",
      headStyles: { fillColor: [0, 180, 162], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
      bodyStyles: { textColor: [60, 60, 70], fontSize: 9 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      styles: { cellPadding: 3.5, fillColor: [255, 255, 255], lineColor: [220, 225, 235], lineWidth: 0.3 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  if (report.financial_analysis.software_savings) {
    body(report.financial_analysis.software_savings);
  }

  // ──── Onboarding ────
  heading("Onboarding Process");
  for (const step of report.onboarding_process) {
    checkPage(20);

    // Step number
    doc.setFillColor(...TEAL);
    doc.circle(margin + 4, y - 1, 3.5, "F");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(String(step.step), margin + 4, y + 0.5, { align: "center" });

    // Step title
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(`${step.title} (${step.duration})`, margin + 12, y);
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(...BODY_TEXT);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(step.description, contentW - 12);
    for (const line of descLines) {
      checkPage(5);
      doc.text(line, margin + 12, y);
      y += 4.2;
    }
    y += 1;

    // Client action
    doc.setFontSize(8.5);
    doc.setTextColor(...TEAL);
    doc.setFont("helvetica", "bold");
    checkPage(5);
    doc.text("Your action:", margin + 12, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BODY_TEXT);
    const actionLines = doc.splitTextToSize(step.client_action_required, contentW - 32);
    doc.text(actionLines[0], margin + 32, y);
    y += 4.5;
    for (let i = 1; i < actionLines.length; i++) {
      checkPage(4.5);
      doc.text(actionLines[i], margin + 32, y);
      y += 4.5;
    }
    y += 4;
  }

  // ──── Next Steps ────
  heading("Next Steps");
  report.next_steps.forEach((step, i) => {
    checkPage(10);
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}.`, margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BODY_TEXT);
    const stepLines = doc.splitTextToSize(step, contentW - 10);
    for (let j = 0; j < stepLines.length; j++) {
      if (j > 0) checkPage(5);
      doc.text(stepLines[j], margin + 10, y);
      y += 5;
    }
    y += 1;
  });

  // CTA
  y += 6;
  checkPage(20);
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y - 4, contentW, 18, 3, 3, "F");
  doc.setFontSize(11);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Get Started?", margin + 6, y + 2);
  doc.setFontSize(9);
  doc.setTextColor(...BODY_TEXT);
  doc.setFont("helvetica", "normal");
  doc.text("Contact hello@solyntalent.com to schedule your onboarding kickoff call.", margin + 6, y + 8);

  // Footer on every page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Footer line
    doc.setDrawColor(220, 225, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, pageH - 14, pageW - margin, pageH - 14);

    doc.setFontSize(7);
    doc.setTextColor(140, 140, 155);
    doc.text(
      `Solynta Talent  |  AI Business Consultation  |  Page ${i} of ${totalPages}`,
      pageW / 2,
      pageH - 9,
      { align: "center" }
    );
  }

  // Download
  const filename = `${data.company_name.replace(/[^a-zA-Z0-9]/g, "_")}_AI_Consultation_Report.pdf`;
  doc.save(filename);
}
