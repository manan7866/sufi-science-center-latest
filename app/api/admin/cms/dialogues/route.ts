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
    ? { title: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.dialogue.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.dialogue.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, subtitle, slug, description, type, host, isPublished, publishedAt, difficultyLevel, difficulty_level, totalEpisodes, total_episodes, totalDurationMinutes, total_duration_minutes, participants, isFeatured } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    }

    const item = await prisma.dialogue.create({
      data: {
        title,
        slug,
        subtitle: subtitle ?? null,
        description: description ?? null,
        type: type ?? null,
        host: host ?? null,
        isPublished: isPublished ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        difficultyLevel: difficultyLevel ?? difficulty_level ?? null,
        totalEpisodes: totalEpisodes ?? total_episodes ?? 0,
        totalDurationMinutes: totalDurationMinutes ?? total_duration_minutes ?? 0,
        participants: participants ?? [],
        isFeatured: isFeatured ?? false,
      },
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/dialogues POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, title, subtitle, slug, description, type, host, isPublished, publishedAt, difficultyLevel, difficulty_level, totalEpisodes, total_episodes, totalDurationMinutes, total_duration_minutes, participants, isFeatured } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const item = await prisma.dialogue.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(host !== undefined && { host }),
        ...(isPublished !== undefined && { isPublished }),
        ...(publishedAt !== undefined && { publishedAt: publishedAt ? new Date(publishedAt) : null }),
        ...(difficultyLevel !== undefined && { difficultyLevel }) ||
        (difficulty_level !== undefined && { difficultyLevel: difficulty_level }),
        ...(totalEpisodes !== undefined && { totalEpisodes }) ||
        (total_episodes !== undefined && { totalEpisodes: total_episodes }),
        ...(totalDurationMinutes !== undefined && { totalDurationMinutes }) ||
        (total_duration_minutes !== undefined && { totalDurationMinutes: total_duration_minutes }),
        ...(participants !== undefined && { participants }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/dialogues PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    await prisma.dialogue.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/dialogues DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
