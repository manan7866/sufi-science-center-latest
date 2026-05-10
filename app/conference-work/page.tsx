'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Globe, Clock, Target, ArrowLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

interface ConferenceItem {
  id: string;
  title: string;
  organizerName: string;
  email: string;
  programType: string;
  description: string;
  objectives: string;
  speakersFacilitators: string;
  duration: string;
  preferredDates: string;
  format: string;
  audience: string;
  expectedParticipants: string;
  requirementsResources: string;
  budgetSponsorship: string;
  status: string;
  submittedAt: string;
}

const programTypeColors: Record<string, string> = {
  conference: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  workshop: 'bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20',
  training: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  seminar: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const formatIcons: Record<string, any> = {
  online: Globe,
  'in-person': MapPin,
  hybrid: Globe,
};

export default function ConferenceWorkPage() {
  const [items, setItems] = useState<ConferenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/conference-work')
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Community Programs"
        title="Conferences & Workshops"
        description="Approved and scheduled events organized by the global Sufi Science Center community."
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Contribute
            </Link>
          </div>

          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#F5F3EE]">All Programs</h2>
              <p className="text-[#AAB0D6]/60 text-sm mt-1">
                {loading ? 'Loading...' : `${items.length} program${items.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-[#C8A75E] animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-[#AAB0D6]/40">
              <p className="text-lg mb-2">No programs available yet.</p>
              <p className="text-sm">Approved programs will appear here once published.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item, i) => {
                const FormatIcon = formatIcons[item.format] || Globe;
                const isExpanded = expanded === item.id;

                return (
                  <ScrollReveal key={item.id} delay={i * 0.05}>
                    <Card className="glass-panel border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300 overflow-hidden">
                      <button
                        className="w-full p-7 text-left"
                        onClick={() => setExpanded(isExpanded ? null : item.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[#AAB0D6]/60 mt-1">
                              by {item.organizerName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider ${
                              programTypeColors[item.programType] || 'bg-white/5 text-[#AAB0D6] border-white/10'
                            }`}>
                              {item.programType}
                            </span>
                            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${
                              item.status === 'approved' ? 'border-emerald-500/30 text-emerald-400' : 'border-[#C8A75E]/30 text-[#C8A75E]'
                            }`}>
                              {item.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#AAB0D6]/50 mb-4">
                          {item.format && (
                            <span className="flex items-center gap-1.5">
                              <FormatIcon className="w-3.5 h-3.5" />
                              {item.format}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {item.duration}
                            </span>
                          )}
                          {item.preferredDates && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {item.preferredDates}
                            </span>
                          )}
                          {item.audience && (
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              {item.audience}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-[#AAB0D6]/70 leading-relaxed">{item.description}</p>

                        <div className="flex items-center gap-2 mt-4">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#C8A75E]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#AAB0D6]/40" />
                          )}
                          <span className="text-xs text-[#AAB0D6]/40">
                            {isExpanded ? 'Show less' : 'Show more details'}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-7 pb-7 border-t border-white/5 pt-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {item.objectives && (
                              <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                                  <Target className="w-4 h-4 text-[#C8A75E]" />
                                  Objectives
                                </h4>
                                <p className="text-sm text-[#AAB0D6]/70 leading-relaxed">{item.objectives}</p>
                              </div>
                            )}
                            {item.speakersFacilitators && (
                              <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                                  <Users className="w-4 h-4 text-[#C8A75E]" />
                                  Speakers / Facilitators
                                </h4>
                                <p className="text-sm text-[#AAB0D6]/70 leading-relaxed">{item.speakersFacilitators}</p>
                              </div>
                            )}
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {item.expectedParticipants && (
                              <div className="bg-white/3 rounded-lg p-4 border border-white/5">
                                <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Expected Participants</p>
                                <p className="text-sm text-[#AAB0D6]/70">{item.expectedParticipants}</p>
                              </div>
                            )}
                            {item.requirementsResources && (
                              <div className="bg-white/3 rounded-lg p-4 border border-white/5">
                                <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Requirements</p>
                                <p className="text-sm text-[#AAB0D6]/70">{item.requirementsResources}</p>
                              </div>
                            )}
                            {item.budgetSponsorship && (
                              <div className="bg-white/3 rounded-lg p-4 border border-white/5">
                                <p className="text-[10px] text-[#AAB0D6]/30 uppercase mb-1">Budget / Sponsorship</p>
                                <p className="text-sm text-[#AAB0D6]/70">{item.budgetSponsorship}</p>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#AAB0D6]/30">
                            <span>Contact: {item.email}</span>
                            <span>Submitted: {new Date(item.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>
                      )}
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Propose a Program
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              Have an idea for a conference, workshop, training, or seminar? Submit your proposal
              for review by the Sufi Science Center programs team.
            </p>
            <Link
              href="/contribute/submit?type=conference_workshop"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Submit a Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
