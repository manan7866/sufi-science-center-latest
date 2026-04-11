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
      organizationType,
      organizationName,
      contactName,
      contactEmail,
      contactPhone,
      collaborationType,
      proposalSummary,
      proposalDetails,
      scope,
      timeline,
    } = body;

    if (!organizationType || !organizationName || !contactName || !contactEmail ||
        !collaborationType || !proposalSummary || !proposalDetails || !scope || !timeline) {
      return NextResponse.json(
        { error: 'Required fields missing. Please complete all sections.' },
        { status: 400 }
      );
    }

    const proposal = await prisma.collaborationProposal.create({
      data: {
        userId: body.userId || null,
        organizationType: organizationType.trim(),
        organizationName: organizationName.trim(),
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim().toLowerCase(),
        contactPhone: contactPhone?.trim() || null,
        collaborationType: collaborationType.trim(),
        proposalSummary: proposalSummary.trim(),
        proposalDetails: proposalDetails.trim(),
        scope: scope.trim(),
        timeline: timeline.trim(),
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      id: proposal.id,
      message: 'Collaboration proposal submitted successfully.',
    });
  } catch (error) {
    console.error('[collaboration-proposals POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
