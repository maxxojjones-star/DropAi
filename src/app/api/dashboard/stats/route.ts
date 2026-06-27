import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real scenario, we'd fetch actual data from the database
    // For now, returning realistic mock data based on the business plan
    const stats = {
      revenue: 12540.5,
      profit: 4230.2,
      orders: 145,
      visitors: 12050,
      conversionRate: 1.2,
      changes: {
        revenue: 12.5,
        profit: 8.2,
        orders: 5.4,
        visitors: -2.1,
        conversionRate: 0.3,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
