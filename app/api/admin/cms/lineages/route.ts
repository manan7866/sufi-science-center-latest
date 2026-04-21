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
    prisma.lineage.findMany({
      where,
      orderBy: [{ level: 'asc' }, { displayOrder: 'asc' }],
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.lineage.count({ where }),
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
    const { name, slug, description,
      level, parentLineageId, parent_lineage_id,
      displayOrder, display_order, upsert,
    } = body;

    const resolvedLevel = level ?? 0;
    const resolvedDisplayOrder = displayOrder ?? display_order ?? 0;

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug required.' }, { status: 400 });
    }

    let lineage;
    const parentId = parentLineageId ?? parent_lineage_id ?? null;
    if (upsert) {
      lineage = await prisma.lineage.upsert({
        where: { slug },
        create: {
          name, slug, description: description ?? null,
          level: resolvedLevel,
          parentLineageId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
        update: {
          name, description: description ?? null,
          level: resolvedLevel,
          parentLineageId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
      });
    } else {
      lineage = await prisma.lineage.create({
        data: {
          name, slug, description: description ?? null,
          level: resolvedLevel,
          parentLineageId: parentId,
          displayOrder: resolvedDisplayOrder,
        },
      });
    }

    return NextResponse.json({ item: lineage });
  } catch (err) {
    console.error('[cms/lineages POST]', err);
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
    const { id, name, slug, description,
      level, parentLineageId, parent_lineage_id,
      displayOrder, display_order,
    } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const lineage = await prisma.lineage.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(level !== undefined && { level }),
        ...(parentLineageId !== undefined && { parentLineageId }) ||
        (parent_lineage_id !== undefined && { parentLineageId: parent_lineage_id }),
        ...(displayOrder !== undefined && { displayOrder }) ||
        (display_order !== undefined && { displayOrder: display_order }),
      },
    });

    return NextResponse.json({ item: lineage });
  } catch (err) {
    console.error('[cms/lineages PATCH]', err);
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

    await prisma.lineage.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/lineages DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}