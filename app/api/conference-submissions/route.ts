import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SSC-2026-${code}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      submissionType,
      title,
      abstract: abstractText,
      keywords,
      presenterName,
      presenterEmail,
      presenterAffiliation,
      presenterBio,
      coPresenters,
      fileName,
      fileSizeBytes,
    } = body;

    if (!submissionType || !title || !abstractText || !presenterName || !presenterEmail || !presenterAffiliation) {
      return NextResponse.json(
        { error: 'Required fields missing. Please complete all sections.' },
        { status: 400 }
      );
    }

    let trackingCode: string;
    let unique = false;
    while (!unique) {
      trackingCode = generateTrackingCode();
      const existing = await prisma.conferenceSubmission.findUnique({
        where: { trackingCode },
      });
      if (!existing) unique = true;
    }

    const submission = await prisma.conferenceSubmission.create({
      data: {
        trackingCode,
        submissionType,
        title,
        abstract: abstractText,
        keywords: keywords || null,
        presenterName,
        presenterEmail: presenterEmail.toLowerCase().trim(),
        presenterAffiliation,
        presenterBio,
        coPresenters: coPresenters || [],
        fileName: fileName || null,
        fileSizeBytes: fileSizeBytes || null,
        status: 'submitted',
      },
    });

    return NextResponse.json({
      success: true,
      trackingCode: submission.trackingCode,
      message: 'Conference submission created successfully.',
    });
  } catch (error) {
    console.error('[conference-submissions POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingCode = searchParams.get('trackingCode');
    const email = searchParams.get('email');

    if (!trackingCode || !email) {
      return NextResponse.json(
        { error: 'Both tracking code and email are required.' },
        { status: 400 }
      );
    }

    const submission = await prisma.conferenceSubmission.findFirst({
      where: {
        trackingCode,
        presenterEmail: email.toLowerCase().trim(),
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'No submission found matching the provided tracking code and email.' },
        { status: 404 }
      );
    }

    const mapped = {
      id: submission.id,
      tracking_code: submission.trackingCode,
      submission_type: submission.submissionType,
      title: submission.title,
      abstract: submission.abstract,
      presenter_name: submission.presenterName,
      presenter_email: submission.presenterEmail,
      presenter_affiliation: submission.presenterAffiliation,
      status: submission.status,
      admin_notes: submission.adminNotes,
      reviewer_decision: submission.reviewerDecision,
      submitted_at: submission.submittedAt?.toISOString(),
      updated_at: submission.updatedAt?.toISOString(),
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('[conference-submissions GET]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
