import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const result = await prisma.assessmentResult.findUnique({
      where: { id },
      include: {
        assessment: true,
      },
    });

    if (!result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    const mappedResult = {
      id: result.id,
      assessment_id: result.assessmentId,
      result_json: result.resultJson,
      created_at: result.createdAt,
      assessment: {
        id: result.assessment.id,
        title: result.assessment.title,
        description: result.assessment.description,
      },
    };

    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
