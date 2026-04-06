import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '0');
  const search = searchParams.get('search') ?? '';
  const PAGE_SIZE = 25;

  const where = search
    ? {
        OR: [
          { displayName: { contains: search, mode: 'insensitive' as const } },
          { profile: { email: { contains: search, mode: 'insensitive' as const } } },
        ],
      }
    : {};

  const [portalSessions, total] = await Promise.all([
    prisma.portalSession.findMany({
      where,
      include: { profile: true },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.portalSession.count({ where }),
  ]);

  const users = portalSessions.map((s: (typeof portalSessions)[number]) => ({
    id: s.id,
    sessionToken: s.sessionToken,
    displayName: s.displayName ?? s.profile?.displayName ?? 'Anonymous',
    email: s.profile?.email ?? '',
    createdAt: s.createdAt,
    lastActivityAt: s.lastActivityAt,
  }));

  return NextResponse.json({ users, total, page, pageSize: PAGE_SIZE });
}
