// ============================================================
// Orbit Data Pipeline — SerpAPI Client
// Google Shopping, Trends, Search — real-time product/trend data
// ============================================================

import type { SerpApiShoppingResult, SerpApiTrendsResult } from './types';

const SERPAPI_BASE = 'https://serpapi.com/search';

function getApiKey(): string | null {
  return process.env.SERPAPI_KEY || process.env.SERPAPI_API_KEY || null;
}

export function isSerpApiConfigured(): boolean {
  const key = getApiKey();
  return key !== null && key.length > 0;
}

// ── Google Shopping ────────────────────────────────────────

export async function searchGoogleShopping(
  query: string,
  options?: { country?: string; currency?: string; maxResults?: number }
): Promise<SerpApiShoppingResult[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('[SerpAPI] Key not configured — returning empty results');
    return [];
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      engine: 'google_shopping',
      q: query,
      gl: options?.country || 'us',
      currency: options?.currency || 'USD',
      num: String(options?.maxResults || 20),
    });

    const res = await fetch(`${SERPAPI_BASE}?${params}`);
    if (!res.ok) throw new Error(`SerpAPI error: ${res.status}`);
    const data = await res.json();
    if (data.error) { console.error('[SerpAPI]', data.error); return []; }

    return (data.shopping_results || []).map((item: Record<string, unknown>, i: number) => ({
      position: i + 1,
      title: String(item.title || ''),
      link: String(item.link || ''),
      source: String(item.source || ''),
      price: String(item.price || ''),
      extracted_price: item.extracted_price ? Number(item.extracted_price) : undefined,
      thumbnail: item.thumbnail ? String(item.thumbnail) : undefined,
      rating: item.rating ? Number(item.rating) : undefined,
      reviews: item.reviews ? Number(item.reviews) : undefined,
      delivery: item.delivery ? String(item.delivery) : undefined,
    }));
  } catch (err) {
    console.error('[SerpAPI] Shopping search failed:', err);
    return [];
  }
}

// ── Google Trends ──────────────────────────────────────────

export async function fetchGoogleTrends(
  keywords: string[],
  options?: { region?: string; timeframe?: string }
): Promise<SerpApiTrendsResult[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const results: SerpApiTrendsResult[] = [];
  for (const keyword of keywords) {
    try {
      const params = new URLSearchParams({
        api_key: apiKey,
        engine: 'google_trends',
        q: keyword,
        geo: options?.region || 'US',
        date: options?.timeframe || 'today 3-m',
        data_type: 'TIMESERIES',
      });

      const res = await fetch(`${SERPAPI_BASE}?${params}`);
      if (!res.ok) continue;
      const data = await res.json();

      const timeline = data.interest_over_time?.timeline_data || [];
      const relatedQueries = (data.related_queries?.rising || []).map(
        (q: Record<string, unknown>) => String(q.query || '')
      );

      const values = timeline.map(
        (p: Record<string, unknown>) => p.values?.[0]?.extracted_value || p.values?.[0]?.value || 0
      );
      const recent = values.slice(-4);
      const older = values.slice(-8, -4);
      const recentAvg = recent.length ? recent.reduce((a: number, b: number) => a + b, 0) / recent.length : 0;
      const olderAvg = older.length ? older.reduce((a: number, b: number) => a + b, 0) / older.length : recentAvg;
      const growth = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;

      results.push({
        keyword,
        searchVolume: Math.round(recentAvg * 100),
        growthRate: Math.round(growth * 10) / 10,
        trendDirection: growth > 10 ? 'rising' : growth < -10 ? 'falling' : 'stable',
        relatedQueries: relatedQueries.slice(0, 10),
        regionalInterest: {},
        timelineData: timeline.map((p: Record<string, unknown>) => ({
          date: String(p.date || ''),
          value: p.values?.[0]?.extracted_value || p.values?.[0]?.value || 0,
        })),
      });
      await new Promise(r => setTimeout(r, 200)); // rate limit
    } catch (err) {
      console.error(`[SerpAPI] Trends failed for "${keyword}":`, err);
    }
  }
  return results;
}

// ── Google Search (Competitor Intel) ────────────────────────

export async function searchGoogle(
  query: string,
  options?: { country?: string; maxResults?: number }
): Promise<{ position: number; title: string; link: string; snippet: string; source?: string; date?: string }[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      engine: 'google',
      q: query,
      gl: options?.country || 'us',
      num: String(options?.maxResults || 10),
    });
    const res = await fetch(`${SERPAPI_BASE}?${params}`);
    if (!res.ok) return [];
    const data = await res.json();

    return (data.organic_results || []).map((item: Record<string, unknown>, i: number) => ({
      position: i + 1,
      title: String(item.title || ''),
      link: String(item.link || ''),
      snippet: String(item.snippet || ''),
      source: item.source ? String(item.source) : undefined,
      date: item.date ? String(item.date) : undefined,
    }));
  } catch (err) {
    console.error('[SerpAPI] Search failed:', err);
    return [];
  }
}

// ── Batch Discovery ────────────────────────────────────────

export async function discoverTrendingProducts(
  categories: string[]
): Promise<SerpApiShoppingResult[]> {
  const all: SerpApiShoppingResult[] = [];
  const seen = new Set<string>();

  for (const query of categories) {
    const results = await searchGoogleShopping(query, { maxResults: 10 });
    for (const item of results) {
      if (!seen.has(item.link)) {
        seen.add(item.link);
        all.push(item);
      }
    }
    await new Promise(r => setTimeout(r, 300));
  }
  return all;
}
