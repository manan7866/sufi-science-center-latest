import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    const pathways = await prisma.guidancePathway.findMany({ orderBy: { title: 'asc' } });
    const mapped = pathways.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      target_audience: p.targetAudience,
      duration_weeks: p.durationWeeks,
      assessment_profile: p.assessmentProfile,
    }));
    return NextResponse.json({ pathways: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pathways' }, { status: 500 });
  }
}
