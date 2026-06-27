import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { url, storeId } = await req.json();

    if (!url || !storeId) {
      return NextResponse.json({ error: 'url and storeId are required' }, { status: 400 });
    }

    // Ensure user owns the store
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: (session.user as any).id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found or unauthorized' }, { status: 404 });
    }

    // Mocking an import process
    // In a real app, this would scrape the URL or use an API to fetch product details
    const importedProduct = await prisma.product.create({
      data: {
        name: 'Imported Product from ' + new URL(url).hostname,
        description: 'Auto-imported description from ' + url,
        price: 49.99,
        images: ['https://via.placeholder.com/600'],
        category: 'Imported',
        storeId,
        aiScore: 75.0,
      },
    });

    return NextResponse.json({
      message: 'Product imported successfully',
      product: importedProduct,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
