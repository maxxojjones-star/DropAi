// ============================================================
// Orbit Data Pipeline — Unified API Endpoint
// GET  /api/data-pipeline?action=research|trends|ads|competitors|status|history
// POST /api/data-pipeline  (body: { action, config }) — trigger pipeline jobs
// ============================================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  runPipeline,
  getPipelineStatus,
  getLatestTrackedProducts,
  getLatestScrapedAds,
  getLatestTrendingItems,
  getCompetitorStores,
  getPipelineJobHistory,
} from '@/services/data-pipeline/pipeline';
import { searchGoogleShopping, fetchGoogleTrends } from '@/services/data-pipeline/serpapi-client';
import { analyzeProduct, analyzeTrends } from '@/services/data-pipeline/trend-analyzer';

// ── GET: Retrieve pipeline data ─────────────────────────────

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'status';
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');

    switch (action) {
      case 'status':
        return NextResponse.json({
          services: getPipelineStatus(),
          counts: {
            trackedProducts: (await getLatestTrackedProducts(1)).length,
            scrapedAds: (await getLatestScrapedAds(1)).length,
            trendingItems: (await getLatestTrendingItems(1)).length,
            competitorStores: (await getCompetitorStores()).length,
          },
        });

      case 'research': {
        let products = await getLatestTrackedProducts(limit);
        if (category) products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        return NextResponse.json(products);
      }

      case 'trends': {
        let items = await getLatestTrendingItems(limit);
        const dir = searchParams.get('direction');
        if (dir) items = items.filter(i => i.trendDirection === dir);
        return NextResponse.json(items);
      }

      case 'ads': {
        let ads = await getLatestScrapedAds(limit);
        if (platform) ads = ads.filter(a => a.platform === platform);
        if (category) ads = ads.filter(a => a.productCategory?.toLowerCase() === category.toLowerCase());
        return NextResponse.json(ads);
      }

      case 'competitors':
        return NextResponse.json(await getCompetitorStores());

      case 'history':
        return NextResponse.json(await getPipelineJobHistory(limit));

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[Data Pipeline API] GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST: Trigger pipeline jobs ─────────────────────────────

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'status';

    switch (action) {
      case 'run-shopping':
        return NextResponse.json(
          await runPipeline('serpapi_shopping', { categories: body.categories })
        );

      case 'run-trends':
        return NextResponse.json(
          await runPipeline('serpapi_trends', { keywords: body.keywords })
        );

      case 'run-ads':
        return NextResponse.json(
          await runPipeline('scrape_ads', { keywords: body.keywords, platforms: body.platforms })
        );

      case 'run-competitors':
        if (!body.urls?.length) {
          return NextResponse.json({ error: 'urls required' }, { status: 400 });
        }
        return NextResponse.json(
          await runPipeline('scrape_competitors', { competitorUrls: body.urls })
        );

      case 'run-analysis':
        return NextResponse.json(await runPipeline('gemini_analysis', {}));

      case 'run-full-refresh':
        return NextResponse.json(await runPipeline('full_refresh', {
          categories: body.categories,
          keywords: body.keywords,
          platforms: body.platforms,
        }));

      case 'search-shopping': {
        if (!body.query) return NextResponse.json({ error: 'query required' }, { status: 400 });
        return NextResponse.json(await searchGoogleShopping(body.query, { maxResults: body.maxResults || 10 }));
      }

      case 'fetch-trends': {
        if (!body.keywords?.length) return NextResponse.json({ error: 'keywords required' }, { status: 400 });
        return NextResponse.json(await fetchGoogleTrends(body.keywords));
      }

      case 'analyze-product': {
        if (!body.title) return NextResponse.json({ error: 'title required' }, { status: 400 });
        return NextResponse.json(await analyzeProduct({ title: body.title, price: body.price || 0 }));
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[Data Pipeline API] POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
