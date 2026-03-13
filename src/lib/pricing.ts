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

export interface TierDetail {
  name: string
  subtitle: string
  features: string[]
  roles?: string
  popular?: boolean
}

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
  /** Per-tier feature breakdowns (only for tiered modules) */
  tierDetails?: Partial<Record<Tier, TierDetail>>
}

export const MODULES: ModuleDefinition[] = [
  {
    key: 'finance',
    icon: '💰',
    name: 'Finance Core',
    desc: 'Bookkeeper · Accountant · Payroll · Tax',
    tiers: true,
    features: ['Daily bookkeeping & reconciliation', 'P&L, balance sheet & cash flow', 'Full payroll computation & payslips', 'Tax filing & compliance'],
    usd: { entry: 250, growth: 375, enterprise: 500 },
    ngn: { entry: 25000, growth: 50000, enterprise: 100000 },
    tierDetails: {
      entry: {
        name: 'Finance Essentials',
        subtitle: 'For early-stage businesses',
        roles: 'Bookkeeper & Accountant',
        features: [
          'Daily transaction posting & categorisation',
          'Bank & payment reconciliation',
          'Invoice drafting & management',
          'Month-end close & trial balance',
          'Accruals, deferrals & prepayments',
          'AP/AR tracking & petty cash management',
        ],
      },
      growth: {
        name: 'Finance Growth',
        subtitle: 'For growing businesses',
        roles: 'Bookkeeper + Accountant + Payroll Officer',
        popular: true,
        features: [
          'Everything in Essentials, plus:',
          'Full payroll computation & payslips',
          'Statutory contributions & remittances',
          'Payroll variance detection & reporting',
          'Monthly P&L, cash flow & balance sheet',
          'Burn rate & cash runway reporting',
        ],
      },
      enterprise: {
        name: 'Finance Pro',
        subtitle: 'Full outsourced finance dept',
        roles: 'All 4 roles included',
        features: [
          'Everything in Growth, plus:',
          'Audit-ready books & management packs',
          'VAT & WHT computation & filing support',
          'Tax filing, calendar & compliance advisory',
          'Board-ready reports & variance analysis',
          'Dedicated Senior Finance Specialist',
        ],
      },
    },
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
    tierDetails: {
      entry: {
        name: 'Marketing Essentials',
        subtitle: 'For early-stage SMEs',
        roles: 'Social Media Manager, PPC Specialist & Graphic Designer',
        features: [
          'Social media mgmt (3 platforms)',
          'Google Ads campaign setup & management',
          'Facebook & Instagram ad campaigns',
          'Monthly content calendar & scheduling',
          'Email newsletter creation & distribution',
          'Graphic design for social posts',
          'Community management & engagement',
          'GA4 setup & monthly reporting',
        ],
      },
      growth: {
        name: 'Marketing Growth',
        subtitle: 'For SMEs scaling lead generation',
        roles: '+ Automation Specialist & Video Producer',
        popular: true,
        features: [
          'Everything in Essentials, plus:',
          'LinkedIn ads (B2B) or TikTok (B2C)',
          'Marketing automation workflows',
          'Retargeting & lookalike audiences',
          'Messenger & WhatsApp lead capture',
          'A/B testing of ads, pages & CTAs',
          'Short-form video & weekly reporting',
        ],
      },
      enterprise: {
        name: 'Marketing Pro',
        subtitle: 'Full outsourced CMO function',
        roles: '+ SEO Specialist & Marketing Director / CMO',
        features: [
          'Everything in Growth, plus:',
          'SEO & content marketing programme',
          'Blog articles & lead magnet creation',
          'Conversion rate optimisation (CRO)',
          'Competitor intelligence & market trends',
        ],
      },
    },
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
    tierDetails: {
      entry: {
        name: 'Dev Essentials',
        subtitle: '1 dedicated full stack developer',
        roles: 'Replaces: 1 Full Stack Developer hire',
        features: [
          '1 full stack developer — yours full-time',
          'Works inside your tools & codebase',
          'Attends your standups & sprints',
          'Frontend, backend & database work',
          'AI-assisted for maximum output',
          'Senior code review & oversight by Solynta',
          'Monthly performance report',
        ],
      },
      growth: {
        name: 'Dev Growth',
        subtitle: 'Senior developer + junior + QA',
        roles: 'Replaces: Senior Dev + Junior Dev + QA hire',
        popular: true,
        features: [
          'Everything in Essentials, plus:',
          'Senior developer embedded in your team',
          'Junior developer for feature & ticket work',
          'Dedicated QA engineer — continuous testing',
          'UI/UX design ownership included',
          'Mobile development (iOS & Android)',
          'Full CI/CD ownership & DevOps support',
          'Weekly sprint planning & retrospectives',
        ],
      },
      enterprise: {
        name: 'Dev Enterprise',
        subtitle: 'Your complete engineering department',
        roles: 'Replaces: Full in-house engineering department',
        features: [
          'Everything in Growth, plus:',
          'Technical Lead embedded as your CTO proxy',
          'Full team: Lead + 2 devs + QA + DevOps',
          'Architecture ownership & tech strategy',
          'Security auditing & compliance built in',
          'AI/ML feature development for your product',
          'Unlimited roadmap delivery (scoped sprints)',
          'Dedicated Product Manager alignment',
        ],
      },
    },
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
    tierDetails: {
      entry: {
        name: 'Data Essentials',
        subtitle: 'Insights & reporting for growing businesses',
        roles: 'Replaces: Part-time Data Analyst',
        features: [
          'Monthly data audit & health report',
          'Data cleaning & quality assurance',
          'Up to 3 KPI dashboards built & maintained',
          'Exploratory analysis & trend reporting',
          'Sales / ops / marketing insight reports',
          '2 dedicated analysis hours/month',
          'Data source integration (up to 3 sources)',
          'Monthly insight summary for leadership',
        ],
      },
      growth: {
        name: 'Data Growth',
        subtitle: 'Predictive models & advanced analytics',
        roles: 'Replaces: Data Analyst + Data Scientist',
        popular: true,
        features: [
          'Everything in Essentials, plus:',
          '1 predictive ML model built & deployed',
          'Customer segmentation & CLV modelling',
          'Churn prediction & retention analytics',
          'Automated ETL pipeline construction',
          'Up to 10 dashboards & live reporting',
          'A/B test design & statistical analysis',
          'Bi-weekly insight sessions with leadership',
        ],
      },
      enterprise: {
        name: 'Data Enterprise',
        subtitle: 'Full data function — engineering to AI',
        roles: 'Replaces: Entire in-house data function',
        features: [
          'Everything in Growth, plus:',
          'Full team: Data Scientist + Engineer + Analyst',
          'Unlimited ML models & continuous retraining',
          'Data warehouse / lake design & management',
          'Real-time analytics & streaming pipelines',
          'Generative AI & LLM integration capability',
          'MLOps: automated monitoring & drift alerts',
          'Quarterly data strategy & roadmap session',
        ],
      },
    },
  },
  {
    key: 'enterprise_intel',
    icon: '🧠',
    name: 'Enterprise Intel.',
    desc: 'Insight Engine · Strategy · Audit · Knowledge Arch.',
    tiers: true,
    features: ['Competitor benchmarking reports', 'Board-ready strategic analysis', 'AI governance & audit trails', 'Knowledge base management'],
    usd: { entry: 500, growth: 1000, enterprise: 2000 },
    ngn: { entry: 25000, growth: 50000, enterprise: 100000 },
    tierDetails: {
      entry: {
        name: 'Intelligence Essentials',
        subtitle: 'Monthly intelligence & audit',
        roles: 'The Insight Engine agent',
        features: [
          'Monthly cross-business KPI dashboard',
          'Competitor benchmarking report',
          'AI confidence log & audit trail',
          'SOP documentation (up to 10 SOPs)',
          'Monthly executive intelligence pack',
          'Up to 3 data sources connected',
        ],
      },
      growth: {
        name: 'Intelligence Strategy',
        subtitle: 'Weekly dashboards & scenario modelling',
        roles: 'All 4 AI agents active',
        popular: true,
        features: [
          'Weekly KPI dashboards & forecasting',
          'Monthly scenario modelling',
          'Competitor & market intelligence',
          'Full AI governance & audit trails',
          'Board-ready quarterly intelligence pack',
          'Up to 8 data sources connected',
        ],
      },
      enterprise: {
        name: 'Intelligence Enterprise',
        subtitle: 'Real-time dashboards & dedicated strategist',
        roles: 'Dedicated Senior Strategy Advisor',
        features: [
          'Real-time dashboards & live KPI alerts',
          'Custom AI agent development',
          'Full compliance & governance suite',
          'Unlimited SOP extraction & knowledge base',
          'SLA-backed delivery',
          'Unlimited data sources',
        ],
      },
    },
  },
  {
    key: 'inventory',
    icon: '📦',
    name: 'Inventory Mgmt.',
    desc: 'Controller · Procurement · Forecaster · Warehouse',
    tiers: true,
    features: ['Real-time stock tracking', 'AI demand forecasting', 'Purchase order automation', 'Shopify / WooCommerce integration'],
    usd: { entry: 250, growth: 600, enterprise: 1200 },
    ngn: { entry: 50000, growth: 75000, enterprise: 100000 },
    tierDetails: {
      entry: {
        name: 'Inventory Essentials',
        subtitle: 'Core stock control',
        roles: 'Up to 3 users',
        features: [
          'Up to 10,000 active SKUs',
          '2 warehouse locations',
          'Core purchase ordering',
          'Shopify / WooCommerce integration',
          'Standard stock reports',
          'Email alerts & reorder triggers',
        ],
      },
      growth: {
        name: 'Inventory Growth',
        subtitle: 'AI forecasting & unlimited SKUs',
        roles: 'Up to 10 users',
        popular: true,
        features: [
          'Unlimited SKUs',
          'Up to 5 warehouse locations',
          'AI-powered demand forecasting',
          'Full API & webhook access',
          'Barcode / RFID scan workflows',
          'FIFO / AVCO / Specific cost methods',
        ],
      },
      enterprise: {
        name: 'Inventory Enterprise',
        subtitle: 'Manufacturing & multi-site',
        roles: 'Unlimited users + Dedicated Inventory Analyst',
        features: [
          'Unlimited SKUs + warehouses',
          'Manufacturing BOM & MRP',
          'Multi-company / multi-currency',
          'Custom dashboards & white-label reports',
          'SLA-backed support',
        ],
      },
    },
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
