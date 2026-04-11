import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';

const rateLimiter = createRateLimiter(RateLimits.FORM_SUBMISSION);

export async function POST(req: NextRequest) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(req);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await req.json();
    const { fullName, email } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    await prisma.pathwayApplication.create({
      data: {
        fullName: fullName.slice(0, 200),
        email: email.toLowerCase().trim(),
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[pathway-applications POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
