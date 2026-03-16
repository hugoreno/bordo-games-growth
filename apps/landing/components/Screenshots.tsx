import Image from "next/image";
import { IPhoneFrame } from "./IPhoneFrame";

const screenshots = [
  {
    src: "/screenshots/screenshot1.png",
    alt: "Lucky Line lobby showing Big Wins and featured slot games",
  },
  {
    src: "/screenshots/screenshot2.png",
    alt: "Book of Cats Megaways slot gameplay with Egyptian theme",
  },
  {
    src: "/screenshots/screenshot3.png",
    alt: "Game details showing bet options and play button",
  },
];

export function Screenshots() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-4 text-center text-3xl font-bold md:text-4xl"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#D4A853",
          }}
        >
          A Glimpse Inside
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-white/50">
          Explore a world of thrilling games, stunning visuals, and endless
          entertainment.
        </p>

        {/* Scroll-snap carousel - landscape iPhones */}
        <div
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 md:flex-col md:items-center md:gap-10 md:overflow-visible"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {screenshots.map((screenshot, i) => (
            <div
              key={screenshot.src}
              className="w-[85vw] max-w-[560px] flex-shrink-0 snap-center"
            >
              <IPhoneFrame landscape>
                <div className="relative aspect-[19.5/9] w-full">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                  />
                </div>
              </IPhoneFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
