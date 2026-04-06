'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Star, Hexagon, Music, PenTool, Hash } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Hexagon,
    title: 'Geometric Harmonics & Mathematical Ontology',
    established: 'Mathematics describes geometric patterns with extraordinary precision. The appearance of specific ratios (phi, pi, root-2) across natural systems — from shell growth to crystal structure to plant phyllotaxis — is empirically documented and explained by growth optimization principles.',
    sufi: 'Sacred geometry in Islamic tradition (manifest in mosque tilework, muqarnas, and geometric calligraphy) expresses the principle that mathematical structures reveal divine order. Geometry is not merely decorative but ontological — it discloses the structural principles embedded in creation.',
    overlap: 'Both frameworks recognize that mathematical structures are not arbitrary but somehow correspond to deep features of reality. Whether this correspondence is "just" optimization or reveals something about the nature of existence is genuinely philosophically open.',
    divergence: 'The mathematical recurrence of specific ratios is explained by physical and biological optimization processes — not by divine design encoded in number. Sacred geometry is a symbolic ontology, not a physics claim. Using Fibonacci sequences to "prove" divine order conflates mathematical description with theological interpretation.',
    openQuestions: [
      'What is the cognitive function of geometric pattern as a contemplative object — and can its effects on attention and inner state be studied?',
      'How does the aesthetic experience of perfect geometric proportion relate to the phenomenology of inner order described by contemplatives?',
    ],
  },
  {
    icon: Music,
    title: 'Acoustical Engineering & the Science of Sama',
    established: 'Music cognition research has established that music affects emotional states, autonomic arousal, motor responses, and social bonding through well-characterized neurological mechanisms. Rhythm entrainment — synchronization of biological oscillators to external rhythms — is well-documented.',
    sufi: 'Sama (spiritual listening/audition) in the Sufi tradition is not mere music appreciation but a carefully structured practice in which sound becomes a vehicle for tawajjud (inducing states of spiritual presence). The science of sama addresses what can be heard, by whom, under what conditions, and what its limits are.',
    overlap: 'Both frameworks take seriously the transformative power of organized sound. Rhythm entrainment provides a neurological mechanism for at least part of what happens in structured sama. The elevation of inner states through music has physiological correlates that support the experiential account.',
    divergence: 'Sama at its highest levels concerns states of spiritual presence that transcend aesthetic emotion. The neural correlates of musical emotion do not exhaust the description of what is happening in accomplished sama practice. The physiological account is necessary but not sufficient.',
    openQuestions: [
      'Can the specific modalities of classical sama poetry (maqam, meter, repetition) be studied for their differential effects on inner state?',
      'What distinguishes sama from concert listening, and what does that distinction reveal about the nature of transformative auditory experience?',
    ],
  },
  {
    icon: PenTool,
    title: 'Illuminated Calligraphy as Visual Metaphysics',
    established: 'Visual perception research has documented that aesthetic objects capture involuntary attention, modulate emotional states, and produce measurable responses in neural reward circuits. Highly skilled craftsmanship is recognized across cultures as aesthetically significant.',
    sufi: 'Islamic calligraphy is not primarily decorative art. It is a spiritual discipline in which the calligrapher\'s inner state is considered to determine the quality of the work — and through which the viewer encounters not just text but the lived quality of the writer\'s presence. The Bismillah in a master\'s hand carries something beyond its pixels.',
    overlap: 'The claim that the quality of a skilled practitioner\'s inner state affects the quality and impact of their work is partially supported by research on aesthetic expertise, flow states, and the measurable qualities of exceptional craftsmanship.',
    divergence: 'The claim that baraka (spiritual blessing) is transmissible through calligraphic work cannot be assessed by neural aesthetic response studies. This is a tradition-internal claim about spiritual reality — not an empirical hypothesis.',
    openQuestions: [
      'Can the contemplative state of the calligrapher be reliably identified in the physical characteristics of the completed work?',
      'What is the phenomenology of receiving a spiritual text as a contemplative object versus as information?',
    ],
  },
  {
    icon: Star,
    title: 'Wisdom Poetry & Symbolic Cognition',
    established: 'Cognitive linguistics has established that conceptual metaphor is not merely ornamental but structurally constitutive of thought — we understand abstract concepts through embodied metaphorical mappings. Narrative and poetry engage integrative neural processing that propositional language does not.',
    sufi: 'Sufi poetry (Rumi, Ibn Arabi, Hafiz, Yunus Emre) operates through layered symbolic systems where apparent subjects (wine, the beloved, the tavern) simultaneously encode spiritual states, theological propositions, and direct invitations to inner experience. The poem is not a container for meaning but a vehicle for transmission.',
    overlap: 'Both cognitive linguistics and Sufi poetics recognize that certain forms of meaning cannot be conveyed propositionally — they require the structural engagement of metaphor, image, and rhythm. Wisdom poetry exploits the full architecture of human meaning-making in ways that didactic prose cannot.',
    divergence: 'Cognitive linguistics can explain how symbolic poetry functions as a meaning-making system. It cannot assess whether the transmission of hal (spiritual state) through poetry — claimed in the tradition — actually occurs in a sense beyond emotional resonance. That claim requires internal verification.',
    openQuestions: [
      'Can cross-linguistic studies of Sufi poetic traditions identify universal and culture-specific elements in the symbolic systems used?',
      'What is the relationship between depth of understanding of symbolic language and depth of inner development in the listener?',
    ],
  },
  {
    icon: Hash,
    title: 'Divine Numerology as Structural Symbolism',
    established: 'Number theory is a precise mathematical discipline. The properties of specific numbers — their factors, relationships, and recurrences — are mathematically real. The appearance of specific numbers in significant contexts is subject to selection and confirmation bias in human pattern recognition.',
    sufi: 'Ilm al-huruf wa\'l-awfaq (the science of letters and squares) and related disciplines use the numerical values of Arabic letters (abjad) to explore structural relationships between Quranic terms and cosmological principles. This is a traditional interpretive framework — not a truth-claim about arithmetic.',
    overlap: 'Both traditions recognize that numerical structure is not arbitrary and that certain patterns carry significance. The symbolic use of number as a tool for contemplative attention has a long history across traditions and has demonstrable effects on the quality of reflection.',
    divergence: 'Divine numerology must be explicitly framed as a symbolic-hermeneutical practice, not an empirical claim. The appearance of specific numbers in sacred texts does not constitute evidence of mathematical encoding. The practice\'s value is contemplative and hermeneutical — not predictive or scientific.',
    openQuestions: [
      'What is the appropriate intellectual framework for engaging traditional Islamic numerological traditions — treating them as genuine symbolic ontologies rather than either dismissing them as superstition or misrepresenting them as hidden science?',
      'How do the hermeneutical results of abjad analysis compare to other classical interpretive methods applied to the same texts?',
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
          <div className="w-10 h-10 rounded-lg bg-[#C8B4E8]/10 border border-[#C8B4E8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#C8B4E8]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#C8B4E8] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#C8B4E8]' : 'text-[#AAB0D6]/30'}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/6 pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#7BAFD4]/5 border border-[#7BAFD4]/12">
              <p className="text-[10px] font-bold text-[#7BAFD4] uppercase tracking-widest mb-2">Scientific Perspective</p>
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

export default function SacredExpressionPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Sacred Expression & Symbolic Science"
        description="Geometry, sacred sound, calligraphy, and poetry as structured languages encoding cosmological knowledge — examined through cognitive science, aesthetics, and contemplative hermeneutics."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-6 border border-[#C8B4E8]/15 rounded-xl bg-[#C8B4E8]/5">
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                Sacred arts are explored as <strong className="text-[#F5F3EE]">structured symbolic ontologies</strong> — not as empirical science. Connections to mathematics, cognitive science, and acoustics are noted where relevant. Claims remain bounded by their domain: contemplative, hermeneutical, and aesthetic — not predictive or quantitative.
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
              <span className="text-[#AAB0D6]/70">Sacred Expression</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism/knowledge-transmission"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Previous: Knowledge Transmission
              </Link>
              <Link
                href="/knowledge-systems/science-sufism"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Back to Science & Sufism
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
