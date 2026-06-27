import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activity = [
      { id: 1, type: 'SALE', message: 'New sale: Wireless Headphones', amount: 59.99, time: '2 mins ago' },
      { id: 2, type: 'PRODUCT', message: 'Product imported: Smart Watch Pro', time: '15 mins ago' },
      { id: 3, type: 'CUSTOMER', message: 'New customer signed up: John Doe', time: '1 hour ago' },
      { id: 4, type: 'SALE', message: 'New sale: LED Strip Lights', amount: 24.50, time: '3 hours ago' },
    ];

    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
