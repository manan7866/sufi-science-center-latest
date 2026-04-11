import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Shield, Building2, Scale, Music } from 'lucide-react';

export default function AffiliationPage() {
  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Governance"
        title="Institutional Affiliation"
        title2='and Sponsorship'
        description="Transparent information about our institutional structure, governance, and support model."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start gap-4 mb-6">
              <Building2 className="h-8 w-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                  Institutional Initiative
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    Sufi Science Center operates as an intellectual and research initiative under{' '}
                    <span className="font-semibold text-[#F5F3EE]">Dr. Kumar Foundation USA</span>, a nonprofit
                    organization dedicated to advancing knowledge at the intersection of
                    consciousness studies, contemplative traditions, and scientific inquiry.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    The Foundation provides institutional oversight, ensuring alignment with our
                    mission of rigorous, independent research into Sufi wisdom traditions and their
                    relevance to contemporary questions of consciousness and transformation.
                  </p>
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-[#F5F3EE] mb-3">Governance Structure</h3>
                    <ul className="space-y-2 text-sm text-[#AAB0D6]">
                      <li>• Institutional oversight and fiduciary responsibility</li>
                      <li>• Strategic vision alignment and mission integrity</li>
                      <li>• Ethical standards and research guidelines</li>
                      <li>• Nonprofit accountability and transparency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-8 w-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">Sponsorship Model</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    <span className="font-semibold text-[#F5F3EE]">Purple Cloud Faith Collection</span> provides
                    sponsorship support for the operational and technological infrastructure of Sufi
                    Science Center.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    This sponsorship enables the development and maintenance of digital platforms,
                    knowledge systems, and research tools while preserving the intellectual
                    independence of our academic and spiritual inquiry.
                  </p>
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-[#F5F3EE] mb-3">Sponsorship Principles</h3>
                    <ul className="space-y-2 text-sm text-[#AAB0D6]">
                      <li>• Financial and operational support for infrastructure</li>
                      <li>• No editorial control over research content</li>
                      <li>• No influence on scholarly conclusions or assessments</li>
                      <li>• Transparent disclosure of sponsorship relationships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start gap-4 mb-6">
              <Music className="h-8 w-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                  SufiPulse Studio
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    <span className="font-semibold text-[#F5F3EE]">SufiPulse Studio USA</span> operates as a
                    creative and educational initiative under the sponsorship of{' '}
                    <span className="font-semibold text-[#F5F3EE]">Purple Cloud Faith Collection</span>.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    The studio produces multilingual sonic expressions and interpretive content that
                    serves as contemplative gateways to Sufi consciousness and inner transformation.
                    While supported through sponsorship, the creative vision and spiritual integrity
                    of all productions remain independent.
                  </p>
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-[#F5F3EE] mb-3">Sponsorship Model</h3>
                    <ul className="space-y-2 text-sm text-[#AAB0D6]">
                      <li>• Production and distribution infrastructure support</li>
                      <li>• Platform development and maintenance</li>
                      <li>• Multilingual subtitle and translation services</li>
                      <li>• Creative autonomy in content and expression</li>
                      <li>• No commercial advertising or monetization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start gap-4 mb-6">
              <Scale className="h-8 w-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                  Independence Statement
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    The Sufi Science Center maintains complete intellectual independence in all
                    research activities, scholarly assessments, and educational content.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed mb-4">
                    Our research methodology, assessment frameworks, and dialogue topics are
                    determined solely by academic merit, scholarly rigor, and the needs of our
                    research community. Neither institutional affiliation nor sponsorship
                    relationships influence our intellectual output.
                  </p>
                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-[#F5F3EE] mb-3">Core Commitments</h3>
                    <ul className="space-y-2 text-sm text-[#AAB0D6]">
                      <li>• Scholarly integrity and academic rigor</li>
                      <li>• Editorial independence in all publications</li>
                      <li>• Objective assessment methodologies</li>
                      <li>• Non-partisan intellectual positioning</li>
                      <li>• Transparent methodology and open inquiry</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent" />

          <div className="text-center text-sm text-[#AAB0D6] space-y-2">
            <p>
              For questions about our institutional structure or governance, please contact us
              through our official channels.
            </p>
            <p className="text-xs">
              Updated: February 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
