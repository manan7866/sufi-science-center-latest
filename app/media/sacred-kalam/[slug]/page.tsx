'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, User, MapPin, Calendar, Languages, Eye, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  transliteration: string;
  translation: string;
  commentary: string;
  themes: string[];
  tags: string[];
  view_count: number;
}

export default function KalamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [entry, setEntry] = useState<SacredKalamEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchEntry();
    }
  }, [slug]);

  async function fetchEntry() {
    setEntry(null);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A75E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB0D6]">Loading entry...</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Entry not found</p>
          <Link href="/media/sacred-kalam" className="text-[#C8A75E] hover:underline">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }

  const isRTL = entry.script_type === 'rtl';

  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/media/sacred-kalam"
          className="inline-flex items-center text-[#C8A75E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30 mb-4">
                {entry.language}
              </Badge>
              <h1
                className={`text-3xl md:text-4xl font-light text-white mb-4 ${
                  isRTL ? 'text-right' : ''
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {entry.title}
              </h1>
              <div className="flex items-center text-[#AAB0D6] mb-6">
                <User className="w-4 h-4 mr-2" />
                <span className="text-lg">{entry.poet_name}</span>
              </div>
            </div>

            <Tabs defaultValue="original" className="w-full">
              <TabsList className="bg-[#1a1b2e]/60 border border-[#2A2F4F]/30">
                <TabsTrigger value="original">Original</TabsTrigger>
                {entry.transliteration && (
                  <TabsTrigger value="transliteration">Transliteration</TabsTrigger>
                )}
                {entry.translation && <TabsTrigger value="translation">Translation</TabsTrigger>}
              </TabsList>

              <TabsContent value="original" className="mt-6">
                <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
                  <div
                    className={`text-[#AAB0D6] text-lg leading-loose whitespace-pre-wrap ${
                      isRTL ? 'text-right' : ''
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {entry.original_text}
                  </div>
                </div>
              </TabsContent>

              {entry.transliteration && (
                <TabsContent value="transliteration" className="mt-6">
                  <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
                    <div className="text-[#AAB0D6] text-lg leading-loose whitespace-pre-wrap">
                      {entry.transliteration}
                    </div>
                  </div>
                </TabsContent>
              )}

              {entry.translation && (
                <TabsContent value="translation" className="mt-6">
                  <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
                    <div className="text-[#AAB0D6] text-lg leading-loose whitespace-pre-wrap">
                      {entry.translation}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>

            {entry.commentary && (
              <div className="mt-8">
                <h2 className="text-2xl font-light text-white mb-6">Scholarly Commentary</h2>
                <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="metaphorical">
                      <AccordionTrigger className="text-[#C8A75E] hover:text-white text-left">
                        Metaphorical Structure
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[#AAB0D6] leading-relaxed">
                          {entry.commentary.split('\n\n')[0] || 'Analysis of metaphorical elements...'}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="spiritual">
                      <AccordionTrigger className="text-[#C8A75E] hover:text-white text-left">
                        Spiritual Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[#AAB0D6] leading-relaxed">
                          {entry.commentary.split('\n\n')[1] || 'Spiritual and mystical context...'}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="psychological">
                      <AccordionTrigger className="text-[#C8A75E] hover:text-white text-left">
                        Psychological Insight
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[#AAB0D6] leading-relaxed">
                          {entry.commentary.split('\n\n')[2] || 'Psychological dimensions and implications...'}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="historical">
                      <AccordionTrigger className="text-[#C8A75E] hover:text-white text-left">
                        Historical Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[#AAB0D6] leading-relaxed">
                          {entry.commentary.split('\n\n')[3] || 'Historical background and significance...'}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Poet:</span>
                  <span className="text-[#AAB0D6]">{entry.poet_name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Region:</span>
                  <span className="text-[#AAB0D6]">{entry.region || 'Unknown'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Era:</span>
                  <span className="text-[#AAB0D6]">{entry.era || 'Unknown'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Languages className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Language:</span>
                  <span className="text-[#AAB0D6]">{entry.language}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Script:</span>
                  <span className="text-[#AAB0D6]">{isRTL ? 'Right-to-Left' : 'Left-to-Right'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Eye className="w-4 h-4 text-[#C8A75E] mr-3" />
                  <span className="text-[#AAB0D6]/60 mr-2">Views:</span>
                  <span className="text-[#AAB0D6]">{entry.view_count}</span>
                </div>
              </div>
            </div>

            {entry.themes && entry.themes.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Connected Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.themes.map((theme) => (
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

            {entry.tags && entry.tags.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#2A2F4F]/50 text-[#AAB0D6] border-[#2A2F4F]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Available Formats</h3>
              <div className="space-y-2 text-sm text-[#AAB0D6]/80">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-2" />
                  Original Text
                </div>
                {entry.transliteration && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-2" />
                    Transliteration
                  </div>
                )}
                {entry.translation && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-2" />
                    Translation
                  </div>
                )}
                {entry.commentary && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-2" />
                    Commentary
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
