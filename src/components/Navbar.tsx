"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#platform", label: "Platform" },
  { href: "#agents", label: "AI Agents" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-lavender flex items-center justify-center font-[var(--font-display)] font-bold text-midnight text-sm tracking-tight group-hover:scale-110 transition-transform">
            ST
          </div>
          <span className="font-[var(--font-display)] font-semibold text-lg tracking-tight">
            Solynta<span className="text-teal">Talent</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ghost hover:text-teal transition-colors duration-300 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://calendly.com/uvieugono"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 py-2.5 text-sm font-medium rounded-full bg-teal text-midnight hover:bg-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-teal/20"
          >
            Book Discovery Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white-soft transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white-soft transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white-soft transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4 animate-fade-in">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-base text-ghost hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://calendly.com/uvieugono"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-block mt-2 px-6 py-2.5 text-sm font-medium rounded-full bg-teal text-midnight"
          >
            Book Discovery Call
          </a>
        </div>
      )}
    </nav>
  );
}
