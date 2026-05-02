'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ReflectionEntry } from '@/hooks/use-portal-session';
import { PenLine, ChevronRight, BookOpen, Trash2 } from 'lucide-react';

interface ReflectionPanelProps {
  reflections: ReflectionEntry[];
  onOpenJournal: (surahNumber: number) => void;
  onDelete?: (surahNumber: number) => void;
}

export function ReflectionPanel({ reflections, onOpenJournal, onDelete }: ReflectionPanelProps) {
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
        <div
          key={r.surahNumber}
          className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-[#C8A75E]/25 hover:bg-[#C8A75E]/5 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#C8A75E]/70 tracking-wider uppercase">Surah {r.surahNumber}</span>
            <div className="flex items-center gap-2">
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this reflection?')) {
                      onDelete(r.surahNumber);
                    }
                  }}
                  className="text-red-400/50 hover:text-red-400 transition-colors"
                  title="Delete reflection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => onOpenJournal(r.surahNumber)}
                className="flex items-center gap-1 text-xs text-[#C8A75E] hover:text-[#D4B56D] transition-colors"
              >
                Edit
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-[#AAB0D6] line-clamp-2 leading-relaxed">{r.reflectionText}</p>
          <p className="text-[10px] text-[#AAB0D6]/30 mt-1.5">
            {new Date(r.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      ))}
      {sorted.length > 5 && (
        <p className="text-xs text-[#AAB0D6]/40 text-center pt-1">
          +{sorted.length - 5} more reflections
        </p>
      )}
    </div>
  );
}
