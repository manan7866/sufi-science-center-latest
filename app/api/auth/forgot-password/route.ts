import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateOTP, getOTPExpiry } from '@/lib/auth';
import { sendOTPVerificationEmail } from '@/lib/email';
import { forgotPasswordSchema } from '@/lib/validations';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';

const prisma = new PrismaClient();

const rateLimiter = createRateLimiter(RateLimits.AUTH_FORGOT_PASSWORD);

export async function POST(request: NextRequest) {
  try {
    const rateLimitCheck = await rateLimiter(request);
    
    if (!rateLimitCheck.allowed) {
      return rateLimitCheck.response || NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'This account uses Google sign-in. Please sign in with Google.' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry,
      },
    });

    try {
      await sendOTPVerificationEmail(email, otp);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset OTP sent to your email.',
      email,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
