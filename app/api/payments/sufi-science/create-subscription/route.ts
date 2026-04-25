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
    const { amount, currency = 'usd', interval = 'month', donorName, email, donorEmail, phone, anonymous = false, message, sourcePage = '/support/donate' } = body;

    const name = typeof donorName === 'string' ? donorName.trim() : '';
    if (!name || name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: 'A valid full name is required (2–120 characters).' }, { status: 400 });
    }

    const emailStr = typeof (email || donorEmail) === 'string' ? (email || donorEmail).trim().toLowerCase() : '';
    if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr) || emailStr.length > 254) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 3 || numericAmount > 5000) {
      return NextResponse.json({ error: 'Amount must be between $3 and $5,000 per period.' }, { status: 400 });
    }

    if (interval !== 'month' && interval !== 'year') {
      return NextResponse.json({ error: 'Interval must be "month" or "year".' }, { status: 400 });
    }

    const amountCents = Math.round(numericAmount * 100);
    const receiptRef = `SSC-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`;
    const msg = typeof message === 'string' ? message.trim().slice(0, 500) : null;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' as const });

    let donor = await prisma.donor.findUnique({ where: { email: emailStr } });
    
    let stripeCustomerId: string | undefined;
    let stripeCustomer: Stripe.Customer | Stripe.DeletedCustomer | undefined;
    
    if (!donor || !donor.stripeCustomerId) {
      stripeCustomer = await stripe.customers.create({
        email: emailStr,
        name: anonymous ? 'Anonymous' : name,
        phone: phone || undefined,
        metadata: {
          platform: PLATFORM,
          domain: DOMAIN,
          project: PROJECT,
          billing_entity: BILLING_ENTITY,
        },
      });
      
      stripeCustomerId = stripeCustomer.id;
      
      if (!donor) {
        donor = await prisma.donor.create({
          data: {
            fullName: anonymous ? 'Anonymous' : name,
            email: emailStr,
            phone: phone || null,
            anonymous,
            stripeCustomerId,
          },
        });
      } else {
        await prisma.donor.update({
          where: { id: donor.id },
          data: { stripeCustomerId },
        });
      }
    } else {
      stripeCustomerId = donor.stripeCustomerId;
      
      await prisma.donor.update({
        where: { id: donor.id },
        data: {
          fullName: anonymous ? 'Anonymous' : name,
          phone: phone || donor.phone,
          anonymous,
        },
      });
    }

    const productName = interval === 'month' 
      ? `${PLATFORM} Monthly Support` 
      : `${PLATFORM} Annual Support`;
    const productDescription = `Recurring ${interval} contribution — processed by ${BILLING_ENTITY}`;

    const products = await stripe.products.list({ limit: 10, active: true });
    let product = products.data.find(p => p.name === productName);
    
    if (!product) {
      product = await stripe.products.create({
        name: productName,
        description: productDescription,
        metadata: {
          platform: PLATFORM,
          domain: DOMAIN,
          project: PROJECT,
          billing_entity: BILLING_ENTITY,
          product_type: 'donation',
        },
      });
    }

    const prices = await stripe.prices.list({ limit: 10, active: true, product: product.id });
    let price = prices.data.find(p => 
      p.unit_amount === amountCents && 
      p.recurring?.interval === interval
    );
    
    if (!price) {
      price = await stripe.prices.create({
        unit_amount: amountCents,
        currency: currency.toLowerCase(),
        recurring: { interval: interval as 'month' | 'year' },
        product: product.id,
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: price.id }],
      metadata: {
        platform: PLATFORM,
        domain: DOMAIN,
        project: PROJECT,
        page: sourcePage,
        billing_entity: BILLING_ENTITY,
        payment_type: 'monthly_donation',
        receipt_ref: receiptRef,
        donor_name: anonymous ? 'Anonymous' : name,
        donor_email: emailStr,
        ...(msg ? { message: msg } : {}),
      },
      description: `${interval === 'month' ? 'Monthly' : 'Annual'} contribution to ${PLATFORM}`,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    const latestInvoice = subscription.latest_invoice as unknown;
    const paymentIntent = latestInvoice && typeof latestInvoice === 'object' ? (latestInvoice as { payment_intent?: unknown }).payment_intent : undefined;

    await prisma.donationSubscription.create({
      data: {
        donorId: donor.id,
        amountCents,
        currency: currency.toLowerCase(),
        interval,
        status: 'pending',
        stripeSubscriptionId: subscription.id,
        stripeCustomerId,
        stripePriceId: price.id,
      },
    });

    await prisma.donation.create({
      data: {
        donorName: anonymous ? 'Anonymous' : name,
        donorEmail: emailStr,
        amount: numericAmount,
        currency: currency.toLowerCase(),
        frequency: interval === 'month' ? 'monthly' : 'annual',
        status: 'pending',
        processor: 'stripe',
        processingEntity: BILLING_ENTITY,
        transactionId: receiptRef,
        stripePaymentIntentId: paymentIntent && typeof paymentIntent === 'object' && 'id' in paymentIntent ? (paymentIntent as { id: string }).id : null,
        message: msg,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent && typeof paymentIntent === 'object' && 'client_secret' in paymentIntent ? (paymentIntent as { client_secret: string }).client_secret : null,
      subscriptionId: subscription.id,
      donationSubscriptionId: receiptRef,
    });
  } catch (err: unknown) {
    console.error('[create-subscription] error:', err);
    const message = err instanceof Error ? err.message : '';
    if (message.includes('Invalid API Key') || message.includes('No such') || message.includes('testmode')) {
      return NextResponse.json({ error: 'Payment processor is not yet configured. Please contact the administrator.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}