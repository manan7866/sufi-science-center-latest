'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, Upload, X, Loader as Loader2, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import FormGuard from '@/components/form-guard';
import { membershipApplicationSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitization';

const AREAS = [
  'Sufi Metaphysics', 'Contemplative Science', 'Consciousness Studies',
  'Islamic Philosophy', 'Comparative Mysticism', 'Neuroscience & Spirituality',
  'Quantum Foundations', 'Complex Systems', 'Sacred Geometry',
  'Epistemology', 'Ethics & Virtue', 'Psychology of Transformation',
  'Energy Systems', 'Interfaith Studies', 'Pedagogy & Curriculum',
];

const INPUT = 'w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all';
const TEXTAREA = `${INPUT} resize-none`;
const LABEL = 'block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase';

type AppType = 'scholar' | 'fellow';

interface FormData {
  full_name: string;
  display_name: string;
  email: string;
  location: string;
  affiliation: string;
  areas_of_study: string[];
  bio: string;
  linked_publications: string;
  statement: string;
  academic_focus: string;
  research_interest: string;
  years_of_engagement: string;
  leadership_roles: string;
  publications_list: string;
  reference_contact: string;
  cv_file: File | null;
}

const EMPTY: FormData = {
  full_name: '',
  display_name: '',
  email: '',
  location: '',
  affiliation: '',
  areas_of_study: [],
  bio: '',
  linked_publications: '',
  statement: '',
  academic_focus: '',
  research_interest: '',
  years_of_engagement: '',
  leadership_roles: '',
  publications_list: '',
  reference_contact: '',
  cv_file: null,
};

function useAppType(): AppType {
  const params = useParams();
  const t = (params?.type as string)?.toLowerCase();
  return t === 'fellow' ? 'fellow' : 'scholar';
}

function stepLabels(type: AppType): string[] {
  if (type === 'fellow') return ['Personal Info', 'Background', 'Scholar Record', 'Statement', 'Review & Submit'];
  return ['Personal Info', 'Background', 'Academic Focus', 'Statement', 'Review & Submit'];
}

export function MembershipApplyPage() {
  const type = useAppType();
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const steps = stepLabels(type);
  const isFellow = type === 'fellow';

  useEffect(() => {
    if (user) {
      setForm((p) => ({
        ...p,
        full_name: user.name || p.full_name,
        email: user.email || p.email,
        display_name: user.name || p.display_name,
      }));
    }
  }, [user]);

  const set = (k: keyof FormData, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };

  const toggleArea = (a: string) => {
    setForm((p) => ({
      ...p,
      areas_of_study: p.areas_of_study.includes(a)
        ? p.areas_of_study.filter((x) => x !== a)
        : [...p.areas_of_study, a],
    }));
  };

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.full_name.trim()) e.full_name = 'Full name is required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.location.trim()) e.location = 'Location is required';
      if (!form.affiliation.trim()) e.affiliation = 'Affiliation is required';
    }
    if (step === 1) {
      if (form.areas_of_study.length === 0) e.areas_of_study = 'Select at least one area';
      if (!form.bio.trim() || form.bio.trim().length < 50) e.bio = 'Bio must be at least 50 characters';
    }
    if (step === 2) {
      if (isFellow) {
        if (!form.years_of_engagement.trim()) e.years_of_engagement = 'Required';
      } else {
        if (!form.academic_focus.trim()) e.academic_focus = 'Academic focus is required';
        if (!form.research_interest.trim()) e.research_interest = 'Research interest is required';
      }
    }
    if (step === 3) {
      const minWords = isFellow ? 100 : 60;
      const wordCount = form.statement.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount < minWords) e.statement = `Statement must be at least ${minWords} words (currently ${wordCount})`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validate()) setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    
    // Additional Zod validation
    const validationResult = membershipApplicationSchema.safeParse({
      fullName: user?.name || form.full_name.trim(),
      email: user?.email || form.email.trim().toLowerCase(),
      location: form.location.trim(),
      affiliation: form.affiliation.trim(),
      areasOfStudy: form.areas_of_study,
      bio: form.bio.trim(),
      academicFocus: form.academic_focus.trim() || '',
      researchInterests: form.research_interest.trim() || '',
      yearsOfEngagement: form.years_of_engagement.trim() || '',
      statement: form.statement.trim(),
      publications: form.linked_publications,
      references: form.reference_contact,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      alert(errors);
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        userId: user?.id || null,
        membership_type: type,
        full_name: sanitizeInput(user?.name || form.full_name.trim()),
        display_name: sanitizeInput(form.display_name.trim() || (user?.name || form.full_name.trim())),
        email: (user?.email || form.email.trim().toLowerCase()),
        location: sanitizeInput(form.location.trim()),
        affiliation: sanitizeInput(form.affiliation.trim()),
        areas_of_study: form.areas_of_study,
        bio: sanitizeInput(form.bio.trim()),
        statement: sanitizeInput(form.statement.trim()),
        linked_publications: form.linked_publications
          ? form.linked_publications.split('\n').map((l) => l.trim()).filter(Boolean)
          : [],
        academic_focus: form.academic_focus.trim() ? sanitizeInput(form.academic_focus.trim()) : null,
        research_interest: form.research_interest.trim() ? sanitizeInput(form.research_interest.trim()) : null,
        years_of_engagement: form.years_of_engagement.trim() || null,
        leadership_roles: form.leadership_roles.trim() ? sanitizeInput(form.leadership_roles.trim()) : null,
        publications_list: form.publications_list.trim() ? sanitizeInput(form.publications_list.trim()) : null,
        reference_contact: form.reference_contact.trim() ? sanitizeInput(form.reference_contact.trim()) : null,
        session_token: typeof window !== 'undefined'
          ? localStorage.getItem('ssc_portal_session_token')
          : null,
      };

      const res = await fetch('/api/portal/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      setSubmittedId(data.id);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#27AE60]/15 border border-[#27AE60]/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#27AE60]" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white mb-4">Application Submitted</h1>
          <p className="text-[#AAB0D6]/70 mb-2 leading-relaxed">
            Your {isFellow ? 'Fellow' : 'Scholar'} membership application has been received. Our
            review committee will assess your submission and respond within{' '}
            {isFellow ? '3–4' : '2–3'} weeks.
          </p>
          <p className="text-xs text-[#AAB0D6]/40 mb-8">Reference ID: <span className="text-[#C8A75E]/70 font-mono">{submittedId.slice(0, 8).toUpperCase()}</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(`/membership/status?email=${encodeURIComponent(form.email)}`)}
              className="px-6 py-3 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/30 text-[#C8A75E] text-sm font-medium hover:bg-[#C8A75E]/20 transition-all"
            >
              Track Your Application
            </button>
            <button
              onClick={() => router.push('/portal')}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[#AAB0D6] text-sm font-medium hover:bg-white/8 transition-all"
            >
              Return to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B14] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <Link href="/membership" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Membership
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: isFellow ? '#C8A75E18' : '#4A90D918' }}>
            {isFellow
              ? <Award className="w-5 h-5 text-[#C8A75E]" />
              : <GraduationCap className="w-5 h-5 text-[#4A90D9]" />}
          </div>
          <div>
            <h1 className="text-lg font-serif font-semibold text-white">
              {isFellow ? 'Fellow' : 'Scholar'} Membership Application
            </h1>
            <p className="text-xs text-[#AAB0D6]/40 mt-0.5">Sufi Science Center</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-2 ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                  i < step
                    ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0A0B14]'
                    : i === step
                    ? `border-[${isFellow ? '#C8A75E' : '#4A90D9'}] text-[${isFellow ? '#C8A75E' : '#4A90D9'}] bg-transparent`
                    : 'border-white/15 text-white/30 bg-transparent'
                }`}
                  style={i === step ? { borderColor: isFellow ? '#C8A75E' : '#4A90D9', color: isFellow ? '#C8A75E' : '#4A90D9' } : {}}
                >
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? 'text-white font-medium' : 'text-[#AAB0D6]/40'}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-px flex-shrink-0 ${i < step ? 'bg-[#C8A75E]/50' : 'bg-white/8'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#141A3A]/60 to-[#0D1129]/60 border border-white/8 rounded-2xl p-6 sm:p-8">

          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-5">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Full Name <span className="text-red-400/70">*</span></label>
                  <input className={INPUT} value={form.full_name} onChange={(e) => set('full_name', e.target.value)} placeholder="Your full name" />
                  {errors.full_name && <p className="text-xs text-red-400/70 mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <label className={LABEL}>Display Name</label>
                  <input className={INPUT} value={form.display_name} onChange={(e) => set('display_name', e.target.value)} placeholder="Preferred name (optional)" />
                </div>
              </div>
              <div>
                <label className={LABEL}>Email Address <span className="text-red-400/70">*</span></label>
                <input className={INPUT} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@institution.edu" />
                {errors.email && <p className="text-xs text-red-400/70 mt-1">{errors.email}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Location <span className="text-red-400/70">*</span></label>
                  <input className={INPUT} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="City, Country" />
                  {errors.location && <p className="text-xs text-red-400/70 mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className={LABEL}>Institutional Affiliation <span className="text-red-400/70">*</span></label>
                  <input className={INPUT} value={form.affiliation} onChange={(e) => set('affiliation', e.target.value)} placeholder="University, Institute, or Independent" />
                  {errors.affiliation && <p className="text-xs text-red-400/70 mt-1">{errors.affiliation}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-5">Background & Interests</h2>
              <div>
                <label className={LABEL}>Areas of Study <span className="text-red-400/70">*</span></label>
                <p className="text-xs text-[#AAB0D6]/40 mb-3">Select all that apply</p>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => {
                    const selected = form.areas_of_study.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleArea(a)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selected
                            ? 'bg-[#1C1F4A] border-[#C8A75E] text-white'
                            : 'bg-[#121838] border-white/10 text-[#9CA3AF] hover:border-[#C8A75E]/50 hover:text-white'
                        }`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
                {errors.areas_of_study && <p className="text-xs text-red-400/70 mt-2">{errors.areas_of_study}</p>}
              </div>
              <div>
                <label className={LABEL}>Short Biography <span className="text-red-400/70">*</span></label>
                <textarea
                  className={`${TEXTAREA} min-h-[120px]`}
                  value={form.bio}
                  onChange={(e) => set('bio', e.target.value)}
                  placeholder="Briefly describe your academic or scholarly background (minimum 50 characters)"
                />
                <p className="text-xs text-[#AAB0D6]/30 mt-1 text-right">{form.bio.length} chars</p>
                {errors.bio && <p className="text-xs text-red-400/70 mt-1">{errors.bio}</p>}
              </div>
              <div>
                <label className={LABEL}>Linked Publications (Optional)</label>
                <textarea
                  className={`${TEXTAREA} min-h-[80px]`}
                  value={form.linked_publications}
                  onChange={(e) => set('linked_publications', e.target.value)}
                  placeholder="One URL or title per line"
                />
              </div>
              <div>
                <label className={LABEL}>CV / Academic Profile (Optional)</label>
                <div
                  className="border border-dashed border-white/10 rounded-xl p-5 text-center cursor-pointer hover:border-[#C8A75E]/30 transition-all"
                  onClick={() => fileRef.current?.click()}
                >
                  {form.cv_file ? (
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm text-[#F5F7FA]">{form.cv_file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm((p) => ({ ...p, cv_file: null })); }}
                        className="text-[#AAB0D6]/40 hover:text-red-400/60"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[#AAB0D6]/30 mx-auto mb-2" />
                      <p className="text-sm text-[#AAB0D6]/40">Click to upload PDF (max 5 MB)</p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (f.size > 5 * 1024 * 1024) { alert('File must be under 5 MB'); return; }
                      setForm((p) => ({ ...p, cv_file: f }));
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && !isFellow && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-5">Academic Focus</h2>
              <div>
                <label className={LABEL}>Academic Focus Area <span className="text-red-400/70">*</span></label>
                <input className={INPUT} value={form.academic_focus} onChange={(e) => set('academic_focus', e.target.value)} placeholder="e.g. Sufi psychology and consciousness science" />
                {errors.academic_focus && <p className="text-xs text-red-400/70 mt-1">{errors.academic_focus}</p>}
              </div>
              <div>
                <label className={LABEL}>Current Research Interest <span className="text-red-400/70">*</span></label>
                <textarea
                  className={`${TEXTAREA} min-h-[100px]`}
                  value={form.research_interest}
                  onChange={(e) => set('research_interest', e.target.value)}
                  placeholder="Describe your current research interest and how it connects to Sufi science inquiry"
                />
                {errors.research_interest && <p className="text-xs text-red-400/70 mt-1">{errors.research_interest}</p>}
              </div>
            </div>
          )}

          {step === 2 && isFellow && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-5">Scholarly Record</h2>
              <div>
                <label className={LABEL}>Years of Scholarly Engagement <span className="text-red-400/70">*</span></label>
                <input className={INPUT} value={form.years_of_engagement} onChange={(e) => set('years_of_engagement', e.target.value)} placeholder="e.g. 12 years in Islamic philosophy and contemplative science" />
                {errors.years_of_engagement && <p className="text-xs text-red-400/70 mt-1">{errors.years_of_engagement}</p>}
              </div>
              <div>
                <label className={LABEL}>Institutional Leadership Roles (if applicable)</label>
                <textarea
                  className={`${TEXTAREA} min-h-[80px]`}
                  value={form.leadership_roles}
                  onChange={(e) => set('leadership_roles', e.target.value)}
                  placeholder="List any leadership roles in academic institutions, research centres, or scholarly organisations"
                />
              </div>
              <div>
                <label className={LABEL}>Publications List</label>
                <textarea
                  className={`${TEXTAREA} min-h-[100px]`}
                  value={form.publications_list}
                  onChange={(e) => set('publications_list', e.target.value)}
                  placeholder="List key publications, articles, or scholarly contributions (one per line)"
                />
              </div>
              <div>
                <label className={LABEL}>Reference Contact (Optional)</label>
                <input className={INPUT} value={form.reference_contact} onChange={(e) => set('reference_contact', e.target.value)} placeholder="Name and email of a professional reference" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-1">
                Statement of {isFellow ? 'Contribution' : 'Intent'}
              </h2>
              <p className="text-xs text-[#AAB0D6]/50 mb-4">
                {isFellow
                  ? 'Describe your intended contribution to the Sufi Science Center — research leadership, curriculum, advisory role, or institutional development. (500–800 words recommended)'
                  : 'Explain your motivation for joining the Scholar membership, your current inquiry, and what you hope to contribute. (300–500 words recommended)'}
              </p>
              <div>
                <textarea
                  className={`${TEXTAREA} min-h-[240px]`}
                  value={form.statement}
                  onChange={(e) => set('statement', e.target.value)}
                  placeholder={isFellow ? 'Write your statement of contribution...' : 'Write your statement of intent...'}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-[#AAB0D6]/30">
                    {form.statement.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <span className="text-xs text-[#AAB0D6]/30">
                    {isFellow ? '500–800 recommended' : '300–500 recommended'}
                  </span>
                </div>
                {errors.statement && <p className="text-xs text-red-400/70 mt-1">{errors.statement}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-5">Review Your Application</h2>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', value: form.full_name },
                  { label: 'Email', value: form.email },
                  { label: 'Location', value: form.location },
                  { label: 'Affiliation', value: form.affiliation },
                  { label: 'Areas of Study', value: form.areas_of_study.join(', ') || '—' },
                  { label: 'Membership Type', value: isFellow ? 'Fellow' : 'Scholar' },
                  { label: 'Statement Length', value: `${form.statement.trim().split(/\s+/).filter(Boolean).length} words` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-xs text-[#AAB0D6]/40 uppercase tracking-wide">{label}</span>
                    <span className="text-sm text-[#F5F7FA] text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#141A3A]/60 rounded-xl p-4 mt-4">
                <p className="text-xs text-[#AAB0D6]/50 leading-relaxed">
                  By submitting, you confirm that all information provided is accurate. The review
                  committee will assess your application and respond via email within{' '}
                  {isFellow ? '3–4' : '2–3'} weeks.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-[#AAB0D6]/60 border border-white/8 hover:border-white/15 hover:text-[#AAB0D6] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border transition-all"
                style={isFellow
                  ? { background: '#C8A75E18', borderColor: '#C8A75E4D', color: '#C8A75E' }
                  : { background: '#4A90D918', borderColor: '#4A90D94D', color: '#4A90D9' }}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-[#C8A75E]/15 border border-[#C8A75E]/35 text-[#C8A75E] hover:bg-[#C8A75E]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MembershipApplyPageWithGuard() {
  return (
    <FormGuard
      formType="membership"
      checkExisting={async (uid) => {
        const res = await fetch('/api/form-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, formType: 'membership' }),
        });
        const data = await res.json();
        return data.exists;
      }}
    >
      <MembershipApplyPage />
    </FormGuard>
  );
}
