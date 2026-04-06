import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Wind, Focus, Volume2, BookOpen, Heart, AlertTriangle } from 'lucide-react';

export default function ContemplativePracticesPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Methodological Framework"
        title="Contemplative Practices"
        description="Structured methodologies for attention training, emotional regulation, and consciousness refinement with clear purpose, method, and psychological function."
      />

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-lg text-[#AAB0D6] leading-relaxed max-w-3xl mx-auto text-center">
              These are not symbolic rituals. They are disciplined technologies for consciousness
              refinement with measurable psychological and neurological effects. Each practice has
              defined purpose, methodology, and outcomes.
            </p>
          </div>

          {/* Core Practices */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Core Methodologies
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-base mt-2">
                Five foundational practices forming the architecture of contemplative development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {/* Dhikr */}
                <AccordionItem value="dhikr" className="border border-[#C8A75E]/10 rounded-lg px-6 bg-[#1a1f3a]/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center space-x-4">
                      <Volume2 className="w-6 h-6 text-[#C8A75E]" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">Structured Dhikr</h3>
                        <p className="text-sm text-[#AAB0D6]">Repetitive remembrance methodology</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-8 space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Purpose</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Anchor attention</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Regulate emotional state</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reinforce cognitive framework</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Induce neurological entrainment</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Method</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Select specific phrase or divine name</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Synchronize with breath rhythm</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Maintain consistent pace</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Duration: 10-40 minutes minimum</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Psychological Function</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reduces mind-wandering</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Stabilizes emotional baseline</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reinforces semantic memory</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Creates ritual coherence</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-5 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                      <h4 className="text-sm font-semibold text-amber-300 mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Common Distortions</span>
                      </h4>
                      <ul className="space-y-2 text-[#AAB0D6] text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Performative volume without internal attention</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Emotional ecstasy without behavioral transformation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Mechanical repetition without cognitive presence</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Silent Attention */}
                <AccordionItem value="silence" className="border border-[#C8A75E]/10 rounded-lg px-6 bg-[#1a1f3a]/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center space-x-4">
                      <Focus className="w-6 h-6 text-[#C8A75E]" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">Silent Attention Practices</h3>
                        <p className="text-sm text-[#AAB0D6]">Observational stillness and witnessing</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-8 space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Purpose</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Develop metacognitive awareness</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reduce reactive identification</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Strengthen observational capacity</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Cultivate inner stillness</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Method</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Seated posture, relaxed alertness</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Observe thoughts without engagement</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Notice sensations without reaction</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Return to awareness when distracted</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Psychological Function</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Decouples stimulus-response</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Increases impulse control</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Develops executive function</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reduces rumination patterns</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-5 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                      <h4 className="text-sm font-semibold text-amber-300 mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Common Distortions</span>
                      </h4>
                      <ul className="space-y-2 text-[#AAB0D6] text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Dissociation mistaken for transcendence</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Suppression rather than observation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-400">⚠</span>
                          <span>Escapism instead of integration</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Breath Discipline */}
                <AccordionItem value="breath" className="border border-[#C8A75E]/10 rounded-lg px-6 bg-[#1a1f3a]/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center space-x-4">
                      <Wind className="w-6 h-6 text-[#C8A75E]" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">Breath Regulation</h3>
                        <p className="text-sm text-[#AAB0D6]">Conscious respiratory control</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-8 space-y-6">
                    <p className="text-[#AAB0D6] leading-relaxed">
                      Breath is the most accessible physiological lever for nervous system regulation.
                      Conscious control of breathing rhythm directly influences autonomic balance,
                      emotional state, and cognitive clarity.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Primary Techniques</h4>
                        <ul className="space-y-3 text-[#AAB0D6] text-sm">
                          <li>
                            <strong className="text-[#F5F3EE]">Rhythmic Breathing:</strong> 4-count in, 4-count hold, 4-count out
                          </li>
                          <li>
                            <strong className="text-[#F5F3EE]">Extended Exhale:</strong> 4-count in, 8-count out (parasympathetic activation)
                          </li>
                          <li>
                            <strong className="text-[#F5F3EE]">Attention Anchoring:</strong> Focus solely on breath sensation
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Measurable Effects</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Reduced heart rate variability stress</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Lowered cortisol levels</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Improved cognitive performance</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Enhanced emotional regulation</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Reflective Recitation */}
                <AccordionItem value="recitation" className="border border-[#C8A75E]/10 rounded-lg px-6 bg-[#1a1f3a]/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center space-x-4">
                      <BookOpen className="w-6 h-6 text-[#C8A75E]" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">Reflective Recitation</h3>
                        <p className="text-sm text-[#AAB0D6]">Contemplative textual engagement</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-8 space-y-4">
                    <p className="text-[#AAB0D6] leading-relaxed">
                      Structured engagement with sacred or philosophical texts for cognitive-emotional integration.
                      Not passive reading but active contemplative processing.
                    </p>
                    <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                      <h4 className="text-sm font-semibold text-[#C8A75E] mb-3">Method</h4>
                      <ol className="space-y-2 text-[#AAB0D6] text-sm list-decimal list-inside">
                        <li>Select short passage of meaningful text</li>
                        <li>Read slowly, with full attention</li>
                        <li>Pause to contemplate meaning</li>
                        <li>Notice emotional and cognitive responses</li>
                        <li>Integrate insight into behavioral framework</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Ethical Calibrations */}
                <AccordionItem value="ethics" className="border border-[#C8A75E]/10 rounded-lg px-6 bg-[#1a1f3a]/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center space-x-4">
                      <Heart className="w-6 h-6 text-[#C8A75E]" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">Ethical Daily Calibrations</h3>
                        <p className="text-sm text-[#AAB0D6]">Structured self-examination and adjustment</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 pb-8 space-y-6">
                    <p className="text-[#AAB0D6] leading-relaxed">
                      Daily practice of self-examination—not guilt induction but honest assessment
                      with corrective intention. Known as Murāqabah (watchfulness) or Muḥāsabah (self-accounting).
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Evening Review</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>What actions misaligned with principles?</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>What speech was unnecessary or harmful?</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>What emotional reactions were disproportionate?</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>What opportunities for service were missed?</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#0B0F2A]/50 rounded-lg border border-[#C8A75E]/10">
                        <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Morning Intention</h4>
                        <ul className="space-y-2 text-[#AAB0D6] text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Set clear ethical intention for the day</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Identify specific temptations to monitor</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Commit to corrective behaviors</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C8A75E] mt-1">•</span>
                            <span>Visualize desired conduct</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-5 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                      <p className="text-[#F5F3EE] font-semibold text-center">
                        Without daily calibration, spiritual practice becomes performance.<br />
                        <span className="text-[#AAB0D6] text-sm font-normal">Consciousness refinement requires continuous behavioral adjustment.</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Implementation Framework */}
          <Card className="bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">
                Implementation Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#AAB0D6] leading-relaxed">
                These practices are not isolated exercises. They form an integrated system:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Beginner Level</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Focus on breath regulation and brief silent attention (5-10 minutes daily).
                    Establish consistency before intensity.
                  </p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Intermediate Level</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Add structured Dhikr and ethical calibrations. Extend practice duration.
                    Monitor behavioral changes.
                  </p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Advanced Level</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Integrate all practices into daily rhythm. Seek mentorship for refinement.
                    Practice becomes second nature.
                  </p>
                </div>
              </div>
              <div className="text-center p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                <p className="text-[#F5F3EE] text-lg font-semibold">
                  Practice without ethical transformation is exercise, not development.<br />
                  <span className="text-[#AAB0D6] text-base font-normal">
                    The mark of authentic practice is observable behavioral change.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
