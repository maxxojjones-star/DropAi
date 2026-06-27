import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: (session.user as any).id,
        status: 'active',
      },
    });

    if (!subscription || !subscription.stripeId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Cancel in Stripe
    await stripe.subscriptions.update(subscription.stripeId, {
      cancel_at_period_end: true,
    });

    // Update in DB
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'canceled' },
    });

    return NextResponse.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
