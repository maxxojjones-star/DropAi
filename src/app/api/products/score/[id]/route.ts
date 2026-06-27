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

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // In a real app, this would trigger an AI scoring job or return cached score
    // Mocking the scoring result
    const scoreData = {
      productId: id,
      aiScore: product.aiScore || 85.5,
      breakdown: {
        demand: 90,
        competition: 75,
        profitMargin: 88,
        trendFactor: 82,
      },
      recommendation: 'Highly recommended for scaling.',
    };

    return NextResponse.json(scoreData);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
