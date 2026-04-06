'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Download, Share2, Users, FileText, Calendar, BookOpen, Loader2 } from 'lucide-react';

function formatTranscript(text: string) {
  const lines = text.split('\n');
  return lines.map((line: string, i: number) => {
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
  });
}

export default function HardInquiryTranscriptContent({ slug }: { slug: string }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`/api/dialogues/hard-inquiry/${slug}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        setSession(data.session);
      } catch (error) {
        console.error('Failed to fetch session:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  if (!session) {
    notFound();
  }

  const publishedDate = new Date(session.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const citationCount = session.citations?.length || 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/dialogues/hard-inquiry" className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Critical Inquiry
        </Link>

        <div className="glass-panel rounded-2xl p-8 mb-6 border border-white/5">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#6B9BD1]/12 border border-[#6B9BD1]/20 text-[#6B9BD1] uppercase tracking-widest font-medium">Critical Inquiry</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">Full Transcript</span>
            {session.featured && (
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/8 text-[#AAB0D6]/40 uppercase tracking-wider">Featured</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F3EE] mb-4 leading-tight">{session.title}</h1>
          <p className="text-[#AAB0D6]/70 leading-relaxed mb-7">{session.description}</p>

          <div className="h-px bg-white/5 mb-6" />

          <div className="flex items-center gap-6 text-[11px] text-[#AAB0D6]/40 flex-wrap mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {publishedDate}
            </span>
            {citationCount > 0 && (
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                {citationCount} Citations
              </span>
            )}
          </div>

          {session.participants && session.participants.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-3 flex items-center gap-2">
                <Users className="w-3 h-3" />
                Participants
              </p>
              <div className="flex flex-wrap gap-2">
                {session.participants.map((participant: string, idx: number) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-xl bg-white/3 border border-white/8 text-[#F5F3EE]/70">{participant}</span>
                ))}
              </div>
            </div>
          )}

          {session.controversial_points && session.controversial_points.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-3 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                Critical Points Examined
              </p>
              <ul className="space-y-2">
                {session.controversial_points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#AAB0D6]/60">
                    <span className="text-[#6B9BD1]/50 flex-shrink-0 mt-1">·</span>
                    {point}
                  </li>
                ))}
              </ul>
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

        {!session.transcript && (
          <div className="glass-panel rounded-2xl p-8 border border-[#C8A75E]/15 bg-[#C8A75E]/3 mb-6 text-center">
            <BookOpen className="w-8 h-8 text-[#C8A75E]/30 mx-auto mb-3" />
            <p className="text-[#AAB0D6]/60 text-sm">
              Transcript is currently being prepared and will be available soon.
            </p>
          </div>
        )}

        {session.transcript && (
          <div className="glass-panel rounded-2xl p-8 border border-white/5 mb-6">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#C8A75E]" />
              </div>
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE]">Full Debate Transcript</h2>
            </div>

            <div className="border-l-2 border-white/5 pl-6 space-y-1 text-[15px] leading-[1.9]">
              {formatTranscript(session.transcript)}
            </div>
          </div>
        )}

        {session.citations && session.citations.length > 0 && (
          <div className="glass-panel rounded-2xl p-8 border border-white/5 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#6B9BD1]" />
              </div>
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE]">References & Citations</h2>
            </div>

            <ol className="space-y-3">
              {session.citations.map((citation: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#AAB0D6]/60">
                  <span className="text-[#C8A75E]/50 font-mono text-xs flex-shrink-0 mt-0.5">[{idx + 1}]</span>
                  <span>{citation}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/dialogues/hard-inquiry" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#C8A75E]/20 text-[#C8A75E]/70 hover:text-[#C8A75E] hover:border-[#C8A75E]/35 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to All Critical Inquiry Debates
          </Link>
        </div>
      </div>
    </div>
  );
}
