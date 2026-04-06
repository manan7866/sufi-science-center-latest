import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roleType, fullName, email, skillsText, motivationText } = body;

    if (!roleType || !fullName || !email || !skillsText || !motivationText) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    await prisma.volunteerApplication.create({
      data: {
        roleType,
        fullName: fullName.slice(0, 200),
        email: email.toLowerCase().trim(),
        skillsJson: { skills_text: skillsText },
        motivationText: motivationText.slice(0, 5000),
        status: 'submitted',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[volunteer-applications POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
