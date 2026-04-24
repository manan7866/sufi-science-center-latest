'use client';

import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import {
  Users,
  GitBranch,
  Clock,
  Globe,
  Lightbulb,
  ArrowRight,
  Library,
  BookOpen,
} from 'lucide-react';

const DIMENSIONS = [
  {
    icon: GitBranch,
    title: 'Lineage',
    arabic: 'Silsila',
    description:
      'The unbroken chain of transmission from master to disciple. Each order traces its spiritual genealogy to the Prophet through specific chains that define its method, emphasis, and authority.',
  },
  {
    icon: Globe,
    title: 'Region',
    arabic: 'Mintaqa',
    description:
      'The civilizational geography of Sufism — from the Arabian Peninsula and Persia to Central Asia, the Indian Subcontinent, Anatolia, North Africa, and Al-Andalus. Geography shaped practice, language, and cultural expression.',
  },
  {
    icon: Clock,
    title: 'Era',
    arabic: 'Asr',
    description:
      'Seven historical periods from the Prophetic transmission through the age of reform and modernity. Each era represents a distinct phase in the intellectual and institutional development of Islamic mysticism.',
  },
  {
    icon: Lightbulb,
    title: 'Theme',
    arabic: 'Mawdhu',
    description:
      'Thirty-one scholarly themes organized into six clusters — metaphysical, psychological, devotional, transmission, intellectual, and civilizational. Themes reveal the doctrinal and practical concerns of each master.',
  },
];

const ENTRY_PAGES = [
  {
    href: '/foundations/masters-of-the-path',
    icon: Users,
    label: 'Masters of the Path',
    description:
      'The primary archive. Browse all documented Sufi masters with full filter control across lineage, region, era, and theme. Switch between grid, timeline, and atlas views.',
    accent: '#C8A75E',
  },
  {
    href: '/foundations/lineages',
    icon: GitBranch,
    label: 'Lineages & Orders',
    description:
      'Structured catalogue of the major Sufi orders and their sub-branches. Select any lineage to enter the archive with that lineage pre-filtered.',
    accent: '#7BAFD4',
  },
  {
    href: '/foundations/periods',
    icon: Clock,
    label: 'Historical Periods',
    description:
      'The seven eras of Sufi intellectual history — from prophetic transmission to modern rearticulation. Select any period to enter the archive filtered by that era.',
    accent: '#8BB89A',
  },
  {
    href: '/foundations/regions',
    icon: Globe,
    label: 'Civilizational Regions',
    description:
      'The geographic spread of Sufi civilization across the Islamic world. Select any region to enter the archive filtered by that geography.',
    accent: '#D4A07B',
  },
  {
    href: '/foundations/themes',
    icon: Lightbulb,
    label: 'Core Themes',
    description:
      'Thirty-one scholarly themes grouped into six conceptual clusters. Select any theme to enter the archive filtered by doctrinal or practical focus.',
    accent: '#A07BD4',
  },
];

export default function FoundationsOverviewPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Civilizational Archive"
        description="A structured digital archive of Sufi intellectual history — organized by master, lineage, region, era, and theme. Five entry points, one unified archive engine."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          {/* Introductory Summary */}
          <ScrollReveal>
            <div className="sm:flex flex-col items-center gap-4  mb-20">
              <div className="flex items-center gap-3 mb-6">
                <Library className="h-5 w-5 text-[#C8A75E]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C8A75E]">
                  Archive Scope
                </span>
              </div>
              <p className="text-lg text-[#D4CFC6] sm:text-center leading-relaxed mb-4 max-w-3xl">
                Foundational Studies documents the lives, lineages, and intellectual contributions of Sufi masters across fourteen centuries of Islamic civilization. The archive spans the Arabian Peninsula, Persia, Central Asia, South Asia, Anatolia, North Africa, Al-Andalus, and beyond.
              </p>
              <p className="text-base text-[#AAB0D6] sm:text-center leading-relaxed max-w-3xl">
                Every entry is classified across four orthogonal dimensions — lineage, region, era, and theme — enabling precise cross-referential navigation. The archive is designed for scholars, researchers, and serious students of Islamic intellectual history.
              </p>
            </div>
          </ScrollReveal>

          {/* Four Classification Dimensions */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-center font-serif font-semibold text-[#F5F3EE] mb-2">
                  Classification Dimensions
                </h2>
                <p className="text-sm sm:text-center text-[#AAB0D6]">
                  Four orthogonal axes used to organize every master in the archive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DIMENSIONS.map((dim) => {
                  const Icon = dim.icon;
                  return (
                    <div
                      key={dim.title}
                      className="glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-6 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-5 w-5 text-[#C8A75E]" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <h3 className="text-base font-semibold text-[#F5F3EE]">{dim.title}</h3>
                            <span className="text-xs text-[#AAB0D6]/60 font-light italic">{dim.arabic}</span>
                          </div>
                          <p className="text-sm text-[#AAB0D6] leading-relaxed">{dim.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Heritage Gateway */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">
                  Heritage Archives
                </h2>
                <p className="text-sm text-[#AAB0D6]">
                  Two dedicated archives covering distinct dimensions of Islamic civilizational legacy
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/foundations/intellectual-heritage"
                  className="group flex flex-col gap-4 glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-6 hover:border-[rgba(200,167,94,0.25)] transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-[#C8A75E]" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors duration-200 mb-2">
                      Intellectual Heritage
                    </h3>
                    <p className="text-sm text-[#AAB0D6] leading-relaxed">
                      Documented contributions across science, mathematics, philosophy, medicine, and institutional knowledge. 7th to 21st century.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['Mathematics', 'Medicine', 'Astronomy', 'Philosophy', 'Sociology'].map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full text-[10px] text-[#AAB0D6]/50 border border-white/8 bg-white/3"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </Link>

                <Link
                  href="/foundations/spiritual-heritage"
                  className="group flex flex-col gap-4 glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-6 hover:border-[rgba(123,175,212,0.25)] transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#7BAFD4]/10 border border-[#7BAFD4]/20 flex items-center justify-center flex-shrink-0">
                      <GitBranch className="h-5 w-5 text-[#7BAFD4]" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#AAB0D6]/30 group-hover:text-[#7BAFD4] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#F5F3EE] group-hover:text-[#7BAFD4] transition-colors duration-200 mb-2">
                      Spiritual Heritage
                    </h3>
                    <p className="text-sm text-[#AAB0D6] leading-relaxed">
                      Sufi lineages, methodologies, and inner knowledge systems. Principal transmitters of the contemplative tradition across fourteen centuries.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['Qadiriyya', 'Naqshbandiyya', 'Chishtiyya', 'Mevleviyya', 'Shadhiliyya'].map((o) => (
                      <span
                        key={o}
                        className="px-2 py-0.5 rounded-full text-[10px] text-[#AAB0D6]/50 border border-white/8 bg-white/3"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Entry Points */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">
                  Archive Entry Points
                </h2>
                <p className="text-sm text-[#AAB0D6]">
                  Five structured routes into the same unified archive engine
                </p>
              </div>

              <div className="space-y-4">
                {ENTRY_PAGES.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className="flex items-start gap-5 glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-6 group hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
                    >
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200"
                        style={{
                          backgroundColor: `${entry.accent}15`,
                          border: `1px solid ${entry.accent}30`,
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: entry.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-base font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors duration-200">
                            {entry.label}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-[#AAB0D6]/40 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-[#AAB0D6] leading-relaxed mt-1">
                          {entry.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
