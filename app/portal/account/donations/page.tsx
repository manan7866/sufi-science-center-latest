'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Receipt, HandHeart, Loader as Loader2, RefreshCw, ExternalLink, CircleAlert as AlertCircle } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  frequency: string;
  donorName: string;
  donorEmail: string;
  transactionId: string;
  status: string;
  receiptUrl: string | null;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  completed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  paid: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  failed: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  refunded: 'text-[#AAB0D6]/60 bg-white/4 border-white/10',
};

const FREQ_LABELS: Record<string, string> = {
  one_time: 'One-Time',
  monthly: 'Monthly',
  annual: 'Annual',
};

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [changingEmail, setChangingEmail] = useState(false);

  const fetchByEmail = useCallback(async (emailAddr: string) => {
    if (!emailAddr) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/donations?email=${encodeURIComponent(emailAddr.toLowerCase().trim())}`);
      if (!res.ok) throw new Error('Failed to load donation history.');
      const data = await res.json();
      setDonations(data.donations || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load donation history.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('ssc_donor_email');
    if (stored) {
      setEmail(stored);
      setEmailInput(stored);
      fetchByEmail(stored);
    } else {
      setLoading(false);
    }
  }, [fetchByEmail]);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed) return;
    localStorage.setItem('ssc_donor_email', trimmed);
    setEmail(trimmed);
    setChangingEmail(false);
    fetchByEmail(trimmed);
  }

  const totalGiven = donations
    .filter((d) => d.status === 'completed' || d.status === 'paid')
    .reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-[#6B9BD1]" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Donation History</h1>
            <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Your contribution records and receipts</p>
          </div>
        </div>
        {email && !changingEmail && (
          <button
            onClick={() => setChangingEmail(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 text-[#AAB0D6]/50 text-xs hover:text-[#AAB0D6] hover:bg-white/4 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            Change Email
          </button>
        )}
      </div>

      {(!email || changingEmail) && (
        <div className="glass-panel rounded-2xl border border-white/8 p-6 mb-6">
          <p className="text-xs text-[#AAB0D6]/60 mb-3 leading-relaxed">
            Enter the email address you used when donating to look up your contribution history.
          </p>
          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="donor@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0A0C14]/80 border border-white/8 text-[#F5F3EE] text-sm placeholder:text-[#AAB0D6]/25 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] text-sm font-semibold hover:bg-[#C8A75E]/20 transition-all"
            >
              Look Up
            </button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <Loader2 className="w-5 h-5 text-[#C8A75E]/40 animate-spin" />
            <span className="text-xs text-[#AAB0D6]/40">Loading donation records…</span>
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-400 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : !email ? null : donations.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 border border-white/5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#C8A75E]/8 border border-[#C8A75E]/15 flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-5 h-5 text-[#C8A75E]/50" />
            </div>
            <h3 className="text-sm font-serif font-semibold text-[#AAB0D6] mb-2">No Donations Found</h3>
            <p className="text-xs text-[#AAB0D6]/40 leading-relaxed max-w-sm mx-auto mb-6">
              No records found for <span className="text-[#C8A75E]/60">{email}</span>. If you believe this is an error, please contact support.
            </p>
            <Link
              href="/support/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all"
            >
              <HandHeart className="w-3.5 h-3.5" />
              Make a Contribution
            </Link>
          </div>
        ) : (
          <>
            {totalGiven > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel rounded-xl border border-white/5 p-4">
                  <p className="text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-1">Total Contributed</p>
                  <p className="text-xl font-bold text-[#C8A75E] font-serif">
                    ${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="glass-panel rounded-xl border border-white/5 p-4">
                  <p className="text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-1">Contributions</p>
                  <p className="text-xl font-bold text-[#F5F3EE] font-serif">{donations.length}</p>
                </div>
              </div>
            )}

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase">Date</span>
                <span className="col-span-3 text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase">Amount</span>
                <span className="col-span-2 text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase">Type</span>
                <span className="col-span-2 text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase">Status</span>
                <span className="col-span-2 text-[9px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase">Receipt</span>
              </div>
              {donations.map((d) => (
                <div key={d.id} className="px-5 py-4 border-b border-white/3 grid grid-cols-12 gap-2 hover:bg-white/2 transition-colors last:border-0">
                  <span className="col-span-3 text-xs text-[#AAB0D6]/60">{formatDate(d.createdAt)}</span>
                  <span className="col-span-3 text-xs font-semibold text-[#F5F3EE]">
                    ${Number(d.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} {(d.currency || 'USD').toUpperCase()}
                  </span>
                  <span className="col-span-2 text-xs text-[#AAB0D6]/50">{FREQ_LABELS[d.frequency] || d.frequency}</span>
                  <span className="col-span-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[d.status] || STATUS_STYLES.pending}`}>
                      {d.status === 'completed' || d.status === 'paid' ? 'Confirmed' : d.status}
                    </span>
                  </span>
                  <span className="col-span-2">
                    {d.receiptUrl ? (
                      <a
                        href={d.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-[#C8A75E]/60 hover:text-[#C8A75E] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </a>
                    ) : (
                      <span className="text-[10px] text-[#AAB0D6]/25 italic">
                        {d.status === 'pending' ? 'Pending' : 'N/A'}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#AAB0D6]/25 text-center">
              {donations.length} record{donations.length !== 1 ? 's' : ''} for {email}
            </p>
          </>
        )}

        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Receipt Policy</p>
          <p className="text-xs text-[#AAB0D6]/40 leading-relaxed">
            Official tax receipts are issued within 5 business days of each donation. For questions about your contribution history or to request duplicate receipts, contact us at <span className="text-[#C8A75E]/60">support@sufisciencecenter.org</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
