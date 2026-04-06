import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const VALID_FREQUENCIES = new Set(['one_time', 'monthly', 'annual']);

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
  }
  try {
    const donations = await prisma.donation.findMany({
      where: { donorEmail: email.toLowerCase().trim() },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, amount: true, currency: true, frequency: true,
        donorName: true, donorEmail: true, transactionId: true,
        status: true, receiptUrl: true, createdAt: true,
      },
    });
    return NextResponse.json({ donations });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch donations.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, frequency, donorName, donorEmail, message } = body;

    const name = typeof donorName === 'string' ? donorName.trim() : '';
    if (!name || name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: 'A valid full name is required (2–120 characters).' }, { status: 400 });
    }

    const email = typeof donorEmail === 'string' ? donorEmail.trim().toLowerCase() : '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 1 || numericAmount > 1_000_000) {
      return NextResponse.json({ error: 'Amount must be between $1 and $1,000,000.' }, { status: 400 });
    }

    if (!VALID_FREQUENCIES.has(frequency)) {
      return NextResponse.json({ error: 'Invalid frequency.' }, { status: 400 });
    }

    const msg = typeof message === 'string' ? message.trim().slice(0, 1000) : null;
    const receiptRef = 'SSC-' + crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase();

    await prisma.donation.create({
      data: {
        amount: Math.round(numericAmount * 100) / 100,
        currency: 'usd',
        frequency,
        donorName: name,
        donorEmail: email,
        message: msg,
        transactionId: receiptRef,
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true, receiptRef });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
