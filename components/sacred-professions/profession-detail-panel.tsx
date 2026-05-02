'use client';

import { useState } from 'react';
import {
  ChevronDown, Scale, Layers, AlertTriangle, CheckCircle2, Shield, X,
} from 'lucide-react';
import type { Profession } from '@/lib/sacred-professions-data';
import { EthicalWeightBar } from './ethical-weight-bar';

const SECTION_CONFIG = [
  { key: 'ethical',      label: 'Ethical Foundation',       icon: Scale,        color: '#C8A75E' },
  { key: 'psychology',   label: 'Sufi Psychological Model', icon: Layers,       color: '#7BAFD4' },
  { key: 'crisis',       label: 'Professional Crisis',      icon: AlertTriangle, color: '#D4A07B' },
  { key: 'operational',  label: 'Operational Framework',    icon: CheckCircle2,  color: '#8BB89A' },
  { key: 'boundaries',   label: 'Accountability Boundaries',icon: Shield,        color: '#9B8DC4' },
] as const;

type SectionKey = typeof SECTION_CONFIG[number]['key'];

function MiniSection({ sectionKey, profession, groupColor }: {
  sectionKey: SectionKey;
  profession: Profession;
  groupColor: string;
}) {
  const [open, setOpen] = useState(false);
  const cfg = SECTION_CONFIG.find(s => s.key === sectionKey)!;
  const Icon = cfg.icon;

  const items = sectionKey === 'ethical' ? profession.ethicalFoundation
    : sectionKey === 'crisis' ? profession.professionalCrisis
    : sectionKey === 'operational' ? profession.operationalFramework
    : sectionKey === 'boundaries' ? profession.accountabilityBoundaries
    : null;

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? `${cfg.color}30` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left group"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${cfg.color}12`, border: `1px solid ${cfg.color}20` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
        </div>
        <span
          className="text-[11px] font-bold uppercase tracking-wider flex-1 text-left transition-colors"
          style={{ color: open ? cfg.color : '#AAB0D6' }}
        >
          {cfg.label}
        </span>
        <div className="h-px flex-1 mx-2" style={{ backgroundColor: `${cfg.color}12` }} />
        <ChevronDown
          className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
          style={{ color: open ? cfg.color : 'rgba(170,176,214,0.3)', transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {open && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: `${cfg.color}12`, backgroundColor: `${cfg.color}03` }}>
          {sectionKey === 'psychology' ? (
            <div className="space-y-3">
              {profession.sufiPsychology.map((item, i) => (
                <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${cfg.color}30` }}>
                  <p className="text-[11px] font-semibold" style={{ color: `${cfg.color}CC` }}>{item.concept}</p>
                  <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed mt-0.5">{item.manifestation}</p>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {(items as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[7px] mt-1.5 flex-shrink-0" style={{ color: cfg.color }}>&#9632;</span>
                  <span className="text-[11px] text-[#AAB0D6]/65 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  profession: Profession;
  groupColor: string;
  onClose?: () => void;
}

export function ProfessionDetailPanel({ profession, groupColor, onClose }: Props) {
  const powerTypeColors: Record<string, string> = {
    State: '#7BAFD4', Economic: '#C8A75E', Cultural: '#D4A07B',
    Spiritual: '#9B8DC4', Technical: '#8BB89A', Institutional: '#B8A97A',
  };
  const powerColor = powerTypeColors[profession.powerType] || groupColor;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-white/8 flex-shrink-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] leading-snug">{profession.title}</h3>
            <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed mt-1 italic">{profession.sacredThesis}</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-[#AAB0D6]/30 hover:text-[#AAB0D6] transition-colors flex-shrink-0 mt-0.5">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="text-[9px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wide"
            style={{ color: powerColor, borderColor: `${powerColor}30`, backgroundColor: `${powerColor}08` }}
          >
            {profession.powerType}
          </span>
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-md border border-white/10 text-[#AAB0D6]/60 uppercase tracking-wide">
            {profession.riskLevel}
          </span>
          {profession.ethicalTensions.map(t => (
            <span key={t} className="text-[9px] px-2.5 py-1 rounded-md border border-[#C8A75E]/15 text-[#C8A75E]/60 uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <EthicalWeightBar weight={profession.ethicalWeight} />
      </div>

      {/* Brief */}
      <div className="px-5 py-4 border-b border-white/5 flex-shrink-0">
        <p className="text-[13px] text-[#D8D4CC]/80 leading-relaxed">{profession.brief}</p>
      </div>

      {/* Five Sections */}
      <div className="p-4 space-y-2 flex-1">
        {SECTION_CONFIG.map(s => (
          <MiniSection key={s.key} sectionKey={s.key} profession={profession} groupColor={groupColor} />
        ))}
      </div>
    </div>
  );
}
