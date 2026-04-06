'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, ChartBar as BarChart3, Heart, Wind, Eye, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface Practice {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty_level: string;
  duration_minutes: number;
  description: string;
  instructions: string;
  benefits: string[];
  prerequisites: string[];
  tradition_source: string;
  video_url?: string;
  audio_url?: string;
}

const categoryIcons: Record<string, any> = {
  meditation: Sparkles,
  dhikr: Heart,
  breath_work: Wind,
  contemplation: Eye,
  visualization: Eye,
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
};

function PracticesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      const res = await fetch('/api/inner-development/practices');
      const data = await res.json();
      setPractices(data.practices || []);
    } catch (error) {
      console.error('Failed to fetch practices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    const newUrl = params.toString() ? `?${params.toString()}` : '/inner-development/practices';
    router.push(newUrl, { scroll: false });
  };

  const categories = ['all', 'meditation', 'dhikr', 'breath_work', 'contemplation', 'visualization'];

  const filteredPractices = selectedCategory === 'all'
    ? practices
    : practices.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading practices...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Consciousness Practices"
        description="Classical Sufi practices for transformation, validated by centuries of transmission and increasingly recognized by modern consciousness research."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-12">
            <TabsList className="glass-panel border-white/10 p-1 w-full md:w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize data-[state=active]:bg-[#C8A75E] data-[state=active]:text-[#0B0F2A]"
                >
                  {category.replace('_', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ScrollReveal>

        {!selectedPractice ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPractices.map((practice, index) => {
              const Icon = categoryIcons[practice.category] || Sparkles;

              return (
                <ScrollReveal key={practice.id} delay={index * 0.1}>
                  <Card className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all cursor-pointer"
                    onClick={() => setSelectedPractice(practice)}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2">
                          {practice.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`${difficultyColors[practice.difficulty_level]} text-xs`}>
                            {practice.difficulty_level}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-white/20 text-[#AAB0D6]">
                            <Clock className="w-3 h-3 mr-1" />
                            {practice.duration_minutes} min
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4">
                      {practice.description}
                    </p>

                    <div className="text-xs text-[#AAB0D6]/60 italic">
                      {practice.tradition_source}
                    </div>

                    <Button
                      className="mt-4 w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPractice(practice);
                      }}
                    >
                      View Full Instructions
                    </Button>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <ScrollReveal>
            <Card className="glass-panel border-white/5 p-8 max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setSelectedPractice(null)}
                className="mb-6 text-[#AAB0D6] hover:text-[#F5F3EE]"
              >
                ← Back to all practices
              </Button>

              <div className="mb-6">
                <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-4">
                  {selectedPractice.title}
                </h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className={`${difficultyColors[selectedPractice.difficulty_level]}`}>
                    {selectedPractice.difficulty_level}
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-[#AAB0D6]">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPractice.duration_minutes} minutes
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-[#AAB0D6] capitalize">
                    {selectedPractice.category.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-[#AAB0D6] leading-relaxed text-lg">
                  {selectedPractice.description}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#C8A75E]" />
                    Instructions
                  </h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                    <pre className="text-[#AAB0D6] whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedPractice.instructions}
                    </pre>
                  </div>
                </div>

                {selectedPractice.benefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedPractice.benefits.map((benefit, i) => (
                        <li key={i} className="text-[#AAB0D6] flex items-start gap-2">
                          <span className="text-[#C8A75E] mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPractice.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4">Prerequisites</h3>
                    <ul className="space-y-2">
                      {selectedPractice.prerequisites.map((prereq, i) => (
                        <li key={i} className="text-[#AAB0D6] flex items-start gap-2">
                          <span className="text-[#C8A75E] mt-1">•</span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-[#AAB0D6]/80 italic">
                    Tradition: {selectedPractice.tradition_source}
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

export default function PracticesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading practices...</div>
        </div>
      </div>
    }>
      <PracticesPageInner />
    </Suspense>
  );
}
