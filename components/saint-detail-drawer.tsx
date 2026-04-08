'use client';

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SaintWithRelations } from '@/lib/database.types';
import { Calendar, Globe, BookOpen, Network, ArrowRight, ScrollText } from 'lucide-react';

interface SaintDetailDrawerProps {
  saint: SaintWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


function deriveTransmissionRole(saint: SaintWithRelations): { role: string; notes: string[] } {
  const isFounder = saint.is_founder;
  const lineageCount = saint.lineages?.length ?? 0;
  const name = saint.name.toLowerCase();

  if (name.includes('prophet') || name.includes('muhammad') || name.includes('muḥammad')) {
    return {
      role: 'Prophetic Source',
      notes: [
        'Absolute origin of all Sufi silsilas',
        'Normative model of inward and outward conduct',
        'Archetype of the perfected human (al-Insān al-Kāmil)',
      ],
    };
  }
  if (name.includes('ali') || name.includes('ʿalī')) {
    return {
      role: 'Primary Transmitter',
      notes: [
        'First link in the esoteric transmission chain',
        'Custodian of inward sciences (ʿilm al-bāṭin)',
        lineageCount > 0 ? `Associated with ${lineageCount} major lineage${lineageCount > 1 ? 's' : ''}` : 'Central to Shia and Sufi transmission',
      ],
    };
  }
  if (isFounder) {
    return {
      role: 'Founding Axis',
      notes: [
        'Established a distinct doctrinal and methodological lineage',
        lineageCount > 0 ? `Progenitor of ${lineageCount} silsila branch${lineageCount > 1 ? 'es' : ''}` : 'Source of transmitted authority',
        'Systematized practice and doctrine for successive generations',
      ],
    };
  }
  if (lineageCount > 1) {
    return {
      role: 'Cross-Lineage Authority',
      notes: [
        `Active across ${lineageCount} distinct transmission lineages`,
        'Convergence point of multiple methodological streams',
        'Recognised authority beyond a single order',
      ],
    };
  }
  if (lineageCount === 1) {
    return {
      role: 'Lineage Custodian',
      notes: [
        `Principal within the ${saint.lineages![0].name} tradition`,
        'Carried and transmitted established doctrinal framework',
        'Trained successive generations of practitioners',
      ],
    };
  }
  return {
    role: 'Independent Scholar-Practitioner',
    notes: [
      'Contributed through teaching, writing, or exemplary conduct',
      'Influence transmitted through students and textual legacy',
      'Role defined by intellectual and spiritual output',
    ],
  };
}

function deriveDoctrinalFoundations(saint: SaintWithRelations): { category: string; concepts: string[] }[] {
  const themes = saint.themes?.map((t) => t.name) ?? [];
  const lineageNames = saint.lineages?.map((l) => l.name.toLowerCase()) ?? [];
  const name = saint.name.toLowerCase();

  const foundations: { category: string; concepts: string[] }[] = [];

  if (name.includes('prophet') || name.includes('muhammad') || name.includes('muḥammad')) {
    foundations.push(
      { category: 'Doctrinal Foundations', concepts: ['Iḥsān', 'Tazkiyah', 'Dhikr', 'Adab'] },
      { category: 'Transmission Position', concepts: ['Source of all silsilas', 'Normative model (Uswa Ḥasana)', 'Anchor of spiritual legitimacy'] },
    );
    return foundations;
  }

  const doctrinalConcepts: string[] = [];
  if (themes.some(t => /tawḥīd|unity|tawhid/i.test(t))) doctrinalConcepts.push('Tawḥīd');
  if (themes.some(t => /dhikr|remembrance/i.test(t))) doctrinalConcepts.push('Dhikr');
  if (themes.some(t => /love|maḥabbah|mahabbah/i.test(t))) doctrinalConcepts.push('Maḥabbah');
  if (themes.some(t => /gnosis|maʿrifah|marifa/i.test(t))) doctrinalConcepts.push("Maʿrifah");
  if (themes.some(t => /station|maqām|maqam/i.test(t))) doctrinalConcepts.push('Maqāmāt');
  if (themes.some(t => /soul|nafs/i.test(t))) doctrinalConcepts.push('Tazkiyat al-Nafs');
  if (themes.some(t => /ethics|adab/i.test(t))) doctrinalConcepts.push('Adab');
  if (themes.some(t => /poetry|verse/i.test(t))) doctrinalConcepts.push('Spiritual Poetry');
  if (themes.some(t => /jurisprudence|fiqh|sharia/i.test(t))) doctrinalConcepts.push('Sharīʿa–Ṭarīqa Integration');

  if (lineageNames.some(l => /qadiri|qādirī/i.test(l))) doctrinalConcepts.push('Qādirī Methodology');
  if (lineageNames.some(l => /chishti|chishtī/i.test(l))) doctrinalConcepts.push('Chishtī Samāʿ');
  if (lineageNames.some(l => /naqshbandi|naqshbandī/i.test(l))) doctrinalConcepts.push('Silent Dhikr');
  if (lineageNames.some(l => /shadhili|shādhilī/i.test(l))) doctrinalConcepts.push('Active Engagement in Society');
  if (lineageNames.some(l => /mevlevi|mawlawi/i.test(l))) doctrinalConcepts.push('Samāʿ & Turning Ceremony');

  if (doctrinalConcepts.length > 0) {
    foundations.push({ category: 'Doctrinal Foundations', concepts: doctrinalConcepts.slice(0, 5) });
  }

  const transmissionNotes: string[] = [];
  if (saint.is_founder) transmissionNotes.push('Founding authority of a silsila');
  if ((saint.lineages?.length ?? 0) > 0) {
    transmissionNotes.push(`Transmitter within ${saint.lineages!.map(l => l.name).join(', ')}`);
  }
  if (transmissionNotes.length > 0) {
    foundations.push({ category: 'Transmission Position', concepts: transmissionNotes });
  }

  return foundations;
}

function deriveCivilizationalImpact(saint: SaintWithRelations): string[] {
  const impacts: string[] = [];
  const bio = (saint.biography ?? saint.short_summary ?? '').toLowerCase();
  const name = saint.name.toLowerCase();

  if (name.includes('prophet') || name.includes('muhammad') || name.includes('muḥammad')) {
    return [
      'Established the ethical-psychological framework underlying all Islamic spiritual science',
      'Defined the prophetic model of inner discipline transmitted through all lineages',
      'Anchored legitimate spiritual experience within revealed scripture',
    ];
  }

  if (saint.is_founder) impacts.push('Founded a lineage that shaped institutional Sufism across multiple centuries');
  if (/poetry|poet|verse/i.test(bio)) impacts.push('Produced literary works that became primary vehicles for doctrinal transmission');
  if (/reconcile|bridge|synthesis|integration/i.test(bio)) impacts.push('Bridged jurisprudence and mystical practice, reinforcing institutional legitimacy');
  if (/spread|expand|travel|mission/i.test(bio)) impacts.push('Extended Sufi influence into new geographic and cultural territories');
  if (/school|madrasa|education|teaching/i.test(bio)) impacts.push('Established educational institutions for systematic transmission of knowledge');
  if (/reform|reviv/i.test(bio)) impacts.push('Led doctrinal or institutional reform within the tradition');
  if (/philosophy|metaphysic|cosmolog/i.test(bio)) impacts.push('Developed systematic metaphysical frameworks adopted across the tradition');

  if (impacts.length === 0) {
    impacts.push('Contributed to the living transmission of Sufi doctrine and practice');
    impacts.push('Shaped the intellectual and spiritual landscape of their regional context');
  }

  return impacts.slice(0, 3);
}

function derivePrimarySources(saint: SaintWithRelations): string[] {
  const name = saint.name.toLowerCase();
  const bio = (saint.biography ?? '').toLowerCase();

  if (name.includes('prophet') || name.includes('muhammad') || name.includes('muḥammad')) {
    return ['Qurʾān', 'Hadith collections', 'Early Sīra literature'];
  }
  if (name.includes('ali') || name.includes('ʿalī')) {
    return ['Nahj al-Balāgha', 'Early Islamic narrations', 'Hadith collections'];
  }

  const sources: string[] = [];
  if (/qur|quran|quranic/i.test(bio)) sources.push('Qurʾānic exegesis (Tafsīr)');
  if (/hadith|hadīth/i.test(bio)) sources.push('Hadith literature');
  if (/diwan|dīwān|poetry/i.test(bio)) sources.push(`Dīwān (collected poetry)`);
  if (/masnavi|mathnawi|mathnawī/i.test(bio)) sources.push('Masnawī');
  if (/risala|risāla|treatise/i.test(bio)) sources.push('Doctrinal epistles (Rasāʾil)');
  if (/maktubat|maktūbāt|letters/i.test(bio)) sources.push('Maktūbāt (collected letters)');
  if (/malfuzat|malfūẓāt|discourses/i.test(bio)) sources.push('Malfūẓāt (recorded discourses)');

  if (sources.length === 0) {
    sources.push('Classical biographical dictionaries (Ṭabaqāt)');
    sources.push('Lineage transmission records');
  }

  return sources.slice(0, 4);
}

function getCrossReferences(saint: SaintWithRelations): { label: string; href: string }[] {
  const refs: { label: string; href: string }[] = [];
  const themes = saint.themes?.map((t) => t.name.toLowerCase()) ?? [];
  const lineageNames = saint.lineages?.map((l) => l.name.toLowerCase()) ?? [];

  refs.push({ label: 'Stations of the Path', href: '/knowledge-systems/stations' });

  if (themes.some(t => /psychology|nafs|soul/i.test(t)) || lineageNames.length > 0) {
    refs.push({ label: 'Sufi Psychology', href: '/knowledge-systems/psychology' });
  }
  if (themes.some(t => /practice|dhikr|prayer/i.test(t))) {
    refs.push({ label: 'Contemplative Practices', href: '/knowledge-systems/practices' });
  }
  if (themes.some(t => /epistemology|knowledge|gnosis/i.test(t))) {
    refs.push({ label: 'Epistemology & Method', href: '/knowledge-systems/epistemology' });
  }
  if (refs.length < 3) {
    refs.push({ label: 'Epistemology & Method', href: '/knowledge-systems/epistemology' });
  }

  const unique = refs.filter((r, i, arr) => arr.findIndex(x => x.href === r.href) === i);
  return unique.slice(0, 4);
}

function resolveEraLabel(saint: SaintWithRelations): string | null {
  if (saint.birth_year && saint.death_year) {
    if (saint.death_year <= 700) return 'Prophetic & Companion Era';
    if (saint.death_year <= 900) return 'Formative Period';
    if (saint.death_year <= 1200) return 'Classical Period';
    if (saint.death_year <= 1500) return 'Post-Classical Period';
    if (saint.death_year <= 1800) return 'Early Modern Period';
    return 'Modern Period';
  }
  return null;
}

function resolveHonorific(saint: SaintWithRelations): string | null {
  const name = saint.name.toLowerCase();
  if (name.includes('prophet') || name.includes('muhammad') || name.includes('muḥammad')) return 'Seal of the Prophets';
  if (saint.is_founder) return 'Founder';
  if ((saint.lineages?.length ?? 0) > 1) return 'Cross-Order Authority';
  if ((saint.lineages?.length ?? 0) === 1) return saint.lineages![0].name + ' Order';
  return null;
}

export function SaintDetailDrawer({ saint, open, onOpenChange }: SaintDetailDrawerProps) {
  if (!saint) return null;

  const lifespan = saint.birth_year && saint.death_year
    ? `${saint.birth_year}–${saint.death_year} CE`
    : saint.birth_year
    ? `Born ${saint.birth_year} CE`
    : saint.death_year
    ? `Died ${saint.death_year} CE`
    : null;

  const honorific = resolveHonorific(saint);
  const era = resolveEraLabel(saint);
  const transmissionRole = deriveTransmissionRole(saint);
  const doctrinalFoundations = deriveDoctrinalFoundations(saint);
  const civilizationalImpact = deriveCivilizationalImpact(saint);
  const primarySources = derivePrimarySources(saint);
  const crossReferences = getCrossReferences(saint);

  const metadataGrid = [
    saint.region
      ? { label: 'Region', value: saint.region }
      : null,
    era ? { label: 'Era', value: era } : null,
    { label: 'Transmission Role', value: transmissionRole.role },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl bg-[#080C24] border-l border-[rgba(200,167,94,0.15)]">
        <ScrollArea className="h-full pr-1">
          <div className="pb-12 pt-2 px-1 space-y-0">

            {/* 1. Header Block */}
            <div className="pb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-[#F5F3EE] font-serif leading-tight">
                    {saint.name}
                  </h2>
                  {honorific && (
                    <p className="text-sm text-[#C8A75E] mt-1 font-medium tracking-wide">
                      {honorific}
                    </p>
                  )}
                  {lifespan && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Calendar className="h-3.5 w-3.5 text-[#AAB0D6]" />
                      <span className="text-sm text-[#AAB0D6]">{lifespan}</span>
                    </div>
                  )}
                </div>
                {saint.lineages && saint.lineages.length > 0 && (
                  <Badge className="bg-[#C8A75E]/15 text-[#C8A75E] border border-[#C8A75E]/30 text-xs shrink-0 mt-1">
                    {saint.lineages[0].name}
                  </Badge>
                )}
              </div>

              {metadataGrid.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {metadataGrid.map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#0F1430]/70 border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2.5"
                    >
                      <p className="text-[10px] font-semibold text-[#C8A75E] uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-xs text-[#F5F3EE] leading-snug">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-[rgba(200,167,94,0.12)]" />

            {/* 2. Executive Definition */}
            {saint.short_summary && (
              <div className="py-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 bg-[#C8A75E] rounded-full" />
                  <h3 className="text-xs font-bold text-[#C8A75E] uppercase tracking-widest">
                    Definition
                  </h3>
                </div>
                <p className="text-sm text-[#D8D4CC] leading-relaxed">
                  {saint.short_summary}
                </p>
              </div>
            )}

            {saint.short_summary && <Separator className="bg-[rgba(255,255,255,0.05)]" />}

            {/* 3. Structural Role in Sufi Tradition */}
            {doctrinalFoundations.length > 0 && (
              <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 bg-[#C8A75E] rounded-full" />
                  <h3 className="text-xs font-bold text-[#C8A75E] uppercase tracking-widest">
                    Structural Role in Sufi Tradition
                  </h3>
                </div>
                <div className="space-y-4">
                  {doctrinalFoundations.map((section) => (
                    <div key={section.category}>
                      <p className="text-xs font-semibold text-[#AAB0D6] mb-2">
                        {section.category}
                      </p>
                      <ul className="space-y-1.5">
                        {section.concepts.map((concept) => (
                          <li key={concept} className="flex items-start gap-2">
                            <span className="text-[#C8A75E] mt-1.5 text-[8px]">&#9632;</span>
                            <span className="text-sm text-[#D8D4CC]">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-[rgba(255,255,255,0.05)]" />

            {/* 4. Civilizational Impact */}
            {civilizationalImpact.length > 0 && (
              <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 bg-[#C8A75E] rounded-full" />
                  <h3 className="text-xs font-bold text-[#C8A75E] uppercase tracking-widest">
                    Civilizational Impact
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {civilizationalImpact.map((impact, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Globe className="h-3.5 w-3.5 text-[#C8A75E] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#D8D4CC] leading-relaxed">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="bg-[rgba(255,255,255,0.05)]" />

            {/* 5. System Cross-References */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-[#C8A75E] rounded-full" />
                <h3 className="text-xs font-bold text-[#C8A75E] uppercase tracking-widest">
                  Connected Modules
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {crossReferences.map((ref) => (
                  <a
                    key={ref.href}
                    href={ref.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/08 text-[#C8A75E] text-xs font-medium hover:bg-[#C8A75E]/15 hover:border-[#C8A75E]/50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Network className="h-3 w-3" />
                    {ref.label}
                  </a>
                ))}
                {saint.themes && saint.themes.length > 0 && saint.themes.slice(0, 2).map((theme) => (
                  <span
                    key={theme.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#AAB0D6] text-xs"
                  >
                    {theme.name}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="bg-[rgba(255,255,255,0.05)]" />

            {/* 6. Primary Source Anchor */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-[#C8A75E] rounded-full" />
                <h3 className="text-xs font-bold text-[#C8A75E] uppercase tracking-widest">
                  Primary Sources
                </h3>
              </div>
              <ul className="space-y-2">
                {primarySources.map((source) => (
                  <li key={source} className="flex items-center gap-2">
                    <ScrollText className="h-3.5 w-3.5 text-[#AAB0D6] shrink-0" />
                    <span className="text-sm text-[#D8D4CC]">{source}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archive Entry CTA */}
            <div className="pt-2 pb-4">
              <div className="border border-[#C8A75E]/20 rounded-xl p-4 bg-gradient-to-br from-[#C8A75E]/05 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#C8A75E] uppercase tracking-widest mb-1">
                      Archive Entry
                    </p>
                    <p className="text-xs text-[#AAB0D6]">
                      Full scholarly dossier coming soon
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#AAB0D6] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>View Complete Archive Entry</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
