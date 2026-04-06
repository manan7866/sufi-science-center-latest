'use client';

import { useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GraduationCap, FlaskConical, Scale, HeartHandshake, Briefcase, CircleCheck as CheckCircle2 } from 'lucide-react';

const COLLABORATION_TYPES = [
  {
    id: 'research',
    icon: FlaskConical,
    title: 'Academic Research Partnerships',
    description: 'Joint research projects, co-authored publications, and scholarly investigations',
  },
  {
    id: 'dialogue',
    icon: GraduationCap,
    title: 'Joint Dialogue Series',
    description: 'Co-hosted conversations, symposia, and intellectual exchange programs',
  },
  {
    id: 'conference',
    icon: Briefcase,
    title: 'Conference and Symposium',
    description: 'Collaborative events, academic gatherings, and knowledge-sharing forums',
  },
  {
    id: 'curriculum',
    icon: GraduationCap,
    title: 'Curriculum Development',
    description: 'Educational program design, course development, and pedagogical initiatives',
  },
  {
    id: 'technology',
    icon: FlaskConical,
    title: 'Technology and Infrastructure',
    description: 'Knowledge platforms, digital tools, and technical innovation projects',
  },
  {
    id: 'translation',
    icon: HeartHandshake,
    title: 'Translation and Archival Projects',
    description: 'Text preservation, translation initiatives, and historical documentation',
  },
];

const ALIGNMENT_PRINCIPLES = [
  'Intellectual rigor and academic standards',
  'Ethical integrity and transparency',
  'Research independence and scholarly autonomy',
  'Non-partisan positioning and objectivity',
];

export default function CollaborationsPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [organizationType, setOrganizationType] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [collaborationType, setCollaborationType] = useState('');
  const [proposalSummary, setProposalSummary] = useState('');
  const [proposalDetails, setProposalDetails] = useState('');
  const [scope, setScope] = useState('');
  const [timeline, setTimeline] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/collaboration-proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationType,
          organizationName,
          contactName,
          contactEmail,
          contactPhone: contactPhone || null,
          collaborationType,
          proposalSummary,
          proposalDetails,
          scope,
          timeline,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('There was an error submitting your proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-[#0B0F2A]">
        <ObservatoryHero
          subtitle="Institutional Partnerships"
          title="Proposal Received"
          description="Thank you for your collaboration proposal."
        />
        <section className="py-24 px-4 observatory-gradient">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 glass-panel border-[rgba(255,255,255,0.08)] text-center">
              <CheckCircle2 className="h-16 w-16 text-[#C8A75E] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                Proposal Under Review
              </h2>
              <p className="text-[#AAB0D6] mb-6">
                Your collaboration proposal has been submitted successfully. Our review committee
                will evaluate the submission and respond to {contactEmail} within 3-4 weeks.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent my-8" />
              <p className="text-sm text-[#AAB0D6]">
                We appreciate your interest in advancing structured inquiry through institutional
                collaboration.
              </p>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Institutional Engagement"
        title="Institutional and Project Collaborations"
        description="We collaborate with academic institutions, research groups, policy organizations, and aligned initiatives advancing the integration of scientific inquiry and inner development."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLABORATION_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  className="p-6 glass-panel border-[rgba(255,255,255,0.08)]"
                >
                  <Icon className="h-10 w-10 text-[#C8A75E] mb-4" />
                  <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">{type.title}</h3>
                  <p className="text-sm text-[#AAB0D6]">{type.description}</p>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start gap-4">
              <Scale className="h-8 w-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#F5F3EE] mb-4">Alignment Principles</h3>
                <p className="text-[#AAB0D6] mb-4">
                  Collaborations must align with our foundational commitments to:
                </p>
                <ul className="space-y-2">
                  {ALIGNMENT_PRINCIPLES.map((principle, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#AAB0D6]">
                      <CheckCircle2 className="h-5 w-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <h3 className="text-xl font-bold text-[#F5F3EE] mb-6">Collaboration Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-[#F5F3EE] mb-2">Proposal Submission</h4>
                <p className="text-sm text-[#AAB0D6]">
                  Submit a structured proposal outlining the collaboration scope and objectives
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-[#F5F3EE] mb-2">Internal Review</h4>
                <p className="text-sm text-[#AAB0D6]">
                  Review committee evaluates alignment, feasibility, and mutual benefit
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-[#F5F3EE] mb-2">Structured Engagement</h4>
                <p className="text-sm text-[#AAB0D6]">
                  Approved proposals proceed to detailed planning and implementation
                </p>
              </div>
            </div>
          </Card>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-2">Collaboration Proposal</h2>
                <p className="text-[#AAB0D6]">
                  Complete all sections to submit your proposal for review
                </p>
              </div>

              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= s
                          ? 'bg-[#C8A75E] text-[#0B0F2A]'
                          : 'bg-[rgba(255,255,255,0.08)] text-[#AAB0D6]'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`w-16 h-1 ${
                          step > s ? 'bg-[#C8A75E]' : 'bg-[rgba(255,255,255,0.08)]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">
                      Organization Information
                    </h3>

                    <div>
                      <Label htmlFor="orgType" className="text-[#F5F3EE]">
                        Organization Type *
                      </Label>
                      <Select value={organizationType} onValueChange={setOrganizationType}>
                        <SelectTrigger className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic Institution</SelectItem>
                          <SelectItem value="research">Research Organization</SelectItem>
                          <SelectItem value="policy">Policy Institute</SelectItem>
                          <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="orgName" className="text-[#F5F3EE]">
                        Organization Name *
                      </Label>
                      <Input
                        id="orgName"
                        type="text"
                        required
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="contactName" className="text-[#F5F3EE]">
                          Contact Name *
                        </Label>
                        <Input
                          id="contactName"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail" className="text-[#F5F3EE]">
                          Contact Email *
                        </Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contactPhone" className="text-[#F5F3EE]">
                        Contact Phone (Optional)
                      </Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Proposal Summary</h3>

                    <div>
                      <Label htmlFor="collabType" className="text-[#F5F3EE]">
                        Collaboration Type *
                      </Label>
                      <Select value={collaborationType} onValueChange={setCollaborationType}>
                        <SelectTrigger className="mt-2 h-11 bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all">
                          <SelectValue placeholder="Select collaboration type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="research">Academic Research</SelectItem>
                          <SelectItem value="dialogue">Joint Dialogue Series</SelectItem>
                          <SelectItem value="conference">Conference and Symposium</SelectItem>
                          <SelectItem value="curriculum">Curriculum Development</SelectItem>
                          <SelectItem value="technology">Technology and Infrastructure</SelectItem>
                          <SelectItem value="translation">Translation and Archival</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="summary" className="text-[#F5F3EE]">
                        Proposal Summary *
                      </Label>
                      <Textarea
                        id="summary"
                        required
                        value={proposalSummary}
                        onChange={(e) => setProposalSummary(e.target.value)}
                        className="mt-2 min-h-[100px] w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        placeholder="Provide a concise summary of the proposed collaboration (2-3 sentences)"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">
                      Scope and Deliverables
                    </h3>

                    <div>
                      <Label htmlFor="details" className="text-[#F5F3EE]">
                        Detailed Proposal *
                      </Label>
                      <Textarea
                        id="details"
                        required
                        value={proposalDetails}
                        onChange={(e) => setProposalDetails(e.target.value)}
                        className="mt-2 min-h-[200px] w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        placeholder="Provide a detailed description of the collaboration, including objectives, methodology, and expected outcomes..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="scope" className="text-[#F5F3EE]">
                        Scope of Work *
                      </Label>
                      <Textarea
                        id="scope"
                        required
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="mt-2 min-h-[120px] w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        placeholder="Define the specific scope, responsibilities, and deliverables for each party..."
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Timeline and Resources</h3>

                    <div>
                      <Label htmlFor="timeline" className="text-[#F5F3EE]">
                        Proposed Timeline *
                      </Label>
                      <Textarea
                        id="timeline"
                        required
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="mt-2 min-h-[120px] w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        placeholder="Outline the proposed timeline, key milestones, and duration..."
                      />
                    </div>

                    <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                      <h4 className="font-semibold text-[#F5F3EE] mb-3">Review Information</h4>
                      <ul className="space-y-2 text-sm text-[#AAB0D6]">
                        <li>• Estimated review timeline: 3-4 weeks</li>
                        <li>• Committee will evaluate alignment with our principles</li>
                        <li>• You will receive a detailed response via email</li>
                        <li>• Approved proposals proceed to planning phase</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="flex-1 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]"
                      disabled={
                        (step === 1 &&
                          (!organizationType ||
                            !organizationName ||
                            !contactName ||
                            !contactEmail)) ||
                        (step === 2 && (!collaborationType || !proposalSummary)) ||
                        (step === 3 && (!proposalDetails || !scope))
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading || !timeline}
                      className="flex-1 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]"
                    >
                      {loading ? 'Submitting...' : 'Submit Proposal'}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
