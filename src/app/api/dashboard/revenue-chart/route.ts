import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = [
      { date: '2026-06-18', revenue: 400, profit: 120 },
      { date: '2026-06-19', revenue: 600, profit: 180 },
      { date: '2026-06-20', revenue: 800, profit: 240 },
      { date: '2026-06-21', revenue: 700, profit: 210 },
      { date: '2026-06-22', revenue: 900, profit: 270 },
      { date: '2026-06-23', revenue: 1200, profit: 360 },
      { date: '2026-06-24', revenue: 1500, profit: 450 },
    ];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
