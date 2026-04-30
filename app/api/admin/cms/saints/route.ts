import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest, hasCmsPermission } from '@/lib/auth';

function auth(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) return null;
  return admin;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.saint.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: page * pageSize,
      take: pageSize,
      select: {
        id: true, slug: true, name: true, birthYear: true, deathYear: true,
        biography: true, shortSummary: true, region: true, isFounder: true, createdAt: true,
      },
    }),
    prisma.saint.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, upsert,
      birthYear, birth_year, deathYear, death_year,
      biography, shortSummary, short_summary, region,
      isFounder, is_founder,
    } = body;

    const resolvedBirthYear = birthYear ?? birth_year;
    const resolvedDeathYear = deathYear ?? death_year;
    const resolvedShortSummary = shortSummary ?? short_summary ?? null;
    const resolvedIsFounder = (isFounder ?? is_founder) === true || (isFounder ?? is_founder) === 'true';

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug required.' }, { status: 400 });
    }

    let saint;
    if (upsert) {
      saint = await prisma.saint.upsert({
        where: { slug },
        create: {
          name, slug,
          birthYear: resolvedBirthYear ? parseInt(resolvedBirthYear) : null,
          deathYear: resolvedDeathYear ? parseInt(resolvedDeathYear) : null,
          biography: biography ?? null,
          shortSummary: resolvedShortSummary,
          region: region ?? null,
          isFounder: resolvedIsFounder,
        },
        update: {
          name,
          birthYear: resolvedBirthYear ? parseInt(resolvedBirthYear) : null,
          deathYear: resolvedDeathYear ? parseInt(resolvedDeathYear) : null,
          biography: biography ?? null,
          shortSummary: resolvedShortSummary,
          region: region ?? null,
          isFounder: resolvedIsFounder,
        },
      });
    } else {
      saint = await prisma.saint.create({
        data: {
          name, slug,
          birthYear: resolvedBirthYear ? parseInt(resolvedBirthYear) : null,
          deathYear: resolvedDeathYear ? parseInt(resolvedDeathYear) : null,
          biography: biography ?? null,
          shortSummary: resolvedShortSummary,
          region: region ?? null,
          isFounder: resolvedIsFounder,
        },
      });
    }

    return NextResponse.json({ item: saint });
  } catch (err) {
    console.error('[cms/saints POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, name, slug,
      birthYear, birth_year, deathYear, death_year,
      biography, shortSummary, short_summary, region,
      isFounder, is_founder,
    } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const resolvedBY = birthYear ?? birth_year;
    const resolvedDY = deathYear ?? death_year;
    const resolvedSS = shortSummary ?? short_summary;
    const resolvedIF = isFounder ?? is_founder;

    const saint = await prisma.saint.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(resolvedBY !== undefined && { birthYear: resolvedBY ? parseInt(resolvedBY) : null }),
        ...(resolvedDY !== undefined && { deathYear: resolvedDY ? parseInt(resolvedDY) : null }),
        ...(biography !== undefined && { biography }),
        ...(resolvedSS !== undefined && { shortSummary: resolvedSS }),
        ...(region !== undefined && { region }),
        ...(resolvedIF !== undefined && { isFounder: resolvedIF === true || resolvedIF === 'true' }),
      },
    });

    return NextResponse.json({ item: saint });
  } catch (err) {
    console.error('[cms/saints PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    await prisma.saint.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/saints DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
