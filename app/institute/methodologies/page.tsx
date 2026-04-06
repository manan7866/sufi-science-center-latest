import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { GlassResearchCard } from '@/components/glass-research-card';
import { KnowledgeGrid } from '@/components/knowledge-grid';
import {
  Brain,
  Network,
  FileText,
  Users,
  FlaskConical,
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const WORK_STREAMS = [
  {
    icon: Brain,
    title: 'Inner Development Programs',
    href: '/inner-development',
    description: 'Structured frameworks for systematic consciousness development and transformative practice'
  },
  {
    icon: FileText,
    title: 'Research Projects',
    href: '/research',
    description: 'Active investigations into contemplative phenomenology, developmental trajectories, and transformation'
  },
  {
    icon: Target,
    title: 'Assessment Framework',
    href: '/assessment',
    description: 'Validated tools for measuring contemplative understanding and developmental progress'
  },
  {
    icon: Users,
    title: 'Dialogue Series',
    href: '/dialogues',
    description: 'Structured conversations between scholars, practitioners, and researchers'
  }
];

const METHODOLOGY_COMPONENTS = [
  {
    category: 'Quantitative Methods',
    icon: TrendingUp,
    approaches: [
      'Psychometric assessment development and validation',
      'Statistical analysis of developmental patterns',
      'Survey research on contemplative practice and outcomes',
      'Physiological measurement integration where appropriate'
    ]
  },
  {
    category: 'Qualitative Methods',
    icon: BookOpen,
    approaches: [
      'Semi-structured phenomenological interviews',
      'Longitudinal case studies of transformative development',
      'Textual analysis of contemplative teaching materials',
      'Ethnographic observation of practice communities'
    ]
  },
  {
    category: 'Integrated Approaches',
    icon: FlaskConical,
    approaches: [
      'Mixed-methods research designs combining multiple modalities',
      'Triangulation across quantitative, qualitative, and contemplative data',
      'Collaborative inquiry involving practitioners as co-researchers',
      'Iterative refinement based on multi-perspective feedback'
    ]
  }
];

export default function MethodologiesPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Research in Action"
        title="Applied Work and Methodologies"
        description="Our structured programs, active research projects, assessment frameworks, and integrated practice-to-research pipeline."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Active Work Streams */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4 text-center">
              Active Work Streams
            </h2>
            <p className="text-[#AAB0D6] text-center mb-12 max-w-3xl mx-auto">
              Four integrated streams translate our research vision into concrete programs and outputs
            </p>

            <KnowledgeGrid>
              {WORK_STREAMS.map((stream) => (
                <GlassResearchCard
                  key={stream.title}
                  icon={stream.icon}
                  title={stream.title}
                  description={stream.description}
                  href={stream.href}
                />
              ))}
            </KnowledgeGrid>
          </div>

          {/* Research Methodology */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Research Methodology Framework
              </h2>
              <p className="text-[#AAB0D6] leading-relaxed mb-8">
                Our methodology integrates multiple approaches to capture different dimensions of
                consciousness and transformation. We combine quantitative measurement with qualitative
                phenomenology, maintaining rigor while respecting experiential complexity.
              </p>

              <div className="space-y-8">
                {METHODOLOGY_COMPONENTS.map((component) => {
                  const Icon = component.icon;
                  return (
                    <div key={component.category}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-8 w-8 text-[#C8A75E]" />
                        <h3 className="text-2xl font-semibold text-[#F5F3EE]">
                          {component.category}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {component.approaches.map((approach, i) => (
                          <div
                            key={i}
                            className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-4"
                          >
                            <div className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                              <p className="text-sm text-[#AAB0D6]">{approach}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Practice-to-Research Pipeline */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <Network className="h-10 w-10 text-[#C8A75E] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">
                    Practice-to-Research Pipeline
                  </h2>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    We maintain a structured pathway from contemplative practice through systematic
                    documentation to rigorous research analysis, creating feedback loops that inform
                    both scholarly understanding and practical application.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                    <div className="w-10 h-10 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mb-4">
                      1
                    </div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Practice</h4>
                    <p className="text-sm text-[#AAB0D6]">
                      Structured contemplative programs with systematic development frameworks
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform translate-x-full -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-[#C8A75E]" />
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                    <div className="w-10 h-10 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mb-4">
                      2
                    </div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Documentation</h4>
                    <p className="text-sm text-[#AAB0D6]">
                      Systematic phenomenological recording using both traditional and contemporary methods
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform translate-x-full -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-[#C8A75E]" />
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                    <div className="w-10 h-10 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mb-4">
                      3
                    </div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Analysis</h4>
                    <p className="text-sm text-[#AAB0D6]">
                      Rigorous research investigation using appropriate quantitative and qualitative methods
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform translate-x-full -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-[#C8A75E]" />
                  </div>
                </div>

                <div>
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                    <div className="w-10 h-10 rounded-full bg-[#C8A75E] text-[#0B0F2A] flex items-center justify-center text-lg font-bold mb-4">
                      4
                    </div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Integration</h4>
                    <p className="text-sm text-[#AAB0D6]">
                      Research findings inform practice refinement, creating continuous improvement cycles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Methodological Commitments */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Methodological Commitments
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Rigor Without Reduction</h4>
                    <p className="text-[#AAB0D6]">
                      We maintain scientific rigor while refusing to reduce consciousness to
                      purely material processes or dismiss phenomenology as epiphenomenal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Multi-Perspective Integration</h4>
                    <p className="text-[#AAB0D6]">
                      We integrate first-person phenomenology, second-person dialogue, and
                      third-person observation to achieve comprehensive understanding
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Longitudinal Commitment</h4>
                    <p className="text-[#AAB0D6]">
                      We prioritize long-term studies recognizing that transformation unfolds
                      over years and decades, not weeks or months
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Collaborative Inquiry</h4>
                    <p className="text-[#AAB0D6]">
                      We involve practitioners as co-researchers, valuing experiential expertise
                      alongside academic training
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#F5F3EE] mb-2">Transparent Methods</h4>
                    <p className="text-[#AAB0D6]">
                      We document and publish our methodologies, making research processes
                      available for scrutiny and replication
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
