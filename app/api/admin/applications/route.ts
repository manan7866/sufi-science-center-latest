import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

type TableKey = 'membership' | 'volunteer' | 'pathway' | 'mentorship' | 'collaboration' | 'conference' | 'support';

const TABLE_MAP: Record<TableKey, keyof typeof prisma> = {
  membership: 'membershipApplication',
  volunteer: 'volunteerApplication',
  pathway: 'pathwayApplication',
  mentorship: 'mentorshipApplication',
  collaboration: 'collaborationProposal',
  conference: 'conferenceSubmission',
  support: 'supportTicket',
};

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const type = req.nextUrl.searchParams.get('type') as TableKey | null;
  const status = req.nextUrl.searchParams.get('status');

  if (!type || !TABLE_MAP[type]) {
    return NextResponse.json({ error: 'Valid type required.' }, { status: 400 });
  }

  const where: Record<string, unknown> = {};
  if (status && status !== 'all') where.status = status;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = (prisma as any)[TABLE_MAP[type]];
    const items = await model.findMany({ where, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ items });
  } catch (err) {
    console.error('[admin/applications GET]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { type, id, status, reviewNotes } = await req.json();

    if (!type || !TABLE_MAP[type as TableKey] || !id) {
      return NextResponse.json({ error: 'type, id required.' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = (prisma as any)[TABLE_MAP[type as TableKey]];
    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (reviewNotes !== undefined) data.reviewNotes = reviewNotes;

    const updated = await model.update({ where: { id }, data });
    return NextResponse.json({ item: updated });
  } catch (err) {
    console.error('[admin/applications PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
