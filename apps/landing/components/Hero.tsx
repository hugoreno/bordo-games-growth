import { AppStoreBadge } from "./AppStoreBadge";
import { IPhonePlaceholder } from "./IPhoneFrame";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-24">
      {/* Background gradient layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,168,83,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(26,26,46,1) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Logo placeholder */}
          <div className="mx-auto mb-6 h-14 w-14 rounded-xl bg-white/10 lg:mx-0" />

          <h1
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#D4A853",
            }}
          >
            Your Luxury Casino Adventure
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl lg:mx-0">
            Embark on a luxurious train journey filled with thrilling slots,
            captivating mysteries, and dazzling rewards. Your next adventure is
            just a spin away.
          </p>

          <AppStoreBadge />
        </div>

        {/* iPhone placeholders side */}
        <div className="flex flex-shrink-0 items-end gap-4">
          <IPhonePlaceholder className="hidden w-[140px] opacity-60 md:block" />
          <IPhonePlaceholder className="w-[180px] md:w-[200px]" />
          <IPhonePlaceholder className="hidden w-[140px] opacity-60 md:block" />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(26,26,46,1), transparent)",
        }}
      />
    </section>
  );
}
