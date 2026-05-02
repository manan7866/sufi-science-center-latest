'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePortalSession } from '@/hooks/use-portal-session';
import { useAuth } from '@/lib/auth-context';
import { ReflectionJournalModal } from '@/components/portal/reflection-journal-modal';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ChevronLeft, ChevronRight, BookOpen, Compass, Lightbulb, Users, CircleAlert as AlertCircle, PenLine, LayoutDashboard, Loader2 ,UserRound, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface SurahData {
  id: string;
  surah_number: number;
  arabic_name: string;
  english_name: string;
  revelation_type: 'meccan' | 'medinan';
  core_theme: string;
  structural_axis: string;
  sufi_reflection: string;
  interfaith_resonance: string | null;
  has_interfaith_note: boolean;
}

export default function SurahDetailPage() {
  const params = useParams();
  const number = parseInt(params.number as string);
  const { user } = useAuth();

  const [surah, setSurah] = useState<SurahData | null>(null);
  const [prev, setPrev] = useState<SurahData | null>(null);
  const [next, setNext] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [approvedReflections, setApprovedReflections] = useState<any[]>([]);

  const [journalOpen, setJournalOpen] = useState(false);
  const { recordSurahView, saveReflection, reflections } = usePortalSession();

  useEffect(() => {
    async function fetchSurah() {
      try {
        const res = await fetch(`/api/interfaith-coherence/scripture-commentary/surah/${number}`);
        if (!res.ok) return;
        const data = await res.json();
        const currentSurah = data.surah;
        setSurah(currentSurah);

        if (currentSurah) {
          // Fetch previous surah
          if (number > 1) {
            const prevRes = await fetch(`/api/interfaith-coherence/scripture-commentary/surah/${number - 1}`);
            if (prevRes.ok) {
              const prevData = await prevRes.json();
              setPrev(prevData.surah);
            }
          }
          // Fetch next surah
          if (number < 114) {
            const nextRes = await fetch(`/api/interfaith-coherence/scripture-commentary/surah/${number + 1}`);
            if (nextRes.ok) {
              const nextData = await nextRes.json();
              setNext(nextData.surah);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch surah:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurah();
  }, [number]);

  useEffect(() => {
    if (surah && typeof window !== 'undefined') {
      recordSurahView(number, surah.arabic_name);
    }
  }, [surah, number, recordSurahView]);

  useEffect(() => {
  async function fetchApprovedReflections() {
    try {
      const res = await fetch(
        `/api/interfaith-coherence/scripture-commentary/reflections?surahNumber=${number}`
      );

      const data = await res.json();

      setApprovedReflections(data.reflections || []);
    } catch (error) {
      console.error("Failed to fetch reflections:", error);
    }
  }

  fetchApprovedReflections();
}, [number]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#AAB0D6] mb-4">Surah not found.</p>
          <Link href="/interfaith-coherence/scripture-commentary" className="text-[#C8A75E] hover:text-[#D4B56D] text-sm">
            Return to Commentary Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/interfaith-coherence/scripture-commentary"
              className="flex items-center gap-2 text-sm text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Commentary Library
            </Link>
            <span className="text-xs text-[#AAB0D6]/40 tracking-widest uppercase">
              Surah {surah.surah_number} of 114
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-6">

            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-white/8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[#C8A75E]">{surah.surah_number}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border capitalize font-medium ${
                    surah.revelation_type === 'meccan'
                      ? 'bg-sky-500/10 border-sky-500/25 text-sky-400'
                      : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                  }`}>
                    {surah.revelation_type}
                  </span>
                  {surah.has_interfaith_note && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full border bg-teal-500/10 border-teal-500/25 text-teal-400 font-medium">
                      Interfaith Resonance
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F3EE] leading-tight">
                  {surah.arabic_name}
                </h1>
                <p className="text-lg text-[#AAB0D6] mt-1">{surah.english_name}</p>
              </div>
            </div>

            <div className="space-y-8">

              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <BookOpen className="w-4 h-4 text-[#C8A75E]" />
                  <h2 className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase font-semibold">Core Theme</h2>
                </div>
                <p className="text-base text-[#F5F3EE] leading-relaxed font-serif">
                  {surah.core_theme}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Compass className="w-4 h-4 text-[#C8A75E]" />
                  <h2 className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase font-semibold">Structural Axis</h2>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20">
                  <span className="text-sm font-semibold text-[#C8A75E]">{surah.structural_axis}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Lightbulb className="w-4 h-4 text-[#C8A75E]" />
                  <h2 className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase font-semibold">Sufi Thematic Reflection</h2>
                </div>
                <div className="pl-5 border-l-2 border-[#C8A75E]/30">
                  <p className="text-[#AAB0D6] leading-relaxed text-base">
                    {surah.sufi_reflection}
                  </p>
                </div>
              </div>

              {surah.interfaith_resonance && (
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <Users className="w-4 h-4 text-teal-400" />
                    <h2 className="text-xs tracking-[0.15em] text-teal-400 uppercase font-semibold">Interfaith Resonance</h2>
                  </div>
                  <div className="p-5 rounded-xl bg-teal-500/8 border border-teal-500/20">
                    <p className="text-sm text-[#AAB0D6] leading-relaxed">
                      {surah.interfaith_resonance}
                    </p>
                  </div>
                </div>
              )}
              {approvedReflections.length > 0 && (
  <div className="mt-8">

    <div className="flex items-center gap-2.5 mb-4">
      <PenLine className="w-4 h-4 text-[#C8A75E]" />
      <h2 className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase font-semibold">
        Community Reflections
      </h2>
    </div>

               <div className="space-y-4">
       {approvedReflections.map((r) => (
         <div
           key={r.id}
           className="p-4 rounded-xl bg-white/3 border border-white/8"
         >

           {/* USER INFO */}
           <div className="flex items-center gap-3 mb-2">
             { r.user?.avatarUrl ? (
               <Image
               width={100}
               height={100}

                 src={r.user.avatarUrl}
                 alt={r.user?.name || "User"}
                 className="w-6 h-6 rounded-full object-cover border border-white/10"
               />
             ) : (
               <UserRound className="w-6 h-6 text-[#C8A75E]" />
             )}


             <span className="text-sm text-[#F5F3EE] font-medium flex-1">
               {r.user?.name || "Anonymous"}
             </span>

             {/* DELETE BUTTON - only for own reflections */}
             {user && r.userId === user.id && (
               <button
                 onClick={async () => {
                   if (!confirm('Delete this reflection?')) return;
                   const res = await fetch(`/api/portal/reflections?id=${r.id}`, {
                     method: 'DELETE',
                   });
                   if (res.ok) {
                     setApprovedReflections(prev => prev.filter(x => x.id !== r.id));
                   }
                 }}
                 className="text-red-400 hover:text-red-300 transition-colors"
                 title="Delete reflection"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
             )}
           </div>

           {/* TEXT */}
           <p className="text-sm text-[#AAB0D6] leading-relaxed">
             {r.reflectionText}
           </p>


         </div>
       ))}
     </div>

  </div>
)}
              

            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-[#AAB0D6]">
              This reflection does not replace classical tafsir. It is a structured thematic orientation
              rooted in established Sufi scholarship, offered for reflective engagement.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => setJournalOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/25 hover:bg-[#C8A75E]/15 hover:border-[#C8A75E]/40 transition-all text-sm text-[#C8A75E] font-medium"
            >
              <PenLine className="w-4 h-4" />
              Write Reflection
            </button>
            <Link href="/portal" className="flex-1">
              <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-white/15 transition-all text-sm text-[#AAB0D6] hover:text-[#F5F3EE] font-medium">
                <LayoutDashboard className="w-4 h-4" />
                My Development Portal
              </div>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3">
            {prev ? (
              <Link href={`/interfaith-coherence/scripture-commentary/surah/${prev.surah_number}`}>
                <div className="glass-panel rounded-xl p-4 border border-white/5 hover:border-[#C8A75E]/25 transition-all group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#AAB0D6]/50 group-hover:text-[#C8A75E] transition-colors" />
                    <span className="text-[10px] text-[#AAB0D6]/50 uppercase tracking-widest">Previous</span>
                  </div>
                  <p className="text-sm font-semibold text-[#F5F3EE] font-serif">{prev.arabic_name}</p>
                  <p className="text-xs text-[#AAB0D6]">{prev.english_name}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/interfaith-coherence/scripture-commentary/surah/${next.surah_number}`}>
                <div className="glass-panel rounded-xl p-4 border border-white/5 hover:border-[#C8A75E]/25 transition-all group text-right">
                  <div className="flex items-center gap-2 mb-1.5 justify-end">
                    <span className="text-[10px] text-[#AAB0D6]/50 uppercase tracking-widest">Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#AAB0D6]/50 group-hover:text-[#C8A75E] transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-[#F5F3EE] font-serif">{next.arabic_name}</p>
                  <p className="text-xs text-[#AAB0D6]">{next.english_name}</p>
                </div>
              </Link>
            ) : <div />}
          </div>
        </ScrollReveal>

      </div>

      <ReflectionJournalModal
        userId={user?.id || ''}
        surahNumber={journalOpen ? number : null}
        surahName={surah.arabic_name}
        existingReflection={reflections.find((r) => r.surahNumber === number)}
        onSave={saveReflection}
        onClose={() => setJournalOpen(false)}
      />
    </div>
  );
}
