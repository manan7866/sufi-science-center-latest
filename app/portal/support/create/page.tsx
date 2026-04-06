'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LifeBuoy, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

const CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'membership', label: 'Membership & Access' },
  { value: 'donation', label: 'Donation & Payment' },
  { value: 'research', label: 'Research & Collaboration' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'other', label: 'Other' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low', desc: 'General question or feedback' },
  { value: 'medium', label: 'Medium', desc: 'Needs attention within a few days' },
  { value: 'high', label: 'High', desc: 'Urgent — blocking access or activity' },
];

export default function CreateTicketPage() {
  const router = useRouter();
  const { session } = usePortalSession();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ ticketNumber: string } | null>(null);

  const descLength = description.length;
  const descMax = 5000;
  const descWarning = descLength > 4500;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!subject.trim()) { setError('Please enter a subject.'); return; }
    if (description.trim().length < 20) { setError('Please provide a more detailed description (minimum 20 characters).'); return; }
    if (!session?.sessionToken) { setError('Your session could not be verified. Please refresh and try again.'); return; }

    setSubmitting(true);

    try {
      const res = await fetch('/api/portal/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken: session.sessionToken,
          subject: subject.trim(),
          description: description.trim(),
          category,
          priority,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit ticket.');
      setSuccess({ ticketNumber: data.ticket.ticketNumber });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="glass-panel border border-white/8 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#F5F3EE] font-serif mb-3">Ticket Submitted</h2>
          <p className="text-[#AAB0D6] mb-2 text-sm leading-relaxed">
            Your support request has been received. A member of the SSC team will respond within 1–3 business days.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20">
            <span className="text-[10px] text-[#C8A75E]/60 uppercase tracking-widest block mb-1">Ticket Reference</span>
            <span className="text-lg font-bold text-[#C8A75E] font-mono tracking-wider">{success.ticketNumber}</span>
          </div>
          <p className="text-xs text-[#AAB0D6]/40 mt-4">Keep this reference number for your records.</p>
          <div className="flex gap-3 justify-center mt-8">
            <button
              onClick={() => router.push('/portal/support/tickets')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/25 text-[#C8A75E] text-sm font-medium hover:bg-[#C8A75E]/15 transition-colors"
            >
              View My Tickets
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setSuccess(null); setSubject(''); setDescription(''); setCategory('general'); setPriority('medium'); }}
              className="px-5 py-2.5 rounded-xl border border-white/8 text-[#AAB0D6] text-sm hover:bg-white/4 transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/portal/support/tickets" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Support Tickets
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
          <LifeBuoy className="w-5 h-5 text-[#C8A75E]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#F5F3EE] font-serif">Create Support Ticket</h1>
          <p className="text-xs text-[#AAB0D6]/60 mt-0.5">Submit a request to the SSC institutional team</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-panel border border-white/8 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#AAB0D6] uppercase tracking-widest mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border ${
                    category === cat.value
                      ? 'bg-[#C8A75E]/12 border-[#C8A75E]/30 text-[#C8A75E]'
                      : 'border-white/6 text-[#AAB0D6] hover:border-white/12 hover:text-[#F5F3EE] hover:bg-white/3'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#AAB0D6] uppercase tracking-widest mb-2">
              Subject <span className="text-[#C8A75E]">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your issue"
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0C14]/80 border border-white/8 text-[#F5F3EE] text-sm placeholder:text-[#AAB0D6]/30 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-[#AAB0D6] uppercase tracking-widest">
                Description <span className="text-[#C8A75E]">*</span>
              </label>
              <span className={`text-[10px] font-mono transition-colors ${descWarning ? 'text-amber-400' : 'text-[#AAB0D6]/30'}`}>
                {descLength} / {descMax}
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, descMax))}
              rows={10}
              placeholder={`Please describe your issue clearly.\nInclude relevant reference numbers (membership ID, submission ID, etc.)\n\nFor example:\n— What were you trying to do?\n— What happened instead?\n— Any error messages received?\n— Relevant IDs or dates`}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0C14]/80 border border-white/8 text-[#F5F3EE] text-sm placeholder:text-[#AAB0D6]/25 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all resize-none leading-relaxed"
            />
            <p className="text-[10px] text-[#AAB0D6]/30 mt-1.5">
              Recommended: 100–5,000 characters. Include any reference numbers, dates, or error messages to help us respond faster.
            </p>
          </div>
        </div>

        <div className="glass-panel border border-white/8 rounded-2xl p-6">
          <label className="block text-xs font-semibold text-[#AAB0D6] uppercase tracking-widest mb-3">
            Priority
          </label>
          <div className="space-y-2">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all ${
                  priority === p.value
                    ? 'bg-[#C8A75E]/8 border-[#C8A75E]/25 text-[#F5F3EE]'
                    : 'border-white/5 text-[#AAB0D6] hover:border-white/10 hover:bg-white/2'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  p.value === 'low' ? 'bg-blue-400/60' :
                  p.value === 'medium' ? 'bg-amber-400/70' :
                  'bg-rose-400/70'
                }`} />
                <div>
                  <p className={`text-xs font-semibold ${priority === p.value ? 'text-[#F5F3EE]' : 'text-[#AAB0D6]'}`}>{p.label}</p>
                  <p className="text-[10px] text-[#AAB0D6]/50 mt-0.5">{p.desc}</p>
                </div>
                {priority === p.value && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C8A75E]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-400 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-[10px] text-[#AAB0D6]/30 leading-relaxed max-w-xs">
            Responses are sent to your registered contact. Average response time: 1–3 business days.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8A75E]/15 border border-[#C8A75E]/30 text-[#C8A75E] text-sm font-semibold hover:bg-[#C8A75E]/22 hover:border-[#C8A75E]/45 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LifeBuoy className="w-4 h-4" />
            {submitting ? 'Submitting…' : 'Submit Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}
