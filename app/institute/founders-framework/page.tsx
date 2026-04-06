import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import {
  Layers,
  BookOpen,
  Lightbulb,
  Users,
  Scale,
  Tv,
  Compass,
  GitBranch,
  ArrowRight,
} from 'lucide-react';

const PILLARS = [
  {
    number: '01',
    icon: BookOpen,
    title: 'Foundational Studies',
    body: 'Theological grounding anchored in disciplined methodology. Sacred texts are engaged as living epistemological sources, not mere cultural artifacts.',
    principle: 'Depth over familiarity',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Knowledge Systems',
    body: 'Comparative epistemology and structured inquiry across traditions. The Framework recognizes multiple valid modes of knowing, integrating contemplative and analytical methodologies.',
    principle: 'Integration over reduction',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Inner Development',
    body: 'Ethical refinement, self-discipline, and character cultivation. Intellectual and spiritual growth are treated as inseparable dimensions of human development.',
    principle: 'Character over rhetoric',
  },
  {
    number: '04',
    icon: Users,
    title: 'Interfaith Coherence',
    body: 'Dialogue rooted in intellectual respect, without dilution. The Framework engages other traditions from a position of confident humility, seeking coherence without compromise.',
    principle: 'Respect without syncretism',
  },
  {
    number: '05',
    icon: Tv,
    title: 'Media Expression',
    body: 'Responsible transmission of sacred knowledge through SufiPulse Studio USA. Media is understood as moral infrastructure, not entertainment.',
    principle: 'Transmission with accountability',
  },
  {
    number: '06',
    icon: Scale,
    title: 'Institutional Ethics',
    body: 'Governance frameworks grounded in accountability, transparency, and principled leadership. Institutions are structured to outlast individuals.',
    principle: 'Structure over personality',
  },
];

const DESIGN_PRINCIPLES = [
  {
    title: 'Non-Reactionary',
    description:
      'The Framework does not emerge from opposition to modernity or reaction against secularism. It is a constructive architecture, built forward from inherited wisdom.',
  },
  {
    title: 'Non-Syncretic',
    description:
      'Integration does not mean equivalence. The Framework engages multiple traditions without collapsing their distinctions or abandoning doctrinal grounding.',
  },
  {
    title: 'Institutionally Durable',
    description:
      'The Framework is designed to function beyond individual leadership. Authority flows through structure, not charisma. Systems are built to endure.',
  },
  {
    title: 'Practice-Embedded',
    description:
      'Scholarship must connect to lived experience. Every intellectual pillar in the Framework maps to observable practice, assessment, and refinement.',
  },
];

const INTEGRATION_LAYERS = [
  {
    layer: 'Civilizational Layer',
    description: 'Faith and science are not adversaries. They are complementary modes of engaging reality. The Framework situates their integration at the level of civilization, not merely personal belief.',
  },
  {
    layer: 'Institutional Layer',
    description: 'Sound governance, ethical compliance, and transparent accountability are treated as sacred obligations. Institutions are spiritual instruments when rightly ordered.',
  },
  {
    layer: 'Pedagogical Layer',
    description: 'Knowledge transmission must be structured, progressive, and developmentally appropriate. The Framework offers a tiered curriculum architecture, from foundational literacy to advanced synthesis.',
  },
  {
    layer: 'Individual Layer',
    description: 'Personal transformation is the ground of collective renewal. The Framework provides structured pathways for individuals to move from information to understanding to integration.',
  },
];

export default function FoundersFrameworkPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Founder's Framework"
        title="The SSC Architecture"
        description="A structured model for harmonizing Faith and Science, Revelation and Reason, Character and Scholarship, designed by Dr. Fayaz Khan as the intellectual foundation of Sufi Science Center USA."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Origin Statement */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Origin of the Framework</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The Founder's Framework is the governing intellectual architecture of Sufi Science Center USA.
                It was conceived in response to a visible fracture in modern institutional and spiritual life:
                the separation of knowledge from character, and of scholarship from transformation.
              </p>
              <p className="text-[#F5F3EE]/80 italic border-l-2 border-[#C8A75E]/50 pl-5">
                Civilizations do not decline from lack of information. They decline from fragmentation of meaning.
              </p>
              <p>
                Dr. Fayaz Khan structured SSC USA as a long-term knowledge architecture, not a movement,
                not a personality platform, not a reaction against existing institutions. It is a constructive
                model designed for civilizational integration and institutional durability.
              </p>
            </div>
          </div>

          {/* Six Pillars */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">The Six Pillars</h2>
            <p className="text-[#AAB0D6] mb-8 leading-relaxed">
              The Framework rests upon six integrated pillars. Each pillar is both a domain of knowledge
              and a dimension of institutional activity. They are inseparable in practice.
            </p>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.number}
                    className="glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/40 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-[#C8A75E]/40 font-bold text-2xl leading-none flex-shrink-0">
                          {pillar.number}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-[#C8A75E]" />
                            <h3 className="text-[#F5F3EE] font-semibold">{pillar.title}</h3>
                          </div>
                          <p className="text-sm text-[#AAB0D6] leading-relaxed">{pillar.body}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-xs text-[#C8A75E]/70 italic">{pillar.principle}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Integration Layers */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-[#C8A75E]" />
              <h2 className="text-3xl font-bold text-[#F5F3EE]">Integration Layers</h2>
            </div>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-10">
              The Framework operates simultaneously across four levels of integration.
              Each layer reinforces the others, creating a coherent system rather than isolated programs.
            </p>
            <div className="space-y-4">
              {INTEGRATION_LAYERS.map((item, index) => (
                <div
                  key={item.layer}
                  className="flex gap-5 p-6 bg-[#080C1E] border border-white/6 rounded-xl hover:border-[#C8A75E]/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C8A75E]/10 border border-[#C8A75E]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#C8A75E] text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[#F5F3EE] font-semibold mb-2">{item.layer}</h3>
                    <p className="text-sm text-[#AAB0D6] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Principles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GitBranch className="w-6 h-6 text-[#C8A75E]" />
              <h2 className="text-3xl font-bold text-[#F5F3EE]">Design Principles</h2>
            </div>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-10">
              The Framework was built with specific guardrails: principles that define what it is not,
              as much as what it is.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DESIGN_PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="p-6 bg-[#C8A75E]/5 border border-[#C8A75E]/20 rounded-xl"
                >
                  <h3 className="text-[#C8A75E] font-semibold mb-3">{principle.title}</h3>
                  <p className="text-sm text-[#AAB0D6] leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Framework in Practice */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">The Framework in Practice</h2>
              <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
              <p className="text-[#AAB0D6] leading-relaxed mb-8">
                Every program, publication, and institutional structure at SSC USA maps directly to this
                Framework. The six pillars are not abstract ideals. They manifest as specific, operational
                outputs.
              </p>
              <div className="space-y-4">
                {[
                  { pillar: 'Foundational Studies', output: 'Saints Atlas, lineage documentation, and contemplative heritage mapping' },
                  { pillar: 'Knowledge Systems', output: 'Epistemology modules, architectural frameworks, and cross-tradition inquiry' },
                  { pillar: 'Inner Development', output: 'Stations of the Path curriculum, mentorship programs, and personal assessment tools' },
                  { pillar: 'Interfaith Coherence', output: 'Structured dialogue series, coherence modules, and interfaith research' },
                  { pillar: 'Media Expression', output: 'SufiPulse Studio USA, Sacred Kalam Library, and ethical digital content' },
                  { pillar: 'Institutional Ethics', output: 'Governance architecture, advisory council, and transparency frameworks' },
                ].map((item) => (
                  <div key={item.pillar} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[#F5F3EE] text-sm font-medium">{item.pillar}: </span>
                      <span className="text-[#AAB0D6] text-sm">{item.output}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Closing Statement */}
          <div className="text-center py-8">
            <div className="text-[#C8A75E] text-7xl leading-none font-serif mb-6 opacity-60">"</div>
            <blockquote className="max-w-3xl mx-auto space-y-4 text-[#F5F3EE]/90 text-lg md:text-xl leading-relaxed italic mb-10">
              <p>
                The future requires individuals capable of thinking scientifically,
                feeling spiritually, and acting ethically.
              </p>
              <p className="not-italic text-[#AAB0D6]">
                The Sufi Science Center USA exists to cultivate that alignment.
              </p>
            </blockquote>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E]/40 to-transparent mb-6 max-w-xs mx-auto" />
            <p className="text-[#C8A75E] font-semibold tracking-wide">— Dr. Fayaz Khan</p>
            <p className="text-[#AAB0D6] text-sm mt-1">Founder, Sufi Science Center USA</p>
          </div>

        </div>
      </section>
    </div>
  );
}
