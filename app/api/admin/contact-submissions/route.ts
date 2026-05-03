import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendAdminReplyEmail } from '@/lib/email';

function checkAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload) return null;
  return payload;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const status = req.nextUrl.searchParams.get('status');
  const enquiryType = req.nextUrl.searchParams.get('enquiryType');
  const search = req.nextUrl.searchParams.get('search');

  const where: Record<string, unknown> = {};

  if (status && status !== 'all') {
    where.status = status;
  }

  if (enquiryType && enquiryType !== 'all') {
    where.enquiryType = enquiryType;
  }

  if (search?.trim()) {
    where.OR = [
      { fullName: { contains: search.trim(), mode: 'insensitive' } },
      { email: { contains: search.trim(), mode: 'insensitive' } },
      { subject: { contains: search.trim(), mode: 'insensitive' } },
    ];
  }

  const submissions = await prisma.contactSubmission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: await prisma.contactSubmission.count(),
    new: await prisma.contactSubmission.count({ where: { status: 'new' } }),
    replied: await prisma.contactSubmission.count({ where: { replied: true } }),
    complaint: await prisma.contactSubmission.count({ where: { enquiryType: 'complain' } }),
  };

  return NextResponse.json({ submissions, stats });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, status, adminNotes, replyMessage } = body;

    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const submission = await prisma.contactSubmission.findUnique({ where: { id } });
    if (!submission) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    if (replyMessage) {
      updateData.replied = true;
      updateData.repliedAt = new Date();

      const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      await sendAdminReplyEmail(
        submission.email,
        submission.fullName,
        dateStr,
        replyMessage
      );
    }

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ submission: updated });
  } catch (error) {
    console.error('[admin/contact-submissions PATCH]', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
