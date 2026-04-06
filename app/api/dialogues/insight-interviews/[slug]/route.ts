import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const interview = await prisma.inspiringInterview.findFirst({
      where: { slug },
    });

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    const mapped = {
      id: interview.id,
      slug: interview.slug,
      title: interview.title,
      description: interview.description,
      transcript: interview.transcript,
      interviewee: interview.intervieweeName,
      affiliation: interview.intervieweeAffiliation,
      bio: interview.intervieweeBio,
      video_url: interview.videoUrl,
      audio_url: interview.audioUrl,
      key_clips: interview.keyClips,
      themes: interview.themes,
      related_saints: interview.relatedSaints,
      published_at: interview.publishedAt?.toISOString() || '',
      featured: interview.featured,
    };

    return NextResponse.json({ interview: mapped });
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json({ error: 'Failed to fetch interview' }, { status: 500 });
  }
}
