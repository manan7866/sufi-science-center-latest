import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Heart,
  Network,
  Target,
  BookOpen,
  Users,
  FlaskConical,
  Microscope
} from 'lucide-react';

const RESEARCH_PILLARS = [
  {
    icon: Brain,
    title: 'Consciousness Studies',
    description: 'Phenomenological investigation of states, stages, and structures of consciousness',
    focus: ['Meditative states research', 'Contemplative phenomenology', 'Neural correlates studies', 'Cross-cultural comparison']
  },
  {
    icon: Heart,
    title: 'Inner Development',
    description: 'Systematic study of transformative processes and developmental trajectories',
    focus: ['Stage models validation', 'Practice-outcome relationships', 'Long-term development tracking', 'Integration challenges']
  },
  {
    icon: Network,
    title: 'Knowledge Systems',
    description: 'Analysis of traditional frameworks for understanding consciousness and transformation',
    focus: ['Textual analysis', 'Lineage documentation', 'Practice taxonomy', 'Epistemological frameworks']
  },
  {
    icon: FlaskConical,
    title: 'Assessment and Measurement',
    description: 'Development of tools for evaluating contemplative development and understanding',
    focus: ['Psychometric development', 'Qualitative protocols', 'Mixed-methods design', 'Validity research']
  }
];

const COLLABORATION_DOMAINS = [
  { domain: 'Neuroscience and Psychology', description: 'Neural mechanisms, cognitive processes, developmental psychology' },
  { domain: 'Philosophy of Mind', description: 'Consciousness theories, phenomenology, epistemology' },
  { domain: 'Religious Studies', description: 'Comparative mysticism, contemplative traditions, textual scholarship' },
  { domain: 'Anthropology and Sociology', description: 'Cultural contexts, social dimensions, institutional analysis' },
  { domain: 'Education and Development', description: 'Pedagogical applications, developmental frameworks, learning science' }
];

export default function PurposePage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Research Mission"
        title="Purpose and Research"
        title2='Direction'
        description="Our consciousness research goals, inner development model, multi-disciplinary approach, and collaborative roadmap for advancing integrated understanding."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Core Purpose */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Research Purpose
              </h2>
              <p className="text-[#AAB0D6] text-lg leading-relaxed mb-6">
                The Sufi Science Center exists to advance <span className="text-[#C8A75E] font-semibold">rigorous, systematic inquiry</span> into
                consciousness, inner transformation, and the integration of contemplative wisdom with
                scientific methodology.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed mb-6">
                We pursue research that is empirically grounded, phenomenologically sophisticated,
                philosophically informed, and practically relevant. This research neither reduces
                consciousness to neural mechanisms nor treats spiritual experience as beyond
                systematic investigation.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed">
                Our work serves the advancement of understanding, not the advocacy of particular
                metaphysical positions or religious commitments. We maintain intellectual independence
                while honoring both the contemplative traditions we study and the scientific communities
                we engage.
              </p>
            </div>
          </Card>

          {/* Research Pillars */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4 text-center">
              Research Pillars
            </h2>
            <p className="text-[#AAB0D6] text-center mb-12 max-w-3xl mx-auto">
              Four interconnected domains structure our research activities and priorities
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RESEARCH_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.title}
                    className="glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/50 transition-all"
                  >
                    <div className="p-8">
                      <Icon className="h-12 w-12 text-[#C8A75E] mb-4" />
                      <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-[#AAB0D6] mb-6">
                        {pillar.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Focus Areas:</h4>
                        {pillar.focus.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                            <span className="text-sm text-[#AAB0D6]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Multi-Disciplinary Approach */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <Microscope className="h-10 w-10 text-[#C8A75E] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">
                    Multi-Disciplinary Integration
                  </h2>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Consciousness research requires engagement across multiple disciplines. We actively
                    collaborate with scholars and practitioners in diverse fields, creating structured
                    dialogue that advances integrated understanding.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLLABORATION_DOMAINS.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-[#F5F3EE] mb-2">{item.domain}</h3>
                    <p className="text-sm text-[#AAB0D6]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Research Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="p-6">
                <BookOpen className="h-10 w-10 text-[#C8A75E] mb-4" />
                <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2">
                  Publications and Papers
                </h3>
                <p className="text-sm text-[#AAB0D6]">
                  Peer-reviewed research, theoretical frameworks, and methodological innovations
                  published in academic journals and edited volumes
                </p>
              </div>
            </Card>

            <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="p-6">
                <Users className="h-10 w-10 text-[#C8A75E] mb-4" />
                <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2">
                  Dialogue Series
                </h3>
                <p className="text-sm text-[#AAB0D6]">
                  Structured conversations bringing together diverse perspectives for mutual
                  learning and collaborative inquiry
                </p>
              </div>
            </Card>

            <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
              <div className="p-6">
                <Target className="h-10 w-10 text-[#C8A75E] mb-4" />
                <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2">
                  Assessment Tools
                </h3>
                <p className="text-sm text-[#AAB0D6]">
                  Validated instruments for measuring contemplative understanding and
                  developmental progress
                </p>
              </div>
            </Card>
          </div>

          {/* Long-Term Vision */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Long-Term Research Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30 mb-3">
                    5-Year Horizon
                  </Badge>
                  <p className="text-[#AAB0D6]">
                    Establish foundational research infrastructure, validate core assessment instruments,
                    build collaborative networks, and publish initial empirical findings on contemplative
                    development
                  </p>
                </div>

                <div>
                  <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30 mb-3">
                    10-Year Horizon
                  </Badge>
                  <p className="text-[#AAB0D6]">
                    Develop comprehensive longitudinal studies, create integrated theoretical frameworks,
                    establish recognized expertise in consciousness research methodology, and influence
                    broader academic discourse
                  </p>
                </div>

                <div>
                  <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30 mb-3">
                    Generational Vision
                  </Badge>
                  <p className="text-[#AAB0D6]">
                    Contribute to fundamental shifts in how consciousness research is conducted,
                    preserve and transmit contemplative wisdom for future generations, and establish
                    sustainable institutional infrastructure for continued inquiry
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
