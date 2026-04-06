'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Brain, Eye, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Compass } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';

interface StationPhase {
  id: string;
  phase_number: number;
  name_english: string;
  name_arabic: string | null;
  description: string;
  developmental_focus: string;
}

interface SpiritualStation {
  id: string;
  phase_id: string;
  order_in_phase: number;
  name_arabic: string;
  name_transliteration: string;
  name_english: string;
  classical_definition: string;
  psychological_dimension: string;
  developmental_markers: string;
  common_distortions: string;
  integration_notes: string;
}

interface PhaseWithStations extends StationPhase {
  stations: SpiritualStation[];
}

export default function StationsOfThePathPage() {
  const [phasesWithStations, setPhasesWithStations] = useState<PhaseWithStations[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<SpiritualStation | null>(null);

  useEffect(() => {
    setPhasesWithStations([]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Developmental Cartography"
        title="Stations of the Path"
        description="A Developmental Framework for Mapping Inner Transformation. We do not teach mysticism. We map transformation."
      />
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Layer 1: Foundational Clarification */}
        <Card className="mb-12 bg-[#0B0F2A]/40 border-[#C8A75E]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <Brain className="w-6 h-6 text-[#C8A75E]" />
              <span>Foundational Clarification</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              Understanding the Architecture of Inner Development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">
                      Maqām (Station)
                    </h3>
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">
                      A <span className="text-[#C8A75E]">station</span> represents a stabilized developmental achievement—
                      an integrated behavioral transformation that persists across contexts. Stations are earned through
                      sustained practice and become permanent character structures. In psychological terms, these are
                      consolidated cognitive-emotional schemas that reshape automatic responses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <div className="flex items-start space-x-3 mb-3">
                  <Eye className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">
                      Ḥāl (State)
                    </h3>
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">
                      A <span className="text-blue-400">state</span> is a temporary experiential phenomenon—
                      a transient phenomenological event that arises without deliberate effort and departs without control.
                      States provide glimpses of higher development but do not constitute stable attainment.
                      Psychologically, these are peak experiences or altered states of consciousness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-semibold text-amber-200 mb-2">Critical Distinction</h4>
                  <p className="text-[#AAB0D6] text-sm leading-relaxed">
                    Confusing states with stations creates spiritual delusion. A powerful experience does not equal
                    developmental maturity. This framework tracks <span className="font-semibold text-[#F5F3EE]">stabilized transformation</span>,
                    not transient phenomena. Stations are measured by behavioral consistency, not peak experiences.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layer 2: Core Developmental Map */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-3">
              Developmental Phases
            </h2>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto">
              A structured progression through four phases of transformation, each containing distinct stations
              with specific psychological dimensions and observable markers.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A75E] mx-auto"></div>
              <p className="text-[#AAB0D6] mt-4">Loading developmental map...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {phasesWithStations.map((phase) => (
                <Card key={phase.id} className="bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">
                            Phase {phase.phase_number}
                          </Badge>
                          <CardTitle className="text-2xl text-[#F5F3EE]">
                            {phase.name_english}
                          </CardTitle>
                          {phase.name_arabic && (
                            <span className="text-xl text-[#AAB0D6]/60 font-serif">
                              {phase.name_arabic}
                            </span>
                          )}
                        </div>
                        <CardDescription className="text-[#AAB0D6] mb-3">
                          {phase.description}
                        </CardDescription>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#C8A75E]" />
                          <span className="text-[#AAB0D6]/80">
                            <span className="font-semibold text-[#C8A75E]">Focus:</span> {phase.developmental_focus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {phase.stations.map((station) => (
                        <AccordionItem
                          key={station.id}
                          value={station.id}
                          className="border border-[#C8A75E]/10 rounded-lg px-4 bg-[#1a1f3a]/30"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center space-x-4 text-left">
                              <Badge variant="outline" className="text-[#AAB0D6] border-[#AAB0D6]/30">
                                {phase.phase_number}.{station.order_in_phase}
                              </Badge>
                              <div>
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg font-semibold text-[#F5F3EE]">
                                    {station.name_transliteration}
                                  </span>
                                  <span className="text-base text-[#AAB0D6]/70">
                                    ({station.name_english})
                                  </span>
                                </div>
                                <div className="text-sm text-[#AAB0D6]/60 font-serif mt-1">
                                  {station.name_arabic}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 pb-6">
                            <Tabs defaultValue="classical" className="w-full">
                              <TabsList className="grid w-full grid-cols-5 bg-[#0B0F2A]/50">
                                <TabsTrigger value="classical">Classical</TabsTrigger>
                                <TabsTrigger value="psychological">Psychological</TabsTrigger>
                                <TabsTrigger value="markers">Markers</TabsTrigger>
                                <TabsTrigger value="distortions">Distortions</TabsTrigger>
                                <TabsTrigger value="integration">Integration</TabsTrigger>
                              </TabsList>

                              <TabsContent value="classical" className="mt-4 space-y-3">
                                <h4 className="text-sm font-semibold text-[#C8A75E] uppercase tracking-wide">
                                  Classical Definition
                                </h4>
                                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                                  {station.classical_definition}
                                </p>
                              </TabsContent>

                              <TabsContent value="psychological" className="mt-4 space-y-3">
                                <h4 className="text-sm font-semibold text-[#C8A75E] uppercase tracking-wide">
                                  Psychological Dimension
                                </h4>
                                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                                  {station.psychological_dimension}
                                </p>
                              </TabsContent>

                              <TabsContent value="markers" className="mt-4 space-y-3">
                                <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                                  Developmental Markers
                                </h4>
                                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                                  {station.developmental_markers}
                                </p>
                              </TabsContent>

                              <TabsContent value="distortions" className="mt-4 space-y-3">
                                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
                                  Common Distortions
                                </h4>
                                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                                  {station.common_distortions}
                                </p>
                              </TabsContent>

                              <TabsContent value="integration" className="mt-4 space-y-3">
                                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                                  Integration Notes
                                </h4>
                                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                                  {station.integration_notes}
                                </p>
                              </TabsContent>
                            </Tabs>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Layer 3: Integration Framework */}
        <Card className="bg-gradient-to-br from-[#0B0F2A] to-[#1a1f3a] border-[#C8A75E]/30">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F5F3EE] flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-[#C8A75E]" />
              <span>Integration With Institute Systems</span>
            </CardTitle>
            <CardDescription className="text-[#AAB0D6]">
              How Stations Connect Across the Ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-base font-semibold text-[#F5F3EE] mb-3">Saints Atlas Connection</h3>
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  Each station links to saints who exemplified that developmental emphasis. Explore biographical
                  examples of how historical figures embodied specific stations in their lives and teachings.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-base font-semibold text-[#F5F3EE] mb-3">Sacred Kalam Integration</h3>
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  Poetry and devotional works reflecting each station's phenomenology. Access literary expressions
                  that capture the experiential texture of developmental stages.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-base font-semibold text-[#F5F3EE] mb-3">Assessment Mapping</h3>
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  Personal Assessment scores map to relevant stations, providing developmental guidance.
                  Understand which stations align with your current psychological orientation and growth edges.
                </p>
              </div>

              <div className="p-5 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10">
                <h3 className="text-base font-semibold text-[#F5F3EE] mb-3">Research Publications</h3>
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  Academic analyses of specific stations from psychological, theological, and phenomenological
                  perspectives. Access rigorous scholarship on developmental constructs.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C8A75E]/20">
              <h3 className="text-lg font-semibold text-[#F5F3EE] mb-4">Strategic Value</h3>
              <p className="text-[#AAB0D6] text-sm leading-relaxed mb-4">
                This developmental cartography serves as the <span className="text-[#C8A75E] font-semibold">spine
                of the entire platform</span>. It transforms scattered mystical concepts into a coherent framework
                for understanding inner transformation. When someone asks what makes Sufi Science Center USA different,
                the answer is clear:
              </p>
              <p className="text-[#F5F3EE] text-base font-semibold text-center py-4 px-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                We don't teach mysticism. We map transformation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Methodological Note */}
        <div className="mt-12 p-6 bg-[#0B0F2A]/40 border border-[#AAB0D6]/10 rounded-lg">
          <h3 className="text-sm font-semibold text-[#AAB0D6] uppercase tracking-wide mb-3">
            Methodological Note
          </h3>
          <p className="text-[#AAB0D6]/80 text-sm leading-relaxed">
            This framework synthesizes classical Sufi taxonomies (particularly from al-Qushayri, al-Ghazali, and Ibn Arabi)
            with contemporary developmental psychology. It is not presented as dogma but as a working model for understanding
            inner transformation. Individual paths vary significantly, and this map should be held lightly while providing
            useful orientation. Stations may be experienced non-linearly, and developmental work is recursive rather than
            purely sequential.
          </p>
        </div>
      </div>
    </div>
  );
}
