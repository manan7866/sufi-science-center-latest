'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, BookOpen, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface TransformationStage {
  id: string;
  title: string;
  slug: string;
  arabic_name: string;
  stage_number: number;
  category: string;
  description: string;
  characteristics: string[];
  practices_associated: string[];
  classical_references: string[];
  challenges: string[];
  signs_of_progress: string[];
}

export default function StagesPage() {
  const [stages, setStages] = useState<TransformationStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');
  const [selectedStage, setSelectedStage] = useState<TransformationStage | null>(null);

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
      const res = await fetch('/api/inner-development/stages');
      const data = await res.json();
      setStages(data.stages || []);
    } catch (error) {
      console.error('Failed to fetch stages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading stages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Stages of Transformation"
        description="The classical Sufi path describes stations (maqamat) and states (ahwal) of spiritual development. These are not linear progressions but spiraling deepenings."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <div className="flex justify-center mb-12">
            <Tabs defaultValue="timeline" className="w-full md:w-auto">
              <TabsList className="glass-panel border-white/10 p-1">
                <TabsTrigger
                  value="timeline"
                  onClick={() => setViewMode('timeline')}
                  className="data-[state=active]:bg-[#C8A75E] data-[state=active]:text-[#0B0F2A]"
                >
                  Timeline View
                </TabsTrigger>
                <TabsTrigger
                  value="cards"
                  onClick={() => setViewMode('cards')}
                  className="data-[state=active]:bg-[#C8A75E] data-[state=active]:text-[#0B0F2A]"
                >
                  Card View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </ScrollReveal>

        {viewMode === 'timeline' && (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C8A75E] via-[#C8A75E]/50 to-[#C8A75E]" />

            <div className="space-y-12">
              {stages.map((stage, index) => (
                <ScrollReveal key={stage.id} delay={index * 0.1}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E] to-[#C8A75E]/50 flex items-center justify-center text-[#0B0F2A] font-bold text-xl">
                      {stage.stage_number}
                    </div>

                    <Card className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all">
                      <div className="mb-4">
                        <h3 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-2">
                          {stage.title}
                        </h3>
                        <p className="text-xl text-[#C8A75E] mb-1">{stage.arabic_name}</p>
                        <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                          {stage.category === 'maqam' ? 'Station (Maqam)' : 'State (Hal)'}
                        </Badge>
                      </div>

                      <p className="text-[#AAB0D6] leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      <Button
                        variant="outline"
                        onClick={() => setSelectedStage(stage)}
                        className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A]"
                      >
                        Explore This Stage
                      </Button>
                    </Card>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <ScrollReveal key={stage.id} delay={index * 0.1}>
                <Card
                  className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all cursor-pointer h-full flex flex-col"
                  onClick={() => setSelectedStage(stage)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E] to-[#C8A75E]/50 flex items-center justify-center text-[#0B0F2A] font-bold">
                      {stage.stage_number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#F5F3EE]">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-[#C8A75E]">{stage.arabic_name}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#AAB0D6] leading-relaxed flex-1">
                    {stage.description.substring(0, 150)}...
                  </p>

                  <Button
                    variant="ghost"
                    className="mt-4 w-full text-[#C8A75E] hover:bg-[#C8A75E]/10"
                  >
                    Learn More →
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

        {selectedStage && (
          <div className="fixed inset-0  bg-[#0B0F2A]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            <ScrollReveal>
              <Card className="glass-panel border-white/5 p-8 max-w-4xl w-full my-8">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedStage(null)}
                  className="mb-6 text-[#AAB0D6] hover:text-[#F5F3EE]"
                >
                  ← Close
                </Button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E] to-[#C8A75E]/50 flex items-center justify-center text-[#0B0F2A] font-bold text-2xl">
                    {selectedStage.stage_number}
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#F5F3EE]">
                      {selectedStage.title}
                    </h2>
                    <p className="text-2xl text-[#C8A75E]">{selectedStage.arabic_name}</p>
                  </div>
                </div>

                <div className="space-y-8 ">
                  <div>
                    <p className="text-[#AAB0D6] leading-relaxed text-lg">
                      {selectedStage.description}
                    </p>
                  </div>

                  <div className='flex gap-8'>
                    {selectedStage.characteristics.length > 0 && (
                    <div className=''>
                      <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#C8A75E]" />
                        Characteristics
                      </h3>
                      <ul className="space-y-2 bg-white/5 rounded-lg p-6 border border-white/5">
                        {selectedStage.characteristics.map((char, i) => (
                          <li key={i} className="text-[#AAB0D6] flex items-start gap-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedStage.practices_associated.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#C8A75E]" />
                        Associated Practices
                      </h3>
                      <ul className="space-y-2 bg-white/5 rounded-lg p-6 border border-white/5">
                        {selectedStage.practices_associated.map((practice, i) => (
                          <li key={i} className="text-[#AAB0D6] flex items-start gap-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>

                  

                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedStage.challenges.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          Challenges
                        </h3>
                        <ul className="space-y-2 bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/20">
                          {selectedStage.challenges.map((challenge, i) => (
                            <li key={i} className="text-[#AAB0D6] text-sm flex items-start gap-2">
                              <span className="text-yellow-500 mt-1">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedStage.signs_of_progress.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Signs of Progress
                        </h3>
                        <ul className="space-y-2 bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                          {selectedStage.signs_of_progress.map((sign, i) => (
                            <li key={i} className="text-[#AAB0D6] text-sm flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {selectedStage.classical_references.length > 0 && (
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                        Classical References
                      </h3>
                      <ul className="space-y-1">
                        {selectedStage.classical_references.map((ref, i) => (
                          <li key={i} className="text-sm text-[#AAB0D6]/80 italic">
                            {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
