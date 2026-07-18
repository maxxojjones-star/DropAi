// ============================================================
// Orbit Data Pipeline — Shared Types
// ============================================================

// ── SerpAPI Types ──────────────────────────────────────────

export interface SerpApiShoppingResult {
  position: number;
  title: string;
  link: string;
  source: string;
  price: string;
  extracted_price?: number;
  thumbnail?: string;
  rating?: number;
  reviews?: number;
  delivery?: string;
}

export interface SerpApiTrendsResult {
  keyword: string;
  searchVolume: number;
  growthRate: number;
  trendDirection: 'rising' | 'stable' | 'falling';
  relatedQueries: string[];
  regionalInterest: Record<string, number>;
  timelineData?: { date: string; value: number }[];
}

// ── Scraper Types ──────────────────────────────────────────

export interface ScrapedShopifyProduct {
  title: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  vendor: string;
  productType: string;
  tags: string[];
  url: string;
  variants?: { title: string; price: number; available: boolean }[];
}

export interface ScrapedAdCreative {
  brandName: string;
  headline: string;
  description: string;
  platform: 'facebook' | 'instagram' | 'tiktok';
  adType: 'video' | 'image' | 'carousel';
  thumbnailUrl?: string;
  landingUrl?: string;
  ctaUsed?: string;
  estimatedReach?: number;
  screenshotPath?: string;
}

// ── Gemini Types ───────────────────────────────────────────

export interface GeminiProductAnalysis {
  overallScore: number;
  demandScore: number;
  competitionScore: number;
  profitScore: number;
  trendScore: number;
  seasonalityScore: number;
  supplierReliability: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendedPrice: number;
  targetAudience: string[];
  marketingAngles: string[];
}

export interface GeminiTrendAnalysis {
  category: string;
  trendDirection: 'rising' | 'stable' | 'falling';
  confidence: number;
  keyDrivers: string[];
  predictedPeak: string;
  marketSize: string;
  topKeywords: string[];
}

// ── Pipeline Job Types ─────────────────────────────────────

export type PipelineJobType =
  | 'serpapi_trends'
  | 'serpapi_shopping'
  | 'scrape_ads'
  | 'scrape_competitors'
  | 'gemini_analysis'
  | 'full_refresh';

export type PipelineJobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface PipelineJobConfig {
  categories?: string[];
  keywords?: string[];
  competitorUrls?: string[];
  platforms?: string[];
  maxResults?: number;
}

export interface PipelineResult {
  jobId: string;
  jobType: PipelineJobType;
  status: PipelineJobStatus;
  trackedProducts: number;
  scrapedAds: number;
  competitorStores: number;
  trendingItems: number;
  durationMs: number;
  error?: string;
}
