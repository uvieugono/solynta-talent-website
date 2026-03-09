import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Solynta Talent"
              width={130}
              height={36}
              className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
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
