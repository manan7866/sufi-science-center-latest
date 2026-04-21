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
    prisma.theme.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.theme.count({ where }),
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
    const { name, slug, description, category, conceptualClusters, conceptual_clusters, displayOrder, display_order, upsert } = body;

    const resolvedDisplayOrder = displayOrder ?? display_order ?? 0;

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug required.' }, { status: 400 });
    }

    let theme;
    if (upsert) {
      theme = await prisma.theme.upsert({
        where: { slug },
        create: {
          name, slug, description: description ?? null,
          category: category ?? 'interdisciplinary',
          conceptualClusters: conceptualClusters ?? conceptual_clusters ?? [],
          displayOrder: resolvedDisplayOrder,
        },
        update: {
          name, description: description ?? null,
          category: category ?? 'interdisciplinary',
          conceptualClusters: conceptualClusters ?? conceptual_clusters ?? [],
          displayOrder: resolvedDisplayOrder,
        },
      });
    } else {
      theme = await prisma.theme.create({
        data: {
          name, slug, description: description ?? null,
          category: category ?? 'interdisciplinary',
          conceptualClusters: conceptualClusters ?? conceptual_clusters ?? [],
          displayOrder: resolvedDisplayOrder,
        },
      });
    }

    return NextResponse.json({ item: theme });
  } catch (err) {
    console.error('[cms/themes POST]', err);
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
    const { id, name, slug, description, category, conceptualClusters, conceptual_clusters, displayOrder, display_order } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const theme = await prisma.theme.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(conceptualClusters !== undefined && { conceptualClusters }) ||
        (conceptual_clusters !== undefined && { conceptualClusters: conceptual_clusters }),
        ...(displayOrder !== undefined && { displayOrder }) ||
        (display_order !== undefined && { displayOrder: display_order }),
      },
    });

    return NextResponse.json({ item: theme });
  } catch (err) {
    console.error('[cms/themes PATCH]', err);
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

    await prisma.theme.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/themes DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}