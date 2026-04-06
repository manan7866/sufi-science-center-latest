import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      programId, fullName, email, phone, backgroundSummary,
      spiritualGoals, relevantExperience, whyThisProgram,
      commitmentLevel, availability, previousMentorshipExperience,
    } = body;

    if (!fullName || !email || !backgroundSummary || !spiritualGoals || !whyThisProgram || !commitmentLevel || !availability) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    await prisma.mentorshipApplication.create({
      data: {
        programId: programId ?? null,
        fullName: fullName.slice(0, 200),
        email: email.toLowerCase().trim(),
        phone: phone ?? null,
        backgroundSummary: backgroundSummary.slice(0, 5000),
        spiritualGoals: spiritualGoals.slice(0, 5000),
        relevantExperience: relevantExperience ?? null,
        whyThisProgram: whyThisProgram.slice(0, 5000),
        commitmentLevel: commitmentLevel.slice(0, 200),
        availability: availability.slice(0, 200),
        previousMentorshipExperience: previousMentorshipExperience ?? null,
        status: 'submitted',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[mentorship-applications POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
