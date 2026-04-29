'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, CircleCheck as CheckCircle2, Clock, Eye, CircleAlert as AlertCircle, FileText, User, Calendar, Loader as Loader2, ArrowRight, RotateCcw } from 'lucide-react';

type SubmissionStatus = 'draft' | 'submitted' | 'under_review' | 'revision_requested' | 'accepted' | 'rejected' | 'withdrawn';

interface Submission {
  id: string;
  tracking_code: string;
  submission_type: string;
  title: string;
  abstract: string;
  presenter_name: string;
  presenter_email: string;
  presenter_affiliation: string;
  status: SubmissionStatus;
  admin_notes: string | null;
  reviewer_decision: string | null;
  submitted_at: string;
  updated_at: string;
  conference?: {
    id: string;
    title: string;
    location_detail: string | null;
  } | null;
}

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: 'Draft', color: 'text-[#AAB0D6]', bg: 'bg-white/5', icon: FileText },
  submitted: { label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10', icon: Clock },
  under_review: { label: 'Under Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10', icon: Eye },
  revision_requested: { label: 'Revision Requested', color: 'text-orange-400', bg: 'bg-orange-400/10', icon: RotateCcw },
  accepted: { label: 'Accepted', color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: CheckCircle2 },
  rejected: { label: 'Not Accepted', color: 'text-red-400', bg: 'bg-red-400/10', icon: AlertCircle },
  withdrawn: { label: 'Withdrawn', color: 'text-[#AAB0D6]/50', bg: 'bg-white/3', icon: FileText },
};

const STATUS_TIMELINE: SubmissionStatus[] = ['submitted', 'under_review', 'revision_requested', 'accepted'];

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.submitted;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} border border-current/20`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function ConferenceStatusPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [email, setEmail] = useState('');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmission(null);
    setSearched(true);
    setLoading(true);

    try {
      const params = new URLSearchParams({
        trackingCode: trackingCode.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
      });
      const res = await fetch(`/api/conference-submissions?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Lookup failed');
      }
      const data = await res.json();
      if (!data) {
        setError('No submission found matching that tracking code and email address. Please check your details.');
      } else {
        setSubmission(data);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lookup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const currentStatusIndex = submission
    ? STATUS_TIMELINE.indexOf(submission.status as SubmissionStatus)
    : -1;

  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="border-b border-white/5 bg-[#0A0C18]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/contribute" className="flex items-center gap-2 text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Contribute
          </Link>
          <div className="text-right">
            <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest">{submission?.conference?.title || 'Sufi Science Symposium 2026'}</p>
            <p className="text-sm font-serif text-[#F5F3EE]">Submission Status</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#C8A75E]/60 uppercase mb-2">Track Your Submission</p>
          <h1 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-3">Check Submission Status</h1>
          <p className="text-[#AAB0D6] text-sm leading-relaxed max-w-md mx-auto">
            Enter the tracking code from your confirmation email alongside your registered email address.
          </p>
        </div>

        <div className="glass-panel border border-white/8 rounded-2xl p-8 mb-8">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-sm text-[#F5F3EE] mb-1.5">Tracking Code</label>
              <Input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] font-mono tracking-widest uppercase"
                placeholder="SSC-2026-XXXXXX"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#F5F3EE] mb-1.5">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E]"
                placeholder="your@email.com"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !trackingCode || !email}
              className="w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#C8A75E]/90 disabled:opacity-40 font-semibold"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Looking up...</>
              ) : (
                <><Search className="w-4 h-4 mr-2" />Check Status</>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {submission && (
          <div className="space-y-5">
            <div className="glass-panel border border-white/8 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest mb-1">Tracking Code</p>
                  <p className="font-mono font-bold text-[#C8A75E] tracking-widest">{submission.tracking_code}</p>
                </div>
                <StatusBadge status={submission.status} />
              </div>

              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-3 leading-snug">{submission.title}</h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]">
                  <User className="w-3.5 h-3.5 text-[#AAB0D6]/40" />
                  {submission.presenter_name}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]">
                  <FileText className="w-3.5 h-3.5 text-[#AAB0D6]/40" />
                  {submission.submission_type.charAt(0).toUpperCase() + submission.submission_type.slice(1)}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]">
                  <Calendar className="w-3.5 h-3.5 text-[#AAB0D6]/40" />
                  Submitted {formatDate(submission.submitted_at)}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-4">
                <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-3">Review Progress</p>
                <div className="flex items-center gap-2">
                  {(['submitted', 'under_review', 'accepted'] as SubmissionStatus[]).map((s, i) => {
                    const cfg = STATUS_CONFIG[s];
                    const Icon = cfg.icon;
                    const reached = currentStatusIndex >= i || submission.status === 'accepted';
                    const isCurrent = submission.status === s;
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className={`flex flex-col items-center flex-1 ${i > 0 ? '' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCurrent
                              ? `border-[#C8A75E] bg-[#C8A75E]/10 ${cfg.color}`
                              : reached
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                              : 'border-white/8 bg-white/2 text-[#AAB0D6]/20'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[9px] mt-1 tracking-wide text-center leading-tight ${isCurrent ? 'text-[#C8A75E]' : reached ? 'text-emerald-400/60' : 'text-[#AAB0D6]/20'}`}>
                            {cfg.label}
                          </span>
                        </div>
                        {i < 2 && (
                          <div className={`h-px w-full mb-4 mx-1 ${reached && currentStatusIndex > i ? 'bg-emerald-500/30' : 'bg-white/5'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {submission.admin_notes && (
              <div className="glass-panel border border-[#C8A75E]/20 rounded-2xl p-5 bg-[#C8A75E]/3">
                <p className="text-[10px] text-[#C8A75E]/60 uppercase tracking-widest mb-2">Reviewer Notes</p>
                <p className="text-sm text-[#AAB0D6] leading-relaxed">{submission.admin_notes}</p>
              </div>
            )}

            {submission.status === 'accepted' && submission.conference?.location_detail && (
              <div className="glass-panel border border-emerald-500/20 rounded-2xl p-5 bg-emerald-500/3">
                <p className="text-[10px] text-emerald-400/60 uppercase tracking-widest mb-2">Location Details</p>
                <p className="text-sm text-[#F5F3EE] leading-relaxed">{submission.conference.location_detail}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => { setSubmission(null); setSearched(false); setTrackingCode(''); setEmail(''); }}
                className="flex-1 border-white/10 text-[#AAB0D6] hover:text-[#F5F3EE]"
              >
                New Lookup
              </Button>
              <Link href="/contribute/conference" className="flex-1">
                <Button className="w-full bg-[#C8A75E]/10 text-[#C8A75E] hover:bg-[#C8A75E]/20 border border-[#C8A75E]/30">
                  Submit Another
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {searched && !loading && !submission && !error && (
          <div className="text-center py-8 text-[#AAB0D6]/40 text-sm">No results found.</div>
        )}

        <div className="mt-10 p-5 rounded-xl bg-white/2 border border-white/5 text-center">
          <p className="text-xs text-[#AAB0D6]/40 mb-3">Ready to submit your paper?</p>
          <Link href="/contribute/conference">
            <Button variant="ghost" className="text-[#C8A75E] hover:text-[#C8A75E]/80 text-sm">
              Start a New Submission
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
