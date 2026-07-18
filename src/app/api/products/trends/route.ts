// ============================================================
// Orbit — Products Trends API (Live Pipeline Data)
// GET /api/products/trends — pipeline data with sample fallback
// ============================================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getLatestTrendingItems } from '@/services/data-pipeline/pipeline';
import { sampleTrends } from '@/data/sampleTrends';

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const pipelineTrends = await getLatestTrendingItems(50);

    if (pipelineTrends.length > 0) {
      return NextResponse.json(pipelineTrends.map(item => ({
        id: item.id, name: item.keyword,
        growth: item.growthRate ? Math.round(item.growthRate) : 0,
        volume: (item.searchVolume || 0) > 500000 ? 'Very High' : (item.searchVolume || 0) > 200000 ? 'High' : 'Medium',
        category: item.category || 'Trending', direction: item.trendDirection,
        platform: item.platform, relatedQueries: item.relatedQueries,
        lastUpdated: item.updatedAt,
      })));
    }

    // Fallback to sample data
    return NextResponse.json(sampleTrends.slice(0, 6).map((t, i) => ({
      id: `sample-${i}`, name: t.query, growth: Math.round(t.velocity * 10),
      volume: t.volume > 500000 ? 'Very High' : t.volume > 200000 ? 'High' : 'Medium',
      category: 'Trending', direction: t.direction, platform: t.platform,
      relatedQueries: t.relatedQueries, lastUpdated: t.timestamp,
    })));
  } catch (error) {
    console.error('[Trends API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
