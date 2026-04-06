import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_TABLES = new Set(['media_tracks', 'sacred_kalam']);

const ipCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const body = await req.json();
    const { table, id } = body;

    if (!ALLOWED_TABLES.has(table)) {
      return NextResponse.json({ error: 'Invalid table.' }, { status: 400 });
    }

    if (typeof id !== 'string' || !UUID_RE.test(id)) {
      return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
    }

    if (table === 'media_tracks') {
      await prisma.mediaTrack.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    } else {
      await prisma.sacredKalam.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
