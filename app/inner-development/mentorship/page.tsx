'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Users, Clock, BookOpen, CircleCheck as CheckCircle2, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';
import { MentorshipApplicationForm } from '@/components/mentorship-application-form';

interface MentorshipProgram {
  id: string;
  title: string;
  slug: string;
  description: string;
  mentor_name: string;
  mentor_bio: string;
  mentor_lineage?: string;
  focus_areas: string[];
  program_duration_months: number;
  meeting_frequency: string;
  format: string;
  capacity: number;
  current_participants: number;
  status: string;
  requirements: string[];
  application_process: string;
}

const statusColors: Record<string, string> = {
  accepting: 'bg-green-500/20 text-green-300 border-green-500/30',
  waitlist: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  closed: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function MentorshipPage() {
  const [programs, setPrograms] = useState<MentorshipProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<MentorshipProgram | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/inner-development/mentorship');
      const data = await res.json();
      setPrograms(data.programs || []);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading mentorship programs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Mentorship Programs"
        description="Direct guidance from experienced practitioners. Mentorship offers personalized support for navigating the spiritual path with wisdom, accountability, and traditional transmission."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/inner-development" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Inner Development
          </Link>
        </div>

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-4">
              The Importance of Guidance
            </h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-4">
              In Sufi tradition, the relationship with a guide (murshid) is considered essential for safe
              navigation of the inner path. A mentor provides:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-[#AAB0D6]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Personalized practice guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Traditional transmission of teachings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Support through challenges and stages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Accountability and structure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Mirror for self-knowledge</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                <span>Connection to living lineage</span>
              </li>
            </ul>
          </Card>
        </ScrollReveal>

        <div className="space-y-8">
          {programs.map((program, index) => (
            <ScrollReveal key={program.id} delay={index * 0.1}>
              <Card className="glass-panel border-white/5 p-8 hover:border-[#C8A75E]/30 transition-all">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-serif font-bold text-[#F5F3EE] flex-1">
                        {program.title}
                      </h3>
                      <Badge className={`${statusColors[program.status]} ml-4 flex-shrink-0`}>
                        {program.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <User className="w-5 h-5 text-[#C8A75E]" />
                      <div>
                        <p className="text-lg text-[#F5F3EE] font-semibold">{program.mentor_name}</p>
                        {program.mentor_lineage && (
                          <p className="text-xs text-[#AAB0D6]/80">{program.mentor_lineage}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-[#AAB0D6] leading-relaxed mb-4">
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="outline" className="border-white/20 text-[#AAB0D6]">
                        <Clock className="w-3 h-3 mr-1" />
                        {program.program_duration_months} months
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-[#AAB0D6]">
                        <Calendar className="w-3 h-3 mr-1" />
                        {program.meeting_frequency}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-[#AAB0D6] capitalize">
                        <Users className="w-3 h-3 mr-1" />
                        {program.format.replace('_', ' ')}
                      </Badge>
                    </div>

                    {program.focus_areas.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[#F5F3EE] mb-2">Focus Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.focus_areas.map((area, i) => (
                            <Badge key={i} variant="outline" className="border-[#C8A75E]/30 text-[#C8A75E] text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="mt-4 bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]"
                      onClick={() => setSelectedProgram(program)}
                    >
                      View Full Details
                    </Button>
                  </div>

                  <div className="lg:w-80 space-y-4">
                    <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                      <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">About the Mentor</h4>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed">
                        {program.mentor_bio.substring(0, 200)}...
                      </p>
                    </div>

                    {program.status === 'accepting' && (
                      <div className="bg-gradient-to-br from-[#C8A75E]/10 to-transparent rounded-lg p-5 border border-[#C8A75E]/30">
                        <p className="text-sm text-[#F5F3EE] font-semibold mb-2">
                          Now Accepting Applications
                        </p>
                        <p className="text-xs text-[#AAB0D6]">
                          {program.capacity - program.current_participants} spots remaining
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {selectedProgram && !showApplicationForm && (
          <div className="fixed inset-0  bg-[#0B0F2A]/90 backdrop-blur-sm z-50 flex  justify-center p-6 overflow-y-auto">
            <ScrollReveal>
              <Card className="glass-panel border-white/5 p-8 max-w-4xl w-full my-8">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedProgram(null)}
                  className="mb-6 text-[#AAB0D6] hover:text-[#F5F3EE]"
                >
                  ← Close
                </Button>

                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] flex-1">
                      {selectedProgram.title}
                    </h2>
                    <Badge className={`${statusColors[selectedProgram.status]} ml-4`}>
                      {selectedProgram.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center">
                      <User className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                    <div>
                      <p className="text-xl text-[#F5F3EE] font-semibold">{selectedProgram.mentor_name}</p>
                      {selectedProgram.mentor_lineage && (
                        <p className="text-sm text-[#AAB0D6]">{selectedProgram.mentor_lineage}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-3">Program Description</h3>
                    <p className="text-[#AAB0D6] leading-relaxed">
                      {selectedProgram.description}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-3">About the Mentor</h3>
                    <p className="text-[#AAB0D6] leading-relaxed">
                      {selectedProgram.mentor_bio}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                        Focus Areas
                      </h3>
                      <ul className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/5">
                        {selectedProgram.focus_areas.map((area, i) => (
                          <li key={i} className="text-sm text-[#AAB0D6] flex items-start gap-2">
                            <span className="text-[#C8A75E] mt-0.5">•</span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Program Details</h3>
                      <div className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#AAB0D6]">Duration:</span>
                          <span className="text-[#F5F3EE]">{selectedProgram.program_duration_months} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#AAB0D6]">Frequency:</span>
                          <span className="text-[#F5F3EE] capitalize">{selectedProgram.meeting_frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#AAB0D6]">Format:</span>
                          <span className="text-[#F5F3EE] capitalize">{selectedProgram.format.replace('_', ' ')}</span>
                        </div>
                        {selectedProgram.status === 'accepting' && (
                          <div className="flex justify-between pt-2 border-t border-white/10">
                            <span className="text-[#AAB0D6]">Spots Available:</span>
                            <span className="text-[#C8A75E] font-semibold">
                              {selectedProgram.capacity - selectedProgram.current_participants}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedProgram.requirements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Requirements</h3>
                      <ul className="space-y-2 bg-yellow-500/5 rounded-lg p-5 border border-yellow-500/20">
                        {selectedProgram.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-[#AAB0D6] flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Application Process</h3>
                    <div className="bg-gradient-to-br from-[#C8A75E]/10 to-transparent rounded-lg p-5 border border-[#C8A75E]/20">
                      <p className="text-[#AAB0D6] leading-relaxed">
                        {selectedProgram.application_process}
                      </p>
                    </div>
                  </div>

                  {selectedProgram.status === 'accepting' && (
                    <div className="pt-6 border-t border-white/10">
                      <Button
                        className="w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D] py-6 text-lg"
                        onClick={() => {
                          setShowApplicationForm(true);
                        }}
                      >
                        Begin Application
                      </Button>
                      <p className="text-xs text-[#AAB0D6] text-center mt-3">
                        Commitment and sincerity are essential for mentorship relationships
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        )}

        {showApplicationForm && selectedProgram && (
          <MentorshipApplicationForm
            program={selectedProgram}
            onClose={() => {
              setShowApplicationForm(false);
            }}
            onSuccess={() => {
              setShowApplicationForm(false);
              setSelectedProgram(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
