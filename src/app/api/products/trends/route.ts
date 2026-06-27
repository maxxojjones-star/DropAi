import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Mock trend data
    const trends = [
      { id: 1, name: 'Portable Neck Fan', growth: 125, volume: 'High', category: 'Gadgets' },
      { id: 2, name: 'LED Strip Lights', growth: 80, volume: 'Very High', category: 'Home Decor' },
      { id: 3, name: 'Muscle Massage Gun', growth: 60, volume: 'Medium', category: 'Fitness' },
      { id: 4, name: 'Reusable Coffee Pods', growth: 45, volume: 'Medium', category: 'Kitchen' },
    ];

    return NextResponse.json(trends);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
