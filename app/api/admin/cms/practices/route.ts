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
    ? { title: { contains: search, mode: 'insensitive' as const } }
    : {};

  try {
    const [items, total] = await Promise.all([
      prisma.practice.findMany({
        where,
        orderBy: { title: 'asc' },
        skip: page * pageSize,
        take: pageSize,
      }),
      prisma.practice.count({ where }),
    ]);

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error('[cms/practices GET]', error);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, category, difficultyLevel, difficulty_level, durationMinutes, duration_minutes, description, instructions, benefits, prerequisites, traditionSource, tradition_source, videoUrl, video_url, audioUrl, audio_url, upsert } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    }

    let practice;
    if (upsert) {
      practice = await prisma.practice.upsert({
        where: { slug },
        create: {
          title, slug,
          category: category ?? 'meditation',
          difficultyLevel: difficultyLevel ?? difficulty_level ?? 'beginner',
          durationMinutes: durationMinutes ?? duration_minutes ?? 15,
          description: description ?? '',
          instructions: instructions ?? '',
          benefits: benefits ?? [],
          prerequisites: prerequisites ?? [],
          traditionSource: traditionSource ?? tradition_source ?? null,
          videoUrl: videoUrl ?? video_url ?? null,
          audioUrl: audioUrl ?? audio_url ?? null,
        },
        update: {
          title,
          category: category ?? 'meditation',
          difficultyLevel: difficultyLevel ?? difficulty_level ?? 'beginner',
          durationMinutes: durationMinutes ?? duration_minutes ?? 15,
          description: description ?? '',
          instructions: instructions ?? '',
          benefits: benefits ?? [],
          prerequisites: prerequisites ?? [],
          traditionSource: traditionSource ?? tradition_source ?? null,
          videoUrl: videoUrl ?? video_url ?? null,
          audioUrl: audioUrl ?? audio_url ?? null,
        },
      });
    } else {
      practice = await prisma.practice.create({
        data: {
          title, slug,
          category: category ?? 'meditation',
          difficultyLevel: difficultyLevel ?? difficulty_level ?? 'beginner',
          durationMinutes: durationMinutes ?? duration_minutes ?? 15,
          description: description ?? '',
          instructions: instructions ?? '',
          benefits: benefits ?? [],
          prerequisites: prerequisites ?? [],
          traditionSource: traditionSource ?? tradition_source ?? null,
          videoUrl: videoUrl ?? video_url ?? null,
          audioUrl: audioUrl ?? audio_url ?? null,
        },
      });
    }

    return NextResponse.json({ item: practice });
  } catch (err) {
    console.error('[cms/practices POST]', err);
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
    const { id, title, slug, category, difficultyLevel, difficulty_level, durationMinutes, duration_minutes, description, instructions, benefits, prerequisites, traditionSource, tradition_source, videoUrl, video_url, audioUrl, audio_url, status } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (difficultyLevel !== undefined) updateData.difficultyLevel = difficultyLevel;
    else if (difficulty_level !== undefined) updateData.difficultyLevel = difficulty_level;
    if (durationMinutes !== undefined) updateData.durationMinutes = durationMinutes;
    else if (duration_minutes !== undefined) updateData.durationMinutes = duration_minutes;
    if (description !== undefined) updateData.description = description;
    if (instructions !== undefined) updateData.instructions = instructions;
    if (benefits !== undefined) updateData.benefits = benefits;
    if (prerequisites !== undefined) updateData.prerequisites = prerequisites;
    if (traditionSource !== undefined) updateData.traditionSource = traditionSource;
    else if (tradition_source !== undefined) updateData.traditionSource = tradition_source;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    else if (video_url !== undefined) updateData.videoUrl = video_url;
    if (audioUrl !== undefined) updateData.audioUrl = audioUrl;
    else if (audio_url !== undefined) updateData.audioUrl = audio_url;
    if (status !== undefined) updateData.status = status;

    const practice = await prisma.practice.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ item: practice });
  } catch (err) {
    console.error('[cms/practices PATCH]', err);
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

    await prisma.practice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/practices DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}