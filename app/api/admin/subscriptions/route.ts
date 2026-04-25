import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const status = req.nextUrl.searchParams.get('status');
  const search = req.nextUrl.searchParams.get('search');

  const where: Record<string, unknown> = {};
  if (status && status !== 'all') where.status = status;
  if (search) {
    where.OR = [
      { donor: { fullName: { contains: search, mode: 'insensitive' } } },
      { donor: { email: { contains: search, mode: 'insensitive' } } },
      { stripeSubscriptionId: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const subscriptions = await prisma.donationSubscription.findMany({
      where,
      include: { donor: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ subscriptions });
  } catch (err) {
    console.error('[admin/subscriptions]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}