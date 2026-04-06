import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assessment_id, result_json } = body;

    if (!assessment_id || !result_json) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await prisma.assessmentResult.create({
      data: {
        assessmentId: assessment_id,
        resultJson: result_json,
      },
    });

    return NextResponse.json({ id: result.id, success: true });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 });
  }
}
