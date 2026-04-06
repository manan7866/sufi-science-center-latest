import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sessions = await prisma.hardTalkSession.findMany({
      where: { publishedAt: { lte: new Date() } },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    });

    const mapped = sessions.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      description: s.description,
      transcript: s.transcript,
      participants: s.participants,
      video_url: s.videoUrl,
      audio_url: s.audioUrl,
      controversial_points: s.controversialPoints,
      citations: s.citations,
      themes: s.themes,
      published_at: s.publishedAt?.toISOString() || '',
      featured: s.featured,
    }));

    return NextResponse.json({ sessions: mapped });
  } catch (error) {
    console.error('Error fetching hard inquiry sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
