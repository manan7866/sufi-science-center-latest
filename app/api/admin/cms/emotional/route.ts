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
    ? { title: { contains: search, mode: 'insensitive' as const } }
    : {};

  const [items, total] = await Promise.all([
    prisma.emotionalModule.findMany({
      where,
      orderBy: { title: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.emotionalModule.count({ where }),
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
    const { title, slug, focusArea, focus_area, description, sufiApproach, sufi_approach, modernPsychology, modern_psychology, practices, reflectionQuestions, reflection_questions, resources, upsert } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    }

    let module;
    if (upsert) {
      module = await prisma.emotionalModule.upsert({
        where: { slug },
        create: {
          title, slug,
          focusArea: focusArea ?? focus_area ?? 'love',
          description: description ?? '',
          sufiApproach: sufiApproach ?? sufi_approach ?? '',
          modernPsychology: modernPsychology ?? modern_psychology ?? '',
          practices: practices ?? [],
          reflectionQuestions: reflectionQuestions ?? reflection_questions ?? [],
          resources: resources ?? [],
        },
        update: {
          title,
          focusArea: focusArea ?? focus_area ?? 'love',
          description: description ?? '',
          sufiApproach: sufiApproach ?? sufi_approach ?? '',
          modernPsychology: modernPsychology ?? modern_psychology ?? '',
          practices: practices ?? [],
          reflectionQuestions: reflectionQuestions ?? reflection_questions ?? [],
          resources: resources ?? [],
        },
      });
    } else {
      module = await prisma.emotionalModule.create({
        data: {
          title, slug,
          focusArea: focusArea ?? focus_area ?? 'love',
          description: description ?? '',
          sufiApproach: sufiApproach ?? sufi_approach ?? '',
          modernPsychology: modernPsychology ?? modern_psychology ?? '',
          practices: practices ?? [],
          reflectionQuestions: reflectionQuestions ?? reflection_questions ?? [],
          resources: resources ?? [],
        },
      });
    }

    return NextResponse.json({ item: module });
  } catch (err) {
    console.error('[cms/emotional POST]', err);
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
    const { id, title, slug, focusArea, focus_area, description, sufiApproach, sufi_approach, modernPsychology, modern_psychology, practices, reflectionQuestions, reflection_questions, resources } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const module = await prisma.emotionalModule.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(focusArea !== undefined && { focusArea }) ||
        (focus_area !== undefined && { focusArea: focus_area }),
        ...(description !== undefined && { description }),
        ...(sufiApproach !== undefined && { sufiApproach }) ||
        (sufi_approach !== undefined && { sufiApproach: sufi_approach }),
        ...(modernPsychology !== undefined && { modernPsychology }) ||
        (modern_psychology !== undefined && { modernPsychology: modern_psychology }),
        ...(practices !== undefined && { practices }),
        ...(reflectionQuestions !== undefined && { reflectionQuestions }) ||
        (reflection_questions !== undefined && { reflectionQuestions: reflection_questions }),
        ...(resources !== undefined && { resources }),
      },
    });

    return NextResponse.json({ item: module });
  } catch (err) {
    console.error('[cms/emotional PATCH]', err);
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

    await prisma.emotionalModule.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/emotional DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}