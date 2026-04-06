'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen, ArrowLeft, Download, Share2, Clock, Calendar, Users, Loader2
} from 'lucide-react';

export default function TranscriptPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  if (!series) {
    notFound();
  }

  const totalDuration = episodes.reduce((sum: number, ep: any) => sum + (ep.duration_minutes || 0), 0) || 0;
  const publishedDate = new Date(series.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const hasTranscripts = episodes.some((ep: any) => ep.transcript);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href={`/dialogues/series/${series.slug}`}>
          <Button variant="ghost" className="mb-8 text-[#AAB0D6] hover:text-[#C8A75E]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Series
          </Button>
        </Link>

        <div className="glass-panel rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">
                Transcript
              </Badge>
              {series.difficulty_level && (
                <Badge variant="outline" className="border-[#AAB0D6]/30 text-[#AAB0D6] capitalize">
                  {series.difficulty_level}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold text-[#F5F3EE] mb-3">{series.title}</h1>
            {series.subtitle && (
              <p className="text-xl text-[#C8A75E] mb-4">{series.subtitle}</p>
            )}
            <p className="text-[#AAB0D6] leading-relaxed">{series.description}</p>
          </div>

          <Separator className="bg-white/10 my-6" />

          <div className="flex items-center gap-6 text-sm text-[#AAB0D6] flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C8A75E]" />
              <span>{episodes.length} Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C8A75E]" />
              <span>~{totalDuration} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C8A75E]" />
              <span>{publishedDate}</span>
            </div>
          </div>

          {series.participants && series.participants.length > 0 && (
            <>
              <Separator className="bg-white/10 my-6" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#C8A75E]" />
                  <span className="text-sm font-semibold text-[#AAB0D6] uppercase tracking-wide">
                    Participants
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {series.participants.map((participant: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="border-[#C8A75E]/30 text-[#F5F3EE]">
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator className="bg-white/10 my-6" />

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-[#AAB0D6]/30 text-[#AAB0D6]">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="border-[#AAB0D6]/30 text-[#AAB0D6]">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {!hasTranscripts && (
          <Card className="glass-panel border-[#C8A75E]/30 bg-[#C8A75E]/5 mb-8">
            <CardContent className="pt-6">
              <p className="text-[#AAB0D6] text-center">
                Transcripts are currently being prepared and will be available soon.
                Please check back or subscribe to updates.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-12">
          {episodes.map((episode: any, idx: number) => (
            <div key={episode.id} id={`episode-${episode.episode_number}`}>
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#C8A75E]/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#C8A75E]">{episode.episode_number}</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30 mb-2">
                        Episode {episode.episode_number}
                      </Badge>
                      <CardTitle className="text-2xl text-[#F5F3EE] mb-2">
                        {episode.title}
                      </CardTitle>
                      <p className="text-[#AAB0D6]">{episode.description}</p>
                      {episode.duration_minutes && (
                        <p className="text-sm text-[#AAB0D6] mt-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          ~{episode.duration_minutes} min read
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {episode.transcript ? (
                  <CardContent className="pt-6">
                    <div className="prose prose-invert prose-lg max-w-none">
                      <div className="text-[#F5F3EE] leading-relaxed space-y-6 whitespace-pre-wrap">
                        {episode.transcript}
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="pt-6">
                    <div className="bg-[#AAB0D6]/5 rounded-lg p-6 text-center">
                      <BookOpen className="w-12 h-12 text-[#AAB0D6] mx-auto mb-3 opacity-50" />
                      <p className="text-[#AAB0D6] italic">
                        Transcript for this episode is being prepared and will be available soon.
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>

              {idx < episodes.length - 1 && (
                <div className="flex items-center justify-center my-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#C8A75E]/50 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/dialogues/series/${series.slug}`}>
            <Button variant="outline" size="lg" className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Series Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
