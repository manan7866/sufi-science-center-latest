'use client';

import { useState, useEffect } from 'react';
import { Clock, ChartBar as BarChart2, Users, Flower2, Heart, Compass, Star, ArrowRight } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  dhikr: Flower2,
  muraqaba: Star,
  tawba: Compass,
  khidma: Heart,
  sohbet: Users,
  muhasaba: BarChart2,
};

const TABS = [
  { key: 'all', label: 'All Practices' },
  { key: 'meditation', label: 'Meditation' },
  { key: 'service', label: 'Service' },
  { key: 'psychological', label: 'Psychological' },
  { key: 'relational', label: 'Relational' },
];

const TYPE_MAP: Record<string, string> = {
  meditation: 'Meditation & Contemplation',
  service: 'Service & Action',
  psychological: 'Psychological Work',
  relational: 'Relational Practice',
};

interface Practice {
  id: string;
  slug: string;
  title: string;
  description: string;
  methodology: string | null;
  steps: string[] | null;
  practice_type: string | null;
  duration_minutes: number | null;
  difficulty_level: string | null;
  related_saints: string[] | null;
  themes: string[] | null;
  tags: string[] | null;
  featured: boolean;
}

export default function AppliedPracticesPage() {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPractices() {
      try {
        const res = await fetch('/api/dialogues/applied-practices');
        const data = await res.json();
        setPractices(data.practices || []);
      } catch (error) {
        console.error('Failed to fetch practices:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPractices();
  }, []);

  const filtered = practices.filter((p) => {
    if (activeTab === 'all') return true;
    return p.practice_type === activeTab;
  });

  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);
  const ordered = [...featured, ...others];

  return (
    <div className="min-h-screen">
      <div className="relative py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#27AE60]/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-2">Dialogues</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Applied Practices & Wisdom
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed max-w-2xl">
            Sophisticated technologies of consciousness developed over centuries. Each practice represents a
            systematic methodology for transformation, grounded in experiential knowledge refined through
            generations of practitioners.
          </p>
        </div>
      </div>

      <div className="py-12 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-7 border border-white/5">
            <h2 className="text-base font-serif font-semibold text-[#F5F3EE] mb-3">Practice as Epistemology</h2>
            <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-4">
              Sufi practices are not merely devotional exercises but sophisticated technologies of consciousness.
              Each practice represents a systematic methodology for transformation, grounded in experiential knowledge
              and refined through generations of practitioners.
            </p>
            <p className="text-sm text-[#AAB0D6]/60 leading-relaxed">
              This section explores these practices not as received tradition alone, but as living frameworks that can be
              investigated, adapted, and integrated with contemporary understanding of psychology, neuroscience, and
              human development.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-[#0A0C14]/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E]'
                  : 'text-[#AAB0D6]/40 hover:text-[#AAB0D6] border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin" />
          </div>
        )}

        {!loading && ordered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#AAB0D6]/40 text-sm">No practices in this category.</p>
          </div>
        )}

        {!loading && ordered.length > 0 && (
          <div className="space-y-5">
            {ordered.map((practice) => {
              const iconKey = practice.slug.split('-')[0];
              const Icon = ICONS[iconKey] || Flower2;
              const isOpen = expanded === practice.id;
              const typeLabel = TYPE_MAP[practice.practice_type || ''] || practice.practice_type || 'Practice';

              return (
                <div key={practice.id} className="glass-panel rounded-2xl border border-white/5 hover:border-[#C8A75E]/15 transition-all overflow-hidden">
                  <div className="p-7">
                    <div className="flex items-start gap-5">
                      <div className="w-11 h-11 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/10 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">{typeLabel}</span>
                              {practice.featured && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#27AE60]/10 border border-[#27AE60]/20 text-[#27AE60] uppercase tracking-widest font-medium">Featured</span>
                              )}
                              {practice.difficulty_level && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/8 text-[#AAB0D6]/40 uppercase tracking-wider">{practice.difficulty_level}</span>
                              )}
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] mb-2">{practice.title}</h3>
                          </div>
                          <button
                            onClick={() => setExpanded(isOpen ? null : practice.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C8A75E]/70 hover:text-[#C8A75E] border border-[#C8A75E]/15 hover:border-[#C8A75E]/30 transition-all flex-shrink-0"
                          >
                            {isOpen ? 'Collapse' : 'Explore'}
                            <ArrowRight className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                          </button>
                        </div>

                        <p className="text-sm text-[#AAB0D6]/65 leading-relaxed mb-4">{practice.description}</p>

                        <div className="flex items-center gap-5 text-[10px] text-[#AAB0D6]/30 flex-wrap">
                          {practice.duration_minutes && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {practice.duration_minutes} min
                            </span>
                          )}
                          {practice.related_saints && practice.related_saints.length > 0 && (
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3 h-3" />
                              {practice.related_saints.slice(0, 2).join(', ')}{practice.related_saints.length > 2 ? ` +${practice.related_saints.length - 2}` : ''}
                            </span>
                          )}
                        </div>

                        {practice.tags && practice.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {practice.tags.map((tag: string, i: number) => (
                              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/3 border border-white/5 text-[#AAB0D6]/35">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-white/5 px-7 py-6 bg-white/1">
                      {practice.methodology && (
                        <div className="mb-6">
                          <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-3">Methodology</p>
                          <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">{practice.methodology}</p>
                        </div>
                      )}

                      {practice.steps && practice.steps.length > 0 && (
                        <div className="mb-6">
                          <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-3">Practice Steps</p>
                          <ol className="space-y-3">
                            {practice.steps.map((step: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-[#AAB0D6]/60">
                                <span className="w-5 h-5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {practice.related_saints && practice.related_saints.length > 0 && (
                        <div className="mb-6">
                          <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-3">Related Exemplars</p>
                          <div className="flex flex-wrap gap-2">
                            {practice.related_saints.map((saint: string, i: number) => (
                              <span key={i} className="text-xs px-3 py-1.5 rounded-xl bg-white/3 border border-white/8 text-[#F5F3EE]/60">{saint}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {practice.themes && practice.themes.length > 0 && (
                        <div>
                          <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/30 uppercase mb-3">Themes</p>
                          <div className="flex flex-wrap gap-2">
                            {practice.themes.map((theme: string, i: number) => (
                              <span key={i} className="text-xs px-3 py-1.5 rounded-xl bg-[#6B9BD1]/8 border border-[#6B9BD1]/15 text-[#6B9BD1]/70">{theme}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-14 glass-panel rounded-2xl p-7 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-2">Practice Guidance</h3>
              <p className="text-xs text-[#AAB0D6]/60 leading-relaxed">
                Authentic spiritual practice requires proper guidance, ethical foundation, and integration with daily life.
                These practices are presented for educational understanding. For direct engagement, connection with qualified
                teachers and established communities is recommended to provide appropriate context, instruction, and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
