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
  const where = search ? { title: { contains: search, mode: 'insensitive' as const } } : {};
  const [items, total] = await Promise.all([
    prisma.inspiringInterview.findMany({ where, orderBy: { title: 'asc' }, skip: page * pageSize, take: pageSize }),
    prisma.inspiringInterview.count({ where }),
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
    const { title, slug, description, transcript, intervieweeName, interviewee_name, intervieweeAffiliation, interviewee_affiliation, intervieweeBio, interviewee_bio, videoUrl, video_url, audioUrl, audio_url, keyClips, themes, relatedSaints, related_saints, featured, upsert } = body;
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    const interview = upsert ? await prisma.inspiringInterview.upsert({
      where: { slug },
      create: { title, slug, description: description ?? '', transcript: transcript ?? '', intervieweeName: interviewee_name ?? intervieweeName ?? '', intervieweeAffiliation: interviewee_affiliation ?? intervieweeAffiliation ?? '', intervieweeBio: interviewee_bio ?? intervieweeBio ?? '', videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, keyClips: keyClips ?? [], themes: themes ?? [], relatedSaints: related_saints ?? relatedSaints ?? [], featured: featured ?? false },
      update: { title, description: description ?? '', transcript: transcript ?? '', intervieweeName: interviewee_name ?? intervieweeName ?? '', intervieweeAffiliation: interviewee_affiliation ?? intervieweeAffiliation ?? '', intervieweeBio: interviewee_bio ?? intervieweeBio ?? '', videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, keyClips: keyClips ?? [], themes: themes ?? [], relatedSaints: related_saints ?? relatedSaints ?? [], featured: featured ?? false },
    }) : await prisma.inspiringInterview.create({
      data: { title, slug, description: description ?? '', transcript: transcript ?? '', intervieweeName: interviewee_name ?? intervieweeName ?? '', intervieweeAffiliation: interviewee_affiliation ?? intervieweeAffiliation ?? '', intervieweeBio: interviewee_bio ?? intervieweeBio ?? '', videoUrl: video_url ?? videoUrl ?? null, audioUrl: audio_url ?? audioUrl ?? null, keyClips: keyClips ?? [], themes: themes ?? [], relatedSaints: related_saints ?? relatedSaints ?? [], featured: featured ?? false },
    });
    return NextResponse.json({ item: interview });
  } catch (err) { console.error('[cms/insight-interviews POST]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, slug, description, transcript, intervieweeName, interviewee_name, intervieweeAffiliation, interviewee_affiliation, intervieweeBio, interviewee_bio, videoUrl, video_url, audioUrl, audio_url, keyClips, themes, relatedSaints, related_saints, featured } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    const interview = await prisma.inspiringInterview.update({
      where: { id },
      data: { ...(title !== undefined && { title }), ...(slug !== undefined && { slug }), ...(description !== undefined && { description }), ...(transcript !== undefined && { transcript }), ...(intervieweeName !== undefined && { intervieweeName }) || (interviewee_name !== undefined && { intervieweeName: interviewee_name }), ...(intervieweeAffiliation !== undefined && { intervieweeAffiliation }) || (interviewee_affiliation !== undefined && { intervieweeAffiliation: interviewee_affiliation }), ...(intervieweeBio !== undefined && { intervieweeBio }) || (interviewee_bio !== undefined && { intervieweeBio: interviewee_bio }), ...(videoUrl !== undefined && { videoUrl }) || (video_url !== undefined && { videoUrl: video_url }), ...(audioUrl !== undefined && { audioUrl }) || (audio_url !== undefined && { audioUrl: audio_url }), ...(keyClips !== undefined && { keyClips }), ...(themes !== undefined && { themes }), ...(relatedSaints !== undefined && { relatedSaints }) || (related_saints !== undefined && { relatedSaints: related_saints }), ...(featured !== undefined && { featured }) },
    });
    return NextResponse.json({ item: interview });
  } catch (err) { console.error('[cms/insight-interviews PATCH]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.inspiringInterview.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) { console.error('[cms/insight-interviews DELETE]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}