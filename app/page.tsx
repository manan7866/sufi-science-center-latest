import { ObservatoryHero } from '@/components/observatory-hero';
import { GlassResearchCard } from '@/components/glass-research-card';
import { KnowledgeGrid } from '@/components/knowledge-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Microscope,
  BookOpen,
  Brain,
  ClipboardCheck,
  MessageSquare,
  FlaskConical,
  Building2,
  ArrowRight,
  Sparkles,
  Target,
  Network
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Consciousness Research Institute"
        title="Sufi Science Center"
        description="A harmony of advanced scientific knowledge and Sufi inner peace. Explore the intersection of consciousness research, knowledge systems, and transformative inner development."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="xl:text-center lg:text-center md:text-center sm:text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mb-4">
              Dual Axis of Transformation
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl mx-auto leading-relaxed">
              We bridge rigorous scientific methodology with contemplative wisdom,
              creating a unique framework for understanding consciousness and human potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="glass-panel rounded-2xl p-8 border-l-4 border-[#C8A75E]">
              <Microscope className="w-12 h-12 text-[#C8A75E] mb-4" />
              <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-4">
                Advanced Scientific Knowledge
              </h3>
              <p className="text-[#AAB0D6] leading-relaxed">
                Grounded in empirical research, cognitive science, and systematic inquiry.
                We employ rigorous methodologies to investigate consciousness, epistemology,
                and the nature of knowledge itself.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border-l-4 border-[#C8A75E]">
              <Sparkles className="w-12 h-12 text-[#C8A75E] mb-4" />
              <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-4">
                Sufi Inner Peace
              </h3>
              <p className="text-[#AAB0D6] leading-relaxed">
                Drawing from centuries of contemplative wisdom and transformative practices.
                We integrate the profound insights of Sufi traditions with modern understanding
                of consciousness and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Foundations
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Essential principles that form the bedrock of our approach to consciousness
              research and inner development.
            </p>
          </div>

          <KnowledgeGrid>
            <GlassResearchCard
              icon={BookOpen}
              title="Epistemology"
              description="Explore the nature of knowledge, belief, and justification through both Western philosophical traditions and Sufi wisdom."
              href="/knowledge-systems/epistemology"
              tag="Core"
            />
            <GlassResearchCard
              icon={Brain}
              title="Consciousness Studies"
              description="Investigate the fundamental nature of awareness, perception, and subjective experience."
              href="/knowledge-systems/consciousness-systems"
              tag="Core"
            />
            <GlassResearchCard
              icon={Target}
              title="Transformation Theory"
              description="Understand the mechanisms and stages of profound personal and spiritual transformation."
              href="/inner-development/stages"
              tag="Core"
            />
          </KnowledgeGrid>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Knowledge Systems
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Navigate an interconnected atlas of wisdom traditions, teaching lineages,
              and the evolution of contemplative knowledge.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Network className="w-16 h-16 text-[#C8A75E] mb-6" />
                <h3 className="text-3xl font-semibold text-[#F5F3EE] mb-4">
                  Interactive Atlas
                </h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-6">
                  Explore relationships between saints, scholars, and wisdom traditions
                  across time and space. Filter by era, region, or teaching lineage.
                </p>
                <Link href="/foundations/masters-of-the-path">
                  <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                    Launch Atlas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-[#C8A75E] mb-2">150+</p>
                  <p className="text-sm text-[#AAB0D6]">Saints and Scholars</p>
                </div>
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-[#C8A75E] mb-2">12</p>
                  <p className="text-sm text-[#AAB0D6]">Centuries</p>
                </div>
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-[#C8A75E] mb-2">30+</p>
                  <p className="text-sm text-[#AAB0D6]">Lineages</p>
                </div>
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-[#C8A75E] mb-2">500+</p>
                  <p className="text-sm text-[#AAB0D6]">Teachings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-[#1C1F4A]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Practice
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Inner Development
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Structured pathways for personal transformation, integrating contemplative
              practices with modern psychological understanding.
            </p>
          </div>

          <KnowledgeGrid columns={2}>
            <GlassResearchCard
              icon={Brain}
              title="Consciousness Practices"
              description="Guided meditation, contemplation, and awareness training methods developed over centuries and validated by modern research."
              href="/inner-development/practices"
            />
            <GlassResearchCard
              icon={Target}
              title="Transformation Stages"
              description="Understand your journey through documented stages of spiritual and psychological development."
              href="/inner-development/stages"
            />
          </KnowledgeGrid>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Evaluate
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Assessment
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Personalized evaluation tools to understand your current state and
              receive tailored guidance for your journey.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <ClipboardCheck className="w-16 h-16 text-[#C8A75E] mb-6" />
            <h3 className="text-3xl font-semibold text-[#F5F3EE] mb-4">
              Multi-Dimensional Assessment
            </h3>
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              A comprehensive evaluation covering cognitive patterns, emotional intelligence,
              contemplative capacity, and transformative readiness. Receive a personalized
              roadmap for your development journey.
            </p>
            <Link href="/assessment">
              <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                Begin Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Learn
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Dialogues
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Curated conversations exploring consciousness, transformation, and the
              integration of wisdom traditions with contemporary understanding.
            </p>
          </div>

          <KnowledgeGrid>
            <GlassResearchCard
              icon={MessageSquare}
              title="Featured Dialogues"
              description="In-depth conversations with scholars, practitioners, and researchers at the intersection of science and spirituality."
              href="/dialogues"
            />
            <GlassResearchCard
              icon={BookOpen}
              title="Dialogue Series"
              description="Searchable archive of dialogue series with thematic organization and cross-references."
              href="/dialogues/series"
            />
            <GlassResearchCard
              icon={Network}
              title="Hard Inquiry Sessions"
              description="Navigate dialogues by key themes, concepts, and interconnected ideas across conversations."
              href="/dialogues/hard-inquiry"
            />
          </KnowledgeGrid>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#C8A75E] text-sm font-mono uppercase tracking-widest">
              Investigate
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mt-4 mb-4">
              Research
            </h2>
            <p className="text-xl text-[#AAB0D6] max-w-3xl">
              Peer-reviewed research and scholarly publications advancing our understanding
              of consciousness, contemplative science, and transformative knowledge.
            </p>
          </div>

          <KnowledgeGrid columns={2}>
            <GlassResearchCard
              icon={FlaskConical}
              title="Research Papers"
              description="Original research publications exploring consciousness studies, contemplative practices, and epistemological frameworks."
              href="/research/papers"
              tag="Academic"
            />
            <GlassResearchCard
              icon={Building2}
              title="Institute Projects"
              description="Ongoing research initiatives, collaborative studies, and institutional partnerships."
              href="/research/projects"
              tag="Active"
            />
          </KnowledgeGrid>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-[#1C1F4A]/30 to-[#0B0F2A]">
        <div className="max-w-4xl mx-auto xl:text-center lg:text-center md:text-center sm:text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#F5F3EE] mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-[#AAB0D6] mb-12 leading-relaxed">
            Join a community dedicated to the rigorous exploration of consciousness
            and the cultivation of profound inner transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment/take">
              <Button size="lg" className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/foundations/masters-of-the-path">
              <Button size="lg" variant="outline" className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E]/10">
                Explore Atlas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
