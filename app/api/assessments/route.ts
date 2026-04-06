import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Map assessment type to assessment slug
    const slugMap: Record<string, string> = {
      beginner: 'multi-dimensional-development',
      teaching: 'teaching-path-evaluation',
    };

    const slug = slugMap[type || 'beginner'] || 'multi-dimensional-development';

    const assessment = await prisma.assessment.findFirst({
      where: { slug, isActive: true },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    // Map to snake_case for frontend
    const mappedAssessment = {
      id: assessment.id,
      title: assessment.title,
      description: assessment.description,
      assessment_type: type || 'beginner',
      questions: assessment.questions.map((q) => ({
        id: q.id,
        dimension: q.dimension,
        question_text: q.questionText,
        weight: q.weight,
        order_index: q.orderIndex,
      })),
    };

    return NextResponse.json(mappedAssessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json({ error: 'Failed to fetch assessment' }, { status: 500 });
  }
}
