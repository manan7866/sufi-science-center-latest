'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SaintWithRelations } from '@/lib/database.types';
import { MapPin, Calendar } from 'lucide-react';

interface RegionWithHierarchy {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_region_id?: string | null;
}

interface SaintCardProps {
  saint: SaintWithRelations;
  onClick?: () => void;
  allRegions?: RegionWithHierarchy[];
}

export function SaintCard({ saint, onClick, allRegions }: SaintCardProps) {
  const lifespan = saint.birth_year && saint.death_year
    ? `${saint.birth_year}–${saint.death_year} CE`
    : saint.birth_year
    ? `b. ${saint.birth_year} CE`
    : saint.death_year
    ? `d. ${saint.death_year} CE`
    : 'Dates unknown';

  const resolvedRegion = (() => {
    if (saint.region) return saint.region;
    if (!saint.region_id || !allRegions) return null;
    const region = allRegions.find((r) => r.id === saint.region_id);
    if (!region) return null;
    if (region.level === 1 && region.parent_region_id) {
      const parent = allRegions.find((r) => r.id === region.parent_region_id);
      return parent ? `${region.name}, ${parent.name}` : region.name;
    }
    return region.name;
  })();

  return (
    <Card
      className="group relative overflow-hidden glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/50 glow-gold hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2.5 group-hover:text-[#C8A75E] transition-colors leading-snug">
            {saint.name}
          </h3>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#AAB0D6]">
            {(saint.birth_year || saint.death_year) && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 shrink-0" />
                <span>{lifespan}</span>
              </div>
            )}
            {resolvedRegion && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate max-w-[160px]">{resolvedRegion}</span>
              </div>
            )}
          </div>
        </div>

        {saint.short_summary && (
          <p className="text-sm text-[#AAB0D6] leading-relaxed line-clamp-3 mb-4">
            {saint.short_summary}
          </p>
        )}

        {saint.lineages && saint.lineages.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {saint.lineages.slice(0, 2).map((lineage) => (
              <Badge
                key={lineage.id}
                variant="secondary"
                className="text-xs bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/25 group-hover:bg-[#C8A75E]/25 transition-colors"
              >
                {lineage.name}
              </Badge>
            ))}
            {saint.lineages.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs bg-[rgba(255,255,255,0.05)] text-[#AAB0D6] border border-[rgba(255,255,255,0.08)]"
              >
                +{saint.lineages.length - 2} more
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C8A75E]/30 rounded-lg transition-colors pointer-events-none" />
    </Card>
  );
}
