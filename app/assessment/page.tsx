import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import {
  ClipboardCheck, Brain, Heart, Sparkles, ArrowRight, CheckCircle,
  GraduationCap, AlertCircle, Lock, TrendingUp, Microscope,
  BookOpen, Scale, Users, Building2
} from 'lucide-react';

export default function AssessmentPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Personal Evaluation"
        title="Assessment"
        description="Calibrated developmental mapping tools integrating contemplative tradition with psychological insight."
      />

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-20">

          <ScrollReveal>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8A75E]/8 to-transparent pointer-events-none" />
              <div className="border border-[#C8A75E]/20 rounded-2xl p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#C8A75E] uppercase mb-3">Assessment Philosophy</p>
                    <h2 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-4 leading-snug">
                      Why Measurement<br />Matters Here
                    </h2>
                    <p className="text-[#AAB0D6] leading-relaxed text-sm">
                      Inner development without measurement becomes assumption.
                      Measurement without ethics becomes reduction.
                    </p>
                    <p className="text-[#AAB0D6] leading-relaxed text-sm mt-3">
                      Our assessments integrate contemplative tradition with psychological
                      insight to map growth responsibly, providing orientation without
                      conferring rank, and guidance without replacing the guide.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Brain, label: 'Developmental psychology frameworks' },
                      { icon: BookOpen, label: 'Contemplative tradition models' },
                      { icon: Scale, label: 'Ethical governance standards' },
                      { icon: Microscope, label: 'Epistemological alignment research' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                        <Icon className="w-4 h-4 text-[#C8A75E] flex-shrink-0" />
                        <span className="text-sm text-[#AAB0D6]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-4">
              <p className="text-xs tracking-[0.2em] text-[#C8A75E] uppercase mb-4">Assessment Pathway</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { level: '01', label: 'Foundational Self-Awareness', desc: 'For those beginning structured inner work', active: true },
                  { level: '02', label: 'Developmental Alignment', desc: 'Advanced teaching and transmission readiness', active: true },
                  { level: '03', label: 'Institutional Leadership', desc: 'Governance, accountability & continuity', active: true },
                ].map((item) => (
                  <div key={item.level} className={`rounded-xl p-5 border transition-all ${item.active ? 'border-[#C8A75E]/25 bg-[#C8A75E]/5' : 'border-white/8 bg-white/2 opacity-50'}`}>
                    <div className="text-3xl font-bold text-[#C8A75E]/30 font-serif mb-2">{item.level}</div>
                    <p className="text-sm font-semibold text-[#F5F3EE] mb-1">{item.label}</p>
                    <p className="text-xs text-[#AAB0D6]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-panel rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase mb-1">Level 01: Foundational</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F3EE] leading-tight">
                    Beginner's Checklist for the Sufi Journey
                  </h2>
                  <p className="text-[#AAB0D6] text-sm mt-2">
                    An integrated scientific-spiritual evaluation for seekers beginning the path.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Brain, title: 'Cognitive Patterns', desc: 'Thinking styles, belief systems, and epistemic approaches.' },
                  { icon: Heart, title: 'Emotional Intelligence', desc: 'Emotional awareness, regulation, and relational capacity.' },
                  { icon: Sparkles, title: 'Contemplative Capacity', desc: 'Meditation experience and states of consciousness accessed.' },
                  { icon: TrendingUp, title: 'Transformative Readiness', desc: 'Preparedness for deep personal and spiritual development.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/2 hover:border-[#C8A75E]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">{title}</p>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#C8A75E]/8 border border-[#C8A75E]/25 rounded-xl p-6 mb-8">
                <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">What You'll Receive</h4>
                <ul className="space-y-2">
                  {[
                    'Detailed profile of your current developmental stage',
                    'Personalized practice and study recommendations',
                    'Curated learning pathways based on your profile',
                    'Insights into areas for growth and development',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#AAB0D6]">
                      <CheckCircle className="w-4 h-4 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/assessment/take?type=beginner">
                  <Button size="lg" className="bg-[#C8A75E] hover:bg-[#D4B56D] text-[#0B0F2A] font-semibold px-8">
                    Begin Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <div className="text-sm text-[#AAB0D6] space-y-0.5">
                  <p>Estimated time: 15–20 minutes</p>
                  <p className="text-xs text-[#AAB0D6]/60">You can retake this assessment every 6 months to track growth.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[#C8A75E]/40" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-panel rounded-2xl p-8 md:p-12 bg-gradient-to-br from-[#C8A75E]/4 to-transparent border-[#C8A75E]/15">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase mb-1">Level 02: Developmental Alignment</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F3EE] leading-tight">
                    Personalized Teaching Path Assessment
                  </h2>
                  <p className="text-[#AAB0D6] text-sm mt-2">
                    Evaluate spiritual teaching capacity through an integrated Sufi-scientific framework.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Brain, title: 'Doctrinal Grounding', desc: 'Islamic theology, Sufi metaphysics, and textual sources.' },
                  { icon: Heart, title: 'Psychological Maturity', desc: 'Ego stability, authority sensitivity, and conflict navigation.' },
                  { icon: CheckCircle, title: 'Ethical Responsibility', desc: 'Power awareness, confidentiality discipline, financial transparency.' },
                  { icon: Sparkles, title: 'Transmission Capacity', desc: 'Communication clarity, pedagogy, and cross-cultural literacy.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/2 hover:border-[#C8A75E]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">{title}</p>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-white/8 rounded-xl p-5 mb-6 bg-white/2">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#AAB0D6] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#AAB0D6] leading-relaxed">
                    This assessment is intended for individuals actively engaged in teaching, mentorship, or institutional leadership development. It is not appropriate for general seekers at the beginning stage.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/6 border border-amber-500/20 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#F5F3EE] mb-1">Boundary Statement</p>
                    <p className="text-xs text-[#AAB0D6] leading-relaxed">
                      These assessments provide developmental mapping and guidance. They do not confer spiritual rank, authority, or religious certification. Assessment results are not a fatwa and carry no ecclesiastical weight.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/assessment/take?type=teaching">
                  <Button size="lg" className="bg-[#C8A75E] hover:bg-[#D4B56D] text-[#0B0F2A] font-semibold px-8">
                    Begin Teaching Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <div className="text-sm text-[#AAB0D6] space-y-0.5">
                  <p>Estimated time: 35–45 minutes</p>
                  <p className="text-xs text-[#AAB0D6]/60">You can retake this assessment every 6 months to track growth.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[#C8A75E]/40" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-panel rounded-2xl p-8 md:p-12 border-white/5 opacity-90">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase mb-1">Level 03: Institutional</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F3EE] leading-tight">
                    Institutional Leadership Evaluation
                  </h2>
                  <p className="text-[#AAB0D6] text-sm mt-2">
                    For advanced scholars and institutional contributors evaluating governance readiness.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Scale, title: 'Governance Awareness', desc: 'Understanding of institutional structures and accountability frameworks.' },
                  { icon: CheckCircle, title: 'Public Accountability', desc: 'Capacity for transparent conduct in positions of institutional visibility.' },
                  { icon: Brain, title: 'Ethical Transparency', desc: 'Alignment between stated values and institutional conduct.' },
                  { icon: TrendingUp, title: 'Continuity Mindset', desc: 'Commitment to sustainable transmission across generational transitions.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/2">
                    <Icon className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">{title}</p>
                      <p className="text-xs text-[#AAB0D6] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/8">
                <div className="w-8 h-8 rounded-full bg-[#C8A75E]/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-[#C8A75E]" />
                </div>
                <p className="text-xs text-[#AAB0D6]">
                  This evaluation is available by institutional invitation. Contact the Institute directly to initiate the review process.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-white/8 rounded-2xl p-8 bg-white/1">
              <div className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Data Ethics & Confidentiality</h3>
                  <p className="text-sm text-[#AAB0D6] leading-relaxed">
                    Your responses are encrypted and used solely for developmental mapping within SSC USA frameworks.
                    We do not sell, share, or aggregate assessment data with third parties. All results are stored
                    under institutional data governance protocols and accessible only to the respondent and
                    authorised SSC USA personnel where explicitly consented.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
