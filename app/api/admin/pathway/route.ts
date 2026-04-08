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
  const status = req.nextUrl.searchParams.get('status');
  const where = status && status !== 'all' ? { status } : {};
  const applications = await prisma.pathwayApplication.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, status, reviewerNotes } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    const application = await prisma.pathwayApplication.update({
      where: { id },
      data: { status, reviewNotes: reviewerNotes ?? null, reviewedAt: new Date() },
    });
    return NextResponse.json({ application });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
