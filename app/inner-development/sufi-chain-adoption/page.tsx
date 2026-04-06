'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link2, Shield, BookOpen, Users, CheckCircle2, ChevronDown, ChevronUp, FileText, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface ChainElement {
  id: string;
  title: string;
  arabicTerm: string;
  category: string;
  summary: string;
  detail: string;
  requirements: string[];
  institutionalNotes: string[];
}

const chainElements: ChainElement[] = [
  {
    id: '1',
    title: 'Verified Lineage Documentation',
    arabicTerm: 'Tawthiq al-Silsila',
    category: 'Authentication',
    summary: 'The formal verification and recording of the unbroken chain of transmission connecting the present practitioner to the founding source of the path.',
    detail: 'A silsila (chain of transmission) is not merely a list of names. It is a living record of trust, accountability, and verified transmission. Each link in the chain represents a relationship of genuine teaching and tested reception. Verified lineage documentation ensures that claims of transmission can be examined, questioned, and confirmed by those with the authority to do so, protecting the integrity of the path from interpolation or fabrication.',
    requirements: [
      'Written documentation of each transmission relationship in the chain',
      'Corroboration from at least two qualified witnesses for each link',
      'Institutional registration with the governing body of the path',
      'Periodic review and reaffirmation of chain integrity',
    ],
    institutionalNotes: [
      'All silsila documentation is held in institutional archive',
      'Disputes about chain authenticity are adjudicated through the Ethics Council',
      'Undocumented claims of transmission are not recognised for institutional purposes',
    ],
  },
  {
    id: '2',
    title: 'Formal Adoption Ceremony',
    arabicTerm: 'Bay\'a al-Intisab',
    category: 'Ceremony & Ritual',
    summary: 'The structured formal ceremony through which a seeker is officially received into the silsila, establishing mutual obligations between the guide and the received.',
    detail: 'The bay\'a (covenant of adoption) is not merely symbolic. It establishes a set of binding mutual obligations: the guide commits to genuine transmission, ongoing support, and honest assessment; the received commits to sincere effort, ethical conduct, and transparency with the guide. The formal nature of this ceremony serves the integrity of both parties by making implicit expectations explicit and creating a witnessed record of the commitment.',
    requirements: [
      'Completion of an established preparatory period (minimum 12 months)',
      'Formal assessment of readiness by the guide and a review panel',
      'Witnessed ceremony with documented record',
      'Signing of mutual obligation statement',
    ],
    institutionalNotes: [
      'Preparatory period requirements may be extended at the guide\'s discretion',
      'Ceremony must be witnessed by at least two institutionally recognised individuals',
      'All bay\'a records are held under institutional seal',
    ],
  },
  {
    id: '3',
    title: 'Transmission Ethics',
    arabicTerm: 'Adab al-Naql',
    category: 'Governance',
    summary: 'The ethical framework governing what may be transmitted, to whom, and under what conditions, protecting both the integrity of the teaching and the wellbeing of recipients.',
    detail: 'Not all teachings are appropriate for all seekers, and not all moments are appropriate for all transmissions. Transmission ethics governs the responsible deployment of received knowledge, establishing clear standards for readiness assessment, context appropriateness, and the protection of those who may not yet be prepared for certain realities. These ethics are not restrictions. They are the expression of genuine care for both the teaching and the taught.',
    requirements: [
      'Completion of formal transmission ethics training',
      'Demonstrated capacity for readiness assessment',
      'Written commitment to transmission ethics framework',
      'Ongoing accountability to ethics review process',
    ],
    institutionalNotes: [
      'Transmission ethics breaches are reported to the Ethics Council',
      'Sanctions range from guided review to suspension of transmission authorisation',
      'Restorative rather than punitive approach is applied wherever possible',
    ],
  },
  {
    id: '4',
    title: 'Governance Accountability',
    arabicTerm: 'Mas\'uliyya al-Hukm',
    category: 'Institutional Integrity',
    summary: 'The structured accountability of all transmission-bearing individuals to the institutional governance framework, ensuring that personal authority does not exceed institutional authorisation.',
    detail: 'One of the most persistent vulnerabilities in transmission-based institutions is the conflation of spiritual authority with institutional authority. Governance accountability provides the structural safeguard against this conflation by establishing that even those with genuine transmitted authority operate within, and remain accountable to, the institutional governance framework. This does not diminish the spiritual authority of the guide; it contextualises it within a structure designed to protect all parties.',
    requirements: [
      'Annual accountability review with the governance body',
      'Disclosure of all active transmission relationships',
      'Transparent reporting of any transmission disputes or concerns',
      'Participation in institutional governance processes',
    ],
    institutionalNotes: [
      'Governance accountability is not optional for any transmission-bearing individual',
      'Refusal to engage with governance accountability processes is treated as a breach of institutional trust',
      'Governance review findings are shared with the relevant guide and documented',
    ],
  },
  {
    id: '5',
    title: 'Continuity Planning',
    arabicTerm: 'Istimrar al-Silsila',
    category: 'Institutional Continuity',
    summary: 'The intentional preparation for the continuation of the chain across time, including succession identification, preparatory transmission, and documented transition protocols.',
    detail: 'Every living chain faces the question of its continuation. Continuity planning is the responsible, proactive engagement with this reality, identifying those with the potential for transmission, preparing them over appropriate timescales, and establishing clear protocols for the transition of transmission authority. The absence of continuity planning is one of the most common causes of chain disruption and institutional fragmentation.',
    requirements: [
      'Formal identification of continuity candidates by current transmission holders',
      'Structured preparatory transmission relationship (minimum 3 years)',
      'Documentation of transition protocols in institutional archive',
      'Governance body approval of transition plans',
    ],
    institutionalNotes: [
      'Continuity planning documentation is reviewed by the governance body every five years',
      'Emergency transition protocols are available for unexpected circumstances',
      'Chain continuity is treated as an institutional, not merely personal, responsibility',
    ],
  },
  {
    id: '6',
    title: 'Public Transmission Record',
    arabicTerm: 'Sijill al-\'Amm',
    category: 'Transparency',
    summary: 'The maintenance of a publicly accessible record of recognised transmission holders within the institution, enabling verification and preventing fraudulent claims of authorisation.',
    detail: 'Transparency in transmission is an institutional obligation. The public transmission record provides all seekers, scholars, and institutional partners with access to verified information about who holds recognised transmission authority within the institution. This record is neither a hierarchy of worth nor a ranking of spiritual attainment. It is simply an accurate, maintained record of institutional recognition that enables all parties to engage with appropriate information.',
    requirements: [
      'Registration in the institutional transmission record upon completion of bay\'a',
      'Annual confirmation of continued transmission relationship',
      'Immediate notification of the institution upon cessation of transmission relationship',
      'Consent to public listing as a condition of institutional recognition',
    ],
    institutionalNotes: [
      'The public record lists names, path affiliations, and dates of recognition only',
      'No spiritual assessments, rankings, or comparative information is included',
      'Removal from the record upon institutional sanction is automatic and immediate',
    ],
  },
];

const categoryColors: Record<string, string> = {
  'Authentication': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Ceremony & Ritual': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Governance': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Institutional Integrity': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'Institutional Continuity': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Transparency': 'bg-slate-400/20 text-slate-300 border-slate-400/30',
};

const stages = [
  { number: 1, label: 'Orientation', description: 'Introduction to the path, its lineage, and governance framework. No transmission obligations.' },
  { number: 2, label: 'Preparatory Period', description: 'Minimum 12-month structured preparation under a designated guide. Assessment of readiness.' },
  { number: 3, label: 'Formal Bay\'a', description: 'Witnessed adoption ceremony establishing mutual obligations between guide and received.' },
  { number: 4, label: 'Active Transmission', description: 'Ongoing transmission relationship with full governance accountability and annual review.' },
  { number: 5, label: 'Authorised Transmission', description: 'Recognition to transmit to others, subject to institutional approval and continuity planning.' },
];

export default function SufiChainAdoptionPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(chainElements.map(e => e.category)))];
  const filtered = filter === 'All' ? chainElements : chainElements.filter(e => e.category === filter);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Sufi Chain Adoption"
        description="Structured mentorship and documented transmission aligned with governance integrity and institutional accountability."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/inner-development" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Inner Development
          </Link>
        </div>

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                <Link2 className="w-6 h-6 text-[#C8A75E]" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Institutional Continuity & Ethical Transmission
                </h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-3">
                  The Sufi chain (silsila) is not merely a historical record. It is a living architecture
                  of trust, accountability, and verified transmission that connects each practitioner to
                  the founding source of the path. Chain adoption is the formal process through which an
                  individual enters this architecture, taking on both its gifts and its obligations.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed">
                  This institution approaches chain adoption with rigorous integrity: documented transmission,
                  governance accountability, and transparent institutional oversight, ensuring that the
                  living chain is protected both from fraudulent claim and from the well-intentioned but
                  unstructured enthusiasm that has historically led to chain fragmentation.
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-8">
              The Adoption Pathway
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#C8A75E] via-[#C8A75E]/50 to-[#C8A75E]/20 hidden md:block" />
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div key={stage.number} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E] to-[#C8A75E]/50 flex items-center justify-center text-[#0B0F2A] font-bold text-sm z-10">
                      {stage.number}
                    </div>
                    <Card className="flex-1 glass-panel border-white/5 p-5 hover:border-[#C8A75E]/20 transition-all">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-1">{stage.label}</h3>
                      <p className="text-sm text-[#AAB0D6]">{stage.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-6">
            Framework Components
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all border ${
                  filter === cat
                    ? 'bg-[#C8A75E] text-[#0B0F2A] border-[#C8A75E]'
                    : 'border-white/20 text-[#AAB0D6] hover:border-[#C8A75E]/50 hover:text-[#F5F3EE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filtered.map((element, index) => {
            const isExpanded = expanded === element.id;

            return (
              <ScrollReveal key={element.id} delay={index * 0.05}>
                <Card className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-all overflow-hidden">
                  <button
                    className="w-full p-6 text-left"
                    onClick={() => setExpanded(isExpanded ? null : element.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-5 h-5 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1.5">
                          <div>
                            <h3 className="text-xl font-serif font-semibold text-[#F5F3EE]">
                              {element.title}
                            </h3>
                            <p className="text-sm text-[#C8A75E] mt-0.5 italic">{element.arabicTerm}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={`${categoryColors[element.category] || 'bg-white/10 text-[#AAB0D6]'} text-xs hidden sm:flex`}>
                              {element.category}
                            </Badge>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-[#C8A75E]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#AAB0D6]" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-[#AAB0D6] leading-relaxed">
                          {element.summary}
                        </p>
                        <Badge className={`${categoryColors[element.category] || 'bg-white/10 text-[#AAB0D6]'} text-xs mt-3 sm:hidden`}>
                          {element.category}
                        </Badge>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-8 border-t border-white/5 pt-6">
                      <div className="pl-14 space-y-6">
                        <p className="text-[#AAB0D6] leading-relaxed">
                          {element.detail}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#C8A75E]" />
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {element.requirements.map((r, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-[#C8A75E] mt-0.5">•</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-amber-500/5 rounded-lg p-5 border border-amber-500/20">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-amber-400" />
                              Institutional Notes
                            </h4>
                            <ul className="space-y-2">
                              {element.institutionalNotes.map((n, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span>{n}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="glass-panel border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-[#C8A75E]" />
                <h3 className="text-lg font-serif font-semibold text-[#F5F3EE]">Mentorship Programs</h3>
              </div>
              <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4">
                Chain adoption begins with the formal mentorship relationship. Review available
                mentorship programs as a first step toward the adoption pathway.
              </p>
              <Button
                variant="outline"
                className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A] w-full"
                onClick={() => window.location.href = '/inner-development/mentorship'}
              >
                View Mentorship Programs
              </Button>
            </Card>

            <Card className="glass-panel border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                <h3 className="text-lg font-serif font-semibold text-[#F5F3EE]">Institute Ethics</h3>
              </div>
              <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4">
                The ethics framework governing institutional conduct provides the broader context
                within which transmission ethics and governance accountability operate.
              </p>
              <Button
                variant="outline"
                className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A] w-full"
                onClick={() => window.location.href = '/institute/ethics'}
              >
                Read Ethics Framework
              </Button>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
