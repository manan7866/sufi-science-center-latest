import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const interviews = await prisma.inspiringInterview.findMany({
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    });

    const mapped = interviews.map((i) => ({
      id: i.id,
      slug: i.slug,
      title: i.title,
      description: i.description,
      transcript: i.transcript,
      interviewee: i.intervieweeName,
      affiliation: i.intervieweeAffiliation,
      bio: i.intervieweeBio,
      video_url: i.videoUrl,
      audio_url: i.audioUrl,
      key_clips: i.keyClips,
      themes: i.themes,
      related_saints: i.relatedSaints,
      published_at: i.publishedAt?.toISOString() || '',
      featured: i.featured,
    }));

    return NextResponse.json({ interviews: mapped });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json({ error: 'Failed to fetch interviews' }, { status: 500 });
  }
}
