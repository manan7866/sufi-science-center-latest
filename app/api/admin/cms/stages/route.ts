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

  const [items, total] = await Promise.all([
    prisma.transformationStage.findMany({
      where,
      orderBy: { stageNumber: 'asc' },
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.transformationStage.count({ where }),
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
    const { title, slug, arabicName, arabic_name, stageNumber, stage_number, category, description, characteristics, practicesAssociated, practices_associated, classicalReferences, classical_references, challenges, signsOfProgress, signs_of_progress, upsert } = body;

    const resolvedStageNumber = stageNumber ?? stage_number ?? 1;
    const resolvedArabicName = arabicName ?? arabic_name ?? '';

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    }

    let stage;
    if (upsert) {
      stage = await prisma.transformationStage.upsert({
        where: { slug },
        create: {
          title, slug, arabicName: resolvedArabicName,
          stageNumber: resolvedStageNumber,
          category: category ?? 'maqam',
          description: description ?? '',
          characteristics: characteristics ?? [],
          practicesAssociated: practicesAssociated ?? practices_associated ?? [],
          classicalReferences: classicalReferences ?? classical_references ?? [],
          challenges: challenges ?? [],
          signsOfProgress: signsOfProgress ?? signs_of_progress ?? [],
        },
        update: {
          title, arabicName: resolvedArabicName,
          stageNumber: resolvedStageNumber,
          category: category ?? 'maqam',
          description: description ?? '',
          characteristics: characteristics ?? [],
          practicesAssociated: practicesAssociated ?? practices_associated ?? [],
          classicalReferences: classicalReferences ?? classical_references ?? [],
          challenges: challenges ?? [],
          signsOfProgress: signsOfProgress ?? signs_of_progress ?? [],
        },
      });
    } else {
      stage = await prisma.transformationStage.create({
        data: {
          title, slug, arabicName: resolvedArabicName,
          stageNumber: resolvedStageNumber,
          category: category ?? 'maqam',
          description: description ?? '',
          characteristics: characteristics ?? [],
          practicesAssociated: practicesAssociated ?? practices_associated ?? [],
          classicalReferences: classicalReferences ?? classical_references ?? [],
          challenges: challenges ?? [],
          signsOfProgress: signsOfProgress ?? signs_of_progress ?? [],
        },
      });
    }

    return NextResponse.json({ item: stage });
  } catch (err) {
    console.error('[cms/stages POST]', err);
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
    const { id, title, slug, arabicName, arabic_name, stageNumber, stage_number, category, description, characteristics, practicesAssociated, practices_associated, classicalReferences, classical_references, challenges, signsOfProgress, signs_of_progress } = body;

    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });

    const stage = await prisma.transformationStage.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(arabicName !== undefined && { arabicName }) ||
        (arabic_name !== undefined && { arabicName: arabic_name }),
        ...(stageNumber !== undefined && { stageNumber }) ||
        (stage_number !== undefined && { stageNumber: stage_number }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(characteristics !== undefined && { characteristics }),
        ...(practicesAssociated !== undefined && { practicesAssociated }) ||
        (practices_associated !== undefined && { practicesAssociated: practices_associated }),
        ...(classicalReferences !== undefined && { classicalReferences }) ||
        (classical_references !== undefined && { classicalReferences: classical_references }),
        ...(challenges !== undefined && { challenges }),
        ...(signsOfProgress !== undefined && { signsOfProgress }) ||
        (signs_of_progress !== undefined && { signsOfProgress: signs_of_progress }),
      },
    });

    return NextResponse.json({ item: stage });
  } catch (err) {
    console.error('[cms/stages PATCH]', err);
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

    await prisma.transformationStage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cms/stages DELETE]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}