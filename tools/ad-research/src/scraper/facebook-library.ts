import {
  fetchCompetitorAds,
  getCompetitorBySlug,
  COMPETITORS,
} from "@bordo/ad-insights";
import type { CompetitorAd } from "@bordo/ad-insights";

export interface ScrapeOptions {
  competitor: string;
  maxAds?: number;
}

export async function scrapeFacebookAdLibrary(
  options: ScrapeOptions
): Promise<CompetitorAd[]> {
  const { competitor, maxAds = 20 } = options;

  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!accessToken) {
    console.error(
      "META_ACCESS_TOKEN env var is required.\n" +
        "Get one at https://developers.facebook.com → Graph API Explorer"
    );
    process.exit(1);
  }

  // Find the competitor config by name or slug
  const config =
    getCompetitorBySlug(competitor.toLowerCase().replace(/\s+/g, "-")) ||
    COMPETITORS.find(
      (c) => c.name.toLowerCase() === competitor.toLowerCase()
    );

  const searchTerms = config?.searchTerms ?? competitor;
  const name = config?.name ?? competitor;

  console.log(`Fetching ads from Meta Ad Library API for "${name}"...`);
  const ads = await fetchCompetitorAds(searchTerms, name, accessToken, maxAds);
  console.log(`Fetched ${ads.length} ads`);
  return ads;
}
