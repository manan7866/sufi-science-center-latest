import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Layers, Target, Network, Music, Brain, MessageSquare, Eye, Activity, Lightbulb } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';

export default function SufiKnowledgeArchitecturePage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Epistemological Framework"
        title="Architecture of Knowledge"
        description="A Disciplined System of Inner Development Integrating Cognition, Affect Regulation, Ethical Refinement, and Contemplative Stabilization. Sufi knowledge is not informational accumulation. It is transformative integration."
      />
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Core Definition */}
        <Card className="mb-12 bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30 backdrop-blur-sm">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-[#F5F3EE] leading-relaxed max-w-3xl mx-auto">
                Within the framework of Sufi Science Center USA, Sufi knowledge is defined as:
              </p>
              <blockquote className="text-xl font-serif text-[#C8A75E] italic border-l-4 border-[#C8A75E] pl-6 py-4 my-6 max-w-3xl mx-auto text-left">
                A disciplined system of inner development integrating cognition, affect regulation,
                ethical refinement, and contemplative stabilization.
              </blockquote>
              <p className="text-base text-[#AAB0D6]">
                This system operates across four structured layers:<br />
                <span className="text-[#C8A75E] font-semibold">Definition</span> • <span className="text-[#C8A75E] font-semibold">Transmission</span> • <span className="text-[#C8A75E] font-semibold">Absorption</span> • <span className="text-[#C8A75E] font-semibold">Implementation</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* I. What Is Sufi Knowledge? */}
        <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-[#C8A75E]" />
              <span>I. What Is Sufi Knowledge?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-[#AAB0D6] leading-relaxed">
              In classical terminology, Sufi knowledge integrates three domains of knowing:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2 font-serif">ʿIlm</h3>
                <p className="text-[#AAB0D6] text-sm">Conceptual understanding</p>
              </div>
              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2 font-serif">Maʿrifah</h3>
                <p className="text-[#AAB0D6] text-sm">Experiential realization</p>
              </div>
              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2 font-serif">Ḥikmah</h3>
                <p className="text-[#AAB0D6] text-sm">Embodied wisdom</p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C8A75E]/20">
              <p className="text-[#AAB0D6] leading-relaxed mb-4">
                Institutionally framed, Sufi knowledge is a calibrated refinement of:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-[#1a1f3a]/30 rounded">
                  <Target className="w-5 h-5 text-[#C8A75E]" />
                  <span className="text-[#F5F3EE]">Perception</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#1a1f3a]/30 rounded">
                  <Lightbulb className="w-5 h-5 text-[#C8A75E]" />
                  <span className="text-[#F5F3EE]">Intention</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#1a1f3a]/30 rounded">
                  <Activity className="w-5 h-5 text-[#C8A75E]" />
                  <span className="text-[#F5F3EE]">Conduct</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#1a1f3a]/30 rounded">
                  <Eye className="w-5 h-5 text-[#C8A75E]" />
                  <span className="text-[#F5F3EE]">Awareness</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20 mt-6">
              <h4 className="text-base font-semibold text-[#F5F3EE] mb-3">Foundational Questions</h4>
              <ul className="space-y-2 text-[#AAB0D6]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span>What distorts perception?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span>How does intention become purified?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span>How does awareness stabilize?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span>How does action align with higher consciousness?</span>
                </li>
              </ul>
              <p className="text-[#C8A75E] font-semibold mt-4 text-center">
                Knowledge is verified through character transformation.<br />
                <span className="text-[#AAB0D6] text-sm font-normal">If conduct does not change, knowledge has not yet matured.</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* II. Transmission Modes */}
        <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <Network className="w-6 h-6 text-[#C8A75E]" />
              <span>II. Transmission Modes</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              Transmission in Sufism is structured and multi-layered. It is not passive inspiration.
              It is developmental mentorship.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#AAB0D6] mb-6">
              The Institute recognizes five structured transmission channels:
            </p>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="textual" className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">1</Badge>
                    <BookOpen className="w-5 h-5 text-[#C8A75E]" />
                    <span className="text-lg font-semibold text-[#F5F3EE]">Textual Transmission</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-3">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Foundational texts establish conceptual architecture:
                  </p>
                  <ul className="space-y-2 text-[#AAB0D6] ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Qur'anic exegesis</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Hadith collections</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Classical treatises</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E] mt-1">•</span>
                      <span>Sacred poetry</span>
                    </li>
                  </ul>
                  <p className="text-[#C8A75E] text-sm font-semibold">
                    This establishes conceptual architecture.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="oral" className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">2</Badge>
                    <MessageSquare className="w-5 h-5 text-[#C8A75E]" />
                    <span className="text-lg font-semibold text-[#F5F3EE]">Oral Transmission</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-3">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Live instruction and interpretive refinement. Nuance is shaped through dialogue
                    and contextual clarification.
                  </p>
                  <p className="text-[#C8A75E] text-sm font-semibold">
                    Transmission occurs through direct teaching relationships.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="embodied" className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">3</Badge>
                    <Activity className="w-5 h-5 text-[#C8A75E]" />
                    <span className="text-lg font-semibold text-[#F5F3EE]">Embodied Transmission</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-3">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    The teacher's composure, discipline, and ethical coherence function as a living model.
                  </p>
                  <p className="text-[#C8A75E] text-sm font-semibold">
                    Transmission occurs through stabilized presence.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="situational" className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">4</Badge>
                    <Target className="w-5 h-5 text-[#C8A75E]" />
                    <span className="text-lg font-semibold text-[#F5F3EE]">Situational Calibration</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-3">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Real-time perceptual correction. Adjustment of cognitive distortion and emotional reactivity.
                  </p>
                  <p className="text-[#C8A75E] text-sm font-semibold">
                    This is developmental alignment.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sonic" className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">5</Badge>
                    <Music className="w-5 h-5 text-[#C8A75E]" />
                    <span className="text-lg font-semibold text-[#F5F3EE]">Sonic Transmission</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-4">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    Disciplined sonic methodology designed to regulate attention, refine emotional tone,
                    and stabilize contemplative awareness.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#0B0F2A]/50 rounded border border-[#C8A75E]/10">
                      <p className="text-[#F5F3EE] text-sm">Rhythmic breath regulation</p>
                    </div>
                    <div className="p-3 bg-[#0B0F2A]/50 rounded border border-[#C8A75E]/10">
                      <p className="text-[#F5F3EE] text-sm">Melodic attentional anchoring</p>
                    </div>
                    <div className="p-3 bg-[#0B0F2A]/50 rounded border border-[#C8A75E]/10">
                      <p className="text-[#F5F3EE] text-sm">Repetitive remembrance reinforcement</p>
                    </div>
                    <div className="p-3 bg-[#0B0F2A]/50 rounded border border-[#C8A75E]/10">
                      <p className="text-[#F5F3EE] text-sm">Poetic metaphysical encoding</p>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">
                      This aligns with research in neurocognitive entrainment, emotional coherence,
                      memory consolidation, and group synchronization dynamics.
                    </p>
                    <p className="text-[#C8A75E] text-sm font-semibold mt-3">
                      Sufi music in this framework is not performance aesthetics.<br />
                      It is structured contemplative calibration.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* III. Absorption Model */}
        <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <Brain className="w-6 h-6 text-[#C8A75E]" />
              <span>III. Absorption Model</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              Absorption of Sufi knowledge unfolds through developmental stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">Stage 1</Badge>
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Cognitive Reception</h3>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Conceptual comprehension of terms and frameworks.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">Stage 2</Badge>
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Reflective Internalization</h3>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Self-observation begins. The student compares teaching against lived patterns.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">Stage 3</Badge>
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Behavioral Application</h3>
                  </div>
                  <p className="text-[#AAB0D6] text-sm mb-3">Disciplined practice:</p>
                  <ul className="space-y-1 text-[#AAB0D6] text-sm ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Dhikr</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Silence</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Ethical restraint</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Service</span>
                    </li>
                  </ul>
                  <p className="text-[#AAB0D6] text-sm mt-3">Experimentation with conduct.</p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">Stage 4</Badge>
                    <h3 className="text-lg font-semibold text-[#F5F3EE]">Stabilization</h3>
                  </div>
                  <ul className="space-y-1 text-[#AAB0D6] text-sm ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Reduced reactivity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Increased attentional steadiness</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75E]">•</span>
                      <span>Ethical consistency</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20 text-center">
                <p className="text-[#C8A75E] font-semibold">
                  Absorption is measured through sustained behavioral transformation,<br />
                  not emotional intensity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IV. Implementation in Daily Life */}
        <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <Activity className="w-6 h-6 text-[#C8A75E]" />
              <span>IV. Implementation in Daily Life</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              Implementation is integration, not retreat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#AAB0D6] mb-6 leading-relaxed">
              Sufi knowledge manifests in:
            </p>

            <Tabs defaultValue="speech" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-[#0B0F2A]/50">
                <TabsTrigger value="speech">Speech</TabsTrigger>
                <TabsTrigger value="emotional">Emotional</TabsTrigger>
                <TabsTrigger value="ethical">Ethical</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>

              <TabsContent value="speech" className="mt-6 space-y-3">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-3">A. Speech</h4>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Precision</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Reduced exaggeration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Measured response</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="emotional" className="mt-6 space-y-3">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-3">B. Emotional Regulation</h4>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Pause before reaction</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Stability under provocation</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="ethical" className="mt-6 space-y-3">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-3">C. Ethical Coherence</h4>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Integrity without audience</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Consistency in small matters</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="social" className="mt-6 space-y-3">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-3">D. Social Conduct</h4>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Service without superiority</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Guidance without domination</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="professional" className="mt-6 space-y-3">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-3">E. Professional Responsibility</h4>
                <ul className="space-y-2 text-[#AAB0D6]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Contractual integrity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Attention discipline</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#C8A75E] mt-1">•</span>
                    <span>Emotional steadiness in leadership</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/20 text-center">
              <p className="text-[#C8A75E] font-semibold">
                Sufi knowledge implemented appears ordinary.<br />
                Its mark is reliability, not spectacle.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* V. Institutional Definition */}
        <Card className="mb-12 bg-gradient-to-br from-[#0B0F2A] to-[#1a1f3a] border-[#C8A75E]/30">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <Layers className="w-6 h-6 text-[#C8A75E]" />
              <span>V. Institutional Definition</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              For Sufi Science Center USA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-2">Sufi Knowledge</h4>
                <p className="text-[#AAB0D6] text-sm">
                  A structured developmental system integrating cognition, affect regulation,
                  contemplative discipline, and ethical embodiment.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-2">Transmission</h4>
                <p className="text-[#AAB0D6] text-sm">
                  Textually grounded, relationally mentored, behaviorally modeled, and sonically calibrated.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-2">Absorption</h4>
                <p className="text-[#AAB0D6] text-sm">
                  Measured through sustained perceptual and behavioral refinement.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h4 className="text-base font-semibold text-[#C8A75E] mb-2">Implementation</h4>
                <p className="text-[#AAB0D6] text-sm">
                  Expressed through coherent speech, emotional stability, ethical conduct, and social responsibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Architecture Matters */}
        <Card className="bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE]">
              Why This Architecture Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-red-900/30">
                <h3 className="text-base font-semibold text-red-300 mb-3">Without Structure</h3>
                <p className="text-[#AAB0D6] text-sm mb-3">Sufism is misunderstood as:</p>
                <ul className="space-y-1 text-[#AAB0D6] text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Emotion</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Poetry</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">✗</span>
                    <span>Mysticism</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-emerald-900/30">
                <h3 className="text-base font-semibold text-emerald-300 mb-3">With Structure</h3>
                <p className="text-[#AAB0D6] text-sm mb-3">It becomes:</p>
                <ul className="space-y-1 text-[#AAB0D6] text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Developmental science</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Consciousness refinement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Applied ethical psychology</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
              <p className="text-[#F5F3EE] text-lg font-semibold">
                That distinction defines the Institute.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
