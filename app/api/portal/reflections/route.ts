import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');
  if (!sessionToken) return NextResponse.json({ reflections: [] });

  const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
  if (!session) return NextResponse.json({ reflections: [] });

  const reflections = await prisma.reflectionEntry.findMany({
    where: { sessionToken },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ reflections });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionToken, surahNumber, reflectionText } = await req.json();
    if (!sessionToken || !surahNumber || !reflectionText) {
      return NextResponse.json({ error: 'sessionToken, surahNumber, and reflectionText required' }, { status: 400 });
    }

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const existing = await prisma.reflectionEntry.findFirst({
      where: { sessionToken, surahNumber: Number(surahNumber) },
    });

    let reflection;
    if (existing) {
      reflection = await prisma.reflectionEntry.update({
        where: { id: existing.id },
        data: { reflectionText, updatedAt: new Date() },
      });
    } else {
      reflection = await prisma.reflectionEntry.create({
        data: { sessionToken, surahNumber: Number(surahNumber), reflectionText },
      });
    }

    return NextResponse.json({ reflection });
  } catch {
    return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 });
  }
}
