'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Clock, CircleCheck as CheckCircle2, Circle as XCircle, Eye, ArrowRight, GraduationCap, Award, Loader as Loader2 } from 'lucide-react';
import Link from 'next/link';

type Status = 'pending' | 'under_review' | 'approved' | 'declined';

interface Application {
  id: string;
  membership_type: string;
  status: Status;
  full_name: string;
  email: string;
  affiliation: string;
  areas_of_study: string[];
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_META: Record<Status, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'text-[#AAB0D6]', bg: 'bg-[#AAB0D6]/10 border-[#AAB0D6]/20', icon: Clock },
  under_review: { label: 'Under Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20', icon: Eye },
  approved: { label: 'Approved', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20', icon: CheckCircle2 },
  declined: { label: 'Declined', color: 'text-[#E07070]', bg: 'bg-[#E07070]/10 border-[#E07070]/20', icon: XCircle },
};

const INPUT = 'w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all';

function MembershipStatusForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams?.get('email') ?? '');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setSearched(false);
    setError(null);
    try {
      const res = await fetch('/api/membership-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Lookup failed');
        setApplications([]);
        setSearched(true);
        return;
      }
      setApplications(data.applications ?? []);
      setSearched(true);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
      setApplications([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (searchParams?.get('email')) {
      lookup();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B14] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/50 uppercase mb-3">Application Tracking</p>
          <h1 className="text-3xl font-serif font-light text-white mb-3">Check Application Status</h1>
          <p className="text-sm text-[#AAB0D6]/50">Enter the email address you used when submitting your application.</p>
        </div>

        <form onSubmit={lookup} className="mb-8">
          <div className="flex gap-3">
            <input
              type="email"
              className={INPUT}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/30 text-[#C8A75E] text-sm font-medium hover:bg-[#C8A75E]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {searched && applications.length === 0 && !error && (
          <div className="text-center py-12 border border-white/5 rounded-2xl bg-white/2">
            <p className="text-[#AAB0D6]/40 text-sm mb-3">No applications found for this email address.</p>
            <Link href="/membership" className="text-sm text-[#C8A75E]/70 hover:text-[#C8A75E] transition-colors inline-flex items-center gap-1.5">
              Start a new application <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {applications.length > 0 && (
          <div className="space-y-4">
            {applications.map((app) => {
              const meta = STATUS_META[app.status] ?? STATUS_META.pending;
              const StatusIcon = meta.icon;
              const isFellow = app.membership_type === 'fellow';
              const TypeIcon = isFellow ? Award : GraduationCap;

              return (
                <div key={app.id} className="bg-gradient-to-br from-[#141A3A]/60 to-[#0D1129]/60 border border-white/8 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isFellow ? 'bg-[#C8A75E]/12' : 'bg-[#4A90D9]/12'}`}>
                        <TypeIcon className={`w-4 h-4 ${isFellow ? 'text-[#C8A75E]' : 'text-[#4A90D9]'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-serif font-semibold text-[#F5F3EE] capitalize">
                          {app.membership_type} Membership
                        </h3>
                        <p className="text-[10px] text-[#AAB0D6]/40 mt-0.5">{app.affiliation}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border font-medium ${meta.bg} ${meta.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {meta.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-1">Submitted</p>
                      <p className="text-xs text-[#AAB0D6]/60">{new Date(app.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-1">Reference ID</p>
                      <p className="text-xs font-mono text-[#C8A75E]/60">{app.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                  </div>

                  {app.areas_of_study?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(app.areas_of_study as string[]).slice(0, 4).map((a) => (
                        <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-[#AAB0D6]/50">{a}</span>
                      ))}
                      {app.areas_of_study.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-[#AAB0D6]/40">+{app.areas_of_study.length - 4} more</span>
                      )}
                    </div>
                  )}

                  {app.review_notes && (
                    <div className="bg-[#141A3A]/80 rounded-xl p-4 mt-2">
                      <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Review Notes</p>
                      <p className="text-xs text-[#AAB0D6]/60 leading-relaxed">{app.review_notes}</p>
                    </div>
                  )}

                  {app.status === 'pending' && (
                    <p className="text-xs text-[#AAB0D6]/30 mt-3 leading-relaxed">
                      Your application is queued for review. You will receive an email update when the committee begins assessment.
                    </p>
                  )}
                  {app.status === 'under_review' && (
                    <p className="text-xs text-[#C8A75E]/50 mt-3 leading-relaxed">
                      Your application is currently being reviewed by our academic committee.
                    </p>
                  )}
                  {app.status === 'approved' && (
                    <div className="mt-3">
                      <p className="text-xs text-[#27AE60]/70 mb-3 leading-relaxed">
                        Congratulations — your application has been approved. Welcome to the {app.membership_type} community.
                      </p>
                      <Link href="/portal" className="inline-flex items-center gap-1.5 text-xs text-[#27AE60]/80 hover:text-[#27AE60] transition-colors border border-[#27AE60]/20 hover:border-[#27AE60]/40 px-3 py-1.5 rounded-lg">
                        Access Portal <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/membership" className="text-sm text-[#AAB0D6]/30 hover:text-[#AAB0D6]/60 transition-colors">
            ← Back to Membership
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MembershipStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    }>
      <MembershipStatusForm />
    </Suspense>
  );
}
