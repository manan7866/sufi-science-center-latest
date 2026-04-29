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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    
    if (!userId && !email) {
      return NextResponse.json(
        { error: 'User ID or email is required.' },
        { status: 400 }
      );
    }

    const where = userId ? { userId } : { email: email?.toLowerCase() };

    const applications = await prisma.interviewApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        affiliation: true,
        fieldOfWork: true,
        summary: true,
        themes: true,
        links: true,
        availability: true,
        status: true,
        adminNotes: true,
        scheduledAt: true,
        scheduledTime: true,
        videoLink: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('[interview-applications GET]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
