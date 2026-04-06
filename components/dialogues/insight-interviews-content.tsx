'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, User, Building, Calendar, Loader2 } from 'lucide-react';

export default function InsightInterviewsContent() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const res = await fetch('/api/dialogues/insight-interviews');
        const data = await res.json();
        setInterviews(data.interviews || []);
      } catch (error) {
        console.error('Failed to fetch interviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInterviews();
  }, []);

  return (
    <section className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-10">
          <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">Featured Interviews</h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
          </div>
        ) : interviews.length > 0 ? (
          <div className="space-y-6">
            {interviews.map((interview: any) => {
              const date = new Date(interview.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
              return (
                <div key={interview.id} className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/20 transition-all group">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">Insight Interview</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                        {interview.title}
                      </h3>
                      <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-4 max-w-2xl">
                        {interview.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/50">
                          <User className="w-3.5 h-3.5 text-[#C8A75E]/50" />
                          <span className="text-[#F5F3EE]/60 font-medium">{interview.interviewee}</span>
                        </div>
                        {interview.affiliation && (
                          <div className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/40">
                            <Building className="w-3.5 h-3.5" />
                            {interview.affiliation}
                          </div>
                        )}
                      </div>

                      {interview.themes && interview.themes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {interview.themes.map((theme: string, i: number) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/3 border border-white/5 text-[#AAB0D6]/35">{theme}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-[10px] text-[#AAB0D6]/30">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {date}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Link href={`/dialogues/insight-interviews/${interview.slug}`}>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/20 text-[#C8A75E] hover:bg-[#C8A75E]/16 hover:border-[#C8A75E]/35 transition-all whitespace-nowrap">
                          <BookOpen className="w-4 h-4" />
                          Read Interview
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#AAB0D6]/40 text-sm">No interviews available yet.</p>
          </div>
        )}

        <div className="mt-14 glass-panel rounded-2xl p-7 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-[#6B9BD1]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-2">Expanding Archive</h3>
              <p className="text-xs text-[#AAB0D6]/60 leading-relaxed">
                New interviews are added regularly. Each conversation is peer-reviewed for intellectual integrity
                and presented with full transcripts. Audio versions are in preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
