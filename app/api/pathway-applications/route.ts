import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      pathwayId, fullName, email, phone, motivation,
      spiritualExperience, currentPractices, availableTimeWeekly, preferredStartDate,
    } = body;

    if (!fullName || !email || !motivation || !availableTimeWeekly) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    await prisma.pathwayApplication.create({
      data: {
        pathwayId: pathwayId ?? null,
        fullName: fullName.slice(0, 200),
        email: email.toLowerCase().trim(),
        phone: phone ?? null,
        motivation: motivation.slice(0, 5000),
        spiritualExperience: spiritualExperience ?? null,
        currentPractices: currentPractices ?? null,
        availableTimeWeekly: availableTimeWeekly.slice(0, 200),
        preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : null,
        status: 'submitted',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[pathway-applications POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
