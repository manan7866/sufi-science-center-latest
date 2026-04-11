'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, FileText, Send, CircleCheck as CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import FormGuard from '@/components/form-guard';
import { generalSubmissionSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitization';

const submissionTypes = {
  research_paper: 'Research Paper',
  dialogue_proposal: 'Dialogue Proposal',
  interview_proposal: 'Interview Proposal',
  sacred_media: 'Sacred Media Submission',
  practice_submission: 'Practice and Ritual',
  sacred_text: 'Sacred Text and Poetry',
  article_essay: 'Thematic Article',
  conference_workshop: 'Conference / Workshop',
};

function SubmitFormContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = searchParams.get('type') || '';

  const [formData, setFormData] = useState({
    submission_type: initialType,
    title: '',
    abstract: '',
    content: '',
    terms_accepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.terms_accepted) {
      setError('You must accept the terms and conditions to submit.');
      return;
    }

    // Validate form data with Zod
    const validationResult = generalSubmissionSchema.safeParse({
      submissionType: formData.submission_type,
      title: formData.title,
      abstract: formData.abstract,
      content: formData.content,
      contactName: user?.name || '',
      contactEmail: user?.email || '',
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      setError(errors);
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      submissionType: formData.submission_type,
      title: sanitizeInput(formData.title),
      abstract: sanitizeInput(formData.abstract),
      content: sanitizeInput(formData.content),
      contactName: sanitizeInput(user?.name || ''),
      contactEmail: (user?.email || '').trim().toLowerCase(),
    };

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          submission_type: sanitizedData.submissionType,
          title: sanitizedData.title,
          abstract: sanitizedData.abstract,
          content: sanitizedData.content,
          contact_name: sanitizedData.contactName,
          contact_email: sanitizedData.contactEmail,
          contact_affiliation: null,
          status: 'submitted',
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit. Please try again.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20">
        <ObservatoryHero subtitle="Contribute" title="Submission Received" description="Thank you for your contribution to the Sufi Science Center knowledge ecosystem." />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="glass-panel border-[#C8A75E]/30 bg-[#C8A75E]/5">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-8 h-8 text-[#C8A75E]" />
                <CardTitle className="text-2xl text-[#F5F3EE]">Successfully Submitted</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p>Your submission has been received and will undergo editorial review. You can expect to hear back from us within 2-4 weeks.</p>
              <p>We will contact you at <strong className="text-[#C8A75E]">{user?.email}</strong> with updates on the review process.</p>
              <div className="pt-6">
                <a href="/portal"><Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">Go to Dashboard</Button></a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero subtitle="Contribute" title="Submit Your Work" description="Share your research, wisdom, and creative contributions with the global community." />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/contribute">
          <Button variant="ghost" className="mb-8 text-[#AAB0D6] hover:text-[#C8A75E]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contribute Portal
          </Button>
        </Link>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-[#C8A75E]" />
              <CardTitle className="text-2xl text-[#F5F3EE]">Submission Form</CardTitle>
            </div>
            <p className="text-[#AAB0D6]">Please complete all required fields. Your submission will be reviewed by our editorial team.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Auto-filled user info */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-lg bg-white/2 border border-white/5">
                <div>
                  <Label className="text-[#AAB0D6]/50 text-xs">Your Name</Label>
                  <Input value={user?.name || ''} disabled className="mt-1 bg-white/3 border-white/5 text-[#AAB0D6]/50 cursor-not-allowed" />
                </div>
                <div>
                  <Label className="text-[#AAB0D6]/50 text-xs">Email Address</Label>
                  <Input value={user?.email || ''} disabled className="mt-1 bg-white/3 border-white/5 text-[#AAB0D6]/50 cursor-not-allowed" />
                </div>
              </div>

              <div>
                <Label htmlFor="submission_type" className="text-[#F5F3EE]">Submission Type *</Label>
                <Select value={formData.submission_type} onValueChange={(value) => setFormData({ ...formData, submission_type: value })} required>
                  <SelectTrigger className="mt-2 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border-white/10 focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20">
                    <SelectValue placeholder="Select submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(submissionTypes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title" className="text-[#F5F3EE]">Title *</Label>
                <Input id="title" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="mt-2 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border-white/10 focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20" required />
              </div>

              <div>
                <Label htmlFor="abstract" className="text-[#F5F3EE]">Abstract / Summary *</Label>
                <Textarea id="abstract" value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} className="mt-2 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border-white/10 focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 min-h-[100px]" placeholder="Provide a brief summary of your submission (150-300 words)" required />
              </div>

              <div>
                <Label htmlFor="content" className="text-[#F5F3EE]">Full Content *</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="mt-2 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border-white/10 focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 min-h-[300px]" placeholder="Paste or write your full submission here" required />
              </div>

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox id="terms" checked={formData.terms_accepted} onCheckedChange={(checked) => setFormData({ ...formData, terms_accepted: checked as boolean })} className="mt-1" />
                <Label htmlFor="terms" className="text-[#AAB0D6] text-sm leading-relaxed cursor-pointer">
                  I have read and agree to the <Link href="/contribute/terms" className="text-[#C8A75E] hover:underline">submission terms and policies</Link>. I confirm that this work is original and I have the right to submit it for publication.
                </Label>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isSubmitting || !formData.terms_accepted} className="flex-1 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] disabled:opacity-50">
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>) : (<><Send className="w-4 h-4 mr-2" />Submit for Review</>)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SubmitPage() {
  const { user, loading } = useAuth();

  return (
    <FormGuard
      formType="submission"
      checkExisting={async (uid) => {
        const res = await fetch('/api/form-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, formType: 'submission' }),
        });
        const data = await res.json();
        return data.exists;
      }}
    >
      <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" /></div>}>
        <SubmitFormContent />
      </Suspense>
    </FormGuard>
  );
}
