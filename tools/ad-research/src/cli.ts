import { parseArgs } from "node:util";
import { scrapeFacebookAdLibrary } from "./scraper/facebook-library";
import { buildInsights } from "./analyzer/insights";

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

    default:
      console.error("Commands: scrape");
      console.error('  scrape --competitor "Club Vegas"  Scrape ads from Facebook Ad Library');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
