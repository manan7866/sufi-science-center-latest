import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        submissionType: 'conference_workshop',
        status: { in: ['approved', 'scheduled'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    const items = submissions.map((sub) => {
      const data = (sub.submissionData || {}) as Record<string, any>;
      return {
        id: sub.id,
        title: data.programTitle || sub.title,
        organizerName: data.organizerName || sub.contactName,
        email: data.email || sub.contactEmail,
        programType: data.programType || '',
        description: data.description || sub.abstract,
        objectives: data.objectives || '',
        speakersFacilitators: data.speakersFacilitators || '',
        duration: data.duration || '',
        preferredDates: data.preferredDates || '',
        format: data.format || '',
        audience: data.audience || '',
        expectedParticipants: data.expectedParticipants || '',
        requirementsResources: data.requirementsResources || '',
        budgetSponsorship: data.budgetSponsorship || '',
        status: sub.status,
        submittedAt: sub.createdAt,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('[conference-work GET]', error);
    return NextResponse.json({ items: [] });
  }
}
