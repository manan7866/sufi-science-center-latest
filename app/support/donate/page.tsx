'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, Database, ShieldCheck, ArrowLeft } from 'lucide-react';

const CHIPS = [25, 50, 100, 250];

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [amountInput, setAmountInput] = useState('100');
  const [activeChip, setActiveChip] = useState<number | 'custom'>(100);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [note, setNote] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function selectChip(val: number | 'custom') {
    setActiveChip(val);
    if (val !== 'custom') setAmountInput(String(val));
  }

  function handleAmountChange(v: string) {
    setAmountInput(v);
    const n = parseFloat(v);
    if (CHIPS.includes(n)) {
      setActiveChip(n);
    } else {
      setActiveChip('custom');
    }
  }

  const numericAmount = parseFloat(amountInput) || 0;
  const amountValid = numericAmount >= 5 && numericAmount <= 25000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!amountValid) {
      setError('Please enter an amount between $5 and $25,000.');
      return;
    }
    if (!donorEmail.trim()) {
      setError('An email address is required to process your donation.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericAmount,
          frequency,
          donorName: anonymous ? 'Anonymous' : (donorName.trim() || 'Anonymous'),
          donorEmail: donorEmail.trim(),
          message: note.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'An error occurred. Please try again.');
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Unable to reach payment processor. Please try again.');
    } finally {
      setLoading(false);
    }
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
                        min={5}
                        max={25000}
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
                      {CHIPS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => selectChip(chip)}
                          style={{
                            flex: 1,
                            padding: '7px 0',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: activeChip === chip ? 'none' : '1.5px solid rgba(200,167,94,0.2)',
                            background: activeChip === chip ? '#C8A75E' : 'transparent',
                            color: activeChip === chip ? '#0B0F2A' : '#AAB0D6',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          ${chip}
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
                            onClick={() => setFrequency(f)}
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
                        placeholder="Note (optional)"
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

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                    >
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

                  <div
                    style={{
                      height: '1px',
                      background: 'rgba(255,255,255,0.06)',
                      margin: '0 0 16px',
                    }}
                  />

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
                    <div
                      style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        margin: '4px 0',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F5F3EE' }}>Total</span>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#C8A75E' }}>
                        ${amountValid ? numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                      </span>
                    </div>
                  </div>

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
                    disabled={loading || !amountValid}
                    style={{
                      width: '100%',
                      background: loading || !amountValid ? 'rgba(200,167,94,0.5)' : '#C8A75E',
                      color: '#0B0F2A',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      cursor: loading || !amountValid ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {loading ? 'Securing your donation…' : 'Donate Securely'}
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
