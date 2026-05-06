'use client';

import { Suspense, useState, useCallback } from 'react';
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
import { ArrowLeft, FileText, Send, CircleCheck as CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import FormGuard from '@/components/form-guard';
import { submissionTypeSchemas } from '@/lib/validations';
import { sanitizeInput, validateAndSanitizeString } from '@/lib/sanitization';
import { z } from 'zod';

const SUBMISSION_TYPES = {
  research_paper: { label: 'Research Paper', schemaKey: 'research_paper' },
  dialogue_proposal: { label: 'Dialogue Proposal', schemaKey: 'dialogue_proposal' },
  interview_proposal: { label: 'Interview Proposal', schemaKey: 'interview_proposal' },
  sacred_media: { label: 'Sacred Media Submission', schemaKey: 'sacred_media' },
  practice_submission: { label: 'Practice and Ritual', schemaKey: 'practice_submission' },
  sacred_text: { label: 'Sacred Text and Poetry', schemaKey: 'sacred_text' },
  article_essay: { label: 'Thematic Article', schemaKey: 'article_essay' },
  conference_workshop: { label: 'Conference / Workshop', schemaKey: 'conference_workshop' },
};

const TYPE_DESCRIPTIONS: Record<string, string> = {
  research_paper: 'Share your academic research with the global scholarly community.',
  dialogue_proposal: 'Propose a dialogue session for scholars and thought leaders.',
  interview_proposal: 'Nominate yourself or someone else for an insightful interview.',
  sacred_media: 'Submit sacred music, visual art, film, or performance recordings.',
  practice_submission: 'Share authentic practices and rituals from your tradition.',
  sacred_text: 'Submit original poetry, translations, or sacred text commentaries.',
  article_essay: 'Contribute thematic articles and essays on Sufi science topics.',
  conference_workshop: 'Propose conferences, workshops, or training programs.',
};

function FieldRenderer({ fieldKey, value, onChange, error, fieldOrder }: { fieldKey: string; value: any; onChange: (v: any) => void; error?: string; fieldOrder?: string[] }) {
  const baseInput = 'mt-2 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border-white/10 focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20';
  const baseLabel = 'text-[#F5F3EE]';
  const errorBorder = error ? 'border-red-500/50' : '';

  const boolFields = ['originalityDeclaration', 'ethicsDeclaration', 'rightsOwnership', 'permissionToPublish', 'consentConfirmation'];
  if (boolFields.includes(fieldKey)) {
    return (
      <div className="flex items-start space-x-3">
        <Checkbox id={fieldKey} checked={!!value} onCheckedChange={(c) => onChange(!!c)} className="mt-1" />
        <Label htmlFor={fieldKey} className="text-[#AAB0D6] text-sm leading-relaxed cursor-pointer">
          {fieldKey === 'originalityDeclaration' && 'I confirm this work is original and I hold the rights to submit it.'}
          {fieldKey === 'ethicsDeclaration' && 'I confirm this research adheres to ethical guidelines and standards.'}
          {fieldKey === 'rightsOwnership' && 'I confirm I own the rights to this media or have obtained proper permissions.'}
          {fieldKey === 'permissionToPublish' && 'I grant permission for Sufi Science Center to publish and distribute this work.'}
          {fieldKey === 'consentConfirmation' && 'I confirm I have obtained consent from the nominee (if nominating someone else).'}
        </Label>
      </div>
    );
  }

  const textareaFields = ['abstract', 'whyItMatters', 'nomineeBio', 'whyInterview', 'suggestedQuestions', 'stepDescription', 'lineageContext', 'textBody', 'fullText', 'description', 'objectives', 'mainQuestion', 'proposedSpeakers', 'lyricsText', 'culturalContext', 'supportingNotes', 'commentaryContext', 'references', 'requirementsResources', 'budgetSponsorship', 'whoShouldPractice', 'requiredPreparation', 'culturalSensitivity', 'traditionSource', 'speakersFacilitators'];
  if (textareaFields.includes(fieldKey)) {
    return (
      <div>
        <Label htmlFor={fieldKey} className={baseLabel}>{getFieldLabel(fieldKey)}</Label>
        <Textarea id={fieldKey} value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${baseInput} ${errorBorder} min-h-[100px]`} placeholder={getFieldPlaceholder(fieldKey)} />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  const selectFields = ['mediaType', 'programType'];
  if (selectFields.includes(fieldKey)) {
    const options = fieldKey === 'mediaType'
      ? [['audio', 'Audio'], ['video', 'Video'], ['image', 'Image'], ['performance', 'Performance']]
      : [['conference', 'Conference'], ['workshop', 'Workshop'], ['training', 'Training'], ['seminar', 'Seminar']];
    return (
      <div>
        <Label htmlFor={fieldKey} className={baseLabel}>{getFieldLabel(fieldKey)}</Label>
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className={`${baseInput} ${errorBorder}`}>
            <SelectValue placeholder={`Select ${getFieldLabel(fieldKey).toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  if (fieldKey === 'format') {
    const isDialogue = fieldOrder?.includes('dialogueTitle') ?? false;
    const options = isDialogue
      ? [['panel', 'Panel'], ['series', 'Series'], ['debate', 'Debate'], ['roundtable', 'Roundtable']]
      : [['online', 'Online'], ['in-person', 'In-Person'], ['hybrid', 'Hybrid']];
    return (
      <div>
        <Label htmlFor={fieldKey} className={baseLabel}>{getFieldLabel(fieldKey)}</Label>
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className={`${baseInput} ${errorBorder}`}>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  if (fieldKey === 'contentType') {
    const options = [['original_poetry', 'Original Poetry'], ['translation', 'Translation'], ['commentary', 'Commentary'], ['sacred_text_excerpt', 'Sacred Text Excerpt']];
    return (
      <div>
        <Label htmlFor={fieldKey} className={baseLabel}>{getFieldLabel(fieldKey)}</Label>
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className={`${baseInput} ${errorBorder}`}>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={fieldKey} className={baseLabel}>{getFieldLabel(fieldKey)}</Label>
      <Input id={fieldKey} type={fieldKey.includes('email') || fieldKey.includes('link') || fieldKey.includes('url') ? 'url' : 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${baseInput} ${errorBorder}`} placeholder={getFieldPlaceholder(fieldKey)} />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function getFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    authorName: 'Author Name', email: 'Email', affiliation: 'Affiliation', paperTitle: 'Paper Title',
    abstract: 'Abstract', discipline: 'Discipline / Field', keywords: 'Keywords',
    fileUrl: 'Full Paper Upload URL', citationStyle: 'Citation Style', originalityDeclaration: 'Originality Declaration',
    ethicsDeclaration: 'Ethics Declaration', suggestedModule: 'Suggested Knowledge Module',
    coAuthors: 'Co-Authors', orcidLink: 'ORCID / Profile Link',
    proposerName: 'Proposer Name', dialogueTitle: 'Dialogue Title', mainQuestion: 'Main Question / Theme',
    proposedSpeakers: 'Proposed Speakers', format: 'Format', targetAudience: 'Target Audience',
    whyItMatters: 'Why This Matters', preferredDateTime: 'Preferred Date / Time', supportingNotes: 'Supporting Notes',
    nominatorName: 'Nominator Name', nomineeName: 'Nominee Name', nomineeBio: 'Nominee Bio',
    fieldOfWork: 'Field of Work', whyInterview: 'Why This Person Should Be Interviewed',
    suggestedQuestions: 'Suggested Questions', linksToWork: 'Links to Work', consentConfirmation: 'Consent Confirmation',
    artistName: 'Artist Name', mediaTitle: 'Media Title', mediaType: 'Media Type', language: 'Language',
    traditionContext: 'Tradition / Context', lyricsText: 'Lyrics / Text (if applicable)',
    rightsOwnership: 'Rights Ownership', permissionToPublish: 'Permission to Publish',
    culturalContext: 'Cultural / Spiritual Context', credits: 'Credits',
    contributorName: 'Contributor Name', practiceName: 'Practice Name', traditionSource: 'Tradition / Source',
    lineageContext: 'Lineage / Context', stepDescription: 'Step-by-Step Description',
    safetyConsiderations: 'Safety Considerations', whoShouldPractice: 'Who Should / Should Not Practice',
    durationFrequency: 'Duration / Frequency', requiredPreparation: 'Required Preparation',
    culturalSensitivity: 'Cultural Sensitivity Note',
    title: 'Title', contentType: 'Content Type', originalSource: 'Original Source (if translated)',
    translationRights: 'Translation Rights', textBody: 'Text Body',
    commentaryContext: 'Commentary / Context', authorAttribution: 'Author Attribution',
    articleTitle: 'Article Title', themeCategory: 'Theme / Category', abstractSummary: 'Abstract / Summary',
    fullText: 'Full Article Text', intendedAudience: 'Intended Audience',
    organizerName: 'Organizer Name', programTitle: 'Program Title', programType: 'Program Type',
    objectives: 'Objectives', speakersFacilitators: 'Speakers / Facilitators', duration: 'Duration',
    preferredDates: 'Preferred Dates', audience: 'Audience', expectedParticipants: 'Expected Participants',
    requirementsResources: 'Requirements / Resources', budgetSponsorship: 'Budget / Sponsorship Need',
  };
  return labels[key] || key;
}

function getFieldPlaceholder(key: string): string {
  const placeholders: Record<string, string> = {
    authorName: 'Enter your full name', email: 'your.email@example.com', affiliation: 'University or institution',
    paperTitle: 'Enter the title of your paper', abstract: 'Provide a brief summary (150-300 words)',
    discipline: 'e.g., Sufi Philosophy, Islamic Studies, Neuroscience', keywords: 'Comma-separated keywords',
    fileUrl: 'https://drive.google.com/... or upload link', citationStyle: 'APA, MLA, Chicago, etc.',
    suggestedModule: 'Suggest which knowledge module this fits', coAuthors: 'Names and affiliations of co-authors',
    orcidLink: 'https://orcid.org/...', proposerName: 'Your full name',
    dialogueTitle: 'Title of the proposed dialogue', mainQuestion: 'What central question or theme will be explored?',
    proposedSpeakers: 'Names and brief backgrounds of proposed speakers', targetAudience: 'Who should attend this dialogue?',
    whyItMatters: 'Explain the significance and relevance of this dialogue',
    preferredDateTime: 'Preferred dates and times (flexible)', supportingNotes: 'Any additional context or supporting information',
    nominatorName: 'Your full name', nomineeName: 'Full name of the nominee',
    nomineeBio: 'Brief biography of the nominee', fieldOfWork: 'Primary field or discipline',
    whyInterview: 'Explain why this person deserves to be interviewed',
    suggestedQuestions: 'List 5-10 suggested interview questions', linksToWork: 'Links to their published work or media',
    artistName: 'Your name or artist name', mediaTitle: 'Title of the media work',
    language: 'Primary language of the media', traditionContext: 'Spiritual or cultural tradition this media belongs to',
    lyricsText: 'Include lyrics, script, or descriptive text', culturalContext: 'Describe the cultural and spiritual significance',
    credits: 'Additional credits and acknowledgments', contributorName: 'Your full name',
    practiceName: 'Name of the practice or ritual', traditionSource: 'Source tradition or lineage',
    lineageContext: 'Historical and spiritual lineage context',
    stepDescription: 'Detailed step-by-step instructions for the practice',
    safetyConsiderations: 'Important safety warnings and precautions',
    whoShouldPractice: 'Who benefits from this practice and who should avoid it',
    durationFrequency: 'e.g., 20 minutes daily, 1 hour weekly', requiredPreparation: 'Any preparation needed before practicing',
    culturalSensitivity: 'Notes on cultural sensitivity and appropriate context',
    title: 'Title of the work', originalSource: 'Original author and source text',
    translationRights: 'Do you hold translation rights?',
    textBody: 'Paste the full text here', commentaryContext: 'Provide context or commentary about the text',
    authorAttribution: 'How should the author be credited?', articleTitle: 'Title of your article',
    themeCategory: 'Category or theme of the article', abstractSummary: 'Brief summary of the article',
    fullText: 'Paste or write the full article here', references: 'List of references and citations',
    intendedAudience: 'Who is this article written for?', organizerName: 'Your full name',
    programTitle: 'Title of the program', description: 'Detailed description of the program',
    objectives: 'What are the learning objectives and outcomes?', speakersFacilitators: 'Names and roles of speakers/facilitators',
    duration: 'e.g., 2 days, 4 hours, 1 week', preferredDates: 'Preferred dates or date range',
    audience: 'Target audience description', expectedParticipants: 'Expected number of participants',
    requirementsResources: 'Special requirements, equipment, or resources needed',
    budgetSponsorship: 'Describe budget needs or sponsorship requirements',
  };
  return placeholders[key] || '';
}

const TYPE_FIELD_ORDER: Record<string, string[]> = {
  research_paper: ['authorName', 'email', 'affiliation', 'paperTitle', 'abstract', 'discipline', 'keywords', 'fileUrl', 'citationStyle', 'coAuthors', 'orcidLink', 'suggestedModule', 'originalityDeclaration', 'ethicsDeclaration'],
  dialogue_proposal: ['proposerName', 'email', 'dialogueTitle', 'mainQuestion', 'proposedSpeakers', 'format', 'targetAudience', 'whyItMatters', 'preferredDateTime', 'supportingNotes'],
  interview_proposal: ['nominatorName', 'nomineeName', 'nomineeBio', 'email', 'fieldOfWork', 'whyInterview', 'suggestedQuestions', 'linksToWork', 'consentConfirmation'],
  sacred_media: ['artistName', 'email', 'mediaTitle', 'mediaType', 'language', 'traditionContext', 'lyricsText', 'fileUrl', 'culturalContext', 'credits', 'rightsOwnership', 'permissionToPublish'],
  practice_submission: ['contributorName', 'email', 'practiceName', 'traditionSource', 'lineageContext', 'stepDescription', 'safetyConsiderations', 'whoShouldPractice', 'durationFrequency', 'requiredPreparation', 'culturalSensitivity'],
  sacred_text: ['contributorName', 'email', 'title', 'contentType', 'language', 'originalSource', 'translationRights', 'textBody', 'commentaryContext', 'authorAttribution', 'permissionToPublish'],
  article_essay: ['authorName', 'email', 'articleTitle', 'themeCategory', 'abstractSummary', 'fullText', 'references', 'keywords', 'intendedAudience', 'originalityDeclaration'],
  conference_workshop: ['organizerName', 'email', 'programTitle', 'programType', 'description', 'objectives', 'speakersFacilitators', 'duration', 'preferredDates', 'format', 'audience', 'expectedParticipants', 'requirementsResources', 'budgetSponsorship'],
};

function SubmitFormContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get('type') || '';

  const validType = SUBMISSION_TYPES[typeParam as keyof typeof SUBMISSION_TYPES];
  if (!validType) {
    return (
      <div className="min-h-screen pt-20">
        <ObservatoryHero subtitle="Contribute" title="Invalid Submission Type" description="The submission type you selected is not recognized." />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="glass-panel border-white/10">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-[#AAB0D6] mb-6">Please select a valid submission type from the contribute portal.</p>
              <Link href="/contribute">
                <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Contribute Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const schema = submissionTypeSchemas[validType.schemaKey];
  const fieldOrder = TYPE_FIELD_ORDER[validType.schemaKey] || [];

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!termsAccepted) {
      setError('You must accept the terms and conditions to submit.');
      return;
    }

    const dataToValidate = {
      ...formData,
      email: user?.email || formData.email || '',
      authorName: formData.authorName || user?.name || '',
      contributorName: formData.contributorName || user?.name || '',
      proposerName: formData.proposerName || user?.name || '',
      nominatorName: formData.nominatorName || user?.name || '',
      artistName: formData.artistName || user?.name || '',
      organizerName: formData.organizerName || user?.name || '',
    };

    try {
      schema.parse(dataToValidate);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newFieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) newFieldErrors[e.path[0] as string] = e.message;
        });
        setFieldErrors(newFieldErrors);
        setError('Please fix the errors below.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const submissionData: Record<string, any> = {};
      for (const key of Object.keys(formData)) {
        const val = formData[key];
        if (typeof val === 'boolean') {
          submissionData[key] = val;
        } else if (typeof val === 'string' && val.trim()) {
          const sanitized = validateAndSanitizeString(val.trim(), { maxLength: 15000 });
          submissionData[key] = sanitized !== null ? sanitized : '';
        } else if (typeof val === 'string') {
          submissionData[key] = '';
        }
      }

      const title = formData.paperTitle || formData.dialogueTitle || formData.mediaTitle || formData.practiceName || formData.articleTitle || formData.programTitle || formData.title || formData.nomineeName || 'Untitled Submission';
      const abstract = formData.abstract || formData.whyItMatters || formData.whyInterview || formData.culturalContext || formData.lineageContext || formData.abstractSummary || formData.description || 'No abstract provided';

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          submission_type: typeParam,
          title: sanitizeInput(title),
          abstract: sanitizeInput(abstract),
          content: sanitizeInput(formData.stepDescription || formData.textBody || formData.fullText || formData.mainQuestion || 'N/A'),
          submission_data: submissionData,
          contact_name: sanitizeInput(user?.name || formData.authorName || formData.contributorName || formData.proposerName || formData.nominatorName || formData.artistName || formData.organizerName || ''),
          contact_email: (user?.email || formData.email || '').trim().toLowerCase(),
          contact_affiliation: sanitizeInput(formData.affiliation || ''),
          status: 'submitted',
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to submit. Please try again.');
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
              <p>Your <strong className="text-[#C8A75E]">{validType.label}</strong> has been received and will undergo editorial review. You can expect to hear back from us within 2-4 weeks.</p>
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
      <ObservatoryHero subtitle="Contribute" title={validType.label} description={TYPE_DESCRIPTIONS[typeParam] || 'Share your contribution with the global community.'} />

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
              <CardTitle className="text-2xl text-[#F5F3EE]">{validType.label} Form</CardTitle>
            </div>
            <p className="text-[#AAB0D6]">Please complete all required fields marked with *. Your submission will be reviewed by our editorial team.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {fieldOrder.map((key) => (
                <FieldRenderer key={key} fieldKey={key} value={formData[key]} onChange={(v) => handleFieldChange(key, v)} error={fieldErrors[key]} fieldOrder={fieldOrder} />
              ))}

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(c) => setTermsAccepted(!!c)} className="mt-1" />
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
                <Button type="submit" disabled={isSubmitting || !termsAccepted} className="flex-1 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] disabled:opacity-50">
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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

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
