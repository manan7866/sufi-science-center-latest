'use client';

import { useState } from 'react';
import { CircleUser as UserCircle, Briefcase, BookOpen, MessageSquare, CircleCheck as CheckCircle, Users, FlaskConical, Heart, Building, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import FormGuard from '@/components/form-guard';
import { interviewApplicationSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitization';

const ELIGIBLE = [
  { icon: FlaskConical, label: 'Researchers & Scientists' },
  { icon: BookOpen, label: 'Scholars & Educators' },
  { icon: Heart, label: 'Practitioners & Teachers' },
  { icon: Users, label: 'Community Leaders' },
  { icon: Building, label: 'Social Innovators' },
  { icon: UserCircle, label: 'Artists & Creators' },
];

const THEMES = [
  'Inner development and transformation',
  'Scientific inquiry and methodology',
  'Applied practice and lived wisdom',
  'Social contribution and service',
  'Cross-disciplinary integration',
  'Ethical frameworks and values',
];

const STEPS = [
  { label: 'Personal', icon: UserCircle },
  { label: 'Background', icon: Briefcase },
  { label: 'Reflection', icon: MessageSquare },
  { label: 'Links', icon: BookOpen },
];

interface FormData {
  name: string;
  email: string;
  affiliation: string;
  location: string;
  field_of_work: string;
  experience: string;
  background: string;
  wisdom: string;
  themes: string;
  website: string;
  publications: string;
  availability: string;
}

export function ApplyPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', affiliation: '', location: '',
    field_of_work: '', experience: '', background: '',
    wisdom: '', themes: '', website: '', publications: '', availability: '',
  });

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Validate form data with Zod
    const validationResult = interviewApplicationSchema.safeParse({
      fullName: form.name,
      email: form.email,
      location: form.location,
      background: form.background,
      fieldOfWork: form.field_of_work,
      reflection: form.wisdom,
      websiteUrl: form.website || undefined,
      socialMediaUrl: form.publications || undefined,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      setError(errors);
      setSubmitting(false);
      return;
    }

    const sanitizedData = {
      fullName: sanitizeInput(form.name),
      email: form.email.trim().toLowerCase(),
      location: sanitizeInput(form.location),
      background: sanitizeInput(form.background),
      fieldOfWork: sanitizeInput(form.field_of_work),
      reflection: sanitizeInput(form.wisdom),
      themes: form.themes ? [form.themes] : [],
      website: form.website ? sanitizeInput(form.website) : null,
      publications: form.publications ? sanitizeInput(form.publications) : null,
      availability: form.availability ? sanitizeInput(form.availability) : null,
    };

    const res = await fetch('/api/interview-applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id || null,
        name: sanitizedData.fullName,
        email: sanitizedData.email,
        affiliation: sanitizedData.location || null,
        field_of_work: sanitizedData.fieldOfWork,
        summary: `${sanitizedData.background}\n\n${sanitizedData.reflection}`,
        themes: sanitizedData.themes,
        links: [sanitizedData.website, sanitizedData.publications].filter(Boolean) as string[],
        availability: sanitizedData.availability || null,
        status: 'pending',
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputClass = 'w-full bg-[#0a0f30] border border-white/8 rounded-xl px-4 py-3 text-sm text-[#F5F3EE] placeholder:text-[#AAB0D6]/25 focus:outline-none focus:border-[#C8A75E]/30 transition-all';
  const labelClass = 'block text-xs font-medium text-[#AAB0D6]/60 mb-1.5 tracking-wide';

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="glass-panel rounded-2xl p-12 border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-[#27AE60]/12 border border-[#27AE60]/25 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#27AE60]" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-3">Application Submitted</h1>
            <p className="text-sm text-[#AAB0D6]/60 mb-8 leading-relaxed">
              Thank you for your interest in participating in the Insight Interview Series. Our editorial team will be in touch.
            </p>
            <div className="glass-panel rounded-xl p-5 mb-8 border border-white/5 text-left">
              <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-4">What happens next</p>
              <ol className="space-y-3">
                {[
                  'Our editorial team will review your submission within 7–10 business days',
                  'If selected, we will contact you to discuss themes and scheduling',
                  'A secure scheduling link will be sent after approval',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-[#AAB0D6]/55">
                    <span className="w-5 h-5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] text-[10px] flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/dialogues/insight-interviews" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all">
              Return to Interviews
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <Link href="/dialogues/insight-interviews" className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/50 hover:text-[#C8A75E] transition-colors mb-5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Insight Interviews
          </Link>
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-2">Insight Interviews</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Participate in the Dialogue
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed max-w-2xl">
            Share how Sufi practice, research, or lived wisdom informs your work and understanding of the world.
          </p>
        </div>
      </div>

      <div className="py-12 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-7 border border-white/5">
            <h2 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-4">Who Should Apply</h2>
            <div className="grid grid-cols-2 gap-3">
              {ELIGIBLE.map((e, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/2 border border-white/5">
                  <e.icon className="w-4 h-4 text-[#C8A75E] flex-shrink-0" />
                  <span className="text-xs text-[#F5F3EE]/70">{e.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-7 border border-white/5">
            <h2 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-4">What We Explore</h2>
            <ul className="space-y-2.5">
              {THEMES.map((theme, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#AAB0D6]/55">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8A75E]/50 flex-shrink-0 mt-0.5" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <div className="flex items-center gap-0 mb-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ${
                  step > i + 1 ? 'border-[#C8A75E] bg-[#C8A75E]/20 text-[#C8A75E]' :
                  step === i + 1 ? 'border-[#C8A75E] bg-[#C8A75E]/12 text-[#C8A75E]' :
                  'border-white/10 text-[#AAB0D6]/30'
                }`}>
                  <s.icon className="w-4 h-4" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px transition-all ${step > i + 1 ? 'bg-[#C8A75E]/40' : 'bg-white/5'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {STEPS.map((s, i) => (
              <span key={i} className={`text-[10px] transition-colors ${step === i + 1 ? 'text-[#C8A75E]/70' : 'text-[#AAB0D6]/25'}`}>{s.label}</span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5">
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE]">
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Professional Background'}
                {step === 3 && 'Reflective Questions'}
                {step === 4 && 'Additional Information'}
              </h2>
              <p className="text-xs text-[#AAB0D6]/40 mt-1">
                {step === 1 && 'Basic contact information'}
                {step === 2 && 'Your field of work and experience'}
                {step === 3 && 'How Sufi wisdom shapes your work'}
                {step === 4 && 'Links and availability'}
              </p>
            </div>

            <div className="px-8 py-7 space-y-5">
              {step === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input required type="email" value={form.email} onChange={set('email')} className={inputClass} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Affiliation / Organization</label>
                      <input value={form.affiliation} onChange={set('affiliation')} className={inputClass} placeholder="Institution or organization" />
                    </div>
                    <div>
                      <label className={labelClass}>Location</label>
                      <input value={form.location} onChange={set('location')} className={inputClass} placeholder="City, Country" />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className={labelClass}>Field of Work *</label>
                    <input required value={form.field_of_work} onChange={set('field_of_work')} className={inputClass} placeholder="e.g., Neuroscience, Psychology, Education, Social Work" />
                  </div>
                  <div>
                    <label className={labelClass}>Years of Experience *</label>
                    <input required type="number" value={form.experience} onChange={set('experience')} className={inputClass} placeholder="e.g., 10" />
                  </div>
                  <div>
                    <label className={labelClass}>Relevant Research or Practice *</label>
                    <textarea required rows={4} value={form.background} onChange={set('background')} className={inputClass} placeholder="Briefly describe your relevant work, research, or practice..." />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className={labelClass}>How does Sufi wisdom shape your work? *</label>
                    <textarea required rows={5} value={form.wisdom} onChange={set('wisdom')} className={inputClass} placeholder="Share specific examples of how Sufi practice or principles inform your professional work..." />
                  </div>
                  <div>
                    <label className={labelClass}>What themes would you like to discuss? *</label>
                    <textarea required rows={4} value={form.themes} onChange={set('themes')} className={inputClass} placeholder="What specific topics, questions, or insights would you like to explore in the interview?" />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div>
                    <label className={labelClass}>Website or LinkedIn</label>
                    <input type="url" value={form.website} onChange={set('website')} className={inputClass} placeholder="https://" />
                  </div>
                  <div>
                    <label className={labelClass}>Publications or Media Links</label>
                    <textarea rows={3} value={form.publications} onChange={set('publications')} className={inputClass} placeholder="Share links to relevant publications, talks, or other media..." />
                  </div>
                  <div>
                    <label className={labelClass}>General Availability</label>
                    <textarea rows={2} value={form.availability} onChange={set('availability')} className={inputClass} placeholder="e.g., Weekday afternoons, Pacific Time" />
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="mx-8 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border border-white/8 text-[#AAB0D6]/50 hover:text-[#AAB0D6] hover:border-white/15 transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
              ) : <div />}

              {step < 4 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all">
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E] text-[#0A0C14] hover:bg-[#C8A75E]/90 transition-all disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ApplyPageWithGuard() {
  return (
    <FormGuard
      formType="interview"
      checkExisting={async (uid) => {
        const res = await fetch('/api/form-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, formType: 'interview' }),
        });
        const data = await res.json();
        return data.exists;
      }}
    >
      <ApplyPage />
    </FormGuard>
  );
}
