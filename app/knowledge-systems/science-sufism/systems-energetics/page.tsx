'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Zap, Radio, Activity, Wind, Network } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Activity,
    title: 'Bioenergetic Fields & Latifah Physiology',
    established: 'Bioelectromagnetic research has established that living organisms generate measurable electromagnetic fields. Biophoton emission from cells is documented. Cardiac electromagnetic fields are measurable at a distance. Heart rate variability (HRV) is an established marker of autonomic nervous system coherence.',
    sufi: 'The Lataif al-sitta (subtle centers) of the Naqshbandi tradition — the Qalb (heart), Ruh (spirit), Sirr (secret), Khafi (hidden), Akhfa (most hidden), and Nafs (self) — are described as energetic-spiritual organs with distinct phenomenological signatures and developmental functions.',
    overlap: 'Both frameworks locate consciousness and its development in structured, hierarchical body-based systems. The cardiac electromagnetic field provides a measurable substrate that resonates with the emphasis on the qalb as the primary center.',
    divergence: 'The Lataif are ontological categories — not anatomical structures or electromagnetic emitters. They cannot be detected by bioelectromagnetic measurement. The physiological and metaphysical accounts are complementary frameworks, not the same account at different resolutions.',
    openQuestions: [
      'Can trained practitioners identify consistent somatic correlates for each latifah activation?',
      'Does sustained latifah practice produce detectable HRV signatures compared to general meditation?',
    ],
  },
  {
    icon: Radio,
    title: 'Electromagnetic Phenomena & Spiritual Light (Nur)',
    established: 'The electromagnetic spectrum is a well-characterized physical reality. Light operates within the visible band. Biophotons — ultra-weak photon emissions from biological organisms — are real and measurable. Their functional significance beyond cellular signaling is speculative.',
    sufi: 'Nur (divine light) in the Islamic tradition is not electromagnetic radiation. It is the primordial attribute of divine guidance — as in the Ayat al-Nur (24:35) — manifesting through the Prophet and through purified hearts. It is a metaphysical category, not a physical phenomenon.',
    overlap: 'Both traditions use light as a master metaphor for knowledge, guidance, and the capacity to make things knowable. The metaphorical resonance is deep and cross-cultural. Light illuminates what was dark — this structural function operates in both domains.',
    divergence: 'Electromagnetic light and metaphysical nur are not the same thing. Claims that biophoton research validates spiritual light doctrines conflate two fundamentally different uses of the term. Nur is not light in the physics sense.',
    openQuestions: [
      'What is the cognitive function of light metaphors in spiritual epistemology — and do they constrain or enable genuine inquiry?',
      'Is there a relationship between the quality of inner states and biophoton coherence patterns in practitioners?',
    ],
  },
  {
    icon: Wind,
    title: 'Circulation Systems & Tawakkul (Divine Reliance)',
    established: 'Psychoneuroimmunology has established robust connections between psychological states — particularly chronic stress and its opposite, states of ease and trust — and immune function, inflammatory markers, and cardiovascular health. Trust and safety activate the parasympathetic nervous system.',
    sufi: 'Tawakkul (complete reliance on God) is not passivity but a specific interior stance — the cessation of anxious self-management in the recognition that outcomes are entirely in divine hands. Classical Sufi teachers describe its physiological effect as a distinctive lightness and metabolic ease.',
    overlap: 'The physiological literature on trust, safety, and parasympathetic activation provides an indirect but genuine correlate to the documented effects of tawakkul. The subjective experience described by practitioners corresponds to what Polyvagal theory calls a ventral vagal state.',
    divergence: 'Tawakkul is a theological virtue with ontological content — it concerns the real relationship between the servant and God. Parasympathetic activation is a physiological state. Reducing one to the other misses what makes tawakkul spiritually significant.',
    openQuestions: [
      'Can the degree of tawakkul be correlated with autonomic flexibility measures in long-term practitioners?',
      'How does the Islamic theological content of tawakkul differentiate it from secular mindfulness-based acceptance?',
    ],
  },
  {
    icon: Network,
    title: 'Systems Emergence & Hierarchical Wujud',
    established: 'Complex systems science has documented emergence — the appearance of qualitatively new properties in systems that cannot be predicted from the behavior of components. Consciousness, life, and social organization are all examples of emergent phenomena from a scientific standpoint.',
    sufi: 'The concept of hierarchical wujud (being) in Islamic metaphysics describes reality as constituted by levels — from pure divine existence (wujud mutlaq) through increasingly determinate levels of manifestation. Each level is ontologically dependent on the level above it.',
    overlap: 'Both frameworks resist reductionism — the view that higher-level phenomena are nothing but their lower-level components. Emergence in systems science and hierarchical wujud both insist that organization at higher levels constitutes genuinely novel reality.',
    divergence: 'Emergence in systems science is a scientific claim about the behavior of complex physical systems. Hierarchical wujud is a metaphysical claim about the ontological dependence of all existence on the divine. These are claims at entirely different levels of analysis.',
    openQuestions: [
      'Can systems theory provide formal models for the concept of levels of reality without reducing the metaphysical claim to the scientific one?',
      'What is the relationship between hierarchical emergence in complex systems and the classical Islamic concept of the gradation of divine Names in manifestation?',
    ],
  },
  {
    icon: Zap,
    title: 'Force Amplification & Himma (Spiritual Resolve)',
    established: 'Goal-directed behavior, willpower, and motivational intensity are studied in psychology through self-determination theory, implementation intentions research, and neural studies of goal representation. Focused intention amplifies action-selection strength in measurable ways.',
    sufi: 'Himma is the concentrated spiritual resolve of the awakened will — the force by which a Sufi master focuses intent on a disciple, a situation, or a state. In classical literature, himma is described as capable of producing effects beyond ordinary causal mechanisms when concentrated in the realized seeker.',
    overlap: 'Both traditions recognize that intense, directed intentionality produces effects beyond habitual action. Focused intention has measurable effects on behavior, attention, and in some contested research, on external systems.',
    divergence: 'Himma in the classical sense includes a claim about non-ordinary causation — that spiritual resolve can act at a distance. This is not supported by mainstream science and must be treated as a tradition-internal claim requiring internal verification criteria rather than external empirical validation.',
    openQuestions: [
      'What distinguishes himma from ordinary intention in phenomenological terms?',
      'Does the concept of himma have structural parallels in the psychological literature on collective intentionality and shared mental states?',
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
          <div className="w-10 h-10 rounded-lg bg-[#8BB89A]/10 border border-[#8BB89A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#8BB89A]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#8BB89A] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#8BB89A]' : 'text-[#AAB0D6]/30'}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/6 pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#7BAFD4]/5 border border-[#7BAFD4]/12">
              <p className="text-[10px] font-bold text-[#7BAFD4] uppercase tracking-widest mb-2">Established Science</p>
              <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.established}</p>
            </div>
            <div className="p-4 rounded-lg bg-[#C8A75E]/5 border border-[#C8A75E]/12">
              <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">Sufi Metaphysics</p>
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

export default function SystemsEnergeticsPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Systems, Energetics & Field Dynamics"
        description="Bioenergetics, complex systems, and field phenomena examined alongside Sufi frameworks of subtle force, circulation, and divine sustenance — with clear epistemic demarcation throughout."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-6 border border-[#8BB89A]/15 rounded-xl bg-[#8BB89A]/5">
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                Subtle energy concepts are approached as <strong className="text-[#F5F3EE]">hypothesis space and comparative frameworks</strong>. Where measurable physiological correlates exist, they are noted. Where they do not, epistemic status is clearly stated. No claim is made that bioelectromagnetic research validates classical energy frameworks.
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
              <span className="text-[#AAB0D6]/70">Systems & Energetics</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism/quantum-fundamental-reality"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Previous: Quantum & Non-Local Ontologies
              </Link>
              <Link
                href="/knowledge-systems/science-sufism/sacred-ecology"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Next: Sacred Ecology
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
