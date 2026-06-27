import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // In a real app, this would query an AI service or a pre-computed table of viral products
    const viralProducts = await prisma.product.findMany({
      where: {
        isViral: true,
      },
      take: 10,
      orderBy: {
        aiScore: 'desc',
      },
    });

    return NextResponse.json(viralProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
