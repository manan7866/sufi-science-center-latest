'use client';

import Link from 'next/link';

interface SurahProgressTrackerProps {
  viewedNumbers: number[];
}

const TOTAL = 114;

export function SurahProgressTracker({ viewedNumbers }: SurahProgressTrackerProps) {
  const viewedSet = new Set(viewedNumbers);
  const percentage = Math.round((viewedNumbers.length / TOTAL) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-serif font-bold text-[#C8A75E]">
            {viewedNumbers.length}
            <span className="text-base font-normal text-[#AAB0D6] ml-1">of {TOTAL} Surahs explored</span>
          </p>
          <p className="text-xs text-[#AAB0D6]/50 mt-0.5">
            {TOTAL - viewedNumbers.length} remaining in the complete library
          </p>
        </div>
        <span className="text-sm font-semibold text-[#C8A75E]">{percentage}%</span>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C8A75E]/70 to-[#C8A75E] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18px,1fr))] gap-0.5">
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
          const viewed = viewedSet.has(n);
          return (
            <Link
              key={n}
              href={`/interfaith-coherence/scripture-commentary/surah/${n}`}
              title={`Surah ${n}`}
            >
              <div
                className={`h-[18px] rounded-sm transition-all ${
                  viewed
                    ? 'bg-[#C8A75E]'
                    : 'bg-white/5 hover:bg-white/15'
                }`}
              />
            </Link>
          );
        })}
      </div>

      <p className="text-[10px] text-[#AAB0D6]/30">
        Each cell represents one Surah. Gold = explored. Click any cell to open commentary.
      </p>
    </div>
  );
}
