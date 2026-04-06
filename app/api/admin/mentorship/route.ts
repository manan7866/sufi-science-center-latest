import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

function checkAuth() {
  const token = cookies().get('admin_token')?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

export async function GET(req: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const status = req.nextUrl.searchParams.get('status');
  const where = status && status !== 'all' ? { status } : {};
  const applications = await prisma.mentorshipApplication.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, status, reviewerNotes, interviewScheduledFor } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    const application = await prisma.mentorshipApplication.update({
      where: { id },
      data: {
        status,
        reviewNotes: reviewerNotes ?? null,
        reviewedAt: new Date(),
        interviewScheduledFor: interviewScheduledFor ? new Date(interviewScheduledFor) : null,
      },
    });
    return NextResponse.json({ application });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
