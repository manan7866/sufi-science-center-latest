'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Loader as Loader2, GitBranch, ArrowRight, ChevronRight } from 'lucide-react';

interface LineageEntry {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_lineage_id: string | null;
  description: string | null;
  display_order: number;
}

const LINEAGE_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'formative-sufi-era': 'Pre-institutional Sufi transmission preceding the formal tariqa system.',
  'qadiriyya': 'Founded by Abdul Qadir Gilani of Baghdad (1077–1166). The oldest and most geographically widespread Sufi order, spanning the Arab world, Africa, South Asia, and beyond.',
  'naqshbandiyya': 'Traced to Baha-ud-Din Naqshband of Bukhara (1318–1389). Emphasis on silent dhikr, sobriety, and maintenance of spiritual awareness in ordinary life. Dominant from Central Asia to the Ottoman world and South Asia.',
  'chishtiyya': 'Founded by Moinuddin Chishti of Ajmer (1141–1230). Known for openness, love, and the transformative use of sama. The dominant order of the Indian Subcontinent.',
  'shadhiliyya': 'Founded by Abu al-Hasan al-Shadhili of North Africa (1196–1258). Characterized by intellectual mysticism, integration of Sufi practice with ordinary life, and the production of major doctrinal literature.',
  'suhrawardiyya': 'Transmitted through Abu Hafs Umar al-Suhrawardi (1145–1234). Significant in Persia, Iraq, and South Asia, emphasizing formal Sufi ethics and scholarly engagement.',
  'rifaiyya': "Founded by Ahmad al-Rifa'i of Iraq (1118–1182). Known for intense devotional practice and widespread presence across the Arab world.",
  'kubrawiyya': 'Founded by Najmuddin Kubra of Khwarazm (1145–1221). Emphasis on visionary experiences, light phenomena, and inner cosmology. Influential in Central Asia and Persia.',
  'mevleviyya': "The order of the Whirling Dervishes, institutionalized around the legacy of Jalaluddin Rumi (1207–1273). Centered in Konya; known for samāʿ, Persian poetry, and a developed ceremonial culture.",
  'yasawiyya': 'Founded by Ahmad Yasawi of Turkestan (c. 1093–1166). The earliest Turkic Sufi order, blending Persian mystical poetry with Central Asian folk spirituality.',
  'bektashiyya': 'Associated with Haji Bektash Veli of Anatolia (1209–1271). Syncretic order with esoteric tendencies; historically linked to the Ottoman Janissary corps.',
  'tijaniyya': 'Founded by Ahmad al-Tijani of Algeria (1737–1815). Claims direct prophetic authorization; dominant in West and North Africa.',
  'sanusiyya': 'Founded by Muhammad ibn Ali al-Sanusi (1787–1859). A reformist order emphasizing Quran and Sunnah while maintaining the Sufi path; influential in Libya and the Sahara.',
};

export default function LineagesPage() {
  const [lineages, setLineages] = useState<LineageEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLineages() {
      try {
        const res = await fetch('/api/foundations/lineages');
        const data = await res.json();
        setLineages(data.lineages || []);
      } catch (error) {
        console.error('Failed to fetch lineages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLineages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  const rootLineages = lineages.filter((l) => l.level === 0);
  const subBranches = lineages.filter((l) => l.level === 1);

  const getSubBranches = (parentId: string) =>
    subBranches.filter((s) => s.parent_lineage_id === parentId);

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Lineages & Orders"
        description="The formal transmission chains of Sufi civilization — from the earliest pre-institutional masters through the major classical orders and their regional sub-branches."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/60 uppercase tracking-widest font-semibold">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>{rootLineages.length} Orders · {subBranches.length} Sub-branches</span>
                </div>
                <span className="text-xs text-[#AAB0D6]/40">Select any order to enter the archive</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 space-y-4">
            {rootLineages.map((lineage, index) => {
              const branches = getSubBranches(lineage.id);
              const description = LINEAGE_CATEGORY_DESCRIPTIONS[lineage.slug] || lineage.description;

              return (
                <ScrollReveal key={lineage.id}>
                  <div className="glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden group">
                    <Link
                      href={`/foundations/masters-of-the-path?lineage=${lineage.slug}`}
                      className="flex items-start gap-5 p-6 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-[#C8A75E]">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-1.5">
                          <h3 className="text-base font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors">
                            {lineage.name}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        {description && (
                          <p className="text-sm text-[#AAB0D6] leading-relaxed line-clamp-2">{description}</p>
                        )}
                      </div>
                    </Link>

                    {branches.length > 0 && (
                      <div className="border-t border-white/5 px-6 py-3 flex flex-wrap gap-2">
                        {branches.map((branch) => (
                          <Link
                            key={branch.id}
                            href={`/foundations/masters-of-the-path?lineage=${branch.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors border border-white/10 hover:border-[#C8A75E]/30 rounded-full px-3 py-1"
                          >
                            <ChevronRight className="h-3 w-3 opacity-60" />
                            {branch.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
