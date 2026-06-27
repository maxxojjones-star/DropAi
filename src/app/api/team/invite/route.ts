import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { email, role, storeId } = body;

    if (!email || !role || !storeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if current user is owner of the store
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: (session.user as any).id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Unauthorized to invite members to this store' }, { status: 403 });
    }

    // Find user by email
    const invitedUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!invitedUser) {
      // In a real app, we would send an email invitation to sign up
      return NextResponse.json({ error: 'User with this email not found. Invitations for new users not implemented.' }, { status: 404 });
    }

    // Check if already a member
    const existingMember = await prisma.teamMember.findUnique({
      where: {
        storeId_userId: {
          storeId,
          userId: invitedUser.id,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json({ error: 'User is already a team member' }, { status: 400 });
    }

    const membership = await prisma.teamMember.create({
      data: {
        storeId,
        userId: invitedUser.id,
        role,
      },
    });

    return NextResponse.json(membership, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
