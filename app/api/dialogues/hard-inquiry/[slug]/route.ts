import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const session = await prisma.hardTalkSession.findFirst({
      where: { slug },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const mappedSession = {
      id: session.id,
      slug: session.slug,
      title: session.title,
      description: session.description,
      transcript: session.transcript,
      participants: session.participants,
      video_url: session.videoUrl,
      audio_url: session.audioUrl,
      controversial_points: session.controversialPoints,
      citations: session.citations,
      themes: session.themes,
      published_at: session.publishedAt?.toISOString() || '',
      featured: session.featured,
    };

    return NextResponse.json({ session: mappedSession });
  } catch (error) {
    console.error('Error fetching hard inquiry session:', error);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}
