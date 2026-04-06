'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, BookOpen, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface EmotionalModule {
  id: string;
  title: string;
  slug: string;
  focus_area: string;
  description: string;
  sufi_approach: string;
  modern_psychology: string;
  practices: string[];
  reflection_questions: string[];
  resources: any;
}

const focusAreaColors: Record<string, string> = {
  anger: 'from-red-500/20 to-red-500/5',
  fear: 'from-yellow-500/20 to-yellow-500/5',
  grief: 'from-blue-500/20 to-blue-500/5',
  joy: 'from-green-500/20 to-green-500/5',
  love: 'from-pink-500/20 to-pink-500/5',
  compassion: 'from-purple-500/20 to-purple-500/5',
};

export default function EmotionalPage() {
  const [modules, setModules] = useState<EmotionalModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<EmotionalModule | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await fetch('/api/inner-development/emotional');
      const data = await res.json();
      setModules(data.modules || []);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading modules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Emotional Intelligence"
        description="Integrating classical Sufi heart practices with modern emotional intelligence. The heart is the seat of transformation—purify it, and all else follows."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        {!selectedModule ? (
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <ScrollReveal key={module.id} delay={index * 0.1}>
                <Card
                  className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all cursor-pointer"
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${focusAreaColors[module.focus_area] || 'from-[#C8A75E]/20 to-[#C8A75E]/5'} flex items-center justify-center flex-shrink-0`}>
                      <Heart className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[#C8A75E] capitalize mb-3">
                        {module.focus_area}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#AAB0D6] leading-relaxed">
                    {module.description}
                  </p>

                  <Button
                    className="mt-4 w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModule(module);
                    }}
                  >
                    Explore Module
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <Card className="glass-panel border-white/5 p-8 max-w-5xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setSelectedModule(null)}
                className="mb-6 text-[#AAB0D6] hover:text-[#F5F3EE]"
              >
                ← Back to all modules
              </Button>

              <div className="mb-8">
                <h2 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-4">
                  {selectedModule.title}
                </h2>
                <p className="text-lg text-[#AAB0D6] leading-relaxed">
                  {selectedModule.description}
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#C8A75E]/10 via-[#C8A75E]/5 to-transparent rounded-lg p-6 border border-white/5">
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#C8A75E]" />
                      Sufi Approach
                    </h3>
                    <p className="text-[#AAB0D6] leading-relaxed text-sm">
                      {selectedModule.sufi_approach}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent rounded-lg p-6 border border-white/5">
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-400" />
                      Modern Psychology
                    </h3>
                    <p className="text-[#AAB0D6] leading-relaxed text-sm">
                      {selectedModule.modern_psychology}
                    </p>
                  </div>
                </div>

                {selectedModule.practices.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-[#C8A75E]" />
                      Practices
                    </h3>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                      <ul className="space-y-3">
                        {selectedModule.practices.map((practice, i) => (
                          <li key={i} className="text-[#AAB0D6] flex items-start gap-3">
                            <span className="text-[#C8A75E] mt-1 text-lg">•</span>
                            <span className="leading-relaxed">{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedModule.reflection_questions.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-4">
                      Reflection Questions
                    </h3>
                    <div className="bg-gradient-to-br from-[#C8A75E]/10 to-transparent rounded-lg p-6 border border-[#C8A75E]/20">
                      <ul className="space-y-4">
                        {selectedModule.reflection_questions.map((question, i) => (
                          <li key={i} className="text-[#AAB0D6] leading-relaxed">
                            <span className="text-[#C8A75E] font-semibold">{i + 1}.</span> {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedModule.resources && (
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                      Resources
                    </h3>
                    <div className="space-y-3 text-sm text-[#AAB0D6]">
                      {selectedModule.resources.books && (
                        <div>
                          <p className="font-semibold text-[#F5F3EE] mb-2">Recommended Reading:</p>
                          <ul className="space-y-1 ml-4">
                            {selectedModule.resources.books.map((book: string, i: number) => (
                              <li key={i} className="text-[#AAB0D6]">• {book}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedModule.resources.practices && (
                        <div>
                          <p className="font-semibold text-[#F5F3EE] mb-2">Practice Resources:</p>
                          <ul className="space-y-1 ml-4">
                            {selectedModule.resources.practices.map((practice: string, i: number) => (
                              <li key={i} className="text-[#AAB0D6]">• {practice}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedModule.resources.support && (
                        <div>
                          <p className="font-semibold text-[#F5F3EE] mb-2">Support:</p>
                          <ul className="space-y-1 ml-4">
                            {selectedModule.resources.support.map((item: string, i: number) => (
                              <li key={i} className="text-[#AAB0D6]">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
