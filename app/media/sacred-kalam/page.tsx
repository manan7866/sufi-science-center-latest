'use client';

import { useState, useEffect } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { SacredKalamCard } from '@/components/sacred-kalam-card';
import { Filter, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGE_OPTIONS = [
  'All Languages',
  'Arabic',
  'Farsi',
  'Urdu',
  'Turkish',
  'Punjabi',
  'Hindi',
  'Bengali',
  'English',
  'Spanish',
  'French',
  'German',
  'Indonesian',
  'Mandarin',
  'Japanese',
];

const REGION_OPTIONS = [
  'All Regions',
  'Middle East',
  'Central Asia',
  'South Asia',
  'North Africa',
  'Anatolia',
  'Persia',
  'Arabia',
  'Indian Subcontinent',
];

const ERA_OPTIONS = [
  'All Eras',
  'Classical Period',
  'Medieval Period',
  'Early Modern',
  'Modern Period',
  '8th-10th Century',
  '11th-13th Century',
  '14th-16th Century',
  '17th-19th Century',
  '20th Century',
];

const THEME_OPTIONS = [
  'All Themes',
  'Divine Love',
  'Tawhid',
  'Spiritual Journey',
  'Mortality',
  'Transformation',
  'Inner Light',
  'Consciousness',
  'Ethical Discipline',
  'Unity of Being',
  'Prophetic Devotion',
];

interface SacredKalamEntry {
  id: string;
  slug: string;
  title: string;
  poet_name: string;
  region: string;
  era: string;
  language: string;
  script_type: 'rtl' | 'ltr';
  original_text: string;
  themes: string[];
}

export default function SacredKalamPage() {
  const [entries, setEntries] = useState<SacredKalamEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<SacredKalamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [selectedTheme, setSelectedTheme] = useState('All Themes');

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [entries, selectedLanguage, selectedRegion, selectedEra, selectedTheme]);

  async function fetchEntries() {
    setEntries([]);
    setLoading(false);
  }

  function applyFilters() {
    let filtered = [...entries];

    if (selectedLanguage !== 'All Languages') {
      filtered = filtered.filter((entry) => entry.language === selectedLanguage);
    }

    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter((entry) => entry.region === selectedRegion);
    }

    if (selectedEra !== 'All Eras') {
      filtered = filtered.filter((entry) => entry.era === selectedEra);
    }

    if (selectedTheme !== 'All Themes') {
      filtered = filtered.filter((entry) => entry.themes?.includes(selectedTheme));
    }

    setFilteredEntries(filtered);
  }

  function clearFilters() {
    setSelectedLanguage('All Languages');
    setSelectedRegion('All Regions');
    setSelectedEra('All Eras');
    setSelectedTheme('All Themes');
  }

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Literary Archive"
        title="Sacred Kalam Library"
        description="A living repository of sacred poetic expression across cultures and languages, connecting literary beauty to spiritual insight."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col items-center mb-[60px]">
            {/* <div className="relative w-full max-w-4xl">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C8A75E]/10 via-transparent to-[#C8A75E]/5 pointer-events-none" />
              <div className="relative rounded-2xl border border-[#C8A75E]/20 shadow-[0_0_40px_0_rgba(200,167,94,0.06)] bg-gradient-to-br from-[#0d0e1a] to-[#0a0b14] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A75E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className="aspect-video flex flex-col items-center justify-center px-8 md:px-16 text-center relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-6">
                    Inaugural Archive Opening
                  </p>
                  <p className="text-sm md:text-base text-[#AAB0D6]/80 leading-relaxed max-w-xl mb-6">
                    This archive opens as a living repository of sacred poetic expression — preserving voices across centuries, regions, and languages. Each kalam is received not merely as text, but as transmission — where literary beauty becomes a vessel for contemplative insight.
                  </p>
                  <div className="w-16 h-px bg-[#C8A75E]/20 mb-6" />
                  <p className="text-[10px] text-[#AAB0D6]/35 tracking-widest uppercase">
                    Sacred Kalam Library&nbsp;&nbsp;|&nbsp;&nbsp;A Literary Archive of Contemplative Civilizations
                  </p>
                </div>
              </div>
              
            </div> */}

            <div className="relative w-full my-14 max-w-4xl">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C8A75E]/10 via-transparent to-[#C8A75E]/5 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-[#C8A75E]/20 shadow-[0_0_40px_0_rgba(200,167,94,0.06)]">
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A75E]/15 border border-[#C8A75E]/25 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A75E] inline-block" />
                  <span className="text-[10px] uppercase tracking-widest text-[#C8A75E] font-semibold leading-none">Premiere</span>
                  <span className="text-[10px] text-[#C8A75E]/60 leading-none ml-0.5">Launch Release</span>
                </div>
                <div className="aspect-video bg-[#0A0B14]">
                
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/kX2g8o2uEGw"
                    title="SufiPulse USA Pre-Launch Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 w-[200px] h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
          </div>

        <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-[#C8A75E] mr-2" />
            <h2 className="text-lg font-medium text-white">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm text-[#AAB0D6] mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-[#0A0B14] border-[#2A2F4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-[#AAB0D6] mb-2 block">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="bg-[#0A0B14] border-[#2A2F4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGION_OPTIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-[#AAB0D6] mb-2 block">Era</label>
              <Select value={selectedEra} onValueChange={setSelectedEra}>
                <SelectTrigger className="bg-[#0A0B14] border-[#2A2F4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ERA_OPTIONS.map((era) => (
                    <SelectItem key={era} value={era}>
                      {era}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-[#AAB0D6] mb-2 block">Theme</label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="bg-[#0A0B14] border-[#2A2F4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {THEME_OPTIONS.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#AAB0D6]/60">
              Showing {filteredEntries.length} of {entries.length} entries
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <BookText className="w-16 h-16 text-[#C8A75E] animate-pulse mx-auto mb-4" />
            <p className="text-[#AAB0D6]">Loading archive...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-20">
            <BookText className="w-16 h-16 text-[#AAB0D6]/30 mx-auto mb-4" />
            <p className="text-[#AAB0D6] mb-2">No entries found</p>
            <p className="text-sm text-[#AAB0D6]/60">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <SacredKalamCard
                key={entry.id}
                slug={entry.slug}
                title={entry.title}
                poetName={entry.poet_name}
                region={entry.region}
                era={entry.era}
                language={entry.language}
                scriptType={entry.script_type}
                themes={entry.themes || []}
                originalText={entry.original_text}
              />
            ))}
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
