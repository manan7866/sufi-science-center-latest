'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, Clock, Shield, Brain, BookOpen, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface Framework {
  id: string;
  title: string;
  arabicName?: string;
  category: string;
  duration?: string;
  level?: string;
  description: string;
  longDescription?: string;
  components: string[];
  ethicalFoundations: string[];
  outcomes: string[];
}

const categoryIcons: Record<string, any> = {
  'Daily Practice': Clock,
  'Cognitive Development': Brain,
  'Path Architecture': Layers,
  'Heart Practice': Shield,
  'Contemplative Inquiry': BookOpen,
  'Ethical Refinement': Shield,
};

export default function WazeefiaPage() {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetch('/api/wazeefia')
      .then((r) => r.json())
      .then((data) => {
        setFrameworks(data.frameworks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(frameworks.map(f => f.category)))];
  const filtered = filter === 'All' ? frameworks : frameworks.filter(f => f.category === filter);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Wazeefia"
        description="Disciplined contemplative exercises grounded in ethical intention, cognitive awareness, and structured developmental progression."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-4">
              Structured Practice Frameworks
            </h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-4">
              Wazeefia refers to the disciplined, repeatable practice frameworks that form the backbone of
              structured inner development. Unlike spontaneous practice, each wazeefia carries specific
              intention, duration, and ethical foundation, creating the conditions for genuine transformation
              rather than mere familiarity with spiritual language.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed">
              These frameworks are not self-assigned. In the classical tradition, the appropriate wazeefia
              is determined through assessment, dialogue with a guide, and honest appraisal of one's current
              developmental stage.
            </p>
          </Card>
        </ScrollReveal>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#C8A75E] animate-spin" />
          </div>
        ) : frameworks.length === 0 ? (
          <div className="text-center py-20 text-[#AAB0D6]/40">
            <p className="text-lg mb-2">No wazeefia frameworks published yet.</p>
            <p className="text-sm">Frameworks will appear here once reviewed and published.</p>
          </div>
        ) : (
          <>
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      filter === cat
                        ? 'bg-[#C8A75E] text-[#0B0F2A] border-[#C8A75E]'
                        : 'border-white/20 text-[#AAB0D6] hover:border-[#C8A75E]/50 hover:text-[#F5F3EE]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {filtered.map((framework, index) => {
                const Icon = categoryIcons[framework.category] || Layers;
                const isExpanded = expanded === framework.id;

                return (
                  <ScrollReveal key={framework.id} delay={index * 0.05}>
                    <Card className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-all overflow-hidden">
                      <button
                        className="w-full p-6 text-left"
                        onClick={() => setExpanded(isExpanded ? null : framework.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-6 h-6 text-[#C8A75E]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="text-xl font-serif font-semibold text-[#F5F3EE]">
                                  {framework.title}
                                </h3>
                                {framework.arabicName && (
                                  <p className="text-sm text-[#C8A75E] mt-0.5">{framework.arabicName}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="hidden sm:flex flex-wrap gap-2">
                                  {framework.level && (
                                    <Badge className="bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20 text-xs">
                                      {framework.level}
                                    </Badge>
                                  )}
                                  {framework.duration && (
                                    <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {framework.duration}
                                    </Badge>
                                  )}
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-[#C8A75E]" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-[#AAB0D6]" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-[#AAB0D6] leading-relaxed">
                              {framework.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                              {framework.level && (
                                <Badge className="bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20 text-xs">
                                  {framework.level}
                                </Badge>
                              )}
                              {framework.duration && (
                                <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {framework.duration}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-8 border-t border-white/5 pt-6">
                          <div className="pl-16 space-y-6">
                            {framework.longDescription && (
                              <p className="text-[#AAB0D6] leading-relaxed">
                                {framework.longDescription}
                              </p>
                            )}

                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Components</h4>
                                <ul className="space-y-2">
                                  {framework.components.map((c, i) => (
                                    <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                      <span className="text-[#C8A75E] mt-0.5">•</span>
                                      <span>{c}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-amber-500/5 rounded-lg p-5 border border-amber-500/20">
                                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Ethical Foundations</h4>
                                <ul className="space-y-2">
                                  {framework.ethicalFoundations.map((e, i) => (
                                    <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                      <span className="text-amber-400 mt-0.5">•</span>
                                      <span>{e}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-emerald-500/5 rounded-lg p-5 border border-emerald-500/20">
                                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Outcomes</h4>
                                <ul className="space-y-2">
                                  {framework.outcomes.map((o, i) => (
                                    <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                      <span className="text-emerald-400 mt-0.5">•</span>
                                      <span>{o}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </>
        )}

        <ScrollReveal>
          <Card className="glass-panel border-white/5 p-8 mt-12 bg-gradient-to-br from-white/3 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-[#C8A75E]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Receiving a Wazeefia
                </h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  In the classical transmission model, a wazeefia is not self-assigned. It is given by a
                  qualified guide following careful assessment of the seeker's readiness, constitution, and
                  current developmental needs. The frameworks presented here are offered for orientation and
                  study. Those seeking to formally engage with wazeefia-based practice are encouraged to
                  explore the Mentorship and Sufi Chain Adoption pathways.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A]"
                    onClick={() => window.location.href = '/inner-development/mentorship'}
                  >
                    Explore Mentorship
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-[#AAB0D6] hover:border-[#C8A75E]/50 hover:text-[#F5F3EE]"
                    onClick={() => window.location.href = '/inner-development/sufi-chain-adoption'}
                  >
                    Sufi Chain Adoption
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
