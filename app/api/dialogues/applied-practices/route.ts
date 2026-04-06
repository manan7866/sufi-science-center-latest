import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const practices = await prisma.practiceProfile.findMany({
      orderBy: [{ featured: 'desc' }, { title: 'asc' }],
    });

    const mapped = practices.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      methodology: p.methodology,
      steps: p.steps,
      practice_type: p.practiceType,
      duration_minutes: p.durationMinutes,
      difficulty_level: p.difficultyLevel,
      related_saints: p.relatedSaints,
      themes: p.themes,
      tags: p.tags,
      featured: p.featured,
    }));

    return NextResponse.json({ practices: mapped });
  } catch (error) {
    console.error('Error fetching practices:', error);
    return NextResponse.json({ error: 'Failed to fetch practices' }, { status: 500 });
  }
}
