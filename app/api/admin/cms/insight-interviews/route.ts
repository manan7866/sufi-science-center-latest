import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

function auth(req: NextRequest) {
  return getAdminTokenFromRequest(req);
}

function getSearchParams(req: NextRequest) {
  return {
    search: req.nextUrl.searchParams.get('search') ?? '',
    status: req.nextUrl.searchParams.get('status') ?? '',
    page: parseInt(req.nextUrl.searchParams.get('page') ?? '0'),
    pageSize: parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20'),
  };
}

export async function GET(req: NextRequest) {
  const auth = getAdminTokenFromRequest(req);
  if (!auth) {
    console.log('[cms/insight-interviews GET] Unauthorized - no valid admin_token');
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  // Check if this is for applications (content page passes this param)
  if (req.nextUrl.searchParams.get('for') === 'applications') {
    const { search, status, page, pageSize } = getSearchParams(req);
    const where: Record<string, unknown> = {};
    if (search) where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { fieldOfWork: { contains: search, mode: 'insensitive' } },
    ];
    if (status && status !== 'all') where.status = status;

    const [items, total] = await Promise.all([
      prisma.interviewApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: page * pageSize,
        take: pageSize,
      }),
      prisma.interviewApplication.count({ where }),
    ]);
    return NextResponse.json({ items, total });
  }

  // Default: CMS content (InspiringInterview)
  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');

  const where = search 
    ? { title: { contains: search, mode: 'insensitive' as const } } 
    : {};

  const [items, total] = await Promise.all([
    prisma.inspiringInterview.findMany({
      where,
      orderBy: { title: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.inspiringInterview.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const auth = getAdminTokenFromRequest(req);
  if (!auth) {
    console.log('[cms/insight-interviews POST] Unauthorized - no valid admin_token');
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  // Applications are submitted from frontend, not admin
  return NextResponse.json({ error: 'Use frontend form to submit applications.' }, { status: 400 });
}

export async function PATCH(req: NextRequest) {
  const auth = getAdminTokenFromRequest(req);
  if (!auth) {
    console.log('[cms/insight-interviews PATCH] Unauthorized - no valid admin_token');
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Check if this is an application update
    if (body._isApplication) {
      const { id, status, adminNotes, scheduledAt, scheduledTime, videoLink } = body;
      if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 });

      const updateData: Record<string, unknown> = {};
      if (status !== undefined) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      if (scheduledAt !== undefined) updateData.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;
      if (scheduledTime !== undefined) updateData.scheduledTime = scheduledTime;
      if (videoLink !== undefined) updateData.videoLink = videoLink;

      const item = await prisma.interviewApplication.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ item });
    }

    // Default: CMS content update
    const { id, title, slug, description, transcript, intervieweeName, intervieweeAffiliation, intervieweeBio, videoUrl, audioUrl, keyClips, themes, relatedSaints, featured } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (transcript !== undefined) updateData.transcript = transcript;
    if (intervieweeName !== undefined) updateData.intervieweeName = intervieweeName;
    if (intervieweeAffiliation !== undefined) updateData.intervieweeAffiliation = intervieweeAffiliation;
    if (intervieweeBio !== undefined) updateData.intervieweeBio = intervieweeBio;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    if (audioUrl !== undefined) updateData.audioUrl = audioUrl;
    if (keyClips !== undefined) updateData.keyClips = keyClips;
    if (themes !== undefined) updateData.themes = themes;
    if (relatedSaints !== undefined) updateData.relatedSaints = relatedSaints;
    if (featured !== undefined) updateData.featured = featured;

    const interview = await prisma.inspiringInterview.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json({ item: interview });
  } catch (err) {
    console.error('[cms/insight-interviews PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = getAdminTokenFromRequest(req);
  if (!auth) {
    console.log('[cms/insight-interviews DELETE] Unauthorized - no valid admin_token');
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.inspiringInterview.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/insight-interviews DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}