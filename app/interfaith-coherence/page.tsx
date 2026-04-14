'use client';

import Link from 'next/link';
import { BookOpen, Scale, Lightbulb, Sparkles, GraduationCap, ScrollText, ChevronRight, Star, GitMerge, Brain, Layers, MessageSquareMore } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

const SAMPLE_SURAHS = [
  { number: 1, arabic: 'Al-Fatiha', english: 'The Opening', axis: 'Dependence and Guidance', type: 'meccan' },
  { number: 12, arabic: 'Yusuf', english: 'Joseph', axis: 'Divine Providence', type: 'meccan' },
  { number: 24, arabic: 'An-Nur', english: 'The Light', axis: 'Divine Light', type: 'medinan' },
  { number: 36, arabic: 'Ya Sin', english: 'Ya Sin', axis: 'Resurrection and Mercy', type: 'meccan' },
  { number: 55, arabic: 'Ar-Rahman', english: 'The Most Merciful', axis: 'Divine Mercy', type: 'medinan' },
  { number: 112, arabic: 'Al-Ikhlas', english: 'The Sincerity', axis: 'Divine Unity', type: 'meccan' },
];

export default function InterfaithCoherencePage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Civilizational Coherence"
        title="Interfaith Coherence"
        description="Structural continuity across revelatory traditions rooted in the Abrahamic lineage. When examined through the lens of classical Sufi metaphysics, apparent differences reveal layered continuity."
      />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-20">
          {/* I. Abrahamic Lineage Framework */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    The Abrahamic Continuum
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Historical Foundation Layer</p>
                </div>
              </div>

              <Card className="glass-panel border-white/5 p-8">
                <div className="space-y-6 text-[#AAB0D6] leading-relaxed">
                  <p>
                    Abraham stands as the shared patriarchal axis across Torah, Gospel, and Qur'an. This is not metaphorical alignment but documented continuity across three scriptural traditions that explicitly claim descent from his covenant.
                  </p>

                  <div className="pl-6 border-l-2 border-[#C8A75E]/30 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Scriptural Continuity</h3>
                      <p className="text-sm">
                        The Torah establishes Abraham as founding covenant-bearer. The Gospel affirms him as father of faith. The Qur'an names him <em>Hanif</em>, primordial monotheist, positioning him as pre-sectarian origin point.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Prophetic Chain Coherence</h3>
                      <p className="text-sm">
                        Moses, Jesus, Muhammad—each tradition acknowledges a succession of messengers. The Qur'anic framework explicitly honors preceding prophets while claiming final systematization. This is not syncretism but structural acknowledgment.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Spiritual Transmission vs. Political Divergence</h3>
                      <p className="text-sm">
                        Political and doctrinal splits are historically documented. But underneath institutional fracture lies shared concern: Divine Unity, moral law, eschatological accountability, and inner purification. Sufi metaphysics engages this substrate.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* II. Cross-Scriptural Convergence */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B9BD1]/20 to-[#6B9BD1]/5 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-[#6B9BD1]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    Parallel Revelatory Themes
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Structural Echoes Across Scripture</p>
                </div>
              </div>

              <Card className="glass-panel border-white/5 p-8">
                <div className="space-y-6">
                  <p className="text-[#AAB0D6] leading-relaxed">
                    This is not an argument for sameness. It is identification of recurring structural concern across distinct revelatory lineages.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Divine Unity (Tawhid)</h3>
                      <p className="text-sm text-[#AAB0D6]">
                        Shema in Deuteronomy 6:4, Gospel affirmation in Mark 12:29, Qur'anic <em>La ilaha illallah</em>—structural insistence on absolute oneness.
                      </p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Mercy and Justice</h3>
                      <p className="text-sm text-[#AAB0D6]">
                        Divine attributes oscillate between <em>Raḥmān</em> and <em>Qahhar</em>, paralleling Chesed and Gevurah in Kabbalistic structure. Compassion tempered by law.
                      </p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Prophetic Ethics</h3>
                      <p className="text-sm text-[#AAB0D6]">
                        Decalogue, Beatitudes, Qur'anic moral injunctions—each tradition establishes ethical scaffolding oriented toward social justice and inner rectitude.
                      </p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Sacred Law and Inner Law</h3>
                      <p className="text-sm text-[#AAB0D6]">
                        Halakha, Canon Law, Sharia—external structures. Kabbalah, Christian mysticism, Sufism—interiorized paths. Each tradition maintains both dimensions.
                      </p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-lg border border-white/5 md:col-span-2">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Mystical Interiority</h3>
                      <p className="text-sm text-[#AAB0D6]">
                        Devekut (cleaving to God), Unio Mystica, Fanā' (annihilation in the Divine)—phenomenologically parallel descriptions of absorption into transcendent Unity.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* III. Comparative Abrahamic Studies */}
          <ScrollReveal>
            <section>
              <div className="xl:text-center lg:text-center md:text-center sm:text-center mb-10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A75E]/60 font-semibold mb-3">
                  Civilizational Research
                </p>
                <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE] mb-1">
                  Comparative Abrahamic Studies
                </h2>
                <p className="text-sm text-[#AAB0D6]/60 mb-6">Research Series</p>
                <p className="text-[#AAB0D6]/75 leading-relaxed max-w-3xl mx-auto text-sm">
                  Structured academic studies examining covenantal architecture, prophetic consciousness, metaphysical grammar, and contemplative practice across Abrahamic traditions within a disciplined comparative framework. These studies do not replace classical exegesis within any tradition; they identify structural continuity without collapsing theological distinctions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="group p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 hover:border-[#C8A75E]/20 hover:shadow-[0_0_20px_0_rgba(200,167,94,0.04)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-5">
                    <GitMerge className="w-4.5 h-4.5 text-[#C8A75E]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F3EE] mb-3 leading-snug">
                    Covenant Structures Across Traditions
                  </h3>
                  <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">
                    Comparative study of covenantal theology in Torah, Gospel, and Qur'an—examining continuity, expansion, and fulfillment within the Abrahamic lineage.
                  </p>
                </div>

                <div className="group p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 hover:border-[#C8A75E]/20 hover:shadow-[0_0_20px_0_rgba(200,167,94,0.04)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center mb-5">
                    <Brain className="w-4.5 h-4.5 text-[#6B9BD1]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F3EE] mb-3 leading-snug">
                    Prophetic Consciousness Models
                  </h3>
                  <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">
                    Analysis of prophetic transmission, revelation modes, and messenger succession across Abrahamic traditions without doctrinal adjudication.
                  </p>
                </div>

                <div className="group p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 hover:border-[#C8A75E]/20 hover:shadow-[0_0_20px_0_rgba(200,167,94,0.04)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#27AE60]/10 border border-[#27AE60]/20 flex items-center justify-center mb-5">
                    <Layers className="w-4.5 h-4.5 text-[#27AE60]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F3EE] mb-3 leading-snug">
                    Law and Interiorization
                  </h3>
                  <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">
                    Exploration of Halakha, Canon Law, and Sharia alongside mystical interior paths—examining the relationship between external structure and inner realization.
                  </p>
                </div>

                <div className="group p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 hover:border-[#C8A75E]/20 hover:shadow-[0_0_20px_0_rgba(200,167,94,0.04)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-5">
                    <MessageSquareMore className="w-4.5 h-4.5 text-[#C8A75E]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F3EE] mb-3 leading-snug">
                    Mystical Language and Metaphor
                  </h3>
                  <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">
                    Phenomenological parallels between Kabbalah, Christian mysticism, and Sufi metaphysics—mapping symbolic grammar without theological conflation.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C8A75E]/25 to-transparent" />
              </div>
            </section>
          </ScrollReveal>

          {/* IV — original III. Why Interfaith Coherence Is Necessary Now */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E74C3C]/20 to-[#E74C3C]/5 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-[#E74C3C]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    Civilizational Necessity
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Coherence as Stabilization</p>
                </div>
              </div>

              <Card className="glass-panel border-white/5 p-8">
                <div className="space-y-6 text-[#AAB0D6] leading-relaxed">
                  <p>
                    The contemporary moment is marked by profound epistemic fragmentation. This is not merely cultural tension—it is the collapse of shared reference points that once anchored civilizational coherence.
                  </p>

                  <div className="space-y-5">
                    <div className="p-5 bg-gradient-to-r from-[#E74C3C]/10 to-transparent rounded-lg border-l-2 border-[#E74C3C]/50">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Collapse of Civil Discourse</h3>
                      <p className="text-sm">
                        Political polarization now operates at the level of incompatible axioms. Without metaphysical grounding, debate becomes power contest rather than truth-seeking.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-[#E74C3C]/10 to-transparent rounded-lg border-l-2 border-[#E74C3C]/50">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Weaponization of Scripture</h3>
                      <p className="text-sm">
                        Sacred texts are mobilized to justify exclusion, violence, and ideological rigidity—often with deliberate ignorance of hermeneutic tradition and contextual nuance.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-[#E74C3C]/10 to-transparent rounded-lg border-l-2 border-[#E74C3C]/50">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Fragmented Identity Politics</h3>
                      <p className="text-sm">
                        Identity has become tribal marker rather than integrative framework. Loss of vertical (transcendent) dimension reduces identity to horizontal conflict.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-[#E74C3C]/10 to-transparent rounded-lg border-l-2 border-[#E74C3C]/50">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Loss of Metaphysical Literacy</h3>
                      <p className="text-sm">
                        Secularization has not produced neutral rationality—it has produced metaphysical amnesia. Contemporary culture lacks language for transcendence.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-[#E74C3C]/10 to-transparent rounded-lg border-l-2 border-[#E74C3C]/50">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">Secular Modernity's Vacuum</h3>
                      <p className="text-sm">
                        The modern secular project promised autonomous reason. Instead it delivered nihilism, consumerism, and algorithmic control. Coherence requires recovering vertical orientation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-base font-semibold text-[#F5F3EE]">
                      Interfaith coherence is not dialogue for its own sake. It is epistemic reconstruction in service of civilizational stability.
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* IV. Qur'anic Lens & Sufi Commentary */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9B59B6]/20 to-[#9B59B6]/5 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#9B59B6]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    Qur'anic Lens & Sufi Commentary
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Traditional Anchoring</p>
                </div>
              </div>

              <Card className="glass-panel border-white/5 p-8">
                <div className="space-y-6 text-[#AAB0D6] leading-relaxed">
                  <p>
                    Our approach is not modern relativism repackaged. It is rooted in classical Islamic metaphysics, particularly the Sufi tradition which has historically engaged plurality without collapsing distinctions.
                  </p>

                  <div className="space-y-5">
                    <div className="p-6 bg-gradient-to-br from-[#9B59B6]/10 via-[#9B59B6]/5 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Qur'anic Recognition of People of the Book</h3>
                      <p className="text-sm mb-3">
                        The Qur'an explicitly addresses Jews and Christians as <em>Ahl al-Kitāb</em> (People of the Book), acknowledging shared revelation while maintaining theological distinctions.
                      </p>
                      <div className="p-4 bg-[#0B0F2A]/50 rounded border border-white/5">
                        <p className="text-sm italic text-[#C8A75E]">
                          "Say, 'O People of the Scripture, come to a word that is equitable between us and you—that we will not worship except Allah and not associate anything with Him...'" (Qur'an 3:64)
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-[#9B59B6]/10 via-[#9B59B6]/5 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Ibn Arabi's Metaphysical Inclusivity</h3>
                      <p className="text-sm">
                        Muhyiddin Ibn Arabi (d. 1240) articulated <em>waḥdat al-wujūd</em> (unity of being)—a framework where Divine Reality manifests through diverse forms. Difference becomes theophany, not contradiction. This is not universalism that erases particularity; it is recognition of underlying Unity expressed through multiplicity.
                      </p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-[#9B59B6]/10 via-[#9B59B6]/5 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Al-Ghazali's Epistemic Framework</h3>
                      <p className="text-sm">
                        Imam al-Ghazali (d. 1111) distinguished between exoteric law (<em>sharī'a</em>) and esoteric reality (<em>ḥaqīqa</em>). His work demonstrates how ritual form and inner meaning coexist without collapsing into one another—a model for engaging difference without relativizing truth.
                      </p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-[#9B59B6]/10 via-[#9B59B6]/5 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-3">Rumi's Universal Metaphors</h3>
                      <p className="text-sm">
                        Jalal al-Din Rumi (d. 1273) employed poetic language that transcended sectarian boundaries while remaining anchored in Islamic orthodoxy. His metaphors—lover and Beloved, reed flute's lament, wine of ecstasy—speak to universal human longing for reunion with Source.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* V. Holy Scripture Commentary */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center flex-shrink-0">
                  <ScrollText className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    Holy Scripture Commentary
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Qur'anic Thematic Commentary through a Sufi Metaphysical Lens</p>
                </div>
              </div>

              <Card className="glass-panel border-[#C8A75E]/15 p-8 bg-gradient-to-br from-[#C8A75E]/5 to-transparent">
                <div className="space-y-6">
                  <div>
                    <p className="text-[#AAB0D6] leading-relaxed mb-2">
                      A complete library of concise thematic reflections on all 114 chapters of the Qur'an,
                      identifying spiritual architecture, ontological themes, ethical structure, and metaphysical
                      insight rooted in classical Sufi scholarship.
                    </p>
                    <p className="text-sm text-[#AAB0D6]/70 italic">
                      These reflections do not replace classical tafsir. They illuminate thematic continuity.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SAMPLE_SURAHS.map((s) => (
                      <Link key={s.number} href={`/interfaith-coherence/scripture-commentary/surah/${s.number}`}>
                        <div className="group p-4 rounded-xl border border-white/8 bg-white/2 hover:border-[#C8A75E]/30 hover:bg-[#C8A75E]/5 transition-all cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#C8A75E]/60">{s.number}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border capitalize ${
                                s.type === 'meccan'
                                  ? 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              }`}>{s.type}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#AAB0D6]/30 group-hover:text-[#C8A75E] transition-colors" />
                          </div>
                          <p className="text-sm font-serif font-semibold text-[#F5F3EE]">{s.arabic}</p>
                          <p className="text-xs text-[#AAB0D6] mb-1.5">{s.english}</p>
                          <p className="text-[10px] text-[#C8A75E]/60 tracking-wider uppercase">{s.axis}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                    <Link href="/interfaith-coherence/scripture-commentary">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A75E] hover:bg-[#D4B56D] text-[#0B0F2A] font-semibold rounded-lg transition-colors text-sm">
                        <Star className="w-4 h-4" />
                        Explore All 114 Surahs
                      </div>
                    </Link>
                    <div className="text-sm text-[#AAB0D6] space-y-0.5">
                      <p>Complete thematic commentary library</p>
                      <p className="text-xs text-[#AAB0D6]/50">Filter by revelation type, interfaith resonance, or structural axis</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* VI. Living Application */}
          <ScrollReveal>
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#27AE60]/20 to-[#27AE60]/5 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#27AE60]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-semibold text-[#F5F3EE]">
                    From Theology to Practice
                  </h2>
                  <p className="text-sm text-[#AAB0D6]/60 mt-1">Institutional Application</p>
                </div>
              </div>

              <Card className="glass-panel border-white/5 p-8">
                <div className="space-y-6 text-[#AAB0D6] leading-relaxed">
                  <p>
                    Theory without application remains abstraction. Interfaith coherence must be operationalized through institutional structure and educational programming.
                  </p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="p-5 bg-gradient-to-br from-[#27AE60]/10 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Interfaith Education Modules</h3>
                      <p className="text-sm">
                        Structured curricula examining scriptural parallels, historical interactions, and metaphysical convergences across Abrahamic traditions.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#27AE60]/10 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Comparative Mysticism Seminars</h3>
                      <p className="text-sm">
                        Academic engagement with Kabbalistic, Christian mystical, and Sufi texts to identify phenomenological parallels in contemplative practice.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#27AE60]/10 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Civilizational Memory Recovery</h3>
                      <p className="text-sm">
                        Documentation of historical moments where Abrahamic traditions coexisted productively—Convivencia in Al-Andalus, Ottoman <em>millet</em> system, etc.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#27AE60]/10 to-transparent rounded-lg border border-white/5">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Academic Partnerships</h3>
                      <p className="text-sm">
                        Collaboration with universities, seminaries, and research institutions to advance scholarly interfaith discourse grounded in rigorous methodology.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#27AE60]/10 to-transparent rounded-lg border border-white/5 md:col-span-2">
                      <h3 className="text-base font-semibold text-[#F5F3EE] mb-2">Research Publications</h3>
                      <p className="text-sm">
                        Peer-reviewed articles, monographs, and conference presentations contributing to the academic field of interfaith studies from a traditionally anchored perspective.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-base">
                      Interfaith coherence is not sentiment—it is structure. It is the restoration of vertical orientation in a horizontally fragmented world. It is the recovery of shared metaphysical grammar that allows difference without disintegration.
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollReveal>

          {/* VII. Contact Section */}
          <ScrollReveal>
            <div className="text-center py-12 border-t border-white/10">
              <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-4">
                Engage with Our Work
              </h2>
              <p className="text-[#AAB0D6] mb-8 max-w-2xl mx-auto">
                For academic collaboration, research partnership inquiries, or to participate in interfaith educational programming, contact our research coordination team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/institute/collaborations"
                  className="px-6 py-3 bg-[#C8A75E] text-[#0B0F2A] font-semibold rounded-lg hover:bg-[#D4B56D] transition-colors"
                >
                  View Collaborations
                </a>
                <a
                  href="/research"
                  className="px-6 py-3 bg-white/10 text-[#F5F3EE] font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Research Publications
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
