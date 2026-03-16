import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { CompetitorAd, CompetitorInsights } from "@bordo/ad-insights";

const DATA_DIR = join(import.meta.dirname, "../../data");

export async function buildInsights(
  competitor: string,
  ads: CompetitorAd[]
): Promise<CompetitorInsights> {
  const insights: CompetitorInsights = {
    competitor,
    scrapedAt: new Date().toISOString(),
    ads,
    totalAdsFound: ads.length,
  };

  // Write insights to data directory
  const insightsDir = join(DATA_DIR, "insights");
  await mkdir(insightsDir, { recursive: true });

  const filename = competitor.toLowerCase().replace(/\s+/g, "-");
  const filePath = join(insightsDir, `${filename}.json`);
  await writeFile(filePath, JSON.stringify(insights, null, 2));

  // Also write as latest.json for easy access
  await writeFile(join(insightsDir, "latest.json"), JSON.stringify(insights, null, 2));

  console.log(`Insights written to ${filePath}`);
  return insights;
}
