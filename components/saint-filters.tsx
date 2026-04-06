'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter, GitBranch, Globe, Clock, Sparkles } from 'lucide-react';
import { Lineage } from '@/lib/database.types';

interface LineageWithHierarchy extends Lineage {
  level?: number;
  display_order?: number;
}

interface Theme {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

interface HistoricalPeriod {
  id: string;
  name: string;
  slug: string;
  start_year?: number;
  end_year?: number;
}

interface RegionWithHierarchy {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_region_id?: string | null;
  display_order?: number;
}

interface SaintFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLineage: string | null;
  onLineageChange: (lineageId: string | null) => void;
  selectedRegion: string | null;
  onRegionChange: (regionId: string | null) => void;
  selectedEra: string | null;
  onEraChange: (eraId: string | null) => void;
  selectedTheme: string | null;
  onThemeChange: (themeId: string | null) => void;
  lineages: LineageWithHierarchy[];
  allLineages?: LineageWithHierarchy[];
  regions: RegionWithHierarchy[];
  allRegions?: RegionWithHierarchy[];
  eras: HistoricalPeriod[];
  themes: Theme[];
  allThemes?: Theme[];
  activeFiltersCount: number;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

const THEME_CLUSTERS = [
  { label: 'Core Metaphysical Themes', range: [100, 199] },
  { label: 'Spiritual Psychology & Inner Science', range: [200, 299] },
  { label: 'Devotional & Ritual Life', range: [300, 399] },
  { label: 'Transmission & Authority', range: [400, 499] },
  { label: 'Intellectual & Theological Engagement', range: [500, 599] },
  { label: 'Social & Civilizational Dimensions', range: [600, 699] },
];

const LINEAGE_GROUPS = [
  { label: 'Formative Period', slugs: ['formative-sufi-era'] },
  {
    label: 'Major Classical Orders',
    slugs: [
      'qadiriyya', 'naqshbandiyya', 'chishtiyya', 'shadhiliyya',
      'suhrawardiyya', 'rifaiyya', 'kubrawiyya', 'mevleviyya',
      'yasawiyya', 'bektashiyya', 'tijaniyya', 'sanusiyya',
    ],
  },
  {
    label: 'Sub-Branches',
    slugs: ['mujaddidiyya', 'khalidiyya', 'nizamiyya', 'sabiriyya', 'rishi-order-kashmiriyya'],
  },
];

const REGION_GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: 'Early Islamic World',
    slugs: ['early-islamic-world', 'hijaz', 'basra', 'kufa', 'baghdad-eiw'],
  },
  {
    label: 'Persia & Greater Iran',
    slugs: ['persia-iran', 'nishapur', 'herat', 'isfahan', 'shiraz'],
  },
  {
    label: 'Central Asia',
    slugs: ['central-asia', 'bukhara', 'samarkand', 'khwarazm'],
  },
  {
    label: 'South Asia',
    slugs: ['south-asia', 'ajmer', 'delhi', 'lahore', 'multan', 'kashmir'],
  },
  {
    label: 'Anatolia',
    slugs: ['anatolia', 'konya', 'bursa'],
  },
  {
    label: 'North Africa',
    slugs: ['north-africa', 'fez', 'tunisia', 'cairo'],
  },
  {
    label: 'Al-Andalus',
    slugs: ['al-andalus', 'cordoba', 'seville'],
  },
  {
    label: 'Ottoman World',
    slugs: ['ottoman-world', 'istanbul', 'edirne'],
  },
  {
    label: 'Arabian Peninsula',
    slugs: ['arabian-peninsula'],
  },
  {
    label: 'Other Regions',
    slugs: [
      'levant', 'sub-saharan-africa', 'balkans',
      'caucasus', 'southeast-asia', 'china', 'global-diaspora',
    ],
  },
];

export function SaintFilters({
  searchQuery,
  onSearchChange,
  selectedLineage,
  onLineageChange,
  selectedRegion,
  onRegionChange,
  selectedEra,
  onEraChange,
  selectedTheme,
  onThemeChange,
  lineages,
  allLineages,
  regions,
  allRegions,
  eras,
  themes,
  allThemes,
  activeFiltersCount,
  onClearFilters,
  filteredCount,
  totalCount,
}: SaintFiltersProps) {
  const lineageMap = new Map((allLineages || lineages).map((l) => [l.slug, l]));
  const regionMap = new Map((allRegions || regions).map((r) => [r.slug, r]));
  const themeMap = new Map((allThemes || themes).map((t) => [t.slug, t]));
  const availableLineageIds = new Set(lineages.map((l) => l.id));
  const availableRegionIds = new Set(regions.map((r) => r.id));
  const availableThemeIds = new Set(themes.map((t) => t.id));

  const selectedLineageName = selectedLineage
    ? (allLineages || lineages).find((l) => l.id === selectedLineage)?.name
    : null;
  const selectedRegionName = selectedRegion
    ? (allRegions || regions).find((r) => r.id === selectedRegion)?.name
    : null;
  const selectedEraName = selectedEra
    ? eras.find((e) => e.id === selectedEra)?.name
    : null;
  const selectedThemeName = selectedTheme
    ? (allThemes || themes).find((t) => t.id === selectedTheme)?.name
    : null;

  return (
    <div className="space-y-5 mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#AAB0D6]" />
        <Input
          type="text"
          placeholder="Search by name, teaching, region, or biography..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-10 h-14 text-base glass-panel border-[rgba(255,255,255,0.08)] focus:border-[#C8A75E] text-[#F5F3EE] placeholder:text-[#AAB0D6]/60"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Lineage Filter */}
        <Select value={selectedLineage || 'all'} onValueChange={(v) => onLineageChange(v === 'all' ? null : v)}>
          <SelectTrigger className="w-[200px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] h-11 hover:border-[#C8A75E]/50 transition-colors">
            <GitBranch className="h-4 w-4 mr-2 opacity-60 shrink-0" />
            <SelectValue placeholder="Lineage">
              {selectedLineage ? (
                <span className="text-[#C8A75E] truncate">{selectedLineageName}</span>
              ) : (
                <span className="text-[#AAB0D6]">Lineage</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[420px]">
            <SelectItem value="all">All Lineages</SelectItem>
            {LINEAGE_GROUPS.map((group) => {
              const items = group.slugs
                .map((slug) => lineageMap.get(slug))
                .filter((l): l is LineageWithHierarchy => !!l && availableLineageIds.has(l.id));
              if (items.length === 0) return null;
              return (
                <SelectGroup key={group.label}>
                  <SelectLabel className="text-[#C8A75E]/70 text-xs font-semibold uppercase tracking-widest py-1">
                    {group.label}
                  </SelectLabel>
                  {items.map((lineage) => (
                    <SelectItem
                      key={lineage.id}
                      value={lineage.id}
                      className={lineage.level === 1 ? 'pl-6 text-[#AAB0D6] text-sm' : 'text-sm'}
                    >
                      {lineage.level === 1 && <span className="mr-1 opacity-50">└</span>}
                      {lineage.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>

        {/* Region Filter */}
        <Select value={selectedRegion || 'all'} onValueChange={(v) => onRegionChange(v === 'all' ? null : v)}>
          <SelectTrigger className="w-[210px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] h-11 hover:border-[#C8A75E]/50 transition-colors">
            <Globe className="h-4 w-4 mr-2 opacity-60 shrink-0" />
            <SelectValue placeholder="Region">
              {selectedRegion ? (
                <span className="text-[#C8A75E] truncate">{selectedRegionName}</span>
              ) : (
                <span className="text-[#AAB0D6]">Region</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[420px]">
            <SelectItem value="all">All Regions</SelectItem>
            {REGION_GROUPS.map((group) => {
              const items = group.slugs
                .map((slug) => regionMap.get(slug))
                .filter((r): r is RegionWithHierarchy => !!r && availableRegionIds.has(r.id));
              if (items.length === 0) return null;
              return (
                <SelectGroup key={group.label}>
                  <SelectLabel className="text-[#C8A75E]/70 text-xs font-semibold uppercase tracking-widest py-1">
                    {group.label}
                  </SelectLabel>
                  {items.map((region) => (
                    <SelectItem
                      key={region.id}
                      value={region.id}
                      className={region.level === 1 ? 'pl-6 text-[#AAB0D6] text-sm' : 'text-sm'}
                    >
                      {region.level === 1 && <span className="mr-1 opacity-50">└</span>}
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>

        {/* Era Filter */}
        <Select value={selectedEra || 'all'} onValueChange={(v) => onEraChange(v === 'all' ? null : v)}>
          <SelectTrigger className="w-[210px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] h-11 hover:border-[#C8A75E]/50 transition-colors">
            <Clock className="h-4 w-4 mr-2 opacity-60 shrink-0" />
            <SelectValue placeholder="Era">
              {selectedEra ? (
                <span className="text-[#C8A75E] truncate text-xs">{selectedEraName}</span>
              ) : (
                <span className="text-[#AAB0D6]">Era</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[420px]">
            <SelectItem value="all">All Eras</SelectItem>
            <SelectGroup>
              <SelectLabel className="text-[#C8A75E]/70 text-xs font-semibold uppercase tracking-widest py-1">
                Historical Periods
              </SelectLabel>
              {eras.map((era) => (
                <SelectItem key={era.id} value={era.id} className="text-sm">
                  <span>{era.name}</span>
                  {era.start_year && (
                    <span className="ml-2 text-xs text-[#AAB0D6]/60">
                      {era.start_year}–{era.end_year || ''}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Theme Filter */}
        <Select value={selectedTheme || 'all'} onValueChange={(v) => onThemeChange(v === 'all' ? null : v)}>
          <SelectTrigger className="w-[230px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] h-11 hover:border-[#C8A75E]/50 transition-colors">
            <Sparkles className="h-4 w-4 mr-2 opacity-60 shrink-0" />
            <SelectValue placeholder="Theme">
              {selectedTheme ? (
                <span className="text-[#C8A75E] truncate text-xs">{selectedThemeName}</span>
              ) : (
                <span className="text-[#AAB0D6]">Theme</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[460px]">
            <SelectItem value="all">All Themes</SelectItem>
            {THEME_CLUSTERS.map((cluster) => {
              const [min, max] = cluster.range;
              const clusterThemes = (allThemes || themes).filter(
                (t) =>
                  (t.display_order ?? 0) >= min &&
                  (t.display_order ?? 0) <= max &&
                  availableThemeIds.has(t.id)
              );
              if (clusterThemes.length === 0) return null;
              return (
                <SelectGroup key={cluster.label}>
                  <SelectLabel className="text-[#C8A75E]/70 text-xs font-semibold uppercase tracking-widest py-1 leading-tight">
                    {cluster.label}
                  </SelectLabel>
                  {clusterThemes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id} className="text-sm">
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] hover:bg-[rgba(255,255,255,0.05)] hover:border-[#C8A75E]/40 h-11 transition-all"
          >
            <X className="h-4 w-4 mr-1.5" />
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-sm">
          <span className="text-[#F5F3EE] font-semibold">{filteredCount} Masters</span>
          {activeFiltersCount > 0 ? (
            <span className="text-[#AAB0D6] ml-2">filtered from {totalCount}</span>
          ) : (
            <span className="text-[#AAB0D6] ml-2">in the archive</span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedLineage && selectedLineageName && (
              <Badge className="bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/30 hover:bg-[#C8A75E]/25 transition-colors gap-1 pr-1">
                <GitBranch className="h-3 w-3" />
                {selectedLineageName}
                <button
                  onClick={() => onLineageChange(null)}
                  className="ml-1 hover:text-white transition-colors rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedRegion && selectedRegionName && (
              <Badge className="bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/30 hover:bg-[#C8A75E]/25 transition-colors gap-1 pr-1">
                <Globe className="h-3 w-3" />
                {selectedRegionName}
                <button
                  onClick={() => onRegionChange(null)}
                  className="ml-1 hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedEra && selectedEraName && (
              <Badge className="bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/30 hover:bg-[#C8A75E]/25 transition-colors gap-1 pr-1">
                <Clock className="h-3 w-3" />
                <span className="max-w-[160px] truncate">{selectedEraName}</span>
                <button
                  onClick={() => onEraChange(null)}
                  className="ml-1 hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTheme && selectedThemeName && (
              <Badge className="bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/30 hover:bg-[#C8A75E]/25 transition-colors gap-1 pr-1">
                <Sparkles className="h-3 w-3" />
                <span className="max-w-[160px] truncate">{selectedThemeName}</span>
                <button
                  onClick={() => onThemeChange(null)}
                  className="ml-1 hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
