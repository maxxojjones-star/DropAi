// ============================================================
// Orbit Data Pipeline — Main Orchestrator
// Coordinates SerpAPI, Puppeteer scraping, and Gemini analysis
// Persists all spy-tool data to the database
// ============================================================

import { prisma } from '@/lib/prisma';
import { searchGoogleShopping, fetchGoogleTrends, isSerpApiConfigured, discoverTrendingProducts } from './serpapi-client';
import { scrapeShopifyProduct, discoverShopifyStoreProducts, detectStorePlatform, scrapeFacebookAdLibrary, scrapeTikTokTrending } from './scraper';
import { analyzeProduct, analyzeTrends, isGeminiConfigured, analyzeAdPerformance } from './trend-analyzer';
import type { PipelineJobType, PipelineJobConfig, PipelineResult } from './types';

// ── Status ──────────────────────────────────────────────────

export function getPipelineStatus() {
  return { serpapi: isSerpApiConfigured(), scraper: true, gemini: isGeminiConfigured() };
}

// ── Main Runner ─────────────────────────────────────────────

export async function runPipeline(
  jobType: PipelineJobType, config: PipelineJobConfig = {}
): Promise<PipelineResult> {
  const startTime = Date.now();

  const job = await prisma.pipelineJob.create({
    data: { jobType, status: 'running', metadata: config as Record<string, unknown>, startedAt: new Date() },
  });

  try {
    let counts: { trackedProducts: number; scrapedAds: number; competitorStores: number; trendingItems: number };

    switch (jobType) {
      case 'serpapi_shopping': counts = await runShopping(job.id, config); break;
      case 'serpapi_trends':   counts = await runTrends(job.id, config); break;
      case 'scrape_ads':       counts = await runAds(job.id, config); break;
      case 'scrape_competitors': counts = await runCompetitors(job.id, config); break;
      case 'gemini_analysis':  counts = await runAnalysis(job.id, config); break;
      case 'full_refresh':     counts = await runFullRefresh(job.id, config); break;
      default: throw new Error(`Unknown job type: ${jobType}`);
    }

    const durationMs = Date.now() - startTime;
    await prisma.pipelineJob.update({
      where: { id: job.id },
      data: {
        status: 'completed', completedAt: new Date(), durationMs,
        resultsCount: counts.trackedProducts + counts.scrapedAds + counts.competitorStores + counts.trendingItems,
      },
    });

    return { jobId: job.id, jobType, status: 'completed', ...counts, durationMs };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    await prisma.pipelineJob.update({
      where: { id: job.id },
      data: { status: 'failed', completedAt: new Date(), durationMs, errorMessage: errMsg },
    });
    return { jobId: job.id, jobType, status: 'failed', trackedProducts: 0, scrapedAds: 0, competitorStores: 0, trendingItems: 0, durationMs, error: errMsg };
  }
}

// ── Individual Runners ──────────────────────────────────────

async function runShopping(jobId: string, config: PipelineJobConfig) {
  const categories = config.categories || ['trending gadgets', 'smart home', 'beauty tools', 'fitness accessories', 'pet supplies', 'kitchen gadgets'];
  let trackedProducts = 0;

  for (const cat of categories) {
    const results = await searchGoogleShopping(cat, { maxResults: 10 });
    for (const item of results) {
      try {
        const price = item.extracted_price || parseFloat((item.price || '0').replace(/[^0-9.]/g, '')) || 0;
        await prisma.trackedProduct.create({
          data: {
            title: item.title, price, sourceUrl: item.link, sourcePlatform: 'google_shopping',
            images: item.thumbnail ? [item.thumbnail] : [], category: cat,
            tags: [item.source || ''], engagementData: { rating: item.rating, reviews: item.reviews },
            pipelineJobId: jobId, trackedAt: new Date(),
          },
        });
        trackedProducts++;
      } catch { /* skip duplicates */ }
    }
  }
  return { trackedProducts, scrapedAds: 0, competitorStores: 0, trendingItems: 0 };
}

async function runTrends(jobId: string, config: PipelineJobConfig) {
  const keywords = config.keywords || ['dropshipping products', 'trending gadgets', 'smart home', 'beauty devices', 'fitness gear'];
  let trendingItems = 0;

  const trends = await fetchGoogleTrends(keywords);
  for (const t of trends) {
    try {
      await prisma.trendingItem.create({
        data: {
          keyword: t.keyword, platform: 'google', searchVolume: t.searchVolume,
          growthRate: t.growthRate, trendDirection: t.trendDirection,
          relatedQueries: t.relatedQueries, sourceData: t as unknown as Record<string, unknown>,
          pipelineJobId: jobId,
        },
      });
      trendingItems++;
    } catch { /* skip */ }
  }
  return { trackedProducts: 0, scrapedAds: 0, competitorStores: 0, trendingItems };
}

async function runAds(jobId: string, config: PipelineJobConfig) {
  const queries = config.keywords || ['trending products', 'smart gadgets'];
  let scrapedAds = 0;

  for (const q of queries) {
    const fbAds = await scrapeFacebookAdLibrary(q, 15).catch(() => []);
    for (const ad of fbAds) {
      try {
        await prisma.scrapedAd.create({
          data: {
            brandName: ad.brandName, headline: ad.headline, description: ad.description || '',
            platform: ad.platform, adType: ad.adType, thumbnailUrl: ad.thumbnailUrl,
            landingUrl: ad.landingUrl, productCategory: q,
            engagement: ad.estimatedReach ? { estimatedReach: ad.estimatedReach } : undefined,
            estimatedReach: ad.estimatedReach, pipelineJobId: jobId, scrapedAt: new Date(),
          },
        });
        scrapedAds++;
      } catch { /* skip */ }
    }

    const ttAds = await scrapeTikTokTrending(q, 10).catch(() => []);
    for (const ad of ttAds) {
      try {
        await prisma.scrapedAd.create({
          data: {
            brandName: ad.brandName, headline: ad.headline, description: ad.description || '',
            platform: 'tiktok', adType: 'video', landingUrl: ad.landingUrl,
            productCategory: q, pipelineJobId: jobId, scrapedAt: new Date(),
          },
        });
        scrapedAds++;
      } catch { /* skip */ }
    }
  }
  return { trackedProducts: 0, scrapedAds, competitorStores: 0, trendingItems: 0 };
}

async function runCompetitors(jobId: string, config: PipelineJobConfig) {
  const urls = config.competitorUrls || [];
  let competitorStores = 0;

  for (const url of urls) {
    try {
      const info = await detectStorePlatform(url);
      if (!info) continue;
      const products = await discoverShopifyStoreProducts(url, 20);
      await prisma.competitorStore.upsert({
        where: { url: info.url },
        create: {
          name: info.name, url: info.url, platform: info.platform,
          productCount: info.productCount, topProducts: products.slice(0, 10),
          techStack: { theme: info.themeName, apps: info.installedApps },
          lastScannedAt: new Date(), pipelineJobId: jobId,
        },
        update: {
          name: info.name, platform: info.platform, productCount: info.productCount,
          topProducts: products.slice(0, 10),
          techStack: { theme: info.themeName, apps: info.installedApps },
          lastScannedAt: new Date(), pipelineJobId: jobId,
        },
      });
      competitorStores++;
    } catch { /* skip */ }
  }
  return { trackedProducts: 0, scrapedAds: 0, competitorStores, trendingItems: 0 };
}

async function runAnalysis(jobId: string, _config: PipelineJobConfig) {
  if (!isGeminiConfigured()) {
    return { trackedProducts: 0, scrapedAds: 0, competitorStores: 0, trendingItems: 0 };
  }
  const unscored = await prisma.trackedProduct.findMany({ where: { aiScore: null }, take: 10, orderBy: { trackedAt: 'desc' } });
  let analyzed = 0;
  for (const p of unscored) {
    try {
      const analysis = await analyzeProduct({ title: p.title, price: p.price });
      await prisma.trackedProduct.update({
        where: { id: p.id },
        data: { aiScore: analysis.overallScore, trendScore: analysis.trendScore, profitMargin: analysis.profitScore },
      });
      analyzed++;
    } catch { /* skip */ }
  }
  return { trackedProducts: analyzed, scrapedAds: 0, competitorStores: 0, trendingItems: 0 };
}

async function runFullRefresh(jobId: string, config: PipelineJobConfig) {
  const [s, t, a] = await Promise.all([
    runShopping(jobId, config),
    runTrends(jobId, config),
    runAds(jobId, config),
  ]);
  const analysis = isGeminiConfigured() ? await runAnalysis(jobId, config) : { trackedProducts: 0, scrapedAds: 0, competitorStores: 0, trendingItems: 0 };
  return {
    trackedProducts: s.trackedProducts + analysis.trackedProducts,
    scrapedAds: a.scrapedAds,
    competitorStores: s.competitorStores,
    trendingItems: t.trendingItems,
  };
}

// ── Public Query Helpers ────────────────────────────────────

export async function getLatestTrackedProducts(limit = 20) {
  return prisma.trackedProduct.findMany({ orderBy: { trackedAt: 'desc' }, take: limit });
}

export async function getLatestScrapedAds(limit = 20) {
  return prisma.scrapedAd.findMany({ orderBy: { scrapedAt: 'desc' }, take: limit });
}

export async function getLatestTrendingItems(limit = 20) {
  return prisma.trendingItem.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}

export async function getCompetitorStores() {
  return prisma.competitorStore.findMany({ orderBy: { lastScannedAt: 'desc' } });
}

export async function getPipelineJobHistory(limit = 10) {
  return prisma.pipelineJob.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}
