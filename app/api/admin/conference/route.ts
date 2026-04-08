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

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const submissions = await prisma.conferenceSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ submissions });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, status, adminNotes } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    const submission = await prisma.conferenceSubmission.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes ?? null,
        reviewedAt: new Date(),
      },
    });
    return NextResponse.json({ submission });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
