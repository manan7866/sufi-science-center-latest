import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

function auth(req: NextRequest) {
  return getAdminTokenFromRequest(req);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where = search
    ? { title: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.researchPaper.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.researchPaper.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, abstract, publishedYear, journal, doi, url, isFeatured } = body;

    if (!title) {
      return NextResponse.json({ error: 'title required.' }, { status: 400 });
    }

    const item = await prisma.researchPaper.create({
      data: {
        title,
        abstract: abstract ?? null,
        publishedYear: publishedYear ? parseInt(publishedYear) : null,
        journal: journal ?? null,
        doi: doi ?? null,
        url: url ?? null,
        isFeatured: isFeatured ?? false,
      },
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/research POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, title, abstract, publishedYear, journal, doi, url, isFeatured } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const item = await prisma.researchPaper.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(abstract !== undefined && { abstract }),
        ...(publishedYear !== undefined && { publishedYear }),
        ...(journal !== undefined && { journal }),
        ...(doi !== undefined && { doi }),
        ...(url !== undefined && { url }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/research PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    await prisma.researchPaper.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/research DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
