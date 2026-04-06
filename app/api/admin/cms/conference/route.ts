import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

function auth(req: NextRequest) {
  return getAdminTokenFromRequest(req);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const search = req.nextUrl.searchParams.get('search') ?? '';
  const status = req.nextUrl.searchParams.get('status') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where: Record<string, unknown> = {};
  if (search) where.OR = [
    { title: { contains: search, mode: 'insensitive' } },
    { presenterName: { contains: search, mode: 'insensitive' } },
    { presenterEmail: { contains: search, mode: 'insensitive' } },
  ];
  if (status && status !== 'all') where.status = status;

  const [items, total] = await Promise.all([
    prisma.conferenceSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.conferenceSubmission.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id, status, reviewNotes } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const item = await prisma.conferenceSubmission.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(reviewNotes !== undefined && { reviewNotes }),
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/conference PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
