import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Waves, Heart, Activity, Radio, Sparkles } from 'lucide-react';

export const metadata = {
  title: "Energy Systems Research | Sufi Science Center",
  description: "Exploring the intersection of subtle energy frameworks from contemplative traditions with modern physics, bioenergetics, and consciousness research.",
  openGraph: {
    title: "Energy Systems | Sufi Science Center",
    description: "Integration of contemplative energy frameworks with contemporary scientific inquiry.",
  },
};

export default function EnergySystemsPage() {
  const researchAreas = [
    {
      icon: Heart,
      title: "Biofield Science",
      description: "Investigation of organized electromagnetic fields and biophoton emissions around living systems.",
      insights: [
        "Heart-brain electromagnetic coherence",
        "Biofield measurement technologies",
        "Therapeutic biofield modulation",
        "Consciousness-field interactions"
      ]
    },
    {
      icon: Activity,
      title: "Psychophysiological Coherence",
      description: "Study of synchronized physiological rhythms during contemplative states and their effects on health and consciousness.",
      insights: [
        "Heart rate variability patterns",
        "Autonomic nervous system regulation",
        "Brainwave entrainment",
        "Systemic resonance phenomena"
      ]
    },
    {
      icon: Waves,
      title: "Subtle Energy Systems",
      description: "Mapping contemplative descriptions of energy channels, centers, and flows to physiological and electromagnetic correlates.",
      insights: [
        "Nadis, meridians, and fascial networks",
        "Chakra systems and endocrine correlates",
        "Pranayama and respiratory coherence",
        "Energy cultivation practices"
      ]
    },
    {
      icon: Radio,
      title: "Field Dynamics",
      description: "Exploring how consciousness may interact with or manifest as organized fields beyond conventional electromagnetic spectrum.",
      insights: [
        "Collective field phenomena",
        "Intention and field effects",
        "Non-local correlations",
        "Morphic resonance hypotheses"
      ]
    }
  ];

  const contemplativeFrameworks = [
    {
      tradition: "Sufi Energy Physiology",
      concepts: [
        "Latīfas (subtle centers of consciousness)",
        "Nafas (breath as life force carrier)",
        "Nūr (light as spiritual energy)",
        "Magnetic presence (jadhba)"
      ]
    },
    {
      tradition: "Yogic Systems",
      concepts: [
        "Prāṇa (vital energy)",
        "Kuṇḍalinī (dormant energy awakening)",
        "Nāḍīs (energy channels)",
        "Prāṇāyāma (breath regulation)"
      ]
    },
    {
      tradition: "Chinese Medicine",
      concepts: [
        "Qi (life force energy)",
        "Meridian system",
        "Yin-Yang dynamics",
        "Five Element theory"
      ]
    },
    {
      tradition: "Contemporary Research",
      concepts: [
        "Bioelectromagnetic fields",
        "Biophoton emission",
        "Quantum coherence in biology",
        "Information fields"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Thematic Exploration"
        title="Energy Systems"
        description="Bridging ancient wisdom about subtle energies with contemporary biophysics, consciousness research, and systems science."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Overview */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex items-start space-x-4">
              <Zap className="w-8 h-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">Research Framework</h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  Energy systems research at the Sufi Science Center explores the interface between contemplative
                  traditions' sophisticated descriptions of subtle energies and contemporary scientific frameworks
                  in biophysics, psychophysiology, and consciousness studies.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed">
                  Rather than dismissing traditional energy concepts as mere metaphor or uncritically accepting them,
                  we investigate potential correlates in measurable physiological phenomena while remaining open to
                  the possibility that some aspects may operate through principles not yet understood by conventional science.
                </p>
              </div>
            </div>
          </div>

          {/* Research Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-8">Research Areas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area, idx) => (
                <Card key={idx} className="glass-panel border-white/5">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <area.icon className="w-10 h-10 text-[#C8A75E]" />
                      <CardTitle className="text-xl text-[#F5F3EE]">{area.title}</CardTitle>
                    </div>
                    <CardDescription className="text-[#AAB0D6]">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#AAB0D6] uppercase tracking-wide">Key Areas:</p>
                      <ul className="space-y-1.5">
                        {area.insights.map((insight, i) => (
                          <li key={i} className="flex items-start text-sm text-[#AAB0D6]">
                            <Sparkles className="w-3 h-3 text-[#C8A75E] mr-2 mt-1 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contemplative Frameworks */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Contemplative Frameworks</h2>
            <Tabs defaultValue="sufi" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5">
                <TabsTrigger value="sufi" className="data-[state=active]:bg-[#C8A75E]/20">Sufi</TabsTrigger>
                <TabsTrigger value="yogic" className="data-[state=active]:bg-[#C8A75E]/20">Yogic</TabsTrigger>
                <TabsTrigger value="chinese" className="data-[state=active]:bg-[#C8A75E]/20">Chinese</TabsTrigger>
                <TabsTrigger value="contemporary" className="data-[state=active]:bg-[#C8A75E]/20">Contemporary</TabsTrigger>
              </TabsList>
              {contemplativeFrameworks.map((framework, idx) => (
                <TabsContent
                  key={idx}
                  value={framework.tradition.toLowerCase().split(' ')[0]}
                  className="mt-6 space-y-4"
                >
                  <h3 className="text-xl font-semibold text-[#F5F3EE]">{framework.tradition}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {framework.concepts.map((concept, i) => (
                      <div key={i} className="flex items-start space-x-3 p-4 rounded-lg bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                        <p className="text-[#AAB0D6]">{concept}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Methodological Approach */}
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Methodological Approach</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Rigorous Investigation</h3>
                <ul className="space-y-2 text-sm text-[#AAB0D6]">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Measurement of physiological correlates (HRV, EEG, biophoton emission)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    First-person phenomenological mapping by trained contemplatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Cross-tradition comparison of energy models
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Integration with systems biology and quantum biology frameworks
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Epistemological Humility</h3>
                <ul className="space-y-2 text-sm text-[#AAB0D6]">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Respecting traditional frameworks without forcing premature reduction
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Acknowledging limits of current measurement technologies
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Openness to phenomena that may require paradigm expansion
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Interdisciplinary dialogue between practitioners and scientists
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
