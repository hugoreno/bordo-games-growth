import { chromium, type Browser, type Page } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { CompetitorAd, LayoutPattern } from "@bordo/ad-insights";

const DATA_DIR = join(import.meta.dirname, "../../data");

export interface ScrapeOptions {
  competitor: string;
  maxAds?: number;
  outputDir?: string;
}

export async function scrapeFacebookAdLibrary(options: ScrapeOptions): Promise<CompetitorAd[]> {
  const { competitor, maxAds = 20 } = options;
  const outputDir = options.outputDir ?? join(DATA_DIR, "raw", competitor.toLowerCase().replace(/\s+/g, "-"));
  await mkdir(outputDir, { recursive: true });

  console.log(`Scraping Facebook Ad Library for "${competitor}"...`);

  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Facebook Ad Library
    const searchUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${encodeURIComponent(competitor)}&media_type=all`;
    await page.goto(searchUrl, { waitUntil: "networkidle", timeout: 30000 });

    // Wait for results to load
    await page.waitForTimeout(3000);

    // Extract ad data from the page
    const ads = await page.evaluate((max: number) => {
      const adCards = document.querySelectorAll('[class*="ad"]');
      const results: Array<{
        imageUrl: string;
        headline: string;
        bodyText: string;
        cta: string;
      }> = [];

      adCards.forEach((card) => {
        if (results.length >= max) return;

        const img = card.querySelector("img");
        const texts = card.querySelectorAll("span, p, div");
        const textContent: string[] = [];
        texts.forEach((t) => {
          if (t.textContent && t.textContent.trim().length > 0) {
            textContent.push(t.textContent.trim());
          }
        });

        if (img?.src) {
          results.push({
            imageUrl: img.src,
            headline: textContent[0] ?? "",
            bodyText: textContent[1] ?? "",
            cta: textContent.find((t) => /play|install|get|download|spin/i.test(t)) ?? "",
          });
        }
      });

      return results;
    }, maxAds);

    // Download images and build CompetitorAd objects
    const competitorAds: CompetitorAd[] = [];
    for (let i = 0; i < ads.length; i++) {
      const ad = ads[i];
      const id = `${competitor.toLowerCase().replace(/\s+/g, "-")}-${i}`;
      const imagePath = join(outputDir, `${id}.png`);

      try {
        const response = await page.goto(ad.imageUrl);
        if (response) {
          const buffer = await response.body();
          await writeFile(imagePath, buffer);
        }
      } catch {
        // Image download failed, continue
      }

      competitorAds.push({
        id,
        competitor,
        imageUrl: ad.imageUrl,
        localImagePath: imagePath,
        headline: ad.headline || undefined,
        bodyText: ad.bodyText || undefined,
        cta: ad.cta || undefined,
        dominantColors: [],
        layout: guessLayout(ad.headline, ad.bodyText),
        scrapedAt: new Date().toISOString(),
      });
    }

    return competitorAds;
  } finally {
    await browser?.close();
  }
}

function guessLayout(headline?: string, bodyText?: string): LayoutPattern {
  // Simple heuristic — will be improved with actual image analysis
  if (!headline && !bodyText) return "hero-image-top";
  if (headline && headline.length > 50) return "text-overlay";
  return "hero-image-top";
}
