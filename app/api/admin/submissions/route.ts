import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, hasApplicationPermission } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendMediaAcceptedEmail, sendArticleAcceptedEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || !hasApplicationPermission(payload, 'contributions')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = req.nextUrl;
  const typeFilter = searchParams.get('type') || '';
  const statusFilter = searchParams.get('status') || '';
  const searchQuery = searchParams.get('search') || '';

  const where: Record<string, any> = {};
  if (typeFilter) where.submissionType = typeFilter;
  if (statusFilter) where.status = statusFilter;
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { contactName: { contains: searchQuery, mode: 'insensitive' } },
      { contactEmail: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ submissions });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || !hasApplicationPermission(payload, 'contributions')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, status, adminNotes } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });

    const submission = await prisma.submission.update({
      where: { id },
      data: { status, adminNotes: adminNotes ?? null, updatedAt: new Date() },
    });

    const data = (submission.submissionData || {}) as Record<string, any>;

    if (submission.submissionType === 'sacred_media' && status === 'accepted') {
      await sendMediaAcceptedEmail(
        submission.contactEmail,
        submission.contactName,
        data.mediaTitle || submission.title
      ).catch((err) => console.error('Failed to send media accepted email:', err));
    }

    if (submission.submissionType === 'article_essay' && (status === 'accepted' || status === 'published')) {
      await sendArticleAcceptedEmail(
        submission.contactEmail,
        submission.contactName,
        data.articleTitle || submission.title
      ).catch((err) => console.error('Failed to send article accepted email:', err));
    }

    return NextResponse.json({ submission });
  } catch {
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
