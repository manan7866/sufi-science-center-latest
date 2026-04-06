'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ReflectionEntry } from '@/hooks/use-portal-session';
import { PenLine, ChevronRight, BookOpen } from 'lucide-react';

interface ReflectionPanelProps {
  reflections: ReflectionEntry[];
  onOpenJournal: (surahNumber: number) => void;
}

export function ReflectionPanel({ reflections, onOpenJournal }: ReflectionPanelProps) {
  const sorted = [...reflections].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#C8A75E]/10 flex items-center justify-center mx-auto">
          <PenLine className="w-5 h-5 text-[#C8A75E]/50" />
        </div>
        <p className="text-sm text-[#AAB0D6]/60">No reflections recorded.</p>
        <p className="text-xs text-[#AAB0D6]/30">Open any Surah commentary to write a reflection.</p>
        <Link
          href="/interfaith-coherence/scripture-commentary"
          className="inline-flex items-center gap-1.5 text-xs text-[#C8A75E] hover:text-[#D4B56D] transition-colors mt-2"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Browse Commentary Library
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sorted.slice(0, 5).map((r) => (
        <button
          key={r.surahNumber}
          onClick={() => onOpenJournal(r.surahNumber)}
          className="w-full text-left p-4 rounded-xl bg-white/3 border border-white/6 hover:border-[#C8A75E]/25 hover:bg-[#C8A75E]/5 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#C8A75E]/70 tracking-wider uppercase">Surah {r.surahNumber}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] transition-colors" />
          </div>
          <p className="text-sm text-[#AAB0D6] line-clamp-2 leading-relaxed">{r.reflectionText}</p>
          <p className="text-[10px] text-[#AAB0D6]/30 mt-1.5">
            {new Date(r.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </button>
      ))}
      {sorted.length > 5 && (
        <p className="text-xs text-[#AAB0D6]/40 text-center pt-1">
          +{sorted.length - 5} more reflections
        </p>
      )}
    </div>
  );
}
