import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminToken, hasApplicationPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies?.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || !hasApplicationPermission(payload, 'contributions')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    const where: Record<string, any> = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { userName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const submissions = await prisma.wazifaSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('[admin/cms/wazifa GET]', error);
    return NextResponse.json({ submissions: [] });
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies?.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyAdminToken(token);
  if (!payload || !hasApplicationPermission(payload, 'contributions')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, status, reviewNotes } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const submission = await prisma.wazifaSubmission.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(reviewNotes !== undefined && { reviewNotes }),
      },
    });

    return NextResponse.json({ submission });
  } catch (error) {
    console.error('[admin/cms/wazifa PATCH]', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
