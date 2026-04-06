import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ number: string }> }) {
  try {
    const { number } = await params;
    const surahNumber = parseInt(number);

    const surah = await prisma.surahCommentary.findUnique({
      where: { surahNumber },
    });

    if (!surah) {
      return NextResponse.json({ error: 'Surah not found' }, { status: 404 });
    }

    const mapped = {
      id: surah.id,
      surah_number: surah.surahNumber,
      arabic_name: surah.arabicName,
      english_name: surah.englishName,
      revelation_type: surah.revelationType,
      core_theme: surah.coreTheme,
      structural_axis: surah.structuralAxis,
      sufi_reflection: surah.sufiReflection,
      interfaith_resonance: surah.interfaithResonance,
      has_interfaith_note: surah.hasInterfaithNote,
    };

    return NextResponse.json({ surah: mapped });
  } catch (error) {
    console.error('Error fetching surah:', error);
    return NextResponse.json({ error: 'Failed to fetch surah commentary' }, { status: 500 });
  }
}
