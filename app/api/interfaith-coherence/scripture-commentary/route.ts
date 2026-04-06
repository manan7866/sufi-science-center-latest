import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const surahs = await prisma.surahCommentary.findMany({
      orderBy: { surahNumber: 'asc' },
    });

    const mapped = surahs.map((s) => ({
      id: s.id,
      surah_number: s.surahNumber,
      arabic_name: s.arabicName,
      english_name: s.englishName,
      revelation_type: s.revelationType,
      core_theme: s.coreTheme,
      structural_axis: s.structuralAxis,
      sufi_reflection: s.sufiReflection,
      interfaith_resonance: s.interfaithResonance,
      has_interfaith_note: s.hasInterfaithNote,
    }));

    return NextResponse.json({ surahs: mapped });
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return NextResponse.json({ error: 'Failed to fetch surah commentary' }, { status: 500 });
  }
}
