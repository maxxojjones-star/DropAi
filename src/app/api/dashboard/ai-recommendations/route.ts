import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recommendations = [
      {
        id: 1,
        title: 'Trending Product Alert',
        description: 'AI detected a 45% surge in interest for "Portable Neck Fans". Consider adding it to your store.',
        action: 'View Product',
        type: 'TREND',
      },
      {
        id: 2,
        title: 'Price Optimization',
        description: 'Your price for "Wireless Earbuds" is 15% higher than competitors. Adjusting it could increase sales by 20%.',
        action: 'Adjust Price',
        type: 'PROFIT',
      },
      {
        id: 3,
        title: 'Inventory Warning',
        description: 'Stock for "LED Desk Lamp" is running low. Reorder now to avoid missed sales.',
        action: 'Reorder',
        type: 'INVENTORY',
      },
    ];

    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
