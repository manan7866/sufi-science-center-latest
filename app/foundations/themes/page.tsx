'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Loader as Loader2, Lightbulb, ArrowRight } from 'lucide-react';

interface ThemeEntry {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

interface ThemeCluster {
  label: string;
  description: string;
  range: [number, number];
  accent: string;
}

const THEME_CLUSTERS: ThemeCluster[] = [
  {
    label: 'Core Metaphysical Themes',
    description: 'The foundational ontological and cosmological doctrines of Sufi thought — from the Unity of Being through divine names, prophecy, and sainthood.',
    range: [100, 199],
    accent: '#C8A75E',
  },
  {
    label: 'Spiritual Psychology & Inner Science',
    description: 'The inner architecture of the human being — transformation, purification, the stations of the nafs, visionary states, and contemplative practice.',
    range: [200, 299],
    accent: '#7BAFD4',
  },
  {
    label: 'Devotional & Ritual Life',
    description: 'The outer and inner forms of Sufi practice — dhikr, sama, asceticism, adab, and the full ritual culture of the orders.',
    range: [300, 399],
    accent: '#D4A07B',
  },
  {
    label: 'Transmission & Authority',
    description: 'The formal mechanisms of Sufi knowledge transfer — silsila, bayah, initiation, shaykhhood, and institutional order formation.',
    range: [400, 499],
    accent: '#8BB89A',
  },
  {
    label: 'Intellectual & Theological Engagement',
    description: 'The interface of Sufism with Islamic jurisprudence, theology, philosophy, interfaith encounter, and movements of reform and renewal.',
    range: [500, 599],
    accent: '#B49AD4',
  },
  {
    label: 'Social & Civilizational Dimensions',
    description: "The outward expression of Sufism in society — social justice, political mysticism, gender, educational institutions, and artistic production.",
    range: [600, 699],
    accent: '#D4B87B',
  },
];

export default function ThemesPage() {
  const [themes, setThemes] = useState<ThemeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await fetch('/api/foundations/themes');
        const data = await res.json();
        setThemes(data.themes || []);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchThemes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  const getClusterThemes = (range: [number, number]) =>
    themes.filter(
      (t) => (t.display_order ?? 0) >= range[0] && (t.display_order ?? 0) <= range[1]
    );

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Core Themes"
        description="Thirty-one scholarly themes organized into six conceptual clusters — spanning metaphysics, inner psychology, devotional practice, transmission, theology, and civilizational impact."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/60 uppercase tracking-widest font-semibold">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>{themes.length} Themes · {THEME_CLUSTERS.length} Conceptual Clusters</span>
                </div>
                <span className="text-xs text-[#AAB0D6]/40">Select any theme to enter the archive</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 space-y-8">
            {THEME_CLUSTERS.map((cluster) => {
              const clusterThemes = getClusterThemes(cluster.range);
              if (clusterThemes.length === 0) return null;

              return (
                <ScrollReveal key={cluster.label}>
                  <div>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: cluster.accent }}
                        />
                        <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: cluster.accent }}>
                          {cluster.label}
                        </h2>
                      </div>
                      <p className="text-sm text-[#AAB0D6] leading-relaxed pl-4 border-l border-white/10">
                        {cluster.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {clusterThemes.map((theme) => (
                        <Link
                          key={theme.id}
                          href={`/foundations/masters-of-the-path?theme=${theme.slug}`}
                          className="flex items-center justify-between gap-3 glass-panel border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 group hover:border-[rgba(255,255,255,0.14)] transition-all duration-200"
                        >
                          <span className="text-sm text-[#D4CFC6] group-hover:text-[#F5F3EE] transition-colors leading-tight">
                            {theme.name}
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 flex-shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                            style={{ color: cluster.accent }}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
