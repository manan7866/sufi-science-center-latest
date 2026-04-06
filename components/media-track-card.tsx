'use client';

import Link from 'next/link';
import { Music, Clock, Eye, Share2, Download, Play } from 'lucide-react';

interface MediaTrackCardProps {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  releaseDate: string;
  languagePrimary: string;
  subtitleLanguages: string[];
  formatType: 'subtitle' | 'interpretation';
  themes: string[];
  viewCount?: number;
}

export function MediaTrackCard({
  slug,
  title,
  description,
  thumbnailUrl,
  duration,
  releaseDate,
  languagePrimary,
  subtitleLanguages,
  formatType,
  themes,
  viewCount = 0,
}: MediaTrackCardProps) {
  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-2xl overflow-hidden hover:border-[#C8A75E]/50 transition-all duration-300">
      <Link href={`/media/sufipulse/song/${slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2A2F4F]/50 to-[#1a1b2e]/50 flex items-center justify-center">
              <Music className="w-16 h-16 text-[#C8A75E]/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#16a085] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <div className="bg-[#16a085] text-white px-3 py-1 rounded-lg text-sm font-medium">
              Play Now
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/media/sufipulse/song/${slug}`}>
          <h3 className="text-lg font-medium text-[#16a085] mb-3 hover:text-[#16a085]/80 transition-colors line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
        </Link>

        <div className="mb-3">
          <p className="text-sm text-[#AAB0D6]/70">
            by SufiPulse Studio | Dr Kumar Foundation USA
          </p>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-[#AAB0D6]/70">
            <Eye className="w-4 h-4" />
            <span>{formatViewCount(viewCount)}</span>
          </div>
        </div>

        <div className="text-sm text-[#AAB0D6]/60 mb-4">
          Uploaded: {releaseDate}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#2A2F4F]/30">
          <button className="text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
