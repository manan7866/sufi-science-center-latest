import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const submissions = await prisma.wazifaSubmission.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
    });

    const frameworks = submissions.map((s) => ({
      id: s.id,
      title: s.title,
      arabicName: '',
      category: s.category,
      duration: '',
      level: '',
      description: s.description.length > 150 ? s.description.slice(0, 150) + '...' : s.description,
      longDescription: s.description,
      components: s.components,
      ethicalFoundations: s.ethicalFoundations,
      outcomes: s.outcomes,
    }));

    return NextResponse.json({ frameworks });
  } catch (error) {
    console.error('[wazeefia GET]', error);
    return NextResponse.json({ frameworks: [] });
  }
}
