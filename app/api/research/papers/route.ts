import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        submissionType: 'research_paper',
        status: 'published',
      },
      orderBy: { createdAt: 'desc' },
    });

    const papers = submissions.map((sub) => {
      const data = (sub.submissionData || {}) as Record<string, any>;
      const authors = data.authorName ? [data.authorName] : [sub.contactName];
      if (data.coAuthors) {
        data.coAuthors.split(',').map((c: string) => c.trim()).filter(Boolean).forEach((c: string) => {
          if (!authors.includes(c)) authors.push(c);
        });
      }
      return {
        id: sub.id,
        title: data.paperTitle || sub.title,
        authors,
        journal: data.discipline || 'SSC Research',
        year: sub.createdAt ? new Date(sub.createdAt).getFullYear().toString() : '2026',
        volume: '',
        pages: '',
        abstract: sub.abstract,
        themes: data.keywords ? data.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
        status: 'Published',
        fileUrl: data.fileUrl || '',
        discipline: data.discipline || '',
        citationStyle: data.citationStyle || '',
        orcidLink: data.orcidLink || '',
        suggestedModule: data.suggestedModule || '',
      };
    });

    return NextResponse.json({ papers });
  } catch (error) {
    console.error('[research/papers GET]', error);
    return NextResponse.json({ papers: [] });
  }
}
