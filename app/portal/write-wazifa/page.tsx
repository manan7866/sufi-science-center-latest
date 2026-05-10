'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2, CircleCheck as CheckCircle2, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
  'Daily Practice',
  'Cognitive Development',
  'Path Architecture',
  'Heart Practice',
  'Contemplative Inquiry',
  'Ethical Refinement',
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-[#AAB0D6]/10 text-[#AAB0D6] border-[#AAB0D6]/20',
  under_review: 'bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20',
  request_revision: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  published: 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20',
};

export default function WriteWazifaPage() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [components, setComponents] = useState<string[]>(['', '', '', '']);
  const [ethicalFoundations, setEthicalFoundations] = useState<string[]>(['', '', '', '']);
  const [outcomes, setOutcomes] = useState<string[]>(['', '', '', '']);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [mySubmissions, setMySubmissions] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/portal/wazifa?email=${encodeURIComponent(user.email)}`)
        .then((r) => r.json())
        .then((data) => {
          setMySubmissions(data.submissions || []);
          setLoadingSubs(false);
        })
        .catch(() => setLoadingSubs(false));
    }
  }, [user?.email, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!title || title.length < 3) errors.title = 'Title is required (min 3 characters)';
    if (!category) errors.category = 'Please select a category';
    if (!description || description.length < 300) errors.description = `Description must be at least 300 characters (${description.length}/300)`;
    if (description.length > 403) errors.description = 'Description must be at most 403 characters';

    const validComponents = components.filter((c) => c.trim());
    const validEthics = ethicalFoundations.filter((e) => e.trim());
    const validOutcomes = outcomes.filter((o) => o.trim());

    if (validComponents.length === 0) errors.components = 'At least one component is required';
    if (validComponents.length > 4) errors.components = 'Maximum 4 components allowed';
    if (validEthics.length === 0) errors.ethicalFoundations = 'At least one ethical foundation is required';
    if (validEthics.length > 4) errors.ethicalFoundations = 'Maximum 4 ethical foundations allowed';
    if (validOutcomes.length === 0) errors.outcomes = 'At least one outcome is required';
    if (validOutcomes.length > 4) errors.outcomes = 'Maximum 4 outcomes allowed';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/portal/wazifa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          userName: user?.name || '',
          email: user?.email || '',
          title: title.trim(),
          category,
          components: validComponents,
          ethicalFoundations: validEthics,
          outcomes: validOutcomes,
          description: description.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      setSubmitted(true);
      setTitle('');
      setCategory('');
      setDescription('');
      setComponents(['', '', '', '']);
      setEthicalFoundations(['', '', '', '']);
      setOutcomes(['', '', '', '']);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F2A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-semibold text-[#F5F3EE]">Write a Wazeefia</h1>
          <p className="text-xs text-[#AAB0D6]/40 mt-1">Submit a structured practice framework for review</p>
        </div>

        {submitted && (
          <Card className="glass-panel border-[#C8A75E]/30 bg-[#C8A75E]/5 mb-8">
            <CardContent className="py-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#C8A75E] mx-auto mb-3" />
              <p className="text-[#F5F3EE] font-semibold mb-1">Submission Received</p>
              <p className="text-sm text-[#AAB0D6]/60">Your wazeefia has been submitted for review.</p>
              <Button onClick={() => setSubmitted(false)} className="mt-4 bg-[#C8A75E]/10 text-[#C8A75E] hover:bg-[#C8A75E]/20 border border-[#C8A75E]/30">
                Submit Another
              </Button>
            </CardContent>
          </Card>
        )}

        {!submitted && (
          <Card className="glass-panel border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[#F5F3EE]">New Wazeefia Submission</CardTitle>
              <p className="text-sm text-[#AAB0D6]/60">Share a structured practice framework</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-[#F5F3EE]">Title *</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1.5 bg-[#141A3A] text-[#F5F7FA] border-white/10"
                    placeholder="Title of your wazeefia"
                  />
                  {fieldErrors.title && <p className="text-red-400 text-xs mt-1">{fieldErrors.title}</p>}
                </div>

                <div>
                  <Label className="text-[#F5F3EE]">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1.5 bg-[#141A3A] text-[#F5F7FA] border-white/10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.category && <p className="text-red-400 text-xs mt-1">{fieldErrors.category}</p>}
                </div>

                <div>
                  <Label className="text-[#F5F3EE]">Description *</Label>
                  <p className="text-xs text-[#AAB0D6]/40 mb-1">Min 300 characters, max 403 characters ({description.length})</p>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 bg-[#141A3A] text-[#F5F7FA] border-white/10 min-h-[120px]"
                    placeholder="Describe the practice framework in detail..."
                  />
                  {fieldErrors.description && <p className="text-red-400 text-xs mt-1">{fieldErrors.description}</p>}
                </div>

                <div>
                  <Label className="text-[#F5F3EE]">Components (max 4) *</Label>
                  <p className="text-xs text-[#AAB0D6]/40 mb-2">Each line is one component</p>
                  {components.map((comp, i) => (
                    <Input
                      key={i}
                      value={comp}
                      onChange={(e) => {
                        const next = [...components];
                        next[i] = e.target.value;
                        setComponents(next);
                      }}
                      className="mt-1.5 bg-[#141A3A] text-[#F5F7FA] border-white/10"
                      placeholder={`Component ${i + 1}`}
                    />
                  ))}
                  {fieldErrors.components && <p className="text-red-400 text-xs mt-1">{fieldErrors.components}</p>}
                </div>

                <div>
                  <Label className="text-[#F5F3EE]">Ethical Foundations (max 4) *</Label>
                  <p className="text-xs text-[#AAB0D6]/40 mb-2">Each line is one ethical foundation</p>
                  {ethicalFoundations.map((ef, i) => (
                    <Input
                      key={i}
                      value={ef}
                      onChange={(e) => {
                        const next = [...ethicalFoundations];
                        next[i] = e.target.value;
                        setEthicalFoundations(next);
                      }}
                      className="mt-1.5 bg-[#141A3A] text-[#F5F7FA] border-white/10"
                      placeholder={`Ethical Foundation ${i + 1}`}
                    />
                  ))}
                  {fieldErrors.ethicalFoundations && <p className="text-red-400 text-xs mt-1">{fieldErrors.ethicalFoundations}</p>}
                </div>

                <div>
                  <Label className="text-[#F5F3EE]">Outcomes (max 4) *</Label>
                  <p className="text-xs text-[#AAB0D6]/40 mb-2">Each line is one outcome</p>
                  {outcomes.map((out, i) => (
                    <Input
                      key={i}
                      value={out}
                      onChange={(e) => {
                        const next = [...outcomes];
                        next[i] = e.target.value;
                        setOutcomes(next);
                      }}
                      className="mt-1.5 bg-[#141A3A] text-[#F5F7FA] border-white/10"
                      placeholder={`Outcome ${i + 1}`}
                    />
                  ))}
                  {fieldErrors.outcomes && <p className="text-red-400 text-xs mt-1">{fieldErrors.outcomes}</p>}
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <Button type="submit" disabled={submitting} className="w-full bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                  {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : <><Send className="w-4 h-4 mr-2" />Submit Wazeefia</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-4">My Submissions</h2>
          {loadingSubs ? (
            <div className="flex items-center justify-center py-10"><Loader2 className="w-5 h-5 text-[#C8A75E] animate-spin" /></div>
          ) : mySubmissions.length === 0 ? (
            <Card className="glass-panel border-white/10">
              <CardContent className="py-10 text-center">
                <FileText className="w-10 h-10 text-[#AAB0D6]/20 mx-auto mb-3" />
                <p className="text-sm text-[#AAB0D6]/40">No submissions yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {mySubmissions.map((sub) => {
                const isExpanded = expandedSub === sub.id;
                return (
                  <div key={sub.id} className="bg-gradient-to-br from-[#141A3A]/50 to-[#0D1129]/50 border border-white/6 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/2" onClick={() => setExpandedSub(isExpanded ? null : sub.id)}>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#C8A75E]" />
                        <div>
                          <p className="text-sm font-medium text-[#F5F3EE]">{sub.title}</p>
                          <p className="text-xs text-[#AAB0D6]/40">{sub.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[sub.status] || STATUS_COLORS.draft}`}>
                          {sub.status.replace('_', ' ')}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-[#AAB0D6]/30" /> : <ChevronDown className="w-4 h-4 text-[#AAB0D6]/30" />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="px-4 pb-5 border-t border-white/5 pt-4 space-y-4">
                        <p className="text-sm text-[#AAB0D6]/65">{sub.description}</p>
                        {sub.components?.length > 0 && (
                          <div>
                            <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Components</p>
                            <div className="flex flex-wrap gap-1.5">
                              {sub.components.map((c: string, i: number) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#AAB0D6]/70">{c}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {sub.ethicalFoundations?.length > 0 && (
                          <div>
                            <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Ethical Foundations</p>
                            <div className="flex flex-wrap gap-1.5">
                              {sub.ethicalFoundations.map((e: string, i: number) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400/80">{e}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {sub.outcomes?.length > 0 && (
                          <div>
                            <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Outcomes</p>
                            <div className="flex flex-wrap gap-1.5">
                              {sub.outcomes.map((o: string, i: number) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400/80">{o}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {sub.reviewNotes && (
                          <div className="p-3 rounded-lg bg-[#C8A75E]/5 border border-[#C8A75E]/15">
                            <p className="text-[10px] text-[#C8A75E]/50 uppercase mb-1">Review Notes</p>
                            <p className="text-xs text-[#AAB0D6]/65">{sub.reviewNotes}</p>
                          </div>
                        )}
                        <p className="text-[10px] text-[#AAB0D6]/25">{new Date(sub.createdAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
