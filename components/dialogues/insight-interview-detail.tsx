'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Building, Calendar, BookOpen, Download, Share2, Loader2 } from 'lucide-react';

export default function InsightInterviewDetailContent({ slug }: { slug: string }) {
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInterview() {
      try {
        const res = await fetch(`/api/dialogues/insight-interviews/${slug}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        setInterview(data.interview);
      } catch (error) {
        console.error('Failed to fetch interview:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchInterview();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  if (!interview) {
    notFound();
  }

  const publishedDate = new Date(interview.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/dialogues/insight-interviews" className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Insight Interviews
        </Link>

        <div className="glass-panel rounded-2xl p-8 mb-6 border border-white/5">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">Insight Interview</span>
            {interview.featured && (
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/8 text-[#AAB0D6]/40 uppercase tracking-wider">Featured</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F3EE] mb-4 leading-tight">{interview.title}</h1>
          <p className="text-[#AAB0D6]/70 leading-relaxed mb-7">{interview.description}</p>

          <div className="h-px bg-white/5 mb-6" />

          <div className="flex items-center gap-6 text-[11px] text-[#AAB0D6]/40 flex-wrap mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {publishedDate}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[#C8A75E]" />
              <span className="text-sm font-semibold text-[#F5F3EE]">{interview.interviewee}</span>
            </div>
            {interview.affiliation && (
              <div className="flex items-center gap-2 mb-3">
                <Building className="w-3.5 h-3.5 text-[#AAB0D6]/40" />
                <span className="text-xs text-[#AAB0D6]/60">{interview.affiliation}</span>
              </div>
            )}
          </div>

          {interview.bio && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">About the Interviewee</p>
              <p className="text-sm text-[#AAB0D6]/60 leading-relaxed">{interview.bio}</p>
            </div>
          )}

          {interview.themes && interview.themes.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Themes</p>
              <div className="flex flex-wrap gap-2">
                {interview.themes.map((theme: string, idx: number) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-xl bg-white/3 border border-white/8 text-[#F5F3EE]/60">{theme}</span>
                ))}
              </div>
            </div>
          )}

          <div className="h-px bg-white/5 mb-6" />

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-white/8 text-[#AAB0D6]/50 hover:text-[#AAB0D6] hover:border-white/15 transition-all">
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-white/8 text-[#AAB0D6]/50 hover:text-[#AAB0D6] hover:border-white/15 transition-all">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>

        {!interview.transcript && (
          <div className="glass-panel rounded-2xl p-8 border border-[#C8A75E]/15 bg-[#C8A75E]/3 mb-6 text-center">
            <BookOpen className="w-8 h-8 text-[#C8A75E]/30 mx-auto mb-3" />
            <p className="text-[#AAB0D6]/60 text-sm">
              Transcript is currently being prepared and will be available soon.
            </p>
          </div>
        )}

        {interview.transcript && (
          <div className="glass-panel rounded-2xl p-8 border border-white/5 mb-6">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#C8A75E]" />
              </div>
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE]">Full Interview Transcript</h2>
            </div>

            <div className="border-l-2 border-white/5 pl-6 space-y-1 text-[15px] leading-[1.9]">
              {interview.transcript.split('\n').map((line: string, i: number) => {
                const speakerMatch = line.match(/^([A-Z][A-Z\s\.\-']+):\s(.+)/);
                if (speakerMatch) {
                  return (
                    <div key={i} className="mb-4">
                      <span className="text-[#C8A75E] font-semibold text-xs tracking-[0.15em] uppercase mr-3">{speakerMatch[1]}:</span>
                      <span className="text-[#F5F3EE]/90 leading-relaxed">{speakerMatch[2]}</span>
                    </div>
                  );
                }
                if (line.trim() === '') return <div key={i} className="h-3" />;
                return (
                  <p key={i} className="text-[#AAB0D6]/80 leading-relaxed mb-2 italic text-sm">{line}</p>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/dialogues/insight-interviews" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#C8A75E]/20 text-[#C8A75E]/70 hover:text-[#C8A75E] hover:border-[#C8A75E]/35 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to All Insight Interviews
          </Link>
        </div>
      </div>
    </div>
  );
}
