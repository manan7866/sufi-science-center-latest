'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, ChevronRight, CircleAlert as AlertCircle, Loader2 } from 'lucide-react';

interface SurahData {
  id: string;
  surah_number: number;
  arabic_name: string;
  english_name: string;
  revelation_type: 'meccan' | 'medinan';
  core_theme: string;
  structural_axis: string;
  sufi_reflection: string;
  interfaith_resonance: string | null;
  has_interfaith_note: boolean;
}

export default function ScriptureCommentaryPage() {
  const [surahs, setSurahs] = useState<SurahData[]>([]);
  const [filtered, setFiltered] = useState<SurahData[]>([]);
  const [search, setSearch] = useState('');
  const [revelationType, setRevelationType] = useState<'all' | 'meccan' | 'medinan'>('all');
  const [interfaithOnly, setInterfaithOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const res = await fetch('/api/interfaith-coherence/scripture-commentary');
        const data = await res.json();
        setSurahs(data.surahs || []);
      } catch (error) {
        console.error('Failed to fetch surahs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
  }, []);

  useEffect(() => {
    let result = [...surahs];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.english_name.toLowerCase().includes(q) ||
          s.arabic_name.toLowerCase().includes(q) ||
          s.core_theme.toLowerCase().includes(q) ||
          s.structural_axis.toLowerCase().includes(q) ||
          String(s.surah_number).includes(q)
      );
    }
    if (revelationType !== 'all') {
      result = result.filter((s) => s.revelation_type === revelationType);
    }
    if (interfaithOnly) {
      result = result.filter((s) => s.has_interfaith_note);
    }
    setFiltered(result);
  }, [surahs, search, revelationType, interfaithOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Holy Scripture Commentary"
        title="The Qur'an through a "
        title2='Sufi Metaphysical Lens'
        description="Brief thematic reflections on all 114 chapters grounded in classical Sufi metaphysics, identifying spiritual architecture, ontological themes, and ethical structure."
      />

      <div className="max-w-6xl mx-auto px-6 py-20">

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="glass-panel rounded-2xl p-8 border-[#C8A75E]/20">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-3">
                    Purpose of This Library
                  </h2>
                  <p className="text-sm text-[#AAB0D6] leading-relaxed">
                    This library offers concise thematic commentary on every chapter of the Qur'an,
                    identifying spiritual architecture, ontological themes, ethical structure, and
                    metaphysical insight rooted in classical Sufi scholarship.
                  </p>
                  <p className="text-sm text-[#AAB0D6] leading-relaxed mt-3">
                    These reflections do not replace classical tafsir. They illuminate thematic continuity.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-amber-500/20 rounded-2xl p-8 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F3EE] mb-2">Institutional Boundary</h3>
                  <p className="text-xs text-[#AAB0D6] leading-relaxed">
                    This thematic commentary does not replace classical tafsir. It offers structured
                    metaphysical reflection rooted in established Sufi scholarship. These are not
                    new interpretations or authoritative rulings. They are institutionally anchored
                    thematic orientations for the reflective practitioner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/50" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, number, theme, or axis..."
                className="pl-11 bg-[#2A2F4F]/20 border-[#2A2F4F]/60 text-[#F5F3EE] placeholder:text-[#AAB0D6]/40 focus:border-[#C8A75E]/50 h-12"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#AAB0D6]/50" />
                <span className="text-xs text-[#AAB0D6]/50 uppercase tracking-widest">Filter</span>
              </div>

              {(['all', 'meccan', 'medinan'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setRevelationType(type)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all border capitalize ${
                    revelationType === type
                      ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0B0F2A] font-semibold'
                      : 'border-white/15 text-[#AAB0D6] hover:border-[#C8A75E]/40 hover:text-[#F5F3EE]'
                  }`}
                >
                  {type === 'all' ? 'All Revelations' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}

              <button
                onClick={() => setInterfaithOnly(!interfaithOnly)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all border ${
                  interfaithOnly
                    ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                    : 'border-white/15 text-[#AAB0D6] hover:border-teal-500/30 hover:text-teal-300'
                }`}
              >
                Interfaith Resonance
              </button>

              <span className="text-xs text-[#AAB0D6]/40 ml-auto">
                {filtered.length} of 114 Surahs
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((surah, index) => (
            <ScrollReveal key={surah.id} delay={Math.min(index * 0.02, 0.3)}>
              <Link href={`/interfaith-coherence/scripture-commentary/surah/${surah.surah_number}`}>
                <div className="group glass-panel rounded-xl p-5 border border-white/5 hover:border-[#C8A75E]/30 transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#C8A75E]">{surah.surah_number}</span>
                      </div>
                      <div>
                        <p className="text-base font-serif font-semibold text-[#F5F3EE] leading-tight">
                          {surah.arabic_name}
                        </p>
                        <p className="text-xs text-[#AAB0D6]">{surah.english_name}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] transition-colors flex-shrink-0 mt-1" />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${
                      surah.revelation_type === 'meccan'
                        ? 'bg-sky-500/10 border-sky-500/25 text-sky-400'
                        : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                    }`}>
                      {surah.revelation_type}
                    </span>
                    {surah.has_interfaith_note && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border bg-teal-500/10 border-teal-500/25 text-teal-400">
                        Interfaith
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#AAB0D6] leading-relaxed flex-1 line-clamp-2">
                    {surah.core_theme}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-[10px] text-[#C8A75E]/70 tracking-wider uppercase">
                      {surah.structural_axis}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#AAB0D6]">No Surahs match your current filters.</p>
            <button
              onClick={() => { setSearch(''); setRevelationType('all'); setInterfaithOnly(false); }}
              className="mt-4 text-sm text-[#C8A75E] hover:text-[#D4B56D] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
