import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateOTP, getOTPExpiry } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Account is already verified. Please sign in.' },
        { status: 400 }
      );
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpiry },
    });

    // TODO: Send OTP email here using your email service
    console.log(`New OTP for ${user.email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'New OTP sent successfully.',
      // Remove OTP in production - only for development testing
      developmentOTP: otp,
    });
  } catch (error) {
    console.error('[RESEND OTP]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
