'use client';

import Link from 'next/link';
import { BookText, User, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SacredKalamCardProps {
  slug: string;
  title: string;
  poetName: string;
  region: string;
  era: string;
  language: string;
  scriptType: 'rtl' | 'ltr';
  themes: string[];
  originalText: string;
}

export function SacredKalamCard({
  slug,
  title,
  poetName,
  region,
  era,
  language,
  scriptType,
  themes,
  originalText,
}: SacredKalamCardProps) {
  const excerpt = originalText.slice(0, 150) + (originalText.length > 150 ? '...' : '');

  return (
    <Link href={`/media/sacred-kalam/${slug}`} className="group">
      <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6 hover:border-[#C8A75E]/50 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookText className="w-6 h-6 text-[#C8A75E]" />
          </div>
          <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30 text-xs">
            {language}
          </Badge>
        </div>

        <h3
          className={`text-xl font-medium text-white mb-2 group-hover:text-[#C8A75E] transition-colors line-clamp-2 ${
            scriptType === 'rtl' ? 'text-right' : ''
          }`}
          dir={scriptType}
        >
          {title}
        </h3>

        <div className="flex items-center text-sm text-[#AAB0D6]/80 mb-4">
          <User className="w-3 h-3 mr-1.5" />
          {poetName}
        </div>

        <div
          className={`text-sm text-[#AAB0D6]/60 mb-4 line-clamp-3 leading-relaxed ${
            scriptType === 'rtl' ? 'text-right' : ''
          }`}
          dir={scriptType}
        >
          {excerpt}
        </div>

        <div className="mt-auto pt-4 border-t border-[#2A2F4F]/50">
          <div className="flex flex-wrap gap-2 mb-3">
            {themes.slice(0, 3).map((theme) => (
              <Badge
                key={theme}
                variant="outline"
                className="text-xs border-[#C8A75E]/30 text-[#C8A75E]"
              >
                {theme}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#AAB0D6]/60">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {region || 'Unknown'}
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {era || 'Unknown'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
