'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Loader2, FileText, Calendar, Mail, MapPin, RefreshCw, AlertCircle } from 'lucide-react';

const SUBMISSION_TYPE_LABELS: Record<string, string> = {
  research_paper: 'Research Paper',
  dialogue_proposal: 'Dialogue Proposal',
  interview_proposal: 'Interview Proposal',
  sacred_media: 'Sacred Media',
  practice_submission: 'Practice & Ritual',
  sacred_text: 'Sacred Text & Poetry',
  article_essay: 'Thematic Article',
  conference_workshop: 'Conference / Workshop',
};

const WORKFLOW_STAGES: Record<string, { value: string; label: string; color: string; bg: string }[]> = {
  research_paper: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'editorial_screening', label: 'Editorial Screening', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'peer_review', label: 'Peer Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'revision_requested', label: 'Revision Requested', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    { value: 'accepted', label: 'Accepted', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'rejected', label: 'Rejected', color: 'text-[#E07070]', bg: 'bg-[#E07070]/10 border-[#E07070]/20' },
    { value: 'published', label: 'Published', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  dialogue_proposal: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'theme_review', label: 'Theme Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'speaker_review', label: 'Speaker Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'approved', label: 'Approved', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'scheduled', label: 'Scheduled', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'published_event', label: 'Published Event', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  interview_proposal: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'editorial_review', label: 'Editorial Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'contact_nominee', label: 'Contact Nominee', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'approved', label: 'Approved', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'scheduled', label: 'Scheduled', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'published', label: 'Published', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  sacred_media: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'rights_check', label: 'Rights Check', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'cultural_review', label: 'Cultural Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'media_review', label: 'Media Review', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    { value: 'accepted', label: 'Accepted', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'published', label: 'Published', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  practice_submission: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'authenticity_review', label: 'Authenticity Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'safety_review', label: 'Safety Review', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    { value: 'editorial_review', label: 'Editorial Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'approved', label: 'Approved', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'restricted', label: 'Restricted', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
    { value: 'declined', label: 'Declined', color: 'text-[#E07070]', bg: 'bg-[#E07070]/10 border-[#E07070]/20' },
  ],
  sacred_text: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'literary_review', label: 'Literary Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'source_rights_review', label: 'Source/Rights Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'editorial_review', label: 'Editorial Review', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    { value: 'accepted', label: 'Accepted', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'published', label: 'Published', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  article_essay: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'editorial_screening', label: 'Editorial Screening', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'revision_requested', label: 'Revision Requested', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    { value: 'accepted', label: 'Accepted', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'declined', label: 'Declined', color: 'text-[#E07070]', bg: 'bg-[#E07070]/10 border-[#E07070]/20' },
    { value: 'published', label: 'Published', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
  conference_workshop: [
    { value: 'submitted', label: 'Submitted', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'program_review', label: 'Program Review', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
    { value: 'logistics_review', label: 'Logistics Review', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { value: 'approved', label: 'Approved', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
    { value: 'scheduled', label: 'Scheduled', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10 border-[#6B9BD1]/20' },
    { value: 'registration_open', label: 'Registration Open', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10 border-[#27AE60]/20' },
  ],
};

function getStatusConfig(type: string, status: string) {
  const stages = WORKFLOW_STAGES[type] || WORKFLOW_STAGES.research_paper;
  return stages.find(s => s.value === status) || stages[0];
}

interface Submission {
  id: string;
  submissionType: string;
  title: string;
  abstract: string;
  content: string;
  submissionData: Record<string, any> | null;
  contactName: string;
  contactEmail: string;
  contactAffiliation: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PortalContributionsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    const res = await fetch(`/api/portal/submissions?email=${encodeURIComponent(user.email)}`);
    const data = await res.json();
    setSubmissions(data.submissions || []);
    setLoading(false);
  }, [user?.email]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const counts = {
    total: submissions.length,
    submitted: submissions.filter(s => s.status === 'submitted').length,
    inReview: submissions.filter(s => s.status !== 'submitted' && !['published', 'published_event', 'registration_open', 'accepted', 'approved', 'rejected', 'declined', 'restricted'].includes(s.status)).length,
    completed: submissions.filter(s => ['published', 'published_event', 'registration_open', 'accepted', 'approved'].includes(s.status)).length,
    needsAction: submissions.filter(s => ['revision_requested', 'contact_nominee'].includes(s.status)).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F2A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F2A] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#F5F3EE]">My Contributions</h1>
            <p className="text-xs text-[#AAB0D6]/40 mt-1">Track the status of your submissions</p>
          </div>
          <button onClick={fetchSubmissions} className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/40 hover:text-[#C8A75E] border border-white/8 hover:border-[#C8A75E]/30 px-3 py-1.5 rounded-lg transition-all">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-7">
          {[
            { label: 'Total', value: counts.total, color: 'text-[#AAB0D6]' },
            { label: 'Submitted', value: counts.submitted, color: 'text-[#6B9BD1]' },
            { label: 'In Review', value: counts.inReview, color: 'text-[#C8A75E]' },
            { label: 'Completed', value: counts.completed, color: 'text-[#27AE60]' },
            { label: 'Needs Action', value: counts.needsAction, color: 'text-orange-400' },
          ].map((m) => (
            <div key={m.label} className="rounded-xl p-3 text-center border border-white/5 bg-white/2">
              <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-[#AAB0D6]/40 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {submissions.length === 0 ? (
          <Card className="glass-panel border-white/10">
            <CardContent className="py-16 text-center">
              <FileText className="w-12 h-12 text-[#AAB0D6]/20 mx-auto mb-4" />
              <p className="text-[#AAB0D6]/40 mb-4">You haven't submitted any contributions yet.</p>
              <a href="/contribute">
                <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">Submit a Contribution</Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const isExpanded = expanded === sub.id;
              const statusCfg = getStatusConfig(sub.submissionType, sub.status);
              const typeLabel = SUBMISSION_TYPE_LABELS[sub.submissionType] || sub.submissionType;
              const data = sub.submissionData || {};

              return (
                <div key={sub.id} className="bg-gradient-to-br from-[#141A3A]/50 to-[#0D1129]/50 border border-white/6 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/2 transition-all" onClick={() => setExpanded(isExpanded ? null : sub.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C8A75E]/12 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#C8A75E]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F5F3EE]">{sub.title}</p>
                        <p className="text-xs text-[#AAB0D6]/40 mt-0.5">{typeLabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color} font-medium`}>{statusCfg.label}</span>
                      <span className="text-xs text-[#AAB0D6]/30 hidden sm:block">{new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#AAB0D6]/30" /> : <ChevronDown className="w-4 h-4 text-[#AAB0D6]/30" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-6 border-t border-white/5 pt-5 space-y-5">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { icon: FileText, label: 'Type', value: typeLabel },
                          { icon: Calendar, label: 'Submitted', value: new Date(sub.createdAt).toLocaleDateString() },
                          { icon: Mail, label: 'Email', value: sub.contactEmail },
                          { icon: MapPin, label: 'Affiliation', value: sub.contactAffiliation || '—' },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label}>
                            <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-1 flex items-center gap-1.5"><Icon className="w-3 h-3" /> {label}</p>
                            <p className="text-sm text-[#F5F7FA]">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Abstract</p>
                        <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">{sub.abstract}</p>
                      </div>

                      {sub.adminNotes && (
                        <div className="p-4 rounded-xl bg-[#C8A75E]/5 border border-[#C8A75E]/15">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-[#C8A75E]" />
                            <p className="text-[10px] tracking-[0.15em] text-[#C8A75E]/50 uppercase">Reviewer Notes</p>
                          </div>
                          <p className="text-sm text-[#AAB0D6]/65 leading-relaxed whitespace-pre-wrap">{sub.adminNotes}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Workflow Stages</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(WORKFLOW_STAGES[sub.submissionType] || WORKFLOW_STAGES.research_paper).map((stage) => {
                            const isCurrent = sub.status === stage.value;
                            const allStages = WORKFLOW_STAGES[sub.submissionType] || WORKFLOW_STAGES.research_paper;
                            const currentIndex = allStages.findIndex(s => s.value === sub.status);
                            const stageIndex = allStages.findIndex(s => s.value === stage.value);
                            const isPast = stageIndex < currentIndex;
                            return (
                              <span
                                key={stage.value}
                                className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                                  isCurrent
                                    ? `${stage.bg} ${stage.color} font-medium`
                                    : isPast
                                    ? 'bg-[#27AE60]/5 border-[#27AE60]/15 text-[#27AE60]/60'
                                    : 'bg-white/2 border-white/5 text-[#AAB0D6]/25'
                                }`}
                              >
                                {isPast ? '✓ ' : ''}{stage.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
