'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen, Calendar, Users, Clock, PlayCircle,
  Lightbulb, MessageCircle, ArrowRight, ArrowLeft, ChevronRight, Loader2
} from 'lucide-react';

export default function SeriesDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const res = await fetch(`/api/dialogues/series/${slug}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        setSeries(data.series);
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error('Failed to fetch series:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  if (!series) {
    notFound();
  }

  const totalDuration = episodes.reduce((sum: number, ep: any) => sum + (ep.duration_minutes || 0), 0) || series.total_duration_minutes || 0;
  const publishedDate = new Date(series.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Dialogic Inquiry Series"
        title={series.title}
        description={series.subtitle || series.description}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/dialogues/series" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Series
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <Badge variant="outline" className="border-[#C8A75E]/30 text-[#C8A75E]">
                  {series.type || 'Exploration'}
                </Badge>
                {series.difficulty_level && (
                  <Badge variant="outline" className="border-[#AAB0D6]/30 text-[#AAB0D6] capitalize">
                    {series.difficulty_level}
                  </Badge>
                )}
                {series.is_featured && (
                  <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">
                    Featured
                  </Badge>
                )}
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-8 text-sm text-[#AAB0D6] mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                    <span>{series.total_episodes || episodes.length} Episodes</span>
                  </div>
                  {totalDuration > 0 && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#C8A75E]" />
                      <span>~{totalDuration} min total</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#C8A75E]" />
                    <span>{publishedDate}</span>
                  </div>
                </div>

                <p className="text-[#F5F3EE] text-lg leading-relaxed">
                  {series.description}
                </p>
              </div>

              {series.participants && series.participants.length > 0 && (
                <Card className="glass-panel border-white/10 mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#F5F3EE] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#C8A75E]" />
                      Series Participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {series.participants.map((participant: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#C8A75E]" />
                          <p className="text-[#F5F3EE]">{participant}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#C8A75E]" />
                Episodes
              </h2>

              {episodes.length > 0 ? (
                <div className="space-y-6">
                  {episodes.map((episode: any) => (
                    <Card key={episode.id} className="glass-panel border-white/10 hover:border-[#C8A75E]/30 transition-all group">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">
                                Episode {episode.episode_number}
                              </Badge>
                              {episode.duration_minutes && (
                                <span className="text-sm text-[#AAB0D6] flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {episode.duration_minutes} min
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-xl text-[#F5F3EE] mb-2">
                              {episode.title}
                            </CardTitle>
                            <CardDescription className="text-[#AAB0D6]">
                              {episode.description}
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10"
                            onClick={() => router.push(`/dialogues/series/${series.slug}/transcript?episode=${episode.slug}`)}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read Transcript
                          </Button>
                        </div>
                      </CardHeader>

                      {(episode.key_questions?.length > 0 || episode.key_insights?.length > 0) && (
                        <CardContent className="space-y-4">
                          {episode.key_questions?.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-[#C8A75E] mb-2 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Key Questions
                              </h4>
                              <ul className="space-y-2">
                                {episode.key_questions.slice(0, 2).map((question: string, idx: number) => (
                                  <li key={idx} className="text-sm text-[#AAB0D6] flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C8A75E]" />
                                    <span>{question}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {episode.key_insights?.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-[#C8A75E] mb-2 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" />
                                Key Insights
                              </h4>
                              <ul className="space-y-2">
                                {episode.key_insights.slice(0, 2).map((insight: string, idx: number) => (
                                  <li key={idx} className="text-sm text-[#AAB0D6] flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C8A75E]" />
                                    <span>{insight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-panel rounded-xl border-white/5">
                  <p className="text-[#AAB0D6]/60">Episodes will be available soon.</p>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <Card className="glass-panel border-white/10 bg-[#C8A75E]/5">
              <CardHeader>
                <CardTitle className="text-lg text-[#F5F3EE]">Access Format</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#AAB0D6] mb-3">
                    Currently available as written transcripts for deep reflection and study.
                  </p>
                  <Button 
                    className="w-full bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0A0A0F]"
                    onClick={() => router.push(`/dialogues/series/${series.slug}/transcript`)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Transcripts
                  </Button>
                </div>
                <Separator className="bg-white/10" />
                <p className="text-xs text-[#AAB0D6] italic">
                  Audio and video formats coming soon to provide multiple ways to engage with these dialogues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
