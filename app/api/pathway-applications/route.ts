import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
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
