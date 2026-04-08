'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Filter, BookOpen, X } from 'lucide-react';
import {
  INTELLECTUAL_ERAS,
  ALL_INTELLECTUAL_REGIONS,
  ALL_INTELLECTUAL_FIELDS,
  ALL_IMPACT_LEVELS,
  IntellectualEntry,
  IntellectualEra,
  HeritageRegion,
  HeritageField,
  ImpactLevel,
} from '@/lib/heritage-data';
import { ObservatoryHero } from '@/components/observatory-hero'

const IMPACT_COLORS: Record<ImpactLevel, string> = {
  Foundational: '#C8A75E',
  Significant: '#7BAFD4',
  Formative: '#8BB89A',
};

function EntryCard({ entry }: { entry: IntellectualEntry }) {
  const [expanded, setExpanded] = useState(false);
  const impactColor = IMPACT_COLORS[entry.impactLevel];

  return (
    <div className="border border-white/6 rounded-xl bg-white/[0.015] hover:border-white/12 transition-all duration-200">
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-snug">
              {entry.name}
            </h3>
            {entry.knownAs && (
              <span className="text-[11px] text-[#AAB0D6]/50 italic">({entry.knownAs})</span>
            )}
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ color: impactColor, backgroundColor: `${impactColor}15`, border: `1px solid ${impactColor}25` }}
            >
              {entry.impactLevel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#AAB0D6]/50">
            <span>{entry.century}</span>
            <span className="text-[#AAB0D6]/25">·</span>
            <span>{entry.region}</span>
            <span className="text-[#AAB0D6]/25">·</span>
            <span>{entry.field.slice(0, 3).join(', ')}{entry.field.length > 3 ? '…' : ''}</span>
          </div>
          {!expanded && (
            <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed mt-2 line-clamp-2">
              {entry.summary}
            </p>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#AAB0D6]/30 flex-shrink-0 mt-0.5 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#C8A75E]' : 'group-hover:text-[#AAB0D6]'}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/6 pt-4">
          <p className="text-[13px] text-[#D8D4CC] leading-relaxed">{entry.summary}</p>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Key Contributions
            </p>
            <ul className="space-y-1.5">
              {entry.contributions.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C8A75E] text-[8px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#D8D4CC] leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Institutional Legacy
            </p>
            <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{entry.institutionalLegacy}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {entry.field.map((f) => (
              <span
                key={f}
                className="px-2.5 py-1 rounded-full border border-[#AAB0D6]/15 bg-[#AAB0D6]/5 text-[11px] text-[#AAB0D6]/70"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EraSection({
  era,
  activeFilters,
}: {
  era: IntellectualEra;
  activeFilters: { region: HeritageRegion | null; field: HeritageField | null; impact: ImpactLevel | null };
}) {
  const [collapsed, setCollapsed] = useState(false);

  const filteredEntries = useMemo(() => {
    return era.entries.filter((entry) => {
      if (activeFilters.region && entry.region !== activeFilters.region) return false;
      if (activeFilters.field && !entry.field.includes(activeFilters.field)) return false;
      if (activeFilters.impact && entry.impactLevel !== activeFilters.impact) return false;
      return true;
    });
  }, [era.entries, activeFilters]);

  if (filteredEntries.length === 0) return null;

  return (
    <div className="space-y-4">
      <button
        className="w-full flex items-center justify-between gap-3 group py-1"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-start gap-3">
          <div className="text-left">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-base font-bold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors">
                {era.label}
              </h2>
              <span className="text-[11px] text-[#AAB0D6]/50">{era.range}</span>
              <span className="text-[11px] text-[#AAB0D6]/30">{filteredEntries.length} entries</span>
            </div>
            <p className="text-[12px] text-[#AAB0D6]/50 leading-snug mt-0.5 max-w-2xl hidden sm:block">
              {era.description}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#AAB0D6]/30 flex-shrink-0 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
        />
      </button>

      {!collapsed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function IntellectualHeritagePage() {
  const [regionFilter, setRegionFilter] = useState<HeritageRegion | null>(null);
  const [fieldFilter, setFieldFilter] = useState<HeritageField | null>(null);
  const [impactFilter, setImpactFilter] = useState<ImpactLevel | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const totalEntries = INTELLECTUAL_ERAS.reduce((sum, e) => sum + e.entries.length, 0);
  const activeFilters = { region: regionFilter, field: fieldFilter, impact: impactFilter };
  const hasActiveFilter = !!regionFilter || !!fieldFilter || !!impactFilter;

  const visibleCount = useMemo(() => {
    return INTELLECTUAL_ERAS.flatMap((e) => e.entries).filter((entry) => {
      if (regionFilter && entry.region !== regionFilter) return false;
      if (fieldFilter && !entry.field.includes(fieldFilter)) return false;
      if (impactFilter && entry.impactLevel !== impactFilter) return false;
      return true;
    }).length;
  }, [regionFilter, fieldFilter, impactFilter]);

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto mt-6  text-xs text-[#AAB0D6]/50">
          <Link href="/foundations" className="hover:text-[#AAB0D6] transition-colors">
            Foundational Studies
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/80">Intellectual Heritage</span>
        </div>

        {/* Hero */}

        <ObservatoryHero
        subtitle='Archive Documented Figures'
        title='Intellectual Heritage'
        subDescription='Scientific, Institutional, and Knowledge Contributions — 7th to 21st Century'
        description='A structured archive of thinkers, scientists, and scholars whose work shaped the intellectual
            foundations of Islamic civilization and contributed to global knowledge systems. Organized
            chronologically with cross-referential filters for region, field, and impact level.'
        />
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-8 lg:px-12">

        {/* <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-6">
            <BookOpen className="h-3 w-3 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">
              Archive — {totalEntries} Documented Figures
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Intellectual Heritage
          </h1>
          <p className="text-lg text-[#AAB0D6] mb-4">
            Scientific, Institutional, and Knowledge Contributions — 7th to 21st Century
          </p>
          <p className="text-[15px] text-[#AAB0D6]/70 leading-relaxed max-w-3xl">
            A structured archive of thinkers, scientists, and scholars whose work shaped the intellectual
            foundations of Islamic civilization and contributed to global knowledge systems. Organized
            chronologically with cross-referential filters for region, field, and impact level.
          </p>
        </div> */}

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                  showFilters || hasActiveFilter
                    ? 'bg-[#C8A75E]/10 border-[#C8A75E]/30 text-[#C8A75E]'
                    : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
                {hasActiveFilter && (
                  <span className="bg-[#C8A75E] text-[#08091A] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {[regionFilter, fieldFilter, impactFilter].filter(Boolean).length}
                  </span>
                )}
              </button>
              {hasActiveFilter && (
                <button
                  onClick={() => { setRegionFilter(null); setFieldFilter(null); setImpactFilter(null); }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#AAB0D6]/50 hover:text-[#AAB0D6] transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </button>
              )}
            </div>
            <span className="text-xs text-[#AAB0D6]/40">
              {visibleCount} of {totalEntries} entries
            </span>
          </div>

          {showFilters && (
            <div className="bg-[#0F1430]/60 border border-white/6 rounded-xl p-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
                  Region
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_INTELLECTUAL_REGIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegionFilter(regionFilter === r ? null : r)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        regionFilter === r
                          ? 'bg-[#C8A75E]/15 border-[#C8A75E]/40 text-[#C8A75E]'
                          : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
                  Field
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_INTELLECTUAL_FIELDS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFieldFilter(fieldFilter === f ? null : f)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        fieldFilter === f
                          ? 'bg-[#C8A75E]/15 border-[#C8A75E]/40 text-[#C8A75E]'
                          : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
                  Impact Level
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_IMPACT_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setImpactFilter(impactFilter === level ? null : level)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        impactFilter === level
                          ? 'bg-[#C8A75E]/15 border-[#C8A75E]/40 text-[#C8A75E]'
                          : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                      }`}
                      style={impactFilter === level ? { color: IMPACT_COLORS[level], borderColor: `${IMPACT_COLORS[level]}50`, backgroundColor: `${IMPACT_COLORS[level]}15` } : {}}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chronological Sections */}
        <div className="space-y-12">
          {INTELLECTUAL_ERAS.map((era) => (
            <EraSection key={era.id} era={era} activeFilters={activeFilters} />
          ))}
        </div>

        {/* Footer Nav */}
        <div className="mt-16 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/foundations"
            className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            Back to Foundational Studies
          </Link>
          <Link
            href="/foundations/spiritual-heritage"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Spiritual Heritage
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
