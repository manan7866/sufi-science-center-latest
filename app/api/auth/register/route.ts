import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, signUserToken, generateOTP, getOTPExpiry } from '@/lib/auth';

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

    // TODO: Send OTP email here using your email service
    // For now, we'll return the OTP in the response for development
    // In production, remove OTP from response and send via email
    console.log(`OTP for ${user.email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please verify your email with the OTP sent to you.',
      email: user.email,
      // Remove OTP in production - only for development testing
      developmentOTP: otp,
    });
  } catch (error) {
    console.error('[REGISTER]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
