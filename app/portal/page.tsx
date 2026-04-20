'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePortalSession } from '@/hooks/use-portal-session';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PortalMetricCard } from '@/components/portal/portal-metric-card';
import { SurahProgressTracker } from '@/components/portal/surah-progress-tracker';
import { ActivityTimeline } from '@/components/portal/activity-timeline';
import { ReflectionPanel } from '@/components/portal/reflection-panel';
import { ReflectionJournalModal } from '@/components/portal/reflection-journal-modal';
import {
  LayoutDashboard, BookOpen, Brain, Layers, ChevronRight,
  ArrowRight, Users, FlaskConical, HandHeart, Scroll,
  Compass, Star, Clock
} from 'lucide-react';

interface RecentSurah {
  surah_number: number;
  arabic_name: string;
  english_name: string;
  structural_axis: string;
}

const MODULES = [
  { label: 'Stations of the Path', href: '/foundations/stations-of-the-path', area: 'Foundations' },
  { label: 'Inner Development Stages', href: '/inner-development/stages', area: 'Inner Development' },
  { label: 'Wazeefia Practice', href: '/inner-development/wazeefia', area: 'Inner Development' },
  { label: 'Master Seeker', href: '/inner-development/master-seeker', area: 'Inner Development' },
  { label: 'Epistemology', href: '/knowledge-systems/epistemology', area: 'Knowledge Systems' },
  { label: 'Consciousness Systems', href: '/knowledge-systems/consciousness-systems', area: 'Knowledge Systems' },
  { label: 'Comparative Dialogue', href: '/dialogues/series', area: 'Dialogues' },
  { label: 'Sufi Chain Adoption', href: '/inner-development/sufi-chain-adoption', area: 'Inner Development' },
  { label: 'Emotional Intelligence', href: '/inner-development/emotional', area: 'Inner Development' },
  { label: 'Applied Practices', href: '/dialogues/applied-practices', area: 'Dialogues' },
  { label: 'Scripture Commentary', href: '/interfaith-coherence/scripture-commentary', area: 'Interfaith' },
  { label: 'Mentorship Programme', href: '/inner-development/mentorship', area: 'Inner Development' },
];

const RECOMMENDATIONS = [
  {
    label: 'Surah Al-Fatiha',
    sub: 'The Opening: Dependence and Guidance',
    href: '/interfaith-coherence/scripture-commentary/surah/1',
    icon: BookOpen,
    accent: '#C8A75E',
    tag: 'Surah of the Week',
  },
  {
    label: 'Stations of the Path',
    sub: 'Structured developmental framework for the Sufi path',
    href: '/foundations/stations-of-the-path',
    icon: Compass,
    accent: '#6B9BD1',
    tag: 'Suggested Study',
  },
  {
    label: 'Hard Inquiry Sessions',
    sub: 'Rigorous intellectual engagement with foundational questions',
    href: '/dialogues/hard-inquiry',
    icon: FlaskConical,
    accent: '#27AE60',
    tag: 'Dialogue Module',
  },
];

export default function PortalPage() {
  const {
    session,
    profile,
    surahViews,
    reflections,
    activityEvents,
    loading,
    saveReflection,
    logActivity,
    saveModules,
  } = usePortalSession();

  const [recentSurahs, setRecentSurahs] = useState<RecentSurah[]>([]);
  const [journalOpen, setJournalOpen] = useState<number | null>(null);
  const [journalSurahName, setJournalSurahName] = useState('');
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading) {
      if (profile.completedModules && profile.completedModules.length > 0) {
        setCompletedModules(new Set(profile.completedModules));
      } else {
        const stored = localStorage.getItem('ssc_completed_modules');
        if (stored) setCompletedModules(new Set(JSON.parse(stored)));
      }
    }
  }, [loading, profile.completedModules]);

  const loadedSurahNumbers = useRef<string>('');

  useEffect(() => {
    if (surahViews.length === 0) return;
    const recentNumbers = surahViews.slice(0, 6).map((v) => v.surahNumber);
    const key = recentNumbers.join(',');
    if (key === loadedSurahNumbers.current) return;
    loadedSurahNumbers.current = key;

    fetch(`/api/surah-commentary?numbers=${recentNumbers.join(',')}`)
      .then((r) => r.json())
      .then(({ surahs }: { surahs: RecentSurah[] }) => {
        if (surahs) {
          const ordered = recentNumbers.map((n) => surahs.find((s) => s.surah_number === n)).filter(Boolean) as RecentSurah[];
          setRecentSurahs(ordered);
        }
      });
  }, [surahViews]);

  function toggleModule(label: string) {
    setCompletedModules((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
        logActivity('started_module', `Marked module as active: ${label}`);
      }
      const modules = Array.from(next);
      localStorage.setItem('ssc_completed_modules', JSON.stringify(modules));
      saveModules(modules);
      return next;
    });
  }

  function openJournal(surahNumber: number) {
    const surahName = recentSurahs.find((s) => s.surah_number === surahNumber)?.arabic_name || `Surah ${surahNumber}`;
    setJournalSurahName(surahName);
    setJournalOpen(surahNumber);
  }

  const totalModules = MODULES.length;
  const doneModules = completedModules.size;
  const assessmentStage = session?.assessmentStage || 'Not Yet Assessed';
  const currentFocus = session?.currentFocus || (surahViews.length > 0 ? 'Qur\'anic Thematic Commentary' : 'Awaiting first engagement');

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#AAB0D6]">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <div className="relative pt-10 pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/5 via-transparent to-[#6B9BD1]/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 mt-12 rounded-2xl bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0 border border-[#C8A75E]/20">
              <LayoutDashboard className="w-6 h-6  text-[#C8A75E]" />
            </div>
            <div className="flex-1 ">
              <div className="flex items-center justify-end pr-4 mb-2">
                <Link href="/" className="inline-flex mb-2 items-center  gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-lg rotate-180" />
                  Back to Website
                </Link>
              </div>
              <p className="text-xs tracking-[0.2em] text-[#C8A75E]/70 uppercase mb-1">Sufi Science Center</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight">
                My Development Portal
              </h1>
              <p className="text-[#AAB0D6] mt-3 max-w-xl leading-relaxed">
                Track your progress, explore personalized pathways, and deepen your engagement
                with the intellectual and spiritual resources of the Sufi Science Center.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-14">

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Development Snapshot</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <PortalMetricCard
                icon={Brain}
                label="Assessment Stage"
                value={assessmentStage}
                sub="Based on last completed assessment"
                accent="#6B9BD1"
              />
              <PortalMetricCard
                icon={Layers}
                label="Modules Active"
                value={`${doneModules} of ${totalModules}`}
                sub="Mark modules below to track engagement"
                accent="#C8A75E"
              />
              <PortalMetricCard
                icon={Compass}
                label="Current Study Focus"
                value={currentFocus}
                sub={surahViews.length > 0 ? `${surahViews.length} Surahs explored` : 'Begin with a Surah or assessment'}
                accent="#27AE60"
              />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Continue Your Journey</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
              <p className="text-sm text-[#AAB0D6] mb-4">
                {surahViews.length > 0 || doneModules > 0
                  ? 'Resume your active areas of study:'
                  : 'Begin your development journey with one of these starting points:'}
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/assessment/take">
                  <div className="group p-4 rounded-xl bg-[#6B9BD1]/8 border border-[#6B9BD1]/20 hover:border-[#6B9BD1]/40 hover:bg-[#6B9BD1]/12 transition-all cursor-pointer">
                    <Brain className="w-5 h-5 text-[#6B9BD1] mb-2" />
                    <p className="text-sm font-semibold text-[#F5F3EE]">
                      {assessmentStage === 'Not Yet Assessed' ? 'Take Assessment' : 'Resume Assessment'}
                    </p>
                    <p className="text-xs text-[#AAB0D6] mt-0.5">Diagnostic development profile</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#6B9BD1] group-hover:gap-2 transition-all">
                      Begin <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
                <Link href="/interfaith-coherence/scripture-commentary">
                  <div className="group p-4 rounded-xl bg-[#C8A75E]/8 border border-[#C8A75E]/20 hover:border-[#C8A75E]/40 hover:bg-[#C8A75E]/12 transition-all cursor-pointer">
                    <BookOpen className="w-5 h-5 text-[#C8A75E] mb-2" />
                    <p className="text-sm font-semibold text-[#F5F3EE]">
                      {surahViews.length > 0 ? 'Continue Commentary' : 'Start Surah Commentary'}
                    </p>
                    <p className="text-xs text-[#AAB0D6] mt-0.5">
                      {surahViews.length > 0 ? `${surahViews.length} explored` : '114 Surahs, Sufi metaphysical lens'}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#C8A75E] group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
                <Link href="/inner-development">
                  <div className="group p-4 rounded-xl bg-[#27AE60]/8 border border-[#27AE60]/20 hover:border-[#27AE60]/40 hover:bg-[#27AE60]/12 transition-all cursor-pointer">
                    <Scroll className="w-5 h-5 text-[#27AE60] mb-2" />
                    <p className="text-sm font-semibold text-[#F5F3EE]">Inner Development</p>
                    <p className="text-xs text-[#AAB0D6] mt-0.5">Stages, practices, and pathways</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#27AE60] group-hover:gap-2 transition-all">
                      Enter <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Recommended Study</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {RECOMMENDATIONS.map((rec) => {
                const Icon = rec.icon;
                return (
                  <Link key={rec.label} href={rec.href}>
                    <div
                      className="group glass-panel rounded-xl p-5 border border-white/5 hover:border-white/15 transition-all cursor-pointer h-full flex flex-col"
                      style={{ '--accent': rec.accent } as React.CSSProperties}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border tracking-wider uppercase font-medium"
                          style={{ color: rec.accent, borderColor: `${rec.accent}35`, background: `${rec.accent}12` }}
                        >
                          {rec.tag}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#AAB0D6]/25 group-hover:text-[#C8A75E] transition-colors" />
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${rec.accent}15` }}>
                        <Icon className="w-4 h-4" style={{ color: rec.accent }} />
                      </div>
                      <p className="text-sm font-serif font-semibold text-[#F5F3EE] mb-1">{rec.label}</p>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed flex-1">{rec.sub}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Scripture Engagement Tracker</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <SurahProgressTracker viewedNumbers={surahViews.map((v) => v.surahNumber)} />

              {recentSurahs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest mb-3">Recently Explored</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {recentSurahs.map((s) => (
                      <Link
                        key={s.surah_number}
                        href={`/interfaith-coherence/scripture-commentary/surah/${s.surah_number}`}
                      >
                        <div className="group flex items-center gap-3 p-3 rounded-lg bg-white/2 hover:bg-[#C8A75E]/5 border border-transparent hover:border-[#C8A75E]/20 transition-all">
                          <div className="w-7 h-7 rounded-md bg-[#C8A75E]/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-[#C8A75E]">{s.surah_number}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#F5F3EE] truncate">{s.arabic_name}</p>
                            <p className="text-[10px] text-[#AAB0D6]/50 truncate">{s.structural_axis}</p>
                          </div>
                          <ChevronRight className="w-3 h-3 text-[#AAB0D6]/20 group-hover:text-[#C8A75E] transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-2 mb-5">
                <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Intellectual Growth Timeline</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <ActivityTimeline events={activityEvents} />
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section>
              <div className="flex items-center gap-2 mb-5">
                <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Reflection Journal</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <ReflectionPanel
                  reflections={reflections}
                  onOpenJournal={openJournal}
                />
              </div>
            </section>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Module Engagement Tracker</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <p className="text-xs text-[#AAB0D6]/50 mb-4">
                Mark modules you have engaged with. This helps you track breadth of study across the curriculum.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {MODULES.map((mod) => {
                  const done = completedModules.has(mod.label);
                  return (
                    <button
                      key={mod.label}
                      onClick={() => toggleModule(mod.label)}
                      className={`group text-left p-3 rounded-xl border transition-all ${
                        done
                          ? 'bg-[#C8A75E]/8 border-[#C8A75E]/25'
                          : 'bg-white/2 border-white/5 hover:border-white/15 hover:bg-white/4'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-semibold transition-colors ${done ? 'text-[#C8A75E]' : 'text-[#AAB0D6] group-hover:text-[#F5F3EE]'}`}>
                          {mod.label}
                        </p>
                        <div className={`w-3 h-3 rounded-full border flex-shrink-0 transition-all ${
                          done ? 'bg-[#C8A75E] border-[#C8A75E]' : 'border-white/20'
                        }`} />
                      </div>
                      <p className="text-[10px] text-[#AAB0D6]/40 mt-0.5">{mod.area}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-[#AAB0D6]/40">
                  {doneModules} of {totalModules} modules marked as active
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C8A75E] rounded-full transition-all"
                      style={{ width: `${(doneModules / totalModules) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#C8A75E]">{Math.round((doneModules / totalModules) * 100)}%</span>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xs tracking-[0.15em] text-[#AAB0D6]/50 uppercase">Governance and Contribution</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: HandHeart, label: 'Volunteer', sub: 'Contribute to our institutional programmes', href: '/institute/volunteer', accent: '#C8A75E' },
                { icon: FlaskConical, label: 'Research Collaboration', sub: 'Propose joint academic partnerships', href: '/institute/collaborations', accent: '#6B9BD1' },
                { icon: Users, label: 'Study Circles', sub: 'Join structured learning communities', href: '/inner-development/circles', accent: '#27AE60' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} href={item.href}>
                    <div className="group glass-panel rounded-xl p-5 border border-white/5 hover:border-white/12 transition-all cursor-pointer">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${item.accent}15` }}>
                        <Icon className="w-4 h-4" style={{ color: item.accent }} />
                      </div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">{item.label}</p>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed">{item.sub}</p>
                      <div className="flex items-center gap-1 mt-3 text-[10px] text-[#AAB0D6]/40 group-hover:text-[#C8A75E] transition-colors">
                        Learn more <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

      </div>

      <ReflectionJournalModal
       userId=''
        surahNumber={journalOpen}
        surahName={journalSurahName}
        existingReflection={reflections.find((r) => r.surahNumber === journalOpen)}
        onSave={saveReflection}
        onClose={() => setJournalOpen(null)}
      />
    </div>
  );
}
