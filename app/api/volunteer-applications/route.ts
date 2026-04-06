import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      roleType,
      fullName,
      email,
      skillsText,
      motivationText,
    } = body;

    if (!roleType || !fullName || !email || !skillsText || !motivationText) {
      return NextResponse.json(
        { error: 'Required fields missing. Please complete all fields.' },
        { status: 400 }
      );
    }

    const application = await prisma.volunteerApplication.create({
      data: {
        roleType: roleType.trim(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        skillsText: skillsText.trim(),
        motivationText: motivationText.trim(),
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      id: application.id,
      message: 'Volunteer application submitted successfully.',
    });
  } catch (error) {
    console.error('[volunteer-applications POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
