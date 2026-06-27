import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, theme, niche } = body;

    if (!name) {
      return NextResponse.json({ error: 'Store name is required' }, { status: 400 });
    }

    // One-click creation logic
    const store = await prisma.store.create({
      data: {
        name,
        url: `https://${name.toLowerCase().replace(/\s+/g, '-')}.dropai.shop`,
        userId: (session.user as any).id,
      },
    });

    // Mocking the automated setup of theme and initial products/settings
    console.log(`Setting up store ${store.id} with theme ${theme} and niche ${niche}`);

    return NextResponse.json({
      message: 'Store created and initialized successfully',
      store,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
