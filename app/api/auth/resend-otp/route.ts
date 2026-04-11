import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateOTP, getOTPExpiry } from '@/lib/auth';
import { sendOTPVerificationEmail } from '@/lib/email';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { resendOtpSchema } from '@/lib/validations';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.AUTH_RESEND_OTP);

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = resendOtpSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
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

    // Send OTP email via Resend
    const emailResult = await sendOTPVerificationEmail(user.email, otp);

    if (!emailResult.success) {
      console.error('Failed to resend OTP email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send OTP email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'New OTP sent successfully.',
    });
  } catch (error) {
    console.error('[RESEND OTP]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
