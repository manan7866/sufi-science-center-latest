'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ChevronRight, Scale, FlaskConical, Leaf, HeartPulse,
  BookOpen, Globe, Building2, Shield, Compass, BarChart3, ScrollText,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

const SACRED_PROFESSION_GROUPS = [
  {
    id: 'governance-law',
    label: 'Governance & Law',
    color: '#7BAFD4',
    professions: ['Statesman', 'Administrator', 'Court Officer', 'Police Officer', 'Judge', 'Mediator'],
  },
  {
    id: 'economy-systems',
    label: 'Economy & Systems',
    color: '#C8A75E',
    professions: ['Businessman', 'Developer', 'Economist', 'Banker'],
  },
  {
    id: 'technology-science',
    label: 'Technology & Science',
    color: '#8BB89A',
    professions: ['Scientist', 'Engineer', 'Data Architect', 'AI Researcher'],
  },
  {
    id: 'ecology-stewardship',
    label: 'Ecology & Stewardship',
    color: '#A8C5A0',
    professions: ['Ecologist', 'Architect'],
  },
  {
    id: 'knowledge-transmission',
    label: 'Knowledge & Transmission',
    color: '#D4A07B',
    professions: ['Teacher', 'Student', 'Journalist', 'Filmmaker', 'Artist'],
  },
  {
    id: 'health-care',
    label: 'Health & Human Care',
    color: '#C97B84',
    professions: ['Physician', 'Social Worker', 'Caregiver', 'Parent'],
  },
  {
    id: 'security-defense',
    label: 'Security & Defense',
    color: '#9B8DC4',
    professions: ['Soldier', 'Cyber Guardian'],
  },
  {
    id: 'institutional-leadership',
    label: 'Institutional Leadership',
    color: '#B8A97A',
    professions: ['Chancellor', 'Trustee'],
  },
];

const PILLARS = [
  {
    id: 'sacred-professions',
    icon: Globe,
    label: 'Sacred Professions',
    description: 'A civilizational map of professional roles grounded in Sufi moral psychology — from statesman to scientist, physician to architect.',
    href: '/applied-civilization/sacred-professions',
    color: '#7BAFD4',
  },
  {
    id: 'professional-ethics',
    icon: Scale,
    label: 'Professional Ethics Framework',
    description: 'Systematic ethical frameworks for each profession, grounded in classical Sufi jurisprudence and moral philosophy.',
    href: '/applied-civilization/professional-ethics',
    color: '#C8A75E',
  },
  {
    id: 'institutional-governance',
    icon: Building2,
    label: 'Institutional Integrity & Governance',
    description: 'How institutions are built, maintained, and corrected through principled stewardship and transparent accountability.',
    href: '/applied-civilization/institutional-governance',
    color: '#8BB89A',
  },
  {
    id: 'alignment-assessment',
    icon: BarChart3,
    label: 'Alignment & Development Assessment',
    description: 'Reflective calibration instruments for personal alignment, professional integrity, and institutional maturity.',
    href: '/applied-civilization/alignment-assessment',
    color: '#D4A07B',
  },
  {
    id: 'research-papers',
    icon: ScrollText,
    label: 'Civilizational Research & Papers',
    description: 'Original research at the intersection of Sufi ethics, governance science, institutional design, and civilizational philosophy.',
    href: '/applied-civilization/research-papers',
    color: '#B8A97A',
  },
];

const FRAMEWORK_LAYERS = [
  {
    label: 'Vision',
    title: 'Spiritual Integrity in Public Life',
    body: 'Every profession is a domain of amplified psychological force. Power amplifies ego. Wealth amplifies attachment. Knowledge amplifies pride. Applied Civilization provides systematic frameworks for containing and redirecting these forces toward public good.',
    color: '#C8A75E',
  },
  {
    label: 'Framework',
    title: 'Ethics as Architecture, Not Ornament',
    body: 'Ethics is not supplementary to professional life — it is the structural load-bearing principle. The Applied Civilization framework integrates Sufi moral psychology with professional operational reality at every level: personal, institutional, and civilizational.',
    color: '#7BAFD4',
  },
  {
    label: 'Measurement',
    title: 'Reflective Calibration as Ongoing Practice',
    body: 'Alignment is not a destination — it is a continuous practice of self-examination against principled standards. Assessment instruments in this framework are diagnostic tools, not grading systems. The goal is clarity, not credential.',
    color: '#8BB89A',
  },
];

function ProfessionGroupCard({ group }: { group: typeof SACRED_PROFESSION_GROUPS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="border rounded-xl p-5 transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? `${group.color}35` : 'rgba(255,255,255,0.06)',
        backgroundColor: hovered ? `${group.color}06` : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-widest mb-3 transition-colors duration-200"
        style={{ color: hovered ? group.color : `${group.color}80` }}
      >
        {group.label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {group.professions.map((p) => (
          <span
            key={p}
            className="text-[11px] px-2.5 py-1 rounded-full border transition-colors duration-200"
            style={{
              borderColor: hovered ? `${group.color}30` : 'rgba(255,255,255,0.07)',
              color: hovered ? '#F5F3EE' : '#AAB0D6',
              backgroundColor: hovered ? `${group.color}08` : 'transparent',
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AppliedCivilizationPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full bg-[#C8A75E]/[0.025] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7BAFD4]/[0.03] blur-3xl" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_79px,rgba(255,255,255,0.012)_79px,rgba(255,255,255,0.012)_80px),repeating-linear-gradient(90deg,transparent,transparent_79px,rgba(255,255,255,0.012)_79px,rgba(255,255,255,0.012)_80px)]" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-[#C8A75E]/50" />
            <span className="text-[10px] font-bold text-[#C8A75E]/70 uppercase tracking-[0.25em]">
              Sufi Science Center
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-8">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F5F3EE] leading-[1.05] mb-6 max-w-4xl">
            Spiritual Integrity
            <br />
            <span className="text-[#C8A75E]">in Public Life</span>
          </h1>

          <p className="text-lg md:text-xl text-[#AAB0D6] font-light leading-relaxed mb-5 max-w-2xl">
            A civilizational ethics institute. Architecture, not inspiration.
          </p>

          <p className="text-[15px] text-[#AAB0D6]/70 leading-relaxed max-w-3xl mb-12">
            Applied Civilization maps the sacred responsibility of professional life across every domain of
            human organization — from governance and science to medicine and education — and provides
            systematic frameworks for maintaining ethical integrity within each.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/applied-civilization/sacred-professions"
              className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#08091A] font-bold px-7 py-3.5 rounded-xl hover:bg-[#D4B870] transition-colors text-sm"
            >
              Explore Sacred Professions
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/applied-civilization/alignment-assessment"
              className="inline-flex items-center gap-2 border border-[#C8A75E]/30 text-[#C8A75E] font-medium px-7 py-3.5 rounded-xl hover:bg-[#C8A75E]/8 transition-colors text-sm"
            >
              Take Alignment Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Three Core Layers */}
      <ScrollReveal>
        <section className="py-16 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6 bg-[#C8A75E]/40" />
              <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Core Architecture</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FRAMEWORK_LAYERS.map((layer) => (
                <div
                  key={layer.label}
                  className="border border-white/6 rounded-2xl p-6 bg-[#0D1025]/60"
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: layer.color }}
                  >
                    {layer.label}
                  </p>
                  <h3 className="text-base font-serif font-bold text-[#F5F3EE] leading-snug mb-3">
                    {layer.title}
                  </h3>
                  <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Sacred Professions Grid Preview */}
      <ScrollReveal>
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-[#C8A75E]/40" />
                <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Sacred Professions</p>
              </div>
              <Link
                href="/applied-civilization/sacred-professions"
                className="inline-flex items-center gap-1.5 text-xs text-[#C8A75E] hover:text-[#D4B870] transition-colors"
              >
                View Full Map
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-3 ml-9">
              Every Profession. One Framework.
            </h2>
            <p className="text-[14px] text-[#AAB0D6]/60 leading-relaxed max-w-2xl mb-10 ml-9">
              Applied Civilization provides ethical architecture for every domain of organized human activity.
              {' '}{SACRED_PROFESSION_GROUPS.reduce((n, g) => n + g.professions.length, 0)} professions across{' '}
              {SACRED_PROFESSION_GROUPS.length} domains.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SACRED_PROFESSION_GROUPS.map((group) => (
                <ProfessionGroupCard key={group.id} group={group} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/applied-civilization/sacred-professions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#C8A75E]/20 text-[#C8A75E] text-sm font-medium hover:bg-[#C8A75E]/8 transition-colors"
              >
                Explore All Sacred Professions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Navigation Pillars */}
      <ScrollReveal>
        <section className="py-20 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0C1A]/60">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6 bg-[#C8A75E]/40" />
              <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Five Pillars</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link key={pillar.id} href={pillar.href}>
                    <div
                      className="group border border-white/6 rounded-xl p-5 flex items-center gap-5 hover:border-[#C8A75E]/20 hover:bg-white/[0.015] transition-all duration-200"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:scale-105"
                        style={{ backgroundColor: `${pillar.color}12`, border: `1px solid ${pillar.color}25` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: pillar.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-snug mb-1">
                          {pillar.label}
                        </p>
                        <p className="text-[12px] text-[#AAB0D6]/55 leading-relaxed line-clamp-1">
                          {pillar.description}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#AAB0D6]/20 group-hover:text-[#C8A75E] flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Institutional Statement */}
      <ScrollReveal>
        <section className="py-20 px-4 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold text-[#C8A75E]/50 uppercase tracking-widest mb-4">
              Institutional Position
            </p>
            <blockquote className="text-2xl md:text-3xl font-serif text-[#F5F3EE] leading-relaxed mb-6">
              &ldquo;This is not a devotional website.
              <br />
              <span className="text-[#C8A75E]">It is a civilizational ethics institute.</span>&rdquo;
            </blockquote>
            <p className="text-[14px] text-[#AAB0D6]/60 leading-relaxed max-w-xl mx-auto mb-10">
              Applied Civilization operates at the intersection of inner development and public accountability.
              Its architecture is designed for practitioners, institutions, and governance actors who require
              more than inspiration — they require frameworks, instruments, and verifiable standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/applied-civilization/professional-ethics"
                className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#08091A] font-bold px-7 py-3.5 rounded-xl hover:bg-[#D4B870] transition-colors text-sm"
              >
                Professional Ethics Framework
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/applied-civilization/research-papers"
                className="inline-flex items-center gap-2 border border-white/10 text-[#AAB0D6] font-medium px-7 py-3.5 rounded-xl hover:bg-white/4 transition-colors text-sm"
              >
                Civilizational Research
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer Nav */}
      <div className="border-t border-white/5 px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            Sufi Science Center
          </Link>
          <div className="flex flex-wrap gap-4">
            {PILLARS.map((p) => (
              <Link key={p.id} href={p.href} className="text-xs text-[#AAB0D6]/50 hover:text-[#C8A75E] transition-colors">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
