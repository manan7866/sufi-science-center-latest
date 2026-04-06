import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');
  if (!sessionToken) return NextResponse.json({ events: [] });

  const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
  if (!session) return NextResponse.json({ events: [] });

  const events = await prisma.activityEvent.findMany({
    where: { sessionId: session.id },
    orderBy: { occurredAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionToken, eventType, eventLabel } = await req.json();
    if (!sessionToken || !eventType || !eventLabel) {
      return NextResponse.json({ error: 'sessionToken, eventType, and eventLabel required' }, { status: 400 });
    }

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const event = await prisma.activityEvent.create({
      data: { sessionId: session.id, eventType, eventLabel },
    });

    await prisma.portalSession.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
