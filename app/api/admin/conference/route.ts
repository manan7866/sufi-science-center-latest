import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

function checkAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

function parseKeywords(keywords: string | null | undefined): string[] {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords;
  try {
    const parsed = JSON.parse(keywords);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return keywords.split(',').map(k => k.trim()).filter(Boolean);
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const submissions = await prisma.conferenceSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      conference: true,
    },
  });
  
  const mapped = submissions.map(s => ({
    ...s,
    keywords: parseKeywords(s.keywords),
  }));
  
  return NextResponse.json({ submissions: mapped });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, status, adminNotes, reviewerDecision, reviewedBy } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    const submission = await prisma.conferenceSubmission.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes ?? null,
        reviewerDecision: reviewerDecision ?? null,
        reviewedBy: reviewedBy ?? null,
        reviewedAt: new Date(),
      },
    });
    return NextResponse.json({ submission });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
