'use client';

import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';

const PILLARS = [
  {
    number: '01',
    title: 'Foundational Studies',
    body: 'Theological grounding anchored in disciplined methodology.',
  },
  {
    number: '02',
    title: 'Knowledge Systems',
    body: 'Comparative epistemology and structured inquiry across traditions.',
  },
  {
    number: '03',
    title: 'Inner Development',
    body: 'Ethical refinement, self-discipline, and character cultivation.',
  },
  {
    number: '04',
    title: 'Interfaith Coherence',
    body: 'Dialogue rooted in intellectual respect, without dilution.',
  },
  {
    number: '05',
    title: 'Media Expression',
    body: 'Responsible transmission of sacred knowledge through SufiPulse Studio USA.',
  },
  {
    number: '06',
    title: 'Institutional Ethics',
    body: 'Governance frameworks grounded in accountability, transparency, and principled leadership.',
  },
];

const MILESTONES = [
  'Formation of Sufi Science Center USA',
  'Establishment of Dr. Kumar Foundation USA',
  'Launch of SufiPulse Studio USA as Media Partner',
  'Development of Sacred Kalam Library',
  'Creation of Research Publications division',
  'Youth-oriented spiritual literacy initiatives',
  'Interfaith coherence modules',
  'Institutional transparency and ethics frameworks',
];

const GOVERNANCE_DOMAINS = [
  'Governance architecture',
  'Ethical compliance and methodology',
  'Advisory council coordination',
  'Institutional accountability systems',
  'Transparency and impact reporting',
];

const RESEARCH_AREAS = [
  'Spiritual epistemology',
  'Civilizational coherence modeling',
  'Comparative theology',
  'Ethical governance structures',
  'Youth spiritual literacy systems',
  'Faith and science integration frameworks',
];

const MEDIA_AREAS = [
  'Spiritual music and youth programming',
  'Interfaith children\'s educational content',
  'Spoken word and poetic expression',
  'Structured dialogue recordings',
  'Ethical digital dissemination',
];

export default function FounderPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Founder"
        title="Dr. Fayaz Khan"
        description="Founder, Sufi Science Center USA · Founder, Dr. Kumar Foundation USA · Founder, SufiPulse Studio USA"
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Founder's Vision */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-[#F5F3EE]">Founder's Vision</h2>
            </div>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The Sufi Science Center USA was established in response to a visible fracture in modern civilization:
                Humanity has expanded knowledge, but lost integration.
              </p>
              <p className="text-[#F5F3EE]/80 italic border-l-2 border-[#C8A75E]/50 pl-5">
                Information is abundant. Wisdom is fragmented. Institutions are structured, yet inner development is neglected.
              </p>
              <p>
                Dr. Fayaz Khan founded SSC USA as a structured institutional platform designed to harmonize Faith and Science,
                Revelation and Reason, Character and Scholarship, Interfaith Dialogue and Doctrinal Integrity,
                and Media Expression with Ethical Responsibility.
              </p>
              <p>
                The institution was conceived not as a movement, nor as a personality platform, but as a long-term
                knowledge architecture. Its purpose is alignment.
              </p>
            </div>
          </div>

          {/* Intellectual Architecture */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Intellectual Architecture</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-10">
              The Founder structured SSC USA upon six integrated pillars. This architecture avoids reactionism,
              syncretism, and ideological spectacle. It prioritizes disciplined integration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PILLARS.map((pillar) => (
                <Card key={pillar.number} className="glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/40 transition-all">
                  <div className="p-6 flex gap-5">
                    <span className="text-[#C8A75E]/50 font-bold text-2xl leading-none mt-0.5 flex-shrink-0">{pillar.number}</span>
                    <div>
                      <h3 className="text-[#F5F3EE] font-semibold mb-2">{pillar.title}</h3>
                      <p className="text-sm text-[#AAB0D6]">{pillar.body}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Academic & Professional */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Academic &amp; Professional Orientation</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>Dr. Fayaz Khan's interdisciplinary orientation integrates:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                {[
                  'Environmental and systems thinking',
                  'Socioeconomic structuring models',
                  'Institutional design and governance frameworks',
                  'Digital platform architecture',
                  'Faith-centered epistemological inquiry',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#F5F3EE]/80 italic border-l-2 border-[#C8A75E]/50 pl-5">
                Spiritual insight becomes structured. Structure becomes accountable. Institutions become sustainable.
              </p>
            </div>
          </div>

          {/* Institutional Milestones */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Institutional Milestones</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              Under the Founder's direction, the following structural milestones were established. Each milestone reflects documented institutional structuring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MILESTONES.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-[#AAB0D6] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Insight */}
          <div className="bg-[#080C1E] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 md:p-12 border-l-4 border-l-[#C8A75E]">
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-2">Governance Insight</h2>
            <p className="text-[#C8A75E] font-medium mb-6">Institutional Stewardship Under Dr. Gulam Mohammad Kumar</p>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                While the visionary and intellectual architecture of SSC USA was initiated by Dr. Fayaz Khan,
                the governance framework operates under the stewardship of <span className="text-[#F5F3EE] font-medium">Dr. Gulam Mohammad Kumar</span>.
              </p>
              <p>Dr. Kumar provides structured oversight across:</p>
              <div className="space-y-2 pl-2">
                {GOVERNANCE_DOMAINS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#F5F3EE]/80 italic border-l-2 border-[#C8A75E]/50 pl-5">
                The institution is not personality-dependent. Authority is structured, not symbolic.
                Continuity extends beyond individual leadership. SSC USA is designed for durability.
              </p>
            </div>
          </div>

          {/* Institutional Philosophy */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Institutional Philosophy: Why "Sufi Science"</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>Within SSC USA, the term "Sufi" does not denote sectarian identity. It signifies:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                {[
                  'Depth over noise',
                  'Character over rhetoric',
                  'Discipline over spectacle',
                  'Love rooted in truth',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p>
                "Sufi Science" represents the harmonization of inner purification, intellectual rigor,
                ethical governance, and public responsibility. It is a civilizational integration model.
              </p>
            </div>
          </div>

          {/* Media & Cultural Transmission */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Media &amp; Cultural Transmission</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              Through SufiPulse Studio USA, the Founder integrates media as moral infrastructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MEDIA_AREAS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-[#AAB0D6] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publications & Research */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">Publications &amp; Research Focus</h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              The Founder's ongoing research and publication engagement includes the following domains,
              all operating under institutional ethical methodology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_AREAS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-[#AAB0D6] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Founder's Statement */}
          <div className="text-center py-8">
            <div className="text-[#C8A75E] text-7xl leading-none font-serif mb-6 opacity-60">"</div>
            <blockquote className="max-w-3xl mx-auto space-y-4 text-[#F5F3EE]/90 text-lg md:text-xl leading-relaxed italic mb-10">
              <p>Civilizations do not decline from lack of information.</p>
              <p>They decline from fragmentation of meaning.</p>
              <p className="mt-6 not-italic text-[#AAB0D6]">
                The future requires individuals capable of thinking scientifically,
                feeling spiritually, and acting ethically.
              </p>
              <p className="not-italic">
                The Sufi Science Center USA exists to cultivate that alignment.
              </p>
            </blockquote>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E]/40 to-transparent mb-6 max-w-xs mx-auto" />
            <p className="text-[#C8A75E] font-semibold tracking-wide">— Dr. Fayaz Khan</p>
            <p className="text-[#AAB0D6] text-sm mt-1">Founder</p>
          </div>

        </div>
      </section>
    </div>
  );
}
