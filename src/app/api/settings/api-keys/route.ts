import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Mock API keys
    return NextResponse.json([
      { id: '1', name: 'Main API Key', key: 'pk_live_********************', createdAt: new Date().toISOString() },
    ]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name } = await req.json();
    const newKey = `pk_live_${crypto.randomBytes(16).toString('hex')}`;

    return NextResponse.json({
      id: Math.random().toString(36).substr(2, 9),
      name,
      key: newKey,
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
