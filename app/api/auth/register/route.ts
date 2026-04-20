// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { hashPassword, signUserToken, generateOTP, getOTPExpiry } from '@/lib/auth';
// import { sendOTPVerificationEmail } from '@/lib/email';
// import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
// import { registerSchema } from '@/lib/validations';

// const prisma = new PrismaClient();
// const rateLimiter = createRateLimiter(RateLimits.AUTH_REGISTER);

// export async function POST(request: Request) {
//   try {
//     // Check rate limiting
//     const rateLimitResult = await rateLimiter(request);
//     if (!rateLimitResult.allowed) {
//       return rateLimitResult.response!;
//     }

//     const body = await request.json();

//     // Validate input with Zod
//     const validationResult = registerSchema.safeParse(body);
//     if (!validationResult.success) {
//       const errors = validationResult.error.errors.map(e => e.message).join(', ');
//       return NextResponse.json(
//         { error: errors },
//         { status: 400 }
//       );
//     }

//     const { name, email, password } = validationResult.data;

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'An account with this email already exists.' },
//         { status: 409 }
//       );
//     }

//     // Hash password and create user
//     const hashedPassword = await hashPassword(password);
//     const otp = generateOTP();
//     const otpExpiry = getOTPExpiry();

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         otp,
//         otpExpiry,
//         isVerified: false,
//       },
//     });

//     // Send OTP verification email via Resend
//     const emailResult = await sendOTPVerificationEmail(user.email, otp);

//     if (!emailResult.success) {
//       console.error('Failed to send OTP email:', emailResult.error);
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Account created successfully. Please verify your email with the OTP sent to you.',
//       email: user.email,
//     });
//   } catch (error) {
//     console.error('[REGISTER]', error);
//     return NextResponse.json(
//       { error: 'Something went wrong. Please try again later.' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, generateOTP, getOTPExpiry } from '@/lib/auth';
import { sendOTPVerificationEmail } from '@/lib/email';
import { registerSchema } from '@/lib/validations';

const prisma = new PrismaClient();


// ✅ In-memory rate limit store (per IP)
const RATE_LIMIT = 3; // max requests
const WINDOW_MS = 60 * 1000; // 1 minute

const ipStore = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(request: Request) {
  const now = Date.now();

  // ✅ Get real IP (important)
  let ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '';

  // ✅ fallback for dev (prevents all users becoming "same IP")
  if (!ip) {
    ip = Math.random().toString();
  }

  const record = ipStore.get(ip);

  if (!record) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }

  // reset window
  if (now - record.timestamp > WINDOW_MS) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Too many requests. Please try again after 1 minute.' },
        { status: 429 }
      ),
    };
  }

  record.count++;
  ipStore.set(ip, record);

  return { allowed: true };
}


export async function POST(request: Request) {
  try {
    // ✅ Apply rate limiting here
    const rate = checkRateLimit(request);
    if (!rate.allowed) return rate.response!;

    const body = await request.json();

    // ✅ Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const { name, email, password } = validationResult.data;

    // ✅ Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // ✅ Create user
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

    // ✅ Send email (non-blocking safe)
    try {
      await sendOTPVerificationEmail(user.email, otp);
    } catch (emailError) {
      console.error('Email failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please verify your email with the OTP sent to you.',
      email: user.email,
    });

  } catch (error) {
    console.error('[REGISTER ERROR]', error);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}