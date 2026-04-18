'use client';

import { useState, useMemo } from 'react';
import { SaintWithRelations } from '@/lib/database.types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ChevronRight } from 'lucide-react';

interface RegionWithHierarchy {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_region_id?: string | null;
}

interface SaintsAtlasProps {
  saints: SaintWithRelations[];
  onSaintClick?: (saint: SaintWithRelations) => void;
  allRegions?: RegionWithHierarchy[];
}

const REGION_ORDER = [
  'Early Islamic World',
  'Arabian Peninsula',
  'Persia & Greater Iran',
  'Central Asia',
  'South Asia',
  'Kashmir',
  'Anatolia',
  'Ottoman World',
  'North Africa',
  'Al-Andalus',
  'Levant',
  'Sub-Saharan Africa',
  'Balkans',
  'Caucasus',
  'Southeast Asia',
  'China',
  'Global Diaspora',
];

const REGION_COLOR_MAP: Record<string, string> = {
  'Early Islamic World': '#C8A75E',
  'Arabian Peninsula': '#D4956A',
  'Persia & Greater Iran': '#7B9EA8',
  'Central Asia': '#8FB49A',
  'South Asia': '#C4956A',
  'Kashmir': '#A8847B',
  'Anatolia': '#9B8AB4',
  'Ottoman World': '#7B8FBA',
  'North Africa': '#B8A47A',
  'Al-Andalus': '#8AB48A',
  'Levant': '#A0A870',
  'Sub-Saharan Africa': '#C4906A',
  'Balkans': '#8496B8',
  'Caucasus': '#A88A8A',
  'Southeast Asia': '#8AB0A0',
  'China': '#A8A07A',
  'Global Diaspora': '#9090A0',
};

export function SaintsAtlas({ saints, onSaintClick, allRegions }: SaintsAtlasProps) {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const regionGroups = useMemo(() => {
    const groups: Map<string, { regionName: string; saints: SaintWithRelations[] }> = new Map();

    saints.forEach((saint) => {
      let regionName = 'Unknown Region';

      if (saint.region_id && allRegions) {
        const region = allRegions.find((r) => r.id === saint.region_id);
        if (region) {
          if (region.level === 1 && region.parent_region_id) {
            const parent = allRegions.find((r) => r.id === region.parent_region_id);
            regionName = parent?.name ?? region.name;
          } else {
            regionName = region.name;
          }
        }
      } else if (saint.region) {
        regionName = saint.region;
      }

      if (!groups.has(regionName)) {
        groups.set(regionName, { regionName, saints: [] });
      }
      groups.get(regionName)!.saints.push(saint);
    });

    return Array.from(groups.values()).sort((a, b) => {
      const ai = REGION_ORDER.indexOf(a.regionName);
      const bi = REGION_ORDER.indexOf(b.regionName);
      if (ai === -1 && bi === -1) return a.regionName.localeCompare(b.regionName);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [saints, allRegions]);

  if (saints.length === 0) {
    return (
      <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-[#AAB0D6] mx-auto mb-4 opacity-30" />
          <p className="text-[#AAB0D6]">No masters match the current filters.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#F5F3EE]">Geographic Atlas</h3>
          <p className="text-sm text-[#AAB0D6] mt-1">
            {saints.length} masters across {regionGroups.length} civilizational regions
          </p>
        </div>
        <div className="text-xs text-[#AAB0D6]/60 hidden sm:block">
          Click a region to explore its masters
        </div>
      </div>

      {/* Visual map representation — proportional bubbles */}
      <Card className="p-6 glass-panel border-[rgba(255,255,255,0.08)] overflow-hidden">
        <div className="flex flex-wrap gap-3 justify-center">
          {regionGroups.map(({ regionName, saints: regionSaints }) => {
            const color = REGION_COLOR_MAP[regionName] ?? '#AAB0D6';
            const maxCount = Math.max(...regionGroups.map((g) => g.saints.length));
            const size = Math.max(80, Math.round((regionSaints.length / maxCount) * 140));
            const isExpanded = expandedRegion === regionName;

            return (
              <button
                key={regionName}
                onClick={() => setExpandedRegion(isExpanded ? null : regionName)}
                className="relative flex flex-col items-center justify-center rounded-full transition-all duration-300 hover:scale-110 group"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(circle at 35% 35%, ${color}40, ${color}15)`,
                  border: `1.5px solid ${color}${isExpanded ? 'CC' : '40'}`,
                  boxShadow: isExpanded ? `0 0 20px ${color}30` : 'none',
                }}
                title={regionName}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color }}
                >
                  {regionSaints.length}
                </span>
                <span className="text-[10px] text-center px-1 leading-tight" style={{ color: `${color}CC` }}>
                  {regionName.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs text-[#AAB0D6]/40 mt-4">
          Bubble size reflects number of masters per region
        </p>
      </Card>

      {/* Region list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {regionGroups.map(({ regionName, saints: regionSaints }) => {
          const color = REGION_COLOR_MAP[regionName] ?? '#AAB0D6';
          const isExpanded = expandedRegion === regionName;

          return (
            <Card
              key={regionName}
              className="glass-panel border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300"
              style={{ borderColor: isExpanded ? `${color}40` : undefined }}
            >
              <button
                className="w-full p-4 flex items-center justify-between text-left group hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                onClick={() => setExpandedRegion(isExpanded ? null : regionName)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <span className="font-semibold text-[#F5F3EE] text-sm">{regionName}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Users className="h-3 w-3 text-[#AAB0D6]" />
                      <span className="text-xs text-[#AAB0D6]">
                        {regionSaints.length} {regionSaints.length === 1 ? 'master' : 'masters'}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className="h-4 w-4 text-[#AAB0D6] transition-transform duration-200"
                  style={{
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    color: isExpanded ? color : undefined,
                  }}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="pt-3 grid grid-cols-1 gap-2">
                    {regionSaints
                      .sort((a, b) => (a.birth_year ?? 9999) - (b.birth_year ?? 9999))
                      .map((saint) => (
                        <button
                          key={saint.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSaintClick?.(saint);
                          }}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors text-left group/saint w-full"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#F5F3EE] group-hover/saint:text-[#C8A75E] transition-colors truncate">
                              {saint.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {(saint.birth_year || saint.death_year) && (
                                <span className="text-xs text-[#AAB0D6]">
                                  {saint.birth_year ?? '?'}–{saint.death_year ?? '?'} CE
                                </span>
                              )}
                              {saint.lineages && saint.lineages.length > 0 && (
                                <Badge
                                  className="text-[10px] h-4 px-1.5"
                                  style={{
                                    backgroundColor: `${color}20`,
                                    color,
                                    borderColor: `${color}40`,
                                  }}
                                >
                                  {saint.lineages[0].name}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-[#AAB0D6] shrink-0 mt-1 opacity-0 group-hover/saint:opacity-100 transition-opacity" />
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
