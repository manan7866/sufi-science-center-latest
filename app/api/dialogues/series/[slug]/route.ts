import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const series = await prisma.dialogue.findFirst({
      where: { slug, isPublished: true },
      include: {
        episodes: {
          orderBy: { episodeNumber: 'asc' },
        },
      },
    });

    if (!series) {
      return NextResponse.json({ error: 'Series not found' }, { status: 404 });
    }

    const mappedSeries = {
      id: series.id,
      slug: series.slug,
      title: series.title,
      subtitle: series.subtitle,
      description: series.description,
      type: series.type,
      host: series.host,
      difficulty_level: series.difficultyLevel,
      total_episodes: series.totalEpisodes,
      total_duration_minutes: series.totalDurationMinutes,
      participants: series.participants,
      published_at: series.publishedAt?.toISOString() || '',
      is_featured: series.isFeatured,
    };

    const mappedEpisodes = series.episodes.map((ep) => ({
      id: ep.id,
      series_id: ep.seriesId,
      episode_number: ep.episodeNumber,
      slug: ep.slug,
      title: ep.title,
      description: ep.description,
      transcript: ep.transcript,
      key_questions: ep.keyQuestions,
      key_insights: ep.keyInsights,
      participants: ep.participants,
      duration_minutes: ep.durationMinutes,
      video_url: ep.videoUrl,
      audio_url: ep.audioUrl,
      published_at: ep.publishedAt?.toISOString() || '',
    }));

    return NextResponse.json({ series: mappedSeries, episodes: mappedEpisodes });
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}
