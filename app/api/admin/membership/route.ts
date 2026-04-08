import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const applications = await prisma.membershipApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, status, reviewNotes } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });

    const application = await prisma.membershipApplication.update({
      where: { id },
      data: { status, reviewNotes: reviewNotes ?? null, reviewedAt: new Date() },
    });

    return NextResponse.json({ application });
  } catch {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
