'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Compass, BookOpen, FlaskConical, Microscope, Layers, Brain, Atom, Zap, Leaf, Link2, Star, ArrowRight } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const EPISTEMOLOGICAL_COMPARISON = [
  {
    dimension: 'Source of Knowledge',
    empirical: 'Sensory data, measurement, reproducible experiment',
    sufi: 'Inner witnessing (mushahada), transmitted wisdom (ilm), direct unveiling (kashf)',
  },
  {
    dimension: 'Verification Method',
    empirical: 'Peer review, replication, falsifiability (Popperian model)',
    sufi: 'Consent of the master, lineage transmission, consistency with Revelation',
  },
  {
    dimension: 'Subject of Inquiry',
    empirical: 'External phenomena, measurable processes, third-person data',
    sufi: 'First-person consciousness, inner states, quality of presence',
  },
  {
    dimension: 'Ontological Commitment',
    empirical: 'Physical reality as primary; consciousness as emergent',
    sufi: 'Consciousness as primary; physical reality as derivative manifestation',
  },
  {
    dimension: 'Role of Observer',
    empirical: 'Observer ideally minimized or controlled to ensure objectivity',
    sufi: 'Observer is the primary instrument; purification of observer is the methodology',
  },
  {
    dimension: 'Goal of Inquiry',
    empirical: 'Predictive models, causal explanation, technological application',
    sufi: 'Knowledge that transforms the knower; nearness to Ultimate Reality',
  },
];

const CONVERGENCE_AREAS = [
  {
    id: 'consciousness',
    icon: Microscope,
    title: 'Consciousness Research',
    description: 'Both traditions engage the nature and limits of conscious experience. Cognitive science and contemplative phenomenology share an interest in the structure of awareness, attention, and the conditions for altered states.',
    points: [
      'Default Mode Network research parallels accounts of ego-dissolution in advanced contemplative states',
      'Attention training research (neuroscience) intersects with the Sufi emphasis on huzur (sustained presence)',
      'Integrated Information Theory engages questions about the primacy of consciousness that mystics posed centuries earlier',
      'Neuroplasticity research supports classical claims about the trainability of inner states and character (akhlaq)',
    ],
  },
  {
    id: 'complexity',
    icon: Layers,
    title: 'Complex Systems & Emergence',
    description: 'Systems theory, network science, and the study of emergent phenomena offer analytical frameworks that resonate with classical accounts of how multiplicity arises from unity.',
    points: [
      'Emergence — the appearance of qualitatively new properties in complex systems — mirrors discussions in Islamic metaphysics on the levels of wujud (being)',
      'Self-organizing systems exhibit properties not reducible to their components, a structural parallel to accounts of higher-order psychic integration',
      'Feedback dynamics in complex systems illuminate the Sufi concept of progressive self-regulation in the nafs',
      'Scale-free network structures reflect hierarchical organizational principles found in silsila theory',
    ],
  },
  {
    id: 'psychology',
    icon: BookOpen,
    title: 'Contemplative Psychology',
    description: 'Third-wave cognitive behavioral therapy, mindfulness research, and positive psychology have independently recovered practices and models with centuries of precedent in Islamic contemplative tradition.',
    points: [
      'Metacognitive awareness (monitoring of thought without identification) is central to both ACT therapy and Sufi nafs discipline',
      'Character virtue research in positive psychology finds parallels in the classical maqamat (station) literature',
      'Self-compassion research (Neff) maps onto the Sufi concept of raja (hope) balanced with khawf (accountability)',
      'Exposure-based trauma processing parallels the contemplative practice of confronting nafs-level resistance',
    ],
  },
  {
    id: 'quantum',
    icon: FlaskConical,
    title: 'Quantum Frameworks & Caution',
    description: 'Quantum physics has been invoked in popular discourse to validate mystical claims. This section notes where the analogy is legitimate and where it breaks down.',
    points: [
      'Quantum non-locality does not demonstrate the unity of consciousness claimed by Wahdat al-Wujud — different levels of description apply',
      'The Copenhagen interpretation\'s observer role does not translate directly into a validation of first-person mystical epistemology',
      'Quantum coherence in biological systems (photosynthesis, avian navigation) is a legitimate frontier; its extension to consciousness requires substantial empirical support',
      'The appropriate stance: Sufi epistemology and quantum physics address different scales of reality; careful distinction prevents both dismissal and misappropriation',
    ],
  },
];

const HISTORICAL_INTERSECTIONS = [
  {
    period: '9th–12th Century',
    title: 'Integrated Scholarship',
    description: 'The division between inner and outer knowledge did not exist in the same form for medieval Islamic scholars. Ibn Sina wrote on the soul, physics, and medicine within a single philosophical framework. Al-Biruni combined astronomical measurement with cultural analysis. The integration of experiential knowledge and empirical inquiry was normative rather than exceptional.',
  },
  {
    period: '13th–17th Century',
    title: 'Institutionalization & Separation',
    description: 'As Sufi orders formalized and the madrasa curriculum narrowed, the integration of natural philosophy with inner development became less common. The Maragha school (Tusi) and the Istanbul Observatory (Taqi al-Din) represent the last major institutionalized examples of this synthesis before the colonial disruption of Islamic scientific institutions.',
  },
  {
    period: '19th–20th Century',
    title: 'Defensive Postures',
    description: 'Colonial encounter produced two defensive responses: modernists who sought to validate Islam through Enlightenment frameworks and traditionalists who cordoned off inner knowledge from scientific critique. Neither position encouraged serious intellectual dialogue. This period produced mutual caricatures rather than genuine engagement.',
  },
  {
    period: '21st Century',
    title: 'Renewed Dialogue',
    description: 'Post-positivist philosophy of science, the limits-of-reduction problem in consciousness research, and the proliferation of contemplative neuroscience have created conditions for genuine dialogue. This dialogue requires intellectual precision: neither the apologetics of the 19th century nor the caricatures of the 20th are adequate.',
  },
];

const RESEARCH_DIALOGUE = [
  {
    question: 'Can inner states be studied scientifically?',
    position: 'The Sufi tradition holds that inner states (ahwal) are real and describable but not externally measurable in the same way physical properties are. Phenomenological and neurophenomenological methods (Varela, Thompson) offer partial bridges. The methodological challenge is genuine, not merely conventional.',
  },
  {
    question: 'Does neuroscience reduce contemplative experience?',
    position: 'Neural correlates of meditative states are interesting data but do not constitute an explanation of the experience itself — this is the "hard problem of consciousness" (Chalmers). A neural correlate is not an identity statement. The Sufi tradition is not threatened by the discovery of neural processes accompanying spiritual states.',
  },
  {
    question: 'What is the epistemic status of kashf (unveiling)?',
    position: 'The Sufi tradition treats verified kashf as a legitimate epistemic mode with internal consistency requirements. It does not claim to be equivalent to empirical science — it claims a different order of knowledge. The question is not "is kashf scientific?" but "what are its verification conditions within its own framework?"',
  },
  {
    question: 'Can ethics be grounded without metaphysics?',
    position: 'Secular ethical frameworks have produced important partial accounts but struggle with ultimate grounding. The Sufi contribution to this debate is not apologetic but structural: the development of character (akhlaq) requires an account of what the self is and what it is developing toward. Secular psychology offers methods; it does not offer this account.',
  },
];

const EXPLORATORY_DOMAINS = [
  {
    id: 'consciousness-inner-cognition',
    icon: Brain,
    title: 'Consciousness & Inner Cognition',
    accentColor: '#7BAFD4',
    description: 'Comparative models of awareness, perception, and inner knowing — from neuroscientific accounts of mind to classical Sufi phenomenology of the heart.',
    themes: [
      'Soul Psychology & the Nafs Hierarchy',
      'Cellular Consciousness & Somatic Awareness',
      'Inner Sight (Basirah) & Perceptual Models',
      'Subtle Development & Latifah Science',
      'Heart Intelligence & Qalb Epistemology',
      'Spiritual Hearing, Taste, and Touch',
    ],
    framing: 'These domains are explored as comparative metaphysical models and phenomenological parallels — not as empirically verified scientific claims. Where neuroscience offers relevant data, connections are made with care.',
    href: '/knowledge-systems/science-sufism/consciousness-inner-cognition',
  },
  {
    id: 'quantum-fundamental-reality',
    icon: Atom,
    title: 'Quantum Theory & Non-Local Ontologies',
    accentColor: '#C8A75E',
    description: 'Examining where the interpretive questions of quantum mechanics — observer, entanglement, non-locality — intersect with classical metaphysical frameworks, and where they diverge.',
    themes: [
      'Quantum Dynamics & Superposition Ontologies',
      'Non-Local Correlations & Unity of Being',
      'Holographic Principles & Levels of Manifestation',
      'Entanglement as Symbolic — Not Literal — Parallel',
      'Multiversal Models & Islamic Metaphysics',
      'Gravitational Mysteries & the Veil of Form',
    ],
    framing: 'Quantum analogies are treated as symbolic ontologies and philosophical parallels — not validations. The distinction between established physics, interpretive frameworks, and metaphor is maintained throughout.',
    href: '/knowledge-systems/science-sufism/quantum-fundamental-reality',
  },
  {
    id: 'systems-energetics',
    icon: Zap,
    title: 'Systems, Energetics & Field Dynamics',
    accentColor: '#8BB89A',
    description: 'The science of energy, electromagnetic fields, and complex living systems in dialogue with contemplative frameworks of subtle force, circulation, and divine sustenance.',
    themes: [
      'Bioenergetic Fields & Latifah Physiology',
      'Electromagnetic Phenomena & Spiritual Light (Nur)',
      'Circulation Systems & Tawakkul (Divine Reliance)',
      'Force Amplification & Himma (Spiritual Resolve)',
      'Field Navigation & the Senses of the Heart',
      'Systems Emergence & Hierarchical Wujud',
    ],
    framing: 'Subtle energy concepts are approached as hypothesis space and comparative frameworks. Where measurable physiological correlates exist (HRV, biophoton emission), they are noted. Where they do not, epistemic status is clearly stated.',
    href: '/knowledge-systems/science-sufism/systems-energetics',
  },
  {
    id: 'sacred-ecology',
    icon: Leaf,
    title: 'Sacred Ecology & Planetary Systems',
    accentColor: '#D4A07B',
    description: 'Environmental science and the Islamic doctrine of stewardship (khalifa) — examining ecological responsibility, planetary boundaries, and regenerative cosmologies.',
    themes: [
      'Khilafa (Stewardship) & Planetary Boundaries',
      'Earth Resonance & Sacred Geography',
      'Ecosystem Mapping & the Web of Divine Signs',
      'Regenerative Wisdom from Classical Agricultural Fiqh',
      'Biodiversity & Diversity of Divine Manifestation',
      'Climate Responsibility & Akhira Accountability',
    ],
    framing: 'Environmental science is engaged as established knowledge. Islamic ecological thought is presented as a normative framework for responsibility, not as a competing scientific model.',
    href: '/knowledge-systems/science-sufism/sacred-ecology',
  },
  {
    id: 'knowledge-transmission',
    icon: Link2,
    title: 'Knowledge Transmission & Lineage Dynamics',
    accentColor: '#AAB0D6',
    description: 'How spiritual knowledge is transmitted, preserved, and verified across generations — and what network science, memory research, and cultural transmission studies illuminate about these processes.',
    themes: [
      'Silsila Dynamics & Network Topology',
      'Lineage Integration & Institutional Memory',
      'Sacred Transmission & Epigenetic Parallels',
      'Knowledge Preservation Across Disruption',
      'Prophetic Inheritance & Authoritative Chains',
      'Wisdom Activation & Developmental Thresholds',
    ],
    framing: 'Silsila and transmission are analyzed using frameworks from cultural transmission research, network science, and institutional theory. Spiritual authenticity claims are treated as internal to the tradition — not reducible to sociological analysis.',
    href: '/knowledge-systems/science-sufism/knowledge-transmission',
  },
  {
    id: 'sacred-expression',
    icon: Star,
    title: 'Sacred Expression & Symbolic Science',
    accentColor: '#C8B4E8',
    description: 'Sacred geometry, sacred sound, and the visual and poetic arts as structured languages encoding cosmological knowledge — examined through both aesthetic theory and contemplative hermeneutics.',
    themes: [
      'Geometric Harmonics & Mathematical Ontology',
      'Illuminated Calligraphy as Visual Metaphysics',
      'Acoustical Engineering & the Science of Sama',
      'Wisdom Poetry & Symbolic Cognition',
      'Divine Numerology as Structural Symbolism',
      'Sacred Architecture & Spatial Phenomenology',
    ],
    framing: 'Sacred arts are explored as structured symbolic ontologies — not as empirical science. Connections to mathematics, cognitive science, and acoustics are noted where relevant; claims remain bounded by their domain.',
    href: '/knowledge-systems/science-sufism/sacred-expression',
  },
];

function ExploratoryDomainCard({ domain }: { domain: typeof EXPLORATORY_DOMAINS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = domain.icon;
  const color = domain.accentColor;

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{ borderColor: expanded ? `${color}35` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-[16px] font-semibold mb-1.5 leading-snug transition-colors"
              style={{ color: expanded ? color : '#F5F3EE' }}
            >
              {domain.title}
            </h3>
            <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed">{domain.description}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          style={{ color: expanded ? color : 'rgba(170,176,214,0.3)' }}
        />
      </button>

      {expanded && (
        <div className="border-t border-white/6 px-6 pb-6 pt-5 bg-[#080B1A]/40 space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>
              Thematic Areas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {domain.themes.map((theme, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[7px] mt-1.5 flex-shrink-0" style={{ color }}>&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{theme}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-amber-500/15 rounded-lg p-4 bg-amber-500/5">
            <p className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest mb-1.5">
              Epistemic Framing
            </p>
            <p className="text-[12px] text-[#AAB0D6]/70 leading-relaxed">{domain.framing}</p>
          </div>

          <div className="pt-1">
            <Link
              href={domain.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors"
              style={{
                border: `1px solid ${color}30`,
                color,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${color}12`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Explore Domain
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ComparisonRow({ row }: { row: typeof EPISTEMOLOGICAL_COMPARISON[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-0 border-b border-white/6 last:border-0">
      <div className="py-4 px-4 md:px-6 bg-white/[0.02]">
        <span className="text-[11px] font-bold text-[#C8A75E] uppercase tracking-widest leading-tight block">
          {row.dimension}
        </span>
      </div>
      <div className="py-4 px-4 md:px-6 border-t md:border-t-0 md:border-l border-white/6">
        <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{row.empirical}</p>
      </div>
      <div className="py-4 px-4 md:px-6 border-t md:border-t-0 md:border-l border-white/6">
        <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{row.sufi}</p>
      </div>
    </div>
  );
}

function ConvergenceCard({ item }: { item: typeof CONVERGENCE_AREAS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

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
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors mb-2">
              {item.title}
            </h3>
            <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed">{item.description}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#AAB0D6]/30 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#C8A75E]' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/6 pt-4 ml-14">
          <ul className="space-y-2.5">
            {item.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#C8A75E] text-[8px] mt-1.5 flex-shrink-0">&#9632;</span>
                <span className="text-[13px] text-[#D8D4CC] leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ScienceSufismPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Knowledge Systems"
        title="Science & Sufism"
        description="An analytical dialogue between empirical science and inner experiential knowledge. Neither apologetics nor caricature — a serious examination of epistemological boundaries and convergences."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Epistemological Comparison */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-5">
                  <Compass className="h-3 w-3 text-[#C8A75E]" />
                  <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Epistemological Analysis</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Two Modes of Knowing
                </h2>
                <p className="text-[14px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl">
                  Empirical science and the Sufi tradition represent distinct epistemological frameworks with genuine differences in method, verification, and ontological commitment. The following comparison is analytical, not evaluative.
                </p>
              </div>

              <div className="border border-white/6 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] bg-white/[0.03] border-b border-white/8">
                  <div className="py-3 px-4 md:px-6">
                    <span className="text-[10px] font-bold text-[#AAB0D6]/50 uppercase tracking-widest">Dimension</span>
                  </div>
                  <div className="py-3 px-4 md:px-6 md:border-l border-white/6">
                    <span className="text-[10px] font-bold text-[#7BAFD4] uppercase tracking-widest">Empirical Science</span>
                  </div>
                  <div className="py-3 px-4 md:px-6 md:border-l border-white/6">
                    <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Sufi Tradition</span>
                  </div>
                </div>
                {EPISTEMOLOGICAL_COMPARISON.map((row) => (
                  <ComparisonRow key={row.dimension} row={row} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Areas of Convergence */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-5">
                  <Layers className="h-3 w-3 text-[#C8A75E]" />
                  <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Convergence Analysis</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Areas of Analytical Convergence
                </h2>
                <p className="text-[14px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl">
                  Points where empirical research and contemplative tradition ask related questions, use complementary methods, or arrive at structurally similar conclusions — without collapsing the distinction between them.
                </p>
              </div>
              <div className="space-y-3">
                {CONVERGENCE_AREAS.map((item) => (
                  <ConvergenceCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Historical Intersections */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-5">
                  <BookOpen className="h-3 w-3 text-[#C8A75E]" />
                  <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Historical Context</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Historical Intersections
                </h2>
                <p className="text-[14px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl">
                  The relationship between empirical and contemplative knowledge has changed significantly across historical periods. This context is necessary for understanding the current state of dialogue.
                </p>
              </div>
              <div className="space-y-3">
                {HISTORICAL_INTERSECTIONS.map((item) => (
                  <div key={item.period} className="border border-white/6 rounded-xl p-6 bg-white/[0.015]">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <span className="text-[11px] font-bold text-[#C8A75E] uppercase tracking-widest">{item.period}</span>
                      <h3 className="text-[14px] font-semibold text-[#F5F3EE]">{item.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#AAB0D6]/75 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Modern Research Dialogue */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-5">
                  <FlaskConical className="h-3 w-3 text-[#C8A75E]" />
                  <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Active Dialogue</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Modern Research Dialogue
                </h2>
                <p className="text-[14px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl">
                  Specific questions where the dialogue between modern science and the Sufi tradition is active, unresolved, and intellectually productive.
                </p>
              </div>
              <div className="space-y-3">
                {RESEARCH_DIALOGUE.map((item, i) => (
                  <div key={i} className="border border-white/6 rounded-xl p-6 bg-white/[0.015]">
                    <h3 className="text-[14px] font-semibold text-[#F5F3EE] mb-3 flex items-start gap-2">
                      <span className="text-[#C8A75E] font-mono text-[11px] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {item.question}
                    </h3>
                    <p className="text-[13px] text-[#AAB0D6]/75 leading-relaxed ml-6">{item.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Exploratory Domains */}
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/25 bg-[#C8A75E]/8 mb-5">
                  <Star className="h-3 w-3 text-[#C8A75E]" />
                  <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Exploratory Domains</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Applied & Conceptual Extensions
                </h2>
                <p className="text-[14px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl mb-2">
                  Six structured inquiry domains extending the Science–Sufism dialogue into applied, speculative, and symbolic territory. Each domain is framed with explicit epistemic caution — distinguishing established science, philosophical parallel, and metaphysical model.
                </p>
                <div className="flex items-start gap-2.5 mt-4 p-4 border border-amber-500/15 rounded-xl bg-amber-500/5 max-w-3xl">
                  <FlaskConical className="h-4 w-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#AAB0D6]/65 leading-relaxed">
                    These domains occupy hypothesis space and symbolic ontology. None of the thematic areas below are presented as established empirical science unless explicitly identified as such. Intellectual integrity requires holding these frameworks as comparative models, not verified claims.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {EXPLORATORY_DOMAINS.map((domain) => (
                  <ExploratoryDomainCard key={domain.id} domain={domain} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Footer Nav */}
          <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/knowledge-systems"
              className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              Back to Knowledge Systems
            </Link>
            <Link
              href="/knowledge-systems/advanced-science"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
            >
              Advanced Science
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
