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
      { donorName: { contains: search, mode: 'insensitive' } },
      { donorEmail: { contains: search, mode: 'insensitive' } },
      { transactionId: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ donations });
  } catch {
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
