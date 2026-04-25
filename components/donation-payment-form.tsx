'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

interface DonationPaymentFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function DonationPaymentForm({ onSuccess, onError }: DonationPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/support/thank-you`,
      },
      redirect: 'if_required',
    });

    if (error) {
      const errorMessage = error.message || 'Payment failed. Please try again.';
      setPaymentError(errorMessage);
      onError?.(errorMessage);
      setIsProcessing(false);
      return;
    }

    onSuccess?.();
    setIsProcessing(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <PaymentElement />
      </div>

      {paymentError && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#f87171',
          }}
        >
          {paymentError}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all"
        style={{
          background: !stripe || isProcessing ? 'rgba(200,167,94,0.5)' : '#C8A75E',
          color: '#0B0F2A',
          border: 'none',
          cursor: !stripe || isProcessing ? 'not-allowed' : 'pointer',
        }}
      >
        {isProcessing ? 'Processing...' : 'Donate Securely'}
      </button>
    </form>
  );
}