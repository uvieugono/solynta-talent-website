// src/lib/pricing.ts
export type Currency = 'USD' | 'NGN'
export type Tier = 'entry' | 'growth' | 'enterprise'
export type ModuleKey =
  | 'finance'
  | 'sales_crm_web'
  | 'customer_service'
  | 'hr_admin'
  | 'marketing'
  | 'developers'
  | 'data_science'
  | 'enterprise_intel'
  | 'inventory'

export interface ModuleDefinition {
  key: ModuleKey
  icon: string
  name: string
  desc: string
  tiers: boolean
  /** 2-4 bullet points shown on the full-page /calculator card */
  features: string[]
  usd: Partial<Record<Tier, number>>
  ngn: Partial<Record<Tier, number>>
}

export const MODULES: ModuleDefinition[] = [
  {
    key: 'finance',
    icon: '💰',
    name: 'Finance Core',
    desc: 'Bookkeeper · Accountant · Payroll · Tax',
    tiers: false,
    features: ['Daily bookkeeping & reconciliation', 'P&L, balance sheet & cash flow', 'Full payroll computation & payslips', 'Tax filing & compliance'],
    usd: { entry: 500 },
    ngn: { entry: 100000 },
  },
  {
    key: 'sales_crm_web',
    icon: '📈',
    name: 'Sales, CRM & Web',
    desc: 'Growth Engine · CRM · Digital · Sales Ops',
    tiers: false,
    features: ['Website SEO & content updates', 'CRM pipeline management', 'Lead tracking & outreach', 'Monthly performance reports'],
    usd: { entry: 250 },
    ngn: { entry: 45000 },
  },
  {
    key: 'customer_service',
    icon: '💬',
    name: 'AI Customer Service',
    desc: '24/7 Responder · Email Triage · Website Chatbot',
    tiers: false,
    features: ['24/7 AI chat on your website', 'Email triage & auto-responses', 'Escalation to human agents', 'Monthly interaction reports'],
    usd: { entry: 250 },
    ngn: { entry: 25000 },
  },
  {
    key: 'hr_admin',
    icon: '👥',
    name: 'HR & Admin Ops',
    desc: 'HR Admin · Procurement · IT Admin',
    tiers: false,
    features: ['Onboarding & offboarding workflows', 'Leave tracking & HR records', 'Vendor & procurement management', 'IT asset & access management'],
    usd: { entry: 250 },
    ngn: { entry: 25000 },
  },
  {
    key: 'marketing',
    icon: '📣',
    name: 'Marketing Dept.',
    desc: 'Social · PPC · Content · Video · SEO',
    tiers: true,
    features: ['Social media management (3+ platforms)', 'Google & Meta ad campaigns', 'Monthly content calendar', 'Analytics & reporting'],
    usd: { entry: 500, growth: 800, enterprise: 1200 },
    ngn: { entry: 25000, growth: 50000, enterprise: 100000 },
  },
  {
    key: 'developers',
    icon: '💻',
    name: 'Embedded Developers',
    desc: 'Full Stack · QA · DevOps · Tech Lead · UI/UX',
    tiers: true,
    features: ['Dedicated developers inside your team', 'Works in your tools & codebase', 'Attends your standups & sprints', 'Senior code review & oversight'],
    usd: { entry: 500, growth: 1000, enterprise: 1800 },
    ngn: { entry: 150000, growth: 250000, enterprise: 500000 },
  },
  {
    key: 'data_science',
    icon: '📊',
    name: 'Data Science',
    desc: 'Data Scientist · Engineer · ML · BI Dev · Analyst',
    tiers: true,
    features: ['KPI dashboards built & maintained', 'Data cleaning & quality assurance', 'Predictive ML models', 'Monthly insight reports'],
    usd: { entry: 250, growth: 600, enterprise: 1200 },
    ngn: { entry: 85000, growth: 125000, enterprise: 250000 },
  },
  {
    key: 'enterprise_intel',
    icon: '🧠',
    name: 'Enterprise Intel.',
    desc: 'Insight Engine · Strategy · Audit · Knowledge Arch.',
    tiers: true,
    features: ['Competitor benchmarking reports', 'Board-ready strategic analysis', 'AI governance & audit trails', 'Knowledge base management'],
    usd: { entry: 500, growth: 1000, enterprise: 2000 },
    ngn: { entry: 50000, growth: 75000, enterprise: 100000 },
  },
  {
    key: 'inventory',
    icon: '📦',
    name: 'Inventory Mgmt.',
    desc: 'Controller · Procurement · Forecaster · Warehouse',
    tiers: true,
    features: ['Real-time stock tracking', 'AI demand forecasting', 'Purchase order automation', 'Shopify / WooCommerce integration'],
    usd: { entry: 250, growth: 600, enterprise: 1200 },
    ngn: { entry: 50000, growth: 100000, enterprise: 200000 },
  },
]

/**
 * Format a price amount in the given currency.
 * Uses en-US locale for consistent cross-browser comma separators
 * (en-NG has inconsistent support in older Android WebView).
 */
export function formatPrice(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)
  return currency === 'NGN' ? `₦${formatted}` : `$${formatted}`
}

/** Return the price for a given module + tier + currency, defaulting to entry. */
export function getModulePrice(mod: ModuleDefinition, tier: Tier, currency: Currency): number {
  const prices = currency === 'NGN' ? mod.ngn : mod.usd
  return prices[tier] ?? prices.entry ?? 0
}
