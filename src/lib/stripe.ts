import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-preview', // Using latest available or specific
});

export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    stores: 1,
    ordersPerMonth: 50,
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    stores: 3,
    ordersPerMonth: -1, // Unlimited for paid plans usually or high cap
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 79,
    stores: 10,
  },
  SCALE: {
    id: 'scale',
    name: 'Scale',
    price: 199,
    stores: -1,
  },
};

export const createCheckoutSession = async (userId: string, planId: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `DropAI ${planId} Plan`,
          },
          unit_amount: PLANS[planId as keyof typeof PLANS].price * 100,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      userId,
      planId,
    },
  });

  return session;
};

export default stripe;
