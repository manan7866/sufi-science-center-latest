'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';
import { PathwayApplicationForm } from '@/components/pathway-application-form';
import FormGuard from '@/components/form-guard';
import Link from 'next/link';

interface GuidancePathway {
  id: string;
  title: string;
  description: string;
  target_audience: string;
  duration_weeks: number;
  assessment_profile: any;
}

export default function GuidancePage() {
  const [pathways, setPathways] = useState<GuidancePathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPathway, setSelectedPathway] = useState<GuidancePathway | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchPathways();
  }, []);

  const fetchPathways = async () => {
    try {
      const res = await fetch('/api/inner-development/guidance');
      const data = await res.json();
      setPathways(data.pathways || []);
    } catch (error) {
      console.error('Failed to fetch pathways:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading guidance pathways...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Personal Guidance"
        description="Structured pathways tailored to different starting points and temperaments. Each pathway integrates practices, stages, and guidance appropriate to your journey."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <div className="flex items-start gap-4">
              <Compass className="w-12 h-12 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-[#F5F3EE] mb-3">
                  Start with Assessment
                </h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  For personalized pathway recommendations based on your current state, temperament,
                  and intentions, take our comprehensive assessment. It will map your profile to the
                  most suitable starting pathway.
                </p>
                <Link href="/assessment/take">
                  <Button className="bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]">
                    Take Assessment <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pathways.map((pathway, index) => (
            <ScrollReveal key={pathway.id} delay={index * 0.1}>
              <Card className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-3">
                    {pathway.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-white/20 text-[#AAB0D6]">
                      <Clock className="w-3 h-3 mr-1" />
                      {pathway.duration_weeks} weeks
                    </Badge>
                  </div>
                </div>

                <p className="text-[#AAB0D6] leading-relaxed mb-4 flex-1">
                  {pathway.description}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2 mb-4">
                    <Users className="w-4 h-4 text-[#C8A75E] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">Best For:</p>
                      <p className="text-sm text-[#AAB0D6]">{pathway.target_audience}</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A]"
                  onClick={() => {
                    setSelectedPathway(pathway);
                    setShowApplicationForm(true);
                  }}
                >
                  Begin This Pathway
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Card className="glass-panel border-white/5 p-8">
            <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-6">
              How Pathways Work
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#C8A75E]">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Assessment</h3>
                <p className="text-sm text-[#AAB0D6]">
                  Take the personal assessment to understand your current state and receive pathway recommendations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#C8A75E]">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Practice</h3>
                <p className="text-sm text-[#AAB0D6]">
                  Follow structured weekly practices integrating meditation, reflection, and study
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#C8A75E]">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Support</h3>
                <p className="text-sm text-[#AAB0D6]">
                  Access study circles, mentorship, and community support aligned with your pathway
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4">Additional Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/inner-development/practices">
                  <Button variant="outline" className="w-full border-white/20 text-[#AAB0D6] hover:bg-white/5">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse All Practices
                  </Button>
                </Link>
                <Link href="/inner-development/circles">
                  <Button variant="outline" className="w-full border-white/20 text-[#AAB0D6] hover:bg-white/5">
                    <Users className="w-4 h-4 mr-2" />
                    Join Study Circles
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>

      {showApplicationForm && selectedPathway && (
        <FormGuard
          formType="pathway"
          checkExisting={async (userId: string) => {
            const res = await fetch('/api/form-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, formType: 'pathway' }),
            });
            const data = await res.json();
            return data.exists === true;
          }}
        >
          <PathwayApplicationForm
            pathway={selectedPathway}
            onClose={() => {
              setShowApplicationForm(false);
              setSelectedPathway(null);
            }}
            onSuccess={() => {
              setShowApplicationForm(false);
              setSelectedPathway(null);
            }}
          />
        </FormGuard>
      )}
    </div>
  );
}
