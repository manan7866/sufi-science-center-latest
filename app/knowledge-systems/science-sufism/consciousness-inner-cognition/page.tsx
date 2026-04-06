'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Brain, Eye, Heart, Ear, Wind } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Brain,
    title: 'Soul Psychology & the Nafs Hierarchy',
    established: 'Developmental psychology models self-regulation as a layered process — from reactive impulse (amygdala-mediated) to reflective executive function (prefrontal cortex). Character development is empirically trainable through sustained practice.',
    sufi: 'The nafs (soul-self) is described in classical Sufi psychology as having distinct stations: al-ammara (commanding toward base desire), al-lawwama (self-reproaching), al-mulhama (inspired), al-mutmainna (tranquil), and beyond. Each represents a qualitative reorganization of the inner life.',
    overlap: 'Both frameworks recognize self-regulation as hierarchical and developmentally structured. The Sufi nafs stations map onto neuropsychological models of emotion regulation at a functional level — while operating at different scales of description.',
    divergence: 'Neuroscience describes mechanism; Sufi psychology describes meaning and orientation. The nafs is not a brain structure — it is an ontological category. These are not competing accounts of the same phenomenon.',
    openQuestions: [
      'Can the phenomenology of nafs transitions be mapped using experience-sampling methodology?',
      'What distinguishes genuine maqam consolidation from psychological stabilization without spiritual content?',
    ],
  },
  {
    icon: Eye,
    title: 'Inner Sight (Basirah) & Perceptual Models',
    established: 'Cognitive neuroscience has documented non-standard perceptual phenomena in advanced meditators: heightened interoception, altered attentional gating, and in some studies, anomalous perceptual accuracy. These findings are contested and require replication.',
    sufi: 'Basirah (inner sight) refers to the capacity of the heart-intellect to perceive what is veiled from sensory perception — including the interior states of others, the significance of events, and glimpses of unseen realities (ghayb) as permitted by divine disclosure.',
    overlap: 'Both traditions recognize that trained attention changes what is perceptible. The question of whether basirah involves a sixth perceptual modality or a heightened integration of ordinary perception remains philosophically open.',
    divergence: 'Basirah is not claimed as a trainable psychic power but as a gift (mawhibah) that develops proportionally with inner purification. It is not reducible to heightened sensory discrimination and makes ontological claims science cannot adjudicate.',
    openQuestions: [
      'What are the phenomenological markers that distinguish basirah from projection or wishful cognition?',
      'Can contemplative traditions offer verifiable predictive accounts that would constitute evidence for non-ordinary perception?',
    ],
  },
  {
    icon: Heart,
    title: 'Heart Intelligence & Qalb Epistemology',
    established: 'HeartMath research documents that the heart generates an electromagnetic field affecting brain states, and that cardiac coherence correlates with reduced stress reactivity and enhanced cognitive performance. This is physiological — not metaphysical.',
    sufi: 'The qalb (heart) in Islamic metaphysics is the seat of consciousness, moral discernment, and divine reception. It is not the biological organ but the subtle center that organ symbolizes. The health of the qalb determines the quality of all perception, knowledge, and action.',
    overlap: 'The convergence lies in the recognition that cognition is not brain-centered. Both frameworks resist the identification of mind with cortical processing alone. Heart-brain integration research provides a physiological basis for taking the heart seriously as a locus of intelligence.',
    divergence: 'Heart coherence is a measurable physiological state; qalb health is an ontological condition that cannot be detected by HRV analysis. These are complementary frames addressing different levels of reality.',
    openQuestions: [
      'Is there a relationship between chronic qalb states (as described by practitioners) and long-term cardiac coherence metrics?',
      'How do we distinguish heart-centered cognition from emotional bias in both scientific and traditional frameworks?',
    ],
  },
  {
    icon: Wind,
    title: 'Subtle Development & Latifah Science',
    established: 'No currently accepted scientific framework maps directly onto the Latifah system. Proximity is found in Polyvagal theory (hierarchical regulation of the nervous system) and in developmental models of interoceptive refinement.',
    sufi: 'The Lataif al-sitta (six subtle centers) are refined instruments of inner perception described in Naqshbandi and other Sufi schools. Each latifah is associated with a specific level of consciousness, a prophetic prototype, and a mode of divine nearness. Their activation represents a developmental sequence.',
    overlap: 'The idea that consciousness is not uniform — that different registers of awareness involve different instruments of perception — parallels neuroscientific interest in interoceptive hierarchies and the stratified architecture of inner experience.',
    divergence: 'The latifah system is an interior cartography that cannot be externally verified and does not claim empirical corroboration. It belongs to the domain of transmitted experiential knowledge, validated through the lineage and the master-student relationship.',
    openQuestions: [
      'Can the subjective experience associated with specific latifah activations be characterized phenomenologically in terms accessible to cross-disciplinary inquiry?',
      'What are the developmental prerequisites for latifah responsiveness?',
    ],
  },
  {
    icon: Ear,
    title: 'Spiritual Hearing, Taste & Sacred Touch',
    established: 'Synesthesia research documents cross-modal perceptual integration — where stimulation of one sense activates another. Gustatory and auditory cortices are implicated in aesthetic and spiritual experience in neuroimaging studies of music and prayer.',
    sufi: 'Dhawq (spiritual taste), sama (sacred listening), and the subtle receptivity of touch are described as modes of inner perception that become refined through practice. Dhawq specifically is the criterion for recognizing authentic spiritual knowledge — the one who has tasted does not need argument.',
    overlap: 'Both traditions recognize that advanced practitioners describe perceptual experiences that cross ordinary sensory categories. The question is whether these constitute unusual integration of ordinary senses or point to distinct perceptual modalities.',
    divergence: 'Dhawq is an epistemological claim — not merely a phenomenological one. It asserts that certain forms of knowledge are only accessible through direct experience and cannot be transmitted propositionally. This claim science cannot invalidate, but it also cannot validate it.',
    openQuestions: [
      'Can the dhawq criterion be formalized as an internal validity check within contemplative epistemology?',
      'What is the relationship between aesthetic sensitivity (to music, calligraphy, recitation) and advanced contemplative development?',
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
          <div className="w-10 h-10 rounded-lg bg-[#7BAFD4]/10 border border-[#7BAFD4]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#7BAFD4]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#7BAFD4] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#7BAFD4]' : 'text-[#AAB0D6]/30'}`}
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

export default function ConsciousnessInnerCognitionPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Consciousness & Inner Cognition"
        description="Comparative models of awareness, inner knowing, and the architecture of the self — from neuroscientific accounts of mind to classical Sufi phenomenology of the heart."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-6 border border-[#7BAFD4]/15 rounded-xl bg-[#7BAFD4]/5">
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                The domains explored here are framed as <strong className="text-[#F5F3EE]">comparative phenomenological models</strong> — not empirically verified claims. Where neuroscience offers relevant data, connections are noted with care. Where they diverge, the divergence is preserved rather than papered over.
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
              <span className="text-[#AAB0D6]/70">Consciousness & Inner Cognition</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Back to Science & Sufism
              </Link>
              <Link
                href="/knowledge-systems/science-sufism/quantum-fundamental-reality"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Next: Quantum & Non-Local Ontologies
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
