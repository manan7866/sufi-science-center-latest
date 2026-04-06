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
    const { title, slug, abstract, content, publicationDate, citationFormat, pdfUrl } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    }

    const item = await prisma.researchPaper.create({
      data: {
        title,
        slug,
        abstract: abstract ?? null,
        content: content ?? null,
        publicationDate: publicationDate ? new Date(publicationDate) : null,
        citationFormat: citationFormat ?? null,
        pdfUrl: pdfUrl ?? null,
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
    const { id, title, slug, abstract, content, publicationDate, citationFormat, pdfUrl } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const item = await prisma.researchPaper.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(abstract !== undefined && { abstract }),
        ...(content !== undefined && { content }),
        ...(publicationDate !== undefined && { publicationDate: publicationDate ? new Date(publicationDate) : null }),
        ...(citationFormat !== undefined && { citationFormat }),
        ...(pdfUrl !== undefined && { pdfUrl }),
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

    await prisma.researchPaper.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/research DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
