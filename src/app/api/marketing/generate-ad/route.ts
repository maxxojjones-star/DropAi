import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { generateAdCopy } from '@/services/ai/copywriting';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productDescription, platform, tone } = await req.json();

    if (!productDescription) {
      return NextResponse.json({ error: 'productDescription is required' }, { status: 400 });
    }

    const adCopy = await generateAdCopy(productDescription, { platform, tone });

    return NextResponse.json(adCopy);
  } catch (error) {
    console.error('Generate Ad error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
