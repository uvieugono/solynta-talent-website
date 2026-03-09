"use client";

const sharedProps = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 480 360", fill: "none" };

export function FinanceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="fin-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="fin-g2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Dashboard frame */}
      <rect x="60" y="40" width="360" height="260" rx="16" fill="url(#fin-g1)" stroke="#00d4aa" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="60" y="40" width="360" height="36" rx="16" fill="#00d4aa" fillOpacity="0.08" />
      <circle cx="84" cy="58" r="5" fill="#ff6b6b" fillOpacity="0.6" />
      <circle cx="100" cy="58" r="5" fill="#f0c040" fillOpacity="0.6" />
      <circle cx="116" cy="58" r="5" fill="#00d4aa" fillOpacity="0.6" />
      {/* Bar chart */}
      <rect x="100" y="210" width="28" height="60" rx="4" fill="#00d4aa" fillOpacity="0.4">
        <animate attributeName="height" values="20;60;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="250;210;250" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="140" y="180" width="28" height="90" rx="4" fill="#00d4aa" fillOpacity="0.5">
        <animate attributeName="height" values="50;90;50" dur="3s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="y" values="220;180;220" dur="3s" begin="0.3s" repeatCount="indefinite" />
      </rect>
      <rect x="180" y="160" width="28" height="110" rx="4" fill="#00d4aa" fillOpacity="0.6">
        <animate attributeName="height" values="60;110;60" dur="3s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="210;160;210" dur="3s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="220" y="140" width="28" height="130" rx="4" fill="#00d4aa" fillOpacity="0.7">
        <animate attributeName="height" values="80;130;80" dur="3s" begin="0.9s" repeatCount="indefinite" />
        <animate attributeName="y" values="190;140;190" dur="3s" begin="0.9s" repeatCount="indefinite" />
      </rect>
      <rect x="260" y="120" width="28" height="150" rx="4" fill="#00d4aa" fillOpacity="0.8">
        <animate attributeName="height" values="100;150;100" dur="3s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="y" values="170;120;170" dur="3s" begin="1.2s" repeatCount="indefinite" />
      </rect>
      {/* Trend line */}
      <path d="M114 230 L154 200 L194 175 L234 150 L274 125" stroke="url(#fin-g2)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" fill="freeze" />
      </path>
      {/* Side metrics */}
      <rect x="320" y="100" width="80" height="50" rx="8" fill="#00d4aa" fillOpacity="0.06" stroke="#00d4aa" strokeOpacity="0.15" />
      <rect x="330" y="112" width="40" height="6" rx="3" fill="#00d4aa" fillOpacity="0.3" />
      <rect x="330" y="126" width="60" height="10" rx="3" fill="#00d4aa" fillOpacity="0.5" />
      <rect x="320" y="165" width="80" height="50" rx="8" fill="#a78bfa" fillOpacity="0.06" stroke="#a78bfa" strokeOpacity="0.15" />
      <rect x="330" y="177" width="40" height="6" rx="3" fill="#a78bfa" fillOpacity="0.3" />
      <rect x="330" y="191" width="60" height="10" rx="3" fill="#a78bfa" fillOpacity="0.5" />
      {/* Floating elements */}
      <circle cx="50" cy="100" r="20" fill="#00d4aa" fillOpacity="0.05" stroke="#00d4aa" strokeOpacity="0.15">
        <animate attributeName="cy" values="100;88;100" dur="4s" repeatCount="indefinite" />
      </circle>
      <text x="42" y="106" fontSize="16" fill="#00d4aa" fillOpacity="0.6">$</text>
      <circle cx="440" cy="260" r="16" fill="#f0c040" fillOpacity="0.05" stroke="#f0c040" strokeOpacity="0.15">
        <animate attributeName="cy" values="260;248;260" dur="5s" repeatCount="indefinite" />
      </circle>
      <text x="434" y="265" fontSize="12" fill="#f0c040" fillOpacity="0.5">%</text>
    </svg>
  );
}

export function SalesCrmIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="sales-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Pipeline funnel */}
      <path d="M120 60 L360 60 L320 140 L160 140 Z" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M160 145 L320 145 L290 210 L190 210 Z" fill="#a78bfa" fillOpacity="0.18" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M190 215 L290 215 L270 270 L210 270 Z" fill="#a78bfa" fillOpacity="0.25" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1" />
      <path d="M210 275 L270 275 L255 310 L225 310 Z" fill="#a78bfa" fillOpacity="0.4" stroke="#a78bfa" strokeOpacity="0.6" strokeWidth="1" />
      {/* Labels */}
      <text x="240" y="108" textAnchor="middle" fontSize="11" fill="#a78bfa" fillOpacity="0.7" fontFamily="monospace">LEADS — 1,240</text>
      <text x="240" y="183" textAnchor="middle" fontSize="11" fill="#a78bfa" fillOpacity="0.8" fontFamily="monospace">QUALIFIED — 380</text>
      <text x="240" y="248" textAnchor="middle" fontSize="11" fill="#a78bfa" fillOpacity="0.9" fontFamily="monospace">PROPOSAL — 95</text>
      <text x="240" y="300" textAnchor="middle" fontSize="11" fill="#a78bfa" fontFamily="monospace">WON — 42</text>
      {/* Conversion arrows */}
      <path d="M370 80 Q400 80 400 110" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" fill="none" markerEnd="url(#arrow-sales)" />
      <text x="405" y="100" fontSize="10" fill="#a78bfa" fillOpacity="0.5">31%</text>
      <path d="M370 160 Q400 160 400 190" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" fill="none" />
      <text x="405" y="180" fontSize="10" fill="#a78bfa" fillOpacity="0.5">25%</text>
      <path d="M370 230 Q400 230 400 260" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" fill="none" />
      <text x="405" y="250" fontSize="10" fill="#a78bfa" fillOpacity="0.5">44%</text>
      {/* Lead cards floating */}
      <g>
        <rect x="30" y="70" width="65" height="45" rx="8" fill="#a78bfa" fillOpacity="0.08" stroke="#a78bfa" strokeOpacity="0.2">
          <animate attributeName="y" values="70;60;70" dur="4s" repeatCount="indefinite" />
        </rect>
        <circle cx="48" cy="87" r="8" fill="#a78bfa" fillOpacity="0.2" />
        <rect x="60" y="82" width="28" height="4" rx="2" fill="#a78bfa" fillOpacity="0.3" />
        <rect x="60" y="92" width="20" height="4" rx="2" fill="#a78bfa" fillOpacity="0.2" />
      </g>
      <g>
        <rect x="40" y="140" width="65" height="45" rx="8" fill="#00d4aa" fillOpacity="0.08" stroke="#00d4aa" strokeOpacity="0.2">
          <animate attributeName="y" values="140;130;140" dur="5s" repeatCount="indefinite" />
        </rect>
        <circle cx="58" cy="157" r="8" fill="#00d4aa" fillOpacity="0.2" />
        <rect x="70" y="152" width="28" height="4" rx="2" fill="#00d4aa" fillOpacity="0.3" />
        <rect x="70" y="162" width="20" height="4" rx="2" fill="#00d4aa" fillOpacity="0.2" />
      </g>
    </svg>
  );
}

export function CustomerServiceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="cs-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Central bot */}
      <circle cx="240" cy="160" r="60" fill="url(#cs-g1)" stroke="#ff6b6b" strokeOpacity="0.3" strokeWidth="1.5">
        <animate attributeName="r" values="58;62;58" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="160" r="40" fill="#ff6b6b" fillOpacity="0.08" />
      <circle cx="225" cy="150" r="5" fill="#ff6b6b" fillOpacity="0.5" />
      <circle cx="255" cy="150" r="5" fill="#ff6b6b" fillOpacity="0.5" />
      <path d="M225 172 Q240 185 255 172" stroke="#ff6b6b" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Antenna */}
      <line x1="240" y1="100" x2="240" y2="80" stroke="#ff6b6b" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="240" cy="76" r="4" fill="#ff6b6b" fillOpacity="0.4">
        <animate attributeName="fillOpacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Chat bubbles - WhatsApp */}
      <g>
        <rect x="50" y="60" width="110" height="55" rx="12" fill="#25D366" fillOpacity="0.1" stroke="#25D366" strokeOpacity="0.3">
          <animate attributeName="y" values="60;52;60" dur="4s" repeatCount="indefinite" />
        </rect>
        <text x="65" y="82" fontSize="9" fill="#25D366" fillOpacity="0.7" fontFamily="sans-serif">WhatsApp</text>
        <rect x="65" y="90" width="70" height="4" rx="2" fill="#25D366" fillOpacity="0.2" />
        <rect x="65" y="100" width="50" height="4" rx="2" fill="#25D366" fillOpacity="0.15" />
        <line x1="160" y1="88" x2="190" y2="140" stroke="#ff6b6b" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
      </g>
      {/* Email */}
      <g>
        <rect x="340" y="80" width="110" height="55" rx="12" fill="#a78bfa" fillOpacity="0.1" stroke="#a78bfa" strokeOpacity="0.3">
          <animate attributeName="y" values="80;72;80" dur="5s" repeatCount="indefinite" />
        </rect>
        <text x="355" y="102" fontSize="9" fill="#a78bfa" fillOpacity="0.7" fontFamily="sans-serif">Email</text>
        <rect x="355" y="110" width="70" height="4" rx="2" fill="#a78bfa" fillOpacity="0.2" />
        <rect x="355" y="120" width="50" height="4" rx="2" fill="#a78bfa" fillOpacity="0.15" />
        <line x1="340" y1="108" x2="300" y2="148" stroke="#ff6b6b" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
      </g>
      {/* Web chat */}
      <g>
        <rect x="60" y="240" width="110" height="55" rx="12" fill="#00d4aa" fillOpacity="0.1" stroke="#00d4aa" strokeOpacity="0.3">
          <animate attributeName="y" values="240;232;240" dur="4.5s" repeatCount="indefinite" />
        </rect>
        <text x="75" y="262" fontSize="9" fill="#00d4aa" fillOpacity="0.7" fontFamily="sans-serif">Web Chat</text>
        <rect x="75" y="270" width="70" height="4" rx="2" fill="#00d4aa" fillOpacity="0.2" />
        <rect x="75" y="280" width="50" height="4" rx="2" fill="#00d4aa" fillOpacity="0.15" />
        <line x1="170" y1="260" x2="210" y2="200" stroke="#ff6b6b" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
      </g>
      {/* 24/7 badge */}
      <rect x="320" y="250" width="80" height="35" rx="17" fill="#ff6b6b" fillOpacity="0.1" stroke="#ff6b6b" strokeOpacity="0.3">
        <animate attributeName="strokeOpacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="360" y="272" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ff6b6b" fillOpacity="0.7" fontFamily="monospace">24/7</text>
    </svg>
  );
}

export function HrAdminIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="hr-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c040" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f0c040" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Org chart */}
      <circle cx="240" cy="70" r="25" fill="url(#hr-g1)" stroke="#f0c040" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="240" cy="62" r="8" fill="#f0c040" fillOpacity="0.3" />
      <path d="M228 78 Q240 88 252 78" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Lines down */}
      <line x1="240" y1="95" x2="240" y2="120" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="240" y1="120" x2="120" y2="120" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="240" y1="120" x2="360" y2="120" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="120" y1="120" x2="120" y2="140" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="240" y1="120" x2="240" y2="140" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="360" y1="120" x2="360" y2="140" stroke="#f0c040" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* Team nodes */}
      {[[120, 165], [240, 165], [360, 165]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="22" fill="#f0c040" fillOpacity="0.06" stroke="#f0c040" strokeOpacity="0.25" />
          <circle cx={cx} cy={cy - 5} r="6" fill="#f0c040" fillOpacity="0.25" />
          <path d={`M${cx - 10} ${cy + 8} Q${cx} ${cy + 15} ${cx + 10} ${cy + 8}`} stroke="#f0c040" strokeOpacity="0.15" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* Workflow cards */}
      <rect x="50" y="220" width="100" height="65" rx="10" fill="#f0c040" fillOpacity="0.06" stroke="#f0c040" strokeOpacity="0.2">
        <animate attributeName="y" values="220;214;220" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="65" y="242" fontSize="9" fill="#f0c040" fillOpacity="0.6">Onboarding</text>
      <rect x="65" y="252" width="60" height="4" rx="2" fill="#f0c040" fillOpacity="0.2" />
      <rect x="65" y="262" width="40" height="4" rx="2" fill="#00d4aa" fillOpacity="0.3" />
      <rect x="190" y="230" width="100" height="65" rx="10" fill="#00d4aa" fillOpacity="0.06" stroke="#00d4aa" strokeOpacity="0.2">
        <animate attributeName="y" values="230;224;230" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="205" y="252" fontSize="9" fill="#00d4aa" fillOpacity="0.6">Leave Tracking</text>
      <rect x="205" y="262" width="60" height="4" rx="2" fill="#00d4aa" fillOpacity="0.2" />
      <rect x="205" y="272" width="70" height="4" rx="2" fill="#00d4aa" fillOpacity="0.3" />
      <rect x="330" y="220" width="100" height="65" rx="10" fill="#a78bfa" fillOpacity="0.06" stroke="#a78bfa" strokeOpacity="0.2">
        <animate attributeName="y" values="220;214;220" dur="4.5s" repeatCount="indefinite" />
      </rect>
      <text x="345" y="242" fontSize="9" fill="#a78bfa" fillOpacity="0.6">Procurement</text>
      <rect x="345" y="252" width="60" height="4" rx="2" fill="#a78bfa" fillOpacity="0.2" />
      <rect x="345" y="262" width="50" height="4" rx="2" fill="#a78bfa" fillOpacity="0.3" />
    </svg>
  );
}

export function MarketingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="mkt-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Central megaphone */}
      <g transform="translate(200, 100)">
        <path d="M20 40 L60 20 L60 80 L20 60 Z" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeOpacity="0.4" strokeWidth="1" />
        <rect x="5" y="38" width="18" height="24" rx="4" fill="#ec4899" fillOpacity="0.2" />
        <path d="M60 25 Q95 -5 95 50 Q95 105 60 75" fill="none" stroke="#ec4899" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M65 30 Q90 5 90 50 Q90 95 65 70" fill="none" stroke="#ec4899" strokeOpacity="0.15" strokeWidth="1" />
      </g>
      {/* Social icons ring */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 240 + Math.cos(rad) * 130;
        const cy = 170 + Math.sin(rad) * 110;
        const colors = ["#1DA1F2", "#E4405F", "#0A66C2", "#25D366", "#FF0000", "#ec4899"];
        const labels = ["Tw", "IG", "Li", "WA", "YT", "Fb"];
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="22" fill={colors[i]} fillOpacity="0.08" stroke={colors[i]} strokeOpacity="0.25">
              <animate attributeName="r" values="20;24;20" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill={colors[i]} fillOpacity="0.6" fontWeight="bold" fontFamily="monospace">{labels[i]}</text>
            <line x1={240 + Math.cos(rad) * 70} y1={170 + Math.sin(rad) * 55} x2={cx - Math.cos(rad) * 22} y2={cy - Math.sin(rad) * 22} stroke="#ec4899" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        );
      })}
      {/* Analytics wave */}
      <path d="M40 310 Q100 280 160 295 Q220 310 280 285 Q340 260 400 275 Q430 282 440 290" stroke="#ec4899" strokeOpacity="0.2" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 320 Q100 300 160 310 Q220 320 280 300 Q340 280 400 290 Q430 296 440 300" stroke="#a78bfa" strokeOpacity="0.15" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DevIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="dev-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Code editor frame */}
      <rect x="60" y="30" width="360" height="280" rx="12" fill="url(#dev-g1)" stroke="#22d3ee" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="60" y="30" width="360" height="30" rx="12" fill="#22d3ee" fillOpacity="0.06" />
      <circle cx="82" cy="45" r="4" fill="#ff6b6b" fillOpacity="0.5" />
      <circle cx="96" cy="45" r="4" fill="#f0c040" fillOpacity="0.5" />
      <circle cx="110" cy="45" r="4" fill="#00d4aa" fillOpacity="0.5" />
      {/* Line numbers */}
      {[80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272].map((y, i) => (
        <text key={i} x="78" y={y} fontSize="9" fill="#22d3ee" fillOpacity="0.15" fontFamily="monospace" textAnchor="end">{i + 1}</text>
      ))}
      {/* Code lines */}
      <rect x="90" y="74" width="80" height="8" rx="2" fill="#22d3ee" fillOpacity="0.3" />
      <rect x="90" y="90" width="120" height="8" rx="2" fill="#a78bfa" fillOpacity="0.25" />
      <rect x="105" y="106" width="200" height="8" rx="2" fill="#22d3ee" fillOpacity="0.15" />
      <rect x="105" y="122" width="160" height="8" rx="2" fill="#f0c040" fillOpacity="0.2" />
      <rect x="105" y="138" width="180" height="8" rx="2" fill="#22d3ee" fillOpacity="0.2" />
      <rect x="105" y="154" width="140" height="8" rx="2" fill="#00d4aa" fillOpacity="0.25" />
      <rect x="105" y="170" width="220" height="8" rx="2" fill="#22d3ee" fillOpacity="0.15" />
      <rect x="90" y="186" width="100" height="8" rx="2" fill="#a78bfa" fillOpacity="0.2" />
      <rect x="90" y="202" width="60" height="8" rx="2" fill="#22d3ee" fillOpacity="0.3" />
      <rect x="90" y="218" width="150" height="8" rx="2" fill="#ff6b6b" fillOpacity="0.15" />
      <rect x="105" y="234" width="180" height="8" rx="2" fill="#22d3ee" fillOpacity="0.2" />
      <rect x="105" y="250" width="130" height="8" rx="2" fill="#00d4aa" fillOpacity="0.2" />
      <rect x="90" y="266" width="40" height="8" rx="2" fill="#22d3ee" fillOpacity="0.3" />
      {/* Cursor blinking */}
      <rect x="170" y="250" width="2" height="12" fill="#22d3ee" fillOpacity="0.8">
        <animate attributeName="fillOpacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Terminal output */}
      <rect x="60" y="290" width="360" height="20" rx="0" fill="#22d3ee" fillOpacity="0.03" />
      <text x="75" y="304" fontSize="8" fill="#00d4aa" fillOpacity="0.5" fontFamily="monospace">$ build successful ✓ 0 errors</text>
    </svg>
  );
}

export function DataScienceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="ds-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Neural network nodes */}
      {/* Input layer */}
      {[100, 150, 200, 250].map((y, i) => (
        <circle key={`in-${i}`} cx="80" cy={y} r="12" fill="#34d399" fillOpacity="0.1" stroke="#34d399" strokeOpacity="0.3">
          <animate attributeName="fillOpacity" values="0.05;0.15;0.05" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Hidden layer 1 */}
      {[80, 130, 180, 230, 280].map((y, i) => (
        <circle key={`h1-${i}`} cx="200" cy={y} r="14" fill="#34d399" fillOpacity="0.12" stroke="#34d399" strokeOpacity="0.35">
          <animate attributeName="fillOpacity" values="0.08;0.2;0.08" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Hidden layer 2 */}
      {[110, 170, 230].map((y, i) => (
        <circle key={`h2-${i}`} cx="320" cy={y} r="14" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeOpacity="0.4">
          <animate attributeName="fillOpacity" values="0.1;0.25;0.1" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Output */}
      <circle cx="420" cy="170" r="18" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeOpacity="0.5">
        <animate attributeName="r" values="16;20;16" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="420" y="175" textAnchor="middle" fontSize="10" fill="#34d399" fillOpacity="0.7" fontFamily="monospace">OUT</text>
      {/* Connections */}
      {[100, 150, 200, 250].map((y1) =>
        [80, 130, 180, 230, 280].map((y2, j) => (
          <line key={`c1-${y1}-${j}`} x1="92" y1={y1} x2="186" y2={y2} stroke="#34d399" strokeOpacity="0.06" strokeWidth="0.5" />
        ))
      )}
      {[80, 130, 180, 230, 280].map((y1) =>
        [110, 170, 230].map((y2, j) => (
          <line key={`c2-${y1}-${j}`} x1="214" y1={y1} x2="306" y2={y2} stroke="#34d399" strokeOpacity="0.08" strokeWidth="0.5" />
        ))
      )}
      {[110, 170, 230].map((y, i) => (
        <line key={`c3-${i}`} x1="334" y1={y} x2="402" y2={170} stroke="#34d399" strokeOpacity="0.1" strokeWidth="0.5" />
      ))}
      {/* Data pulse traveling */}
      <circle r="3" fill="#34d399" fillOpacity="0.6">
        <animateMotion dur="3s" repeatCount="indefinite" path="M80 150 L200 180 L320 170 L420 170" />
      </circle>
      <circle r="3" fill="#00d4aa" fillOpacity="0.4">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M80 200 L200 130 L320 110 L420 170" begin="1s" />
      </circle>
    </svg>
  );
}

export function InventoryIllustration({ className = "" }: { className?: string }) {
  return (
    <svg {...sharedProps} className={className}>
      <defs>
        <linearGradient id="inv-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Warehouse shelves */}
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <line x1="80" y1={100 + row * 80} x2="400" y2={100 + row * 80} stroke="#fbbf24" strokeOpacity="0.15" strokeWidth="2" />
          {/* Boxes on shelf */}
          {[0, 1, 2, 3].map((col) => {
            const x = 100 + col * 80;
            const y = 100 + row * 80;
            const heights = [35, 45, 30, 40];
            const h = heights[(row + col) % 4];
            const opacities = [0.12, 0.18, 0.1, 0.15];
            return (
              <g key={col}>
                <rect x={x} y={y - h} width="50" height={h} rx="4" fill="#fbbf24" fillOpacity={opacities[(row + col) % 4]} stroke="#fbbf24" strokeOpacity="0.2" />
                <rect x={x + 15} y={y - h + 8} width="20" height="3" rx="1" fill="#fbbf24" fillOpacity="0.2" />
              </g>
            );
          })}
        </g>
      ))}
      {/* Vertical shelf supports */}
      <line x1="80" y1="50" x2="80" y2="280" stroke="#fbbf24" strokeOpacity="0.1" strokeWidth="2" />
      <line x1="400" y1="50" x2="400" y2="280" stroke="#fbbf24" strokeOpacity="0.1" strokeWidth="2" />
      {/* Forklift / scanner icon */}
      <rect x="420" y="200" width="40" height="30" rx="6" fill="#fbbf24" fillOpacity="0.1" stroke="#fbbf24" strokeOpacity="0.25">
        <animate attributeName="y" values="200;192;200" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="427" y="210" width="10" height="3" rx="1" fill="#00d4aa" fillOpacity="0.5" />
      <rect x="427" y="216" width="26" height="3" rx="1" fill="#fbbf24" fillOpacity="0.3" />
      <rect x="427" y="222" width="18" height="3" rx="1" fill="#fbbf24" fillOpacity="0.2" />
      {/* Stock level indicator */}
      <rect x="30" y="80" width="30" height="200" rx="6" fill="#fbbf24" fillOpacity="0.05" stroke="#fbbf24" strokeOpacity="0.15" />
      <rect x="34" y="140" width="22" height="136" rx="4" fill="#fbbf24" fillOpacity="0.2">
        <animate attributeName="height" values="136;100;136" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y" values="140;176;140" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="45" y="310" textAnchor="middle" fontSize="8" fill="#fbbf24" fillOpacity="0.4" fontFamily="monospace">STOCK</text>
    </svg>
  );
}

export const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  "finance-core": FinanceIllustration,
  "sales-crm-web": SalesCrmIllustration,
  "customer-service": CustomerServiceIllustration,
  "hr-admin": HrAdminIllustration,
  "marketing": MarketingIllustration,
  "embedded-developers": DevIllustration,
  "data-science": DataScienceIllustration,
  "inventory-management": InventoryIllustration,
};
