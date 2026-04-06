'use client';

import { X } from 'lucide-react';
import type { Profession } from '@/lib/sacred-professions-data';
import { EthicalWeightBar } from './ethical-weight-bar';

interface Props {
  professions: Profession[];
  groupColors: Record<string, string>;
  onRemove: (id: string) => void;
}

export function ComparePanel({ professions, groupColors, onRemove }: Props) {
  if (professions.length === 0) {
    return (
      <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center">
        <p className="text-[13px] text-[#AAB0D6]/40 mb-1">Select up to 3 professions to compare</p>
        <p className="text-[11px] text-[#AAB0D6]/25">Click &ldquo;Compare&rdquo; on any profession card to add it here</p>
      </div>
    );
  }

  const rows: { label: string; getValue: (p: Profession) => React.ReactNode }[] = [
    {
      label: 'Sacred Thesis',
      getValue: (p) => <p className="text-[11px] text-[#D8D4CC]/70 leading-relaxed italic">{p.sacredThesis}</p>,
    },
    {
      label: 'Authority Type',
      getValue: (p) => {
        const colors: Record<string, string> = { State: '#7BAFD4', Economic: '#C8A75E', Cultural: '#D4A07B', Spiritual: '#9B8DC4', Technical: '#8BB89A', Institutional: '#B8A97A' };
        const c = colors[p.powerType] || '#AAB0D6';
        return (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide" style={{ color: c, borderColor: `${c}30`, backgroundColor: `${c}08` }}>
            {p.powerType}
          </span>
        );
      },
    },
    {
      label: 'Risk Level',
      getValue: (p) => (
        <span className="text-[10px] border border-white/10 px-2.5 py-1 rounded-full text-[#AAB0D6]/60 uppercase tracking-wide">
          {p.riskLevel}
        </span>
      ),
    },
    {
      label: 'Ethical Weight',
      getValue: (p) => <EthicalWeightBar weight={p.ethicalWeight} />,
    },
    {
      label: 'Core Risk',
      getValue: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.ethicalTensions.map(t => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded border border-[#C8A75E]/15 text-[#C8A75E]/60 uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: 'Crisis Pattern',
      getValue: (p) => (
        <ul className="space-y-1.5">
          {p.professionalCrisis.slice(0, 2).map((c, i) => (
            <li key={i} className="text-[11px] text-[#AAB0D6]/55 leading-relaxed flex items-start gap-1.5">
              <span className="text-[8px] text-[#D4A07B]/50 mt-1 flex-shrink-0">&#9632;</span>
              {c}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Accountability Boundary',
      getValue: (p) => (
        <p className="text-[11px] text-[#AAB0D6]/55 leading-relaxed italic">
          {p.accountabilityBoundaries[0]}
        </p>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Header */}
        <div className="grid gap-3 mb-1" style={{ gridTemplateColumns: `140px repeat(${professions.length}, 1fr)` }}>
          <div />
          {professions.map(p => {
            const color = groupColors[p.groupId] || '#C8A75E';
            return (
              <div key={p.id} className="relative">
                <div
                  className="rounded-xl border p-3 flex items-start justify-between gap-2"
                  style={{ borderColor: `${color}25`, backgroundColor: `${color}05` }}
                >
                  <div>
                    <p className="text-[12px] font-bold" style={{ color }}>{p.title}</p>
                    <p className="text-[10px] text-[#AAB0D6]/40 mt-0.5">{p.groupId.replace(/-/g, ' ')}</p>
                  </div>
                  <button
                    onClick={() => onRemove(p.id)}
                    className="text-[#AAB0D6]/30 hover:text-[#AAB0D6] transition-colors flex-shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rows */}
        {rows.map((row, ri) => (
          <div
            key={row.label}
            className="grid gap-3 border-t border-white/5 py-4"
            style={{ gridTemplateColumns: `140px repeat(${professions.length}, 1fr)` }}
          >
            <div className="flex items-start">
              <p className="text-[10px] font-bold text-[#AAB0D6]/40 uppercase tracking-widest leading-snug pt-0.5">
                {row.label}
              </p>
            </div>
            {professions.map(p => (
              <div key={p.id} className="flex items-start">
                {row.getValue(p)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
