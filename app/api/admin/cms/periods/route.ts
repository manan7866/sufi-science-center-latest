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
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.historicalPeriod.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.historicalPeriod.count({ where }),
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
    const { name, slug, description, significance, keywords, startYear, start_year, endYear, end_year, islamicCalendarStart, islamic_calendar_start, islamicCalendarEnd, islamic_calendar_end, displayOrder, display_order } = body;

    const resolvedStartYear = startYear ?? start_year;
    const resolvedEndYear = endYear ?? end_year;
    const resolvedDisplayOrder = displayOrder ?? display_order ?? 0;

    if (!name || !slug || !resolvedStartYear) {
      return NextResponse.json({ error: 'name, slug, and startYear required.' }, { status: 400 });
    }

    const period = await prisma.historicalPeriod.create({
      data: {
        name, slug, description: description ?? null, significance: significance ?? null,
        keywords: keywords ?? [],
        startYear: resolvedStartYear, endYear: resolvedEndYear ?? null,
        islamicCalendarStart: islamicCalendarStart ?? islamic_calendar_start ?? null,
        islamicCalendarEnd: islamicCalendarEnd ?? islamic_calendar_end ?? null,
        displayOrder: resolvedDisplayOrder,
      },
    });

    return NextResponse.json({ item: period });
  } catch (err) {
    console.error('[cms/periods POST]', err);
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
    const { id, name, slug, description, significance, keywords, startYear, start_year, endYear, end_year, islamicCalendarStart, islamic_calendar_start, islamicCalendarEnd, islamic_calendar_end, displayOrder, display_order } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const period = await prisma.historicalPeriod.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(significance !== undefined && { significance }),
        ...(keywords !== undefined && { keywords }),
        ...(startYear !== undefined && { startYear }) ||
        (start_year !== undefined && { startYear: start_year }),
        ...(endYear !== undefined && { endYear }) ||
        (end_year !== undefined && { endYear: end_year }),
        ...(islamicCalendarStart !== undefined && { islamicCalendarStart }) ||
        (islamic_calendar_start !== undefined && { islamicCalendarStart: islamic_calendar_start }),
        ...(islamicCalendarEnd !== undefined && { islamicCalendarEnd }) ||
        (islamic_calendar_end !== undefined && { islamicCalendarEnd: islamic_calendar_end }),
        ...(displayOrder !== undefined && { displayOrder }) ||
        (display_order !== undefined && { displayOrder: display_order }),
      },
    });

    return NextResponse.json({ item: period });
  } catch (err) {
    console.error('[cms/periods PATCH]', err);
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

    await prisma.historicalPeriod.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/periods DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}