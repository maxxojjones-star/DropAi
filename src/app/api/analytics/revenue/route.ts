import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = {
      totalRevenue: 45230.50,
      averageOrderValue: 55.20,
      revenueByDay: [
        { date: '2026-06-18', amount: 4500.00 },
        { date: '2026-06-19', amount: 5200.00 },
        { date: '2026-06-20', amount: 4800.00 },
        { date: '2026-06-21', amount: 6100.00 },
        { date: '2026-06-22', amount: 5900.00 },
        { date: '2026-06-23', amount: 8200.00 },
        { date: '2026-06-24', amount: 10530.50 },
      ],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
