import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      submission_type,
      title,
      abstract: abstractText,
      content,
      contact_name,
      contact_email,
      contact_affiliation,
    } = body;

    if (!submission_type || !title || !abstractText || !content || !contact_name || !contact_email) {
      return NextResponse.json(
        { error: 'Required fields missing. Please complete all required fields.' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        userId: body.userId || null,
        submissionType: submission_type,
        title: title.trim(),
        abstract: abstractText.trim(),
        content: content.trim(),
        contactName: contact_name.trim(),
        contactEmail: contact_email.trim().toLowerCase(),
        contactAffiliation: contact_affiliation?.trim() || null,
        status: 'submitted',
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: 'Submission received successfully.',
    });
  } catch (error) {
    console.error('[submissions POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
