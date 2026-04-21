'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Loader as Loader2, Clock, ArrowRight } from 'lucide-react';

interface HistoricalPeriod {
  id: string;
  name: string;
  slug: string;
  start_year: number;
  end_year: number | null;
  display_order: number;
  description?: string | null;
  keywords?: string[] | null;
}

const ERA_DETAILS: Record<string, { description: string; keywords: string[] }> = {
  'prophetic-foundational-transmission': {
    description:
      'The Prophetic era and the generation of the Companions. The foundational transmission of interior knowledge through direct proximity to the Prophet Muhammad. This period establishes the spiritual roots from which all Sufi lineages claim descent.',
    keywords: ['Companions (Sahaba)', 'Prophetic Hadith', 'Zuhd (Asceticism)', 'Early Piety'],
  },
  'early-ascetic-ethical-formation': {
    description:
      'The emergence of the first generation of named Sufi figures. Characterized by intense asceticism, ethical rigor, and the development of the vocabulary of the interior life. Key centers: Basra and Kufa.',
    keywords: ['Hasan al-Basri', 'Rabia al-Adawiyya', 'Asceticism', 'Divine Love', 'Baghdad School'],
  },
  'classical-theoretical-consolidation': {
    description:
      'The systematic articulation of Sufi doctrine. Production of the great classical manuals, theoretical frameworks for maqamat (stations) and ahwal (states), and the full elaboration of Sufi psychology and cosmology.',
    keywords: ['Maqamat & Ahwal', 'Junayd of Baghdad', 'Hallaj', 'Classical Manuals', 'Sufi Psychology'],
  },
  'institutional-tariqa-formation': {
    description:
      'The crystallization of individual masters\' teaching styles into formal orders with distinct methodologies, initiation systems, silsilas, and institutional khanqahs. The foundation of the classical tariqa system.',
    keywords: ['Abdul Qadir Gilani', 'Ahmad Yasawi', 'Khanqah System', 'Formal Silsila', 'Initiation'],
  },
  'metaphysical-philosophical-expansion': {
    description:
      'The era of Ibn Arabi and the elaboration of Wahdat al-Wujud (Unity of Being). Philosophical Sufism reaches its greatest systematic expression. Simultaneously, Rumi transforms Persian mystical poetry into one of the greatest spiritual literatures of the world.',
    keywords: ["Ibn Arabi", 'Wahdat al-Wujud', 'Rumi & Mevleviyya', 'Fusus al-Hikam', 'Mystical Poetry'],
  },
  'imperial-global-expansion': {
    description:
      'The spread of Sufi orders across the Ottoman, Safavid, and Mughal empires. Sufi culture becomes embedded in imperial court life, urban governance, and rural missionary activity across three continents. Major orders achieve global reach.',
    keywords: ['Ottoman Sufism', 'Mughal Patronage', 'Safavid Orders', 'Global Missionary Activity', 'Court Culture'],
  },
  'reform-renewal-modern-rearticulation': {
    description:
      'Responses to European colonialism, modernism, and internal theological critique. Reform movements within Sufism seek to purify practice while preserving the essential spiritual inheritance. The emergence of diaspora Sufi communities in the West.',
    keywords: ['Sanusiyya', 'Tijaniyya', 'Colonial Context', 'Modern Reform', 'Western Diaspora'],
  },
};

export default function PeriodsPage() {
  const [eras, setEras] = useState<HistoricalPeriod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEras() {
      try {
        const res = await fetch('/api/foundations/periods');
        const data = await res.json();
        setEras(data.eras || []);
      } catch (error) {
        console.error('Failed to fetch eras:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEras();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Historical Periods"
        description="Seven eras spanning fourteen centuries of Sufi intellectual and institutional history — from the Prophetic transmission to the age of reform and modernity."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/60 uppercase tracking-widest font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{eras.length} Historical Eras · 570 CE – Present</span>
                </div>
                <span className="text-xs text-[#AAB0D6]/40">Select any era to enter the archive</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline spine */}
          <div className="mt-8 relative">
            <div className="absolute left-[1.85rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#C8A75E]/40 via-[#C8A75E]/20 to-transparent" />

            <div className="space-y-6">
              {eras.map((era, index) => {
                const detail = ERA_DETAILS[era.slug];
                const span = era.end_year
                  ? `${era.start_year} – ${era.end_year} CE`
                  : `${era.start_year} CE – Present`;

                return (
                  <ScrollReveal key={era.id}>
                    <Link
                      href={`/foundations/masters-of-the-path?era=${era.slug}`}
                      className="flex gap-5 group"
                    >
                      {/* Timeline node */}
                      <div className="flex flex-col items-center flex-shrink-0 z-10">
                        <div className="w-[3.7rem] h-9 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/30 flex items-center justify-center group-hover:bg-[#C8A75E]/20 transition-colors">
                          <span className="text-xs font-bold text-[#C8A75E]">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-6 group-hover:border-[rgba(255,255,255,0.14)] transition-all duration-200 mb-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-base font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-tight mb-1">
                              {era.name}
                            </h3>
                            <span className="text-xs text-[#AAB0D6]/60 font-mono tracking-wider">{span}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>

                        {era.keywords && (
                          <>
                            <p className="text-sm text-[#AAB0D6] leading-relaxed mb-3">{era.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {era.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="text-xs text-[#AAB0D6]/60 border border-white/8 rounded-full px-2.5 py-0.5"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
