import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations';

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  }
  return resendInstance;
}

const rateLimiter = createRateLimiter(RateLimits.CONTACT_FORM);
const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';

export async function POST(request: Request) {
  try {
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      );
    }

    const { fullName, email, enquiryType, subject, message } = validationResult.data;

    await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        enquiryType,
        subject,
        message,
      },
    });

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      template: {
        id: 'contact-confirmation',
        variables: {
          FULL_NAME: fullName,
          MESSAGE_SUBJECT: subject,
        },
      },
    });

    if (error) {
      console.error('[Contact] Confirmation email error:', error);
    } else {
      console.log(`[Contact] Confirmation email sent to ${email}:`, data?.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. You will receive a confirmation email shortly.',
    });
  } catch (error) {
    console.error('[CONTACT FORM]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
