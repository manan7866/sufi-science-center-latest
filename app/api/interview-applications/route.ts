import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
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
        name: name.trim(),
        email: email.trim().toLowerCase(),
        affiliation: affiliation?.trim() || null,
        fieldOfWork: field_of_work.trim(),
        summary: summary.trim(),
        themes: Array.isArray(themes) ? themes : [],
        links: Array.isArray(links) ? links : [],
        availability: availability ? { text: availability } : {},
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
