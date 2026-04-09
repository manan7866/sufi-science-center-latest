import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, signUserToken, generateOTP, getOTPExpiry } from '@/lib/auth';
import { sendOTPVerificationEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
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
        name: name.trim(),
        email: email.toLowerCase().trim(),
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
