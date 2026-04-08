'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { DISCIPLINE_CATEGORIES, getAllDisciplines } from '@/lib/nextgen-disciplines';
import {
  ArrowRight, Search, ChevronRight, BookOpen, Users, Layers,
  Microscope, Globe, Scale, Lightbulb, BrainCircuit, Briefcase,
  FlaskConical, Leaf,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'pure-sciences': FlaskConical,
  'health-sciences': Microscope,
  'engineering': BrainCircuit,
  'environmental': Leaf,
  'social-sciences': Globe,
  'law-governance': Scale,
  'humanities': BookOpen,
  'business-leadership': Briefcase,
  'interdisciplinary': Lightbulb,
};

const STAT_ITEMS = [
  { value: '9', label: 'Academic Domains' },
  { value: '60+', label: 'Disciplines' },
  { value: '3', label: 'Membership Tiers' },
  { value: '1', label: 'Integrated Framework' },
];

function DisciplineCard({ slug, title, category, description }: {
  slug: string; title: string; category: string; description: string;
}) {
  return (
    <Link href={`/nextgen-sufi-seeker/${slug}`}>
      <div className="group flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/1 hover:bg-[#C8A75E]/5 hover:border-[#C8A75E]/20 transition-all cursor-pointer">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]/40 mt-2 flex-shrink-0 group-hover:bg-[#C8A75E] transition-colors" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors leading-snug">{title}</p>
          <p className="text-[11px] text-[#AAB0D6]/40 mt-0.5 line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-[#AAB0D6]/20 group-hover:text-[#C8A75E] flex-shrink-0 mt-0.5 transition-all group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export default function NextGenSufiSeekerPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allDisciplines = useMemo(() => getAllDisciplines(), []);

  const filteredCategories = useMemo(() => {
    if (!search && !activeCategory) return DISCIPLINE_CATEGORIES;
    return DISCIPLINE_CATEGORIES
      .filter((cat) => !activeCategory || cat.slug === activeCategory)
      .map((cat) => ({
        ...cat,
        disciplines: cat.disciplines.filter((d) =>
          !search ||
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.category.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((cat) => cat.disciplines.length > 0);
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0B0F2A]">

      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C8A75E]/3 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6B9BD1]/3 blur-3xl" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_79px,rgba(255,255,255,0.015)_79px,rgba(255,255,255,0.015)_80px),repeating-linear-gradient(90deg,transparent,transparent_79px,rgba(255,255,255,0.015)_79px,rgba(255,255,255,0.015)_80px)]" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-[#C8A75E]/60" />
            <p className="text-xs tracking-[0.25em] text-[#C8A75E]/70 uppercase font-medium">Sufi Science Center</p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F5F3EE] leading-[1.05] mb-6 max-w-4xl">
            NextGEN Sufi Seeker
            <span className="block text-[#C8A75E]">Platform</span>
          </h1>

          <p className="text-lg md:text-xl text-[#AAB0D6] font-light tracking-wide mb-5 max-w-2xl leading-relaxed">
            Professional excellence integrated with disciplined spiritual inquiry.
          </p>

          <p className="text-[#AAB0D6]/70 max-w-2xl leading-relaxed mb-10 text-sm md:text-base">
            The NextGEN Sufi Seeker Platform invites professionals across scientific, technical, and social disciplines
            to engage Sufi metaphysics, ethical reasoning, and consciousness studies within the framework of their
            professional expertise. This is structured integration — not abstraction.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#disciplines">
              <button className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#0B0F2A] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#C8A75E]/90 transition-all text-sm">
                Explore Your Discipline
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
            <Link href="/portal">
              <button className="inline-flex items-center gap-2 border border-[#C8A75E]/30 text-[#C8A75E] font-medium px-7 py-3.5 rounded-xl hover:bg-[#C8A75E]/8 transition-all text-sm">
                <Users className="w-4 h-4" />
                Join the Platform
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/1 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STAT_ITEMS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-serif font-bold text-[#C8A75E]">{s.value}</p>
              <p className="text-xs text-[#AAB0D6]/50 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-[#0A0C18]/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Layers,
                title: 'Structured Integration',
                body: 'Each discipline pathway maps Sufi intellectual tradition onto the specific ethical tensions, methodological questions, and professional obligations of your field.',
              },
              {
                icon: BookOpen,
                title: 'Grounded in Scholarship',
                body: 'Engagement is rooted in classical Islamic philosophy, jurisprudence, and contemplative science — not popular spirituality or reductive metaphor.',
              },
              {
                icon: Users,
                title: 'Professional Community',
                body: 'Discipline circles connect practitioners across institutions who are working through the same questions from within a shared intellectual framework.',
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-6 rounded-2xl border border-white/5 bg-white/1">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#C8A75E]" />
                  </div>
                  <h3 className="text-base font-serif font-semibold text-[#F5F3EE] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#AAB0D6] leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { role: 'Member', description: 'Join a discipline circle. Save your pathway. Access structured engagement resources.', accent: '#AAB0D6' },
              { role: 'Scholar', description: 'Contribute short essays and analytical responses within your discipline channel.', accent: '#C8A75E' },
              { role: 'Fellow', description: 'Lead discipline dialogues and shape the intellectual agenda for your professional community.', accent: '#6B9BD1' },
            ].map((tier) => (
              <div
                key={tier.role}
                className="p-5 rounded-xl border border-white/5 bg-white/1"
                style={{ borderColor: `${tier.accent}20` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold tracking-wider uppercase border"
                    style={{ color: tier.accent, borderColor: `${tier.accent}40`, background: `${tier.accent}10` }}
                  >
                    {tier.role}
                  </span>
                </div>
                <p className="text-xs text-[#AAB0D6] leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="disciplines" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#C8A75E]/40" />
            <p className="text-xs tracking-[0.2em] text-[#C8A75E]/60 uppercase">Discipline Framework</p>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-3">Select Your Domain</h2>
          <p className="text-[#AAB0D6] text-sm mb-8 max-w-xl leading-relaxed">
            {allDisciplines.length} disciplines across {DISCIPLINE_CATEGORIES.length} domains. Each pathway is structured for professional engagement, not general interest.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0D1020] border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F5F3EE] placeholder-[#AAB0D6]/30 focus:outline-none focus:border-[#C8A75E]/40"
                placeholder="Search disciplines..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                !activeCategory
                  ? 'border-[#C8A75E] bg-[#C8A75E]/10 text-[#C8A75E]'
                  : 'border-white/8 text-[#AAB0D6]/50 hover:border-white/20 hover:text-[#AAB0D6]'
              }`}
            >
              All Domains
            </button>
            {DISCIPLINE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || BookOpen;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug === activeCategory ? null : cat.slug)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                    activeCategory === cat.slug
                      ? 'border-[#C8A75E] bg-[#C8A75E]/10 text-[#C8A75E]'
                      : 'border-white/8 text-[#AAB0D6]/50 hover:border-white/20 hover:text-[#AAB0D6]'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-10">
            {filteredCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || BookOpen;
              return (
                <div key={cat.slug}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A75E]/8 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#C8A75E]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F3EE] uppercase tracking-wider">{cat.label}</h3>
                      <p className="text-[10px] text-[#AAB0D6]/30">{cat.disciplines.length} disciplines</p>
                    </div>
                    <div className="flex-1 h-px bg-white/4 ml-2" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {cat.disciplines.map((d) => (
                      <DisciplineCard
                        key={d.slug}
                        slug={d.slug}
                        title={d.title}
                        category={d.category}
                        description={d.description}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12 text-[#AAB0D6]/30 text-sm">
                No disciplines found for &ldquo;{search}&rdquo;.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] text-[#C8A75E]/50 uppercase mb-3">Strategic Objective</p>
          <blockquote className="text-xl md:text-2xl font-serif text-[#F5F3EE] leading-relaxed mb-6">
            &ldquo;Sufi thought engages professionals where they work.
            <span className="text-[#C8A75E]"> Not outside it. Not against it. Within it.</span>&rdquo;
          </blockquote>
          <p className="text-sm text-[#AAB0D6] leading-relaxed max-w-lg mx-auto mb-8">
            The integration of inner development with professional life is not supplementary. It is the central project
            of the NextGEN Sufi Seeker Platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/portal">
              <button className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#0B0F2A] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#C8A75E]/90 transition-all text-sm">
                Join the Platform
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/assessment">
              <button className="inline-flex items-center gap-2 border border-white/10 text-[#AAB0D6] font-medium px-7 py-3.5 rounded-xl hover:bg-white/4 transition-all text-sm">
                Take the Assessment
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
