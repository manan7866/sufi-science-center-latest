import { ObservatoryHero } from '@/components/observatory-hero';
import { GlassResearchCard } from '@/components/glass-research-card';
import { KnowledgeGrid } from '@/components/knowledge-grid';
import { Layers, Map, Brain, FlaskConical, BookText, Lightbulb } from 'lucide-react';

export default function KnowledgeSystemsPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Intellectual Backbone"
        title="Knowledge Systems"
        description="Structured framework for understanding how knowledge is defined, transmitted, absorbed, and implemented within contemplative traditions and consciousness research."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 xl:text-center lg:text-center md:text-center sm:text-center">
            <p className="text-lg text-[#AAB0D6] max-w-3xl mx-auto leading-relaxed">
              Knowledge Systems provides the theoretical foundation and developmental architecture
              for understanding consciousness refinement. This module integrates epistemology,
              psychology, and contemplative methodology with institutional rigor.
            </p>
          </div>

          <KnowledgeGrid>
            <GlassResearchCard
              icon={Layers}
              title="Architecture of Knowledge"
              description="Foundational framework defining how knowledge is structured, transmitted through multiple modes, absorbed developmentally, and implemented in daily life."
              href="/knowledge-systems/architecture"
              tag="Foundation"
            />

            <GlassResearchCard
              icon={Map}
              title="Stations of the Path"
              description="Developmental cartography mapping Maqāmāt, stages of stabilization, psychological integration, and behavioral markers of transformation."
              href="/knowledge-systems/stations"
              tag="Cartography"
            />

            <GlassResearchCard
              icon={Brain}
              title="Sufi Psychology"
              description="Consciousness research framework covering Nafs taxonomy, Qalb model, Rūḥ, ʿAql, and Latāʾif system in comparative psychological language."
              href="/knowledge-systems/psychology"
              tag="Research"
            />

            <GlassResearchCard
              icon={FlaskConical}
              title="Contemplative Practices"
              description="Structured methodologies including disciplined Dhikr, silent attention practices, breath regulation, and ethical calibrations with psychological functions."
              href="/knowledge-systems/practices"
              tag="Method"
            />

            <GlassResearchCard
              icon={BookText}
              title="Knowledge Bits"
              description="Micro-learning architecture featuring precise conceptual essays. Short-form knowledge units covering core concepts with practical implications."
              href="/knowledge-systems/bits"
              tag="Accessible"
            />

            <GlassResearchCard
              icon={Lightbulb}
              title="Epistemology & Method"
              description="Verification framework explaining how knowledge is validated, distinguishing inspiration from imagination, and establishing limits of subjective experience."
              href="/knowledge-systems/epistemology"
              tag="Academic"
            />
          </KnowledgeGrid>

          <div className="mt-20 glass-panel rounded-2xl p-12">
            <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-6 text-center">
              Institutional Clarity
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-red-900/30">
                <h3 className="text-lg font-semibold text-red-300 mb-3">Without Structure</h3>
                <p className="text-[#AAB0D6] text-sm mb-3">Knowledge becomes fragmented:</p>
                <ul className="space-y-2 text-[#AAB0D6] text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Mystical but ungrounded</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Inspirational but not applicable</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Emotional but unstable</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-emerald-900/30">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">With Structure</h3>
                <p className="text-[#AAB0D6] text-sm mb-3">Knowledge becomes integrated:</p>
                <ul className="space-y-2 text-[#AAB0D6] text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Developmental science</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Consciousness refinement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Applied ethical psychology</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-[#C8A75E] font-semibold text-lg">
                That distinction defines this Institute.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
