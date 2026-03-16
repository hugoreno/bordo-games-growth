import { AppStoreBadge } from "./AppStoreBadge";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#1A1A2E]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo placeholder */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/10" />
          <span
            className="text-sm font-bold uppercase tracking-[0.15em]"
            style={{ color: "#D4A853" }}
          >
            Lucky Line
          </span>
        </div>

        {/* CTA */}
        <AppStoreBadge className="!px-4 !py-2 text-sm" />
      </div>
    </header>
  );
}
