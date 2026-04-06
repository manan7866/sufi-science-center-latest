import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');
  if (!sessionToken) return NextResponse.json({ views: [] });

  const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
  if (!session) return NextResponse.json({ views: [] });

  const views = await prisma.surahView.findMany({
    where: { sessionId: session.id },
    orderBy: { viewedAt: 'desc' },
  });

  return NextResponse.json({ views });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionToken, surahNumber } = await req.json();
    if (!sessionToken || !surahNumber) return NextResponse.json({ error: 'sessionToken and surahNumber required' }, { status: 400 });

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const view = await prisma.surahView.create({
      data: { sessionId: session.id, surahNumber: Number(surahNumber) },
    });

    return NextResponse.json({ view });
  } catch {
    return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
  }
}
