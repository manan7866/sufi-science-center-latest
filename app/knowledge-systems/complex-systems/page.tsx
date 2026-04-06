import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, TrendingUp, Users, Workflow, GitBranch, Sparkles } from 'lucide-react';

export const metadata = {
  title: "Complex Systems Science | Sufi Science Center",
  description: "Understanding emergence, self-organization, and systemic intelligence through integrated scientific and contemplative frameworks.",
};

export default function ComplexSystemsPage() {
  const domains = [
    {
      icon: Network,
      title: "Emergence and Self-Organization",
      description: "How complex patterns and behaviors arise from simple rules and interactions without central control.",
      examples: [
        "Consciousness emerging from neural networks",
        "Social structures from individual interactions",
        "Ecological balance through distributed feedback",
        "Self-organizing criticality in living systems"
      ]
    },
    {
      icon: Users,
      title: "Collective Intelligence",
      description: "Group-level intelligence that exceeds the sum of individual contributions through synergistic interaction.",
      examples: [
        "Swarm intelligence and distributed cognition",
        "Wisdom traditions and collective knowledge",
        "Organizational learning and adaptation",
        "Network effects in knowledge systems"
      ]
    },
    {
      icon: Workflow,
      title: "Systems Dynamics",
      description: "Feedback loops, nonlinear interactions, and temporal evolution in complex adaptive systems.",
      examples: [
        "Positive and negative feedback in development",
        "Tipping points and phase transitions",
        "Resilience and adaptive capacity",
        "Cyclical patterns in natural systems"
      ]
    },
    {
      icon: GitBranch,
      title: "Network Theory",
      description: "Structure and dynamics of interconnected systems, from neural networks to social networks.",
      examples: [
        "Small-world networks in brain connectivity",
        "Scale-free distributions in social systems",
        "Information flow through networks",
        "Spiritual lineages as knowledge networks"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Thematic Exploration"
        title="Complex Systems"
        description="Exploring emergence, self-organization, and collective intelligence through the lens of systems science and contemplative wisdom."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">Systems Thinking</h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-4">
              Complex systems science studies how interactions between components give rise to collective behaviors
              that cannot be predicted from the properties of individual parts alone. This holistic perspective
              resonates deeply with contemplative traditions' understanding of interconnection and emergence.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed">
              The Sufi Science Center integrates systems theory with contemplative insights on wholeness,
              interdependence, and the relationship between parts and wholes across multiple scales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {domains.map((domain, idx) => (
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
                  <ul className="space-y-2">
                    {domain.examples.map((example, i) => (
                      <li key={i} className="flex items-start text-sm text-[#AAB0D6]">
                        <Sparkles className="w-3 h-3 text-[#C8A75E] mr-2 mt-1 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Contemplative Perspectives</h2>
            <div className="space-y-4 text-[#AAB0D6]">
              <p>
                Contemplative traditions have long recognized principles that systems science is now formalizing:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-3 mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Interconnection:</strong> Everything is connected to everything else in a vast web of relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-3 mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Emergence:</strong> Higher levels of organization exhibit properties not present at lower levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-3 mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Holism:</strong> The whole is more than the sum of its parts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-3 mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Self-organization:</strong> Order can arise spontaneously without external direction</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
