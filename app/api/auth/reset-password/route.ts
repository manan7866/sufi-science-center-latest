import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, isOTPExpired } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validations';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.AUTH_RESET_PASSWORD);

export async function POST(request: NextRequest) {
  try {
    const rateCheck = await rateLimiter(request);
    if (!rateCheck.allowed) {
      return rateCheck.response as NextResponse;
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const validation = resetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, otp, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json({ error: 'No OTP request found' }, { status: 400 });
    }

    if (isOTPExpired(user.otpExpiry)) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (user.password && comparePassword(password, user.password)) {
      return NextResponse.json(
        { error: 'Must be different from current password' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: {
        password: hashPassword(password),
        otp: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
