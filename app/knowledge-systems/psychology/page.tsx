import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Sparkles, Eye, Layers, AlertCircle } from 'lucide-react';

export default function SufiPsychologyPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Consciousness Research"
        title="Sufi Psychology"
        description="Structured models of consciousness, perception, and human development rooted in contemplative traditions and framed in comparative psychological language."
      />

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-lg text-[#AAB0D6] leading-relaxed max-w-3xl mx-auto xl:text-center lg:text-center md:text-center sm:text-center">
              Sufi psychology offers a multi-layered model of human consciousness, integrating cognitive,
              emotional, volitional, and spiritual dimensions. This framework is not mystical speculation
              but systematic observation refined over centuries.
            </p>
          </div>

          {/* Nafs Taxonomy */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="w-8 h-8 text-[#C8A75E]" />
                <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                  Core Model
                </Badge>
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Nafs: The Self System
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-base mt-2">
                Nafs represents the psycho-emotional self—the seat of desires, impulses, identity,
                and reactive patterns. It is not inherently negative but requires refinement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20">
                <h4 className="text-lg font-semibold text-[#C8A75E] mb-3">Classical Framework</h4>
                <p className="text-[#AAB0D6] mb-4">
                  Sufi tradition identifies seven developmental stages of Nafs, each representing
                  increasing psychological integration and ethical refinement:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-red-950/50 text-red-300 border-red-900/30">Stage 1</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Ammārah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Commanding Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Dominated by impulse, reactivity, and unchecked desire. No self-regulation.
                    Action driven by immediate gratification without ethical restraint.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-orange-950/50 text-orange-300 border-orange-900/30">Stage 2</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Lawwāmah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Self-Reproaching Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Awareness of wrongdoing emerges. Internal conflict between impulse and conscience.
                    Guilt and remorse indicate developing moral awareness.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-yellow-950/50 text-yellow-300 border-yellow-900/30">Stage 3</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Mulhimah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Inspired Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Clearer perception of right action. Beginning of stable ethical orientation.
                    Impulses still present but capacity for pause strengthens.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-blue-950/50 text-blue-300 border-blue-900/30">Stage 4</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Muṭmaʾinnah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Tranquil Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Emotional stability achieved. Reduced reactivity. Trust in higher principles.
                    Conduct becomes consistent and reliable.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-emerald-950/50 text-emerald-300 border-emerald-900/30">Stage 5</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Rāḍiyah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Pleased Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Contentment with reality as it is. Acceptance without resignation.
                    Internal coherence with external circumstance.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-teal-950/50 text-teal-300 border-teal-900/30">Stage 6</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Marḍīyah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Pleasing Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Actions naturally align with ethical and spiritual principles.
                    No internal struggle required for right conduct.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">Stage 7</Badge>
                    <h4 className="text-base font-semibold text-[#F5F3EE]">Nafs al-Kāmilah</h4>
                  </div>
                  <p className="text-sm text-[#AAB0D6] mb-2 italic">The Perfected Self</p>
                  <p className="text-[#AAB0D6] text-sm">
                    Full integration of personality dimensions. Awareness, intention, and action unified.
                    Represents the goal of human development—not supernatural, but complete human maturation.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                <p className="text-[#F5F3EE] font-semibold text-center">
                  This is not mystical poetry. It is developmental psychology<br />
                  mapped across observable behavioral patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Qalb Model */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Heart className="w-8 h-8 text-[#C8A75E]" />
                <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                  Perceptual System
                </Badge>
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Qalb: The Heart-Mind
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-base mt-2">
                Qalb is the organ of subtle perception—neither purely cognitive nor purely emotional.
                It is the integrative faculty that perceives meaning, significance, and spiritual reality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Function</h4>
                  <ul className="space-y-2 text-[#AAB0D6] text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Perceives non-sensory realities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Integrates cognitive and emotional data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Distinguishes truth from illusion</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Receives inspiration and intuition</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">States</h4>
                  <ul className="space-y-2 text-[#AAB0D6] text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">⬤</span>
                      <span><strong>Hardened:</strong> Insensitive to subtle meaning</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-400">⬤</span>
                      <span><strong>Diseased:</strong> Distorted perception</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400">⬤</span>
                      <span><strong>Polished:</strong> Clear, receptive awareness</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">⬤</span>
                      <span><strong>Illuminated:</strong> Direct spiritual perception</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20">
                <h4 className="text-lg font-semibold text-[#F5F3EE] mb-3">Comparative Framework</h4>
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  In Western psychology, Qalb approximates metacognitive awareness, intuitive intelligence,
                  and emotional attunement combined. It is the faculty that "knows" beyond rational deduction—
                  what neuroscience might call integrative processing across multiple brain regions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Models */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Complementary Dimensions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ruh" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#0B0F2A]/50">
                  <TabsTrigger value="ruh">Rūḥ</TabsTrigger>
                  <TabsTrigger value="aql">ʿAql</TabsTrigger>
                  <TabsTrigger value="lataif">Latāʾif</TabsTrigger>
                </TabsList>

                <TabsContent value="ruh" className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-[#C8A75E]" />
                    <h3 className="text-xl font-semibold text-[#F5F3EE]">Rūḥ: The Spirit</h3>
                  </div>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Rūḥ represents the animating principle, the life-force that transcends physical
                    and psychological dimensions. It is the divine element within human structure—
                    not metaphor but ontological reality in the tradition.
                  </p>
                  <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                    <p className="text-[#AAB0D6] text-sm">
                      <strong className="text-[#C8A75E]">Characteristics:</strong> Inherently oriented toward truth.
                      Unchanged by psychological distortion. The part of the self that "witnesses" without reactivity.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="aql" className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-[#C8A75E]" />
                    <h3 className="text-xl font-semibold text-[#F5F3EE]">ʿAql: The Intellect</h3>
                  </div>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    ʿAql is the rational faculty—but not limited to logical analysis. It includes
                    discernment, judgment, and the capacity to distinguish truth from falsehood through
                    both reason and spiritual insight.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                      <h4 className="text-sm font-semibold text-[#C8A75E] mb-2">Two Modes</h4>
                      <p className="text-[#AAB0D6] text-sm">
                        <strong>ʿAql Maʿāsh:</strong> Practical intellect for daily life<br />
                        <strong>ʿAql Maʿād:</strong> Spiritual intellect for ultimate reality
                      </p>
                    </div>
                    <div className="p-4 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                      <h4 className="text-sm font-semibold text-[#C8A75E] mb-2">Development</h4>
                      <p className="text-[#AAB0D6] text-sm">
                        Refines through study, contemplation, and ethical discipline.
                        Clear thinking requires clear conduct.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lataif" className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Layers className="w-6 h-6 text-[#C8A75E]" />
                    <h3 className="text-xl font-semibold text-[#F5F3EE]">Latāʾif: Subtle Centers</h3>
                  </div>
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    The Latāʾif system maps subtle energy centers corresponding to different dimensions
                    of consciousness. While paralleling chakra systems, it is specifically integrated
                    with Islamic metaphysical framework.
                  </p>
                  <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20">
                    <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Seven Primary Centers</h4>
                    <div className="space-y-2 text-[#AAB0D6] text-sm">
                      <p><strong>Qalb</strong> (Heart) - Emotional-spiritual perception</p>
                      <p><strong>Rūḥ</strong> (Spirit) - Spiritual animation</p>
                      <p><strong>Sirr</strong> (Secret) - Hidden divine connection</p>
                      <p><strong>Khafī</strong> (Arcane) - Deeper consciousness</p>
                      <p><strong>Akhfā</strong> (Most Hidden) - Ultimate subtle awareness</p>
                      <p><strong>Nafs</strong> (Self) - Ego-integration point</p>
                      <p><strong>Qālab</strong> (Body) - Physical manifestation</p>
                    </div>
                    <p className="text-[#AAB0D6] text-sm mt-4 italic">
                      Activation through specific contemplative practices—not automatic development.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Institutional Integration */}
          <Card className="bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">
                Institutional Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#AAB0D6] leading-relaxed">
                These models are not mystical abstractions. They provide:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <AlertCircle className="w-8 h-8 text-[#C8A75E] mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Diagnostic Framework</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Identify current developmental stage and specific areas requiring attention.
                  </p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <Brain className="w-8 h-8 text-[#C8A75E] mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Therapeutic Direction</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Prescribe specific practices matched to individual psychological structure.
                  </p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <Sparkles className="w-8 h-8 text-[#C8A75E] mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Progress Measurement</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Track observable behavioral transformation across defined stages.
                  </p>
                </div>
              </div>
              <div className="text-center p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                <p className="text-[#F5F3EE] text-lg font-semibold">
                  This is structured consciousness research—<br />
                  not mystical speculation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
