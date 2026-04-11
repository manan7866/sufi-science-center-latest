import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { membershipStatusSchema } from '@/lib/validations';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.STATUS_CHECK);

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = membershipStatusSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Find all membership applications for this email
    const applications = await prisma.membershipApplication.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      applications: applications.map(app => ({
        id: app.id,
        membership_type: app.membershipType,
        status: app.status,
        full_name: app.fullName,
        email: app.email,
        affiliation: app.affiliation,
        areas_of_study: app.areasOfStudy || [],
        review_notes: app.reviewNotes,
        created_at: app.createdAt.toISOString(),
        updated_at: app.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('[MEMBERSHIP STATUS]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
