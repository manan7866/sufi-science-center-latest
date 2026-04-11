'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Cpu, Atom, Brain, Globe, ArrowRight } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

interface SufiReflection {
  title: string;
  concepts: Array<{ term: string; definition: string }>;
  framing: string;
}

interface SubField {
  name: string;
  description: string;
  breakthroughs: string[];
  openQuestions: string[];
  ethicalImplications: string[];
  futureTrajectory: string;
  sufiReflection?: SufiReflection;
  boundaryNote?: string;
}

interface Domain {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  domainSufiReflection?: {
    heading: string;
    body: string;
    concepts: Array<{ term: string; definition: string }>;
    boundaryConditions: string[];
  };
  subfields: SubField[];
}

const DOMAINS: Domain[] = [
  {
    id: 'intelligent-systems',
    icon: Cpu,
    title: 'Intelligent Systems',
    tagline: 'AI, Robotics, Complex Networks',
    description: 'Research into adaptive, computational, and autonomous systems — from machine learning architectures to self-organizing social networks.',
    accentColor: '#7BAFD4',
    domainSufiReflection: {
      heading: 'Sufi Epistemological Reflection',
      body: 'Classical Sufi epistemology offers a layered model of cognition that provides philosophical context for questions artificial intelligence cannot yet answer: the nature of intent, the source of moral agency, and the distinction between information processing and genuine understanding.',
      concepts: [
        { term: 'Nafs', definition: 'The self as a modeling system — capable of pattern recognition, but also prone to distortion through ego-projection. In AI terms: the system\'s internal representation of itself and its environment.' },
        { term: 'Aql', definition: 'Discursive intellect — the capacity for logical reasoning and structured analysis. The domain AI systems most closely approximate.' },
        { term: 'Qalb', definition: 'The perceptual heart — adaptive, contextual, morally sensitive cognition that integrates knowledge with lived meaning. Currently unreproducible computationally.' },
        { term: 'Tazkiyah', definition: 'Purification of the self through iterative correction of distorted cognition. A structural parallel to alignment and self-correction loops in AI safety research.' },
      ],
      boundaryConditions: [
        'AI is best framed as externalized modeling of cognitive processes, not soul replication or consciousness creation.',
        'The Sufi framework does not validate AI systems as agents of moral authority — it illuminates what remains absent from them.',
        'Questions of machine consciousness remain empirically unresolved and should not be answered by metaphysical assertion in either direction.',
      ],
    },
    subfields: [
      {
        name: 'Artificial Intelligence & Machine Learning',
        description: 'The development of systems that learn from data, recognize patterns, and perform tasks that require human-level or superhuman capability in defined domains.',
        breakthroughs: [
          'Large language models (transformer architecture) achieving generalization across language tasks',
          'Reinforcement learning from human feedback producing aligned AI behavior',
          'Multimodal models integrating text, vision, and audio in unified systems',
          'AlphaFold solving the protein folding problem after 50 years of scientific effort',
        ],
        openQuestions: [
          'What is the computational basis of genuine understanding versus statistical pattern completion?',
          'Can alignment be solved at scale — ensuring AI systems pursue intended goals reliably?',
          'Is emergent capability in large models predictable or inherently discontinuous?',
          'What constitutes consciousness in computational systems?',
        ],
        ethicalImplications: [
          'Labor displacement at scale across cognitive work domains',
          'Concentration of capability in a small number of institutional actors',
          'Adversarial use: deepfakes, automated disinformation, autonomous weapons',
          'Bias amplification through training data reflecting historical inequities',
        ],
        futureTrajectory: 'Movement toward general-purpose reasoning systems (AGI) with the core challenge being alignment and interpretability rather than raw capability. Increasing integration into scientific research workflows.',
        sufiReflection: {
          title: 'Moral Agency & Cognitive Architecture',
          concepts: [
            { term: 'Aql vs. Qalb', definition: 'Current AI operates at the level of Aql — structured pattern completion. Qalb, the morally integrated perceptual faculty, requires intention, context, and accountability — none of which are currently computable.' },
            { term: 'Niyyah (Intent)', definition: 'Islamic moral philosophy grounds ethical accountability in intent. An algorithm has no intent — it executes objectives. This distinction is fundamental to AI governance frameworks.' },
          ],
          framing: 'The central governance challenge of AI is not technical but moral: who bears accountability when systems act without intent? Sufi moral psychology, grounded in the architecture of Nafs and Aql, offers a rigorous framework for locating responsibility within human agents rather than delegating it to systems.',
        },
        boundaryNote: 'AI systems process language, not meaning in the experiential sense. Statistical coherence should not be confused with comprehension, wisdom, or moral capacity.',
      },
      {
        name: 'Robotics & Autonomous Systems',
        description: 'Physical machines capable of perception, decision-making, and action in unstructured environments — from surgical robots to autonomous vehicles.',
        breakthroughs: [
          'Dexterous manipulation enabling fine motor tasks previously requiring human hands',
          'Simultaneous localization and mapping (SLAM) enabling navigation in unknown environments',
          'Soft robotics using compliant materials for bio-compatible interaction',
          'Swarm robotics achieving collective behavior without central coordination',
        ],
        openQuestions: [
          'How can robots generalize learned behaviors to genuinely novel physical environments?',
          'What frameworks should govern autonomous lethal decision-making in military contexts?',
          'Can human-robot interaction achieve natural social intelligence?',
        ],
        ethicalImplications: [
          'Lethal autonomous weapons systems operating without meaningful human control',
          'Surveillance infrastructure at physical scale',
          'Physical labor displacement in manufacturing, logistics, and caregiving',
        ],
        futureTrajectory: 'Convergence with AI reducing the gap between physical and computational capability. Near-term focus on healthcare, elder care, and logistics applications.',
        boundaryNote: 'Autonomy in machines is functional — goal-directed execution within a defined operational envelope. It should not be conflated with moral autonomy, which requires reflective self-governance grounded in values.',
      },
      {
        name: 'Complex Systems & Network Science',
        description: 'The study of systems where interactions between components produce emergent properties not predictable from individual elements — from financial markets to neural circuits.',
        breakthroughs: [
          'Scale-free network topology found across biological, social, and technological systems',
          'Tipping point dynamics quantified across climate, ecology, and social systems',
          'Epidemic modeling enabling real-time public health response',
          'Agent-based simulation enabling policy testing without real-world trials',
        ],
        openQuestions: [
          'Can early warning signals for complex system collapse be made operationally reliable?',
          'What are the universal properties of adaptive resilience in complex networks?',
          'How do information flows in networks shape collective intelligence or collective failure?',
        ],
        ethicalImplications: [
          'Systemic financial risk propagation through network interdependencies',
          'Algorithmic amplification of polarization in social networks',
          'Critical infrastructure vulnerability through interconnection',
        ],
        futureTrajectory: 'Integration with AI enabling real-time complex system monitoring. Application to climate tipping points and social resilience is expanding.',
        sufiReflection: {
          title: 'Emergence & Hidden Order',
          concepts: [
            { term: 'Batin (Hidden Dimension)', definition: 'Sufi epistemology distinguishes Zahir (manifest, observable) from Batin (hidden, causal). Complex systems science independently identifies the same distinction: surface behavior does not reveal underlying generative structure.' },
            { term: 'Tawakkul and System Resilience', definition: 'The concept of tawakkul (trust in underlying order) has a systems science parallel: resilient systems operate within attractors that absorb perturbations without collapse. Order persists beneath apparent chaos.' },
          ],
          framing: 'The discovery that emergence is universal across biological, social, and physical networks converges epistemologically — though not ontologically — with Sufi metaphysics of layered reality. The convergence is structural, not causal.',
        },
      },
      {
        name: 'AI Governance & Ethics',
        description: 'The design of institutional, regulatory, and technical frameworks to ensure AI development is safe, beneficial, and equitable across societies.',
        breakthroughs: [
          'Constitutional AI methods embedding value alignment in training processes',
          'Red-teaming and adversarial testing as standard practice for capability evaluation',
          'International coordination frameworks emerging (EU AI Act, executive orders)',
        ],
        openQuestions: [
          'Can interpretability research make powerful AI systems legible to human oversight?',
          'What governance mechanisms function at the pace of AI capability development?',
          'How are risks distributed globally when capability is concentrated geographically?',
        ],
        ethicalImplications: [
          'Democratic accountability for decisions made by algorithmic systems',
          'Representation failures when governance is dominated by developer interests',
          'Epistemic sovereignty when AI shapes access to knowledge',
        ],
        futureTrajectory: 'Increasing policy formalization globally. Core tension between innovation pace and governance capacity is unlikely to resolve quickly.',
        sufiReflection: {
          title: 'Classical Moral Psychology as Governance Framework',
          concepts: [
            { term: 'Accountability (Hisab)', definition: 'In Islamic jurisprudence, moral accountability requires a subject capable of intention and reflection. AI governance must locate accountability in human principals — designers, deployers, and institutions — not the systems themselves.' },
            { term: 'Maslaha (Public Interest)', definition: 'Classical legal reasoning through public benefit provides an evaluative framework for AI policy that transcends individual rights discourse: does this system serve the common good without disproportionate harm?' },
          ],
          framing: 'Sufi moral psychology, rooted in the refinement of Nafs and the development of Aql toward wisdom, provides a non-Western framework for AI ethics that centers human transformation and accountability rather than rule compliance alone.',
        },
      },
    ],
  },
  {
    id: 'matter-energy',
    icon: Atom,
    title: 'Matter & Energy',
    tagline: 'Physics, Materials, Power',
    description: 'Fundamental research into physical reality, the structure of matter, and energy transformation — from quantum foundations to fusion power.',
    accentColor: '#C8A75E',
    domainSufiReflection: {
      heading: 'Sufi Ontological Parallels',
      body: 'Sufi metaphysics offers ontological models of reality that have structural — though not empirical — parallels to findings in quantum physics and cosmology. These parallels are best understood as resonances between different modes of inquiry, not as mutual validation.',
      concepts: [
        { term: 'Tajalli', definition: 'Divine self-disclosure through the manifest world. The concept of layers of manifestation resonates — structurally, not causally — with field theories in which observable phenomena arise from underlying quantum states.' },
        { term: 'Wahdat al-Wujud', definition: 'Unity of being — the ontological view that all existence participates in a single undivided reality. This is a metaphysical position, not a physical theory. It should not be conflated with quantum entanglement, which is a specific measurable correlation, not cosmic unity.' },
        { term: 'Zahir / Batin', definition: 'The manifest and hidden dimensions of reality. Physics independently distinguishes observable phenomena from underlying fields and forces — but the scientific distinction is empirical, while the Sufi distinction is ontological.' },
      ],
      boundaryConditions: [
        'Quantum entanglement is a measurable physical phenomenon. It does not empirically demonstrate metaphysical unity.',
        'The Sufi concept of Tajalli is an ontological model, not a theory of physical causation.',
        'Where scientific and metaphysical models use similar language, the similarity is structural and heuristic — not evidential.',
      ],
    },
    subfields: [
      {
        name: 'Quantum Physics & Quantum Computing',
        description: 'Quantum mechanics describes the behavior of matter at subatomic scales. Quantum computing exploits quantum phenomena to perform computations exponentially faster than classical computers for specific problem classes.',
        breakthroughs: [
          'Quantum error correction enabling fault-tolerant quantum computation',
          'Quantum supremacy demonstrations for specific computational tasks',
          'Quantum entanglement verified at macroscopic distances (Bell test loopholes closed)',
          'Topological qubits demonstrating improved error resistance',
        ],
        openQuestions: [
          'Can quantum advantage be demonstrated for practically relevant problems at scale?',
          'What is the correct interpretation of quantum mechanics (Copenhagen, many-worlds, relational)?',
          'Can room-temperature quantum coherence be sustained in engineered systems?',
        ],
        ethicalImplications: [
          'Cryptographic infrastructure currently protecting global communications will be broken by sufficiently powerful quantum computers',
          'Nation-state competition for quantum advantage in intelligence and defense',
          'Unequal access to quantum resources between institutions and nations',
        ],
        futureTrajectory: 'Practical quantum advantage likely within 10-15 years for specific domains (drug discovery, materials simulation, optimization). Post-quantum cryptography is an immediate institutional priority.',
        sufiReflection: {
          title: 'Epistemological Resonance with Quantum Indeterminacy',
          concepts: [
            { term: 'Ghayb (Unseen)', definition: 'The Sufi acknowledgment of a domain of reality inaccessible to ordinary perception resonates — structurally — with quantum indeterminacy: the state of a system before observation is not simply unknown but genuinely indeterminate within certain interpretive frameworks.' },
            { term: 'Kashf (Unveiled Perception)', definition: 'In Sufi epistemology, certain modes of knowing disclose dimensions of reality not accessible to discursive reason. This is an epistemological claim about human cognition, not a theory of quantum measurement.' },
          ],
          framing: 'The multiple competing interpretations of quantum mechanics (Copenhagen, relational, many-worlds) represent genuine unresolved questions about the nature of physical reality. Sufi metaphysics does not resolve these questions — but its tradition of systematic inquiry into hidden dimensions of reality represents a comparable commitment to probing beneath surface appearances.',
        },
        boundaryNote: 'Quantum nonlocality does not imply consciousness, intention, or metaphysical unity. These remain philosophical positions that quantum physics neither confirms nor refutes.',
      },
      {
        name: 'Advanced Materials & Nanotechnology',
        description: 'Design and fabrication of materials with properties not found in nature by controlling structure at atomic and molecular scales.',
        breakthroughs: [
          'Graphene and 2D materials with exceptional electrical and mechanical properties',
          'Metamaterials enabling negative refractive index and electromagnetic cloaking',
          'CRISPR-based molecular machines operating at cellular scale',
          'High-temperature superconductors achieving practical operating temperatures',
        ],
        openQuestions: [
          'Can room-temperature superconductivity be achieved in engineered materials?',
          'What are the long-term biological and ecological effects of engineered nanoparticles?',
          'Can self-assembling materials be programmed for complex hierarchical structures?',
        ],
        ethicalImplications: [
          'Nanoparticle environmental release with poorly understood ecological consequences',
          'Nanoscale surveillance and targeting systems for biological applications',
          'Materials production energy costs vs. performance gains',
        ],
        futureTrajectory: 'Convergence with AI accelerating materials discovery. Quantum materials and topological insulators are near-term frontier domains.',
        boundaryNote: 'The capacity to engineer matter at atomic scale raises governance questions that current regulatory frameworks were not designed to address.',
      },
      {
        name: 'Energy Systems & Fusion Research',
        description: 'The science of energy generation, storage, and distribution — including the pursuit of fusion energy as a theoretically limitless low-waste power source.',
        breakthroughs: [
          'NIF (National Ignition Facility) achieving fusion ignition — energy output exceeding laser input',
          'Solar photovoltaic cost reduction making it the cheapest electricity generation source historically',
          'Grid-scale battery storage enabling renewable baseload power',
          'Private fusion companies (Commonwealth Fusion, TAE Technologies) achieving significant milestones',
        ],
        openQuestions: [
          'Can fusion be made commercially viable within 20 years?',
          'What storage and grid technologies enable 100% renewable systems without reliability compromise?',
          'How can energy transition be managed equitably for fossil-fuel dependent economies?',
        ],
        ethicalImplications: [
          'Geopolitical reconfiguration if fossil fuel dependency is eliminated',
          'Fusion power\'s potential to effectively eliminate energy scarcity — and questions about who controls it',
          'Mining requirements for battery and solar technologies creating new resource dependencies',
        ],
        futureTrajectory: 'Commercial fusion demonstration within 15-25 years is increasingly credible. The energy transition is underway but its pace is determined by policy and infrastructure as much as technology.',
        sufiReflection: {
          title: 'Stewardship of Energetic Resources',
          concepts: [
            { term: 'Amanah (Trust)', definition: 'The Quranic concept of human trusteeship over the earth\'s resources. Access to virtually unlimited energy through fusion would constitute the most consequential test of that trusteeship — demanding governance frameworks commensurate with the scale of responsibility.' },
          ],
          framing: 'The prospect of fusion energy is not merely a technological milestone but a civilizational one. Sufi ethics of Khalifa (stewardship) provides a moral framework for asking not only whether limitless energy is achievable but whether current human institutions are prepared to use it wisely.',
        },
      },
      {
        name: 'Photonics & Semiconductor Science',
        description: 'Research into light manipulation and the fabrication of electronic components at atomic scales — the foundation of all modern computing and communications infrastructure.',
        breakthroughs: [
          'EUV lithography enabling 3nm transistor fabrication',
          'Silicon photonics integrating optical and electronic circuits on a single chip',
          'Single-photon emitters enabling quantum communication networks',
        ],
        openQuestions: [
          'What replaces CMOS transistors when silicon scaling ends (2nm and below)?',
          'Can neuromorphic computing architectures match the energy efficiency of biological neural systems?',
        ],
        ethicalImplications: [
          'Semiconductor supply chain concentration creating geopolitical vulnerability',
          'Energy consumption of global digital infrastructure constituting ~2-3% of global electricity use',
        ],
        futureTrajectory: 'The end of Moore\'s Law is driving architectural innovation. 3D chip stacking, neuromorphic design, and optical interconnects are active frontiers.',
        boundaryNote: 'The concentration of semiconductor manufacturing capacity in a small number of geographies represents a structural fragility in global technological infrastructure that no current governance framework adequately addresses.',
      },
    ],
  },
  {
    id: 'life-consciousness',
    icon: Brain,
    title: 'Life & Consciousness',
    tagline: 'Biology, Brain, Biotechnology',
    description: 'Scientific exploration of living systems, cognitive architecture, and the engineering of biological processes — from genome editing to consciousness science.',
    accentColor: '#8BB89A',
    domainSufiReflection: {
      heading: 'Sufi Anthropology of the Self',
      body: 'The Sufi tradition offers one of the most systematically developed pre-modern models of human interiority. Its layered anthropology — distinguishing multiple levels of selfhood — engages the same territory that neuroscience and consciousness studies are only beginning to map empirically.',
      concepts: [
        { term: 'Ruh', definition: 'The spirit or animating principle — distinct from biological function, addressed in Quranic anthropology as a domain of divine prerogative. In dialogue with neuroscience, Ruh represents the dimension of selfhood that resists reduction to neural correlates.' },
        { term: 'Nafs', definition: 'The soul or self in its psychological dimension — the site of moral development, desire, and cognitive distortion. Structurally comparable to the ego-structures studied in depth psychology and the predictive-processing self-models of modern neuroscience.' },
        { term: 'Sirr', definition: 'The secret interior — the deepest layer of selfhood, accessible through contemplative practice. In consciousness science terms, this corresponds to the question of what lies beyond phenomenal access: the unconscious, the pre-reflective, the substrate of awareness itself.' },
        { term: 'Lataif', definition: 'The subtle centers — a nuanced map of psychological and spiritual faculties distributed through the body-self. This represents a contemplative phenomenology developed over centuries of systematic inner observation.' },
      ],
      boundaryConditions: [
        'The Sufi model of the self is not a competing neuroscientific theory — it is a phenomenological and ontological framework developed through a different methodology.',
        'Contemplative states documented in Sufi practice are valid empirical phenomena for neuroscientific study; their metaphysical interpretation remains a separate question.',
        'The hard problem of consciousness is not resolved by either neuroscience or Sufi metaphysics — both traditions acknowledge genuine irreducibility at the core of subjective experience.',
      ],
    },
    subfields: [
      {
        name: 'Neuroscience & Consciousness Studies',
        description: 'The scientific study of the brain and nervous system, including the unresolved problem of how physical processes give rise to subjective experience.',
        breakthroughs: [
          'Connectome mapping at cellular resolution (C. elegans, Drosophila, partial mammalian)',
          'Optogenetics enabling precise causal manipulation of neural circuits',
          'Brain-computer interfaces (Neuralink, BrainGate) achieving high-bandwidth neural decoding',
          'Global workspace and integrated information theories providing testable accounts of consciousness',
        ],
        openQuestions: [
          'What is the neural correlate of conscious experience — and is correlation explanation?',
          'Can the hard problem of consciousness (Chalmers) be dissolved or must it be accepted?',
          'What accounts for the continuity of personal identity across time and states?',
          'Can consciousness be substrate-independent — and what are the implications?',
        ],
        ethicalImplications: [
          'Neural interface data as the most intimate form of personal information',
          'Cognitive enhancement creating inequities between enhanced and unenhanced populations',
          'Brain death criteria in light of emerging consciousness science',
        ],
        futureTrajectory: 'Large-scale connectome mapping will constrain theories significantly within 10-20 years. The hard problem remains philosophically unresolved and may require conceptual rather than empirical revision.',
        sufiReflection: {
          title: 'Convergence & Divergence: Contemplative States and Cognitive Science',
          concepts: [
            { term: 'Fana (Annihilation) and Default Mode Network', definition: 'States of self-dissolution reported in advanced contemplative practice correspond measurably to changes in default mode network activity. The neuroscientific description does not exhaust the phenomenological significance — but it provides a partially shared empirical language.' },
            { term: 'Muraqaba (Watchful Presence) and Metacognition', definition: 'The Sufi practice of watchful inner attention — disciplined observation of one\'s own mental states — structurally parallels metacognitive processes studied in cognitive science. Both identify a capacity for recursive self-observation as central to psychological development.' },
            { term: 'Layers of Nafs and Developmental Neuroscience', definition: 'The Sufi stages of Nafs — from Ammara (commanding self) to Mutmainna (tranquil self) — map a developmental trajectory of psychological maturation that parallels findings in developmental psychology and the neuroscience of self-regulation.' },
          ],
          framing: 'The intersection of contemplative practice and consciousness science is one of the most productive areas of cross-disciplinary dialogue currently active. The Sufi tradition, with its systematic methodology of inner observation and its detailed phenomenological literature, is an underutilized resource in this conversation.',
        },
        boundaryNote: 'Mystical experience is a real psychological phenomenon accessible to empirical study. Its metaphysical interpretation — what it reveals about the nature of reality — remains a separate and genuinely open question.',
      },
      {
        name: 'Biotechnology & Genetic Engineering',
        description: 'The design and modification of biological systems for therapeutic, industrial, and research purposes — including the deliberate editing of the human genome.',
        breakthroughs: [
          'CRISPR-Cas9 enabling precise, low-cost gene editing across organisms',
          'mRNA vaccine platform developed and deployed at scale for COVID-19',
          'CAR-T cell therapy achieving remission in previously untreatable cancers',
          'Synthetic biology designing organisms with non-natural genetic codes',
        ],
        openQuestions: [
          'What are the long-term off-target effects of germline gene editing?',
          'Can synthetic biology create fully orthogonal biological systems isolated from natural ecosystems?',
          'Where is the ethical boundary between therapeutic and enhancement genetic modification?',
        ],
        ethicalImplications: [
          'Heritable genetic modification reshaping human evolution outside evolutionary selection',
          'Dual-use biology: the same tools that cure disease can engineer pathogens',
          'Bioeconomy concentration in corporations with limited democratic accountability',
        ],
        futureTrajectory: 'In-vivo gene therapy for monogenic diseases entering clinical reality. Aging as a treatable condition is a credible 30-year research target. Biosafety governance is the critical bottleneck.',
        sufiReflection: {
          title: 'Fitra and the Question of Human Nature',
          concepts: [
            { term: 'Fitra (Original Nature)', definition: 'Islamic anthropology holds that human beings possess an original nature — Fitra — that is oriented toward virtue and awareness. Genetic enhancement raises the question of whether interventions that alter inherited traits are acting within, against, or indifferent to this nature.' },
          ],
          framing: 'The capacity to edit the human genome is not merely a medical advance — it is a civilizational decision about what human nature means and who has authority to revise it. Sufi ethics grounded in Fitra and Amanah (trusteeship) provides a framework for asking whether such revisions serve human flourishing or merely human preference.',
        },
        boundaryNote: 'The ethical limits of germline editing are not settled by either genomic science or theological tradition alone. They require active dialogue between the two.',
      },
      {
        name: 'Molecular Biology',
        description: 'Study of biological processes at the molecular level — the mechanisms by which DNA, RNA, proteins, and cellular structures organize and regulate living systems.',
        breakthroughs: [
          'AlphaFold solving protein structure prediction — a 50-year benchmark problem',
          'Single-cell RNA sequencing resolving cellular heterogeneity at unprecedented resolution',
          'Phase separation explaining how cells organize biochemistry without membrane boundaries',
        ],
        openQuestions: [
          'How does the same genome produce hundreds of cell types through epigenetic regulation?',
          'What is the complete protein interaction network of a living cell?',
          'How do cells achieve robustness and adaptability simultaneously?',
        ],
        ethicalImplications: [
          'Biological data privacy — genomic information is uniquely identifying and heritable',
          'Proprietary control of foundational molecular knowledge',
        ],
        futureTrajectory: 'AI integration with molecular biology is the defining inflection point. Drug discovery timelines are compressing significantly.',
        boundaryNote: 'The precision of molecular biology reveals the extraordinary complexity of even the simplest living system. This complexity is itself a philosophically significant datum — about the improbability of life and the limits of reductionist explanation.',
      },
      {
        name: 'Bioinformatics',
        description: 'Computational methods for analyzing biological data — from genomic sequences to protein structures to whole-organism phenotypes.',
        breakthroughs: [
          'Reference human genome sequencing cost reduction from $3B to under $1000',
          'Metagenomics enabling study of microbial ecosystems without cultivation',
          'Spatial transcriptomics mapping gene expression within tissue architecture',
        ],
        openQuestions: [
          'How can multi-omic data (genomics, proteomics, metabolomics) be integrated into predictive biological models?',
          'What are the limits of phenotype prediction from genotype alone?',
        ],
        ethicalImplications: [
          'Genomic databases and population surveillance',
          'Ancestry and health risk inference from publicly available genetic data',
        ],
        futureTrajectory: 'Foundation models trained on biological sequences are transforming drug and materials discovery. The field is moving from descriptive to predictive to generative.',
        boundaryNote: 'Predictive genomics raises profound questions about determinism, identity, and insurance equity that current governance frameworks are only beginning to address.',
      },
    ],
  },
  {
    id: 'planetary-cosmic',
    icon: Globe,
    title: 'Planetary & Cosmic Systems',
    tagline: 'Earth, Space, Climate',
    description: 'Macro-scale scientific investigation of Earth\'s systems, the solar system, and the structure of the universe — including the planetary consequences of human industrial activity.',
    accentColor: '#D4A07B',
    domainSufiReflection: {
      heading: 'Khalifa Framework & Sacred Ecology',
      body: 'The Quranic concept of Khalifa — human beings as trustees, not owners, of the earth — provides a moral foundation for planetary stewardship that complements the scientific understanding of Earth systems. This is one area where religious and scientific frameworks most directly align in their practical conclusions, even when their foundational assumptions differ.',
      concepts: [
        { term: 'Khalifa (Stewardship)', definition: 'Human beings are entrusted with the earth, not given dominion over it as property. This distinction — trustee vs. owner — has profound implications for environmental ethics and resource governance.' },
        { term: 'Mizan (Balance)', definition: 'The Quran repeatedly invokes Mizan — cosmic balance — as a property of creation that humans are instructed to respect. Environmental science independently demonstrates that ecosystem stability depends on maintaining the balance of coupled systems.' },
        { term: 'Fasad (Corruption)', definition: 'The Quranic category of Fasad fil-Ard — corruption in the earth — provides a moral framework for evaluating human activities that degrade natural systems. It grounds environmental ethics in accountability rather than preference.' },
      ],
      boundaryConditions: [
        'The Khalifa framework provides moral grounding for environmental responsibility; it does not resolve the technical questions of climate science or ecological management.',
        'Sacred ecology is not a substitute for systems science — it is a complementary framework for grounding scientific findings in human obligation.',
        'The convergence between Islamic environmental ethics and Earth systems science is practically significant, not merely philosophically interesting.',
      ],
    },
    subfields: [
      {
        name: 'Climate Systems & Earth Modeling',
        description: 'Scientific study of Earth\'s climate dynamics, the attribution of observed changes to human activity, and the development of predictive models for future conditions.',
        breakthroughs: [
          'Attribution science precisely quantifying human contribution to specific weather events',
          'Earth system models integrating atmospheric, oceanic, biological, and chemical cycles',
          'Paleoclimate reconstruction extending climate records millions of years',
          'Tipping point identification across Arctic sea ice, Amazon dieback, and permafrost systems',
        ],
        openQuestions: [
          'At what rate are climate tipping points approaching and can they be reliably predicted?',
          'What is the carbon cycle response to temperature increases above 2°C?',
          'Can solar geoengineering reduce warming without geopolitical and ecological side effects?',
        ],
        ethicalImplications: [
          'Intergenerational injustice — current generations imposing irreversible costs on future ones',
          'Differential vulnerability — climate impacts concentrated in historically less-responsible populations',
          'Unilateral geoengineering deployment affecting all nations without global consent',
        ],
        futureTrajectory: 'Earth system model resolution is increasing with AI-assisted downscaling. Near-term focus on regional impact prediction and tipping point monitoring.',
        sufiReflection: {
          title: 'Mizan, Tipping Points, and Moral Accountability',
          concepts: [
            { term: 'Mizan and Planetary Boundaries', definition: 'The planetary boundaries framework — identifying nine Earth system thresholds for human safety — is a scientific formalization of the Quranic principle of Mizan. When boundaries are violated, systemic instability follows. The parallelism is structurally significant.' },
            { term: 'Intergenerational Accountability', definition: 'The Sufi emphasis on Amanah — trusteeship across generations — provides moral urgency to climate action that purely utilitarian frameworks often fail to generate. We are accountable for what we bequeath, not only what we consume.' },
          ],
          framing: 'Climate science tells us what is happening to Earth systems. Sacred ecology asks what we owe to those systems, to each other, and to generations not yet born. Both questions are necessary. Neither is sufficient alone.',
        },
      },
      {
        name: 'Space Science & Astrophysics',
        description: 'Scientific study of the universe beyond Earth — from solar system dynamics to the large-scale structure of spacetime, dark matter, and the cosmic microwave background.',
        breakthroughs: [
          'Gravitational wave detection (LIGO) opening a new observational window on the universe',
          'First image of a black hole (Event Horizon Telescope, 2019)',
          'James Webb Space Telescope imaging the first galaxies and characterizing exoplanet atmospheres',
          'Detection of over 5,500 confirmed exoplanets, many potentially habitable',
        ],
        openQuestions: [
          'What is dark matter and dark energy — comprising 95% of the universe\'s content?',
          'Did life originate independently on other worlds and can it be detected?',
          'What occurred before the Big Bang and is our universe part of a larger multiverse?',
          'How do supermassive black holes regulate galactic formation and evolution?',
        ],
        ethicalImplications: [
          'Light pollution and satellite constellations degrading astronomical observation',
          'Resource extraction in space — governance frameworks are nascent',
          'Militarization of cislunar space accelerating without treaty frameworks',
        ],
        futureTrajectory: 'Exoplanet atmospheric biosignature detection is the next observational milestone. Lunar return and Mars mission planning has near-term (15-25 year) institutional commitment.',
        sufiReflection: {
          title: 'Tafakkur: Contemplative Cosmology',
          concepts: [
            { term: 'Tafakkur (Contemplative Reflection)', definition: 'The Quran repeatedly invites reflection on the structure of the cosmos as a mode of deepening awareness. Modern astrophysics has revealed a cosmos of extraordinary scale, age, and complexity — providing a factual substrate for the contemplative exercise Tafakkur invites.' },
            { term: 'The Unseen Majority', definition: 'Dark matter and dark energy constitute approximately 95% of the universe\'s content but remain undetected by direct observation. The acknowledgment that observable reality is a small fraction of total reality resonates — structurally, not causally — with the Sufi epistemic category of Ghayb.' },
          ],
          framing: 'Astrophysics has not diminished the cosmos — it has revealed its incomprehensible scale and depth. This is, for the contemplative tradition, not a problem to be solved but a fact to be received with appropriate humility.',
        },
        boundaryNote: 'The scale of the cosmos does not itself imply metaphysical conclusions. Wonder at the scale of creation is shared between scientific and contemplative traditions, but they interpret that wonder differently.',
      },
      {
        name: 'Planetary Geology',
        description: 'Study of the geological history, structure, and processes of planets, moons, and small bodies — informing both understanding of Earth and assessment of extraterrestrial resources.',
        breakthroughs: [
          'Mars geological history documented through orbital and surface missions',
          'Ocean worlds (Europa, Enceladus) confirmed as having liquid water — expanding habitable zone concept',
          'Seismic data from Mars (InSight) revealing internal structure of another planet for the first time',
        ],
        openQuestions: [
          'Was Mars hydrologically active long enough for life to originate and evolve?',
          'What drove Venus from potentially habitable to its current hellish state?',
          'Can planetary geological processes be read as biosignatures?',
        ],
        ethicalImplications: [
          'Planetary protection requirements for missions to potentially life-bearing bodies',
          'Territorial claims to extraterrestrial geological resources under contested legal frameworks',
        ],
        futureTrajectory: 'Europa Clipper and Dragonfly missions will constrain ocean world habitability questions. Mars sample return is the scientific priority of the next decade.',
        boundaryNote: 'The discovery of life elsewhere in the universe would be among the most significant events in human intellectual history, requiring serious philosophical and theological engagement from all major traditions.',
      },
      {
        name: 'Environmental Systems',
        description: 'Scientific study of the interconnected physical, chemical, and biological processes governing terrestrial and aquatic ecosystems — including biodiversity dynamics and human ecological impact.',
        breakthroughs: [
          'Planetary boundaries framework identifying nine Earth system thresholds for human safety',
          'Sixth mass extinction quantified — current extinction rates 100-1000x background rate',
          'Microbiome science revealing the role of microbial communities in human and ecosystem health',
          'Remote sensing enabling global ecosystem monitoring at near-real-time resolution',
        ],
        openQuestions: [
          'What are the minimum viable ecosystem configurations for stable planetary function?',
          'Can biodiversity loss be reversed through assisted evolution and rewilding?',
          'How do multiple planetary boundary transgressions interact?',
        ],
        ethicalImplications: [
          'Non-human species and ecosystem moral status under conditions of anthropogenic mass extinction',
          'Environmental justice — pollution and ecological degradation concentrated in marginalized communities',
          'Biodiversity as a commons requiring governance beyond current frameworks',
        ],
        futureTrajectory: 'Ecosystem monitoring capacity is expanding rapidly through Earth observation. Ecological tipping points are increasingly the focus of coupled human-natural system modeling.',
        sufiReflection: {
          title: 'Sacred Ecology and Ecological Obligation',
          concepts: [
            { term: 'Khalifa in Practice', definition: 'The sixth mass extinction — driven by human activity — is the most direct empirical test of the Khalifa principle. The moral question is not whether biodiversity loss is occurring (it is, measurably), but what obligations trusteeship places on institutions and individuals with the knowledge and capacity to respond.' },
            { term: 'The Moral Status of Non-Human Life', definition: 'Islamic jurisprudence, including Sufi ethical tradition, recognizes obligations toward animals and the natural world. This provides a non-anthropocentric ethical framework for biodiversity conservation that complements utilitarian and rights-based approaches.' },
          ],
          framing: 'Environmental systems science describes the collapse of planetary life-support systems with increasing precision. Sacred ecology asks whether precision alone is sufficient to motivate institutional response, or whether moral grounding in obligation and accountability is a necessary complement.',
        },
      },
    ],
  },
];

function SufiReflectionBlock({ reflection }: { reflection: { title: string; concepts: Array<{ term: string; definition: string }>; framing: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#C8A75E]/15 rounded-lg bg-[#C8A75E]/[0.03] mt-4">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[10px] font-bold text-[#C8A75E]/70 uppercase tracking-widest group-hover:text-[#C8A75E] transition-colors">
          Sufi Epistemological Reflection — {reflection.title}
        </span>
        <ChevronDown className={`h-3 w-3 text-[#C8A75E]/40 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[#C8A75E]/10 pt-3 space-y-3">
          <div className="space-y-2.5">
            {reflection.concepts.map((c, i) => (
              <div key={i} className="border-l-2 border-[#C8A75E]/20 pl-3">
                <span className="text-[11px] font-semibold text-[#C8A75E]/80">{c.term}</span>
                <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed mt-0.5">{c.definition}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#D8D4CC]/70 leading-relaxed italic border-t border-white/5 pt-3">{reflection.framing}</p>
        </div>
      )}
    </div>
  );
}

function BoundaryNote({ note }: { note: string }) {
  return (
    <div className="border border-[#7BAFD4]/15 rounded-lg bg-[#7BAFD4]/[0.03] px-4 py-3 mt-3">
      <p className="text-[10px] font-bold text-[#7BAFD4]/60 uppercase tracking-widest mb-1">Boundary Condition</p>
      <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed">{note}</p>
    </div>
  );
}

function SubfieldPanel({ subfield }: { subfield: SubField }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-white/6 rounded-lg bg-white/[0.01] hover:border-white/10 transition-colors">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-snug">
            {subfield.name}
          </h4>
          {!expanded && (
            <p className="text-[11px] text-[#AAB0D6]/50 leading-relaxed mt-1 line-clamp-1">
              {subfield.description}
            </p>
          )}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#AAB0D6]/30 flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#C8A75E]' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/6 pt-4 space-y-5">
          <p className="text-[12px] text-[#D8D4CC] leading-relaxed">{subfield.description}</p>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Core Breakthroughs
            </p>
            <ul className="space-y-1.5">
              {subfield.breakthroughs.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C8A75E] text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Open Research Questions
            </p>
            <ul className="space-y-1.5">
              {subfield.openQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#7BAFD4] text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">
              Ethical Implications
            </p>
            <ul className="space-y-1.5">
              {subfield.ethicalImplications.map((e, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4A07B] text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/6 rounded-lg p-4 bg-white/[0.02]">
            <p className="text-[10px] font-bold text-[#8BB89A] uppercase tracking-widest mb-1.5">
              Future Trajectory
            </p>
            <p className="text-[12px] text-[#D8D4CC] leading-relaxed">{subfield.futureTrajectory}</p>
          </div>

          {subfield.sufiReflection && (
            <SufiReflectionBlock reflection={subfield.sufiReflection} />
          )}

          {subfield.boundaryNote && (
            <BoundaryNote note={subfield.boundaryNote} />
          )}
        </div>
      )}
    </div>
  );
}

function DomainSufiPanel({ reflection }: { reflection: NonNullable<Domain['domainSufiReflection']> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#C8A75E]/20 rounded-xl bg-[#C8A75E]/[0.04] mb-5">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest mb-1 group-hover:text-[#C8A75E]/90 transition-colors">
            {reflection.heading}
          </p>
          {!open && (
            <p className="text-[12px] text-[#AAB0D6]/50 leading-relaxed line-clamp-1">{reflection.body}</p>
          )}
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-[#C8A75E]/40 flex-shrink-0 transition-transform duration-200 mt-0.5 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-[#C8A75E]/10 pt-4 space-y-4">
          <p className="text-[12px] text-[#D8D4CC]/80 leading-relaxed">{reflection.body}</p>
          <div className="space-y-3">
            {reflection.concepts.map((c, i) => (
              <div key={i} className="border-l-2 border-[#C8A75E]/25 pl-4">
                <span className="text-[12px] font-semibold text-[#C8A75E]/80">{c.term}</span>
                <p className="text-[11px] text-[#AAB0D6]/65 leading-relaxed mt-0.5">{c.definition}</p>
              </div>
            ))}
          </div>
          {reflection.boundaryConditions && (
            <div className="border border-[#7BAFD4]/15 rounded-lg bg-[#7BAFD4]/[0.03] px-4 py-3">
              <p className="text-[10px] font-bold text-[#7BAFD4]/60 uppercase tracking-widest mb-2">Boundary Conditions</p>
              <ul className="space-y-1.5">
                {reflection.boundaryConditions.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#7BAFD4]/50 text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                    <span className="text-[11px] text-[#AAB0D6]/60 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DomainCard({ domain }: { domain: Domain }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = domain.icon;
  const color = domain.accentColor;

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{ borderColor: expanded ? `${color}30` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2
                className="text-[17px] font-bold transition-colors leading-snug"
                style={{ color: expanded ? color : '#F5F3EE' }}
              >
                {domain.title}
              </h2>
              <span className="text-[11px] text-[#AAB0D6]/50">{domain.tagline}</span>
            </div>
            <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed">{domain.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {domain.subfields.map((sf) => (
                <span
                  key={sf.name}
                  className="px-2 py-0.5 rounded-full text-[10px] text-[#AAB0D6]/50 border border-white/8 bg-white/3"
                >
                  {sf.name.split(' ')[0]} {sf.name.split(' ')[1] ?? ''}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            style={{ color: expanded ? color : 'rgba(170,176,214,0.3)' }}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/6 p-6 space-y-3 bg-[#080B1A]/40">
          {domain.domainSufiReflection && (
            <DomainSufiPanel reflection={domain.domainSufiReflection} />
          )}
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color }}>
            {domain.subfields.length} Research Areas
          </p>
          {domain.subfields.map((sf) => (
            <SubfieldPanel key={sf.name} subfield={sf} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdvancedSciencePage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Knowledge Systems"
        title="Advanced Science in Dialogue"
        title2='with Sufi Thought'
        description="Exploring Ontological and Epistemological Boundaries Across the Sciences"
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="mb-14">
              <p className="text-[15px] text-[#AAB0D6]/80 leading-relaxed max-w-3xl mb-4">
                This page maps core scientific domains defining 21st-century knowledge production.
                Each domain is organized by research field with structured information on current breakthroughs,
                open questions, ethical implications, and anticipated trajectories.
              </p>
              <p className="text-[13px] text-[#AAB0D6]/55 leading-relaxed max-w-3xl mb-4">
                Within each domain, we introduce epistemological and ontological reflections drawn from Sufi thought.
                These are presented as analytical frameworks and philosophical context — not as empirical claims
                or as evidence that mystical tradition validates scientific findings.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { label: 'Scientific Status', color: '#C8A75E' },
                  { label: 'Philosophical Reflection', color: '#C8A75E' },
                  { label: 'Ethical Implications', color: '#D4A07B' },
                  { label: 'Open Research Questions', color: '#7BAFD4' },
                  { label: 'Boundary Conditions', color: '#7BAFD4' },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="px-3 py-1 rounded-full text-[10px] border"
                    style={{ color: item.color, borderColor: `${item.color}30`, backgroundColor: `${item.color}08` }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 gap-4">
              {DOMAINS.map((domain) => (
                <DomainCard key={domain.id} domain={domain} />
              ))}
            </div>
          </ScrollReveal>

          {/* Metaphysical Operations Section */}
          <ScrollReveal>
            <div className="mt-16 border border-[#C8A75E]/20 rounded-2xl bg-[#C8A75E]/[0.03] p-8">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest mb-2">
                  Closing Framework
                </p>
                <h3 className="text-[20px] font-bold text-[#F5F3EE] leading-snug mb-3">
                  Metaphysical Operations Behind Scientific Inquiry
                </h3>
                <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed max-w-2xl">
                  Sufi practice and scientific method are not identical — but they share a structural commitment to
                  disciplined inquiry, iterative refinement, and verification through transformation.
                  Understanding that parallel deepens both.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-[#8BB89A] uppercase tracking-widest mb-4">
                    Sufi Inner Practice as Systematic Inquiry
                  </p>
                  <div className="space-y-3">
                    {[
                      { step: 'Observation', detail: 'Systematic attention to inner phenomena — states, thoughts, perceptions — with precision and honesty.' },
                      { step: 'Discipline', detail: 'Structured practice under verified guidance, not undirected introspection. Method matters.' },
                      { step: 'Iterative Refinement', detail: 'Progressive purification of perception through repeated cycles of practice, observation, and correction.' },
                      { step: 'Verification through Transformation', detail: 'Knowledge is confirmed not through external measurement alone but through measurable changes in the practitioner\'s cognitive and moral functioning.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#C8A75E]/15 border border-[#C8A75E]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-bold text-[#C8A75E]">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#F5F3EE]/80">{item.step}</p>
                          <p className="text-[11px] text-[#AAB0D6]/55 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#7BAFD4] uppercase tracking-widest mb-4">
                    Scientific Method: Structural Parallel
                  </p>
                  <div className="space-y-3">
                    {[
                      { step: 'Hypothesis', detail: 'A structured conjecture about observable phenomena based on existing knowledge and pattern recognition.' },
                      { step: 'Experiment', detail: 'Controlled intervention designed to test the hypothesis against the behavior of the system under study.' },
                      { step: 'Reproducibility', detail: 'Independent verification by other investigators under comparable conditions — the social dimension of scientific epistemology.' },
                      { step: 'Peer Validation', detail: 'Results subjected to scrutiny by a community of competent peers who share the methodological framework.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#7BAFD4]/15 border border-[#7BAFD4]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-bold text-[#7BAFD4]">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#F5F3EE]/80">{item.step}</p>
                          <p className="text-[11px] text-[#AAB0D6]/55 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/6 pt-6">
                <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed max-w-3xl">
                  The parallel is not proof of equivalence. Scientific method operates on publicly observable
                  phenomena with intersubjective verification. Contemplative practice operates on phenomenal
                  interiority with verification through personal transformation and lineage transmission.
                  The two methodologies are distinct — but each has something to learn from the other&apos;s
                  commitment to rigor, humility, and the recognition that the most important questions
                  remain open.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/knowledge-systems"
              className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              Back to Knowledge Systems
            </Link>
            <Link
              href="/knowledge-systems/science-sufism"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
            >
              Science & Sufism
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
