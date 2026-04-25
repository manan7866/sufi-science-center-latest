import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

const HANDLED_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'charge.refunded',
];

async function processPaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const receiptRef = paymentIntent.metadata?.receipt_ref;
  
  await prisma.donation.updateMany({
    where: { 
      OR: [
        { stripePaymentIntentId: paymentIntent.id },
        ...(receiptRef ? [{ transactionId: receiptRef }] : []),
      ],
    },
    data: {
      status: 'completed',
      receiptUrl: paymentIntent.id ? `https://dashboard.stripe.com/payments/${paymentIntent.id}` : null,
      completedAt: new Date(),
    },
  });

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: paymentIntent.id,
      eventType: 'payment_intent.succeeded',
      objectId: paymentIntent.id,
      payload: JSON.stringify({ id: paymentIntent.id, status: paymentIntent.status }),
      processed: true,
    },
  });
}

async function processPaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const receiptRef = paymentIntent.metadata?.receipt_ref;
  
  await prisma.donation.updateMany({
    where: { 
      OR: [
        { stripePaymentIntentId: paymentIntent.id },
        ...(receiptRef ? [{ transactionId: receiptRef }] : []),
      ],
    },
    data: { status: 'failed' },
  });

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: paymentIntent.id,
      eventType: 'payment_intent.payment_failed',
      objectId: paymentIntent.id,
      payload: JSON.stringify({ id: paymentIntent.id, status: paymentIntent.status }),
      processed: true,
    },
  });
}

async function processInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription?: string }).subscription;
  const customerId = (invoice as unknown as { customer?: string }).customer;
  const amountPaid = invoice.amount_paid / 100;

  if (subscriptionId) {
    const donation = await prisma.donation.findFirst({
      where: { stripePaymentIntentId: (invoice as unknown as { payment_intent?: string }).payment_intent },
    });

    if (donation) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: 'completed',
          amount: amountPaid,
          receiptUrl: invoice.hosted_invoice_url || invoice.invoice_pdf || null,
          completedAt: new Date(),
        },
      });
    }

    await prisma.donationSubscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: 'active',
        currentPeriodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : new Date(),
        currentPeriodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
      },
    });
  }

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: invoice.id,
      eventType: 'invoice.payment_succeeded',
      objectId: invoice.id,
      payload: JSON.stringify({ id: invoice.id, customer: invoice.customer, subscription: (invoice as unknown as { subscription?: string }).subscription, amount_paid: invoice.amount_paid }),
      processed: true,
    },
  });
}

async function processInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription?: string }).subscription;

  if (subscriptionId) {
    await prisma.donationSubscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: { status: 'past_due' },
    });
  }

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: invoice.id,
      eventType: 'invoice.payment_failed',
      objectId: invoice.id,
      payload: JSON.stringify({ id: invoice.id, customer: invoice.customer, subscription: (invoice as unknown as { subscription?: string }).subscription, amount_paid: invoice.amount_paid }),
      processed: true,
    },
  });
}

async function processSubscriptionCreated(subscription: Stripe.Subscription) {
  await prisma.donationSubscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'active' },
  });

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: subscription.id,
      eventType: 'customer.subscription.created',
      objectId: subscription.id,
      payload: JSON.stringify({ id: subscription.id, status: subscription.status, customer: subscription.customer }),
      processed: true,
    },
  });
}

async function processSubscriptionUpdated(subscription: Stripe.Subscription) {
  const updateData: { status?: string; cancelAtPeriodEnd?: boolean; canceledAt?: Date } = {};

  if (subscription.status === 'active') {
    updateData.status = 'active';
  } else if (subscription.status === 'past_due') {
    updateData.status = 'past_due';
  } else if (subscription.status === 'canceled') {
    updateData.status = 'canceled';
    updateData.canceledAt = new Date();
  } else if (subscription.cancel_at_period_end) {
    updateData.cancelAtPeriodEnd = true;
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.donationSubscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: updateData,
    });
  }

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: subscription.id,
      eventType: 'customer.subscription.updated',
      objectId: subscription.id,
      payload: JSON.stringify({ id: subscription.id, status: subscription.status, customer: subscription.customer }),
      processed: true,
    },
  });
}

async function processSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.donationSubscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'canceled', canceledAt: new Date() },
  });

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: subscription.id,
      eventType: 'customer.subscription.deleted',
      objectId: subscription.id,
      payload: JSON.stringify({ id: subscription.id, status: subscription.status, customer: subscription.customer }),
      processed: true,
    },
  });
}

async function processChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === 'string' 
    ? charge.payment_intent 
    : (charge.payment_intent as Stripe.PaymentIntent | undefined)?.id;

  if (paymentIntentId) {
    await prisma.donation.updateMany({
      where: { stripePaymentIntentId: paymentIntentId },
      data: { status: 'refunded' },
    });
  }

  await prisma.paymentEvent.create({
    data: {
      stripeEventId: charge.id,
      eventType: 'charge.refunded',
      objectId: charge.id,
      payload: JSON.stringify({ id: charge.id, amount: charge.amount, status: charge.status }),
      processed: true,
    },
  });
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' as const });
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  if (!HANDLED_EVENTS.includes(event.type)) {
    return NextResponse.json({ received: true, handled: false });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        await processPaymentIntentSucceeded(pi);
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        await processPaymentIntentFailed(pi);
        break;
      }
      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice;
        await processInvoicePaid(inv);
        break;
      }
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        await processInvoicePaymentFailed(inv);
        break;
      }
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        await processSubscriptionCreated(sub);
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await processSubscriptionUpdated(sub);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await processSubscriptionDeleted(sub);
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await processChargeRefunded(charge);
        break;
      }
    }

    return NextResponse.json({ received: true, handled: true });
  } catch (err) {
    console.error('[stripe-webhook] processing error:', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}