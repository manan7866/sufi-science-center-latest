'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Filter, GitBranch, X } from 'lucide-react';
import {
  SPIRITUAL_ERAS,
  ALL_SUFI_ORDERS,
  ALL_SUFI_ROLES,
  ALL_INTELLECTUAL_REGIONS,
  SpiritualEntry,
  SpiritualEra,
  HeritageRegion,
  SufiOrder,
  SufiRole,
} from '@/lib/heritage-data';

const ORDER_COLORS: Partial<Record<SufiOrder, string>> = {
  Qadiriyya: '#C8A75E',
  Naqshbandiyya: '#7BAFD4',
  Chishtiyya: '#8BB89A',
  Shadhiliyya: '#D4A07B',
  Mevleviyya: '#A09BD4',
  Tijaniyya: '#D4A07B',
  Multiple: '#AAB0D6',
};

const ROLE_LABELS: Record<SufiRole, string> = {
  Shaykh: 'Shaykh',
  Scholar: 'Scholar',
  Poet: 'Poet',
  Reformer: 'Reformer',
  Jurist: 'Jurist',
  Philosopher: 'Philosopher',
};

function EntryCard({ entry }: { entry: SpiritualEntry }) {
  const [expanded, setExpanded] = useState(false);
  const orderColor = ORDER_COLORS[entry.order] ?? '#AAB0D6';

  return (
    <div className="border border-white/6 rounded-xl bg-white/[0.015] hover:border-white/12 transition-all duration-200">
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-snug">
              {entry.name}
            </h3>
            {entry.title && (
              <span className="text-[11px] text-[#AAB0D6]/50 italic">{entry.title}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ color: orderColor, backgroundColor: `${orderColor}15`, border: `1px solid ${orderColor}25` }}
            >
              {entry.order}
            </span>
            {entry.roles.map((role) => (
              <span
                key={role}
                className="inline-block px-2 py-0.5 rounded-full text-[10px] text-[#AAB0D6]/60 bg-[#AAB0D6]/8 border border-[#AAB0D6]/12"
              >
                {ROLE_LABELS[role]}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#AAB0D6]/50 mb-2">
            <span>{entry.century}</span>
            <span className="text-[#AAB0D6]/25">·</span>
            <span>{entry.region}</span>
          </div>
          {!expanded && (
            <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed line-clamp-2">
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
              Methodology
            </p>
            <p className="text-[12px] text-[#D8D4CC] leading-relaxed">{entry.methodology}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Transmission Contribution
            </p>
            <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{entry.transmissionContribution}</p>
          </div>

          {entry.keyWorks && entry.keyWorks.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
                Key Works
              </p>
              <ul className="space-y-1">
                {entry.keyWorks.map((work, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C8A75E] text-[8px] mt-1.5 flex-shrink-0">&#9632;</span>
                    <span className="text-[12px] text-[#D8D4CC] italic">{work}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EraSection({
  era,
  activeFilters,
}: {
  era: SpiritualEra;
  activeFilters: { region: HeritageRegion | null; order: SufiOrder | null; role: SufiRole | null };
}) {
  const [collapsed, setCollapsed] = useState(false);

  const filteredEntries = useMemo(() => {
    return era.entries.filter((entry) => {
      if (activeFilters.region && entry.region !== activeFilters.region) return false;
      if (activeFilters.order && entry.order !== activeFilters.order) return false;
      if (activeFilters.role && !entry.roles.includes(activeFilters.role)) return false;
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

export default function SpiritualHeritagePage() {
  const [regionFilter, setRegionFilter] = useState<HeritageRegion | null>(null);
  const [orderFilter, setOrderFilter] = useState<SufiOrder | null>(null);
  const [roleFilter, setRoleFilter] = useState<SufiRole | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const totalEntries = SPIRITUAL_ERAS.reduce((sum, e) => sum + e.entries.length, 0);
  const activeFilters = { region: regionFilter, order: orderFilter, role: roleFilter };
  const hasActiveFilter = !!regionFilter || !!orderFilter || !!roleFilter;

  const visibleCount = useMemo(() => {
    return SPIRITUAL_ERAS.flatMap((e) => e.entries).filter((entry) => {
      if (regionFilter && entry.region !== regionFilter) return false;
      if (orderFilter && entry.order !== orderFilter) return false;
      if (roleFilter && !entry.roles.includes(roleFilter)) return false;
      return true;
    }).length;
  }, [regionFilter, orderFilter, roleFilter]);

  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs text-[#AAB0D6]/50">
          <Link href="/foundations" className="hover:text-[#AAB0D6] transition-colors">
            Foundational Studies
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/80">Spiritual Heritage</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-6">
            <GitBranch className="h-3 w-3 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">
              Archive — {totalEntries} Documented Figures
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Spiritual Heritage
          </h1>
          <p className="text-lg text-[#AAB0D6] mb-4">
            Lineages, Orders, and Inner Knowledge Systems
          </p>
          <p className="text-[15px] text-[#AAB0D6]/70 leading-relaxed max-w-3xl">
            Tasawwuf (Sufism) is the systematic discipline of inner development within the Islamic tradition.
            This archive documents its principal transmitters — the shuyukh, scholars, poets, and reformers
            who shaped the methodological, doctrinal, and institutional forms of this discipline across fourteen centuries.
            Entries are organized chronologically with filters for order, region, and role.
          </p>
        </div>

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
                    {[regionFilter, orderFilter, roleFilter].filter(Boolean).length}
                  </span>
                )}
              </button>
              {hasActiveFilter && (
                <button
                  onClick={() => { setRegionFilter(null); setOrderFilter(null); setRoleFilter(null); }}
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
                  Order
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_SUFI_ORDERS.map((o) => {
                    const color = ORDER_COLORS[o] ?? '#AAB0D6';
                    return (
                      <button
                        key={o}
                        onClick={() => setOrderFilter(orderFilter === o ? null : o)}
                        className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                          orderFilter === o
                            ? ''
                            : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                        }`}
                        style={orderFilter === o ? { color, borderColor: `${color}50`, backgroundColor: `${color}15` } : {}}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
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
                  Role
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_SUFI_ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(roleFilter === role ? null : role)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        roleFilter === role
                          ? 'bg-[#C8A75E]/15 border-[#C8A75E]/40 text-[#C8A75E]'
                          : 'border-white/10 text-[#AAB0D6]/60 hover:border-white/20 hover:text-[#AAB0D6]'
                      }`}
                    >
                      {ROLE_LABELS[role]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Era Sections */}
        <div className="space-y-12">
          {SPIRITUAL_ERAS.map((era) => (
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
            href="/foundations/intellectual-heritage"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Intellectual Heritage
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
