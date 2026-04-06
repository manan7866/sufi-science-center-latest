'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, Clock, Shield, Brain, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface Framework {
  id: string;
  title: string;
  arabicName: string;
  category: string;
  duration: string;
  level: string;
  description: string;
  longDescription: string;
  components: string[];
  ethicalFoundations: string[];
  outcomes: string[];
}

const frameworks: Framework[] = [
  {
    id: '1',
    title: 'Daily Recitation Protocol',
    arabicName: 'Wird al-Yawmi',
    category: 'Daily Practice',
    duration: '30–45 min',
    level: 'Foundational',
    description: 'A structured morning and evening recitation sequence cultivating presence, gratitude, and ethical intention.',
    longDescription: 'The daily recitation protocol establishes the rhythmic foundation of contemplative life. Rooted in classical Sufi methodology, this wazeefia integrates dhikr, salawat, and silent contemplation into a repeatable structure that aligns the practitioner\'s awareness with higher intention from the outset of each day.',
    components: ['Morning opening invocations', 'Breath-synchronized dhikr sequences', 'Evening accountability reflection', 'Ethical intention renewal'],
    ethicalFoundations: ['Truthfulness in speech and action', 'Presence over performance', 'Consistency over intensity'],
    outcomes: ['Increased baseline presence', 'Stabilized ethical conduct', 'Reduced reactivity in daily interactions'],
  },
  {
    id: '2',
    title: 'Cognitive Awareness Training',
    arabicName: 'Muraqaba al-Fikr',
    category: 'Cognitive Development',
    duration: '20–30 min',
    level: 'Intermediate',
    description: 'Structured observation of thought patterns to develop discernment between inspired intellect and conditioned reactivity.',
    longDescription: 'Cognitive awareness training is the systematic practice of observing one\'s own mental processes without identification. This wazeefia draws from classical concepts of muraqaba (watchful observation) and applies them to the modern understanding of cognitive patterns, enabling the seeker to distinguish between habitual conditioning and genuine insight.',
    components: ['Thought observation journaling', 'Breath-anchored awareness intervals', 'Pattern recognition exercises', 'Weekly discernment review'],
    ethicalFoundations: ['Intellectual humility', 'Non-judgmental observation', 'Honest self-accounting (muhasaba)'],
    outcomes: ['Greater clarity in decision-making', 'Reduced identification with mental noise', 'Enhanced capacity for nuanced judgment'],
  },
  {
    id: '3',
    title: 'Structured Developmental Progression',
    arabicName: 'Tartib al-Suluk',
    category: 'Path Architecture',
    duration: 'Ongoing',
    level: 'Advanced',
    description: 'A mapped developmental curriculum aligning practice intensity with stage-appropriate challenges and consolidations.',
    longDescription: 'Tartib al-Suluk provides the overarching framework within which individual wazeefias are situated. Rather than a collection of isolated practices, this structured progression maps the seeker\'s journey through stages of nafs purification, heart opening, and intellect refinement, ensuring that each practice is introduced at the appropriate moment in the developmental arc.',
    components: ['Stage-readiness assessment', 'Practice sequencing by developmental level', 'Milestone consolidation periods', 'Integration review with guide'],
    ethicalFoundations: ['Patience with the process', 'Trust in transmission', 'Surrender to proper sequencing'],
    outcomes: ['Coherent inner development arc', 'Avoidance of spiritual bypassing', 'Stable integration of insights'],
  },
  {
    id: '4',
    title: 'Breath and Heart Coherence',
    arabicName: 'Tanaffus al-Qalb',
    category: 'Heart Practice',
    duration: '15–20 min',
    level: 'Foundational',
    description: 'Breath-guided practices designed to establish coherence between physiological rhythms and heart-centered awareness.',
    longDescription: 'Drawn from classical Sufi breath teachings and validated by contemporary heart coherence research, this wazeefia trains the practitioner to use the breath as a bridge between the physical body and the subtle heart. Regular practice develops an enduring quality of calm alertness that supports all other developmental work.',
    components: ['Rhythmic breath induction', 'Heart-focused attention protocols', 'Emotional tone elevation exercises', 'Closing gratitude integration'],
    ethicalFoundations: ['Gentleness with oneself', 'Consistency over perfectionism', 'Embodied presence'],
    outcomes: ['Improved emotional regulation', 'Enhanced access to intuitive guidance', 'Reduced physiological stress markers'],
  },
  {
    id: '5',
    title: 'Silent Contemplation',
    arabicName: 'Tafakkur',
    category: 'Contemplative Inquiry',
    duration: '20–40 min',
    level: 'Intermediate',
    description: 'Disciplined silent reflection on divine realities, ethical principles, and the nature of one\'s own consciousness.',
    longDescription: 'Tafakkur is the practice of sustained, directional contemplation. Unlike unstructured meditation, this wazeefia provides the practitioner with specific contemplative objects (a divine name, an ethical quality, or a question about one\'s own nature) and trains the capacity to hold focused inquiry without collapsing into distraction or conceptual elaboration.',
    components: ['Contemplative object selection', 'Settling breath sequence', 'Sustained inquiry period', 'Integration notation'],
    ethicalFoundations: ['Reverence for the contemplative object', 'Discipline of attention', 'Willingness to be changed by insight'],
    outcomes: ['Deepened understanding of contemplated realities', 'Strengthened attentional stability', 'Natural emergence of ethical refinement'],
  },
  {
    id: '6',
    title: 'Weekly Self-Accounting',
    arabicName: 'Muhasaba al-Usbu\'iyya',
    category: 'Ethical Refinement',
    duration: '45–60 min',
    level: 'Foundational',
    description: 'A structured weekly review practice examining alignment between stated values and lived conduct.',
    longDescription: 'Muhasaba, the practice of honest self-accounting, is among the most essential of all wazeefias. This weekly protocol provides a structured format for reviewing one\'s conduct, intentions, and inner states over the preceding week, identifying both areas of growth and opportunities for refinement. It is practiced with rigorous honesty, compassionate self-regard, and forward-looking intention.',
    components: ['Conduct review across key relational domains', 'Intention examination', 'Pattern identification', 'Renewal of commitments for the coming week'],
    ethicalFoundations: ['Radical honesty with oneself', 'Self-compassion without self-indulgence', 'Commitment to continuous improvement'],
    outcomes: ['Alignment between values and conduct', 'Early identification of negative patterns', 'Strengthened moral character over time'],
  },
];

const levelColors: Record<string, string> = {
  Foundational: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Advanced: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const categoryIcons: Record<string, any> = {
  'Daily Practice': Clock,
  'Cognitive Development': Brain,
  'Path Architecture': Layers,
  'Heart Practice': Shield,
  'Contemplative Inquiry': BookOpen,
  'Ethical Refinement': Shield,
};

export default function WazeefiaPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(frameworks.map(f => f.category)))];
  const filtered = filter === 'All' ? frameworks : frameworks.filter(f => f.category === filter);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Wazeefia"
        description="Disciplined contemplative exercises grounded in ethical intention, cognitive awareness, and structured developmental progression."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <Card className="glass-panel border-[#C8A75E]/30 p-8 mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-transparent">
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-4">
              Structured Practice Frameworks
            </h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-4">
              Wazeefia refers to the disciplined, repeatable practice frameworks that form the backbone of
              structured inner development. Unlike spontaneous practice, each wazeefia carries specific
              intention, duration, and ethical foundation, creating the conditions for genuine transformation
              rather than mere familiarity with spiritual language.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed">
              These frameworks are not self-assigned. In the classical tradition, the appropriate wazeefia
              is determined through assessment, dialogue with a guide, and honest appraisal of one's current
              developmental stage.
            </p>
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
          {filtered.map((framework, index) => {
            const Icon = categoryIcons[framework.category] || Layers;
            const isExpanded = expanded === framework.id;

            return (
              <ScrollReveal key={framework.id} delay={index * 0.05}>
                <Card className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-all overflow-hidden">
                  <button
                    className="w-full p-6 text-left"
                    onClick={() => setExpanded(isExpanded ? null : framework.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-6 h-6 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-serif font-semibold text-[#F5F3EE]">
                              {framework.title}
                            </h3>
                            <p className="text-sm text-[#C8A75E] mt-0.5">{framework.arabicName}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="hidden sm:flex flex-wrap gap-2">
                              <Badge className={`${levelColors[framework.level]} text-xs`}>
                                {framework.level}
                              </Badge>
                              <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {framework.duration}
                              </Badge>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-[#C8A75E]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[#AAB0D6]" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-[#AAB0D6] leading-relaxed">
                          {framework.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                          <Badge className={`${levelColors[framework.level]} text-xs`}>
                            {framework.level}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {framework.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-8 border-t border-white/5 pt-6">
                      <div className="pl-16 space-y-6">
                        <p className="text-[#AAB0D6] leading-relaxed">
                          {framework.longDescription}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Components</h4>
                            <ul className="space-y-2">
                              {framework.components.map((c, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-[#C8A75E] mt-0.5">•</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-amber-500/5 rounded-lg p-5 border border-amber-500/20">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Ethical Foundations</h4>
                            <ul className="space-y-2">
                              {framework.ethicalFoundations.map((e, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span>{e}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-emerald-500/5 rounded-lg p-5 border border-emerald-500/20">
                            <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">Outcomes</h4>
                            <ul className="space-y-2">
                              {framework.outcomes.map((o, i) => (
                                <li key={i} className="text-xs text-[#AAB0D6] flex items-start gap-2">
                                  <span className="text-emerald-400 mt-0.5">•</span>
                                  <span>{o}</span>
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
          <Card className="glass-panel border-white/5 p-8 mt-12 bg-gradient-to-br from-white/3 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-[#C8A75E]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-3">
                  Receiving a Wazeefia
                </h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  In the classical transmission model, a wazeefia is not self-assigned. It is given by a
                  qualified guide following careful assessment of the seeker's readiness, constitution, and
                  current developmental needs. The frameworks presented here are offered for orientation and
                  study. Those seeking to formally engage with wazeefia-based practice are encouraged to
                  explore the Mentorship and Sufi Chain Adoption pathways.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-[#C8A75E] text-[#C8A75E] hover:bg-[#C8A75E] hover:text-[#0B0F2A]"
                    onClick={() => window.location.href = '/inner-development/mentorship'}
                  >
                    Explore Mentorship
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-[#AAB0D6] hover:border-[#C8A75E]/50 hover:text-[#F5F3EE]"
                    onClick={() => window.location.href = '/inner-development/sufi-chain-adoption'}
                  >
                    Sufi Chain Adoption
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
