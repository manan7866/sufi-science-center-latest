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
    prisma.practiceProfile.findMany({ where, orderBy: { title: 'asc' }, skip: page * pageSize, take: pageSize }),
    prisma.practiceProfile.count({ where }),
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
    const { title, slug, description, methodology, steps, practiceType, practice_type, durationMinutes, duration_minutes, difficultyLevel, difficulty_level, relatedSaints, related_saints, themes, tags, featured, upsert } = body;
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    const profile = upsert ? await prisma.practiceProfile.upsert({
      where: { slug },
      create: { title, slug, description: description ?? '', methodology: methodology ?? '', steps: steps ?? [], practiceType: practice_type ?? practiceType ?? 'meditation', durationMinutes: duration_minutes ?? durationMinutes ?? 15, difficultyLevel: difficulty_level ?? difficultyLevel ?? 'beginner', relatedSaints: related_saints ?? relatedSaints ?? [], themes: themes ?? [], tags: tags ?? [], featured: featured ?? false },
      update: { title, description: description ?? '', methodology: methodology ?? '', steps: steps ?? [], practiceType: practice_type ?? practiceType ?? 'meditation', durationMinutes: duration_minutes ?? durationMinutes ?? 15, difficultyLevel: difficulty_level ?? difficultyLevel ?? 'beginner', relatedSaints: related_saints ?? relatedSaints ?? [], themes: themes ?? [], tags: tags ?? [], featured: featured ?? false },
    }) : await prisma.practiceProfile.create({
      data: { title, slug, description: description ?? '', methodology: methodology ?? '', steps: steps ?? [], practiceType: practice_type ?? practiceType ?? 'meditation', durationMinutes: duration_minutes ?? durationMinutes ?? 15, difficultyLevel: difficulty_level ?? difficultyLevel ?? 'beginner', relatedSaints: related_saints ?? relatedSaints ?? [], themes: themes ?? [], tags: tags ?? [], featured: featured ?? false },
    });
    return NextResponse.json({ item: profile });
  } catch (err) { console.error('[cms/applied-practices POST]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, slug, description, methodology, steps, practiceType, practice_type, durationMinutes, duration_minutes, difficultyLevel, difficulty_level, relatedSaints, related_saints, themes, tags, featured } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    const profile = await prisma.practiceProfile.update({
      where: { id },
      data: { ...(title !== undefined && { title }), ...(slug !== undefined && { slug }), ...(description !== undefined && { description }), ...(methodology !== undefined && { methodology }), ...(steps !== undefined && { steps }), ...(practiceType !== undefined && { practiceType }) || (practice_type !== undefined && { practiceType: practice_type }), ...(durationMinutes !== undefined && { durationMinutes }) || (duration_minutes !== undefined && { durationMinutes: duration_minutes }), ...(difficultyLevel !== undefined && { difficultyLevel }) || (difficulty_level !== undefined && { difficultyLevel: difficulty_level }), ...(relatedSaints !== undefined && { relatedSaints }) || (related_saints !== undefined && { relatedSaints: related_saints }), ...(themes !== undefined && { themes }), ...(tags !== undefined && { tags }), ...(featured !== undefined && { featured }) },
    });
    return NextResponse.json({ item: profile });
  } catch (err) { console.error('[cms/applied-practices PATCH]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.practiceProfile.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) { console.error('[cms/applied-practices DELETE]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}