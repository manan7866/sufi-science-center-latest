'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ArrowRight, Scale, Briefcase, BookOpen,
  BrainCircuit, HeartPulse, Leaf, Shield, Building2, Compass,
  Search, Grid3X3, Network, BarChart2, SlidersHorizontal, X,
  GitCompare, LayoutGrid,
} from 'lucide-react';
import {
  PROFESSION_GROUPS,
  getAllProfessions,
  POWER_TYPES,
  RISK_LEVELS,
  ETHICAL_TENSIONS,
  type Profession,
  type ProfessionGroup,
  type PowerType,
  type RiskLevel,
  type EthicalTension,
} from '@/lib/sacred-professions-data';
import { AnimatedStat } from '@/components/sacred-professions/animated-stat';
import { EthicalWeightBar } from '@/components/sacred-professions/ethical-weight-bar';
import { ProfessionDetailPanel } from '@/components/sacred-professions/profession-detail-panel';
import { RadialMap } from '@/components/sacred-professions/radial-map';
import { ComparePanel } from '@/components/sacred-professions/compare-panel';

const ICON_MAP: Record<string, React.ElementType> = {
  Scale, Briefcase, BookOpen, BrainCircuit,
  HeartPulse, Leaf, Shield, Building2,
};

type ViewMode = 'grid' | 'matrix' | 'radial' | 'compare';

const GROUP_COLORS = Object.fromEntries(
  PROFESSION_GROUPS.map(g => [g.id, g.color])
);

const POWER_TYPE_COLORS: Record<string, string> = {
  State: '#7BAFD4', Economic: '#C8A75E', Cultural: '#D4A07B',
  Spiritual: '#9B8DC4', Technical: '#8BB89A', Institutional: '#B8A97A',
};

function DomainCard({ group, selected, onClick }: {
  group: ProfessionGroup;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[group.iconName] || Grid3X3;
  return (
    <button
      onClick={onClick}
      className="relative w-full text-left p-4 rounded-2xl border transition-all duration-200 group overflow-hidden"
      style={{
        borderColor: selected ? `${group.color}50` : 'rgba(255,255,255,0.07)',
        backgroundColor: selected ? `${group.color}08` : 'transparent',
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${group.color}08 0%, transparent 70%)` }}
      />

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: `${group.color}12`, border: `1px solid ${group.color}25` }}
      >
        <Icon className="h-5 w-5" style={{ color: group.color }} />
      </div>

      <p
        className="text-[12px] font-bold leading-snug mb-1 transition-colors duration-200"
        style={{ color: selected ? group.color : '#F5F3EE' }}
      >
        {group.label}
      </p>
      <p className="text-[10px] text-[#AAB0D6]/45 leading-snug mb-3 line-clamp-2">
        {group.civilizationalDescriptor}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-[#AAB0D6]/30 uppercase tracking-wide">
          {group.professions.length} {group.professions.length === 1 ? 'role' : 'roles'}
        </span>
        <div
          className="h-1.5 w-6 rounded-full opacity-50"
          style={{ backgroundColor: group.color }}
        />
      </div>
    </button>
  );
}

function ProfessionPill({ profession, groupColor, onClick, selected, compareMode, onCompare, inCompare }: {
  profession: Profession;
  groupColor: string;
  onClick: () => void;
  selected: boolean;
  compareMode: boolean;
  onCompare: () => void;
  inCompare: boolean;
}) {
  return (
    <div
      className="group border rounded-xl transition-all duration-150 overflow-hidden"
      style={{ borderColor: selected ? `${groupColor}40` : 'rgba(255,255,255,0.06)' }}
    >
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        onClick={onClick}
        style={{ backgroundColor: selected ? `${groupColor}08` : 'transparent' }}
      >
        <div
          className="w-1.5 h-8 rounded-full flex-shrink-0 transition-all duration-200"
          style={{ backgroundColor: selected ? groupColor : `${groupColor}30` }}
        />
        <div className="flex-1 min-w-0">
          <p
            className="text-[12px] font-semibold leading-snug transition-colors"
            style={{ color: selected ? groupColor : '#F5F3EE' }}
          >
            {profession.title}
          </p>
          <p className="text-[10px] text-[#AAB0D6]/40 leading-snug mt-0.5 truncate">{profession.brief}</p>
        </div>
        <EthicalWeightBar weight={profession.ethicalWeight} />
      </button>

      {compareMode && (
        <button
          onClick={onCompare}
          className="w-full px-4 py-1.5 border-t border-white/5 flex items-center gap-1.5 transition-colors"
          style={{
            backgroundColor: inCompare ? `${groupColor}12` : 'transparent',
            borderTopColor: inCompare ? `${groupColor}20` : undefined,
          }}
        >
          <GitCompare className="h-3 w-3" style={{ color: inCompare ? groupColor : 'rgba(170,176,214,0.3)' }} />
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: inCompare ? groupColor : 'rgba(170,176,214,0.3)' }}>
            {inCompare ? 'Added to Compare' : 'Add to Compare'}
          </span>
        </button>
      )}
    </div>
  );
}

function MatrixRow({ group, allSelected, onSelect }: {
  group: ProfessionGroup;
  allSelected: Set<string>;
  onSelect: (p: Profession) => void;
}) {
  const Icon = ICON_MAP[group.iconName] || Grid3X3;
  return (
    <div className="border border-white/6 rounded-xl overflow-hidden">
      <div
        className="px-4 py-3 flex items-center gap-3 border-b border-white/5"
        style={{ backgroundColor: `${group.color}06` }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${group.color}15`, border: `1px solid ${group.color}25` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: group.color }} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: group.color }}>{group.label}</p>
        <span className="text-[9px] text-[#AAB0D6]/30 ml-auto">{group.professions.length} roles</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
        {group.professions.map(p => {
          const isSelected = allSelected.has(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="p-3 rounded-lg border text-left transition-all duration-150 group"
              style={{
                borderColor: isSelected ? `${group.color}40` : 'rgba(255,255,255,0.06)',
                backgroundColor: isSelected ? `${group.color}08` : 'rgba(255,255,255,0.01)',
              }}
            >
              <p
                className="text-[11px] font-semibold leading-snug mb-1.5 transition-colors"
                style={{ color: isSelected ? group.color : '#F5F3EE' }}
              >
                {p.title}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full border uppercase tracking-wide font-bold"
                  style={{ color: POWER_TYPE_COLORS[p.powerType], borderColor: `${POWER_TYPE_COLORS[p.powerType]}25`, backgroundColor: `${POWER_TYPE_COLORS[p.powerType]}08` }}
                >
                  {p.powerType}
                </span>
                <EthicalWeightBar weight={p.ethicalWeight} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SacredProfessionsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterPower, setFilterPower] = useState<PowerType[]>([]);
  const [filterRisk, setFilterRisk] = useState<RiskLevel[]>([]);
  const [filterTension, setFilterTension] = useState<EthicalTension[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  const allProfessions = useMemo(() => getAllProfessions(), []);
  const totalProfessions = allProfessions.length;

  const filteredProfessions = useMemo(() => {
    return allProfessions.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.brief.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterPower.length && !filterPower.includes(p.powerType)) return false;
      if (filterRisk.length && !filterRisk.includes(p.riskLevel)) return false;
      if (filterTension.length && !p.ethicalTensions.some(t => filterTension.includes(t))) return false;
      return true;
    });
  }, [allProfessions, search, filterPower, filterRisk, filterTension]);

  const filteredGroups = useMemo(() => {
    return PROFESSION_GROUPS.map(g => ({
      ...g,
      professions: g.professions.filter(p => filteredProfessions.some(fp => fp.id === p.id)),
    })).filter(g => g.professions.length > 0);
  }, [filteredProfessions]);

  const selectedGroup = useMemo(() =>
    selectedGroupId ? filteredGroups.find(g => g.id === selectedGroupId) || filteredGroups[0] : filteredGroups[0],
    [selectedGroupId, filteredGroups]
  );

  const selectedProfession = useMemo(() => {
    if (!selectedProfessionId) return selectedGroup?.professions[0] || null;
    return allProfessions.find(p => p.id === selectedProfessionId) || selectedGroup?.professions[0] || null;
  }, [selectedProfessionId, selectedGroup, allProfessions]);

  const handleSelectGroup = useCallback((id: string) => {
    setSelectedGroupId(id);
    setSelectedProfessionId(null);
  }, []);

  const handleSelectProfession = useCallback((p: Profession) => {
    setSelectedProfessionId(p.id);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }, []);

  const handleRadialSelect = useCallback((p: Profession, g: ProfessionGroup) => {
    setSelectedGroupId(g.id);
    setSelectedProfessionId(p.id);
    setViewMode('grid');
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length >= 3 ? [...prev.slice(1), id]
        : [...prev, id]
    );
  }, []);

  const toggleFilter = <T,>(arr: T[], setArr: (v: T[]) => void, item: T) => {
    setArr(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  };

  const activeFilterCount = filterPower.length + filterRisk.length + filterTension.length;
  const compareProfessions = useMemo(() =>
    compareList.map(id => allProfessions.find(p => p.id === id)!).filter(Boolean),
    [compareList, allProfessions]
  );

  const VIEW_MODES: { id: ViewMode; label: string; icon: React.ElementType }[] = [
    { id: 'grid',    label: 'Grid',    icon: LayoutGrid },
    { id: 'matrix',  label: 'Matrix',  icon: Grid3X3 },
    { id: 'radial',  label: 'Radial',  icon: Network },
    { id: 'compare', label: 'Compare', icon: GitCompare },
  ];

  return (
    <div className="min-h-screen bg-[#08091A]">

      {/* Sticky Nav Bar */}
      <div className="sticky top-0 z-30 border-b border-white/8 bg-[#08091A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/40 flex-shrink-0">
            <Link href="/applied-civilization" className="hover:text-[#AAB0D6] transition-colors">Applied Civilization</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#AAB0D6]/70">Sacred Professions</span>
          </div>

          <div className="flex items-center gap-1">
            {VIEW_MODES.map(vm => {
              const Icon = vm.icon;
              return (
                <button
                  key={vm.id}
                  onClick={() => setViewMode(vm.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                  style={{
                    color: viewMode === vm.id ? '#C8A75E' : 'rgba(170,176,214,0.4)',
                    backgroundColor: viewMode === vm.id ? 'rgba(200,167,94,0.1)' : 'transparent',
                    borderBottom: viewMode === vm.id ? '1px solid rgba(200,167,94,0.4)' : '1px solid transparent',
                  }}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{vm.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="pt-14 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-6">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-3">
                Sacred Professions<br />
                <span className="text-[#C8A75E]">Map</span>
              </h1>
              <p className="text-[14px] text-[#AAB0D6]/65 leading-relaxed max-w-xl">
                A civilizational ethics map. Every profession structured with five analytical layers:
                ethical foundation, psychological model, professional crisis, operational framework,
                and accountability boundaries.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-4 gap-6 flex-shrink-0 border border-white/6 rounded-2xl px-6 py-4 bg-white/[0.01]">
              <AnimatedStat target={totalProfessions} label="Sacred Roles" />
              <AnimatedStat target={PROFESSION_GROUPS.length} label="Domains" />
              <AnimatedStat target={5} label="Layers" />
              <AnimatedStat target="1" label="Framework" />
            </div>
          </div>

          {/* Layer Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { label: 'Ethical Foundation', color: '#C8A75E' },
              { label: 'Sufi Psychology', color: '#7BAFD4' },
              { label: 'Professional Crisis', color: '#D4A07B' },
              { label: 'Operational Framework', color: '#8BB89A' },
              { label: 'Accountability Boundaries', color: '#9B8DC4' },
            ].map(tag => (
              <span key={tag.label} className="px-3 py-1 rounded-full text-[9px] font-bold border uppercase tracking-wider"
                style={{ color: tag.color, borderColor: `${tag.color}25`, backgroundColor: `${tag.color}06` }}>
                {tag.label}
              </span>
            ))}
          </div>
        </section>

        {/* Filter + Search Bar */}
        <div className="border border-white/7 rounded-2xl bg-white/[0.012] mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#AAB0D6]/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search professions..."
                className="w-full bg-transparent border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F5F3EE] placeholder-[#AAB0D6]/30 focus:outline-none focus:border-[#C8A75E]/30"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-colors text-sm font-medium"
                style={{
                  borderColor: showFilters || activeFilterCount ? 'rgba(200,167,94,0.4)' : 'rgba(255,255,255,0.08)',
                  color: showFilters || activeFilterCount ? '#C8A75E' : 'rgba(170,176,214,0.6)',
                  backgroundColor: showFilters || activeFilterCount ? 'rgba(200,167,94,0.08)' : 'transparent',
                }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#C8A75E] text-[#08091A] text-[9px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {(activeFilterCount > 0 || search) && (
                <button
                  onClick={() => { setFilterPower([]); setFilterRisk([]); setFilterTension([]); setSearch(''); }}
                  className="px-3 py-2.5 rounded-xl border border-white/8 text-[#AAB0D6]/50 hover:text-[#AAB0D6] text-xs transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filter Panel */}
          {showFilters && (
            <div className="border-t border-white/6 px-4 pb-4 pt-3 space-y-3">
              <FilterRow
                label="Authority Type"
                options={POWER_TYPES}
                selected={filterPower}
                onToggle={v => toggleFilter(filterPower, setFilterPower, v)}
                getColor={v => POWER_TYPE_COLORS[v] || '#AAB0D6'}
              />
              <FilterRow
                label="Risk Level"
                options={RISK_LEVELS}
                selected={filterRisk}
                onToggle={v => toggleFilter(filterRisk, setFilterRisk, v)}
                getColor={() => '#AAB0D6'}
              />
              <FilterRow
                label="Ethical Tension"
                options={ETHICAL_TENSIONS}
                selected={filterTension}
                onToggle={v => toggleFilter(filterTension, setFilterTension, v)}
                getColor={() => '#C8A75E'}
              />
            </div>
          )}
        </div>

        {/* Filter result count */}
        {(search || activeFilterCount > 0) && (
          <p className="text-[11px] text-[#AAB0D6]/40 mb-4">
            {filteredProfessions.length} of {totalProfessions} professions match
          </p>
        )}

        {/* VIEW: GRID — Domain Cards + Split Panel */}
        {viewMode === 'grid' && (
          <section className="mb-16">
            {/* Domain card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {filteredGroups.map(group => (
                <DomainCard
                  key={group.id}
                  group={group}
                  selected={selectedGroup?.id === group.id}
                  onClick={() => handleSelectGroup(group.id)}
                />
              ))}
            </div>

            {/* Split Panel */}
            {selectedGroup && (
              <div
                ref={detailRef}
                className="border border-white/8 rounded-2xl overflow-hidden"
                style={{ borderColor: `${selectedGroup.color}20` }}
              >
                <div
                  className="px-5 py-3 border-b border-white/6 flex items-center gap-3"
                  style={{ backgroundColor: `${selectedGroup.color}06` }}
                >
                  {(() => { const Icon = ICON_MAP[selectedGroup.iconName] || Grid3X3; return <Icon className="h-4 w-4" style={{ color: selectedGroup.color }} />; })()}
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: selectedGroup.color }}>
                    {selectedGroup.label}
                  </p>
                  <p className="text-[11px] text-[#AAB0D6]/40 hidden sm:block">— {selectedGroup.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[400px]">
                  {/* Left: profession list */}
                  <div className="border-b lg:border-b-0 lg:border-r border-white/6 p-3 space-y-2">
                    {selectedGroup.professions.map(p => (
                      <ProfessionPill
                        key={p.id}
                        profession={p}
                        groupColor={selectedGroup.color}
                        onClick={() => handleSelectProfession(p)}
                        selected={selectedProfession?.id === p.id}
                        compareMode={viewMode === 'grid' && compareList.length >= 0}
                        onCompare={() => toggleCompare(p.id)}
                        inCompare={compareList.includes(p.id)}
                      />
                    ))}
                  </div>

                  {/* Right: detail */}
                  <div className="overflow-y-auto max-h-[600px]">
                    {selectedProfession && (
                      <ProfessionDetailPanel
                        profession={selectedProfession}
                        groupColor={selectedGroup.color}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW: MATRIX */}
        {viewMode === 'matrix' && (
          <section className="mb-16 space-y-4">
            {filteredGroups.map(group => (
              <MatrixRow
                key={group.id}
                group={group}
                allSelected={new Set([selectedProfessionId || ''])}
                onSelect={p => { handleSelectGroup(p.groupId); handleSelectProfession(p); setViewMode('grid'); }}
              />
            ))}
          </section>
        )}

        {/* VIEW: RADIAL MAP */}
        {viewMode === 'radial' && (
          <section className="mb-16">
            <div className="border border-white/7 rounded-2xl bg-white/[0.01] p-4 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-[#C8A75E]/40" />
                <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Civilizational Map</p>
              </div>
              <RadialMap
                groups={filteredGroups.length ? filteredGroups : PROFESSION_GROUPS}
                onSelect={handleRadialSelect}
              />
            </div>
          </section>
        )}

        {/* VIEW: COMPARE */}
        {viewMode === 'compare' && (
          <section className="mb-16">
            <div className="border border-white/7 rounded-2xl bg-white/[0.01] p-5 mb-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-[#C8A75E]/40" />
                  <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">
                    Comparison Mode — {compareList.length}/3 selected
                  </p>
                </div>
                {compareList.length > 0 && (
                  <button onClick={() => setCompareList([])} className="text-[11px] text-[#AAB0D6]/40 hover:text-[#AAB0D6] transition-colors flex items-center gap-1">
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
              <ComparePanel
                professions={compareProfessions}
                groupColors={GROUP_COLORS}
                onRemove={id => setCompareList(prev => prev.filter(x => x !== id))}
              />
            </div>

            {/* Selector grid */}
            <div className="space-y-4">
              <p className="text-[11px] text-[#AAB0D6]/40">Select professions to compare from the map below:</p>
              {PROFESSION_GROUPS.map(group => {
                const Icon = ICON_MAP[group.iconName] || Grid3X3;
                return (
                  <div key={group.id} className="border border-white/6 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/5" style={{ backgroundColor: `${group.color}05` }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: group.color }} />
                      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: group.color }}>{group.label}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
                      {group.professions.map(p => {
                        const inList = compareList.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            onClick={() => toggleCompare(p.id)}
                            disabled={!inList && compareList.length >= 3}
                            className="p-3 rounded-lg border text-left transition-all text-[11px] font-medium"
                            style={{
                              borderColor: inList ? `${group.color}40` : 'rgba(255,255,255,0.06)',
                              backgroundColor: inList ? `${group.color}10` : 'rgba(255,255,255,0.01)',
                              color: inList ? group.color : 'rgba(240,240,240,0.7)',
                              opacity: !inList && compareList.length >= 3 ? 0.4 : 1,
                            }}
                          >
                            {p.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Nav */}
        <div className="border-t border-white/6 pt-8 pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/applied-civilization"
            className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            Applied Civilization
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/applied-civilization/professional-ethics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
            >
              Ethics Framework <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/applied-civilization/alignment-assessment"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-[#AAB0D6] text-xs hover:border-white/20 transition-colors"
            >
              Alignment Assessment
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function FilterRow<T extends string>({
  label, options, selected, onToggle, getColor,
}: {
  label: string;
  options: readonly T[];
  selected: T[];
  onToggle: (v: T) => void;
  getColor: (v: T) => string;
}) {
  return (
    <div className="flex items-start gap-3">
      <p className="text-[10px] font-bold text-[#AAB0D6]/40 uppercase tracking-widest w-28 flex-shrink-0 pt-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => {
          const active = selected.includes(opt);
          const color = getColor(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors"
              style={{
                borderColor: active ? `${color}40` : 'rgba(255,255,255,0.08)',
                color: active ? color : 'rgba(170,176,214,0.5)',
                backgroundColor: active ? `${color}10` : 'transparent',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
