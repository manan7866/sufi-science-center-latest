'use client';

import { SaintWithRelations } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface EraBand {
  id: string;
  name: string;
  start_year: number;
  end_year?: number;
}

interface SaintsTimelineProps {
  saints: SaintWithRelations[];
  onSaintClick?: (saint: SaintWithRelations) => void;
  eraBands?: EraBand[];
  onEraClick?: (eraId: string) => void;
}

export function SaintsTimeline({ saints, onSaintClick, eraBands = [], onEraClick }: SaintsTimelineProps) {
  const saintsWithDates = saints.filter((s) => s.birth_year);

  if (saintsWithDates.length === 0) {
    return (
      <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
        <div className="text-center py-8">
          <p className="text-[#AAB0D6]">No saints with dates match the current filters.</p>
        </div>
      </Card>
    );
  }

  const minYear = Math.min(...saintsWithDates.map((s) => s.birth_year!));
  const maxYear = Math.max(...saintsWithDates.map((s) => s.death_year || s.birth_year!));
  const yearRange = maxYear - minYear;

  const centuryMarkers = [];
  const startCentury = Math.floor(minYear / 100) * 100;
  const endCentury = Math.ceil(maxYear / 100) * 100;

  for (let year = startCentury; year <= endCentury; year += 100) {
    if (year >= minYear && year <= maxYear) {
      const position = ((year - minYear) / yearRange) * 100;
      centuryMarkers.push({ year, position });
    }
  }

  const densityBands = [];
  const bandWidth = 50;
  for (let year = startCentury; year <= endCentury; year += bandWidth) {
    const saintsInBand = saintsWithDates.filter(
      (s) => s.birth_year! >= year && s.birth_year! < year + bandWidth
    ).length;
    const position = ((year - minYear) / yearRange) * 100;
    const nextPosition = ((Math.min(year + bandWidth, maxYear) - minYear) / yearRange) * 100;
    const opacity = Math.min(saintsInBand / 3, 1);
    densityBands.push({ position, width: nextPosition - position, opacity });
  }

  return (
    <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#F5F3EE] mb-2">Historical Timeline</h3>
        <p className="text-[#AAB0D6]">
          Visualizing the lives of Sufi masters across centuries
        </p>
      </div>

      <div className="relative h-96 overflow-x-auto">
        <div className="absolute inset-0 min-w-[800px]">
          <div className="relative h-full">
            {eraBands.map((era) => {
              if (!era.start_year) return null;
              const startPos = Math.max(((era.start_year - minYear) / yearRange) * 100, 0);
              const endPos = era.end_year
                ? Math.min(((era.end_year - minYear) / yearRange) * 100, 100)
                : 100;

              return (
                <div
                  key={era.id}
                  className="absolute inset-y-0 bg-[#C8A75E]/5 border-l border-r border-[#C8A75E]/20 cursor-pointer hover:bg-[#C8A75E]/10 transition-colors group"
                  style={{
                    left: `${startPos}%`,
                    width: `${endPos - startPos}%`,
                  }}
                  onClick={() => onEraClick?.(era.id)}
                  title={`Click to filter: ${era.name}`}
                >
                  <div className="absolute top-2 left-2 text-xs font-semibold text-[#C8A75E] opacity-40 group-hover:opacity-100 transition-opacity">
                    {era.name}
                  </div>
                </div>
              );
            })}

            {densityBands.map((band, index) => (
              <div
                key={index}
                className="absolute inset-y-0 bg-gradient-to-b from-[#C8A75E]/0 via-[#C8A75E] to-[#C8A75E]/0 pointer-events-none"
                style={{
                  left: `${band.position}%`,
                  width: `${band.width}%`,
                  opacity: band.opacity * 0.15,
                }}
              />
            ))}

            <div className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-[#C8A75E]/30 via-[#C8A75E] to-[#C8A75E]/30 rounded-full" />

            {centuryMarkers.map(({ year, position }) => (
              <div
                key={year}
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${position}%` }}
              >
                <div className="h-full w-px bg-[rgba(255,255,255,0.1)]" />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C8A75E] border-2 border-[#0B0F2A] shadow-lg glow-gold" />
                <div className="absolute top-[calc(50%+1.5rem)] text-sm font-semibold text-[#C8A75E] whitespace-nowrap">
                  {year}
                </div>
              </div>
            ))}

            {saintsWithDates.map((saint, index) => {
              const birthPosition = ((saint.birth_year! - minYear) / yearRange) * 100;
              const deathPosition = saint.death_year
                ? ((saint.death_year - minYear) / yearRange) * 100
                : birthPosition + 2;

              const rowIndex = index % 3;
              const topPosition = rowIndex === 0 ? '15%' : rowIndex === 1 ? '50%' : '85%';

              return (
                <div
                  key={saint.id}
                  className="absolute"
                  style={{
                    left: `${birthPosition}%`,
                    top: topPosition,
                    width: `${Math.max(deathPosition - birthPosition, 2)}%`,
                  }}
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => onSaintClick?.(saint)}
                  >
                    <div className="relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-[#C8A75E]/50 to-[#C8A75E] rounded-full opacity-70 group-hover:opacity-100 group-hover:h-3 transition-all" />

                      <div className="relative -translate-y-8 glass-panel rounded-lg shadow-md p-2 border border-[rgba(255,255,255,0.08)] group-hover:shadow-xl group-hover:scale-105 group-hover:border-[#C8A75E]/50 transition-all duration-200 min-w-max glow-gold">
                        <div className="text-xs font-semibold text-[#F5F3EE] mb-1">
                          {saint.name}
                        </div>
                        <div className="text-xs text-[#AAB0D6]">
                          {saint.birth_year}–{saint.death_year || '?'}
                        </div>
                        {saint.lineages && saint.lineages.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30"
                          >
                            {saint.lineages[0].name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-[#AAB0D6] text-center space-y-1">
        <p>Hover over names to see details • Click saint to view full biography</p>
        {eraBands.length > 0 && (
          <p className="text-[#C8A75E]/80">Click on era bands to filter by historical period</p>
        )}
      </div>
    </Card>
  );
}
