import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const VALID_FREQUENCIES = new Set(['one_time', 'monthly', 'annual']);
const PROCESSING_ENTITY = 'PLS LLC USA';

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
    const amountCents = Math.round(numericAmount * 100);
    const receiptRef = `SSC-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' as const });

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://sufisciencecenter.org';

    let sessionParams: Stripe.Checkout.SessionCreateParams;

    if (frequency === 'one_time') {
      sessionParams = {
        mode: 'payment',
        customer_email: email,
        line_items: [{
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: {
              name: 'Contribution to Sufi Science Center',
              description: `One-time contribution — processed by ${PROCESSING_ENTITY}`,
            },
          },
          quantity: 1,
        }],
        metadata: {
          receipt_ref: receiptRef,
          donor_name: name,
          frequency,
          ...(msg ? { message: msg.slice(0, 500) } : {}),
        },
        success_url: `${origin}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/support/donate`,
      };
    } else {
      const interval = frequency === 'monthly' ? 'month' : 'year';
      sessionParams = {
        mode: 'subscription',
        customer_email: email,
        line_items: [{
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            recurring: { interval },
            product_data: {
              name: `${frequency === 'monthly' ? 'Monthly' : 'Annual'} Contribution to Sufi Science Center`,
              description: `Recurring ${frequency} contribution — processed by ${PROCESSING_ENTITY}`,
            },
          },
          quantity: 1,
        }],
        metadata: {
          receipt_ref: receiptRef,
          donor_name: name,
          frequency,
          ...(msg ? { message: msg.slice(0, 500) } : {}),
        },
        success_url: `${origin}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/support/donate`,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    await prisma.donation.create({
      data: {
        amount: numericAmount,
        currency: 'usd',
        frequency,
        donorName: name,
        donorEmail: email,
        message: msg,
        transactionId: receiptRef,
        status: 'pending',
        processor: 'stripe',
        processingEntity: PROCESSING_ENTITY,
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('[create-checkout-session] error:', err);
    const message = err instanceof Error ? err.message : '';
    if (message.includes('Invalid API Key') || message.includes('No such') || message.includes('testmode')) {
      return NextResponse.json({ error: 'Payment processor is not yet configured. Please contact the administrator.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
