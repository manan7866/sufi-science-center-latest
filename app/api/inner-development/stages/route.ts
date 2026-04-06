import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    const stages = await prisma.transformationStage.findMany({ orderBy: { stageNumber: 'asc' } });
    const mapped = stages.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      arabic_name: s.arabicName,
      stage_number: s.stageNumber,
      category: s.category,
      description: s.description,
      characteristics: s.characteristics,
      practices_associated: s.practicesAssociated,
      classical_references: s.classicalReferences,
      challenges: s.challenges,
      signs_of_progress: s.signsOfProgress,
    }));
    return NextResponse.json({ stages: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stages' }, { status: 500 });
  }
}
