'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeProviderProps {
  children: ReactNode;
  clientSecret?: string;
}

export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  if (!clientSecret) {
    return <>{children}</>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#C8A75E',
        colorBackground: '#1C1F4A',
        colorText: '#F5F3EE',
        colorDanger: '#EF4444',
        fontFamily: 'inherit',
        borderRadius: '10px',
      },
      rules: {
        '.Input': {
          background: 'rgba(255,255,255,0.04)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          color: '#F5F3EE',
        },
        '.Input:focus': {
          border: '1.5px solid rgba(200,167,94,0.4)',
        },
        '.Label': {
          color: '#AAB0D6',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

export { stripePromise };