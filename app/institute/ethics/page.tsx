import { Scale, BookOpen, Shield, Eye, Heart, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Ethics and Methodology Charter - Sufi Science Center',
  description: 'Research methodology framework and ethical principles governing the Sufi Science Center',
};

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Scale className="w-8 h-8 text-[#C8A75E] mr-3" />
            <h1 className="text-4xl font-light text-white">Ethics and Methodology Charter</h1>
          </div>
          <p className="text-xl text-[#AAB0D6] max-w-3xl">
            Principles governing research integrity, cultural respect, and intellectual rigor
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Research Methodology Framework</h2>
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              The Sufi Science Center employs a rigorous methodological approach that integrates traditional
              scholarship with contemporary research standards.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">1. Source Verification</h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-3">
                  All traditional texts and teachings are verified through multiple authoritative sources.
                  Primary manuscripts, recognized translations, and scholarly commentaries are cross-referenced
                  to ensure accuracy.
                </p>
                <ul className="space-y-2 text-[#AAB0D6]/80 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Consultation of original manuscripts where accessible</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Cross-referencing with established scholarly works</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Verification through traditional chains of transmission where applicable</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">2. Interpretive Transparency</h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-3">
                  Clear distinction is maintained between traditional interpretations, scholarly analysis,
                  and contemporary applications. Sources for all interpretations are cited.
                </p>
                <ul className="space-y-2 text-[#AAB0D6]/80 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Explicit attribution to specific schools or masters</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Clear labeling of contemporary reinterpretations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Documentation of methodological approaches used</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">3. Interdisciplinary Integration</h3>
                <p className="text-[#AAB0D6] leading-relaxed mb-3">
                  Connections between traditional wisdom and contemporary science are drawn with careful
                  attention to avoiding false equivalences while exploring genuine parallels.
                </p>
                <ul className="space-y-2 text-[#AAB0D6]/80 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Rigorous review of scientific literature and peer-reviewed research</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Acknowledgment of limitations and speculative elements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Collaboration with specialists in relevant scientific fields</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <GitBranch className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Sufi-Scientific Integration Principles</h2>
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              The foundation of our work rests on recognizing both the integrity of traditional spiritual
              knowledge and the rigor of scientific methodology.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#C8A75E] font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Respect for Traditional Authority</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Sufi teachings are presented within their historical, cultural, and spiritual contexts.
                    Traditional authority structures and chains of transmission are honored.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#C8A75E] font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Scientific Rigor</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Contemporary research maintains adherence to scientific methodology, peer review,
                    falsifiability, and evidence-based reasoning.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#C8A75E] font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Epistemic Humility</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Recognition that both spiritual and scientific knowledge systems have boundaries and
                    limitations. No single framework captures complete truth.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#C8A75E] font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Productive Dialogue</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Integration is pursued through genuine dialogue rather than forced synthesis. Both
                    convergences and divergences are acknowledged.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Ethical Standards</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Cultural and Spiritual Respect</h3>
                <p className="text-[#AAB0D6] leading-relaxed">
                  All content honors the sacred nature of Sufi traditions and avoids reduction to mere
                  intellectual curiosity or commercial exploitation. Living traditions are engaged with
                  respect for their contemporary practitioners and communities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Intellectual Property</h3>
                <p className="text-[#AAB0D6] leading-relaxed">
                  All sources are properly cited. Traditional knowledge is attributed to its lineages and
                  communities. Contemporary research collaborations include appropriate co-authorship and
                  attribution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Accessibility and Exclusivity</h3>
                <p className="text-[#AAB0D6] leading-relaxed">
                  Knowledge is made accessible while respecting traditional protocols around esoteric
                  teachings. Material appropriate for public discourse is distinguished from that requiring
                  direct transmission.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Data Transparency Policy</h2>
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mb-6">
              Research data, methodologies, and analytical processes are documented and made available
              according to the following principles:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium mb-1">Open Methodology</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Research processes are documented and made accessible for review and replication.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium mb-1">Source Documentation</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Primary sources, translations, and interpretive frameworks are clearly cited.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium mb-1">Revision Process</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Content undergoes continuous review and is updated when new scholarship or
                    understanding emerges.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#C8A75E] rounded-full mr-4 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium mb-1">Community Feedback</h3>
                  <p className="text-[#AAB0D6]/80 text-sm">
                    Mechanisms for scholarly and community input are maintained to ensure accuracy and
                    cultural sensitivity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Living Charter</h2>
            </div>
            <p className="text-[#AAB0D6] leading-relaxed">
              This charter is not static. It evolves as our understanding deepens, as scholarship advances,
              and as we engage in dialogue with diverse communities. Regular review ensures our principles
              remain aligned with both academic excellence and spiritual integrity. Community input,
              scholarly critique, and institutional reflection guide this ongoing development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
