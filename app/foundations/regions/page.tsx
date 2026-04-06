'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Loader as Loader2, Globe, ArrowRight, ChevronRight } from 'lucide-react';

interface RegionEntry {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_region_id: string | null;
  display_order: number;
}

const REGION_DETAILS: Record<string, { description: string; significance: string }> = {
  'early-islamic-world': {
    description: 'The Arabian Peninsula and the first centers of Islamic civilization — Mecca, Medina, Basra, Kufa, and Baghdad.',
    significance: 'Origin of Prophetic transmission and the earliest Sufi teachings.',
  },
  'arabian-peninsula': {
    description: 'The Arabian Peninsula — birthplace of Islam and the spiritual center of the Muslim world.',
    significance: 'Prophetic transmission, early asceticism, Hijazi spiritual culture.',
  },
  'persia-iran': {
    description: 'Persia and Greater Iran — Nishapur, Herat, Isfahan, Shiraz — the heartland of Sufi literary culture.',
    significance: 'Persian mystical poetry, Kubrawiyya visionary traditions, philosophical Sufism.',
  },
  'central-asia': {
    description: 'Transoxiana and the Steppes — Bukhara, Samarkand, Khwarazm — cradle of the Naqshbandiyya.',
    significance: 'Naqshbandiyya headquarters, Yasawiyya origins, Timurid Sufi culture.',
  },
  'south-asia': {
    description: 'The Indian Subcontinent — Ajmer, Delhi, Lahore, Multan, Kashmir — the largest Sufi sphere by population.',
    significance: 'Chishtiyya transformation, Suhrawardiyya presence, Mujaddidiyya reform, Kashmiri Rishi tradition.',
  },
  'anatolia': {
    description: 'Anatolia and the Anatolian plateau — Konya, Bursa — center of the Mevleviyya and Bektashiyya.',
    significance: "Rumi's legacy, Mevleviyya institutionalization, syncretic Anatolian Sufism.",
  },
  'ottoman-world': {
    description: 'The Ottoman Empire — Istanbul and the Balkans — where Sufi orders achieved state integration.',
    significance: 'Khalwatiyya, Ottoman Naqshbandiyya, imperial Sufi culture and court patronage.',
  },
  'north-africa': {
    description: 'The Maghreb and Egypt — Fez, Tunis, Cairo — centers of Shadhiliyya and later reformist orders.',
    significance: 'Shadhiliyya doctrinal elaboration, Tijaniyya origin, Sanusiyya reform.',
  },
  'al-andalus': {
    description: 'Islamic Iberia — Cordoba, Seville, Murcia — the western pole of Islamic civilization.',
    significance: "Ibn Arabi's formation and writings; the synthesis of Islamic and Iberian intellectual culture.",
  },
  'levant': {
    description: 'Syria, Palestine, and Lebanon — Damascus a major center of Sufi scholarship.',
    significance: "Ibn Arabi's later life and burial; Khalwatiyya; scholarly Sufi networks.",
  },
  'sub-saharan-africa': {
    description: 'West and East Africa — where Sufi orders served as primary vehicles for Islamization.',
    significance: 'Tijaniyya expansion, Qadiriyya missionary work, African Sufi synthesis.',
  },
  'balkans': {
    description: 'Southeast Europe under Ottoman influence — major Bektashi and Khalwati presence.',
    significance: 'Bektashiyya stronghold, Mevleviyya tekkes, Ottoman Sufi heritage.',
  },
  'caucasus': {
    description: "The Caucasus — Georgia, Chechnya, Dagestan — stronghold of the Naqshbandiyya–Khalidiyya.",
    significance: 'Khalidiyya resistance movements, Imam Shamil, North Caucasian Sufi networks.',
  },
  'southeast-asia': {
    description: 'Maritime Southeast Asia — Malaysia, Indonesia, Brunei — where Sufism shaped the character of the region\'s Islam.',
    significance: 'Shattariyya and Qadiriyya networks, the synthesis of Sufi cosmology with local traditions.',
  },
  'china': {
    description: 'China and Central Asian Chinese territories — unique synthesis of Sufism with Chinese culture.',
    significance: 'Naqshbandiyya Menhuan system, Jahriyya and Khufiyya sub-orders, Chinese Muslim identity.',
  },
  'global-diaspora': {
    description: 'Sufi communities in the modern West — Europe, North America, and beyond.',
    significance: 'Contemporary transmission, Guenonian Sufism, Western Sufi communities.',
  },
};

export default function RegionsPage() {
  const [regions, setRegions] = useState<RegionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegions() {
      try {
        const res = await fetch('/api/foundations/regions');
        const data = await res.json();
        setRegions(data.regions || []);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRegions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  const rootRegions = regions.filter((r) => r.level === 0);
  const subRegions = regions.filter((r) => r.level === 1);

  const getSubRegions = (parentId: string) =>
    subRegions.filter((s) => s.parent_region_id === parentId);

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Foundational Studies"
        title="Civilizational Regions"
        description="The geographic spread of Sufi civilization — from the Arabian Peninsula across Persia, Central Asia, South Asia, Anatolia, and North Africa to Al-Andalus and the modern diaspora."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/60 uppercase tracking-widest font-semibold">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{rootRegions.length} Civilizational Regions · {subRegions.length} Sub-regions</span>
                </div>
                <span className="text-xs text-[#AAB0D6]/40">Select any region to enter the archive</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rootRegions.map((region) => {
              const detail = REGION_DETAILS[region.slug];
              const children = getSubRegions(region.id);

              return (
                <ScrollReveal key={region.id}>
                  <div className="glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden group">
                    <Link
                      href={`/foundations/masters-of-the-path?region=${region.slug}`}
                      className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Globe className="h-4 w-4 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <h3 className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-tight">
                            {region.name}
                          </h3>
                          <ArrowRight className="h-3.5 w-3.5 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        {detail && (
                          <>
                            <p className="text-xs text-[#AAB0D6] leading-relaxed mb-1.5 line-clamp-2">{detail.description}</p>
                            <p className="text-xs text-[#C8A75E]/70 italic leading-relaxed line-clamp-1">{detail.significance}</p>
                          </>
                        )}
                      </div>
                    </Link>

                    {children.length > 0 && (
                      <div className="border-t border-white/5 px-5 py-2.5 flex flex-wrap gap-2">
                        {children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/foundations/masters-of-the-path?region=${child.slug}`}
                            className="inline-flex items-center gap-1 text-xs text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors border border-white/8 hover:border-[#C8A75E]/30 rounded-full px-2.5 py-0.5"
                          >
                            <ChevronRight className="h-2.5 w-2.5 opacity-60" />
                            {child.name}
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
