'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Link2, Network, BookOpen, Shield, Layers } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Network,
    title: 'Silsila Dynamics & Network Topology',
    established: 'Network science has established that information transmission in social networks follows predictable topological principles. Scale-free networks with hub nodes (highly connected individuals) transmit information more efficiently and are more resilient to random failure but more vulnerable to targeted removal of hubs.',
    sufi: 'The silsila (chain) is the unbroken transmission of spiritual authority from the Prophet through successive masters. It is not merely a list of names but a living network through which baraka (blessing) flows. The master is not just a teacher but a transmitter of a specific form of spiritual presence.',
    overlap: 'Network science provides analytical tools for understanding how silsilas function as transmission systems: who occupies hub positions, what is the average path length between practitioners and the source, and how network resilience varies with structure.',
    divergence: 'Network topology describes the structure of information flow; silsila is concerned with the authenticity and living quality of what is transmitted. A silsila with perfect network topology but interrupted spiritual transmission is an empty chain. The formal analysis cannot assess the latter.',
    openQuestions: [
      'Can network analysis of historical silsilas reveal patterns in how the tradition expanded, fragmented, or concentrated?',
      'What distinguishes a living silsila from a nominal chain of transmission — and who has the authority to make that determination?',
    ],
  },
  {
    icon: BookOpen,
    title: 'Sacred Transmission & Epigenetic Parallels',
    established: 'Epigenetics has established that gene expression is heritable without DNA sequence changes — traumatic experiences, nutritional states, and environmental exposures can alter the epigenome across generations. The mechanisms are biological, not spiritual.',
    sufi: 'Sacred transmission in the Sufi tradition involves the transmission of hal (state), barakah (blessing), and istidad (spiritual preparedness) from master to disciple. This transmission is not informational — it involves a genuine transformation of the disciple\'s inner constitution through proximity, practice, and divine permission.',
    overlap: 'Both frameworks recognize that what is transmitted between generations is not limited to explicit information. The epigenetic parallel highlights that biological inheritance includes experiential and environmental history. Sacred transmission parallels this by claiming that spiritual experience is transmissible in ways that reshape the recipient.',
    divergence: 'Epigenetic transmission is a biological mechanism involving measurable molecular changes. Sacred transmission is a spiritual ontological event. Suggesting that epigenetics explains or validates spiritual transmission confuses two entirely different types of claims.',
    openQuestions: [
      'Are there measurable psychophysiological correlates to the experience of being in the presence of a recognized spiritual master?',
      'How does the Sufi concept of tarbiyah (spiritual formation) compare to pedagogical models of transformative learning in contemporary educational research?',
    ],
  },
  {
    icon: Shield,
    title: 'Knowledge Preservation Across Disruption',
    established: 'Cultural transmission research (Henrich, Richerson) has established that cumulative cultural knowledge — including sophisticated techniques — can be lost when transmission chains are disrupted. Recovery requires either contact with surviving practitioners or reconstruction from artifacts.',
    sufi: 'The preservation of the Prophetic inheritance (turath) across centuries of political disruption, colonial fragmentation, and modernist pressure represents one of the most demanding cultural transmission challenges in human history. The living chain has survived through the dedication of masters in every generation.',
    overlap: 'Both frameworks recognize the fragility of transmitted knowledge and the conditions required for its survival. The cultural transmission literature provides analytical tools for understanding why some silsilas have thrived and others have atrophied.',
    divergence: 'Cultural transmission research treats all transmitted knowledge as equivalent in type. Sufi transmission insists on a qualitative distinction between information (which can be preserved in books) and hal (spiritual state), which requires living transmission. The survival of texts is not the survival of the tradition.',
    openQuestions: [
      'What institutional structures have been most successful in preserving living transmission through historical disruptions?',
      'How should the tradition respond when critical transmission links are no longer available?',
    ],
  },
  {
    icon: Layers,
    title: 'Prophetic Inheritance & Authoritative Chains',
    established: 'Historical scholarship has established robust methods for assessing the reliability of oral transmission chains (isnad). The development of hadith criticism (ilm al-rijal) represents one of the most sophisticated pre-modern systems for source criticism and reliability assessment.',
    sufi: 'The transmission of hadith and the transmission of spiritual state (hal) are related but distinct. The former is verified through isnad criticism. The latter is verified through the internal consistency of the transmitted teaching, its correspondence with Revelation, and the ongoing testimony of the lineage.',
    overlap: 'Both hadith criticism and Sufi transmission theory grapple with the same fundamental problem: how to verify the authenticity of transmission across time when the original source is no longer present. Both developed internal consistency criteria and external verification methods.',
    divergence: 'Isnad criticism is a historical-critical discipline applicable to text. The verification of spiritual transmission involves experiential criteria that cannot be applied from outside the tradition. These are methodologically incommensurable forms of verification.',
    openQuestions: [
      'Can contemporary Islamic scholarship develop rigorous criteria for evaluating claims to living spiritual authority?',
      'What is the relationship between textual authenticity and living transmission in the hierarchy of evidence?',
    ],
  },
  {
    icon: Link2,
    title: 'Wisdom Activation & Developmental Thresholds',
    established: 'Developmental psychology (Piaget, Fischer, Commons) has documented that cognitive capacities emerge at specific developmental thresholds that cannot be accelerated beyond certain limits. Later stages require consolidation of earlier ones as prerequisites.',
    sufi: 'In the Sufi path, maqamat (stations) are sequential and cannot be bypassed. Each station represents a stabilized transformation of character and consciousness that serves as the foundation for the next. Premature exposure to higher teachings without foundational preparation is considered harmful.',
    overlap: 'Both frameworks treat development as genuinely hierarchical — not merely cumulative. The requirement for structural prerequisites before higher capacities can emerge is a shared architectural principle. This challenges both the "instant enlightenment" model and the mere-information model of spiritual education.',
    divergence: 'Developmental psychology operates with empirically measurable cognitive structures. Sufi maqamat are characterized primarily by their ethical and relational qualities — degrees of sincerity, presence, and dependence on God — that are not directly mappable onto cognitive stage frameworks.',
    openQuestions: [
      'Can developmental assessment tools be adapted to track Sufi maqam progression in research contexts?',
      'What is the relationship between intellectual development (\'aql) and spiritual development (tarbiyah) in classical Islamic pedagogy?',
    ],
  },
];

function AreaCard({ area }: { area: typeof AREAS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = area.icon;

  return (
    <div className="border border-white/6 rounded-xl bg-white/[0.015] hover:border-white/10 transition-all duration-200">
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#AAB0D6]/10 border border-[#AAB0D6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#AAB0D6]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#AAB0D6] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#AAB0D6]' : 'text-[#AAB0D6]/30'}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/6 pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#7BAFD4]/5 border border-[#7BAFD4]/12">
              <p className="text-[10px] font-bold text-[#7BAFD4] uppercase tracking-widest mb-2">Scientific Framework</p>
              <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.established}</p>
            </div>
            <div className="p-4 rounded-lg bg-[#C8A75E]/5 border border-[#C8A75E]/12">
              <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">Sufi Tradition</p>
              <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.sufi}</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#8BB89A]/5 border border-[#8BB89A]/12">
            <p className="text-[10px] font-bold text-[#8BB89A] uppercase tracking-widest mb-2">Structural Overlap</p>
            <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.overlap}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/6">
            <p className="text-[10px] font-bold text-[#AAB0D6]/50 uppercase tracking-widest mb-2">Where They Diverge</p>
            <p className="text-[12px] text-[#AAB0D6]/70 leading-relaxed">{area.divergence}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#D4A07B] uppercase tracking-widest mb-2">Open Research Questions</p>
            <ul className="space-y-1.5">
              {area.openQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4A07B] text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/75 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KnowledgeTransmissionPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Knowledge Transmission & Lineage Dynamics"
        description="How spiritual knowledge is transmitted, preserved, and verified across generations — examined through network science, cultural transmission research, and classical Sufi epistemology of the chain."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-6 border border-[#AAB0D6]/15 rounded-xl bg-[#AAB0D6]/5">
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                Silsila and transmission are analyzed using frameworks from cultural transmission research, network science, and institutional theory. <strong className="text-[#F5F3EE]">Spiritual authenticity claims are treated as internal to the tradition</strong> — not reducible to sociological or network analysis, but also not exempt from intellectual scrutiny.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              {AREAS.map((area) => (
                <AreaCard key={area.title} area={area} />
              ))}
            </div>
          </ScrollReveal>

          <div className="pt-8 border-t border-white/6">
            <div className="flex items-center gap-2 text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-6">
              <Link href="/knowledge-systems" className="hover:text-[#AAB0D6]/70 transition-colors">Knowledge Systems</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/knowledge-systems/science-sufism" className="hover:text-[#AAB0D6]/70 transition-colors">Science & Sufism</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#AAB0D6]/70">Knowledge Transmission</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism/sacred-ecology"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Previous: Sacred Ecology
              </Link>
              <Link
                href="/knowledge-systems/science-sufism/sacred-expression"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Next: Sacred Expression
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
