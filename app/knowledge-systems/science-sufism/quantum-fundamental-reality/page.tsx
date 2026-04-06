'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Atom, Waves, Sigma, Grid, AlertTriangle } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Waves,
    title: 'Quantum Dynamics & Superposition Ontologies',
    established: 'Quantum superposition describes how particles exist in multiple states simultaneously until measurement collapses the wavefunction. This is a mathematical formalism with extraordinary predictive power — not a philosophical claim about the nature of reality.',
    sufi: 'Islamic metaphysics describes the continual renewal of creation (tajdid al-khalq) — the idea that existence is reinstantiated at every moment, maintaining the appearance of continuity while being ontologically discontinuous. This is a metaphysical claim about divine sustenance, not physics.',
    overlap: 'Both frameworks challenge the intuitive model of stable, persistent objects. Superposition and moment-to-moment creation share a structural commitment to non-persistence as fundamental. The analogy is suggestive but not explanatory in either direction.',
    divergence: 'Quantum superposition is scale-limited and decoherence prevents macro-level quantum behavior. The classical world is classical. Tajdid al-khalq is an ontological doctrine about divine omnipotence — it operates at a different level of description entirely.',
    openQuestions: [
      'Does the metaphor of superposition add anything to the traditional philosophical account of contingent being?',
      'Can the mathematics of quantum state evolution be used to formalize concepts of spiritual potential and actualization?',
    ],
  },
  {
    icon: Atom,
    title: 'Non-Local Correlations & Unity of Being',
    established: 'Quantum entanglement is a well-verified phenomenon where measurements on spatially separated particles are correlated in ways that cannot be explained by local hidden variables (Bell theorem). It does not allow faster-than-light communication.',
    sufi: 'Wahdat al-Wujud (Unity of Being) — associated with Ibn Arabi — holds that all existence is a single reality differentiated by degrees of manifestation. Unity is ontological, not empirical, and does not refer to physical correlations between particles.',
    overlap: 'Both point beyond naive classical separability. Entanglement shows the universe is not simply a collection of independently existing local objects; Wahdat al-Wujud says existence is fundamentally one. The structural resonance is philosophically interesting.',
    divergence: 'Entanglement is a quantum mechanical correlation between states — it does not make particles "the same thing." Wahdat al-Wujud is a metaphysical account of the relationship between Creator and creation. Using entanglement to validate Wahdat al-Wujud is a category error.',
    openQuestions: [
      'What is the correct formal relationship (if any) between quantum non-locality and metaphysical non-duality?',
      'Can the philosophical tradition of Islamic occasionalism (kalam) be placed in productive dialogue with quantum indeterminacy?',
    ],
  },
  {
    icon: Grid,
    title: 'Holographic Principles & Levels of Manifestation',
    established: 'The holographic principle in theoretical physics (\'t Hooft, Susskind) proposes that the information content of a volume of space can be encoded on its boundary surface. AdS/CFT correspondence provides a mathematical implementation. This is speculative theoretical physics, not established cosmology.',
    sufi: 'The concept of levels of manifestation (hadarat) in Islamic metaphysics — from the Divine Essence through the levels of Names, Spirits, Imagination, and sensory reality — describes a hierarchical structuring of existence in which higher levels contain lower ones as modes of their expression.',
    overlap: 'Both suggest that apparent three-dimensional physical reality is a "projection" or encoding of a higher-dimensional informational structure. The holographic principle provides a contemporary scientific metaphor for classical ideas about the relationship between apparent and real.',
    divergence: 'The holographic principle is a mathematical conjecture in high-energy physics about black hole thermodynamics. The hadarat are an ontological taxonomy of modes of being. They are incommensurable frameworks using the word "levels" in entirely different senses.',
    openQuestions: [
      'Is there a non-trivial formal parallel between information-theoretic accounts of spacetime emergence and the Sufi account of manifestation from the Divine Names?',
    ],
  },
  {
    icon: Sigma,
    title: 'Multiversal Models & Islamic Metaphysics',
    established: 'The multiverse is a family of speculative hypotheses in cosmology (Everett many-worlds, inflationary multiverse, string landscape) — none currently empirically testable. These are theoretical frameworks with varying degrees of scientific credibility.',
    sufi: 'The concept of \'awalam (worlds, dimensions of reality) in Islamic metaphysics acknowledges multiple orders of reality beyond the physical — the \'alam al-malakut (world of sovereignty), \'alam al-jabarut (world of power), and \'alam al-lahut (divine world). These are ontological claims, not cosmological ones.',
    overlap: 'Both frameworks refuse to identify visible physical reality with the totality of what exists. The Sufi worlds and the multiverse share a structural commitment to reality exceeding empirical accessibility.',
    divergence: 'Multiverse hypotheses are attempts to explain fine-tuning in physics without invoking design; they remain within a naturalistic framework. The Sufi worlds are hierarchically ordered domains of divine activity and do not refer to parallel physical universes.',
    openQuestions: [
      'Does the concept of the Intermediate World (\'alam al-khayal, the World of Imagination) have any structural parallel in modern accounts of consciousness and virtual representation?',
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
          <div className="w-10 h-10 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#C8A75E]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#C8A75E]' : 'text-[#AAB0D6]/30'}`}
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

export default function QuantumFundamentalRealityPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Quantum Theory & Non-Local Ontologies"
        description="Where quantum mechanics raises interpretive questions about observation, non-locality, and the structure of reality — examined alongside classical Islamic metaphysical frameworks, with rigorous distinction between science and analogy."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-5 border border-amber-500/20 rounded-xl bg-amber-500/5 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                Quantum mechanics is among the most misappropriated scientific frameworks in popular spiritual discourse. This domain maintains a strict distinction between <strong className="text-[#F5F3EE]">established physics</strong>, <strong className="text-[#F5F3EE]">speculative interpretations</strong>, and <strong className="text-[#F5F3EE]">symbolic-philosophical analogies</strong>. Analogies are presented as intellectually interesting — not as validations.
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
              <span className="text-[#AAB0D6]/70">Quantum & Non-Local Ontologies</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism/consciousness-inner-cognition"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Previous: Consciousness & Inner Cognition
              </Link>
              <Link
                href="/knowledge-systems/science-sufism/systems-energetics"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Next: Systems & Energetics
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
