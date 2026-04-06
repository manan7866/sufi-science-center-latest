import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Eye, ShieldCheck, AlertCircle, Users, BookOpen, Target } from 'lucide-react';

export default function EpistemologyPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Verification Framework"
        title="Epistemology & Method"
        description="How knowledge is verified, validated, and distinguished from imagination. The institutional framework for evaluating spiritual claims and subjective experience."
      />

      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1F4A]/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-lg text-[#AAB0D6] leading-relaxed max-w-3xl mx-auto text-center">
              Not all subjective experience constitutes knowledge. Not all inspiration is valid guidance.
              Sufi epistemology provides rigorous criteria for distinguishing authentic insight from
              psychological projection, fantasy, or self-deception.
            </p>
          </div>

          {/* Core Problem */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="w-8 h-8 text-[#C8A75E]" />
                <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                  Foundational Problem
                </Badge>
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                The Epistemological Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#AAB0D6] leading-relaxed">
                Spiritual traditions claim access to non-sensory knowledge—insight, revelation, intuition.
                But subjective experience is notoriously unreliable. How does one distinguish:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-lg">
                  <h4 className="text-base font-semibold text-red-300 mb-3">Invalid Claims</h4>
                  <ul className="space-y-2 text-[#AAB0D6] text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Psychological projection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Wishful thinking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Emotional elevation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Ego inflation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">✗</span>
                      <span>Pathological delusion</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                  <h4 className="text-base font-semibold text-emerald-300 mb-3">Valid Knowledge</h4>
                  <ul className="space-y-2 text-[#AAB0D6] text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Authentic spiritual insight</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Divine inspiration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Intuitive discernment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Contemplative realization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Stabilized understanding</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                <p className="text-[#F5F3EE] font-semibold text-center">
                  Without verification criteria, spirituality becomes indistinguishable from fantasy.<br />
                  <span className="text-[#AAB0D6] text-sm font-normal">Sufi epistemology provides that framework.</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Criteria */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-[#C8A75E]" />
                <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                  Validation System
                </Badge>
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Seven Verification Criteria
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-base mt-2">
                Authentic spiritual knowledge must satisfy multiple independent tests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">1</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Textual Consonance</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Does the insight align with foundational sacred texts (Qur'an, Hadith)?
                    If it contradicts established scriptural principles, it is immediately suspect.
                    Personal revelation cannot override textual authority.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">2</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Teacher Confirmation</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Subjective experience requires external validation from qualified guide.
                    The teacher, with greater developmental maturity, can distinguish authentic insight
                    from ego projection. No self-certification permitted.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">3</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Behavioral Transformation</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    True knowledge produces observable ethical refinement. If conduct does not improve—
                    increased humility, reduced reactivity, greater generosity—the knowledge is ornamental, not real.
                    Knowledge without transformation is entertainment.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">4</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Consistency Under Pressure</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Authentic insight remains stable across contexts. If understanding collapses under stress,
                    provocation, or inconvenience, it was momentary emotion, not established knowledge.
                    Real knowledge stabilizes across conditions.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">5</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Elimination of Ego Inflation</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    True knowledge increases humility, not pride. If insight produces superiority, grandiosity,
                    or spiritual arrogance, it is ego disguised as enlightenment. Authentic knowledge dissolves
                    self-importance.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">6</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Coherence with Reality</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Spiritual insight must integrate with practical reality. If understanding produces dysfunction,
                    withdrawal, or impaired judgment, it is dissociation, not transcendence. Knowledge enhances
                    capacity for life, not escape from it.
                  </p>
                </div>

                <div className="p-6 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-[#C8A75E]/20 text-[#C8A75E] border-[#C8A75E]/30">7</Badge>
                    <h4 className="text-lg font-semibold text-[#F5F3EE]">Community Recognition</h4>
                  </div>
                  <p className="text-[#AAB0D6] text-sm">
                    Others observe transformation you may not see yourself. If community does not witness
                    behavioral change, your self-assessment is unreliable. External confirmation protects against
                    self-deception.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role of the Teacher */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-8 h-8 text-[#C8A75E]" />
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                The Role of the Teacher
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-base mt-2">
                Why guidance is not optional but methodologically necessary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#AAB0D6] leading-relaxed">
                The teacher (Shaykh, Murshid) serves essential epistemological function—not authoritarian control
                but methodological safeguard against self-deception:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">External Calibration</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    The student cannot see their own blind spots. Teacher provides external perspective,
                    identifying hidden ego patterns invisible to practitioner.
                  </p>
                </div>

                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Developmental Map</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Teacher has traveled the path and recognizes stages. Provides roadmap preventing
                    confusion of temporary states with permanent stations.
                  </p>
                </div>

                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Corrective Intervention</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Redirects when student veers toward delusion, inflation, or stagnation.
                    Acts as quality control for developmental process.
                  </p>
                </div>

                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#C8A75E] mb-3">Transmission Integrity</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Ensures teaching remains aligned with lineage principles, preventing innovation
                    driven by ego or cultural distortion.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-[#AAB0D6] text-sm leading-relaxed">
                  <strong className="text-amber-300">Warning:</strong> Self-guided spirituality lacks verification mechanism.
                  Without teacher, practitioner becomes both claimant and judge—recipe for self-deception.
                  The teacher is not authority figure but epistemological safeguard.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Role of Discipline */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-8 h-8 text-[#C8A75E]" />
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                The Role of Discipline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#AAB0D6] leading-relaxed">
                Knowledge requires disciplined practice—not for moral virtue but for epistemological clarity.
                Why discipline matters:
              </p>

              <ul className="space-y-3 text-[#AAB0D6]">
                <li className="flex items-start space-x-3">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Purifies perception:</strong> Ethical conduct reduces psychological noise, clarifying inner observation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Tests commitment:</strong> Discipline filters casual seekers from serious practitioners</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Stabilizes insight:</strong> Regular practice consolidates understanding into behavioral structure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C8A75E] mt-1">•</span>
                  <span><strong className="text-[#F5F3EE]">Eliminates self-deception:</strong> Consistent practice reveals gaps between belief and capacity</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Limits of Subjective Experience */}
          <Card className="mb-12 bg-[#0B0F2A]/60 border-[#C8A75E]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <Eye className="w-8 h-8 text-[#C8A75E]" />
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE]">
                Limits of Subjective Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#AAB0D6] leading-relaxed">
                Not all experience is knowledge. Sufi epistemology acknowledges strict limits:
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Emotional Intensity ≠ Truth</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Powerful feeling does not validate content. Delusion can be emotionally overwhelming.
                  </p>
                </div>

                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Novelty ≠ Validity</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    New insight is not necessarily correct insight. Tradition provides tested framework.
                  </p>
                </div>

                <div className="p-5 bg-[#1a1f3a]/30 rounded-lg border border-[#C8A75E]/10">
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Sincerity ≠ Accuracy</h4>
                  <p className="text-[#AAB0D6] text-sm">
                    Genuine belief does not guarantee truth. Self-deception is often sincere.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Institutional Summary */}
          <Card className="bg-gradient-to-br from-[#C8A75E]/10 to-[#0B0F2A]/60 border-[#C8A75E]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">
                Institutional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#AAB0D6] leading-relaxed">
                Sufi epistemology is not mystical relativism but structured verification system:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10 text-center">
                  <BookOpen className="w-10 h-10 text-[#C8A75E] mx-auto mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Textual Foundation</h4>
                  <p className="text-[#AAB0D6] text-sm">Grounded in scripture</p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10 text-center">
                  <Users className="w-10 h-10 text-[#C8A75E] mx-auto mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">External Validation</h4>
                  <p className="text-[#AAB0D6] text-sm">Teacher confirmation required</p>
                </div>
                <div className="p-6 bg-[#1a1f3a]/50 rounded-lg border border-[#C8A75E]/10 text-center">
                  <Target className="w-10 h-10 text-[#C8A75E] mx-auto mb-3" />
                  <h4 className="text-base font-semibold text-[#F5F3EE] mb-2">Behavioral Proof</h4>
                  <p className="text-[#AAB0D6] text-sm">Transformation measured</p>
                </div>
              </div>
              <div className="text-center p-6 bg-[#C8A75E]/10 rounded-lg border border-[#C8A75E]/30">
                <p className="text-[#F5F3EE] text-lg font-semibold">
                  Without rigorous epistemology, spirituality degrades into fantasy.<br />
                  <span className="text-[#AAB0D6] text-base font-normal">
                    This framework protects against that collapse.
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
