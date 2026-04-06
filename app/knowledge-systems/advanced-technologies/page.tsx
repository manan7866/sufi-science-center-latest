import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Brain, Network, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Advanced Technologies in Sufi-Scientific Inquiry | Sufi Science Center",
  description: "Explore how advanced technologies intersect with consciousness research, energy systems, and contemplative Sufi paradigms.",
  openGraph: {
    title: "Advanced Technologies | Sufi Science Center",
    description: "Deep dive into thematic research on consciousness, energy systems, and advanced integration.",
  },
};

export default function AdvancedTechnologiesPage() {
  const themes = [
    {
      icon: Brain,
      title: "Consciousness Technologies",
      description: "Tools and frameworks for investigating consciousness states, contemplative practice, and subjective experience through rigorous methodologies.",
      areas: [
        "Neural correlates of contemplative states",
        "Phenomenological mapping",
        "Contemplative neuroscience",
        "First-person methodologies"
      ],
      link: "/knowledge-systems/consciousness-systems"
    },
    {
      icon: Zap,
      title: "Energy Systems",
      description: "Integration of subtle energy frameworks from contemplative traditions with modern physics and bioenergetics.",
      areas: [
        "Biofield science",
        "Psychophysiological coherence",
        "Energy medicine frameworks",
        "Electromagnetic field interactions"
      ],
      link: "/knowledge-systems/energy-systems"
    },
    {
      icon: Network,
      title: "Complex Systems",
      description: "Understanding emergence, self-organization, and systemic intelligence through the lens of both scientific and contemplative inquiry.",
      areas: [
        "Systems theory and emergence",
        "Network dynamics",
        "Collective intelligence",
        "Holistic system modeling"
      ],
      link: "/knowledge-systems/complex-systems"
    },
    {
      icon: Sparkles,
      title: "Quantum Foundations",
      description: "Exploring parallels between quantum mechanics, information theory, and contemplative descriptions of reality.",
      areas: [
        "Quantum measurement problem",
        "Observer effects",
        "Non-locality and entanglement",
        "Information ontology"
      ],
      link: "/knowledge-systems/quantum-foundations"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Thematic Exploration"
        title="Advanced Technologies"
        description="Bridging contemplative wisdom and cutting-edge scientific frameworks to explore consciousness, energy, and the nature of reality."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Overview */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex items-start space-x-4 mb-6">
              <Cpu className="w-8 h-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">Integration Framework</h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  The Sufi Science Center approaches advanced technologies not as mere tools, but as interfaces
                  between different orders of reality. Our work integrates:
                </p>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    <span><strong className="text-[#F5F3EE]">Contemplative methodologies</strong> refined over centuries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    <span><strong className="text-[#F5F3EE]">Rigorous scientific frameworks</strong> from physics, neuroscience, and systems theory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    <span><strong className="text-[#F5F3EE]">First-person phenomenology</strong> as a valid domain of inquiry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    <span><strong className="text-[#F5F3EE]">Interdisciplinary synthesis</strong> that respects both epistemologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Thematic Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-8">Thematic Areas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {themes.map((theme, idx) => (
                <Card key={idx} className="glass-panel border-white/5">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <theme.icon className="w-12 h-12 text-[#C8A75E]" />
                    </div>
                    <CardTitle className="text-2xl text-[#F5F3EE] mb-2">{theme.title}</CardTitle>
                    <CardDescription className="text-[#AAB0D6]">
                      {theme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <p className="text-sm text-[#AAB0D6] font-semibold">Research Areas:</p>
                      <ul className="space-y-2">
                        {theme.areas.map((area, i) => (
                          <li key={i} className="flex items-start text-sm text-[#AAB0D6]">
                            <span className="text-[#C8A75E] mr-2 mt-1">→</span>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={theme.link}>
                      <Button variant="outline" className="w-full border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10">
                        Explore in Detail
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Integration Principles */}
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Integration Principles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F5F3EE]">Epistemological Pluralism</h3>
                <p className="text-sm text-[#AAB0D6]">
                  Recognizing multiple valid ways of knowing, each with distinct methodologies and domains of application.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F5F3EE]">Rigorous Phenomenology</h3>
                <p className="text-sm text-[#AAB0D6]">
                  First-person investigation conducted with the same rigor as third-person scientific methodologies.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F5F3EE]">Interdisciplinary Synthesis</h3>
                <p className="text-sm text-[#AAB0D6]">
                  Building bridges between domains without reducing one to the other or forcing premature integration.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
