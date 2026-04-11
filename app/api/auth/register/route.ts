import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, signUserToken, generateOTP, getOTPExpiry } from '@/lib/auth';
import { sendOTPVerificationEmail } from '@/lib/email';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { registerSchema } from '@/lib/validations';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.AUTH_REGISTER);

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false,
      },
    });

    // Send OTP verification email via Resend
    const emailResult = await sendOTPVerificationEmail(user.email, otp);

    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please verify your email with the OTP sent to you.',
      email: user.email,
    });
  } catch (error) {
    console.error('[REGISTER]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
