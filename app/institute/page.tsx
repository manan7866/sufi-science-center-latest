import { ObservatoryHero } from '@/components/observatory-hero';
import { GlassResearchCard } from '@/components/glass-research-card';
import { KnowledgeGrid } from '@/components/knowledge-grid';
import {
  Compass,
  Brain,
  Target,
  Sparkles,
  Globe2,
  Users,
  BookOpen,
  Calendar,
  Building2
} from 'lucide-react';

export default function InstitutePage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Research Civilization Node"
        title="About the Institute"
        description="A bridge between scientific inquiry and Sufi inner transformation, positioning consciousness research within its civilizational context."
      />

      <section className="py-24 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Our Identity</h2>
            <p className="text-[#AAB0D6] text-lg leading-relaxed mb-6">
              The Sufi Science Center operates as an intellectual and research initiative of
              <span className="text-[#C8A75E] font-semibold"> Dr. Kumar Foundation USA</span>, dedicated to
              advancing structured inquiry into consciousness, transformation, and the integration of
              Sufi wisdom with contemporary scientific methodologies.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              Rooted in the Kashmiri Sufi intellectual tradition, our work extends across South Asia,
              Central Asia, the Middle East, and Africa, positioning consciousness research within its
              proper civilizational and historical context.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed">
              We combine empirical research rigor with contemplative depth, creating frameworks for
              investigating consciousness that honor both scientific precision and spiritual insight.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4 text-center">
              Institute Structure
            </h2>
            <p className="text-[#AAB0D6] text-center mb-12 max-w-3xl mx-auto">
              Explore our heritage, intellectual framework, research direction, methodologies,
              and global positioning
            </p>

            <KnowledgeGrid>
              <GlassResearchCard
                icon={Compass}
                title="Heritage and Intellectual Lineage"
                description="Kashmiri Sufi civilization roots, global transmission routes, and contemporary reinterpretation."
                href="/institute/heritage"
              />
              <GlassResearchCard
                icon={Brain}
                title="Founder's Framework"
                description="Intellectual biography, conceptual model, and philosophical positioning guiding our research."
                href="/institute/founder"
              />
              <GlassResearchCard
                icon={Target}
                title="Purpose and Research Direction"
                description="Consciousness research goals, inner development model, and multi-disciplinary approach."
                href="/institute/purpose"
              />
              <GlassResearchCard
                icon={Sparkles}
                title="Applied Work and Methodologies"
                description="Inner development programs, research projects, assessment frameworks, and practice-to-research pipeline."
                href="/institute/methodologies"
              />
              <GlassResearchCard
                icon={Globe2}
                title="Global Sufi Networks"
                description="Regional focus areas across Kashmir, South Asia, Central Asia, Middle East, and Africa."
                href="/institute/networks"
              />
              <GlassResearchCard
                icon={Building2}
                title="Institutional Affiliation"
                description="Governance structure, sponsorship model, and independence statement."
                href="/institute/affiliation"
              />
            </KnowledgeGrid>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-12 text-center">
              Engagement and Community
            </h2>
            <KnowledgeGrid>
              <GlassResearchCard
                icon={Users}
                title="Volunteer Opportunities"
                description="Contribute your skills to research, documentation, dialogue, and knowledge infrastructure."
                href="/institute/volunteer"
              />
              <GlassResearchCard
                icon={BookOpen}
                title="Institutional Collaborations"
                description="Academic partnerships, joint research projects, and structured institutional engagement."
                href="/institute/collaborations"
              />
              <GlassResearchCard
                icon={Calendar}
                title="Events and Dialogues"
                description="Upcoming lectures, symposia, workshops, and scholarly conversations."
                href="/dialogues"
              />
            </KnowledgeGrid>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12 xl:text-center lg:text-center md:text-center sm:text-center">
            <h3 className="text-2xl font-bold text-[#F5F3EE] mb-4">
              Positioning Statement
            </h3>
            <p className="text-[#AAB0D6] leading-relaxed max-w-4xl mx-auto">
              We position ourselves not as a spiritual organization, nor as a conventional academic
              institution, but as a <span className="text-[#C8A75E] font-semibold">research civilization node</span>, a
              structured inquiry platform that integrates historical continuity, intellectual rigor,
              and transformative practice. Our work honors the depth of Sufi wisdom while maintaining
              contemporary research standards and scholarly independence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
