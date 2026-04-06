'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getDisciplineBySlug, getCategoryBySlug, DISCIPLINE_CATEGORIES } from '@/lib/nextgen-disciplines';
import { usePortalSession } from '@/hooks/use-portal-session';
import { ArrowLeft, ChevronDown, ChevronUp, Users, BookOpen, ArrowRight, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Lightbulb, Layers, MessageSquare } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({ title, subtitle, icon: Icon, children, defaultOpen = false }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white/1 hover:bg-white/2 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-[#C8A75E]/8 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#C8A75E]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F5F3EE]">{title}</p>
            <p className="text-[11px] text-[#AAB0D6]/40">{subtitle}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#AAB0D6]/30 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#AAB0D6]/30 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 py-5 border-t border-white/5 bg-[#08091A]/60">
          {children}
        </div>
      )}
    </div>
  );
}

function RelatedDisciplineCard({ slug, title, category }: { slug: string; title: string; category: string }) {
  return (
    <Link href={`/nextgen-sufi-seeker/${slug}`}>
      <div className="group p-4 rounded-xl border border-white/5 bg-white/1 hover:border-[#C8A75E]/20 hover:bg-[#C8A75E]/3 transition-all">
        <p className="text-sm font-semibold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors mb-1">{title}</p>
        <p className="text-[10px] text-[#AAB0D6]/40">{category}</p>
        <div className="flex items-center gap-1 mt-2 text-[10px] text-[#AAB0D6]/25 group-hover:text-[#C8A75E]/60 transition-colors">
          Explore <ArrowRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </Link>
  );
}

export default function DisciplinePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const discipline = getDisciplineBySlug(slug);

  const { session } = usePortalSession();

  if (!discipline) {
    notFound();
  }

  const category = getCategoryBySlug(discipline.categorySlug);
  const related = category?.disciplines.filter((d) => d.slug !== slug).slice(0, 3) ?? [];

  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="border-b border-white/5 bg-[#0A0C18]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/nextgen-sufi-seeker"
            className="flex items-center gap-2 text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Disciplines
          </Link>
          <div className="hidden sm:block">
            <p className="text-[10px] text-[#AAB0D6]/30 uppercase tracking-widest text-right">{discipline.category}</p>
            <p className="text-sm font-serif font-semibold text-[#F5F3EE] text-right">{discipline.title}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] tracking-[0.2em] text-[#C8A75E]/60 uppercase border border-[#C8A75E]/20 rounded-full px-3 py-0.5 bg-[#C8A75E]/5">
                  {discipline.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
                {discipline.title}
              </h1>
              <p className="text-[#AAB0D6] leading-relaxed text-base">
                {discipline.description}
              </p>
            </div>

            <div className="space-y-3">
              <AccordionSection
                title="Discipline Overview"
                subtitle="Professional context and scope"
                icon={BookOpen}
                defaultOpen={true}
              >
                <p className="text-sm text-[#AAB0D6] leading-relaxed">{discipline.description}</p>
              </AccordionSection>

              <AccordionSection
                title="Core Ethical Tensions"
                subtitle="Unresolved moral challenges within this field"
                icon={AlertTriangle}
                defaultOpen={true}
              >
                <p className="text-sm text-[#AAB0D6] leading-relaxed">{discipline.ethicalTensions}</p>
              </AccordionSection>

              <AccordionSection
                title="Sufi Intellectual Lens"
                subtitle="How classical metaphysics engages these tensions"
                icon={Layers}
                defaultOpen={true}
              >
                <p className="text-sm text-[#AAB0D6] leading-relaxed">{discipline.sufiLens}</p>
              </AccordionSection>

              <AccordionSection
                title="Applied Reflection"
                subtitle="Structured prompts for professional integration"
                icon={Lightbulb}
              >
                <div className="space-y-4">
                  {discipline.reflectionPrompts.map((prompt, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full border border-[#C8A75E]/30 bg-[#C8A75E]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-[#C8A75E]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-[#AAB0D6] leading-relaxed italic">{prompt}</p>
                    </div>
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection
                title="Professional Dialogue Circle"
                subtitle="Join practitioners in your discipline"
                icon={MessageSquare}
              >
                <div className="space-y-4">
                  <p className="text-sm text-[#AAB0D6] leading-relaxed">
                    The {discipline.title} dialogue circle brings together professionals from institutional, academic,
                    and independent contexts to engage the questions raised in this pathway through structured conversation,
                    short analytical essays, and peer reflection.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Member', desc: 'Join the circle and access resources.' },
                      { label: 'Scholar', desc: 'Contribute written analytical responses.' },
                      { label: 'Fellow', desc: 'Lead dialogue sessions and set the agenda.' },
                    ].map((tier) => (
                      <div key={tier.label} className="p-3 rounded-lg bg-white/2 border border-white/5">
                        <p className="text-xs font-semibold text-[#C8A75E] mb-1">{tier.label}</p>
                        <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-panel border border-white/8 rounded-2xl p-6 sticky top-20">
              <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest mb-1">Discipline Circle</p>
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">{discipline.title}</h2>
              <p className="text-xs text-[#AAB0D6]/60 leading-relaxed mb-5">
                Join this discipline pathway to save your progress, access structured resources, and connect with peers.
              </p>

              <div className="space-y-2">
                <Link href="/portal">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#C8A75E] text-[#0B0F2A] font-semibold py-3 rounded-xl hover:bg-[#C8A75E]/90 transition-all text-sm">
                    <Users className="w-4 h-4" />
                    Join the Platform
                  </button>
                </Link>
                <p className="text-[10px] text-[#AAB0D6]/30 text-center">Portal account required to save progress</p>
              </div>

              <div className="border-t border-white/5 mt-5 pt-5 space-y-2.5">
                <p className="text-[10px] text-[#AAB0D6]/30 uppercase tracking-widest mb-3">In This Pathway</p>
                {['Discipline Overview', 'Ethical Tensions', 'Sufi Intellectual Lens', 'Applied Reflection', 'Dialogue Circle'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#AAB0D6]/50">
                    <div className="w-1 h-1 rounded-full bg-[#C8A75E]/30" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-3">Related Disciplines</p>
                <div className="space-y-2">
                  {related.map((d) => (
                    <RelatedDisciplineCard key={d.slug} slug={d.slug} title={d.title} category={d.category} />
                  ))}
                </div>
                <Link href="/nextgen-sufi-seeker">
                  <p className="text-xs text-[#C8A75E]/50 hover:text-[#C8A75E] transition-colors mt-3 text-center">
                    View all disciplines
                  </p>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      <section className="border-t border-white/5 py-12 px-4 mt-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#AAB0D6]/30 uppercase tracking-widest mb-4">All Discipline Domains</p>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINE_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/nextgen-sufi-seeker#disciplines`}>
                <span className="text-[11px] px-3 py-1 rounded-full border border-white/5 text-[#AAB0D6]/40 hover:border-[#C8A75E]/20 hover:text-[#C8A75E] transition-colors cursor-pointer">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
