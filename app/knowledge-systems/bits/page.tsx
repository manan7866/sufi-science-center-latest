import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Heart, Eye, Sparkles, Shield, Compass, Flame } from 'lucide-react';

export default function AppliedConceptsPage() {
  const knowledgeBits = [
    {
      icon: Heart,
      term: "Ikhlāṣ",
      category: "Intention",
      definition: "Sincerity of intention. The purification of motive from all hidden agendas, self-interest, or desire for recognition.",
      explanation: "Ikhlāṣ is not emotional purity but volitional clarity. An action performed with Ikhlāṣ has no secondary agenda—no expectation of reward, praise, or reciprocity. It is action for its own intrinsic rightness.",
      practical: "Before any significant action, ask: What is my actual motivation? Is this for appearance or for integrity? True Ikhlāṣ eliminates performative spirituality.",
      cross_links: ["Tawakkul", "Riyāʾ"]
    },
    {
      icon: Target,
      term: "Maqām vs Ḥāl",
      category: "Developmental States",
      definition: "Maqām is a permanent station achieved through effort and discipline. Ḥāl is a temporary state granted without effort.",
      explanation: "Maqām represents stabilized transformation—humility that persists under provocation, generosity that requires no reminder. Ḥāl is momentary experience—a flash of insight, temporary elevation of emotion. Maqām is structural change. Ḥāl is experiential flavor.",
      practical: "Do not mistake intense spiritual experience (Ḥāl) for actual development (Maqām). If behavior reverts when the experience fades, you have not changed station.",
      cross_links: ["Nafs al-Muṭmaʾinnah", "Stations of the Path"]
    },
    {
      icon: Shield,
      term: "Tawakkul",
      category: "Trust",
      definition: "Reliance on divine providence. Trust in reality as it unfolds, without anxious grasping or resistance.",
      explanation: "Tawakkul is not passivity. It is full effort combined with detachment from outcome. You do what is required with excellence, then release control over results. It eliminates psychological strain without eliminating responsibility.",
      practical: "Act with diligence. Plan thoroughly. Then release anxiety about outcomes you cannot control. Tawakkul is effort without attachment.",
      cross_links: ["Ikhlāṣ", "Sabr"]
    },
    {
      icon: Sparkles,
      term: "Dhikr",
      category: "Practice",
      definition: "Structured remembrance through repetitive invocation of divine names or phrases.",
      explanation: "Dhikr functions neurologically as attentional anchor, emotional regulator, and cognitive reinforcer. It is not magical incantation but disciplined mental technology. Repetition creates neural entrainment, emotional coherence, and semantic reinforcement.",
      practical: "Select a phrase or divine name. Synchronize with breath. Maintain rhythm for minimum 10 minutes. Observe reduction in mental noise and emotional volatility.",
      cross_links: ["Contemplative Practices", "Murāqabah"]
    },
    {
      icon: Compass,
      term: "Taqwā",
      category: "Ethical Awareness",
      definition: "God-consciousness. Continuous awareness that reality witnesses your internal and external states.",
      explanation: "Taqwā is perpetual ethical vigilance—behavior as if all is known. It eliminates the gap between public and private conduct. When you believe no action is hidden, integrity becomes automatic. It is not paranoia but structural honesty.",
      practical: "Act as if your intentions are transparent. What would you do if all thoughts were visible? Taqwā closes the gap between appearance and reality.",
      cross_links: ["Murāqabah", "Ethical Calibrations"]
    },
    {
      icon: Eye,
      term: "Murāqabah",
      category: "Self-Observation",
      definition: "Watchfulness. Continuous self-monitoring of internal states, intentions, and reactive patterns.",
      explanation: "Murāqabah is metacognitive awareness applied constantly. You observe your thoughts, emotions, and impulses without immediate identification. It creates psychological distance between stimulus and response, enabling conscious choice rather than automatic reaction.",
      practical: "Throughout the day, pause to notice: What am I feeling? What am I thinking? What impulse is arising? This creates space for intentional response.",
      cross_links: ["Muḥāsabah", "Silent Attention Practices"]
    },
    {
      icon: BookOpen,
      term: "Muḥāsabah",
      category: "Self-Accounting",
      definition: "Daily self-examination. Structured review of actions, intentions, and alignments with ethical principles.",
      explanation: "Muḥāsabah is the practice of evening ethical review—not guilt induction but honest assessment. What actions misaligned with values? What speech was unnecessary? What opportunities for integrity were missed? It functions as behavioral feedback system.",
      practical: "End each day with 10-minute review: Where did I act from impulse rather than principle? What would I do differently? Set corrective intention for tomorrow.",
      cross_links: ["Murāqabah", "Ethical Calibrations"]
    },
    {
      icon: Flame,
      term: "Sabr",
      category: "Patience",
      definition: "Patient perseverance. Steadiness under difficulty without complaint or collapse.",
      explanation: "Sabr is not passive suffering but active endurance with dignity. It is the capacity to remain composed when reality does not conform to preference. It combines emotional regulation, cognitive reframing, and spiritual trust.",
      practical: "When facing difficulty, observe your reactive impulse. Do not suppress emotion, but do not amplify it. Hold steady. Let reality be what it is without internal resistance.",
      cross_links: ["Tawakkul", "Riḍā"]
    }
  ];

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Applied Conceptual Framework"
        title="Applied Concepts"
        description="Precise conceptual essays on core Sufi concepts. Short-form knowledge units with clear definitions, practical implications, and cross-referenced connections."
      />

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 xl:text-center lg:text-center md:text-center sm:text-center">
            <p className="text-lg text-[#AAB0D6] leading-relaxed max-w-3xl mx-auto">
              Each Applied Concept provides structured understanding of a single term—not inspirational quotes
              but institutional clarity. These are building blocks for a coherent contemplative framework.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {knowledgeBits.map((bit, idx) => (
              <Card key={idx} className="glass-panel border-[#C8A75E]/20 hover:border-[#C8A75E]/40 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <bit.icon className="w-10 h-10 text-[#C8A75E]" />
                    <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                      {bit.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-[#F5F3EE] font-serif mb-2">
                    {bit.term}
                  </CardTitle>
                  <CardDescription className="text-[#AAB0D6] text-base leading-relaxed">
                    {bit.definition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[#C8A75E] mb-2">Explanation</h4>
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">
                      {bit.explanation}
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                    <h4 className="text-sm font-semibold text-[#C8A75E] mb-2">Practical Application</h4>
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">
                      {bit.practical}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#AAB0D6] mb-2">Related Concepts</h4>
                    <div className="flex flex-wrap gap-2">
                      {bit.cross_links.map((link, linkIdx) => (
                        <Badge key={linkIdx} variant="outline" className="text-xs border-[#C8A75E]/20 text-[#AAB0D6]">
                          {link}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 glass-panel rounded-2xl p-12 xl:text-center lg:text-center md:text-center sm:text-center">
            <BookOpen className="w-16 h-16 text-[#C8A75E] mx-auto mb-6 opacity-60" />
            <h3 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-4">
              Expanding Conceptual Library
            </h3>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto mb-8">
              This collection grows continuously. Each concept receives rigorous treatment—definition,
              explanation, practical application, and systematic cross-referencing. No inspirational dilution.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                <p className="text-2xl font-bold text-[#C8A75E] mb-1">50+</p>
                <p className="text-sm text-[#AAB0D6]">Core Concepts</p>
              </div>
              <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                <p className="text-2xl font-bold text-[#C8A75E] mb-1">300-500</p>
                <p className="text-sm text-[#AAB0D6]">Words Each</p>
              </div>
              <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                <p className="text-2xl font-bold text-[#C8A75E] mb-1">Cross-Linked</p>
                <p className="text-sm text-[#AAB0D6]">Related Terms</p>
              </div>
              <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                <p className="text-2xl font-bold text-[#C8A75E] mb-1">Practical</p>
                <p className="text-sm text-[#AAB0D6]">Application Focus</p>
              </div>
            </div>
          </div>

          <Card className="mt-12 bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30">
            <CardContent className="pt-8 xl:text-center lg:text-center md:text-center sm:text-center">
              <p className="text-[#F5F3EE] text-lg font-semibold">
                This is not Instagram spirituality.<br />
                <span className="text-[#AAB0D6] text-base font-normal">
                  Each entry is a precise conceptual unit designed for systematic learning and practical implementation.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
