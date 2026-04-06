import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const SESSION_ID_RE = /^cs_(test|live)_[a-zA-Z0-9_]+$/;

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId || !SESSION_ID_RE.test(sessionId)) {
    return NextResponse.json({ error: 'Invalid session_id.' }, { status: 400 });
  }

  try {
    const donation = await prisma.donation.findFirst({
      where: { stripeSessionId: sessionId },
      select: {
        status: true,
        amount: true,
        currency: true,
        frequency: true,
        donorName: true,
        donorEmail: true,
        transactionId: true,
        receiptUrl: true,
      },
    });

    return NextResponse.json({ donation });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
