'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Leaf, Globe, Droplets, Wind, Sun } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';

const AREAS = [
  {
    icon: Globe,
    title: 'Khilafa (Stewardship) & Planetary Boundaries',
    established: 'The planetary boundaries framework (Rockstrom et al.) identifies nine Earth system thresholds — including climate change, biodiversity loss, and freshwater use — that define the safe operating space for human civilization. Several have been transgressed.',
    sufi: 'The Quranic concept of khalifa (2:30) — human beings as stewards or vicegerents of the Earth — places an explicit theological obligation of care. The Earth is not owned by humanity; it is held in trust. Destruction of what is held in trust is a violation of the covenant.',
    overlap: 'Both frameworks place human activity within a larger system whose integrity is not optional. Planetary boundaries define scientific thresholds; khalifa defines moral limits. The convergence is normative: both demand restraint, care, and accountability.',
    divergence: 'Planetary boundaries are empirical thresholds defined by Earth system science. Khalifa is a theological concept with metaphysical grounding. The former describes what is happening; the latter addresses why it matters and to whom the account is owed.',
    openQuestions: [
      'Can Islamic juridical frameworks (fiqh al-biah) be developed to address planetary-scale environmental obligations?',
      'How do traditional stewardship practices in Muslim-majority agricultural societies compare to contemporary regenerative agriculture?',
    ],
  },
  {
    icon: Droplets,
    title: 'Earth Resonance & Sacred Geography',
    established: 'The Schumann resonances — extremely low frequency electromagnetic resonances in the Earth-ionosphere cavity — are real and measurable. Their relationship to biological systems and human consciousness is an active but contested area of research.',
    sufi: 'Islamic tradition has always recognized sacred geography — certain lands carry baraka (blessing) through the events and presences that have shaped them. Mecca, Medina, Jerusalem are not merely symbolic locations but places where the veil between worlds is considered thinner.',
    overlap: 'Both traditions recognize that place is not homogeneous — that certain locations carry distinctive qualities. The scientific interest in geomagnetic anomalies and their effects on biological systems provides a naturalistic exploration of differential place-quality.',
    divergence: 'Baraka is not an electromagnetic phenomenon. Sacred geography is a theological and historical category. The claim that geomagnetic resonance validates the baraka of sacred sites is a category error that trivializes the theological claim.',
    openQuestions: [
      'What are the phenomenological features that make a place feel spiritually significant, and can these be studied systematically?',
      'How should Muslim communities engage with environmental degradation of historically sacred landscapes?',
    ],
  },
  {
    icon: Leaf,
    title: 'Regenerative Wisdom & Islamic Agricultural Tradition',
    established: 'Regenerative agriculture — practices that restore soil carbon, enhance biodiversity, and build ecosystem resilience — is an emerging evidence-based framework now supported by substantial agronomic and ecological research.',
    sufi: 'Classical Islamic agricultural jurisprudence (fiqh al-zira\'a) contains detailed rules prohibiting waste (israf), requiring revival of dead land (ihya\' al-mawat), and mandating care for animals and waterways. The concept of hima — protected ecological reserves — preceded modern conservation frameworks by over a millennium.',
    overlap: 'Islamic agricultural practice at its best embodied what regenerative agriculture now empirically supports: soil stewardship, water conservation, biodiversity protection, and limits on extraction. The traditional practices were not merely culturally contingent but ecologically functional.',
    divergence: 'Traditional Islamic agricultural practice was developed for specific climates and scales. Its principles are potentially generalizable; specific practices require adaptation to contemporary ecological conditions and scales of operation.',
    openQuestions: [
      'Can hima (protected reserve) be operationalized as a model for contemporary conservation at national or regional scales?',
      'What is lost and what is gained when traditional ecological knowledge is translated into the language of ecosystem services?',
    ],
  },
  {
    icon: Wind,
    title: 'Biodiversity & the Diversity of Divine Signs',
    established: 'Biodiversity science has established that ecosystem function, resilience, and productivity depend on species diversity. The current extinction rate — estimated at 100-1000 times background — represents a fundamental disruption of evolutionary heritage.',
    sufi: 'The Quran repeatedly calls the diversity of creation among the ayat (signs) of God: "Among His signs is the creation of the heavens and the earth, and the differences of your languages and your colors" (30:22). Diversity is not incidental but constitutive of creation\'s purpose as testimony.',
    overlap: 'Both frameworks treat diversity not as mere variety but as functional — carrying meaning and serving a purpose larger than individual elements. The ecological function of biodiversity and the theological function of creation\'s diversity as divine sign are structurally parallel.',
    divergence: 'Ecological function and divine testimony operate at different levels of description. The extinction crisis is an empirical catastrophe; its theological gravity compounds, but does not replace, the empirical account.',
    openQuestions: [
      'Does framing biodiversity loss as the destruction of divine signs motivate stronger ecological action than utilitarian framings?',
      'How should Islamic theology respond to the prospect of extinctions caused by anthropogenic activity — what is the theological account of responsibility?',
    ],
  },
  {
    icon: Sun,
    title: 'Climate Responsibility & Akhira Accountability',
    established: 'Climate change attribution science has established that current warming is primarily caused by human greenhouse gas emissions. Projected impacts — including displacement, extreme weather, and sea-level rise — fall disproportionately on populations least responsible for emissions.',
    sufi: 'The concept of akhira (the hereafter) in Islamic theology includes accountability for all actions — including actions that cause harm to others, to future generations, and to the trust of stewardship. The believer is accountable not just for personal conduct but for participation in systems of harm.',
    overlap: 'Intergenerational justice — present generations imposing irreversible costs on future ones — is both an ethical argument in climate science and a natural implication of akhira accountability. The temporal extension of moral responsibility to future beings finds support in both frameworks.',
    divergence: 'Climate science provides empirical description and causal attribution. Islamic ethics provides normative grounding and motivational resources. Akhira accountability does not validate any specific climate policy; it does mandate taking the issue with moral seriousness.',
    openQuestions: [
      'What specific obligations does Islamic jurisprudence generate for Muslims in high-emission countries?',
      'Can the concept of intergenerational waqf (endowment) be extended to ecological systems?',
    ],
  },
];

function AreaCard({ area }: { area: typeof AREAS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = area.icon;

  return (
    <div className="border border-white/6 rounded-xl bg-white/[0.015] hover:border-white/10 transition-all duration-200">
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#D4A07B]/10 border border-[#D4A07B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 text-[#D4A07B]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F5F3EE] group-hover:text-[#D4A07B] transition-colors">
              {area.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#D4A07B]' : 'text-[#AAB0D6]/30'}`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-white/6 pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#7BAFD4]/5 border border-[#7BAFD4]/12">
              <p className="text-[10px] font-bold text-[#7BAFD4] uppercase tracking-widest mb-2">Established Science</p>
              <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.established}</p>
            </div>
            <div className="p-4 rounded-lg bg-[#C8A75E]/5 border border-[#C8A75E]/12">
              <p className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest mb-2">Islamic Framework</p>
              <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.sufi}</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#8BB89A]/5 border border-[#8BB89A]/12">
            <p className="text-[10px] font-bold text-[#8BB89A] uppercase tracking-widest mb-2">Normative Convergence</p>
            <p className="text-[12px] text-[#AAB0D6]/80 leading-relaxed">{area.overlap}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/6">
            <p className="text-[10px] font-bold text-[#AAB0D6]/50 uppercase tracking-widest mb-2">Where They Diverge</p>
            <p className="text-[12px] text-[#AAB0D6]/70 leading-relaxed">{area.divergence}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#D4A07B] uppercase tracking-widest mb-2">Open Research Questions</p>
            <ul className="space-y-1.5">
              {area.openQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4A07B] text-[7px] mt-1.5 flex-shrink-0">&#9632;</span>
                  <span className="text-[12px] text-[#AAB0D6]/75 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SacredEcologyPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <ObservatoryHero
        subtitle="Science & Sufism — Exploratory Domains"
        title="Sacred Ecology & Planetary Systems"
        description="Environmental science in dialogue with Islamic frameworks of stewardship — examining the ecological obligations of khalifa, planetary limits, and the theology of creation's diversity."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-14">

          <ScrollReveal>
            <div className="p-6 border border-[#D4A07B]/15 rounded-xl bg-[#D4A07B]/5">
              <p className="text-[13px] text-[#AAB0D6]/80 leading-relaxed">
                Environmental science is engaged here as <strong className="text-[#F5F3EE]">established knowledge</strong>. Islamic ecological thought is presented as a <strong className="text-[#F5F3EE]">normative framework for responsibility</strong> — not as a competing scientific model. The convergence is ethical and motivational, not empirical.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              {AREAS.map((area) => (
                <AreaCard key={area.title} area={area} />
              ))}
            </div>
          </ScrollReveal>

          <div className="pt-8 border-t border-white/6">
            <div className="flex items-center gap-2 text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-6">
              <Link href="/knowledge-systems" className="hover:text-[#AAB0D6]/70 transition-colors">Knowledge Systems</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/knowledge-systems/science-sufism" className="hover:text-[#AAB0D6]/70 transition-colors">Science & Sufism</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#AAB0D6]/70">Sacred Ecology</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-systems/science-sufism/systems-energetics"
                className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                Previous: Systems & Energetics
              </Link>
              <Link
                href="/knowledge-systems/science-sufism/knowledge-transmission"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Next: Knowledge Transmission
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
