import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { generateImage } from '@/services/ai/imageGeneration';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { prompt, style, size } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }

    const imageResult = await generateImage(prompt, { style, size });

    return NextResponse.json(imageResult);
  } catch (error) {
    console.error('Generate Image error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
