'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface DonationInfo {
  status: string;
  amount: number;
  currency: string;
  frequency: string;
  donor_name: string;
  donor_email: string;
  transaction_id: string;
  receipt_url: string | null;
}

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [donation, setDonation] = useState<DonationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    async function fetchDonation() {
      try {
        const res = await fetch(`/api/donation-status?session_id=${encodeURIComponent(sessionId!)}`, {
          cache: 'no-store',
        });
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        setDonation(data.donation ?? null);
        setPaid(data.donation?.status === 'paid' || data.donation?.status === 'completed');
      } catch {
      } finally {
        setLoading(false);
      }
    }

    fetchDonation();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F2A] flex items-center justify-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#AAB0D6' }}>
          <Clock style={{ width: '18px', height: '18px', opacity: 0.6 }} />
          <span style={{ fontSize: '13px' }}>Confirming your donation…</span>
        </div>
      </div>
    );
  }

  if (!sessionId || !donation) {
    return (
      <div className="min-h-screen bg-[#0B0F2A] flex items-center justify-center px-4">
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#AAB0D6', fontSize: '14px', marginBottom: '20px' }}>
            No payment information found.
          </p>
          <Link
            href="/support/donate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#C8A75E',
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            Return to Sufi Pay <ArrowRight style={{ width: '14px', height: '14px' }} />
          </Link>
        </div>
      </div>
    );
  }

  const frequencyLabel = donation.frequency === 'one_time' ? 'One-Time' : 'Monthly Recurring';
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: '#0B0F2A' }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div
          className="rounded-2xl shadow-2xl"
          style={{
            background: '#1C1F4A',
            padding: '36px 28px',
            border: paid
              ? '1px solid rgba(200,167,94,0.2)'
              : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C8A75E',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              Dr Kumar Foundation USA
            </p>
            <h1
              className="font-serif font-bold"
              style={{ fontSize: '22px', color: '#F5F3EE', letterSpacing: '0.02em', marginBottom: '2px' }}
            >
              Sufi Pay
            </h1>
            <p style={{ fontSize: '11px', color: 'rgba(170,176,214,0.5)', letterSpacing: '0.04em' }}>
              Branded for Dr Kumar Foundation USA
            </p>
          </div>

          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(200,167,94,0.2), transparent)',
              marginBottom: '28px',
            }}
          />

          {paid ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(200,167,94,0.08)',
                    border: '1.5px solid rgba(200,167,94,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 style={{ width: '28px', height: '28px', color: '#C8A75E' }} />
                </div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F5F3EE',
                    marginBottom: '6px',
                    fontFamily: 'inherit',
                  }}
                >
                  Payment Successful
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(170,176,214,0.6)', lineHeight: 1.6 }}>
                  Thank you{donation.donor_name && donation.donor_name !== 'Anonymous' ? `, ${donation.donor_name.split(' ')[0]}` : ''}. Your contribution has been received.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px',
                }}
              >
                {[
                  { label: 'Amount', value: `$${Number(donation.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD` },
                  { label: 'Reference ID', value: donation.transaction_id, mono: true },
                  { label: 'Type', value: frequencyLabel },
                  { label: 'Date', value: formattedDate },
                ].map(({ label, value, mono }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '7px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'rgba(170,176,214,0.55)' }}>{label}</span>
                    <span
                      style={{
                        fontSize: mono ? '11px' : '12px',
                        fontWeight: 600,
                        color: '#F5F3EE',
                        fontFamily: mono ? 'monospace' : 'inherit',
                        letterSpacing: mono ? '0.05em' : 'inherit',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  background: '#C8A75E',
                  color: '#0B0F2A',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '13px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Return Home
              </Link>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(170,176,214,0.06)',
                    border: '1.5px solid rgba(170,176,214,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Clock style={{ width: '26px', height: '26px', color: 'rgba(170,176,214,0.5)' }} />
                </div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F5F3EE',
                    marginBottom: '8px',
                  }}
                >
                  Payment Confirming
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(170,176,214,0.55)', lineHeight: 1.7 }}>
                  Your donation is being confirmed. Please check {donation.donor_email} for your receipt.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '10px', color: 'rgba(170,176,214,0.35)', marginBottom: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Reference
                </p>
                <p style={{ fontSize: '13px', fontFamily: 'monospace', color: '#F5F3EE', letterSpacing: '0.06em' }}>
                  {donation.transaction_id}
                </p>
              </div>

              <Link
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'transparent',
                  color: '#AAB0D6',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '13px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                Return Home
              </Link>
            </>
          )}

          <p
            style={{
              marginTop: '20px',
              fontSize: '10px',
              color: 'rgba(170,176,214,0.3)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Sufi Pay is a payment interface operated by PLS LLC USA on behalf of Dr Kumar Foundation USA. Payments are securely processed.
          </p>
        </div>
      </div>
    </div>
  );
}
