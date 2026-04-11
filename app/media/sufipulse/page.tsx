'use client';

import { useState, useEffect } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { MediaTrackCard } from '@/components/media-track-card';
import { Search, Music, Filter as FilterIcon, ExternalLink, PenLine, Mic, FileSliders as Sliders, Globe, Youtube, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGE_OPTIONS = [
  'All Languages',
  'Roman Urdu',
  'Urdu',
  'Hindi',
  'Arabic',
  'Turkish',
  'Farsi',
  'Punjabi',
  'Indonesian',
  'Spanish',
  'Portuguese',
  'French',
  'German',
  'Russian',
  'Bengali',
  'Mandarin',
  'Japanese',
  'English',
];

const THEME_OPTIONS = [
  'All Themes',
  'Consciousness',
  'Transformation',
  'Tawhid',
  'Mortality',
  'Ethical Discipline',
  'Inner Light',
  'Divine Love',
  'Spiritual Journey',
];

const FORMAT_OPTIONS = [
  { value: 'all', label: 'All Formats' },
  { value: 'subtitle', label: 'Songs with Subtitles' },
  { value: 'interpretation', label: 'Songs with Interpretations' },
];

interface MediaTrack {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtube_url: string;
  thumbnail_url: string;
  duration: string;
  release_date: string;
  language_primary: string;
  subtitle_languages: string[];
  format_type: 'subtitle' | 'interpretation';
  themes: string[];
  view_count: number;
}

type SortOption = 'all' | 'popular' | 'old' | 'new';

export default function SufiPulseStudioPage() {
  const [tracks, setTracks] = useState<MediaTrack[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<MediaTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedTheme, setSelectedTheme] = useState('All Themes');
  const [selectedFormat, setSelectedFormat] = useState('all');

  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tracks, selectedLanguage, selectedTheme, selectedFormat, searchQuery, sortBy]);

  async function fetchTracks() {
    try {
      setLoading(true);
      const response = await fetch('/api/youtube/videos?limit=50');
      if (!response.ok) {
        console.error('Failed to fetch tracks');
        setTracks([]);
        return;
      }
      const data = await response.json();
      setTracks(data.videos || []);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDuration(interval: string | null): string {
    if (!interval) return '0:00';
    const match = interval.match(/(\d+):(\d+):(\d+)/);
    if (!match) return '0:00';
    const [, hours, minutes, seconds] = match;
    const h = parseInt(hours);
    const m = parseInt(minutes);
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${seconds}` : `${m}:${seconds}`;
  }

  function applyFilters() {
    let filtered = [...tracks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (track) =>
          track.title.toLowerCase().includes(query) ||
          track.description.toLowerCase().includes(query)
      );
    }

    if (selectedLanguage !== 'All Languages') {
      filtered = filtered.filter(
        (track) =>
          track.language_primary === selectedLanguage ||
          track.subtitle_languages?.includes(selectedLanguage)
      );
    }

    if (selectedTheme !== 'All Themes') {
      filtered = filtered.filter((track) => track.themes?.includes(selectedTheme));
    }

    if (selectedFormat !== 'all') {
      filtered = filtered.filter((track) => track.format_type === selectedFormat);
    }

    if (sortBy === 'popular') {
      filtered.sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0));
    } else if (sortBy === 'old') {
      filtered.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    } else if (sortBy === 'new') {
      filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    setFilteredTracks(filtered);
  }

  function clearFilters() {
    setSearchQuery('');
    setSortBy('all');
    setSelectedLanguage('All Languages');
    setSelectedTheme('All Themes');
    setSelectedFormat('all');
  }

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Media Arm"
        title="SufiPulse Studio USA"
        description="Multilingual sacred music as a contemplative gateway into inner science."
      />

      <section className="observatory-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col items-center mb-[60px]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C8A75E]/70 font-medium mb-5">
              Official Launch — Sufi Science Center USA
            </p>

            <div className="relative w-full max-w-4xl">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C8A75E]/10 via-transparent to-[#C8A75E]/5 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-[#C8A75E]/20 shadow-[0_0_40px_0_rgba(200,167,94,0.06)]">
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8A75E]/15 border border-[#C8A75E]/25 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A75E] inline-block" />
                  <span className="text-[10px] uppercase tracking-widest text-[#C8A75E] font-semibold leading-none">Premiere</span>
                  <span className="text-[10px] text-[#C8A75E]/60 leading-none ml-0.5">Launch Release</span>
                </div>
                <div className="aspect-video bg-[#0A0B14]">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src="https://dkf.sufisciencecenter.info/sufi-video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center max-w-2xl">
              <p className="text-sm font-medium text-[#E8DCC8] mb-2">Official Launch Release</p>
              <p className="text-sm text-[#AAB0D6]/70 leading-relaxed">
                This inaugural studio anthem marks the formal launch of the Sufi Science Center USA. A multilingual sacred composition presented as a contemplative gateway into disciplined inner inquiry.
              </p>
              <p className="text-xs text-[#AAB0D6]/40 mt-3 tracking-wide">
                Duration: 8:45&nbsp;&nbsp;|&nbsp;&nbsp;Launch Anthem&nbsp;&nbsp;|&nbsp;&nbsp;Multilingual Sacred Premiere
              </p>
            </div>

            <div className="mt-10 w-[200px] h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
          </div>

          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#AAB0D6]/50" />
              <Input
                type="text"
                placeholder="Search sacred videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 border-[#2A2F4F]/30 text-white placeholder:text-[#AAB0D6]/50 focus:border-[#C8A75E]/50 text-lg"
              />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  variant={showFilters ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
                >
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant={sortBy === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('all')}
                    className={
                      sortBy === 'all'
                        ? 'bg-[#16a085] hover:bg-[#16a085]/90 text-white'
                        : 'border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30'
                    }
                  >
                    All Videos
                  </Button>
                  <Button
                    variant={sortBy === 'popular' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('popular')}
                    className={
                      sortBy === 'popular'
                        ? 'bg-[#16a085] hover:bg-[#16a085]/90 text-white'
                        : 'border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30'
                    }
                  >
                    Popular
                  </Button>
                  <Button
                    variant={sortBy === 'old' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('old')}
                    className={
                      sortBy === 'old'
                        ? 'bg-[#16a085] hover:bg-[#16a085]/90 text-white'
                        : 'border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30'
                    }
                  >
                    Old
                  </Button>
                  <Button
                    variant={sortBy === 'new' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('new')}
                    className={
                      sortBy === 'new'
                        ? 'bg-[#16a085] hover:bg-[#16a085]/90 text-white'
                        : 'border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30'
                    }
                  >
                    New
                  </Button>
                </div>
              </div>

              <p className="text-sm text-[#AAB0D6]/60">
                Showing {filteredTracks.length} of {tracks.length} videos
              </p>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                <div>
                  <label className="text-sm text-[#AAB0D6] mb-2 block">Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="bg-[#0A0B14] border-[#2A2F4F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMAT_OPTIONS.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <Music className="w-16 h-16 text-[#C8A75E] animate-pulse mx-auto mb-4" />
              <p className="text-[#AAB0D6]">Loading tracks...</p>
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="text-center py-20">
              <Music className="w-16 h-16 text-[#AAB0D6]/30 mx-auto mb-4" />
              <p className="text-[#AAB0D6] mb-2">No tracks found</p>
              <p className="text-sm text-[#AAB0D6]/60">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <MediaTrackCard
                  key={track.id}
                  slug={track.slug}
                  title={track.title}
                  description={track.description}
                  thumbnailUrl={track.thumbnail_url}
                  duration={track.duration}
                  releaseDate={track.release_date}
                  languagePrimary={track.language_primary}
                  subtitleLanguages={track.subtitle_languages || []}
                  formatType={track.format_type}
                  themes={track.themes || []}
                  viewCount={track.view_count || 0}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      <section className="observatory-gradient px-4 pb-20">
        <div className="max-w-7xl mx-auto">

          <div className="mt-20 rounded-2xl border border-[#C8A75E]/15 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm p-10 md:p-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-4">
              Creative Network
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-5 leading-snug">
              SufiPulse — Global Creative Platform
            </h2>
            <p className="text-sm md:text-base text-[#AAB0D6]/75 leading-relaxed max-w-2xl mb-8">
              SufiPulse operates as the global creative and collaborative media platform of the Sufi Science Center. While this page presents official studio releases, the broader SufiPulse ecosystem connects writers, vocalists, researchers, and contributors across languages and regions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://sufipulse.com/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0A0B14] text-sm font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit SufiPulse Global Platform
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <a
                href="https://www.youtube.com/@SufiPulse-USA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10 text-sm font-medium transition-colors"
              >
                <Youtube className="w-4 h-4" />
                Watch SufiPulse USA on YouTube
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-4">
                Collaboration
              </p>
              <h2 className="text-2xl md:text-3xl font-light text-white leading-snug">
                Contribute to the SufiPulse Network
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                {
                  icon: PenLine,
                  title: 'Writers',
                  text: 'Submit original sacred compositions, poetry, and lyrical reflections.',
                },
                {
                  icon: Mic,
                  title: 'Vocalists',
                  text: 'Collaborate on multilingual sacred recordings and studio releases.',
                },
                {
                  icon: Sliders,
                  title: 'Studio Contributors',
                  text: 'Engage in production, instrumentation, translation, and creative direction.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#2A2F4F]/40 bg-gradient-to-br from-[#1a1b2e]/50 to-[#16213e]/50 p-7 hover:border-[#C8A75E]/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-[#C8A75E]" />
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">{title}</h3>
                  <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <a
              href="https://sufipulse.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10 text-sm font-medium transition-colors"
            >
              Explore Collaboration Pathways
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          <div className="mt-20 rounded-2xl border border-[#C8A75E]/15 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm p-10 md:p-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-4">
              Institutional Architecture
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-10 leading-snug">
              SufiPulse Ecosystem Architecture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                {
                  icon: Building2,
                  title: 'Sufi Science Center',
                  sub: 'Institutional Framework',
                  border: 'border-r border-[#2A2F4F]/40',
                },
                {
                  icon: Globe,
                  title: 'SufiPulse Global Platform',
                  sub: 'Creative Collaboration Engine',
                  border: 'border-r border-[#2A2F4F]/40',
                },
                {
                  icon: Youtube,
                  title: 'SufiPulse USA YouTube',
                  sub: 'Public Distribution Channel',
                  border: '',
                },
              ].map(({ icon: Icon, title, sub, border }, i) => (
                <div key={title} className={`flex flex-col items-center text-center px-8 py-6 ${border} ${i > 0 ? 'mt-6 md:mt-0 border-t border-[#2A2F4F]/40 md:border-t-0' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                    <Icon className="w-4.5 h-4.5 text-[#C8A75E]" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
                  <p className="text-[11px] text-[#AAB0D6]/45 tracking-wide uppercase">{sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#2A2F4F]/30 text-center">
              <p className="text-sm text-[#AAB0D6]/45 leading-relaxed max-w-xl mx-auto">
                Creation, collaboration, and dissemination operating within one coherent institutional framework.
              </p>
            </div>
          </div>

          <div className="mt-20 mb-[60px]">
            <div className="rounded-2xl border border-[#C8A75E]/15 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm px-10 md:px-14 py-12">
              <div className="text-center mb-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-4">
                  Distribution Infrastructure
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 leading-snug">
                  Official Distribution & Publishing Partners
                </h2>
                <p className="text-sm text-[#AAB0D6]/65 leading-relaxed max-w-2xl mx-auto">
                  SufiPulse Studio USA distributes multilingual sacred releases through established global streaming and publishing networks.
                </p>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A75E]/20 to-transparent mb-10" />

              <div className="flex flex-col items-center gap-8 md:gap-10">
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2.5 opacity-45 hover:opacity-75 transition-all duration-300"
                    aria-label="Spotify">
                    <svg className="h-7 w-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M84 28C53.07 28 28 53.07 28 84C28 114.93 53.07 140 84 140C114.93 140 140 114.93 140 84C140 53.07 114.93 28 84 28ZM107.73 105.67C106.76 107.3 104.66 107.84 103.03 106.87C90.34 99.25 74.36 97.52 55.57 101.84C53.71 102.28 51.86 101.15 51.42 99.29C50.98 97.43 52.11 95.58 53.97 95.14C74.43 90.41 92.11 92.39 106.32 100.91C107.95 101.88 108.49 103.98 107.52 105.61L107.73 105.67ZM114.19 91.1C112.97 93.13 110.37 93.77 108.34 92.55C93.72 83.7 71.17 81.15 53.38 86.62C51.11 87.28 48.73 85.99 48.07 83.72C47.41 81.45 48.7 79.07 50.97 78.41C71.28 72.25 96.12 75.06 112.97 85.24C115 86.46 115.64 89.06 114.42 91.09L114.19 91.1ZM114.81 76C97.74 66.15 69.58 65.23 53.29 70.25C50.61 71.04 47.78 69.55 46.99 66.87C46.2 64.19 47.69 61.36 50.37 60.57C69.09 54.85 100.07 55.9 119.65 67.27C122.07 68.66 122.87 71.77 121.48 74.19C120.09 76.61 116.98 77.41 114.56 76.02L114.81 76Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest text-[#AAB0D6]/45 group-hover:text-[#AAB0D6]/70 transition-colors font-medium">Spotify</span>
                  </a>

                  <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2.5 opacity-45 hover:opacity-75 transition-all duration-300"
                    aria-label="Apple Music">
                    <svg className="h-7 w-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38.79 17.53C38.55 17.7 33.94 20.37 33.94 26.07C33.94 32.68 39.77 35.12 39.95 35.18C39.91 35.29 39.06 38.24 36.98 41.25C35.12 43.92 33.18 46.57 30.27 46.57C27.36 46.57 26.58 44.87 23.23 44.87C19.96 44.87 18.89 46.63 16.22 46.63C13.55 46.63 11.67 44.14 9.53 41.13C7.07 37.65 5.07 32.23 5.07 27.1C5.07 18.45 10.62 13.88 16.08 13.88C18.91 13.88 21.28 15.73 23.07 15.73C24.77 15.73 27.43 13.77 30.71 13.77C31.97 13.77 36.58 13.88 38.79 17.53ZM28.96 9.3C30.27 7.73 31.19 5.58 31.19 3.43C31.19 3.15 31.17 2.86 31.12 2.61C28.98 2.69 26.43 4.01 24.9 5.8C23.72 7.18 22.62 9.33 22.62 11.51C22.62 11.82 22.67 12.13 22.69 12.23C22.83 12.25 23.05 12.28 23.28 12.28C25.2 12.28 27.59 11.02 28.96 9.3Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest text-[#AAB0D6]/45 group-hover:text-[#AAB0D6]/70 transition-colors font-medium">Apple Music</span>
                  </a>

                  <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2.5 opacity-45 hover:opacity-75 transition-all duration-300"
                    aria-label="YouTube Music">
                    <svg className="h-7 w-auto group-hover:scale-105 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM20 31V17L33 24L20 31Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest text-[#AAB0D6]/45 group-hover:text-[#AAB0D6]/70 transition-colors font-medium">YouTube Music</span>
                  </a>
                </div>

                <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#2A2F4F]/60 to-transparent" />

                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                  {[
                    { name: 'DistroKid', label: 'Distribution', href: 'https://distrokid.com' },
                    { name: 'TuneCore', label: 'Publishing', href: 'https://tunecore.com' },
                    { name: 'CD Baby', label: 'Distribution', href: 'https://cdbaby.com' },
                    { name: 'Amuse', label: 'Distribution', href: 'https://amuse.io' },
                  ].map(({ name, label, href }) => (
                    <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2.5 opacity-45 hover:opacity-75 transition-all duration-300"
                      aria-label={name}>
                      <div className="h-7 flex items-center group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-semibold text-base tracking-tight">{name}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#AAB0D6]/45 group-hover:text-[#AAB0D6]/70 transition-colors font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#2A2F4F]/25 text-center">
                <p className="text-[11px] text-[#AAB0D6]/30 tracking-widest uppercase">
                  Distributed globally across major streaming platforms
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
