import Link from 'next/link';
import { Music, BookText } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';

export const metadata = {
  title: 'Media - Sufi Science Center',
  description: 'Exploring Sufi consciousness through sonic and literary expressions',
};

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Sonic and Literary Transmission"
        title="Media and Expression"
        description="The artistic articulation of Sufi consciousness through sound, language, and contemplative interpretation."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
          <Link href="/media/sufipulse" className="group">
            <div className="relative h-auto min-h-[550px] bg-gradient-to-br from-[#1a1b2e]/80 to-[#16213e]/80 backdrop-blur-xl border border-[#2A2F4F]/50 rounded-2xl p-8 hover:border-[#C8A75E]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Music className="w-10 h-10 text-[#C8A75E]" />
                  </div>

                  <h2 className="text-3xl font-light text-white mb-4 group-hover:text-[#C8A75E] transition-colors duration-300">
                    SufiPulse Studio
                  </h2>

                  <p className="text-lg text-[#C8A75E]/80 mb-6">
                    Sonic Expressions of Inner Science
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-[#AAB0D6] leading-relaxed mb-6">
                    Exploring Sufi consciousness through multilingual musical composition and interpretive reflection. Each piece serves as a sonic gateway to contemplative states and inner transformation.
                  </p>

                  <div className="space-y-3 text-sm text-[#AAB0D6]/80">
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      17 languages with structured subtitles
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      Interpretive reflections and thematic analysis
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      Connected to knowledge systems
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 mt-6 pt-4 border-t border-[#2A2F4F]/30">
                  <div className="inline-flex items-center text-[#C8A75E] group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Explore Studio</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/media/sacred-kalam" className="group">
            <div className="relative h-auto min-h-[550px] bg-gradient-to-br from-[#1a1b2e]/80 to-[#16213e]/80 backdrop-blur-xl border border-[#2A2F4F]/50 rounded-2xl p-8 hover:border-[#C8A75E]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <BookText className="w-10 h-10 text-[#C8A75E]" />
                  </div>

                  <h2 className="text-3xl font-light text-white mb-4 group-hover:text-[#C8A75E] transition-colors duration-300">
                    Sacred Kalam Library
                  </h2>

                  <p className="text-lg text-[#C8A75E]/80 mb-6">
                    A Living Archive of Divine Poetry
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-[#AAB0D6] leading-relaxed mb-6">
                    A curated and evolving repository of sacred poetic expression across cultures and languages. Each work is presented with scholarly context, connecting literary beauty to spiritual insight.
                  </p>

                  <div className="space-y-3 text-sm text-[#AAB0D6]/80">
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      25+ languages with RTL/LTR support
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      Original text, transliteration, translation
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3" />
                      Scholarly commentary and thematic connections
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 mt-6 pt-4 border-t border-[#2A2F4F]/30">
                  <div className="inline-flex items-center text-[#C8A75E] group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Explore Library</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

          <div className="mt-16 text-center">
            <p className="text-[#AAB0D6]/60 text-sm">
              Both expressions serve as contemplative gateways, integrating artistic beauty with rigorous intellectual inquiry
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
