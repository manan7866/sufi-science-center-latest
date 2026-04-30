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
  const where = search ? { title: { contains: search, mode: 'insensitive' as const } } : {};
  const [items, total] = await Promise.all([
    prisma.hardTalkSession.findMany({ where, orderBy: { title: 'asc' }, skip: page * pageSize, take: pageSize }),
    prisma.hardTalkSession.count({ where }),
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
    const { title, slug, description, transcript, participants, videoUrl, video_url, audioUrl, audio_url, controversialPoints, citations, themes, featured, upsert } = body;
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    const session = upsert ? await prisma.hardTalkSession.upsert({
      where: { slug },
      create: { title, slug, description: description ?? '', transcript: transcript ?? '', participants: participants ?? [], videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, controversialPoints: controversialPoints ?? [], citations: citations ?? [], themes: themes ?? [], featured: featured ?? false },
      update: { title, description: description ?? '', transcript: transcript ?? '', participants: participants ?? [], videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, controversialPoints: controversialPoints ?? [], citations: citations ?? [], themes: themes ?? [], featured: featured ?? false },
    }) : await prisma.hardTalkSession.create({
      data: { title, slug, description: description ?? '', transcript: transcript ?? '', participants: participants ?? [], videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, controversialPoints: controversialPoints ?? [], citations: citations ?? [], themes: themes ?? [], featured: featured ?? false },
    });
    return NextResponse.json({ item: session });
  } catch (err) { console.error('[cms/hard-inquiry POST]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, slug, description, transcript, participants, videoUrl, video_url, audioUrl, audio_url, controversialPoints, citations, themes, featured } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    const session = await prisma.hardTalkSession.update({
      where: { id },
      data: { ...(title !== undefined && { title }), ...(slug !== undefined && { slug }), ...(description !== undefined && { description }), ...(transcript !== undefined && { transcript }), ...(participants !== undefined && { participants }), ...(videoUrl !== undefined && { videoUrl }) || (video_url !== undefined && { videoUrl: video_url }), ...(audioUrl !== undefined && { audioUrl }) || (audio_url !== undefined && { audioUrl: audio_url }), ...(controversialPoints !== undefined && { controversialPoints }), ...(citations !== undefined && { citations }), ...(themes !== undefined && { themes }), ...(featured !== undefined && { featured }) },
    });
    return NextResponse.json({ item: session });
  } catch (err) { console.error('[cms/hard-inquiry PATCH]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.hardTalkSession.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) { console.error('[cms/hard-inquiry DELETE]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}