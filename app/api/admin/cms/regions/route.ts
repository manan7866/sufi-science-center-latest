import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest, hasCmsPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.region.findMany({
      where,
      orderBy: [{ level: 'asc' }, { displayOrder: 'asc' }],
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.region.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, slug, description, level, parentRegionId, parent_region_id, displayOrder, display_order, upsert } = body;

    const resolvedLevel = level ?? 0;
    const resolvedDisplayOrder = displayOrder ?? display_order ?? 0;

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug required.' }, { status: 400 });
    }

    let region;
    const parentId = parentRegionId ?? parent_region_id ?? null;
    if (upsert) {
      region = await prisma.region.upsert({
        where: { slug },
        create: {
          name, slug, description: description ?? null,
          level: resolvedLevel,
          parentRegionId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
        update: {
          name, description: description ?? null,
          level: resolvedLevel,
          parentRegionId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
      });
    } else {
      region = await prisma.region.create({
        data: {
          name, slug, description: description ?? null,
          level: resolvedLevel,
          parentRegionId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
      });
    }

    return NextResponse.json({ item: region });
  } catch (err) {
    console.error('[cms/regions POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, slug, description, level, parentRegionId, parent_region_id, displayOrder, display_order } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const region = await prisma.region.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(level !== undefined && { level }),
        ...(parentRegionId !== undefined && { parentRegionId }) ||
        (parent_region_id !== undefined && { parentRegionId: parent_region_id }),
        ...(displayOrder !== undefined && { displayOrder }) ||
        (display_order !== undefined && { displayOrder: display_order }),
      },
    });

    return NextResponse.json({ item: region });
  } catch (err) {
    console.error('[cms/regions PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    await prisma.region.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/regions DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}