import { AppStoreBadge } from "./AppStoreBadge";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <p
          className="mb-2 text-sm font-bold uppercase tracking-[0.3em]"
          style={{ color: "#D4A853" }}
        >
          Lucky Line
        </p>
        <p className="mb-8 text-white/50">
          Your luxury casino adventure awaits.
        </p>

        <div className="mb-10 flex justify-center">
          <AppStoreBadge />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-white/40">
          <a href="#" className="transition hover:text-white/70">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-white/70">
            Terms of Service
          </a>
          <a href="#" className="transition hover:text-white/70">
            Support
          </a>
        </div>

        <p className="mb-2 text-xs text-white/30">
          Lucky Line is a social casino game for entertainment purposes only. No
          real money gambling. All currency is virtual and has no cash value.
        </p>
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} Bordo Games. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
