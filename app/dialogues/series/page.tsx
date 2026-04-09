'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Filter, FileText, Users } from 'lucide-react';

interface Series {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  featured: boolean;
  difficulty_level: string | null;
  total_episodes: number;
  total_duration_minutes: number;
  participants: string[] | null;
  published_at: string;
  episodes?: { count: number }[];
}

const LEVELS = ['All', 'beginner', 'intermediate', 'advanced'];

export default function DialogSeriesPage() {
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const res = await fetch('/api/dialogues/series');
        const data = await res.json();
        setAllSeries(data.series || []);
      } catch (error) {
        console.error('Failed to fetch series:', error);
        setAllSeries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, []);

  const filtered = allSeries.filter((s) => {
    const matchesSearch =
      search === '' ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      (s.participants || []).some((p) => p.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = level === 'All' || s.difficulty_level === level;
    return matchesSearch && matchesLevel;
  });

  const featured = filtered.filter((s) => s.featured);
  const others = filtered.filter((s) => !s.featured);

  return (
    <div className="min-h-screen">
      <div className="relative py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-2">Dialogues</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Dialogic Inquiry Series
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed max-w-2xl">
            Collaborative multi-session explorations bridging scientific inquiry and contemplative wisdom.
            Each series features in-depth engagement across several episodes with full written transcripts.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-[#0A0C14]/90 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/40" />
            <input
              type="text"
              placeholder="Search by title, theme, or participant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0f30] border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F5F3EE] placeholder:text-[#AAB0D6]/25 focus:outline-none focus:border-[#C8A75E]/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-[#AAB0D6]/30 flex-shrink-0" />
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  level === l
                    ? 'bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E]'
                    : 'text-[#AAB0D6]/40 hover:text-[#AAB0D6] border border-transparent'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#AAB0D6]/40 text-sm">No series match your search.</p>
          </div>
        )}

        {!loading && featured.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">Featured Series</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="space-y-5">
              {featured.map((series) => {
                const epCount = series.episodes?.[0]?.count ?? series.total_episodes ?? 0;
                const date = new Date(series.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                return (
                  <Link  key={series.id} href={`/dialogues/series/${series.slug}`}>
                    <div className="group glass-panel rounded-2xl my-4 p-7 border border-white/5 hover:border-[#C8A75E]/20 transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">Featured</span>
                            {series.difficulty_level && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-[#AAB0D6]/50 uppercase tracking-wider">{series.difficulty_level}</span>
                            )}
                          </div>
                          <h3 className="text-xl font-serif font-bold text-[#F5F3EE] mb-1 group-hover:text-[#C8A75E] transition-colors">
                            {series.title}
                          </h3>
                          {series.subtitle && (
                            <p className="text-sm text-[#C8A75E]/70 mb-2">{series.subtitle}</p>
                          )}
                          <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-4 max-w-2xl">
                            {series.description}
                          </p>
                          <div className="flex items-center gap-5 text-xs text-[#AAB0D6]/40 flex-wrap">
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-[#C8A75E]/50" />
                              {epCount} Episodes
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#C8A75E]/50" />
                              {date}
                            </span>
                            {(series.total_duration_minutes ?? 0) > 0 && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#C8A75E]/50" />
                                ~{series.total_duration_minutes} min
                              </span>
                            )}
                          </div>
                          {series.participants && series.participants.length > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <Users className="w-3.5 h-3.5 text-[#AAB0D6]/25 flex-shrink-0" />
                              <p className="text-xs text-[#AAB0D6]/40">{series.participants.join(' · ')}</p>
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#AAB0D6]/15 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {!loading && others.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">All Series</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((series) => {
                const epCount = series.episodes?.[0]?.count ?? series.total_episodes ?? 0;
                const date = new Date(series.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                return (
                  <Link key={series.id} href={`/dialogues/series/${series.slug}`}>
                    <div className="group glass-panel rounded-2xl p-5 border border-white/5 hover:border-[#C8A75E]/20 transition-all h-full cursor-pointer flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        {series.difficulty_level && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/8 text-[#AAB0D6]/40 uppercase tracking-wider">{series.difficulty_level}</span>
                        )}
                        <ArrowRight className="w-4 h-4 text-[#AAB0D6]/15 group-hover:text-[#C8A75E] group-hover:translate-x-0.5 transition-all ml-auto flex-shrink-0" />
                      </div>
                      <h3 className="text-sm font-serif font-bold text-[#F5F3EE] mb-1 group-hover:text-[#C8A75E] transition-colors">
                        {series.title}
                      </h3>
                      {series.subtitle && (
                        <p className="text-xs text-[#C8A75E]/60 mb-2">{series.subtitle}</p>
                      )}
                      <p className="text-xs text-[#AAB0D6]/50 leading-relaxed flex-1 mb-4 line-clamp-2">
                        {series.description}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] text-[#AAB0D6]/30">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {epCount} ep.
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {date}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-16 glass-panel rounded-2xl p-7 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F3EE] mb-2 font-serif">About the Transcripts</h3>
              <p className="text-xs text-[#AAB0D6]/60 leading-relaxed">
                All dialogue series are currently available as written transcripts for deep reflection and careful study.
                Audio and video formats are in preparation. Each series contains multiple episodes; full transcripts are
                accessible from each series detail page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
