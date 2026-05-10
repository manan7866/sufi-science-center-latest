import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminToken, hasApplicationPermission } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value || '';
    const payload = verifyAdminToken(token);
    if (!payload || !hasApplicationPermission(payload, 'contributions')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const practices = await prisma.practice.findMany({
      where: {
        submitterEmail: { not: null },
      },
    });

    let created = 0;
    let skipped = 0;

    for (const p of practices) {
      const exists = await prisma.submission.findFirst({
        where: {
          submissionType: 'practice_submission',
          contactEmail: p.submitterEmail || '',
          title: p.title,
        },
      });

      if (exists) {
        skipped++;
        continue;
      }

      await prisma.submission.create({
        data: {
          submissionType: 'practice_submission',
          title: p.title,
          abstract: p.description || 'No description provided',
          content: p.instructions || 'N/A',
          submissionData: {
            contributorName: p.submitterName || '',
            email: p.submitterEmail || '',
            practiceName: p.title,
            category: p.category,
            description: p.description,
            instructions: p.instructions,
            benefits: p.benefits || [],
            prerequisites: p.prerequisites || [],
            difficultyLevel: p.difficultyLevel,
            durationMinutes: String(p.durationMinutes || ''),
            traditionSource: p.traditionSource || '',
            slug: p.slug,
          },
          contactName: p.submitterName || '',
          contactEmail: p.submitterEmail || '',
          status: p.status === 'approved' || p.status === 'published' ? 'submitted' : p.status,
        },
      });
      created++;
    }

    return NextResponse.json({ success: true, created, skipped });
  } catch (error) {
    console.error('[backfill-practice-submissions]', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
