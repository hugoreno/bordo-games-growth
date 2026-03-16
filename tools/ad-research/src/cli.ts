import { parseArgs } from "node:util";
import { scrapeFacebookAdLibrary } from "./scraper/facebook-library";
import { buildInsights } from "./analyzer/insights";
import {
  COMPETITORS,
  fetchAllCompetitors,
  aggregatePatterns,
} from "@bordo/ad-insights";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const DATA_DIR = join(import.meta.dirname, "../data");

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    competitor: { type: "string" },
    "max-ads": { type: "string", default: "20" },
  },
});

const command = positionals[0];

async function main() {
  switch (command) {
    case "scrape": {
      if (!values.competitor) {
        console.error('Usage: ad-research scrape --competitor "Club Vegas"');
        process.exit(1);
      }
      const ads = await scrapeFacebookAdLibrary({
        competitor: values.competitor,
        maxAds: parseInt(values["max-ads"]!, 10),
      });
      console.log(`Scraped ${ads.length} ads for "${values.competitor}"`);

      const insights = await buildInsights(values.competitor, ads);
      console.log(`Insights saved (${insights.totalAdsFound} ads)`);
      break;
    }

    case "scrape-all": {
      const accessToken = process.env.META_ACCESS_TOKEN;
      if (!accessToken) {
        console.error("META_ACCESS_TOKEN env var is required.");
        process.exit(1);
      }

      console.log(`Scraping all ${COMPETITORS.length} competitors...`);
      const allInsights = await fetchAllCompetitors(
        accessToken,
        parseInt(values["max-ads"]!, 10)
      );

      for (const insight of allInsights) {
        await buildInsights(insight.competitor, insight.ads);
      }

      const aggregated = aggregatePatterns(allInsights);
      const snapshotDir = join(DATA_DIR, "snapshots");
      await mkdir(snapshotDir, { recursive: true });

      const snapshot = {
        snapshotId: `cli-${Date.now()}`,
        scrapedAt: new Date().toISOString(),
        competitors: allInsights,
        aggregated,
      };
      await writeFile(
        join(snapshotDir, "latest-snapshot.json"),
        JSON.stringify(snapshot, null, 2)
      );

      const totalAds = allInsights.reduce((s, c) => s + c.totalAdsFound, 0);
      console.log(`Done! Scraped ${totalAds} ads across ${allInsights.length} competitors`);
      break;
    }

    default:
      console.error("Commands: scrape, scrape-all");
      console.error('  scrape --competitor "Club Vegas"  Scrape ads for one competitor');
      console.error("  scrape-all                        Scrape all competitors");
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
