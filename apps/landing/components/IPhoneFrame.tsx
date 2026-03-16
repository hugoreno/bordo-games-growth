import { ReactNode } from "react";

export function IPhoneFrame({
  children,
  className = "",
  landscape = false,
}: {
  children: ReactNode;
  className?: string;
  landscape?: boolean;
}) {
  if (landscape) {
    return (
      <div className={`relative ${className}`}>
        {/* Phone outer shell - landscape */}
        <div className="relative rounded-[2.5rem] border-[3px] border-white/20 bg-[#1c1c1e] p-2 shadow-2xl shadow-black/60">
          {/* Dynamic Island - on the left side in landscape */}
          <div className="absolute top-1/2 left-2 z-20 h-[5.5rem] w-[1.4rem] -translate-y-1/2 rounded-full bg-[#1c1c1e]" />

          {/* Screen area */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#2c2c2e]">
            {children}
          </div>

          {/* Bottom bar indicator - horizontal at the bottom in landscape */}
          <div className="absolute right-[0.6rem] top-1/2 z-20 h-[8rem] w-[0.25rem] -translate-y-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Phone outer shell - portrait */}
      <div className="relative rounded-[2.5rem] border-[3px] border-white/20 bg-[#1c1c1e] p-2 shadow-2xl shadow-black/60">
        {/* Notch / Dynamic Island */}
        <div className="absolute left-1/2 top-2 z-20 h-[1.4rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-[#1c1c1e]" />

        {/* Screen area */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#2c2c2e]">
          {children}
        </div>

        {/* Bottom bar indicator */}
        <div className="absolute bottom-[0.6rem] left-1/2 z-20 h-[0.25rem] w-[8rem] -translate-x-1/2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

export function IPhonePlaceholder({ className = "" }: { className?: string }) {
  return (
    <IPhoneFrame className={className}>
      <div className="flex aspect-[9/19.5] w-full items-center justify-center bg-[#2c2c2e]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-white/10" />
          <p className="text-xs text-white/20">Screenshot</p>
        </div>
      </div>
    </IPhoneFrame>
  );
}
