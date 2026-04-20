'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ArrowRight, BarChart3, Compass, CheckCircle2,
  Circle, ChevronDown, ArrowUpRight,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

const ASSESSMENT_DIMENSIONS = [
  {
    id: 'personal-alignment',
    color: '#C8A75E',
    title: 'Personal Alignment',
    description: 'The degree to which your internal state, expressed values, and actual behaviors form a coherent, integrated whole.',
    indicators: [
      
      { label: 'Value-action coherence', question: 'Do you act consistently with what you say you value, including when it is costly to do so?' },
      { label: 'Motivation transparency', question: 'Can you honestly identify and articulate your actual motivations in professional decisions — not your stated ones?' },
      { label: 'Ego-awareness', question: 'Can you identify when ego inflation, defensiveness, or attachment to outcome is distorting your judgment?' },
      { label: 'Inner development practice', question: 'Do you have a systematic inner practice that supports self-examination and correction?' },
      { label: 'Error acknowledgment', question: 'When you are wrong, do you acknowledge it promptly and without minimization?' },
    ],

    sufiDimension: 'This dimension maps to the Sufi stages of Nafs: from Nafs al-Ammara (the commanding, unexamined self) toward Nafs al-Lawwama (the self capable of moral scrutiny) and Nafs al-Mutmainna (the integrated, principled self).',
  },
  {
    id: 'professional-integrity',
    color: '#7BAFD4',
    title: 'Professional Integrity',
    description: 'The consistency of your ethical conduct across professional roles — including when accountability is absent or costly.',
    indicators: [
      { label: 'Stakeholder consideration', question: 'Do your professional decisions account for the interests of all materially affected parties, not only those with formal authority over you?' },
      { label: 'Transparency in authority', question: 'Do you explain your reasoning to those affected by your decisions?' },
      { label: 'Power differential awareness', question: 'Are you proactively protective of those over whom you hold authority?' },
      { label: 'Conflict disclosure', question: 'Do you disclose conflicts of interest proactively, before being required to?' },
      { label: 'Long-term accountability', question: 'Do your decisions account for consequences extending beyond immediate institutional evaluation cycles?' },
    ],
    sufiDimension: 'This dimension maps to the Sufi concept of Amanah — professional role as a trust held on behalf of those affected by it. Integrity is the measure of how faithfully the trust is honored.',
  },
  {
    id: 'institutional-maturity',
    color: '#8BB89A',
    title: 'Institutional Maturity',
    description: 'The degree to which your institution has embedded ethics into its governance structure rather than relying on individual discretion.',
    indicators: [
      { label: 'Accountability structures', question: 'Does the institution have accountability mechanisms that function independently of leader preference?' },
      { label: 'Transparency infrastructure', question: 'Is institutional decision-making accessible to those affected by it?' },
      { label: 'Error culture', question: 'Does the institution acknowledge and correct errors publicly, or manage their communication?' },
      { label: 'Whistleblower protection', question: 'Are those who report institutional wrongdoing protected, not managed?' },
      { label: 'Mission coherence', question: 'Does the institution\'s resource allocation reflect its stated mission?' },
    ],
    sufiDimension: 'This dimension maps to the Sufi governance principles of Shura (consultation), Hisbah (institutional oversight), and Adl (justice as structural condition, not individual act).',
  },
];

const ASSESSMENT_LEVELS = [
  {
    level: 'Reflection',
    description: 'A self-directed reflective instrument for individual use. No external validation. Suitable for initial orientation.',
    access: 'Open',
    color: '#AAB0D6',
  },
  {
    level: 'Calibration',
    description: 'A structured assessment with facilitator review, comparative benchmarking, and personalized developmental feedback.',
    access: 'Platform Member',
    color: '#C8A75E',
  },
  {
    level: 'Institutional Audit',
    description: 'A comprehensive institutional assessment with external review panel, governance analysis, and structured improvement pathway.',
    access: 'Institutional Partnership',
    color: '#7BAFD4',
  },
];

const REFLECTION_QUESTIONS = [
  {
    category: 'Personal',
    color: '#C8A75E',
    questions: [
      'When did you last make a professional decision primarily because it was right, when it was also costly?',
      'What professional behaviors do you maintain consistently in private that you would modify if observed?',
      'What criticism of yourself from someone you respect have you found yourself resisting — and why?',
      'If you removed all professional obligation from your motivation, what would you choose to do?',
    ],
  },
  {
    category: 'Professional',
    color: '#7BAFD4',
    questions: [
      'Who is most vulnerable to your professional decisions, and how much weight do their interests receive in your decision-making?',
      'When has institutional loyalty required you to compromise a principle, and what did you do?',
      'What would an honest account of your professional failures look like, and have you ever written it?',
      'Whose interests do you systematically fail to consider in professional decisions, and why?',
    ],
  },
  {
    category: 'Institutional',
    color: '#8BB89A',
    questions: [
      'What does your institution\'s actual resource allocation reveal about its real priorities?',
      'What institutional wrongdoing do you have knowledge of that has not been addressed, and what has prevented you from acting?',
      'What governance structures in your institution would you design differently if you had no self-interest in the outcome?',
      'How does your institution treat those who challenge its practices?',
    ],
  },
];

function AssessmentDimension({ dim }: { dim: typeof ASSESSMENT_DIMENSIONS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? `${dim.color}30` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: dim.color }}>Dimension</p>
          </div>
          <h3
            className="text-base font-bold leading-snug mb-2 transition-colors"
            style={{ color: open ? dim.color : '#F5F3EE' }}
          >
            {dim.title}
          </h3>
          <p className="text-[12px] text-[#AAB0D6]/55 leading-relaxed">{dim.description}</p>
        </div>
        <ChevronDown
          className="h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200"
          style={{ color: open ? dim.color : 'rgba(170,176,214,0.3)', transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {open && (
        <div className="border-t border-white/6 px-6 pb-6 pt-5 bg-[#080B1A]/40 space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: dim.color }}>
              Assessment Indicators
            </p>
            <div className="space-y-3">
              {dim.indicators.map((ind, i) => (
                <div key={i} className="border border-white/5 rounded-xl p-4 bg-white/[0.01]">
                  <div className="flex items-start gap-3">
                    <Circle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: `${dim.color}60` }} />
                    <div>
                      <p className="text-[11px] font-semibold text-[#F5F3EE]/80 mb-1">{ind.label}</p>
                      <p className="text-[11px] text-[#AAB0D6]/55 leading-relaxed italic">{ind.question}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-l-2 pl-4" style={{ borderColor: `${dim.color}25` }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: `${dim.color}80` }}>
              Sufi Analytical Frame
            </p>
            <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed">{dim.sufiDimension}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AlignmentAssessmentPage() {
  const [activeReflection, setActiveReflection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <div className="max-w-7xl mx-auto px-5 py-16 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs text-[#AAB0D6]/40">
          <Link href="/applied-civilization" className="hover:text-[#AAB0D6] transition-colors">Applied Civilization</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/70">Alignment & Development Assessment</span>
        </div>

        {/* Hero */}
        <div className="my-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-6">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Alignment &amp;<br />
            <span className="text-[#C8A75E]">Development Assessment</span>
          </h1>
          <p className="text-[15px] text-[#AAB0D6]/75 leading-relaxed max-w-3xl mb-4">
            Reflective calibration instruments for personal alignment, professional integrity, and
            institutional maturity. This is not a grading system — it is a diagnostic framework.
          </p>
          <p className="text-[13px] text-[#AAB0D6]/50 leading-relaxed max-w-3xl">
            Assessment in this framework evaluates the coherence between stated values and actual behavior
            — in individuals, professional practitioners, and institutions. The goal is clarity about where
            alignment holds and where work remains.
          </p>
        </div>

        {/* Important Note */}
        <div className="border border-[#D4A07B]/20 rounded-xl bg-[#D4A07B]/[0.04] px-5 py-4 mb-12 flex items-start gap-3">
          <div className="w-1 h-16 bg-[#D4A07B]/30 rounded-full flex-shrink-0 mt-1" />
          <div>
            <p className="text-[11px] font-bold text-[#D4A07B]/70 uppercase tracking-widest mb-1">Important Note</p>
            <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed">
              This framework does not grade spirituality. It does not evaluate devotional practice or measure proximity
              to any theological standard. It evaluates the coherence between expressed professional values and actual
              professional behavior. These are observable, verifiable, and correctable.
            </p>
          </div>
        </div>

        {/* Three Dimensions */}
        <ScrollReveal>
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-[#C8A75E]/40" />
              <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Assessment Dimensions</p>
            </div>
            <div className="space-y-4">
              {ASSESSMENT_DIMENSIONS.map((dim) => (
                <AssessmentDimension key={dim.id} dim={dim} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Reflection Questions */}
        <ScrollReveal>
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-[#C8A75E]/40" />
              <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Reflective Questions</p>
            </div>
            <p className="text-[13px] text-[#AAB0D6]/60 leading-relaxed max-w-2xl mb-8">
              These questions are not for a form or a report. They are for the practitioner to sit with honestly.
              Their value depends entirely on the honesty with which they are engaged.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REFLECTION_QUESTIONS.map((group) => (
                <div
                  key={group.category}
                  className="border rounded-xl overflow-hidden transition-all duration-200"
                  style={{ borderColor: `${group.color}20` }}
                >
                  <button
                    className="w-full text-left p-5 flex items-center justify-between gap-3"
                    onClick={() => setActiveReflection(activeReflection === group.category ? null : group.category)}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: group.color }}>
                      {group.category} Alignment
                    </p>
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200"
                      style={{
                        color: group.color,
                        transform: activeReflection === group.category ? 'rotate(180deg)' : undefined,
                      }}
                    />
                  </button>
                  {activeReflection === group.category && (
                    <div
                      className="border-t px-5 pb-5 pt-4 space-y-3"
                      style={{ borderColor: `${group.color}15`, backgroundColor: `${group.color}04` }}
                    >
                      {group.questions.map((q, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[10px] font-bold mt-0.5 flex-shrink-0" style={{ color: `${group.color}60` }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[12px] text-[#AAB0D6]/65 leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Access Levels */}
        <ScrollReveal>
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-[#C8A75E]/40" />
              <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest">Assessment Access</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ASSESSMENT_LEVELS.map((level) => (
                <div
                  key={level.level}
                  className="border rounded-xl p-5"
                  style={{ borderColor: `${level.color}20` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold" style={{ color: level.color }}>{level.level}</p>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wide font-bold"
                      style={{ color: level.color, borderColor: `${level.color}30`, backgroundColor: `${level.color}08` }}
                    >
                      {level.access}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed">{level.description}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="border border-[#C8A75E]/15 rounded-2xl bg-[#C8A75E]/[0.03] p-8 mb-12">
            <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest mb-3">Begin</p>
            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] mb-3">
              Take the Platform Assessment
            </h3>
            <p className="text-[13px] text-[#AAB0D6]/65 leading-relaxed max-w-xl mb-6">
              The platform&apos;s existing Spiritual Assessment provides a structured entry point for self-evaluation
              across the dimensions above. It is the diagnostic engine of the Applied Civilization framework.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/assessment/take"
                className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#08091A] font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#D4B870] transition-colors"
              >
                Take the Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 border border-[#C8A75E]/25 text-[#C8A75E] font-medium px-6 py-3 rounded-xl text-sm hover:bg-[#C8A75E]/8 transition-colors"
              >
                Access Portal
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Nav */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/applied-civilization"
            className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            Applied Civilization
          </Link>
          <Link
            href="/applied-civilization/research-papers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Civilizational Research
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
