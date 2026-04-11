import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.FORM_SUBMISSION);

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();
    const {
      name,
      email,
      affiliation,
      field_of_work,
      summary,
      themes,
      links,
      availability,
    } = body;

    if (!name || !email || !field_of_work || !summary) {
      return NextResponse.json(
        { error: 'Required fields missing: name, email, field_of_work, summary' },
        { status: 400 }
      );
    }

    const application = await prisma.interviewApplication.create({
      data: {
        userId: body.userId || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        affiliation: affiliation || null,
        fieldOfWork: field_of_work.trim(),
        summary: summary.trim(),
        themes: Array.isArray(themes) ? themes : [],
        links: Array.isArray(links) ? links : [],
        availability: typeof availability === 'string' ? availability : JSON.stringify(availability || {}),
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      id: application.id,
      message: 'Application submitted successfully.',
    });
  } catch (error) {
    console.error('[interview-applications POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
