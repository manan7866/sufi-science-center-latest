import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const numbers = req.nextUrl.searchParams.get('numbers');

  if (!numbers) {
    return NextResponse.json({ error: 'numbers param required.' }, { status: 400 });
  }

  const parsed = numbers.split(',').map(Number).filter((n) => n >= 1 && n <= 114);

  if (parsed.length === 0) {
    return NextResponse.json({ surahs: [] });
  }

  const surahs = await prisma.surahCommentary.findMany({
    where: { surahNumber: { in: parsed } },
    select: { surahNumber: true, arabicName: true, englishName: true, structuralAxis: true },
  });

  return NextResponse.json({ surahs });
}
