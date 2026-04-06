import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const series = await prisma.dialogue.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: 'desc' }, { title: 'asc' }],
    });

    const mapped = series.map((s) => ({
      id: s.id,
      slug: s.slug || s.id,
      title: s.title,
      subtitle: s.subtitle,
      description: s.description || '',
      featured: s.isFeatured || false,
      difficulty_level: s.difficultyLevel || null,
      total_episodes: s.totalEpisodes || 0,
      total_duration_minutes: s.totalDurationMinutes || 0,
      participants: s.participants || [],
      published_at: s.publishedAt?.toISOString() || '',
    }));

    return NextResponse.json({ series: mapped });
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}
