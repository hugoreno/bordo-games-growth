const features = [
  {
    icon: "🚂",
    title: "Narrative Adventures",
    description:
      "Journey through a luxury train filled with characters, destinations, and mysteries waiting to be uncovered.",
  },
  {
    icon: "🎰",
    title: "Exciting Slots",
    description:
      "From Book of Cats to Fiesta Clusters — discover a rich variety of beautifully themed slot games.",
  },
  {
    icon: "🏆",
    title: "Daily Rewards",
    description:
      "Complete quests, climb the league, hit jackpots, and collect rewards every single day.",
  },
  {
    icon: "✨",
    title: "Free to Play",
    description:
      "All virtual currency. No real money gambling. Just pure entertainment and endless fun.",
  },
];

export function Features() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-4 text-center text-3xl font-bold md:text-4xl"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#D4A853",
          }}
        >
          Why Players Love Lucky Line
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-white/50">
          A social casino experience where gameplay, storytelling, and
          atmosphere come together.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[#D4A853]/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
