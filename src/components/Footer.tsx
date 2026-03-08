export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-lavender flex items-center justify-center font-[var(--font-display)] font-bold text-midnight text-xs">
              ST
            </div>
            <span className="font-[var(--font-display)] font-semibold text-sm tracking-tight text-ghost/60">
              Solynta<span className="text-teal/60">Talent</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs tracking-[0.35em] uppercase text-ghost/30 font-medium">
            Intelligence at Work
          </p>

          {/* Copyright */}
          <p className="text-xs text-ghost/30">
            &copy; {new Date().getFullYear()} Solynta Talent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
