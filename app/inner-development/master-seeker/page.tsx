'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, BookOpen, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface Principle {
  id: string;
  title: string;
  arabicConcept: string;
  category: string;
  summary: string;
  detail: string;
  practices: string[];
  violations: string[];
}

const principles: Principle[] = [
  {
    id: '1',
    title: 'Intellectual Humility',
    arabicConcept: 'Tawadu\' al-\'Aql',
    category: 'Cognitive Maturity',
    summary: 'Maintaining genuine openness to correction, acknowledging the limits of one\'s understanding, and avoiding the projection of certainty onto uncertain terrain.',
    detail: 'Intellectual humility is not weakness of conviction. It is the accurate calibration of confidence to evidence and transmission. In the advanced stages of inner development, the temptation to present one\'s insights as universal truths intensifies. The master seeker learns to hold deep understanding with open hands, remaining teachable regardless of accumulated knowledge.',
    practices: [
      'Pausing before asserting interpretations as definitive',
      'Actively seeking perspectives that challenge one\'s views',
      'Acknowledging uncertainty in response to questions at the edges of one\'s knowledge',
      'Regularly reviewing past positions with a willingness to revise',
    ],
    violations: [
      'Presenting partial understanding as complete knowledge',
      'Using scholarly authority to silence legitimate inquiry',
      'Refusing correction from those perceived as less advanced',
    ],
  },
  {
    id: '2',
    title: 'Disciplined Participation',
    arabicConcept: 'Adab al-Majlis',
    category: 'Relational Conduct',
    summary: 'The cultivation of purposeful, measured engagement in circles of learning, contributing with precision, listening with full attention, and refraining from display.',
    detail: 'Every circle of knowledge and practice has its own etiquette (adab). Disciplined participation means entering each gathering with calibrated intention: to contribute where one has genuine offering, to listen where one has genuine need, and to remain silent where one has neither. At advanced stages, the most powerful contribution is often the restraint of unnecessary speech.',
    practices: [
      'Preparing for circles through prior study and self-examination',
      'Monitoring impulse to speak before listening is complete',
      'Contributing questions rather than statements when genuinely uncertain',
      'Exiting exchanges before they become debates about position',
    ],
    violations: [
      'Dominating dialogue with accumulated examples rather than insights',
      'Correcting others publicly when private correction would serve better',
      'Participating to perform rather than to inquire or contribute',
    ],
  },
  {
    id: '3',
    title: 'Maturity of Aspiration',
    arabicConcept: 'Nubuwwat al-Himma',
    category: 'Motivational Alignment',
    summary: 'Orienting one\'s developmental effort toward genuine transformation rather than recognition, credential, or mastery as personal possession.',
    detail: 'A defining characteristic of the mature seeker is the progressive purification of aspiration. Early seekers are often motivated by a mixture of genuine longing and ego-enhancement. The master seeker has passed through sufficient difficulty to recognise when their aspiration is pure and when it remains contaminated by the desire to be seen as advanced. This recognition, not its elimination, marks maturity.',
    practices: [
      'Regular examination of motivation before undertaking visible practices',
      'Choosing the harder path when both serve equally in terms of growth',
      'Declining recognition gracefully without false modesty',
      'Seeking the company of those who see through one\'s presentation',
    ],
    violations: [
      'Using spiritual language to secure social capital',
      'Seeking positions of teaching before the inner work warrants it',
      'Interpreting external recognition as confirmation of inner state',
    ],
  },
  {
    id: '4',
    title: 'Accountability Without Collapse',
    arabicConcept: 'Mas\'uliyya bil-Thubat',
    category: 'Ethical Stability',
    summary: 'The capacity to receive criticism, acknowledge error, and correct course without destabilization of one\'s core commitment to the path.',
    detail: 'Advanced inner development does not produce imperviousness to criticism. It produces the capacity to be genuinely affected by legitimate critique without being destroyed by it. The master seeker has developed enough inner stability to hold the discomfort of being wrong, to make genuine amends, and to continue forward with neither defensive denial nor disproportionate self-condemnation.',
    practices: [
      'Receiving criticism with a pause before responding',
      'Distinguishing between inaccurate criticism and criticism of actual conduct',
      'Making direct amends without excessive elaboration',
      'Treating error as developmental data rather than identity threat',
    ],
    violations: [
      'Collapsing into extended self-flagellation that paralyses growth',
      'Deflecting accountability through spiritual reframing',
      'Weaponising one\'s own vulnerability to avoid substantive accountability',
    ],
  },
  {
    id: '5',
    title: 'Guardianship of Transmission',
    arabicConcept: 'Amana al-Naql',
    category: 'Institutional Integrity',
    summary: 'The rigorous protection of transmitted teachings from distortion, selective quotation, or appropriation in service of personal position.',
    detail: 'As seekers reach stages where they begin to transmit, formally or informally, the responsibility of guardianship becomes paramount. Transmission is not merely the accurate repetition of words; it is the faithful preservation of context, qualification, and the spirit in which teachings were given. The master seeker holds this responsibility as a sacred trust, refusing to deploy transmitted knowledge in ways that serve convenience over fidelity.',
    practices: [
      'Citing sources and contexts when sharing transmitted teachings',
      'Distinguishing clearly between one\'s own interpretation and received knowledge',
      'Declining to share teachings whose full context one cannot adequately convey',
      'Deferring contested points to those with greater transmission authority',
    ],
    violations: [
      'Selective quotation that distorts the intent of a teaching',
      'Presenting one\'s interpretation as the definitive meaning',
      'Sharing advanced teachings with those not yet prepared to receive them',
    ],
  },
  {
    id: '6',
    title: 'Proportionate Withdrawal',
    arabicConcept: 'I\'tizal bil-Hikmah',
    category: 'Discernment in Engagement',
    summary: 'The wisdom to disengage from environments, exchanges, or relationships that have become genuinely corrosive to inner development, without spiritual superiority or social withdrawal as avoidance.',
    detail: 'Not all discomfort is corrosive, and not all withdrawal is wisdom. The master seeker develops the discernment to distinguish between the healthy friction of genuine encounter and the genuinely corrosive dynamic that steadily degrades the inner life. Proportionate withdrawal is the calibrated, non-dramatic movement away from the latter, executed with minimal disruption, and without the self-congratulation of one who believes they have risen above what they are leaving.',
    practices: [
      'Regularly assessing whether key relationships support or erode inner development',
      'Withdrawing gradually and gracefully from corrosive dynamics',
      'Resisting the narrative that withdrawal is a spiritual achievement',
      'Examining whether discomfort is developmental friction before moving to withdraw',
    ],
    violations: [
      'Spiritual bypassing disguised as principled withdrawal',
      'Withdrawing dramatically to communicate superiority',
      'Mistaking the discomfort of genuine encounter for corrosive environment',
    ],
  },
];

const categoryColors: Record<string, string> = {
  'Cognitive Maturity': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Relational Conduct': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Motivational Alignment': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Ethical Stability': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Institutional Integrity': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'Discernment in Engagement': 'bg-violet-400/20 text-violet-300 border-violet-400/30',
};

export default function MasterSeekerPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(principles.map(p => p.category)))];
  const filtered = filter === 'All' ? principles : principles.filter(p => p.category === filter);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Master Seeker"
        description="Defining the maturity, intellectual humility, and disciplined participation required within advanced stages of inner development."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-[#C8A75E]" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Engagement Rules & Modes
                </h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-3">
                  The concept of the Master Seeker does not denote arrival. It denotes the quality of
                  engagement that becomes possible after sustained inner work has laid genuine foundations.
                  A master seeker is not one who has mastered the path, but one who has mastered the
                  conditions of their own seeking: the quality of their attention, the honesty of their
                  self-examination, and the integrity of their participation in communities of knowledge.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed">
                  The principles documented here define both an aspiration and a standard of accountability.
                  They are not a credential to be claimed, but a framework to be returned to regularly as
                  a mirror of one's actual conduct.
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all border ${
                  filter === cat
                    ? 'bg-[#C8A75E] text-[#0B0F2A] border-[#C8A75E]'
                    : 'border-white/20 text-[#AAB0D6] hover:border-[#C8A75E]/50 hover:text-[#F5F3EE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filtered.map((principle, index) => {
            const isExpanded = expanded === principle.id;

            return (
              <ScrollReveal key={principle.id} delay={index * 0.05}>
                <Card className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-all overflow-hidden">
                  <button
                    className="w-full p-6 text-left"
                    onClick={() => setExpanded(isExpanded ? null : principle.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#C8A75E] font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1.5">
                          <div>
                            <h3 className="text-xl font-serif font-semibold text-[#F5F3EE]">
                              {principle.title}
                            </h3>
                            <p className="text-sm text-[#C8A75E] mt-0.5 italic">{principle.arabicConcept}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={`${categoryColors[principle.category] || 'bg-white/10 text-[#AAB0D6]'} text-xs hidden sm:flex`}>
                              {principle.category}
                            </Badge>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-[#C8A75E]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#AAB0D6]" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-[#AAB0D6] leading-relaxed">
                          {principle.summary}
                        </p>
                        <Badge className={`${categoryColors[principle.category] || 'bg-white/10 text-[#AAB0D6]'} text-xs mt-3 sm:hidden`}>
                          {principle.category}
                        </Badge>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-8 border-t border-white/5 pt-6">
                      <div className="pl-14 space-y-6">
                        <p className="text-[#AAB0D6] leading-relaxed">
                          {principle.detail}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-emerald-500/5 rounded-lg p-5 border border-emerald-500/20">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              Practices
                            </h4>
                            <ul className="space-y-2">
                              {principle.practices.map((p, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-emerald-400 mt-0.5">•</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-rose-500/5 rounded-lg p-5 border border-rose-500/20">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-rose-400" />
                              Violations to Avoid
                            </h4>
                            <ul className="space-y-2">
                              {principle.violations.map((v, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-rose-400 mt-0.5">•</span>
                                  <span>{v}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="glass-panel border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-[#C8A75E]" />
                <h3 className="text-lg font-serif font-semibold text-[#F5F3EE]">Study Circles</h3>
              </div>
              <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4">
                These principles are best explored in structured learning communities where honest
                peer accountability can function alongside genuine mutual support.
              </p>
              <Button
                variant="outline"
                className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A] w-full"
                onClick={() => window.location.href = '/inner-development/circles'}
              >
                Explore Study Circles
              </Button>
            </Card>

            <Card className="glass-panel border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                <h3 className="text-lg font-serif font-semibold text-[#F5F3EE]">Wazeefia Framework</h3>
              </div>
              <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4">
                The disciplined practices that support these qualities of engagement are systematically
                addressed within the Wazeefia structured practice frameworks.
              </p>
              <Button
                variant="outline"
                className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A] w-full"
                onClick={() => window.location.href = '/inner-development/wazeefia'}
              >
                Explore Wazeefia
              </Button>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
