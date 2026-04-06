import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Eye, Sparkles, Network, Layers, Microscope } from 'lucide-react';

export const metadata = {
  title: "Consciousness Systems Research | Sufi Science Center",
  description: "Investigating consciousness through integrated contemplative, phenomenological, and neuroscientific methodologies.",
  openGraph: {
    title: "Consciousness Systems | Sufi Science Center",
    description: "Bridging first-person contemplative methodologies with rigorous scientific investigation of consciousness.",
  },
};

export default function ConsciousnessSystemsPage() {
  const researchDomains = [
    {
      icon: Brain,
      title: "Contemplative Neuroscience",
      description: "Neural correlates of meditation, contemplative states, and the neuroplasticity induced by sustained practice.",
      findings: [
        "Default mode network changes in meditation",
        "Gamma wave synchronization in advanced practitioners",
        "Structural brain changes from long-term practice",
        "Attention regulation and meta-awareness"
      ]
    },
    {
      icon: Eye,
      title: "Phenomenological Mapping",
      description: "Rigorous first-person investigation of consciousness structures, states, and transformations.",
      findings: [
        "Micro-phenomenology of contemplative experiences",
        "Stages of practice from multiple traditions",
        "Altered states phenomenology",
        "Consciousness structure analysis"
      ]
    },
    {
      icon: Layers,
      title: "States and Stages",
      description: "Investigating both temporary state changes and developmental stage progressions in consciousness development.",
      findings: [
        "State-stage distinction in development",
        "Cross-tradition stage models",
        "Temporary vs. permanent realizations",
        "Integration of peak experiences"
      ]
    },
    {
      icon: Network,
      title: "Collective Consciousness",
      description: "Exploring shared consciousness phenomena, group coherence, and collective intelligence.",
      findings: [
        "Group meditation field effects",
        "Social coherence and synchronization",
        "Teacher-student transmission dynamics",
        "Collective intelligence emergence"
      ]
    }
  ];

  const methodologies = [
    {
      category: "First-Person Methods",
      techniques: [
        "Introspective phenomenology",
        "Contemplative practice logs",
        "Experience sampling protocols",
        "Micro-phenomenological interviews"
      ]
    },
    {
      category: "Third-Person Methods",
      techniques: [
        "fMRI and neuroimaging",
        "EEG and MEG recordings",
        "Heart rate variability analysis",
        "Biochemical markers"
      ]
    },
    {
      category: "Second-Person Methods",
      techniques: [
        "Intersubjective validation",
        "Teacher-student dialogue",
        "Contemplative communities",
        "Peer practice groups"
      ]
    },
    {
      category: "Integration Frameworks",
      techniques: [
        "Multi-method triangulation",
        "Neurophenomenology",
        "Embodied cognition models",
        "Systems theory approaches"
      ]
    }
  ];

  const keyQuestions = [
    "What is the relationship between neural activity and subjective experience?",
    "Can contemplative methodologies provide reliable knowledge about consciousness?",
    "How do temporary states relate to permanent developmental stages?",
    "What role does consciousness play in physical reality?",
    "Are there levels or dimensions of consciousness beyond ordinary awareness?",
    "How can we integrate first-person and third-person knowledge?",
    "What is the nature of non-ordinary states of consciousness?",
    "Can consciousness exist independent of physical substrates?"
  ];

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Thematic Exploration"
        title="Consciousness Systems"
        description="Integrating contemplative wisdom, rigorous phenomenology, and neuroscientific investigation to explore the nature and potential of consciousness."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Overview */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex items-start space-x-4">
              <Brain className="w-8 h-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">The Hard Problem and Beyond</h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  Consciousness remains one of the deepest mysteries in science. How does subjective experience arise?
                  Can consciousness be fully explained by neural activity? What is the relationship between mind and matter?
                </p>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  The Sufi Science Center approaches these questions through <strong className="text-[#F5F3EE]">methodological pluralism</strong>:
                  integrating first-person contemplative methodologies refined over centuries with third-person neuroscience
                  and second-person intersubjective validation.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed">
                  We investigate not just the correlates of consciousness, but its nature, development, and potential, recognizing
                  that contemplative traditions have conducted rigorous systematic investigations of consciousness for millennia.
                </p>
              </div>
            </div>
          </div>

          {/* Research Domains */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-8">Research Domains</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchDomains.map((domain, idx) => (
                <Card key={idx} className="glass-panel border-white/5">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <domain.icon className="w-10 h-10 text-[#C8A75E]" />
                      <CardTitle className="text-xl text-[#F5F3EE]">{domain.title}</CardTitle>
                    </div>
                    <CardDescription className="text-[#AAB0D6]">
                      {domain.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#AAB0D6] uppercase tracking-wide">Key Areas:</p>
                      <ul className="space-y-1.5">
                        {domain.findings.map((finding, i) => (
                          <li key={i} className="flex items-start text-sm text-[#AAB0D6]">
                            <Sparkles className="w-3 h-3 text-[#C8A75E] mr-2 mt-1 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Methodologies */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Integrated Methodologies</h2>
            <p className="text-[#AAB0D6] mb-8">
              A comprehensive science of consciousness requires integration across epistemological domains:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {methodologies.map((method, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white/5">
                  <h3 className="text-lg font-semibold text-[#F5F3EE] mb-4">{method.category}</h3>
                  <ul className="space-y-2">
                    {method.techniques.map((technique, i) => (
                      <li key={i} className="flex items-start text-sm text-[#AAB0D6]">
                        <Microscope className="w-3.5 h-3.5 text-[#C8A75E] mr-2 mt-0.5 flex-shrink-0" />
                        {technique}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Questions */}
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Fundamental Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {keyQuestions.map((question, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg bg-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#C8A75E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-[#C8A75E]">{idx + 1}</span>
                  </div>
                  <p className="text-[#AAB0D6] text-sm leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
