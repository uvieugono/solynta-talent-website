// src/components/StackCalculator.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MODULES,
  ModuleKey,
  ModuleDefinition,
  Tier,
  Currency,
  formatPrice,
  getModulePrice,
} from "@/lib/pricing";

type Selected = Record<ModuleKey, Tier | false>;

const TIERS: { key: Tier; label: string }[] = [
  { key: "entry", label: "Entry" },
  { key: "growth", label: "Growth" },
  { key: "enterprise", label: "Enterprise" },
];

function initialSelected(): Selected {
  return Object.fromEntries(MODULES.map((m) => [m.key, false])) as Selected;
}

export default function StackCalculator({ fullPage = false }: { fullPage?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selected, setSelected] = useState<Selected>(initialSelected);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleCardClick(mod: ModuleDefinition) {
    const key = mod.key;
    if (mod.tiers) {
      // Tiered: first click adds at entry. Use × button to remove.
      if (selected[key] === false) {
        setSelected((s) => ({ ...s, [key]: "entry" }));
      }
    } else {
      // Single-tier: toggle add/remove
      setSelected((s) => ({ ...s, [key]: s[key] === false ? "entry" : false }));
    }
  }

  function handleTierChange(key: ModuleKey, tier: Tier) {
    setSelected((s) => ({ ...s, [key]: tier }));
  }

  function handleRemove(key: ModuleKey) {
    setSelected((s) => ({ ...s, [key]: false }));
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const selectedModules = MODULES.filter((m) => selected[m.key] !== false);
  const total = selectedModules.reduce((sum, m) => {
    const tier = selected[m.key] as Tier;
    return sum + getModulePrice(m, tier, currency);
  }, 0);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Currency toggle */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-ghost/60 mr-2">
          View pricing in
        </span>
        {(["USD", "NGN"] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currency === c
                ? "bg-teal text-midnight"
                : "bg-slate-dark/50 text-ghost border border-white/10 hover:border-teal/30"
            }`}
          >
            <span>{c === "USD" ? "🇺🇸" : "🇳🇬"}</span>
            <span>{c}</span>
          </button>
        ))}
      </div>

      {/* Module card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {MODULES.map((mod) => {
          const isSelected = selected[mod.key] !== false;
          const currentTier = (selected[mod.key] as Tier | false) || "entry";

          return (
            <div
              key={mod.key}
              onClick={() => handleCardClick(mod)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(mod);
                }
              }}
              className={`relative rounded-xl border transition-all duration-200 cursor-pointer ${
                fullPage ? "p-6" : "p-5"
              } ${
                isSelected
                  ? "border-teal/50 bg-teal/5"
                  : "border-white/10 bg-slate-dark/40 hover:border-white/20 hover:bg-slate-dark/60"
              }`}
            >
              {/* Remove button — only for tiered modules when selected */}
              {isSelected && mod.tiers && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(mod.key);
                  }}
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-ghost/60 hover:bg-white/20 hover:text-white-soft text-xs transition-all"
                  aria-label={`Remove ${mod.name}`}
                >
                  ×
                </button>
              )}

              {/* Selected indicator — single-tier modules */}
              {isSelected && !mod.tiers && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-teal flex items-center justify-center">
                  <svg className="w-3 h-3 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white-soft text-sm leading-tight">
                    {mod.name}
                  </h4>
                  <p className="text-ghost/60 text-xs mt-0.5 leading-tight">{mod.desc}</p>
                </div>
              </div>

              {/* Full-page feature bullets */}
              {fullPage && (
                <ul className="space-y-1 mb-3">
                  {mod.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-ghost/70">
                      <span className="text-teal/70 mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              <div className={`font-mono font-bold ${isSelected ? "text-teal" : "text-ghost/50"} ${fullPage ? "text-base" : "text-sm"}`}>
                {mod.tiers
                  ? `from ${formatPrice(getModulePrice(mod, "entry", currency), currency)}/mo`
                  : `${formatPrice(getModulePrice(mod, "entry", currency), currency)}/mo`}
              </div>

              {/* Tier selector — tiered modules when selected */}
              {isSelected && mod.tiers && (
                <div
                  className="flex gap-1.5 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {TIERS.filter((t) => mod.usd[t.key] !== undefined).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => handleTierChange(mod.key, t.key)}
                      className={`flex-1 py-1 rounded text-xs font-medium transition-all duration-150 ${
                        currentTier === t.key
                          ? "bg-teal text-midnight"
                          : "bg-white/5 text-ghost/60 hover:bg-white/10 hover:text-white-soft"
                      }`}
                    >
                      <span className="block">{t.label}</span>
                      <span className="block text-[10px] opacity-80 font-mono">
                        {formatPrice(getModulePrice(mod, t.key, currency), currency)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live total bar */}
      <div className="rounded-xl border border-white/10 bg-slate-dark/50 p-4">
        {selectedModules.length === 0 ? (
          <p className="text-center text-ghost/50 text-sm py-2">
            Click any module above to build your stack
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Selected tags */}
            <div className="flex flex-wrap gap-2">
              {selectedModules.map((m) => {
                const tier = selected[m.key] as Tier;
                return (
                  <div
                    key={m.key}
                    className="flex items-center gap-1.5 bg-teal/10 border border-teal/20 rounded-full px-3 py-1 text-xs"
                  >
                    <span>{m.icon}</span>
                    <span className="text-white-soft">{m.name}</span>
                    {m.tiers && (
                      <span className="text-teal/70 capitalize">{tier}</span>
                    )}
                    <span className="text-teal font-mono font-semibold">
                      {formatPrice(getModulePrice(m, tier, currency), currency)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-ghost/60 text-sm">
                {selectedModules.length} service{selectedModules.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-ghost/50 block">Monthly total</span>
                  <span className="font-mono font-bold text-teal text-lg">
                    {formatPrice(total, currency)}<span className="text-ghost/50 text-sm">/mo</span>
                  </span>
                </div>
                {fullPage && (
                  <Link
                    href="/consultation"
                    className="bg-teal text-midnight font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-teal/20 transition-all duration-200 whitespace-nowrap"
                  >
                    Get Started →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
