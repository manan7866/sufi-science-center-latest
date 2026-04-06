'use client';

import type { EthicalWeight } from '@/lib/sacred-professions-data';

const WEIGHT_CONFIG: Record<EthicalWeight, { segments: number; label: string; color: string }> = {
  Low:     { segments: 1, label: 'Low',     color: '#8BB89A' },
  Medium:  { segments: 2, label: 'Medium',  color: '#D4A07B' },
  High:    { segments: 3, label: 'High',    color: '#C8A75E' },
  Extreme: { segments: 4, label: 'Extreme', color: '#C97B84' },
};

export function EthicalWeightBar({ weight }: { weight: EthicalWeight }) {
  const cfg = WEIGHT_CONFIG[weight];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1 h-4 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: i <= cfg.segments ? cfg.color : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}
