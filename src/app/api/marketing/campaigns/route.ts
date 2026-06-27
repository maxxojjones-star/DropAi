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

    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: (session.user as any).id,
      },
    });

    if (!store) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const campaigns = await prisma.campaign.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, type, storeId, budget, config } = body;

    if (!name || !type || !storeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: (session.user as any).id,
      },
    });

    if (!store) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const campaign = await prisma.campaign.create({
      data: {
        name,
        type,
        storeId,
        budget: budget ? parseFloat(budget) : null,
        config,
        status: 'DRAFT',
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
