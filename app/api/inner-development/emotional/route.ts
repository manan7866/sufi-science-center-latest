import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const focus = searchParams.get('focus');
    const where: any = {};
    if (focus && focus !== 'all') where.focusArea = focus;
    const modules = await prisma.emotionalModule.findMany({ where, orderBy: { focusArea: 'asc' } });
    const mapped = modules.map((m) => ({
      id: m.id,
      title: m.title,
      slug: m.slug,
      focus_area: m.focusArea,
      description: m.description,
      sufi_approach: m.sufiApproach,
      modern_psychology: m.modernPsychology,
      practices: m.practices,
      reflection_questions: m.reflectionQuestions,
      resources: m.resources,
    }));
    return NextResponse.json({ modules: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}
