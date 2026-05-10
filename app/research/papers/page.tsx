'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Button } from '@/components/ui/button';
import { FlaskConical, ExternalLink, Calendar, Users, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  pages: string;
  abstract: string;
  themes: string[];
  status: string;
  fileUrl: string;
}

const STATUS_COLORS: Record<string, string> = {
  Published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const PAPERS_PER_CLICK = 3;

export default function ResearchPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAPERS_PER_CLICK);

  useEffect(() => {
    fetch('/api/research/papers')
      .then((r) => r.json())
      .then((data) => {
        setPapers(data.papers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayPapers = papers.slice(0, visibleCount);
  const hasMore = visibleCount < papers.length;

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Peer-Reviewed Research"
        title="Research Papers"
        description="Original scholarly publications advancing understanding at the intersection of Sufi wisdom traditions and contemporary scientific inquiry."
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </div>

          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#F5F3EE]">All Publications</h2>
              <p className="text-[#AAB0D6]/60 text-sm mt-1">{loading ? 'Loading...' : `${papers.length} papers`}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/8">
              <BookOpen className="w-3.5 h-3.5" />
              Sorted by recency
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-[#C8A75E] animate-spin" />
            </div>
          ) : papers.length === 0 ? (
            <div className="text-center py-20 text-[#AAB0D6]/40">
              <p className="text-lg mb-2">No published research papers yet.</p>
              <p className="text-sm">Papers will appear here once reviewed and published.</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {displayPapers.map((paper, i) => (
                  <article
                    key={paper.id}
                    className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] leading-snug group-hover:text-[#C8A75E] transition-colors">
                          {paper.title}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider flex-shrink-0 ${STATUS_COLORS[paper.status] ?? ''}`}
                      >
                        {paper.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#AAB0D6]/50 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {paper.authors.join(', ')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" />
                        {paper.journal}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {paper.year}
                      </span>
                    </div>

                    <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-5">{paper.abstract}</p>

                    <div className="flex flex-wrap items-center gap-2">
                      {paper.themes.map((theme) => (
                        <span
                          key={theme}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70"
                        >
                          {theme}
                        </span>
                      ))}
                      {paper.fileUrl && (
                        <a
                          href={paper.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1 text-[11px] text-[#AAB0D6]/40 hover:text-[#C8A75E] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Full Paper
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + PAPERS_PER_CLICK)}
                    className="bg-[#C8A75E]/10 text-[#C8A75E] hover:bg-[#C8A75E]/20 border border-[#C8A75E]/30 px-8"
                  >
                    Load More ({papers.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          )}

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Submit a Research Contribution
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              Scholars working at the intersection of Sufi knowledge traditions and contemporary
              inquiry are invited to submit original research for consideration.
            </p>
            <Link
              href="/contribute/submit?type=research_paper"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
