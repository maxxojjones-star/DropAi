// ============================================================
// Orbit — Viral Products API (Pipeline + Prisma)
// GET /api/products/viral — pipeline data → Prisma fallback
// ============================================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getLatestTrackedProducts } from '@/services/data-pipeline/pipeline';

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Try pipeline data first — high-scored tracked products
    const pipelineProducts = await getLatestTrackedProducts(20);
    const highScore = pipelineProducts
      .filter(p => (p.aiScore || 0) >= 70 || (p.trendScore || 0) >= 75)
      .slice(0, 10);

    if (highScore.length > 0) {
      return NextResponse.json(highScore.map(p => ({
        id: p.id, name: p.title, price: p.price, images: p.images,
        category: p.category, aiScore: p.aiScore, trendScore: p.trendScore,
        profitMargin: p.profitMargin, sourcePlatform: p.sourcePlatform,
        sourceUrl: p.sourceUrl, trackedAt: p.trackedAt,
      })));
    }

    // Fallback: Prisma isViral products
    const viral = await prisma.product.findMany({ where: { isViral: true }, take: 10, orderBy: { aiScore: 'desc' } });
    if (viral.length > 0) return NextResponse.json(viral);

    // Ultimate fallback
    return NextResponse.json(await prisma.product.findMany({ take: 10, orderBy: { aiScore: 'desc' } }));
  } catch (error) {
    console.error('[Viral API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
