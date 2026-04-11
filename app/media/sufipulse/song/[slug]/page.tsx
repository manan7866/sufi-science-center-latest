'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Languages, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  lyrics_source: string;
  interpretation_text: string;
  view_count: number;
}

const LANGUAGE_SEQUENCE = [
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

const RTL_LANGUAGES = ['Urdu', 'Arabic', 'Farsi'];

export default function SongDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [track, setTrack] = useState<MediaTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchTrack();
    }
  }, [slug]);

  async function fetchTrack() {
    try {
      setLoading(true);
      
      // Extract YouTube video ID from slug or URL params
      // For this implementation, we'll use the slug to search videos
      const searchResponse = await fetch('/api/youtube/videos?limit=50');
      if (!searchResponse.ok) {
        setTrack(null);
        return;
      }
      const searchData = await searchResponse.json();
      
      // Find the matching video by slug
      const matchedVideo = (searchData.videos || []).find(
        (video: any) => video.slug === slug
      );

      if (!matchedVideo) {
        setTrack(null);
        return;
      }

      // Fetch full details for this specific video
      const videoResponse = await fetch(`/api/youtube/video?id=${matchedVideo.id}`);
      if (!videoResponse.ok) {
        setTrack(null);
        return;
      }
      const videoData = await videoResponse.json();
      setTrack(videoData.video || null);
    } catch (error) {
      console.error('Error fetching track:', error);
      setTrack(null);
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

  function extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A75E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB0D6]">Loading track...</p>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Track not found</p>
          <Link href="/media/sufipulse" className="text-[#C8A75E] hover:underline">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const youtubeId = track.youtube_url ? extractYouTubeId(track.youtube_url) : null;

  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/media/sufipulse"
          className="inline-flex items-center text-[#C8A75E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {youtubeId ? (
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={track.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-[#1a1b2e] to-[#16213e] rounded-xl flex items-center justify-center mb-6">
                <p className="text-[#AAB0D6]">Video not available</p>
              </div>
            )}

            <h1 className="text-3xl font-light text-white mb-4">{track.title}</h1>
            <p className="text-[#AAB0D6] mb-6">{track.description}</p>

            <Tabs defaultValue="lyrics" className="w-full">
              <TabsList className="bg-[#1a1b2e]/60 border border-[#2A2F4F]/30">
                <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
                {track.format_type === 'interpretation' && (
                  <TabsTrigger value="interpretation">Interpretation</TabsTrigger>
                )}
                {track.subtitle_languages && track.subtitle_languages.length > 0 && (
                  <TabsTrigger value="subtitles">Subtitles</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="lyrics" className="mt-6">
                <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Original Lyrics</h3>
                  <div className="text-[#AAB0D6] whitespace-pre-wrap leading-relaxed">
                    {track.lyrics_source || 'Lyrics not available'}
                  </div>
                </div>
              </TabsContent>

              {track.format_type === 'interpretation' && (
                <TabsContent value="interpretation" className="mt-6">
                  <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Interpretive Analysis</h3>
                    <div className="text-[#AAB0D6] whitespace-pre-wrap leading-relaxed">
                      {track.interpretation_text || 'Interpretation not available'}
                    </div>
                  </div>
                </TabsContent>
              )}

              {track.subtitle_languages && track.subtitle_languages.length > 0 && (
                <TabsContent value="subtitles" className="mt-6">
                  <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Available Subtitles ({track.subtitle_languages.length} languages)
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {LANGUAGE_SEQUENCE.filter((lang) =>
                        track.subtitle_languages.includes(lang)
                      ).map((language) => (
                        <AccordionItem key={language} value={language}>
                          <AccordionTrigger
                            className={`text-[#C8A75E] hover:text-white ${
                              RTL_LANGUAGES.includes(language) ? 'text-right' : ''
                            }`}
                          >
                            {language}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div
                              className={`text-[#AAB0D6] p-4 ${
                                RTL_LANGUAGES.includes(language) ? 'text-right' : ''
                              }`}
                              dir={RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr'}
                            >
                              Subtitle content for {language} would appear here
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Released:</span>
                  <span className="text-[#AAB0D6]">{track.release_date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Duration:</span>
                  <span className="text-[#AAB0D6]">{track.duration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Languages className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Primary:</span>
                  <span className="text-[#AAB0D6]">{track.language_primary}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Eye className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Views:</span>
                  <span className="text-[#AAB0D6]">{track.view_count}</span>
                </div>
              </div>

              {track.youtube_url && (
                <a
                  href={track.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-[#C8A75E]/10 border border-[#C8A75E]/30 text-[#C8A75E] rounded-lg hover:bg-[#C8A75E]/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on YouTube
                </a>
              )}
            </div>

            {track.themes && track.themes.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Connected Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {track.themes.map((theme) => (
                    <Badge
                      key={theme}
                      variant="outline"
                      className="border-[#C8A75E]/30 text-[#C8A75E]"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Format</h3>
              <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">
                {track.format_type === 'subtitle' ? 'Subtitled Version' : 'Interpretation Version'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
