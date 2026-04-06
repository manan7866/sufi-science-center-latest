import Link from 'next/link';
import { FlaskConical, Building2, FileText, Users, BookOpen, Award, ArrowRight, ExternalLink } from 'lucide-react';

const metrics = [
  { value: '12+', label: 'Active Projects' },
  { value: '40+', label: 'Published Papers' },
  { value: '30+', label: 'Collaborating Scholars' },
  { value: '15+', label: 'Partner Institutions' },
];

const frameworks = [
  {
    title: 'Epistemology & Methodology',
    description: 'Scientific and philosophical inquiry into the nature of knowledge, evidence, and contemplative verification across traditions.',
  },
  {
    title: 'Contemplative Science',
    description: 'Systematic study of consciousness, meditation, transformation, and measurable dimensions of inner development.',
  },
  {
    title: 'Civilizational Knowledge Systems',
    description: 'Comparative and integrative study of wisdom traditions across cultures, historical epochs, and disciplinary boundaries.',
  },
];

const outputCards = [
  {
    icon: FlaskConical,
    title: 'Research Papers',
    description: 'Original peer-reviewed publications exploring consciousness studies, contemplative practices, and epistemological frameworks.',
    href: '/research/papers',
    tag: 'Academic',
  },
  {
    icon: FileText,
    title: 'White Papers',
    description: 'In-depth analyses and position papers on key questions in consciousness research and contemplative science.',
    href: '/research/white-papers',
    tag: 'Conceptual',
  },
  {
    icon: BookOpen,
    title: 'Publications',
    description: 'Books, articles, and broader scholarly contributions by the research community of the Sufi Science Center.',
    href: '/research/publications',
    tag: 'Scholarly',
  },
];

const structureCards = [
  {
    icon: Building2,
    title: 'Institute Projects',
    description: 'Ongoing research initiatives, collaborative studies, and institutional partnerships advancing the field.',
    href: '/research/projects',
    tag: 'Active',
  },
  {
    icon: Users,
    title: 'Research Team',
    description: 'Meet our scholars, researchers, and collaborators advancing interdisciplinary contemplative inquiry.',
    href: '/research/team',
    tag: 'People',
  },
  {
    icon: Award,
    title: 'Grants & Funding',
    description: 'Information on research grants, funding opportunities, and institutional support for scholarly work.',
    href: '/research/funding',
    tag: 'Infrastructure',
  },
];

function ResearchCard({
  icon: Icon,
  title,
  description,
  href,
  tag,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-[#2A2F4F]/40 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 p-7 hover:border-[#C8A75E]/25 transition-all duration-300 hover:shadow-[0_0_24px_0_rgba(200,167,94,0.05)] flex flex-col"
    >
      {tag && (
        <span className="absolute top-5 right-5 text-[9px] uppercase tracking-widest text-[#C8A75E]/50 border border-[#C8A75E]/20 rounded-full px-2.5 py-1 font-medium">
          {tag}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-5 flex-shrink-0">
        <Icon className="w-4.5 h-4.5 text-[#C8A75E]" />
      </div>
      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2.5 leading-snug">{title}</h3>
      <p className="text-sm text-[#AAB0D6]/65 leading-relaxed flex-1">{description}</p>
      <div className="mt-5 flex items-center gap-1.5 text-[#C8A75E]/60 group-hover:text-[#C8A75E] transition-colors">
        <span className="text-xs font-medium tracking-wide">Explore</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen observatory-gradient pt-20">

      <section className="px-4 pt-16 pb-14 border-b border-[#2A2F4F]/30">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A75E]/60 font-semibold mb-5">
            Academic Excellence
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
            Research
          </h1>
          <p className="text-base md:text-lg text-[#AAB0D6]/70 leading-relaxed max-w-3xl mx-auto">
            Advancing rigorous inquiry into consciousness, contemplative science, and civilizational knowledge systems through peer-reviewed scholarship, institutional projects, and interdisciplinary collaboration.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 border-b border-[#2A2F4F]/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl border border-[#C8A75E]/12 bg-gradient-to-br from-[#1a1b2e]/40 to-[#16213e]/40 overflow-hidden">
            {metrics.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center py-8 px-4 text-center ${i < metrics.length - 1 ? 'border-r border-[#2A2F4F]/40' : ''}`}
              >
                <span className="text-3xl font-light text-[#C8A75E] mb-1.5 tracking-tight">{value}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#AAB0D6]/45 font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 border-b border-[#2A2F4F]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-3">
              Research Architecture
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white leading-snug">
              Research Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {frameworks.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#2A2F4F]/35 bg-gradient-to-br from-[#1a1b2e]/50 to-[#16213e]/50 p-7"
              >
                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#C8A75E]/70 to-[#C8A75E]/20 mb-5" />
                <h3 className="text-sm font-semibold text-[#F5F3EE] mb-3 leading-snug">{title}</h3>
                <p className="text-sm text-[#AAB0D6]/60 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 border-b border-[#2A2F4F]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-3">
              Academic Output
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white leading-snug">
              Research Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {outputCards.map((card) => (
              <ResearchCard key={card.href} {...card} />
            ))}
          </div>

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-3">
              Institutional Structure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {structureCards.map((card) => (
              <ResearchCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#C8A75E]/15 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 px-10 md:px-14 py-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A75E]/60 font-semibold mb-4">
              Collaboration
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4 leading-snug">
              Engage With Our Research
            </h2>
            <p className="text-sm text-[#AAB0D6]/60 leading-relaxed max-w-xl mx-auto mb-8">
              We welcome scholars, practitioners, and institutions who share a commitment to rigorous, interdisciplinary inquiry into consciousness and contemplative knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/research/publications"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0A0B14] text-sm font-semibold transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Explore Publications
              </Link>
              <Link
                href="/contribute"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10 text-sm font-medium transition-colors"
              >
                Collaborate With Us
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
