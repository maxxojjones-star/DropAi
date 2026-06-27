import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get('storeId');

    if (!storeId) {
      return NextResponse.json({ error: 'storeId is required' }, { status: 400 });
    }

    // Ensure user owns the store
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: (session.user as any).id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found or unauthorized' }, { status: 404 });
    }

    // Mock segments for now, or calculate them
    const segments = [
      { id: '1', name: 'Big Spenders', count: 12, criteria: 'Total spend > $500' },
      { id: '2', name: 'Repeat Customers', count: 25, criteria: 'Orders > 2' },
      { id: '3', name: 'New Customers', count: 45, criteria: 'Joined in last 30 days' },
      { id: '4', name: 'At Risk', count: 8, criteria: 'No order in 60 days' },
    ];

    return NextResponse.json(segments);
  } catch (error) {
    console.error('Segments GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
