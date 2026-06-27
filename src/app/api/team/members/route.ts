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

    // Check if user is a member of the team and has access
    const membership = await prisma.teamMember.findFirst({
      where: {
        storeId,
        userId: (session.user as any).id,
      },
    });

    // Also check if user is the owner of the store
    const store = await prisma.store.findFirst({
      where: { id: storeId, userId: (session.user as any).id }
    });

    if (!membership && !store) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const members = await prisma.teamMember.findMany({
      where: { storeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
