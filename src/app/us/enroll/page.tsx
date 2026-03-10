"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { trackLeadCapture } from "@/lib/analytics";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const API_BASE = "https://solyntaflow.uc.r.appspot.com";

function EnrollForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    state: "",
    country: "United States",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Extract UTM params
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
    });
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/education/lead-capture/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...utmParams,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.detail || data?.message || "Something went wrong. Please try again."
        );
      }

      // Fire lead capture tracking events
      trackLeadCapture({ email: form.email, state: form.state });

      router.push("/us/home");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-ghost mb-1.5"
          >
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-dark/80 border border-white/10 text-white-soft placeholder-ghost/40 focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/30 transition-colors"
            placeholder="Jane"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-ghost mb-1.5"
          >
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-dark/80 border border-white/10 text-white-soft placeholder-ghost/40 focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/30 transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ghost mb-1.5"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-dark/80 border border-white/10 text-white-soft placeholder-ghost/40 focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/30 transition-colors"
          placeholder="jane@example.com"
        />
      </div>

      {/* Country */}
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-ghost mb-1.5"
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          required
          value={form.country}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-dark/80 border border-white/10 text-white-soft focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/30 transition-colors appearance-none cursor-pointer"
        >
          <option value="United States">United States</option>
        </select>
      </div>

      {/* State */}
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-ghost mb-1.5"
        >
          State
        </label>
        <select
          id="state"
          name="state"
          required
          value={form.state}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-dark/80 border border-white/10 text-white-soft focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/30 transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Select your state
          </option>
          {US_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-coral/10 border border-coral/30 text-coral text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-full bg-teal text-midnight font-semibold text-base hover:shadow-2xl hover:shadow-teal/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          "Get Started"
        )}
      </button>
    </form>
  );
}

export default function EnrollPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-16">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-teal">
              Solynta Academy
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Accredited Homeschooling
            <br />
            <span className="text-gradient">for US Families</span>
          </h1>

          <p className="animate-fade-up delay-200 text-ghost text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            A world-class K-12 curriculum delivered online. Flexible scheduling,
            certified teachers, and a community that cares.
          </p>
        </div>

        {/* Form card */}
        <div className="animate-fade-up delay-300 rounded-2xl border border-white/10 bg-slate-dark/40 backdrop-blur-sm p-8">
          <h2 className="font-[var(--font-display)] text-xl font-semibold text-white-soft mb-6 text-center">
            Enroll Your Child Today
          </h2>

          <Suspense
            fallback={
              <div className="text-center text-ghost py-8">Loading...</div>
            }
          >
            <EnrollForm />
          </Suspense>

          <p className="text-xs text-ghost/50 text-center mt-5">
            By submitting, you agree to receive communications from Solynta
            Academy. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
