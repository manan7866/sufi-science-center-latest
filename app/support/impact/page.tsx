import { TrendingUp, FileText, Users, Globe, BookOpen, Target } from 'lucide-react';

export const metadata = {
  title: 'Transparency and Impact - Sufi Science Center',
  description: 'Annual impact summary, research milestones, and institutional transparency',
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-[#C8A75E] mr-3" />
            <h1 className="text-4xl font-light text-white">Transparency and Impact</h1>
          </div>
          <p className="text-xl text-[#AAB0D6] max-w-3xl">
            Documenting our progress, measuring our impact, and maintaining accountability to our
            community and supporters
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-[#C8A75E]" />
              <span className="text-3xl font-light text-white">12+</span>
            </div>
            <h3 className="text-white font-medium mb-2">Research Projects</h3>
            <p className="text-[#AAB0D6]/80 text-sm">
              Active research initiatives spanning consciousness studies, historical analysis, and
              interdisciplinary inquiry
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#C8A75E]" />
              <span className="text-3xl font-light text-white">500+</span>
            </div>
            <h3 className="text-white font-medium mb-2">Community Members</h3>
            <p className="text-[#AAB0D6]/80 text-sm">
              Engaged participants across research, dialogue programs, and knowledge development
              initiatives
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-[#C8A75E]" />
              <span className="text-3xl font-light text-white">25+</span>
            </div>
            <h3 className="text-white font-medium mb-2">Countries Reached</h3>
            <p className="text-[#AAB0D6]/80 text-sm">
              Global reach spanning multiple continents and diverse cultural contexts
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Current Year Milestones</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Platform Development</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Q1 2026:</span> Launch of comprehensive
                        digital platform integrating research, dialogues, and knowledge systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Media Integration:</span> Establishment
                        of SufiPulse Studio and Sacred Kalam Library as expressive transmission layers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Infrastructure:</span> Database
                        architecture supporting 17+ languages with RTL/LTR rendering
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Research Advancement</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Knowledge Mapping:</span> Systematic
                        documentation of consciousness systems, energy frameworks, and quantum foundations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Historical Documentation:</span> Saints
                        timeline with biographical depth spanning 8th-20th centuries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Ethics Framework:</span> Publication
                        of comprehensive methodology charter
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Community Engagement</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Dialogue Programs:</span> Launch of
                        multiple engagement formats including Insight Interviews and Applied Practices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#AAB0D6] text-sm mb-1">
                        <span className="text-white font-medium">Membership Structure:</span>
                        Development of tiered participation framework from community to fellowship levels
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Published Works and Contributions</h2>
            </div>
            <div className="space-y-4">
              <div className="pb-4 border-b border-[#2A2F4F]/50">
                <h3 className="text-white font-medium mb-2">Research Publications</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Working papers, analytical frameworks, and interdisciplinary research integrating Sufi
                  wisdom with contemporary scientific inquiry
                </p>
                <p className="text-[#C8A75E] text-sm">Status: In development, publication schedule TBD</p>
              </div>
              <div className="pb-4 border-b border-[#2A2F4F]/50">
                <h3 className="text-white font-medium mb-2">Knowledge Resources</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Comprehensive documentation of knowledge systems, historical figures, and contemplative
                  practices made accessible through digital platform
                </p>
                <p className="text-[#C8A75E] text-sm">Status: Active and expanding</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Media and Literary Archives</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Curated collections of sonic expressions and sacred poetry with scholarly commentary
                  and multilingual accessibility
                </p>
                <p className="text-[#C8A75E] text-sm">Status: Initial collections established</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Community Reach</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Geographic Distribution</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-4">
                  Our community spans multiple continents with particular concentration in:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-3" />
                    <span className="text-[#AAB0D6] text-sm">North America</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-3" />
                    <span className="text-[#AAB0D6] text-sm">South Asia</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-3" />
                    <span className="text-[#AAB0D6] text-sm">Middle East</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-3" />
                    <span className="text-[#AAB0D6] text-sm">Europe</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Participation Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A0B14]/50 rounded-lg p-4">
                    <p className="text-2xl font-light text-white mb-1">150+</p>
                    <p className="text-[#AAB0D6]/80 text-sm">Active dialogue participants</p>
                  </div>
                  <div className="bg-[#0A0B14]/50 rounded-lg p-4">
                    <p className="text-2xl font-light text-white mb-1">25+</p>
                    <p className="text-[#AAB0D6]/80 text-sm">Research contributors</p>
                  </div>
                  <div className="bg-[#0A0B14]/50 rounded-lg p-4">
                    <p className="text-2xl font-light text-white mb-1">10+</p>
                    <p className="text-[#AAB0D6]/80 text-sm">Teaching fellows</p>
                  </div>
                  <div className="bg-[#0A0B14]/50 rounded-lg p-4">
                    <p className="text-2xl font-light text-white mb-1">5+</p>
                    <p className="text-[#AAB0D6]/80 text-sm">Institutional partners</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-light text-white mb-6">Financial Transparency</h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              The Sufi Science Center operates as an initiative of the Dr. Kumar Foundation USA, with
              sponsorship from Purple Cloud Faith Collection. All financial activities are conducted in
              accordance with nonprofit regulations and best practices.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Resource Allocation</h3>
                <p className="text-[#AAB0D6]/80 text-sm">
                  Funds are primarily allocated to research infrastructure, knowledge development,
                  technology platform maintenance, and community engagement programs. Detailed annual
                  reports will be published as operations mature.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Institutional Oversight</h3>
                <p className="text-[#AAB0D6]/80 text-sm">
                  All expenditures undergo review by the Dr. Kumar Foundation USA board and are
                  subject to standard nonprofit financial accountability measures.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-light text-white mb-6">Looking Forward</h2>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              As we continue to develop and grow, our commitment to transparency, accountability, and
              measurable impact remains foundational. Future reports will include more detailed metrics,
              assessment methodologies, and community feedback integration.
            </p>
            <p className="text-[#AAB0D6] leading-relaxed">
              We welcome input from our community on how we can better document and communicate our
              progress and impact. This is a living initiative, shaped by ongoing dialogue and
              collaborative development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
