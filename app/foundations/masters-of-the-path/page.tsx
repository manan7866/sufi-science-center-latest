'use client';

import { useState, useEffect, useMemo } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { SaintCard } from '@/components/saint-card';
import { SaintDetailDrawer } from '@/components/saint-detail-drawer';
import { SaintFilters } from '@/components/saint-filters';
import { SaintsTimeline } from '@/components/saints-timeline';
import { SaintsAtlas } from '@/components/saints-atlas';
import { ViewSwitcher } from '@/components/view-switcher';
import { SaintWithRelations, Lineage, Saint } from '@/lib/database.types';
import { Loader as Loader2, Users, Globe, Sparkles, Clock, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
  start_year: number;
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

interface LineageWithHierarchy extends Lineage {
  level?: number;
  display_order?: number;
}

interface SearchParams {
  lineage?: string;
  region?: string;
  era?: string;
  theme?: string;
}

export default function MastersOfThePathPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [saints, setSaints] = useState<SaintWithRelations[]>([]);
  const [lineages, setLineages] = useState<LineageWithHierarchy[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [eras, setEras] = useState<HistoricalPeriod[]>([]);
  const [allRegions, setAllRegions] = useState<RegionWithHierarchy[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLineage, setSelectedLineage] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'timeline' | 'atlas'>('grid');
  const [selectedSaint, setSelectedSaint] = useState<SaintWithRelations | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const limit = 9;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [saintsRes, lineagesRes, themesRes, erasRes, regionsRes] = await Promise.all([
        fetch('/api/foundations/saints'),
        fetch('/api/foundations/lineages'),
        fetch('/api/foundations/themes'),
        fetch('/api/foundations/periods'),
        fetch('/api/foundations/regions'),
      ]);

      const saintsData = await saintsRes.json();
      const lineagesData = await lineagesRes.json();
      const themesData = await themesRes.json();
      const erasData = await erasRes.json();
      const regionsData = await regionsRes.json();

      setSaints(saintsData.saints || []);
      setLineages(lineagesData.lineages || []);
      setThemes(themesData.themes || []);
      setEras(erasData.eras || []);
      setAllRegions(regionsData.regions || []);
    } catch (error) {
      console.error('Failed to fetch foundations data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredSaints = useMemo(() => {
    return saints.filter((saint) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          saint.name.toLowerCase().includes(q) ||
          saint.short_summary?.toLowerCase().includes(q) ||
          saint.biography?.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedLineage) {
        if (!saint.lineages?.some((l) => l.id === selectedLineage)) return false;
      }
      if (selectedRegion) {
        if (!saint.region_id) return false;
        const sr = allRegions.find((r) => r.id === saint.region_id);
        if (!sr) return false;
        if (sr.id !== selectedRegion && sr.parent_region_id !== selectedRegion) return false;
      }
      if (selectedEra && saint.birth_year) {
        const era = eras.find((e) => e.id === selectedEra);
        if (era) {
          const inRange =
            saint.birth_year >= era.start_year &&
            (!era.end_year || saint.birth_year <= era.end_year);
          if (!inRange) return false;
        }
      }
      if (selectedTheme) {
        if (!saint.themes?.some((t) => t.id === selectedTheme)) return false;
      }
      return true;
    });
  }, [saints, searchQuery, selectedLineage, selectedRegion, selectedEra, selectedTheme, eras, allRegions]);

  const availableLineages = useMemo(() => {
    const pool = saints.filter((saint) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!saint.name.toLowerCase().includes(q) && !saint.short_summary?.toLowerCase().includes(q)) return false;
      }
      if (selectedRegion) {
        if (!saint.region_id) return false;
        const sr = allRegions.find((r) => r.id === saint.region_id);
        if (!sr || (sr.id !== selectedRegion && sr.parent_region_id !== selectedRegion)) return false;
      }
      if (selectedEra && saint.birth_year) {
        const era = eras.find((e) => e.id === selectedEra);
        if (era && !(saint.birth_year >= era.start_year && (!era.end_year || saint.birth_year <= era.end_year))) return false;
      }
      if (selectedTheme && !saint.themes?.some((t) => t.id === selectedTheme)) return false;
      return true;
    });
    return lineages.filter((l) => pool.some((s) => s.lineages?.some((sl) => sl.id === l.id)));
  }, [lineages, saints, searchQuery, selectedRegion, selectedEra, selectedTheme, eras, allRegions]);

  const availableRegions = useMemo(() => {
    const regionIds = new Set<string>();
    saints.forEach((saint) => {
      if (!saint.region_id) return;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!saint.name.toLowerCase().includes(q) && !saint.short_summary?.toLowerCase().includes(q)) return;
      }
      if (selectedLineage && !saint.lineages?.some((l) => l.id === selectedLineage)) return;
      if (selectedEra && saint.birth_year) {
        const era = eras.find((e) => e.id === selectedEra);
        if (era && !(saint.birth_year >= era.start_year && (!era.end_year || saint.birth_year <= era.end_year))) return;
      }
      if (selectedTheme && !saint.themes?.some((t) => t.id === selectedTheme)) return;
      regionIds.add(saint.region_id);
    });
    return allRegions.filter((r) => {
      if (regionIds.has(r.id)) return true;
      if (r.level === 0) {
        return allRegions.some((child) => child.parent_region_id === r.id && regionIds.has(child.id));
      }
      return false;
    });
  }, [allRegions, saints, searchQuery, selectedLineage, selectedEra, selectedTheme, eras]);

  const availableEras = useMemo(() => {
    const pool = saints.filter((saint) => {
      if (!saint.birth_year) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!saint.name.toLowerCase().includes(q) && !saint.short_summary?.toLowerCase().includes(q)) return false;
      }
      if (selectedLineage && !saint.lineages?.some((l) => l.id === selectedLineage)) return false;
      if (selectedRegion) {
        if (!saint.region_id) return false;
        const sr = allRegions.find((r) => r.id === saint.region_id);
        if (!sr || (sr.id !== selectedRegion && sr.parent_region_id !== selectedRegion)) return false;
      }
      if (selectedTheme && !saint.themes?.some((t) => t.id === selectedTheme)) return false;
      return true;
    });
    return eras.filter((era) =>
      pool.some((s) =>
        s.birth_year! >= era.start_year && (!era.end_year || s.birth_year! <= era.end_year)
      )
    );
  }, [eras, saints, searchQuery, selectedLineage, selectedRegion, selectedTheme, allRegions]);

  const availableThemes = useMemo(() => {
    const pool = saints.filter((saint) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!saint.name.toLowerCase().includes(q) && !saint.short_summary?.toLowerCase().includes(q)) return false;
      }
      if (selectedLineage && !saint.lineages?.some((l) => l.id === selectedLineage)) return false;
      if (selectedRegion) {
        if (!saint.region_id) return false;
        const sr = allRegions.find((r) => r.id === saint.region_id);
        if (!sr || (sr.id !== selectedRegion && sr.parent_region_id !== selectedRegion)) return false;
      }
      if (selectedEra && saint.birth_year) {
        const era = eras.find((e) => e.id === selectedEra);
        if (era && !(saint.birth_year >= era.start_year && (!era.end_year || saint.birth_year <= era.end_year))) return false;
      }
      return true;
    });
    return themes.filter((t) => pool.some((s) => s.themes?.some((st) => st.id === t.id)));
  }, [themes, saints, searchQuery, selectedLineage, selectedRegion, selectedEra, allRegions, eras]);

  const activeFiltersCount = [selectedLineage, selectedRegion, selectedEra, selectedTheme].filter(Boolean).length;

  function handleClearFilters() {
    setSelectedLineage(null);
    setSelectedRegion(null);
    setSelectedEra(null);
    setSelectedTheme(null);
  }

  function handleSaintClick(saint: SaintWithRelations) {
    setSelectedSaint(saint);
    setDrawerOpen(true);
  }

  function handleEraClick(eraId: string) {
    setSelectedEra(eraId);
    setView('grid');
  }

  const startIndex = (page - 1) * limit;
  const currentData = filteredSaints.slice(startIndex, startIndex + limit);

  const totalPages = Math.ceil(filteredSaints.length / limit);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Masters of the Path"
        description="The primary archive of Sufi masters — organized by lineage, region, era, and theme. Apply any filter combination to navigate the full civilizational record."
      />

      <section className="py-12 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
            <Card className="p-5 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-7 w-7 text-[#C8A75E]" />
                <span className="text-2xl font-bold text-[#F5F3EE]">{saints.length}</span>
              </div>
              <p className="text-xs text-[#AAB0D6]">Sufi Masters</p>
            </Card>

            <Card className="p-5 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="h-7 w-7 text-[#C8A75E]" />
                <span className="text-2xl font-bold text-[#F5F3EE]">{lineages.length}</span>
              </div>
              <p className="text-xs text-[#AAB0D6]">Lineages</p>
            </Card>

            <Card className="p-5 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <Globe className="h-7 w-7 text-[#C8A75E]" />
                <span className="text-2xl font-bold text-[#F5F3EE]">
                  {allRegions.filter((r) => r.level === 0).length}
                </span>
              </div>
              <p className="text-xs text-[#AAB0D6]">Civilizational Regions</p>
            </Card>

            <Card className="p-5 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-7 w-7 text-[#C8A75E]" />
                <span className="text-2xl font-bold text-[#F5F3EE]">{eras.length}</span>
              </div>
              <p className="text-xs text-[#AAB0D6]">Historical Eras</p>
            </Card>

            <Card className="p-5 glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <Lightbulb className="h-7 w-7 text-[#C8A75E]" />
                <span className="text-2xl font-bold text-[#F5F3EE]">{themes.length}</span>
              </div>
              <p className="text-xs text-[#AAB0D6]">Scholarly Themes</p>
            </Card>
          </div>

          <SaintFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedLineage={selectedLineage}
            onLineageChange={setSelectedLineage}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedEra={selectedEra}
            onEraChange={setSelectedEra}
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            lineages={lineages}
            allLineages={lineages}
            regions={allRegions}
            allRegions={allRegions}
            eras={eras}
            themes={themes}
            allThemes={themes}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={handleClearFilters}
            filteredCount={filteredSaints.length}
            totalCount={saints.length}
          />

          <div className="flex justify-center mb-8">
            <ViewSwitcher view={view} onViewChange={setView} />
          </div>

          {filteredSaints.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-[#AAB0D6]">No masters found matching your criteria.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-[#C8A75E] hover:text-[#E6D5A8] font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {view === 'grid' && (
                <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
                  {currentData.map((saint) => (
                    <SaintCard
                      key={saint.id}
                      saint={saint}
                      onClick={() => handleSaintClick(saint)}
                      allRegions={allRegions}
                    />
                  ))}
                  
                </div>
                <div className='my-4 w-full flex justify-between'>
                    <p className='text-lg text-[#AAB0D6]'> pages : {page}/{totalPages}</p>
                    <div className='flex gap-4'>
                    <button 
                    className={`px-4 py-2 rounded-lg border bg-[#C8A75E]/30 border-[#C8A75E]
    ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}
  `}
                     disabled={page === 1}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </button>
                      <button 
                      className={`bg-[#C8A75E] px-4 py-2 text-black rounded-lg hover:bg-[#E6D5A8]
    ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}
  `}
                      disabled={page === totalPages}
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages)) }>
                             Next Page
                      </button>
                    </div>

                  </div>
                </div>
                
              )}

              {view === 'timeline' && (
                <SaintsTimeline
                  saints={filteredSaints}
                  onSaintClick={handleSaintClick}
                  eraBands={eras}
                  onEraClick={handleEraClick}
                />
              )}

              {view === 'atlas' && (
                <SaintsAtlas
                  saints={filteredSaints}
                  onSaintClick={handleSaintClick}
                  allRegions={allRegions}
                />
              )}
            </>
          )}
        </div>
      </section>

      <SaintDetailDrawer
        saint={selectedSaint}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
