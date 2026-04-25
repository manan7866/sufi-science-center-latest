'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, Database, ShieldCheck, ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CHIPS = [25, 50, 100, 250];
const MONTHLY_CHIPS = [5, 10, 25, 50];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError('');

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/support/thank-you`,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setIsProcessing(false);
      return;
    }

    setSuccess(true);
    setIsProcessing(false);
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-[#C8A75E] text-lg mb-2">Thank you!</div>
        <p className="text-[#AAB0D6] text-sm">Your donation has been processed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <PaymentElement />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
          {error}
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

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [amountInput, setAmountInput] = useState('100');
  const [activeChip, setActiveChip] = useState<number | 'custom'>(100);
  const [monthlyChip, setMonthlyChip] = useState<number>(25);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [note, setNote] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  function selectChip(val: number | 'custom') {
    setActiveChip(val);
    if (val !== 'custom') setAmountInput(String(val));
  }

  function selectMonthlyChip(val: number) {
    setMonthlyChip(val);
    setAmountInput(String(val));
  }

  function handleAmountChange(v: string) {
    setAmountInput(v);
    const n = parseFloat(v);
    if (CHIPS.includes(n)) {
      setActiveChip(n);
    } else if (!MONTHLY_CHIPS.includes(n)) {
      setActiveChip('custom');
    }
  }

  const numericAmount = parseFloat(amountInput) || 0;
  const amountValid = frequency === 'one_time' 
    ? numericAmount >= 5 && numericAmount <= 5000
    : numericAmount >= 3 && numericAmount <= 5000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!amountValid) {
      setError(frequency === 'one_time' ? 'Minimum $5, maximum $5,000.' : 'Minimum $3, maximum $5,000.');
      return;
    }
    if (!donorEmail.trim()) {
      setError('An email address is required.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the terms and conditions.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = frequency === 'one_time' 
        ? '/api/payments/sufi-science/create-payment-intent'
        : '/api/payments/sufi-science/create-subscription';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericAmount,
          frequency,
          interval: frequency === 'monthly' ? 'month' : 'one_time',
          donorName: anonymous ? 'Anonymous' : (donorName.trim() || 'Anonymous'),
          donorEmail: donorEmail.trim(),
          message: note.trim() || undefined,
          anonymous,
          sourcePage: '/support/donate',
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'An error occurred. Please try again.');
        return;
      }

      setClientSecret(data.clientSecret);
    } catch {
      setError('Unable to reach payment processor.');
    } finally {
      setLoading(false);
    }
  }

  if (clientSecret) {
    return (
      <div className="min-h-screen pt-20 bg-[#0B0F2A]">
        <ObservatoryHero
          subtitle="Secure Payment"
          title="Complete Your"
          title2='Contribution'
          description="Enter your payment details below."
        />

        <section className="py-16 px-4 observatory-gradient">
          <div className="max-w-lg mx-auto">
            <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)]">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
              </Elements>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Support the Mission"
        title="Support the Continuity of"
        title2='Sufi Scientific Inquiry'
        description="Your contribution sustains research, dialogue, and knowledge preservation."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/support" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Support
          </Link>
        </div>
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)]">
              <BookOpen className="h-10 w-10 text-[#C8A75E] mb-4" />
              <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Research Development</h3>
              <p className="text-sm text-[#AAB0D6]">
                Supporting structured inquiry into consciousness, transformation, and Sufi wisdom.
              </p>
            </Card>
            <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)]">
              <Database className="h-10 w-10 text-[#C8A75E] mb-4" />
              <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Knowledge Preservation</h3>
              <p className="text-sm text-[#AAB0D6]">
                Maintaining archives, lineages, and historical documentation for future generations.
              </p>
            </Card>
            <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)]">
              <MessageSquare className="h-10 w-10 text-[#C8A75E] mb-4" />
              <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Dialogue and Scholarship</h3>
              <p className="text-sm text-[#AAB0D6]">
                Facilitating conversations between scholars, practitioners, and researchers.
              </p>
            </Card>
            <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)]">
              <Users className="h-10 w-10 text-[#C8A75E] mb-4" />
              <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Digital Infrastructure</h3>
              <p className="text-sm text-[#AAB0D6]">
                Building and maintaining platforms for knowledge access and assessment tools.
              </p>
            </Card>
          </div>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)] mb-16">
            <h3 className="text-xl font-bold text-[#F5F3EE] mb-4">Transparency Statement</h3>
            <p className="text-[#AAB0D6] leading-relaxed">
              Sufi Science Center operates as an initiative of Dr. Kumar Foundation USA and is
              supported through sponsorship and voluntary contributions. All research remains
              editorially independent. Contributions support ongoing operations, research
              development, and knowledge infrastructure.
            </p>
          </Card>

          <div className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '420px' }}>
              <form onSubmit={handleSubmit}>
                <div
                  className="rounded-2xl shadow-2xl"
                  style={{
                    background: '#1C1F4A',
                    padding: '28px',
                    border: '1px solid rgba(200,167,94,0.15)',
                  }}
                >
                  <div className="text-center mb-6">
                    <p
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontVariant: 'small-caps',
                        color: '#C8A75E',
                        marginBottom: '10px',
                        fontWeight: 600,
                      }}
                    >
                      Dr Kumar Foundation USA
                    </p>
                    <h2
                      className="font-serif font-bold"
                      style={{ fontSize: '26px', color: '#F5F3EE', letterSpacing: '0.02em', lineHeight: 1.2 }}
                    >
                      Sufi Pay
                    </h2>
                    <p style={{ fontSize: '12px', color: '#AAB0D6', marginTop: '4px', letterSpacing: '0.05em' }}>
                      Secure Spiritual Giving
                    </p>
                  </div>

                  <div
                    style={{
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, rgba(200,167,94,0.25), transparent)',
                      marginBottom: '24px',
                    }}
                  />

                  <div className="mb-5">
                    <div className="relative flex items-center justify-center">
                      <span
                        style={{
                          position: 'absolute',
                          left: '16px',
                          fontSize: '22px',
                          color: '#C8A75E',
                          fontWeight: 700,
                          lineHeight: 1,
                          pointerEvents: 'none',
                        }}
                      >
                        $
                      </span>
                      <input
                        type="number"
                        value={amountInput}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        min={frequency === 'one_time' ? 5 : 3}
                        max={5000}
                        step="1"
                        required
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1.5px solid rgba(200,167,94,0.25)',
                          borderRadius: '12px',
                          padding: '16px 16px 16px 40px',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: '#F5F3EE',
                          textAlign: 'left',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#C8A75E')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,167,94,0.25)')}
                      />
                    </div>

                    <div className="flex gap-2 mt-3">
                      {(frequency === 'one_time' ? CHIPS : MONTHLY_CHIPS).map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => frequency === 'one_time' ? selectChip(chip) : selectMonthlyChip(chip)}
                          style={{
                            flex: 1,
                            padding: '7px 0',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: (frequency === 'one_time' ? activeChip : monthlyChip) === chip ? 'none' : '1.5px solid rgba(200,167,94,0.2)',
                            background: (frequency === 'one_time' ? activeChip : monthlyChip) === chip ? '#C8A75E' : 'transparent',
                            color: (frequency === 'one_time' ? activeChip : monthlyChip) === chip ? '#0B0F2A' : '#AAB0D6',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          ${chip}{frequency === 'monthly' && '/mo'}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => selectChip('custom')}
                        style={{
                          flex: 1,
                          padding: '7px 0',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: activeChip === 'custom' ? 'none' : '1.5px solid rgba(200,167,94,0.2)',
                          background: activeChip === 'custom' ? '#C8A75E' : 'transparent',
                          color: activeChip === 'custom' ? '#0B0F2A' : '#AAB0D6',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Custom
                      </button>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p style={{ fontSize: '11px', color: '#AAB0D6', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                      Donation Type
                    </p>
                    <div className="flex gap-3">
                      {(['one_time', 'monthly'] as const).map((f) => {
                        const active = frequency === f;
                        return (
                          <button
                            key={f}
                            type="button"
                            onClick={() => {
                              setFrequency(f);
                              if (f === 'monthly') {
                                setAmountInput(String(monthlyChip));
                              } else {
                                setAmountInput(String(activeChip === 'custom' ? 100 : activeChip));
                              }
                            }}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: active ? '1.5px solid rgba(200,167,94,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                              background: active ? 'rgba(200,167,94,0.08)' : 'transparent',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span
                              style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                border: active ? '4px solid #C8A75E' : '1.5px solid rgba(200,167,94,0.4)',
                                background: 'transparent',
                                flexShrink: 0,
                                transition: 'all 0.15s ease',
                              }}
                            />
                            <span style={{ fontSize: '13px', fontWeight: 600, color: active ? '#F5F3EE' : '#AAB0D6' }}>
                              {f === 'one_time' ? 'One-Time' : 'Monthly'}
                            </span>
                            {f === 'monthly' && active && (
                              <span
                                style={{
                                  marginLeft: 'auto',
                                  fontSize: '9px',
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                  background: 'rgba(200,167,94,0.15)',
                                  border: '1px solid rgba(200,167,94,0.3)',
                                  color: '#C8A75E',
                                  padding: '2px 7px',
                                  borderRadius: '20px',
                                  fontWeight: 700,
                                }}
                              >
                                Recurring
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-5 space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Name (optional)"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        disabled={anonymous}
                        style={{
                          width: '100%',
                          background: anonymous ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                          border: '1.5px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          padding: '11px 14px',
                          fontSize: '13px',
                          color: '#F5F3EE',
                          outline: 'none',
                          transition: 'border-color 0.2s, opacity 0.2s',
                          opacity: anonymous ? 0.4 : 1,
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => { if (!anonymous) e.currentTarget.style.borderColor = 'rgba(200,167,94,0.4)'; }}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1.5px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          padding: '11px 14px',
                          fontSize: '13px',
                          color: '#F5F3EE',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,167,94,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Message (optional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1.5px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          padding: '11px 14px',
                          fontSize: '13px',
                          color: '#F5F3EE',
                          outline: 'none',
                          resize: 'none',
                          transition: 'border-color 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,167,94,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <span
                        onClick={() => setAnonymous((v) => !v)}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '5px',
                          border: anonymous ? 'none' : '1.5px solid rgba(200,167,94,0.3)',
                          background: anonymous ? '#C8A75E' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.15s',
                          cursor: 'pointer',
                        }}
                      >
                        {anonymous && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#0B0F2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span style={{ fontSize: '12px', color: '#AAB0D6' }}>Donate anonymously</span>
                    </label>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 0 16px' }} />

                  <div className="mb-5 space-y-2">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(170,176,214,0.6)' }}>Amount</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F5F3EE' }}>
                        ${amountValid ? numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(170,176,214,0.6)' }}>Type</span>
                      <span style={{ fontSize: '12px', color: '#AAB0D6' }}>{frequency === 'one_time' ? 'One-Time' : 'Monthly Recurring'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(170,176,214,0.6)' }}>Processing</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(170,176,214,0.5)' }}>
                        <ShieldCheck style={{ width: '12px', height: '12px' }} />
                        Secure
                      </span>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F5F3EE' }}>Total</span>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#C8A75E' }}>
                        ${amountValid ? numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}{frequency === 'monthly' && <span style={{ fontSize: '11px', fontWeight: 400 }}>/mo</span>}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(200,167,94,0.1)',
                      borderRadius: '10px',
                      padding: '12px',
                      marginBottom: '14px',
                    }}
                  >
                    <p style={{ fontSize: '11px', color: '#AAB0D6', lineHeight: 1.5 }}>
                      Payments are securely processed by Prime Logic Solutions LLC, the registered billing and payment operations entity for Sufi Science Center.
                    </p>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '16px' }}>
                    <span
                      onClick={() => setTermsAccepted((v) => !v)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '5px',
                        border: termsAccepted ? 'none' : '1.5px solid rgba(200,167,94,0.3)',
                        background: termsAccepted ? '#C8A75E' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                        transition: 'all 0.15s',
                        cursor: 'pointer',
                      }}
                    >
                      {termsAccepted && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#0B0F2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span style={{ fontSize: '11px', color: '#AAB0D6', lineHeight: 1.5 }}>
                      I agree to the Terms, Privacy Policy, and Refund/Cancellation Policy.
                    </span>
                  </label>

                  {error && (
                    <div
                      style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        marginBottom: '14px',
                        fontSize: '12px',
                        color: '#f87171',
                        lineHeight: 1.5,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !amountValid || !termsAccepted}
                    style={{
                      width: '100%',
                      background: loading || !amountValid || !termsAccepted ? 'rgba(200,167,94,0.5)' : '#C8A75E',
                      color: '#0B0F2A',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      cursor: loading || !amountValid || !termsAccepted ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    {loading ? 'Processing...' : frequency === 'one_time' ? 'Donate Securely' : 'Start Monthly Support'}
                  </button>

                  <p
                    style={{
                      marginTop: '14px',
                      fontSize: '10px',
                      color: 'rgba(170,176,214,0.35)',
                      textAlign: 'center',
                      lineHeight: 1.6,
                    }}
                  >
                    Sufi Pay is a payment interface operated by PLS LLC USA on behalf of Dr Kumar Foundation USA. Payments are securely processed.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}