import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const BILLING_ENTITY = 'Prime Logic Solutions LLC';
const PLATFORM = 'Sufi Science Center';
const DOMAIN = 'sufisciencecenter.info';
const PROJECT = 'Sufi Science';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'usd', donorName, email, donorEmail, phone, country, address, anonymous = false, message, sourcePage = '/support/donate' } = body;

    const name = typeof donorName === 'string' ? donorName.trim() : '';
    if (!name || name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: 'A valid full name is required (2–120 characters).' }, { status: 400 });
    }

    const emailStr = typeof (email || donorEmail) === 'string' ? (email || donorEmail).trim().toLowerCase() : '';
    if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr) || emailStr.length > 254) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 5 || numericAmount > 5000) {
      return NextResponse.json({ error: 'Amount must be between $5 and $5,000.' }, { status: 400 });
    }

    const amountCents = Math.round(numericAmount * 100);
    const receiptRef = `SSC-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`;
    const msg = typeof message === 'string' ? message.trim().slice(0, 500) : null;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' as const });

    let donor = await prisma.donor.findUnique({ where: { email: emailStr } });
    
    let stripeCustomerId: string | undefined;
    
    if (!donor) {
      const customer = await stripe.customers.create({
        email: emailStr,
        name: anonymous ? 'Anonymous' : name,
        phone: phone || undefined,
        address: address ? {
          line1: address.line1 || undefined,
          city: address.city || undefined,
          state: address.state || undefined,
          postal_code: address.postal_code || undefined,
          country: address.country || country || undefined,
        } : country ? { country } : undefined,
        metadata: {
          platform: PLATFORM,
          domain: DOMAIN,
          project: PROJECT,
          billing_entity: BILLING_ENTITY,
        },
      });
      
      stripeCustomerId = customer.id;
      
      donor = await prisma.donor.create({
        data: {
          fullName: anonymous ? 'Anonymous' : name,
          email: emailStr,
          phone: phone || null,
          country: country || null,
          addressLine1: address?.line1 || null,
          city: address?.city || null,
          state: address?.state || null,
          postalCode: address?.postal_code || null,
          anonymous,
          stripeCustomerId,
        },
      });
    } else {
      stripeCustomerId = donor.stripeCustomerId || undefined;
      
      await prisma.donor.update({
        where: { id: donor.id },
        data: {
          fullName: anonymous ? 'Anonymous' : (name || donor.fullName),
          phone: phone || donor.phone,
          country: country || donor.country,
          addressLine1: address?.line1 || donor.addressLine1,
          city: address?.city || donor.city,
          state: address?.state || donor.state,
          postalCode: address?.postal_code || donor.postalCode,
          anonymous,
        },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: currency.toLowerCase(),
      customer: stripeCustomerId,
      metadata: {
        platform: PLATFORM,
        domain: DOMAIN,
        project: PROJECT,
        page: sourcePage,
        billing_entity: BILLING_ENTITY,
        payment_type: 'one_time_donation',
        receipt_ref: receiptRef,
        donor_name: anonymous ? 'Anonymous' : name,
        donor_email: emailStr,
        ...(msg ? { message: msg } : {}),
      },
      description: `One-time contribution to ${PLATFORM}`,
    });

    await prisma.donation.create({
      data: {
        donorName: anonymous ? 'Anonymous' : name,
        donorEmail: emailStr,
        amount: numericAmount,
        currency: currency.toLowerCase(),
        frequency: 'one_time',
        status: 'pending',
        processor: 'stripe',
        processingEntity: BILLING_ENTITY,
        transactionId: receiptRef,
        stripePaymentIntentId: paymentIntent.id,
        message: msg,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      donationId: receiptRef,
    });
  } catch (err: unknown) {
    console.error('[create-payment-intent] error:', err);
    const message = err instanceof Error ? err.message : '';
    if (message.includes('Invalid API Key') || message.includes('No such') || message.includes('testmode')) {
      return NextResponse.json({ error: 'Payment processor is not yet configured. Please contact the administrator.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}