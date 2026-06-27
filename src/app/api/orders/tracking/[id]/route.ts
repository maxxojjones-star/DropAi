import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.store.userId !== (session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Mock tracking data
    const trackingData = {
      orderId: id,
      trackingNumber: 'TRK' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      carrier: 'FEDEX',
      status: 'In Transit',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      events: [
        { status: 'Shipped', time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), location: 'Warehouse A' },
        { status: 'Arrived at Sorting Hub', time: new Date().toISOString(), location: 'City Center' },
      ],
    };

    return NextResponse.json(trackingData);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
