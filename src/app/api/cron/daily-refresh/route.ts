// ============================================================
// Orbit Cron — Daily Data Pipeline Refresh
// GET /api/cron/daily-refresh — full pipeline refresh
// Vercel Cron: 0 6 * * * (daily at 6 AM UTC)
// ============================================================

import { NextResponse } from 'next/server';
import { runPipeline, getPipelineStatus } from '@/services/data-pipeline/pipeline';

export async function GET(req: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.get('authorization');
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Cron] Starting daily pipeline refresh');
    console.log('[Cron] Services:', JSON.stringify(getPipelineStatus()));

    const result = await runPipeline('full_refresh', {
      categories: [
        'trending gadgets 2025', 'smart home devices', 'beauty tools trending',
        'fitness accessories', 'pet supplies trending', 'kitchen gadgets 2025',
        'phone accessories trending', 'car accessories trending',
        'baby products trending', 'home office gadgets',
      ],
      keywords: [
        'dropshipping products trending', 'winning products 2025',
        'tiktok trending products', 'best selling online products',
        'hot products this month',
      ],
      platforms: ['facebook', 'instagram'],
      maxResults: 50,
    });

    console.log('[Cron] Refresh complete:', JSON.stringify(result));
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('[Cron] Refresh failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export { GET as POST };
