'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle2, Upload, User, FileText, Users, Send, ClipboardList, CircleAlert as AlertCircle, Loader as Loader2, X, Plus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import FormGuard from '@/components/form-guard';
import { conferenceSubmissionSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitization';

interface ConferenceEvent {
  id: string;
  title: string;
  subtitle: string | null;
  theme: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  location_detail: string | null;
  submission_deadline: string | null;
  is_open_for_submissions: boolean;
}

type Step = 1 | 2 | 3 | 4;

interface CoPresenters {
  name: string;
  email: string;
  affiliation: string;
}

interface FormData {
  submission_type: string;
  title: string;
  abstract: string;
  keywords: string;
  presenter_name: string;
  presenter_email: string;
  presenter_affiliation: string;
  presenter_bio: string;
  co_presenters: CoPresenters[];
  file: File | null;
  terms_accepted: boolean;
}

const SUBMISSION_TYPES = [
  { value: 'paper', label: 'Research Paper' },
  { value: 'workshop', label: 'Workshop Proposal' },
  { value: 'panel', label: 'Panel Discussion' },
  { value: 'poster', label: 'Poster Presentation' },
];

const STEPS = [
  { num: 1, label: 'Submission Type', icon: ClipboardList },
  { num: 2, label: 'Your Details', icon: User },
  { num: 3, label: 'Content & Upload', icon: FileText },
  { num: 4, label: 'Review & Submit', icon: Send },
];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = current > step.num;
        const active = current === step.num;
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  done
                    ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0B0F2A]'
                    : active
                    ? 'border-[#C8A75E] text-[#C8A75E] bg-[#C8A75E]/10'
                    : 'border-white/10 text-[#AAB0D6]/40 bg-white/2'
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-[10px] mt-1.5 tracking-wide font-medium hidden sm:block ${
                  active ? 'text-[#C8A75E]' : done ? 'text-[#C8A75E]/60' : 'text-[#AAB0D6]/30'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-px mx-2 mb-5 transition-all ${
                  current > step.num ? 'bg-[#C8A75E]/50' : 'bg-white/8'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ConferenceSubmissionPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [conference, setConference] = useState<ConferenceEvent | null>(null);
  const [form, setForm] = useState<FormData>({
    submission_type: '',
    title: '',
    abstract: '',
    keywords: '',
    presenter_name: '',
    presenter_email: '',
    presenter_affiliation: '',
    presenter_bio: '',
    co_presenters: [],
    file: null,
    terms_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchConference() {
      try {
        const res = await fetch('/api/conference');
        const data = await res.json();
        if (data.conference) {
          setConference(data.conference);
        }
      } catch (err) {
        console.error('Failed to fetch conference:', err);
      }
    }
    fetchConference();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.name && !form.presenter_name) {
        setForm(prev => ({ ...prev, presenter_name: user.name }));
      }
      if (user.email && !form.presenter_email) {
        setForm(prev => ({ ...prev, presenter_email: user.email }));
      }
    }
  }, [user]);

  function set(field: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addCoPresenter() {
    set('co_presenters', [...form.co_presenters, { name: '', email: '', affiliation: '' }]);
  }

  function updateCoPresenter(idx: number, field: keyof CoPresenters, value: string) {
    const updated = form.co_presenters.map((cp, i) =>
      i === idx ? { ...cp, [field]: value } : cp
    );
    set('co_presenters', updated);
  }

  function removeCoPresenter(idx: number) {
    set('co_presenters', form.co_presenters.filter((_, i) => i !== idx));
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.submission_type) e.submission_type = 'Submission type is required';
    }
    if (step === 2) {
      const name = user?.name || form.presenter_name;
      const email = user?.email || form.presenter_email;
      if (!name) e.presenter_name = 'Full name is required';
      if (!email) e.presenter_email = 'Email is required';
      if (!form.presenter_affiliation.trim()) e.presenter_affiliation = 'Affiliation is required';
      if (!form.presenter_bio.trim()) e.presenter_bio = 'Bio is required';
    }
    if (step === 3) {
      if (!form.title.trim()) e.title = 'Title is required';
      if (!form.abstract.trim()) e.abstract = 'Abstract is required';
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  function canAdvance(): boolean {
    if (step === 1) return !!form.submission_type;
    if (step === 2) {
      const name = user?.name || form.presenter_name;
      const email = user?.email || form.presenter_email;
      return !!name && !!email && !!form.presenter_affiliation && !!form.presenter_bio;
    }
    if (step === 3) return !!form.title && !!form.abstract;
    return form.terms_accepted;
  }

  async function handleSubmit() {
    setError('');
    setIsSubmitting(true);
    
    // Validate form data with Zod
    const validationResult = conferenceSubmissionSchema.safeParse({
      submissionType: form.submission_type,
      title: form.title,
      abstract: form.abstract,
      presenterName: form.presenter_name,
      presenterEmail: form.presenter_email,
      presenterAffiliation: form.presenter_affiliation,
      coPresenterName: form.co_presenters?.[0]?.name || '',
      coPresenterEmail: form.co_presenters?.[0]?.email || '',
      coPresenterAffiliation: form.co_presenters?.[0]?.affiliation || '',
      keywords: form.keywords,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      setError(errors);
      setIsSubmitting(false);
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      submissionType: form.submission_type,
      title: sanitizeInput(form.title),
      abstract: sanitizeInput(form.abstract),
      keywords: sanitizeInput(form.keywords),
      presenterName: sanitizeInput(form.presenter_name),
      presenterEmail: form.presenter_email.trim().toLowerCase(),
      presenterAffiliation: sanitizeInput(form.presenter_affiliation),
      presenterBio: form.presenter_bio ? sanitizeInput(form.presenter_bio) : '',
      coPresenters: form.co_presenters.map(cp => ({
        name: sanitizeInput(cp.name),
        email: cp.email.trim().toLowerCase(),
        affiliation: sanitizeInput(cp.affiliation),
      })),
    };
    
    try {
      const res = await fetch('/api/conference-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          conferenceId: conference?.id || null,
          submissionType: sanitizedData.submissionType,
          title: sanitizedData.title,
          abstract: sanitizedData.abstract,
          keywords: sanitizedData.keywords,
          presenterName: sanitizedData.presenterName,
          presenterEmail: sanitizedData.presenterEmail,
          presenterAffiliation: sanitizedData.presenterAffiliation,
          presenterBio: sanitizedData.presenterBio,
          coPresenters: sanitizedData.coPresenters,
          fileName: form.file?.name ?? null,
          fileSizeBytes: form.file?.size ?? null,
          status: 'submitted',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setTrackingCode(data.trackingCode);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (trackingCode) {
    return (
      <div className="min-h-screen bg-[#08091A]">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-[#C8A75E]/15 border-2 border-[#C8A75E]/40 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-[#C8A75E]" />
          </div>
          <p className="text-xs tracking-[0.25em] text-[#C8A75E]/60 uppercase mb-3">Submission Received</p>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-4">
            Thank You, {form.presenter_name.split(' ')[0]}
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed mb-8 max-w-md mx-auto">
            Your submission has been received and is queued for editorial review. You will be contacted at{' '}
            <span className="text-[#C8A75E]">{form.presenter_email}</span> within 2–4 weeks.
          </p>
          <div className="glass-panel border border-[#C8A75E]/30 rounded-2xl p-8 mb-8 bg-[#C8A75E]/5">
            <p className="text-xs text-[#AAB0D6]/50 uppercase tracking-widest mb-3">Your Tracking Code</p>
            <p className="text-3xl font-mono font-bold text-[#C8A75E] tracking-widest">{trackingCode}</p>
            <p className="text-xs text-[#AAB0D6]/40 mt-3">Save this code to check your submission status</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contribute/conference/status">
              <Button className="bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#C8A75E]/90 font-semibold px-8">
                Track My Submission
              </Button>
            </Link>
            <Link href="/contribute">
              <Button variant="outline" className="border-white/15 text-[#AAB0D6] hover:text-[#F5F3EE]">
                Back to Contribute
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="border-b border-white/5 bg-[#0A0C18]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/contribute" className="flex items-center gap-2 text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Contribute
          </Link>
          <div className="text-right">
            <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest">{conference ? conference.title : 'Sufi Science Symposium 2026'}</p>
            <p className="text-sm font-serif text-[#F5F3EE]">Conference Submission Portal</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#C8A75E]/60 uppercase mb-2">Featured Event {conference?.start_date ? `· ${new Date(conference.start_date).getFullYear()}` : '· 2026'}</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F3EE] mb-3">
            Submit Your Paper
          </h1>
          <p className="text-[#AAB0D6] max-w-lg mx-auto text-sm leading-relaxed">
            Step {step} of 4 — complete all sections to register your submission to the {conference?.title || 'Sufi Science Symposium'}.
          </p>
        </div>

        <StepIndicator current={step} />

        <div className="glass-panel border border-white/8 rounded-2xl p-8 min-h-[400px]">

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-1">Submission Type</h2>
                <p className="text-sm text-[#AAB0D6]">Select the format that best describes your contribution.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {SUBMISSION_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { set('submission_type', t.value); if (fieldErrors.submission_type) setFieldErrors(prev => ({ ...prev, submission_type: '' })); }}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      form.submission_type === t.value
                        ? 'border-[#C8A75E] bg-[#C8A75E]/8 text-[#C8A75E]'
                        : `${fieldErrors.submission_type ? 'border-red-500/50' : 'border-white/8'} bg-white/2 text-[#AAB0D6] hover:border-white/20 hover:bg-white/4`
                    }`}
                  >
                    <p className="font-semibold text-sm">{t.label}</p>
                  </button>
                ))}
              </div>
              {fieldErrors.submission_type && <p className="text-xs text-red-400 mt-2">{fieldErrors.submission_type}</p>}

              <div className="pt-4 p-4 rounded-xl bg-[#6B9BD1]/5 border border-[#6B9BD1]/15">
                <p className="text-xs text-[#6B9BD1] font-semibold mb-1 uppercase tracking-wide">Deadline</p>
                <p className="text-sm text-[#AAB0D6]">Submission deadline and event dates will be announced. Early submissions are encouraged.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-1">Presenter Details</h2>
                <p className="text-sm text-[#AAB0D6]">Provide your contact and biographical information.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Full Name *</Label>
                  <Input
                    value={user?.name || form.presenter_name}
                    onChange={(e) => { set('presenter_name', e.target.value); if (fieldErrors.presenter_name) setFieldErrors(prev => ({ ...prev, presenter_name: '' })); }}
                    disabled={!!user}
                    className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] ${user ? 'opacity-60 cursor-not-allowed' : ''} ${fieldErrors.presenter_name ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Dr. Jane Smith"
                  />
                  {fieldErrors.presenter_name && !user && <p className="text-xs text-red-400 mt-1">{fieldErrors.presenter_name}</p>}
                </div>
                <div>
                  <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Email Address *</Label>
                  <Input
                    type="email"
                    value={user?.email || form.presenter_email}
                    onChange={(e) => { set('presenter_email', e.target.value); if (fieldErrors.presenter_email) setFieldErrors(prev => ({ ...prev, presenter_email: '' })); }}
                    disabled={!!user}
                    className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] ${user ? 'opacity-60 cursor-not-allowed' : ''} ${fieldErrors.presenter_email ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="jane@university.edu"
                  />
                  {fieldErrors.presenter_email && !user && <p className="text-xs text-red-400 mt-1">{fieldErrors.presenter_email}</p>}
                </div>
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Institutional Affiliation *</Label>
                <Input
                  value={form.presenter_affiliation}
                  onChange={(e) => { set('presenter_affiliation', e.target.value); if (fieldErrors.presenter_affiliation) setFieldErrors(prev => ({ ...prev, presenter_affiliation: '' })); }}
                  className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] ${fieldErrors.presenter_affiliation ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="University or Organisation"
                />
                {fieldErrors.presenter_affiliation && <p className="text-xs text-red-400 mt-1">{fieldErrors.presenter_affiliation}</p>}
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Short Bio *</Label>
                <Textarea
                  value={form.presenter_bio}
                  onChange={(e) => { set('presenter_bio', e.target.value); if (fieldErrors.presenter_bio) setFieldErrors(prev => ({ ...prev, presenter_bio: '' })); }}
                  className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] min-h-[100px] ${fieldErrors.presenter_bio ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="2–3 sentences for the symposium programme (max 200 words)"
                />
                {fieldErrors.presenter_bio && <p className="text-xs text-red-400 mt-1">{fieldErrors.presenter_bio}</p>}
              </div>

              <div className="border-t border-white/5 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-[#F5F3EE] text-sm">Co-Presenters / Co-Authors</Label>
                  <button
                    onClick={addCoPresenter}
                    className="flex items-center gap-1.5 text-xs text-[#C8A75E] hover:text-[#C8A75E]/80 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
                {form.co_presenters.map((cp, idx) => (
                  <div key={idx} className="grid sm:grid-cols-3 gap-3 mb-3 p-4 rounded-xl bg-white/2 border border-white/5 relative">
                    <button
                      onClick={() => removeCoPresenter(idx)}
                      className="absolute top-2 right-2 text-[#AAB0D6]/40 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <Input
                      value={cp.name}
                      onChange={(e) => updateCoPresenter(idx, 'name', e.target.value)}
                      className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] text-xs"
                      placeholder="Name"
                    />
                    <Input
                      value={cp.email}
                      onChange={(e) => updateCoPresenter(idx, 'email', e.target.value)}
                      className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] text-xs"
                      placeholder="Email"
                    />
                    <Input
                      value={cp.affiliation}
                      onChange={(e) => updateCoPresenter(idx, 'affiliation', e.target.value)}
                      className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] text-xs"
                      placeholder="Affiliation"
                    />
                  </div>
                ))}
                {form.co_presenters.length === 0 && (
                  <p className="text-xs text-[#AAB0D6]/30 italic">No co-presenters added.</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-1">Content & Upload</h2>
                <p className="text-sm text-[#AAB0D6]">Provide your submission title, abstract, and optional file.</p>
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Submission Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => { set('title', e.target.value); if (fieldErrors.title) setFieldErrors(prev => ({ ...prev, title: '' })); }}
                  className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] ${fieldErrors.title ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Full title of your paper or proposal"
                />
                {fieldErrors.title && <p className="text-xs text-red-400 mt-1">{fieldErrors.title}</p>}
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Abstract *</Label>
                <Textarea
                  value={form.abstract}
                  onChange={(e) => { set('abstract', e.target.value); if (fieldErrors.abstract) setFieldErrors(prev => ({ ...prev, abstract: '' })); }}
                  className={`bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E] min-h-[140px] ${fieldErrors.abstract ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="150–300 words summarising your research, methodology, and key findings"
                />
                <p className="text-[10px] text-[#AAB0D6]/30 mt-1">{form.abstract.split(/\s+/).filter(Boolean).length} words</p>
                {fieldErrors.abstract && <p className="text-xs text-red-400 mt-1">{fieldErrors.abstract}</p>}
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Keywords</Label>
                <Input
                  value={form.keywords}
                  onChange={(e) => set('keywords', e.target.value)}
                  className="bg-[#0D1020] border-white/10 text-[#F5F3EE] focus:border-[#C8A75E]"
                  placeholder="consciousness, contemplative science, Sufism (comma separated)"
                />
              </div>
              <div>
                <Label className="text-[#F5F3EE] text-sm mb-1.5 block">Upload Full Paper / Proposal (Optional)</Label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#C8A75E]/40 hover:bg-[#C8A75E]/3 transition-all group">
                  <div className="text-center">
                    {form.file ? (
                      <div className="flex items-center gap-2 text-[#C8A75E]">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{form.file.name}</span>
                        <span className="text-xs text-[#AAB0D6]/50">({(form.file.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-[#AAB0D6]/30 group-hover:text-[#C8A75E]/60 mx-auto mb-2 transition-colors" />
                        <p className="text-sm text-[#AAB0D6]/50">Click to upload PDF, DOCX, or PPTX</p>
                        <p className="text-xs text-[#AAB0D6]/25 mt-1">Max 25 MB</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => set('file', e.target.files?.[0] ?? null)}
                  />
                </label>
                {form.file && (
                  <button
                    onClick={() => set('file', null)}
                    className="mt-2 text-xs text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Remove file
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-1">Review & Submit</h2>
                <p className="text-sm text-[#AAB0D6]">Verify your details before final submission.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                  <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Submission</p>
                  <p className="text-sm font-semibold text-[#F5F3EE]">{SUBMISSION_TYPES.find(t => t.value === form.submission_type)?.label}</p>
                  <p className="text-xs text-[#AAB0D6] mt-1 line-clamp-2">{form.title}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                  <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Presenter</p>
                  <p className="text-sm font-semibold text-[#F5F3EE]">{form.presenter_name}</p>
                  <p className="text-xs text-[#AAB0D6]">{form.presenter_email}</p>
                  <p className="text-xs text-[#AAB0D6]/60">{form.presenter_affiliation}</p>
                </div>
                {form.co_presenters.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                    <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Co-Presenters</p>
                    {form.co_presenters.map((cp, i) => (
                      <p key={i} className="text-xs text-[#AAB0D6]">{cp.name} — {cp.affiliation}</p>
                    ))}
                  </div>
                )}
                {form.file && (
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                    <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Attached File</p>
                    <p className="text-xs text-[#C8A75E]">{form.file.name}</p>
                    <p className="text-[10px] text-[#AAB0D6]/40">{(form.file.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Abstract Preview</p>
                <p className="text-xs text-[#AAB0D6] leading-relaxed line-clamp-4">{form.abstract}</p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#C8A75E]/5 border border-[#C8A75E]/20">
                <Checkbox
                  id="terms"
                  checked={form.terms_accepted}
                  onCheckedChange={(v) => set('terms_accepted', v as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-[#AAB0D6] leading-relaxed cursor-pointer">
                  I confirm this submission is original work and I have the authority to submit it. I have read the{' '}
                  <Link href="/contribute/guidelines" className="text-[#C8A75E] hover:underline">submission guidelines</Link>
                  {' '}and{' '}
                  <Link href="/contribute/terms" className="text-[#C8A75E] hover:underline">terms and policies</Link>.
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={() => { setFieldErrors({}); setStep((s) => (s - 1) as Step); }}
                className="text-[#AAB0D6] hover:text-[#F5F3EE]"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/contribute/conference/status">
              <Button variant="ghost" className="text-[#AAB0D6]/50 hover:text-[#AAB0D6] text-xs">
                Track existing submission
              </Button>
            </Link>
            {step < 4 ? (
              <Button
                onClick={() => {
                  setFieldErrors({});
                  if (validateStep()) setStep((s) => (s + 1) as Step);
                }}
                disabled={!canAdvance() || Object.keys(fieldErrors).length > 0}
                className="bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#C8A75E]/90 disabled:opacity-40 font-semibold px-6"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!form.terms_accepted || isSubmitting}
                className="bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#C8A75E]/90 disabled:opacity-40 font-semibold px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Paper
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConferenceSubmissionPageWithGuard() {
  return (
    <FormGuard
      formType="conference"
      checkExisting={async (uid) => {
        const res = await fetch('/api/form-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, formType: 'conference' }),
        });
        const data = await res.json();
        return data.exists;
      }}
    >
      <ConferenceSubmissionPage />
    </FormGuard>
  );
}
