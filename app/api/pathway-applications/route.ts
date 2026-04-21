import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { pathwayApplicationSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitization';

const rateLimiter = createRateLimiter(RateLimits.FORM_SUBMISSION);

export async function POST(req: NextRequest) {
  try {
    const rateLimitResult = await rateLimiter(req);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await req.json();

    const validationResult = pathwayApplicationSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    const validatedData = validationResult.data;

    const sanitizedData = {
      fullName: sanitizeInput(validatedData.fullName),
      email: sanitizeInput(validatedData.email),
      motivation: sanitizeInput(validatedData.motivation),
      phone: validatedData.phone ? sanitizeInput(validatedData.phone) : null,
      spiritualExperience: validatedData.spiritualExperience ? sanitizeInput(validatedData.spiritualExperience) : null,
      currentPractices: validatedData.currentPractices ? sanitizeInput(validatedData.currentPractices) : null,
      availableTimeWeekly: sanitizeInput(validatedData.availableTimeWeekly),
      preferredStartDate: validatedData.preferredStartDate || null,
      pathwayId: validatedData.pathwayId,
    };

    const existingApplication = await prisma.pathwayApplication.findFirst({
      where: { email: sanitizedData.email },
    });

    if (existingApplication) {
      return NextResponse.json({ error: 'You have already submitted a pathway application.' }, { status: 409 });
    }

    await prisma.pathwayApplication.create({
      data: {
        fullName: sanitizedData.fullName.slice(0, 200),
        email: sanitizedData.email.toLowerCase().trim(),
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[pathway-applications POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
