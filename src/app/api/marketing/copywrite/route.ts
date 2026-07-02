import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { generateAdCopy, generateProductCopy } from '@/services/ai/copywriting';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content, type, tone } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }

    const copy = await generateAdCopy(content, tone || 'professional', type || 'general');

    return NextResponse.json(copy);
  } catch (error) {
    console.error('Copywrite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
