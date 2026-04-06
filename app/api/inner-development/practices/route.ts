import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }

    const practices = await prisma.practice.findMany({
      where,
      orderBy: [{ category: 'asc' }, { difficultyLevel: 'asc' }],
    });

    // Map Prisma camelCase to snake_case for frontend
    const mappedPractices = practices.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      difficulty_level: p.difficultyLevel,
      duration_minutes: p.durationMinutes,
      description: p.description,
      instructions: p.instructions,
      benefits: p.benefits,
      prerequisites: p.prerequisites,
      tradition_source: p.traditionSource,
      video_url: p.videoUrl,
      audio_url: p.audioUrl,
    }));

    return NextResponse.json({ practices: mappedPractices });
  } catch (error) {
    console.error('Error fetching practices:', error);
    return NextResponse.json({ error: 'Failed to fetch practices' }, { status: 500 });
  }
}
