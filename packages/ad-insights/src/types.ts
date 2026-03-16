import type { z } from "zod";
import type {
  CompetitorAdSchema,
  CompetitorInsightsSchema,
  AggregatedPatternsSchema,
  CreativeBriefSchema,
  LayoutPatternSchema,
  AdSizeSchema,
} from "./schemas";

export type LayoutPattern =
  | "hero-image-top"
  | "text-overlay"
  | "split-screen"
  | "character-focused"
  | "jackpot-showcase";

export type AdSize = "square" | "landscape" | "story";

export interface CompetitorAd {
  id: string;
  competitor: string;
  imageUrl: string;
  localImagePath?: string;
  headline?: string;
  bodyText?: string;
  cta?: string;
  dominantColors: string[];
  layout: LayoutPattern;
  scrapedAt: string;
}

export interface CompetitorInsights {
  competitor: string;
  scrapedAt: string;
  ads: CompetitorAd[];
  totalAdsFound: number;
}

export interface AggregatedPatterns {
  generatedAt: string;
  competitors: string[];
  totalAdsAnalyzed: number;
  topCTAs: { text: string; count: number; percentage: number }[];
  headlineKeywords: { word: string; count: number }[];
  layoutDistribution: { layout: LayoutPattern; count: number; percentage: number }[];
  colorPalettes: { colors: string[]; competitor: string }[];
}

export interface CreativeBrief {
  id: string;
  template: "hero-image" | "text-overlay" | "split-screen";
  size: AdSize;
  props: {
    headline: string;
    cta: string;
    backgroundImage?: string;
    characterImage?: string;
    colorOverrides?: {
      background?: string;
      headlineColor?: string;
      ctaBackground?: string;
      ctaColor?: string;
    };
  };
  metadata?: {
    generatedFrom?: string;
    sourceInsights?: string;
  };
}
