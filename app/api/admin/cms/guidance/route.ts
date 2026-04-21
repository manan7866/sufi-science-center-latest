import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where = search
    ? { title: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.guidancePathway.findMany({
      where,
      orderBy: { title: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.guidancePathway.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id: pathwayId, title, description, targetAudience, target_audience, durationWeeks, duration_weeks, recommendedPractices, recommendedStages, assessmentProfile } = body;

    if (!title) {
      return NextResponse.json({ error: 'title required.' }, { status: 400 });
    }

    let pathway;
    if (pathwayId) {
      pathway = await prisma.guidancePathway.update({
        where: { id: pathwayId },
        data: {
          title, description: description ?? '',
          targetAudience: targetAudience ?? target_audience ?? '',
          durationWeeks: durationWeeks ?? duration_weeks ?? 8,
          recommendedPractices: recommendedPractices ?? [],
          recommendedStages: recommendedStages ?? [],
          assessmentProfile: assessmentProfile ?? {},
        },
      });
    } else {
      pathway = await prisma.guidancePathway.create({
        data: {
          title, description: description ?? '',
          targetAudience: targetAudience ?? target_audience ?? '',
          durationWeeks: durationWeeks ?? duration_weeks ?? 8,
          recommendedPractices: recommendedPractices ?? [],
          recommendedStages: recommendedStages ?? [],
          assessmentProfile: assessmentProfile ?? {},
        },
      });
    }

    return NextResponse.json({ item: pathway });
  } catch (err) {
    console.error('[cms/guidance POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, description, targetAudience, target_audience, durationWeeks, duration_weeks, recommendedPractices, recommendedStages, assessmentProfile } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const pathway = await prisma.guidancePathway.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(targetAudience !== undefined && { targetAudience }) ||
        (target_audience !== undefined && { targetAudience: target_audience }),
        ...(durationWeeks !== undefined && { durationWeeks }) ||
        (duration_weeks !== undefined && { durationWeeks: duration_weeks }),
        ...(recommendedPractices !== undefined && { recommendedPractices }),
        ...(recommendedStages !== undefined && { recommendedStages }),
        ...(assessmentProfile !== undefined && { assessmentProfile }),
      },
    });

    return NextResponse.json({ item: pathway });
  } catch (err) {
    console.error('[cms/guidance PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    await prisma.guidancePathway.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/guidance DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}