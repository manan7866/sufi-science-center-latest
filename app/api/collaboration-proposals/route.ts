import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
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
