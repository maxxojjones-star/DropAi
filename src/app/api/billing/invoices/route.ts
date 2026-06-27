import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      include: { subscriptions: true },
    });

    if (!user || user.subscriptions.length === 0) {
      return NextResponse.json([]);
    }

    // This is a placeholder. In a real app, you'd fetch from Stripe using customer ID.
    const invoices = [
      { id: 'inv_1', amount: 29.00, status: 'paid', date: new Date().toISOString(), pdf: '#' },
    ];

    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
